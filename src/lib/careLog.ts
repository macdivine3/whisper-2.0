// src/lib/careLog.ts
// Data logic for the Care Log. Aggregates activity from moods, journals,
// chats, and seeds (shares) over the last 7 days to provide insights.

import { supabase } from './supabase';

export interface CareLogInsights {
  topMood: { mood: string; count: number } | null;
  activityPattern: 'morning' | 'night' | 'balanced';
  mostUsedFeature: 'journal' | 'chat' | 'prayer';
  seedsCount: number;
}

/**
 * Fetch and compute all weekly insights for the logged-in user.
 * Returns null if no user session exists.
 */
export async function getWeeklyInsights(): Promise<CareLogInsights | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // 1. Top Mood from the 'moods' table
  const { data: moods } = await supabase
    .from('moods')
    .select('mood')
    .gte('created_at', oneWeekAgo);

  const moodCounts: Record<string, number> = {};
  moods?.forEach(m => {
    moodCounts[m.mood] = (moodCounts[m.mood] || 0) + 1;
  });
  
  let topMood = null;
  let maxMoodCount = 0;
  for (const [mood, count] of Object.entries(moodCounts)) {
    if (count > maxMoodCount) {
      maxMoodCount = count;
      topMood = { mood, count };
    }
  }

  // 2. Activity Pattern (tendency based on timestamps)
  const { data: entries } = await supabase
    .from('journal_entries')
    .select('created_at')
    .gte('created_at', oneWeekAgo);
    
  const { data: chats } = await supabase
    .from('chat_sessions')
    .select('created_at')
    .gte('created_at', oneWeekAgo);

  const allTimestamps = [
    ...(entries?.map(e => e.created_at) || []),
    ...(chats?.map(c => c.created_at) || [])
  ];

  let nightCount = 0;
  allTimestamps.forEach(ts => {
    const hour = new Date(ts).getHours();
    if (hour >= 18 || hour < 6) nightCount++;
  });

  const nightTendency = allTimestamps.length > 0 ? nightCount / allTimestamps.length : 0.5;
  const activityPattern = nightTendency > 0.6 ? 'night' : (nightTendency < 0.4 ? 'morning' : 'balanced');

  // 3. Most Used Feature
  const { count: journalCount } = await supabase
    .from('journal_entries')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneWeekAgo);

  const { count: chatCount } = await supabase
    .from('chat_sessions')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneWeekAgo);

  const { count: prayerCount } = await supabase
    .from('saved_prayers')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneWeekAgo);

  const features = [
    { name: 'journal', count: journalCount || 0 },
    { name: 'chat', count: chatCount || 0 },
    { name: 'prayer', count: prayerCount || 0 }
  ];
  const topFeature = features.sort((a, b) => b.count - a.count)[0];

  // 4. Seeds Sown (shares)
  const { count: seedsCount } = await supabase
    .from('seeds')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', oneWeekAgo);

  return {
    topMood,
    activityPattern,
    mostUsedFeature: topFeature.name as 'journal' | 'chat' | 'prayer',
    seedsCount: seedsCount || 0
  };
}
