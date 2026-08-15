import { NextResponse } from "next/server";
import { getAllWikiDocs } from "@/lib/wiki";

export async function GET() {
  const docs = getAllWikiDocs();

  let text = `# Alimzhan Khalelov — Living Knowledge Base (llms.txt)
> AI-Native Product Manager, Game Designer, Demiurge & Vibecoder.
> Master index of verified production concepts, entities, and autonomous systems.

## Concepts & Methodologies
`;

  for (const doc of docs.filter((d) => d.category.toLowerCase().includes("concept"))) {
    text += `- [${doc.title}](https://alim.dest.page/wiki/${doc.slug}): ${doc.summary || "Core concept"}\n`;
  }

  text += `\n## Entities & Creator Profile\n`;
  for (const doc of docs.filter((d) => d.category.toLowerCase().includes("entit"))) {
    text += `- [${doc.title}](https://alim.dest.page/wiki/${doc.slug}): ${doc.summary || "Core entity"}\n`;
  }

  text += `\n## Autonomous Systems & Infrastructure\n`;
  for (const doc of docs.filter((d) => d.category.toLowerCase().includes("system"))) {
    text += `- [${doc.title}](https://alim.dest.page/wiki/${doc.slug}): ${doc.summary || "Core system"}\n`;
  }

  text += `\n## Programmatic Access\n`;
  text += `- Model Context Protocol: https://alim.dest.page/api/mcp\n`;
  text += `- Full Raw Corpus: https://alim.dest.page/llms-full.txt\n`;

  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
