// src/lib/chat.ts
// Chat data layer: sessions + their message transcripts. Cloud-backed (Supabase)
// with a local mirror for instant/offline reads and an offline write queue.
// Screens call these helpers only. The `summary` column on a session is left
// empty in L1 — Claude fills it in L2 (memory / Follow-up), no restructuring.

import { Keys, loadJSON, saveJSON } from './storage';
import { supabase } from './supabase';

export type ChatRole = 'user' | 'whisper' | 'scripture' | 'prayer';

export interface ChatMessage {
  id: string;
  sessionId: string;
  role: ChatRole;
  text?: string;
  meta?: Record<string, any> | null; // verse/reference or prayer payload
  createdAt: number;
}

export interface ChatSession {
  id: string;
  title: string;
  openingMood?: string | null;
  createdAt: number;
  updatedAt: number;
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------

function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
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

// --- local mirrors -------------------------------------------------------
const readSessions = () => loadJSON<ChatSession[]>(Keys.chatSessions, []);
const writeSessions = (l: ChatSession[]) => saveJSON(Keys.chatSessions, l);

const readAllMessages = () =>
  loadJSON<Record<string, ChatMessage[]>>(Keys.chatMessages, {});
const writeAllMessages = (m: Record<string, ChatMessage[]>) =>
  saveJSON(Keys.chatMessages, m);

// --- offline queue -------------------------------------------------------
type QueueOp =
  | { op: 'insertSession'; session: ChatSession }
  | { op: 'touchSession'; id: string; updatedAt: number }
  | { op: 'renameSession'; id: string; title: string }
  | { op: 'insertMessage'; message: ChatMessage; userId: string };

async function enqueue(op: QueueOp): Promise<void> {
  const q = await loadJSON<QueueOp[]>(Keys.chatQueue, []);
  q.push(op);
  await saveJSON(Keys.chatQueue, q);
}

async function applyOp(op: QueueOp, userId: string): Promise<boolean> {
  try {
    if (op.op === 'insertSession') {
      const { error } = await supabase.from('chat_sessions').insert({
        id: op.session.id,
        user_id: userId,
        title: op.session.title,
        opening_mood: op.session.openingMood ?? null,
        created_at: new Date(op.session.createdAt).toISOString(),
        updated_at: new Date(op.session.updatedAt).toISOString(),
      });
      return !error;
    }
    if (op.op === 'touchSession') {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ updated_at: new Date(op.updatedAt).toISOString() })
        .eq('id', op.id);
      return !error;
    }
    if (op.op === 'renameSession') {
      const { error } = await supabase
        .from('chat_sessions')
        .update({ title: op.title })
        .eq('id', op.id);
      return !error;
    }
    // insertMessage
    const { error } = await supabase.from('chat_messages').insert({
      id: op.message.id,
      session_id: op.message.sessionId,
      user_id: op.userId,
      role: op.message.role,
      text: op.message.text ?? null,
      meta: op.message.meta ?? null,
      created_at: new Date(op.message.createdAt).toISOString(),
    });
    return !error;
  } catch {
    return false;
  }
}

async function flushQueue(userId: string): Promise<void> {
  const q = await loadJSON<QueueOp[]>(Keys.chatQueue, []);
  if (!q.length) return;
  const remaining: QueueOp[] = [];
  for (const op of q) {
    const ok = await applyOp(op, userId);
    if (!ok) remaining.push(op);
  }
  await saveJSON(Keys.chatQueue, remaining);
}

// ---------------------------------------------------------------------------
// public API
// ---------------------------------------------------------------------------

/** Start a fresh conversation. Persists the session and returns it. */
export async function createSession(openingMood?: string | null): Promise<ChatSession> {
  const now = Date.now();
  const session: ChatSession = {
    id: uuidv4(),
    title: 'New conversation',
    openingMood: openingMood ?? null,
    createdAt: now,
    updatedAt: now,
  };

  const sessions = await readSessions();
  await writeSessions([session, ...sessions]);

  const userId = await currentUserId();
  if (userId) {
    const { error } = await supabase.from('chat_sessions').insert({
      id: session.id,
      user_id: userId,
      title: session.title,
      opening_mood: session.openingMood,
      created_at: new Date(now).toISOString(),
      updated_at: new Date(now).toISOString(),
    });
    if (error) await enqueue({ op: 'insertSession', session });
  } else {
    await enqueue({ op: 'insertSession', session });
  }

  return session;
}

/** Append a message to a session's transcript. Returns the saved message. */
export async function addMessage(
  sessionId: string,
  role: ChatRole,
  text?: string,
  meta?: Record<string, any> | null
): Promise<ChatMessage> {
  const now = Date.now();
  const message: ChatMessage = {
    id: uuidv4(),
    sessionId,
    role,
    text,
    meta: meta ?? null,
    createdAt: now,
  };

  // local mirror: append to this session's transcript
  const all = await readAllMessages();
  all[sessionId] = [...(all[sessionId] ?? []), message];
  await writeAllMessages(all);

  // bump the session's updatedAt + maybe title from first user message
  const sessions = await readSessions();
  const next = sessions.map((s) =>
    s.id === sessionId
      ? {
          ...s,
          updatedAt: now,
          title:
            s.title === 'New conversation' && role === 'user' && text
              ? text.slice(0, 40)
              : s.title,
        }
      : s
  );
  await writeSessions(next);
  const updatedTitle = next.find((s) => s.id === sessionId)?.title;

  const userId = await currentUserId();
  if (userId) {
    const { error } = await supabase.from('chat_messages').insert({
      id: message.id,
      session_id: sessionId,
      user_id: userId,
      role,
      text: text ?? null,
      meta: meta ?? null,
      created_at: new Date(now).toISOString(),
    });
    if (error) await enqueue({ op: 'insertMessage', message, userId });

    // keep session fresh (and title, if it just changed)
    const { error: upErr } = await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date(now).toISOString(), title: updatedTitle })
      .eq('id', sessionId);
    if (upErr) await enqueue({ op: 'touchSession', id: sessionId, updatedAt: now });
  } else {
    await enqueue({ op: 'insertMessage', message, userId: '' });
    await enqueue({ op: 'touchSession', id: sessionId, updatedAt: now });
  }

  return message;
}

/** List past conversations, most recently updated first. */
export async function getSessions(): Promise<ChatSession[]> {
  const userId = await currentUserId();
  if (userId) {
    await flushQueue(userId);
    const { data, error } = await supabase
      .from('chat_sessions')
      .select('id, title, opening_mood, created_at, updated_at')
      .order('updated_at', { ascending: false });
    if (!error && data) {
      const sessions: ChatSession[] = data.map((r: any) => ({
        id: r.id,
        title: r.title,
        openingMood: r.opening_mood,
        createdAt: new Date(r.created_at).getTime(),
        updatedAt: new Date(r.updated_at).getTime(),
      }));
      await writeSessions(sessions);
      return sessions;
    }
  }
  const mirror = await readSessions();
  return [...mirror].sort((a, b) => b.updatedAt - a.updatedAt);
}

/** Load one conversation's full transcript, oldest message first. */
export async function getMessages(sessionId: string): Promise<ChatMessage[]> {
  const userId = await currentUserId();
  if (userId) {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('id, session_id, role, text, meta, created_at')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });
    if (!error && data) {
      const messages: ChatMessage[] = data.map((r: any) => ({
        id: r.id,
        sessionId: r.session_id,
        role: r.role,
        text: r.text ?? undefined,
        meta: r.meta ?? null,
        createdAt: new Date(r.created_at).getTime(),
      }));
      const all = await readAllMessages();
      all[sessionId] = messages;
      await writeAllMessages(all);
      return messages;
    }
  }
  const all = await readAllMessages();
  return all[sessionId] ?? [];
}
