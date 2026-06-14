// src/lib/supabase.ts
// The Supabase client. Session is persisted with AsyncStorage so the device's
// anonymous identity survives app restarts. Keys come from .env
// (EXPO_PUBLIC_* vars are injected at build time).

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[supabase] Missing EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_ANON_KEY. ' +
      'Did you create .env and restart the dev server?'
  );
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '', {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    // No URL-based auth in a native app.
    detectSessionInUrl: false,
  },
});

/**
 * Make sure this device has a session. On first launch we sign in anonymously,
 * which mints a real (but password-less) user — this is the device identity.
 * It can later be upgraded to a real email account without losing any data.
 */
export async function ensureSession(): Promise<void> {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) return;

    const { error } = await supabase.auth.signInAnonymously();
    if (error) console.warn('[supabase] anonymous sign-in failed', error.message);
  } catch (e) {
    console.warn('[supabase] ensureSession error', e);
  }
}
