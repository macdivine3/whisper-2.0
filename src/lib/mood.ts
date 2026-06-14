// src/lib/mood.ts
// Mood timeline data layer. Screens call these functions only — they never
// touch Supabase directly. Backed by the `moods` table (row-level security
// keeps each device to its own rows). If we ever change backends, only this
// file changes.

import { supabase } from './supabase';

export type MoodSource = 'home' | 'journal';

export interface MoodEntry {
  id: string;
  mood: string;
  source: MoodSource;
  created_at: string; // ISO timestamp from the server
}

/** Record a mood the user committed to (with where it came from). */
export async function logMood(mood: string, source: MoodSource = 'home'): Promise<void> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    console.warn('[mood] no session yet — mood not logged');
    return;
  }

  const { error } = await supabase.from('moods').insert({
    user_id: user.id,
    mood,
    source,
  });
  if (error) console.warn('[mood] logMood failed', error.message);
}

/** Full mood history, newest first. Powers the Care Log and AI memory. */
export async function getMoodTimeline(): Promise<MoodEntry[]> {
  const { data, error } = await supabase
    .from('moods')
    .select('id, mood, source, created_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('[mood] getMoodTimeline failed', error.message);
    return [];
  }
  return (data ?? []) as MoodEntry[];
}

/** The most recent mood, or null. Drives "Whisper remembers you've been…". */
export async function getLatestMood(): Promise<MoodEntry | null> {
  const { data, error } = await supabase
    .from('moods')
    .select('id, mood, source, created_at')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.warn('[mood] getLatestMood failed', error.message);
    return null;
  }
  return (data as MoodEntry) ?? null;
}
