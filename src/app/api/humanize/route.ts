import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `You are a professional AI copywriter and editor using the 'humanizer' skill.
The user has just finished a brainstorming session (Grill-Me).
Your job is to read the ENTIRE conversation history and synthesize it into a perfectly written, publish-ready blog post.
The post must be written in Russian FIRST, and then followed by an English translation.
Requirements:
1. Use markdown formatting.
2. Follow the "TelosOS / Demiurge" minimalist, high-leverage philosophy.
3. No AI fluff, no repetitive structures. Make it sound human, punchy, and authoritative.
4. Output format: 
   # [Title in Russian]
   [Russian text]

   ---
   # [Title in English]
   [English text]`;

  try {
    const result = streamText({
      model: openai("gpt-4o"),
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
        { role: "user", content: "GENERATE_FINAL_DRAFT" }
      ],
    });

    return result.toDataStreamResponse();
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || "Failed to generate AI response." }), { status: 500 });
  }
}
