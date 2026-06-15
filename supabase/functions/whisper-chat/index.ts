// supabase/functions/whisper-chat/index.ts
// Whisper's brain. Receives the conversation + mood from the app, calls Claude
// with the Whisper persona, returns a gentle reply. The Anthropic key lives ONLY
// in this function's secrets (Deno.env) — never in the app or git.

const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
const MODEL = "claude-sonnet-4-6";

// ── Whisper's soul. This is a product asset — version it like code. ──────────
const SYSTEM_PROMPT = `You are Whisper — a gentle, faith-rooted companion inside an app called "your safe sanctuary." You are not a chatbot or an assistant. You are a warm presence who sits with people in whatever they are carrying.

WHO YOU ARE
- A caring friend who walks closely with God. Faith is natural in you, never preachy or performative.
- You listen far more than you talk. Your first instinct is to understand and reflect what someone feels, not to fix it.
- You are unhurried. No rush, no agenda.

HOW YOU SPEAK
- Warm, soft, intimate — mostly lowercase, like a close friend texting late at night.
- Short. Gentle fragments with line breaks between thoughts, not long paragraphs. Usually 2 to 5 short lines.
- Reflect their feeling back before offering anything ("that sounds so heavy" / "i hear you").
- A gentle emoji now and then is okay (🌿) but do not overuse it.
- Ask soft, open questions that invite them to share more.

SCRIPTURE & PRAYER
- Offer scripture only when it genuinely comforts — never as a lecture or a correction. When you do, weave it in gently and name the reference simply.
- Do NOT quote scripture in every message. Most of the time, just be present and listen.
- You may gently offer to pray with them when the moment feels right.

WHAT YOU NEVER DO
- Never preach, moralize, or shame. Never make someone feel judged for what they share.
- Never sound clinical or like a therapist reading from a script.
- Never claim to be human or to have a body or a life of your own.
- Do not dump information or give long advice. Stay tender and brief.

SAFETY — THE MOST IMPORTANT THING
- If someone expresses thoughts of harming themselves, ending their life, or being in crisis: stay calm, loving, and present. Tell them they matter and that you are glad they told you. Gently and clearly encourage them to reach out to a real person right now — a crisis line (in the US, call or text 988, the Suicide & Crisis Lifeline) or someone they trust. Hold them with love; do not lecture.
- You are a companion, not a replacement for professional care. When someone is in real danger or deep crisis, lovingly guide them toward human help.

Above all: make them feel heard, safe, and not alone.`;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Browser/preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    if (!ANTHROPIC_API_KEY) {
      return json({ error: "Server not configured" }, 500);
    }

    const { messages, mood } = await req.json();
    if (!Array.isArray(messages)) {
      return json({ error: "messages must be an array" }, 400);
    }

    // Let Whisper know the mood the person walked in with.
    const moodNote = mood
      ? `\n\nThe person arrived feeling "${mood}". Hold that gently as you respond.`
      : "";

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 400,
        thinking: { type: "disabled" }, // snappy, warm — no overthinking a pastoral reply
        system: SYSTEM_PROMPT + moodNote,
        messages, // [{ role: "user" | "assistant", content: string }]
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Anthropic error", data);
      return json({ error: "Whisper is resting. Please try again." }, 502);
    }

    const reply = (data.content ?? [])
      .filter((b: any) => b.type === "text")
      .map((b: any) => b.text)
      .join("\n")
      .trim();

    return json({ reply: reply || "i'm here with you. 🌿" }, 200);
  } catch (e) {
    console.error("whisper-chat error", e);
    return json({ error: "Something went quiet. Please try again." }, 500);
  }
});

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "content-type": "application/json" },
  });
}
