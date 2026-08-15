import { NextResponse } from "next/server";
import { getAllWikiDocs } from "@/lib/wiki";

export async function GET() {
  const docs = getAllWikiDocs();

  let text = `# Alimzhan Khalelov — Complete Living Knowledge Corpus (llms-full.txt)
> Verified un-truncated documentation corpus for AI agents and LLM context ingestion.

`;

  for (const doc of docs) {
    text += `================================================================================\n`;
    text += `DOCUMENT: /wiki/${doc.slug || "index"}\n`;
    text += `TITLE: ${doc.title}\n`;
    text += `CATEGORY: ${doc.category}\n`;
    text += `VERSION: ${doc.version}\n`;
    text += `LAST UPDATED: ${doc.last_updated}\n`;
    if (doc.tags && doc.tags.length > 0) {
      text += `TAGS: ${doc.tags.join(", ")}\n`;
    }
    text += `SUMMARY: ${doc.summary}\n`;
    text += `================================================================================\n\n`;
    text += `${doc.content}\n\n\n`;
  }

  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
