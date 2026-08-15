import { NextResponse } from 'next/server';
import { getAllWikiPages } from '@/lib/wiki';

export async function GET() {
  const allPages = getAllWikiPages();

  let content = `# Alimzhan Khalelov — Knowledge Base & Autonomous Systems
> Living AI-Wiki and architectural documentation for Alimzhan Khalelov (AI-Native Product Manager, Game Designer, Demiurge/Vibecoder).
> Canonical URL: https://alim.dest.page/wiki

## Core Methodologies & Concepts
`;

  for (const page of allPages) {
    content += `\n- [${page.title}](https://alim.dest.page/wiki/${page.slug}): ${page.summary || 'Verified architectural concept.'}`;
  }

  content += `\n
## Machine Interfaces
- [Knowledge Graph](https://alim.dest.page/wiki/graph): Interactive 2D topological graph of system concepts.
- [Serverless MCP API](https://alim.dest.page/api/mcp): Model Context Protocol endpoint for LLM tools.
- [Product Releases](https://alim.dest.page/wiki/log): Chronological Git ledger and milestone changelog.
`;

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
