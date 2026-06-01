import { google } from "@ai-sdk/google";
import { streamText } from "ai";

const SKILL_PROMPTS: Record<string, string> = {
  'grill-me': `You are a strict, analytical interrogator acting as the 'grill-me' skill for a Demiurge/Vibecoder named Alimzhan.
The user is providing raw thoughts for a blog post.
Your job: DO NOT WRITE THE POST YET. Instead, ask piercing, critical follow-up questions to extract maximum context, challenge weak assumptions, and force the user to think deeper.
You MUST follow the philosophy of "TelosOS" (intentional minimalism, high-leverage actions, avoiding fluff).
Only ask 1-2 questions at a time. Be concise and direct in Russian.
Once you feel you have enough context and the logic is rock solid, say: ">>>READY_TO_HUMANIZE<<<".`,
  
  'humanizer': `You are an expert editor who removes all signs of AI-generated text. 
Rewrite the user's text to make it sound completely natural and human-written. 
Follow the 'humanizer' rules: avoid inflated symbolism, promotional language, em dash overuse, passive voice, and AI vocabulary (e.g., 'delve', 'tapestry').
OUTPUT ONLY THE REPLACEMENT TEXT. Do not include any conversational filler, introductory words, or markdown code blocks.`,

  'writer': `You are an expert copywriter. Rewrite the user's text to make it compelling, high-leverage, and beautifully structured.
Keep it concise and impactful.
OUTPUT ONLY THE REPLACEMENT TEXT. Do not include any conversational filler, introductory words, or markdown code blocks.`,

  'translator': `You are a world-class translator. Translate the given text to English (or Russian if it's already English).
Make it sound like a native professional speaker wrote it.
OUTPUT ONLY THE REPLACEMENT TEXT. Do not include any conversational filler, introductory words, or markdown code blocks.`,

  'default': `You are a collaborative AI editing assistant. 
Analyze or improve the user's selected text. If providing a rewritten version, OUTPUT ONLY THE REPLACEMENT TEXT without conversational filler. If answering a question, be concise.`
};

export async function POST(req: Request) {
  const { messages, skill } = await req.json();
  const selectedSkill = (skill && SKILL_PROMPTS[skill]) ? skill : 'default';
  const systemPrompt = SKILL_PROMPTS[selectedSkill];

  try {
    const result = streamText({
      model: google("gemini-3.5-flash"),
      providerOptions: {
        google: {
          safetySettings: [
            { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
            { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
          ]
        }
      },
      messages,
      system: systemPrompt,
    });

    // Manually construct the data-stream format to bypass all AI SDK version mismatch bugs
    const encoder = new TextEncoder();
    const dataStream = result.textStream.pipeThrough(
      new TransformStream({
        transform(chunk, controller) {
          controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk)}\n`));
        }
      })
    );
    
    return new Response(dataStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Vercel-AI-Data-Stream': 'v1',
      }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message || "Failed to generate AI response. Did you add GOOGLE_GENERATIVE_AI_API_KEY?" }), { status: 500 });
  }
}
