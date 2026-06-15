// src/lib/whisperVoice.ts
// Whisper's VOICE for Layer 1 — canned, mood-aware text. This is the seam that
// becomes a real Claude call in Layer 2: getWhisperReply() keeps its signature,
// only its insides change. The opener lines were approved by the team and double
// as the blueprint for the future system prompt.

import type { ChatMessage } from './chat';
import { supabase } from './supabase';

// ---------------------------------------------------------------------------
// Openers — Whisper speaks FIRST, in a tone matching the mood the user walked
// in with. 2-3 variants each so it doesn't feel robotic on repeat visits.
// ---------------------------------------------------------------------------

const OPENERS: Record<string, string[]> = {
  grateful: [
    "heyy 😊 i can feel it, something good's sitting in your heart today. tell me — what's got you grateful?",
    "hey you ✨ there's a lightness about you today. what's filling you up with gratitude?",
  ],
  hopeful: [
    "hey you 🌿 there's a little light in you today, isn't there? what's giving you hope?",
    "hey 🌅 something's stirring hope in you. i'd love to hear it — what is it?",
  ],
  peaceful: [
    "hey, friend. it feels calm and steady with you today 🕊️ what's bringing you peace?",
    "hey 🌿 there's a quiet in you today. want to sit in it together — what's settling your heart?",
  ],
  anxious: [
    "hey… i'm right here. take a breath, we don't have to rush anything. what's got your heart racing today?",
    "hey, i'm with you 🌿 no pressure, no rush. what's making you anxious right now?",
  ],
  drained: [
    "hey. you made it here, and that's enough for now. you sound worn out… want to tell me what's been draining you?",
    "hey 🌿 you don't have to carry anything in here. you seem tired — what's been taking so much from you?",
  ],
  overwhelmed: [
    "hey, i've got you. one thing at a time, okay? start wherever you want — what's feeling like too much right now?",
    "hey 🌿 breathe with me for a second. it's a lot, isn't it? tell me what's piling up.",
  ],
  default: [
    "hey 🌿 i'm here for you. how are you feeling right now?",
    "hey, friend 🌿 this is your safe place. what's on your heart today?",
  ],
};

// Pseudo-random pick that doesn't need Math.random at module load — uses a seed.
function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length];
}

/** The first thing Whisper says, chosen by the mood the user arrived with. */
export function getOpener(mood?: string | null): string {
  const pool = (mood && OPENERS[mood]) || OPENERS.default;
  // Vary by time so repeat opens differ without persistent state.
  const seed = Math.floor(Date.now() / 60000);
  return pick(pool, seed);
}

// ---------------------------------------------------------------------------
// Replies — LIGHT, warm reflective-listening templates. Deliberately NOT trying
// to fake intelligence; the real understanding arrives with Claude in L2. These
// just keep the space feeling alive and held in the meantime.
// ---------------------------------------------------------------------------

const REPLIES: string[] = [
  "thank you for trusting me with that.\n\ni'm here, and i'm listening. tell me more whenever you're ready.",
  "i hear you.\n\nthat sounds like a lot to hold. you don't have to carry it alone right now.",
  "mm. take your time with this.\n\nwhat does it feel like, sitting with that?",
  "i'm right here with you.\n\nyou're allowed to feel exactly what you're feeling.",
  "that matters. you matter.\n\nwhat's underneath it, if you had to name it?",
  "thank you for being honest.\n\nit takes courage to say these things out loud. i'm not going anywhere.",
];

/** Fallback canned reply, used only if the AI call fails (offline, error). */
function cannedReply(history: ChatMessage[], mood?: string | null): string {
  const seed = history.length + (mood ? mood.length : 0);
  return pick(REPLIES, seed);
}

// Map our transcript to the shape Claude expects. Only real dialogue turns
// (user + whisper) become messages; cards (scripture/prayer) are skipped.
function toClaudeMessages(history: ChatMessage[]) {
  return history
    .filter((m) => (m.role === 'user' || m.role === 'whisper') && m.text)
    .map((m) => ({
      role: m.role === 'whisper' ? 'assistant' : 'user',
      content: m.text as string,
    }));
}

/**
 * THE SEAM (now live). Calls the `whisper-chat` Supabase Edge Function, which
 * runs Claude with the Whisper persona. Falls back to a gentle canned reply if
 * the call fails so the conversation never breaks.
 */
export async function getWhisperReply(
  history: ChatMessage[],
  mood?: string | null
): Promise<string> {
  try {
    const messages = toClaudeMessages(history);
    // Claude requires the conversation to start with a user turn. Our opener is
    // a whisper message, so drop any leading assistant turns.
    while (messages.length && messages[0].role === 'assistant') messages.shift();
    if (messages.length === 0) return cannedReply(history, mood);

    const { data, error } = await supabase.functions.invoke('whisper-chat', {
      body: { messages, mood },
    });

    if (error || !data?.reply) {
      console.warn('[whisper] AI call failed, using fallback', error?.message);
      return cannedReply(history, mood);
    }
    return data.reply as string;
  } catch (e) {
    console.warn('[whisper] AI call threw, using fallback', e);
    return cannedReply(history, mood);
  }
}
