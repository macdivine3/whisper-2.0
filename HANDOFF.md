# Whisper App — AI Handoff Document

> Paste this to any AI assistant to continue the work. It explains what the app is,
> the architecture decisions made, exactly where we are, and what's left to do.
> **Current task: finishing the Claude AI integration ("Layer 2") for the chat.**

---

## 1. What Whisper is

A faith-based emotional wellness mobile app. Tagline: **"your safe sanctuary."**
Brand promise: *"you were made to be heard."* It's a gentle space to pray, reflect,
journal, and talk to **Whisper** — an AI companion who listens like a caring,
faith-rooted friend (never preachy, speaks in short gentle fragments, offers
scripture only as comfort).

**Stack:** Expo (SDK 56, React Native 0.85) + expo-router (file-based routing) +
TypeScript. Backend = **Supabase** (anonymous auth + Postgres + Edge Functions).
AI = **Anthropic Claude**, model `claude-sonnet-4-6`.

**Project root:** `C:\Users\User PC\Documents\whisper 2.0`
Source lives in `src/`. Runs in **Expo Go** (no dev build needed for current work).

---

## 2. How we work (IMPORTANT — read before doing anything)

- **Do NOT write code until the user explicitly approves.** Discuss suggestions,
  tradeoffs, and a plan FIRST, then wait for a clear "go." The user often has more
  context to add. Staying on the same page matters more than speed.
- Build **screen by screen**, making each fully real before moving on (not
  feature-by-feature).
- The user is the product owner/designer; they want a PM/marketer/developer
  perspective, not just code.
- Before writing Expo SDK 56 code, prefer checking versioned docs (per AGENTS.md).
- Typecheck after changes: `node_modules/.bin/tsc --noEmit` (plain `npx tsc` was
  getting sandbox-blocked; the local binary path worked).

---

## 3. Architecture & data layers (already built, working)

All persistence goes through small "data layer" files in `src/lib/` so screens
never touch Supabase/storage directly. This is deliberate — swapping backends only
touches the lib file.

- `src/lib/storage.ts` — typed AsyncStorage wrapper (`loadJSON`/`saveJSON`/`remove`)
  + central `Keys` registry.
- `src/lib/supabase.ts` — Supabase client (keys from `.env`, session persisted to
  AsyncStorage) + `ensureSession()` which signs in **anonymously** on launch (this
  is the device identity; upgradeable to a real account later). Called in
  `src/app/_layout.tsx`.
- `src/lib/journal.ts` — journal entries. **Cloud-backed (Supabase) with a local
  mirror for instant/offline reads + an offline write queue.** Seeds (4 demo
  entries) show for new users and are cleared on first real entry (Option A).
- `src/lib/mood.ts` — mood timeline (`logMood`/`getMoodTimeline`/`getLatestMood`),
  Supabase-backed.
- `src/lib/chat.ts` — chat sessions + message transcripts. Cloud-backed + local
  mirror + offline queue. `createSession`, `addMessage`, `getSessions`,
  `getMessages`. Roles: `user | whisper | scripture | prayer`. The `summary` column
  on sessions is intentionally left EMPTY in L1 (Claude fills it in L2).
- `src/lib/prayers.ts` — canned prayers per theme/mood + `savePrayer`/`getSavedPrayers`.
- `src/lib/verses.ts` — `saveVerse`/`getSavedVerses` (backs ScriptureCard save).
- `src/lib/share.ts` — text share builders (whisper/story/prayer). Image "Grace
  Note" cards are a FUTURE feature (needs dev build — parked).
- `src/lib/whisperVoice.ts` — **the AI seam.** Mood-aware openers + canned fallback
  replies + `getWhisperReply()`. **This is the file mid-edit for L2 (see §5).**

**Env file** `.env` (git-ignored) contains:
```
EXPO_PUBLIC_SUPABASE_URL=https://ftuzhlnynagvimeuvwdq.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_KUMNJ4UlOra1BQsHSKX5Iw_PLuHkNv0
```
(The Supabase "publishable key" = the new name for the anon key. Safe to ship.)

---

## 4. Supabase tables (already created via SQL editor)

`moods`, `journal_entries`, `chat_sessions`, `chat_messages`, `saved_prayers`,
`saved_verses`. All have Row-Level Security so each anonymous user only sees their
own rows. `chat_sessions` has an empty `summary` column reserved for L2.
**Anonymous sign-ins are ENABLED** in Supabase Auth.

---

## 5. WHERE WE ARE RIGHT NOW (the active task)

We're wiring the **real Claude AI** into the chat (called "Layer 2" / "L2").
The chat screen, persistence, prayer cards, mood-aware openers etc. ("Layer 1")
are all DONE and working in Expo Go. Now the AI brain.

**Architecture for the AI (decided & partially built):**
`app → Supabase Edge Function (holds the secret Anthropic key) → Claude → back`.
The Anthropic key must NEVER be in the app or git — only in the Edge Function's
secrets. Model: `claude-sonnet-4-6`. Chat is just an HTTPS call, so **it works in
Expo Go — no dev build needed.**

### What's already been written for L2:
1. **`supabase/functions/whisper-chat/index.ts`** — the Edge Function. Holds the
   Whisper system prompt (the "soul"), receives `{ messages, mood }`, calls the
   Anthropic Messages API with `model: claude-sonnet-4-6`, `max_tokens: 400`,
   `thinking: { type: "disabled" }`, returns `{ reply }`. Includes a crisis-safety
   instruction (988 lifeline) in the system prompt. **This file is written and on
   disk.**
2. **`src/lib/whisperVoice.ts`** — `getWhisperReply()` now calls
   `supabase.functions.invoke('whisper-chat', { body: { messages, mood } })`,
   maps the transcript to Claude's `{role, content}` shape (only `user`/`whisper`
   turns; drops leading assistant turns since Claude must start with a user turn),
   and **falls back to canned replies if the call fails** so chat never breaks.
   **This edit is done.**
3. **`src/app/(tabs)/whispers.tsx`** — removed the old hardcoded 1.5s
   `setTimeout` delay; the typing indicator now shows for the real duration of the
   AI call. **This edit is done.**

### WHAT'S LEFT TO DO (the remaining steps):

**A. Deploy the Edge Function + set the secret (USER + AI together).**
The function exists locally but is NOT deployed yet. Steps:
1. The user needs the **Supabase CLI** (or deploy via dashboard). Options:
   - CLI: `npx supabase login`, then `npx supabase link --project-ref ftuzhlnynagvimeuvwdq`,
     then `npx supabase functions deploy whisper-chat --no-verify-jwt`.
     (`--no-verify-jwt` because anonymous users call it; RLS still protects data.
     Reconsider if you want stricter auth.)
   - Or create the function in the Supabase dashboard UI and paste the code.
2. **Set the secret** (NEVER in code):
   `npx supabase secrets set ANTHROPIC_API_KEY=sk-ant-...`
   (or in dashboard: Edge Functions → Manage secrets).
3. **Anthropic key:** the user generated one starting `sk-ant-api03-...`.
   ⚠️ **SECURITY: that key was pasted in plaintext chat and SHOULD BE ROTATED**
   in the Anthropic console before/after going live. Set the rotated key as the
   Supabase secret.

**B. Test end-to-end.**
`npx expo start -c` → open chat → pick a mood on Home first → send a message →
confirm Whisper replies in-character (warm, short, lowercase, fragments). Check
the Supabase function logs if it falls back to canned replies (means the call
failed — likely the secret isn't set or the function isn't deployed).

**C. Verify typecheck is clean:** `node_modules/.bin/tsc --noEmit`.
(There was a transient sandbox outage blocking tsc during the last session; the
edits were manually reviewed as clean but should be formally typechecked.)

**D. Then, remaining L2 polish (discuss with user before building each):**
- **Session summaries** — when a session ends, have Claude write a 1–2 line gentle
  summary into `chat_sessions.summary`. This powers (a) the Follow-up "you last
  shared…" excerpt and (b) cross-session memory. NOT built yet (was correctly
  deferred — needs the AI). The column already exists.
- **Memory continuity** — feed recent session summaries + mood timeline into the
  system prompt so Whisper "remembers" ("last time you were carrying a lot…").
- **Discernment-driven prayer/scripture** — currently prayer is user-initiated via
  a "pray with me" button above the input. In L2, Claude can decide when to offer a
  prayer or scripture (the under-message prayer pill returns, but driven by AI
  judgment). Storytelling (Whisper weaving a story that mirrors the user's
  situation) is also an L2 discernment feature.
- **Follow-up screen wiring** — make "Whisper remembers you've been feeling…" read
  the REAL mood/summary data (currently hardcoded mock).

---

## 6. The four tabs / screens (status)

- **Home** (`src/app/(tabs)/index.tsx`) — DONE. Time-based whisper card
  (morning 8am–6pm light card, night 6pm–8am — currently both use the light
  `WhisperCard` with night content/labels; the dark `NightWhisperCard` is shelved
  for a future full "night mode"). Story card opens a full-screen reader
  (`src/app/story.tsx`). Mood grid logs mood to Supabase on "continue" and passes
  it to chat as a route param. Dynamic time-aware rotating greeting (sun by day,
  candle at night). Text sharing works.
- **Whispers** (`src/app/(tabs)/whispers.tsx`) — chat. L1 done; L2 in progress
  (this doc's focus). Mood-aware opener with leaf+emoji, real send/typing/persist,
  past-chats menu (3-dot), "new chat", "what is whisper?" explainer modal,
  "pray with me" button → PrayerCard.
- **Journal** (`src/app/(tabs)/journal.tsx`) — DONE. Cloud-backed entries, a
  full-screen writer (`src/app/journal-entry.tsx`) with mood mirror line + auto
  time-of-day title, favorites, long-press to delete, offline support.
- **Follow-up** (`src/app/(tabs)/follow-up.tsx`) — mostly mock UI. Will be wired
  LAST, using real mood/summary data (depends on §5.D). "Care log" and "reminders"
  sub-tabs are placeholders.

---

## 7. Design system (match this for any UI work)

`src/constants/theme.ts` is the single source of truth. Warm parchment + olive
green. Key tokens: `Colors.green.primary #3A4434`, `Colors.green.secondary #596F52`,
`Colors.bg.primary #FDFBF7`, mood colors + pastel backgrounds. Fonts: NotoSerif
(headings/scripture), Inter (UI). Use `Spacing`, `Radius`, `Shadows` tokens.
Lowercase, gentle, intimate tone throughout the UI copy.

---

## 8. Parked / future (do NOT build now, needs a dev build)

- **Grace Notes** — shareable IMAGE cards (whispers/prayers/stories rendered over
  watercolor backgrounds, captured to image via `react-native-view-shot`).
  Decisions locked, 3 morning backgrounds ready in `assets/grace-cards/`. Needs a
  one-time `eas build` dev build (also needed for voice journaling). See the
  text-share functions in `share.ts` — they'll swap to image cards later.
- **Voice journaling** — on-device speech-to-text. Dev build needed. Dropped for now.

---

## 9. Immediate next action for the AI reading this

The chat AI code is written but the **Edge Function isn't deployed and the secret
isn't set.** So right now the chat will FALL BACK to canned replies. The next
concrete step is **§5.A** — guide the user to deploy `whisper-chat` and set the
`ANTHROPIC_API_KEY` secret in Supabase, then test (§5.B). Remember the rule:
**discuss/guide first, get the user's go before writing more code.** Help them
deploy, then verify Whisper replies in character.
