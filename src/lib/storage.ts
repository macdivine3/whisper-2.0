// src/lib/storage.ts
// Thin, typed wrapper around AsyncStorage.
// Everything is stored as JSON. All methods fail soft (log + return fallback)
// so a storage hiccup never crashes the UI.

import AsyncStorage from '@react-native-async-storage/async-storage';

// Central registry of every key we persist. Keep them here so we never
// collide and can see the whole storage surface at a glance.
export const Keys = {
  onboardingComplete: 'whisper_onboarding_complete',
  journalEntries: 'whisper_journal_entries',
  moodLog: 'whisper_mood_log',
  chatHistory: 'whisper_chat_history',
} as const;

/** Read and JSON-parse a value. Returns `fallback` if missing or on error. */
export async function loadJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch (e) {
    console.warn(`[storage] failed to load "${key}"`, e);
    return fallback;
  }
}

/** JSON-stringify and write a value. Returns true on success. */
export async function saveJSON<T>(key: string, value: T): Promise<boolean> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn(`[storage] failed to save "${key}"`, e);
    return false;
  }
}

/** Remove a single key. */
export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn(`[storage] failed to remove "${key}"`, e);
  }
}
