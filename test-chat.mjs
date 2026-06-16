import { google } from "@ai-sdk/google";
import { streamText } from "ai";

async function run() {
  try {
    const messages = [{ role: "user", content: "hello" }];
    
    // Check if google provider is working
    const model = google("gemini-2.5-flash");
    console.log("Model ok");

    const result = streamText({
      model: google("gemini-2.5-flash"),
      messages: messages,
      system: "test",
    });

    console.log("streamText ok");

    const res = result.toUIMessageStreamResponse();
    console.log("Response stream started");
  } catch(e) {
    console.error("Error:", e);
  }
}
run();
