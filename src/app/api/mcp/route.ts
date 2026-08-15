import { NextRequest, NextResponse } from 'next/server';
import { getAllWikiPages, getWikiPageBySlug, getWikiGraphData } from '@/lib/wiki';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, slug, query } = body;

    if (action === 'capabilities') {
      return NextResponse.json({
        name: 'alim-personal-wiki-mcp',
        version: '1.0.0',
        description: 'Model Context Protocol endpoint for Alimzhan\'s AI-Wiki knowledge base.',
        tools: [
          {
            name: 'get_page',
            description: 'Retrieve full markdown content, frontmatter, and AST headings for a wiki document.',
            parameters: { type: 'object', properties: { slug: { type: 'string' } }, required: ['slug'] },
          },
          {
            name: 'search_wiki',
            description: 'Perform grounded zero-hallucination CategoryRAG search across wiki documentation.',
            parameters: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] },
          },
          {
            name: 'get_graph',
            description: 'Retrieve complete deterministic graph topology (nodes and links) mapping relationships between all concepts.',
            parameters: { type: 'object', properties: {} },
          },
        ],
      });
    }

    if (action === 'get_page') {
      if (!slug) {
        return NextResponse.json({ error: 'Missing slug parameter' }, { status: 400 });
      }
      const page = getWikiPageBySlug(slug);
      if (!page) {
        return NextResponse.json({ error: 'Page not found' }, { status: 404 });
      }
      return NextResponse.json({ page });
    }

    if (action === 'search_wiki') {
      if (!query) {
        return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
      }
      const allPages = getAllWikiPages();
      const q = query.toLowerCase();
      const results = allPages.filter((p) => 
        p.title.toLowerCase().includes(q) ||
        (p.summary && p.summary.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
        (p.category && p.category.toLowerCase().includes(q))
      );

      return NextResponse.json({
        query,
        count: results.length,
        results,
      });
    }

    if (action === 'get_graph') {
      const graph = getWikiGraphData();
      return NextResponse.json(graph);
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
