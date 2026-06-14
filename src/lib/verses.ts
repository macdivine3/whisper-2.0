// src/lib/verses.ts
// Saved verses data layer — backs the ScriptureCard "save verse" button.

import { supabase } from './supabase';

export interface SavedVerse {
  id?: string;
  verse: string;
  reference: string;
}

/** Save a verse to the user's collection. Returns true on success. */
export async function saveVerse(verse: string, reference: string): Promise<boolean> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { error } = await supabase
      .from('saved_verses')
      .insert({ user_id: user.id, verse, reference });
    return !error;
  } catch {
    return false;
  }
}

/** Load the user's saved verses, newest first. */
export async function getSavedVerses(): Promise<SavedVerse[]> {
  try {
    const { data, error } = await supabase
      .from('saved_verses')
      .select('id, verse, reference, created_at')
      .order('created_at', { ascending: false });
    if (error || !data) return [];
    return data as SavedVerse[];
  } catch {
    return [];
  }
}
