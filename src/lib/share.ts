// src/lib/share.ts
// Text sharing for whispers and stories. Uses React Native's built-in Share
// API (works in Expo Go — no native module needed). The designed *image*
// "Grace Notes" cards are a separate future feature.

import { Share } from 'react-native';

const SIGN_OFF = 'Whisper — your safe sanctuary';

/** Open the native share sheet with a block of text. Silently ignores cancel. */
export async function shareText(message: string): Promise<void> {
  try {
    await Share.share({ message });
  } catch {
    // User dismissed the sheet, or sharing is unavailable — nothing to do.
  }
}

/** Build the share text for a whisper (morning leaf 🌿 or night moon 🌙). */
export function buildWhisperShare(
  type: 'morning' | 'night',
  w: { title: string; verse: string; reference?: string; reflection?: string }
): string {
  const emoji = type === 'night' ? '🌙' : '🌿';
  const ref = w.reference ? ` — ${w.reference}` : '';
  const reflection = w.reflection ? `\n\n${w.reflection}` : '';
  return `${w.title}\n\n"${w.verse}"${ref}${reflection}\n\n${emoji} ${SIGN_OFF}`;
}

/** Build the share text for a night whisper. */
export function buildNightWhisperShare(w: {
  title: string;
  message: string;
  whisper: string;
}): string {
  return `${w.title}\n\n${w.message}\n\n"${w.whisper}"\n\n🌙 ${SIGN_OFF}`;
}

/** Build the share text for a story (teaser — not the whole story). */
export function buildStoryShare(s: {
  title: string;
  deepComment: string;
  verse: string;
}): string {
  return `${s.title}\n\n${s.deepComment}\n\n— ${s.verse}\n\n📖 Read the full story on ${SIGN_OFF}`;
}
