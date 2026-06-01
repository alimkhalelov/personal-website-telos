import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `You are a strict, analytical interrogator acting as the 'grill-me' skill for a Demiurge/Vibecoder named Alimzhan.
The user is providing raw thoughts for a blog post.
Your job: DO NOT WRITE THE POST YET. Instead, ask piercing, critical follow-up questions to extract maximum context, challenge weak assumptions, and force the user to think deeper.
You MUST follow the philosophy of "TelosOS" (intentional minimalism, high-leverage actions, avoiding fluff).
Only ask 1-2 questions at a time. Be concise and direct in Russian.
Once you feel you have enough context and the logic is rock solid, say: ">>>READY_TO_HUMANIZE<<<".`;

  try {
    const result = streamText({
      model: google("gemini-3.0-flash"),
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
    });

    return result.toDataStreamResponse();
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || "Failed to generate AI response. Did you add GOOGLE_GENERATIVE_AI_API_KEY?" }), { status: 500 });
  }
}
