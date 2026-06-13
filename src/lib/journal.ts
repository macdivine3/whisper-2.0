// src/lib/journal.ts
// Journal data layer: the JournalEntry shape, mood styling, and all
// persistence logic. Screens/components talk to this, never to storage directly.

import { Colors } from '../constants/theme';
import { Keys, loadJSON, saveJSON } from './storage';

export interface JournalEntry {
  id: string;
  title: string;
  date: string;        // human-readable, e.g. "May 18, 2025"
  createdAt: number;   // epoch ms — the real sort/order key
  body: string;        // full entry text
  excerpt: string;     // first ~90 chars, shown on the card
  mood: string;        // one of MOODS below
  color: string;       // accent color, derived from mood
  isFavorite?: boolean;
}

// The moods a journal entry can carry. Colors come from the design system so
// cards, tags, and icons all stay on-brand.
export const MOODS = [
  'grateful',
  'hopeful',
  'peaceful',
  'anxious',
  'drained',
  'overwhelmed',
] as const;

export type Mood = (typeof MOODS)[number];

export function moodColor(mood: string): string {
  return (Colors.mood as Record<string, string>)[mood] ?? Colors.green.primary;
}

/** Build an excerpt from full body text. */
export function makeExcerpt(body: string, max = 90): string {
  const clean = body.trim().replace(/\s+/g, ' ');
  return clean.length <= max ? clean : clean.slice(0, max).trimEnd() + '…';
}

/** Format an epoch timestamp the way the cards expect: "May 18, 2025". */
export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Auto title (Option A): a warm time-of-day label like "Tuesday Evening" or
 * "Friday Late Night". Used when the user doesn't type their own title.
 */
export function timeOfDayTitle(ts: number): string {
  const d = new Date(ts);
  const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
  const h = d.getHours();
  let part: string;
  if (h >= 5 && h < 12) part = 'Morning';
  else if (h >= 12 && h < 17) part = 'Afternoon';
  else if (h >= 17 && h < 21) part = 'Evening';
  else part = 'Late Night';
  return `${weekday} ${part}`;
}

/**
 * A gentle one-liner that mirrors the chosen mood back to the user, shown
 * above the writing space. Keeps the "you were heard" feeling — never preachy.
 */
const MOOD_PROMPTS: Record<string, string> = {
  grateful: "You're feeling grateful. Let it overflow — what's filling your heart?",
  hopeful: "You're feeling hopeful. Hold it close — what's lifting you today?",
  peaceful: "You're feeling peaceful. Rest here — what's bringing you calm?",
  anxious: "You said you're feeling anxious. You're safe here. What's weighing on you?",
  drained: "You're feeling drained. It's okay to be empty. Let it out, gently.",
  overwhelmed: "You said you're feeling overwhelmed. One breath at a time — what's too much right now?",
};

export function moodPrompt(mood: string): string {
  return MOOD_PROMPTS[mood] ?? 'Take a breath. This is your safe place — what\'s on your heart?';
}

// Seed entries — what a brand-new user sees before they've written anything.
// These mirror the original mockup so the screen never looks empty on first run.
const SEED_ENTRIES: JournalEntry[] = [
  {
    id: 'seed-1',
    title: 'Feeling Overwhelmed',
    date: 'May 18, 2025',
    createdAt: new Date('2025-05-18T20:00:00').getTime(),
    body: "Today was a lot. My mind wouldn't stop racing and I felt like I was failing in so many areas of my life. But I'm here, and I'm trying.",
    excerpt: "Today was a lot. My mind wouldn't stop racing and I felt like I was failing in so…",
    mood: 'anxious',
    color: moodColor('anxious'),
  },
  {
    id: 'seed-2',
    title: 'Grateful for the Little Things',
    date: 'May 17, 2025',
    createdAt: new Date('2025-05-17T20:00:00').getTime(),
    body: 'God really showed up in the small moments today. The sunrise, a kind word from a stranger, a quiet cup of coffee. Little graces everywhere.',
    excerpt: 'God really showed up in the small moments today. The sunrise, a kind…',
    mood: 'grateful',
    color: moodColor('grateful'),
  },
  {
    id: 'seed-3',
    title: 'A Quiet Night Prayer',
    date: 'May 16, 2025',
    createdAt: new Date('2025-05-16T22:00:00').getTime(),
    body: "Lord, I'm laying it all down tonight. Thank You for being close when I had nothing left to give. I trust You with tomorrow.",
    excerpt: "Lord, I'm laying it all down tonight. Thank You for being close when…",
    mood: 'hopeful',
    color: moodColor('hopeful'),
  },
  {
    id: 'seed-4',
    title: 'When I Needed Peace',
    date: 'May 12, 2025',
    createdAt: new Date('2025-05-12T19:00:00').getTime(),
    body: "You calmed my heart in ways I can't even explain. You always know exactly what I need before I do.",
    excerpt: "You calmed my heart in ways I can't even explain. You always…",
    mood: 'peaceful',
    color: moodColor('peaceful'),
    isFavorite: true,
  },
];

let seeded = false;

/** Load all entries, newest first. Seeds defaults on the very first run. */
export async function getEntries(): Promise<JournalEntry[]> {
  const existing = await loadJSON<JournalEntry[] | null>(Keys.journalEntries, null);
  if (existing == null && !seeded) {
    seeded = true;
    await saveJSON(Keys.journalEntries, SEED_ENTRIES);
    return [...SEED_ENTRIES];
  }
  const entries = existing ?? [];
  return [...entries].sort((a, b) => b.createdAt - a.createdAt);
}

/** Create and persist a new entry. Returns the saved entry. */
export async function addEntry(input: {
  title: string;
  body: string;
  mood: string;
}): Promise<JournalEntry> {
  const now = Date.now();
  const entry: JournalEntry = {
    id: `entry-${now}`,
    // Auto time-of-day title (Option A) when the user leaves it blank.
    title: input.title.trim() || timeOfDayTitle(now),
    body: input.body.trim(),
    excerpt: makeExcerpt(input.body),
    mood: input.mood,
    color: moodColor(input.mood),
    createdAt: now,
    date: formatDate(now),
    isFavorite: false,
  };
  const entries = await loadJSON<JournalEntry[]>(Keys.journalEntries, []);
  await saveJSON(Keys.journalEntries, [entry, ...entries]);
  return entry;
}

/** Flip the favorite flag on one entry and persist. Returns updated list. */
export async function toggleFavorite(id: string): Promise<JournalEntry[]> {
  const entries = await loadJSON<JournalEntry[]>(Keys.journalEntries, []);
  const next = entries.map((e) =>
    e.id === id ? { ...e, isFavorite: !e.isFavorite } : e
  );
  await saveJSON(Keys.journalEntries, next);
  return next.sort((a, b) => b.createdAt - a.createdAt);
}

/** Permanently remove an entry. Returns the updated list (newest first). */
export async function deleteEntry(id: string): Promise<JournalEntry[]> {
  const entries = await loadJSON<JournalEntry[]>(Keys.journalEntries, []);
  const next = entries.filter((e) => e.id !== id);
  await saveJSON(Keys.journalEntries, next);
  return next.sort((a, b) => b.createdAt - a.createdAt);
}
