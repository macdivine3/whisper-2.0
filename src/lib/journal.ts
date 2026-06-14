// src/lib/journal.ts
// Journal data layer. Cloud-backed (Supabase) with a local AsyncStorage mirror
// for instant + offline reads, and an offline write queue that flushes when the
// connection returns. Screens/components call these functions only — they never
// touch Supabase or storage directly, so the backend can change without UI edits.

import { Colors } from '../constants/theme';
import { Keys, loadJSON, saveJSON } from './storage';
import { supabase } from './supabase';

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

// ---------------------------------------------------------------------------
// Mood styling + small helpers (unchanged public API)
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Seeds — local-only placeholders for a brand-new user. Never uploaded to the
// cloud. Cleared the moment the user saves their first real entry (Option A).
// ---------------------------------------------------------------------------

const SEED_PREFIX = 'seed-';

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

// ---------------------------------------------------------------------------
// Internal helpers: ids, mapping, session, mirror, offline queue
// ---------------------------------------------------------------------------

/** RFC4122 v4 UUID — so a row gets the same id locally and in the cloud. */
function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const sortNewest = (list: JournalEntry[]) =>
  [...list].sort((a, b) => b.createdAt - a.createdAt);

const isSeed = (id: string) => id.startsWith(SEED_PREFIX);

interface CloudRow {
  id: string;
  title: string;
  body: string;
  mood: string;
  is_favorite: boolean;
  created_at: string;
}

function rowToEntry(row: CloudRow): JournalEntry {
  const createdAt = new Date(row.created_at).getTime();
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    excerpt: makeExcerpt(row.body),
    mood: row.mood,
    color: moodColor(row.mood),
    createdAt,
    date: formatDate(createdAt),
    isFavorite: row.is_favorite,
  };
}

function entryToRow(entry: JournalEntry, userId: string) {
  return {
    id: entry.id,
    user_id: userId,
    title: entry.title,
    body: entry.body,
    mood: entry.mood,
    is_favorite: !!entry.isFavorite,
    created_at: new Date(entry.createdAt).toISOString(),
  };
}

async function currentUserId(): Promise<string | null> {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id ?? null;
  } catch {
    return null;
  }
}

// Mirror = the last-known list of the user's real entries.
const readMirror = () => loadJSON<JournalEntry[]>(Keys.journalEntries, []);
const writeMirror = (list: JournalEntry[]) => saveJSON(Keys.journalEntries, list);

// Offline write queue. Each op replays against Supabase when we're back online.
type QueueOp =
  | { op: 'insert'; entry: JournalEntry }
  | { op: 'update'; id: string; isFavorite: boolean }
  | { op: 'delete'; id: string };

async function enqueue(op: QueueOp): Promise<void> {
  const queue = await loadJSON<QueueOp[]>(Keys.journalQueue, []);
  queue.push(op);
  await saveJSON(Keys.journalQueue, queue);
}

async function applyOp(op: QueueOp, userId: string): Promise<boolean> {
  try {
    if (op.op === 'insert') {
      const { error } = await supabase.from('journal_entries').insert(entryToRow(op.entry, userId));
      return !error;
    }
    if (op.op === 'update') {
      const { error } = await supabase
        .from('journal_entries')
        .update({ is_favorite: op.isFavorite, updated_at: new Date().toISOString() })
        .eq('id', op.id);
      return !error;
    }
    const { error } = await supabase.from('journal_entries').delete().eq('id', op.id);
    return !error;
  } catch {
    return false;
  }
}

/** Replay any queued offline writes. Keeps ops that still fail. */
async function flushQueue(userId: string): Promise<void> {
  const queue = await loadJSON<QueueOp[]>(Keys.journalQueue, []);
  if (!queue.length) return;
  const remaining: QueueOp[] = [];
  for (const op of queue) {
    const ok = await applyOp(op, userId);
    if (!ok) remaining.push(op);
  }
  await saveJSON(Keys.journalQueue, remaining);
}

/**
 * One-time migration: push any pre-existing LOCAL entries (from before the
 * cloud move) up to Supabase. Skips seeds. Runs once a session/user exists.
 */
async function migrateOnce(userId: string): Promise<void> {
  const done = await loadJSON<boolean>(Keys.journalMigrationDone, false);
  if (done) return;

  const mirror = await readMirror();
  const realLocal = mirror.filter((e) => !isSeed(e.id));

  for (const e of realLocal) {
    // Old entries had ids like "entry-123" which aren't valid UUIDs; re-id them.
    const entry = { ...e, id: uuidv4() };
    const { error } = await supabase.from('journal_entries').insert(entryToRow(entry, userId));
    if (error) {
      // Bail without marking done, so we retry next launch.
      console.warn('[journal] migration insert failed, will retry', error.message);
      return;
    }
  }

  if (realLocal.length > 0) {
    // They had real entries, so the demo seeds should never reappear.
    await saveJSON(Keys.journalSeedsDismissed, true);
  }
  await saveJSON(Keys.journalMigrationDone, true);
}

// ---------------------------------------------------------------------------
// Public API (same signatures the screens already use)
// ---------------------------------------------------------------------------

/**
 * Load all entries, newest first.
 * - Online: pulls from Supabase (source of truth) and refreshes the mirror.
 * - Offline: returns the local mirror instantly.
 * - Brand-new user with nothing in the cloud: shows seeds until their first save.
 */
export async function getEntries(): Promise<JournalEntry[]> {
  const userId = await currentUserId();

  // Online path: sync up (migration + queue) then pull down.
  if (userId) {
    await migrateOnce(userId);
    await flushQueue(userId);

    const { data, error } = await supabase
      .from('journal_entries')
      .select('id, title, body, mood, is_favorite, created_at')
      .order('created_at', { ascending: false });

    if (!error && data) {
      const entries = (data as CloudRow[]).map(rowToEntry);
      await writeMirror(entries);
      if (entries.length > 0) return entries;

      // Cloud empty — maybe a fresh user: show seeds unless already dismissed.
      const dismissed = await loadJSON<boolean>(Keys.journalSeedsDismissed, false);
      return dismissed ? [] : sortNewest(SEED_ENTRIES);
    }
    // fall through to offline path on error
  }

  // Offline path: use the mirror; seed a fresh user.
  const mirror = await readMirror();
  if (mirror.length > 0) return sortNewest(mirror);

  const dismissed = await loadJSON<boolean>(Keys.journalSeedsDismissed, false);
  return dismissed ? [] : sortNewest(SEED_ENTRIES);
}

/** Create and persist a new entry. Returns the saved entry. */
export async function addEntry(input: {
  title: string;
  body: string;
  mood: string;
}): Promise<JournalEntry> {
  const now = Date.now();
  const entry: JournalEntry = {
    id: uuidv4(),
    title: input.title.trim() || timeOfDayTitle(now),
    body: input.body.trim(),
    excerpt: makeExcerpt(input.body),
    mood: input.mood,
    color: moodColor(input.mood),
    createdAt: now,
    date: formatDate(now),
    isFavorite: false,
  };

  // First real save clears the demo seeds, forever (Option A).
  await saveJSON(Keys.journalSeedsDismissed, true);
  const mirror = (await readMirror()).filter((e) => !isSeed(e.id));
  await writeMirror([entry, ...mirror]);

  // Push to cloud, or queue it for later if offline.
  const userId = await currentUserId();
  if (userId) {
    const { error } = await supabase.from('journal_entries').insert(entryToRow(entry, userId));
    if (error) await enqueue({ op: 'insert', entry });
  } else {
    await enqueue({ op: 'insert', entry });
  }

  return entry;
}

/** Flip the favorite flag on one entry. Returns the updated list (newest first). */
export async function toggleFavorite(id: string): Promise<JournalEntry[]> {
  const mirror = await readMirror();
  const target = mirror.find((e) => e.id === id);
  const nextFav = target ? !target.isFavorite : true;
  const next = mirror.map((e) => (e.id === id ? { ...e, isFavorite: nextFav } : e));
  await writeMirror(next);

  // Seeds aren't real rows — only sync genuine entries.
  if (!isSeed(id)) {
    const userId = await currentUserId();
    if (userId) {
      const { error } = await supabase
        .from('journal_entries')
        .update({ is_favorite: nextFav, updated_at: new Date().toISOString() })
        .eq('id', id);
      if (error) await enqueue({ op: 'update', id, isFavorite: nextFav });
    } else {
      await enqueue({ op: 'update', id, isFavorite: nextFav });
    }
  }

  return sortNewest(next);
}

/** Permanently remove an entry. Returns the updated list (newest first). */
export async function deleteEntry(id: string): Promise<JournalEntry[]> {
  const next = (await readMirror()).filter((e) => e.id !== id);
  await writeMirror(next);

  if (!isSeed(id)) {
    const userId = await currentUserId();
    if (userId) {
      const { error } = await supabase.from('journal_entries').delete().eq('id', id);
      if (error) await enqueue({ op: 'delete', id });
    } else {
      await enqueue({ op: 'delete', id });
    }
  }

  return sortNewest(next);
}
