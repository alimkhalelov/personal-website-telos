import { NextRequest, NextResponse } from "next/server";
import { getAllWikiDocs, getWikiDocBySlug, getWikiGraph } from "@/lib/wiki";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || "capabilities";

    switch (action) {
      case "capabilities": {
        return NextResponse.json({
          server: "Alimzhan Demiurge Wiki MCP",
          version: "1.2.0",
          protocol: "2024-11-05",
          tools: [
            {
              name: "get_page",
              description: "Retrieve verified markdown document and frontmatter by slug",
              parameters: { type: "object", properties: { slug: { type: "string" } }, required: ["slug"] },
            },
            {
              name: "search_wiki",
              description: "Perform deterministic CategoryRAG fuzzy search across verified knowledge base",
              parameters: { type: "object", properties: { query: { type: "string" } }, required: ["query"] },
            },
            {
              name: "get_graph",
              description: "Retrieve full topological knowledge graph nodes and directional links",
              parameters: { type: "object", properties: {} },
            },
            {
              name: "list_pages",
              description: "List all indexed pages and categories",
              parameters: { type: "object", properties: {} },
            },
          ],
        });
      }

      case "get_page": {
        const slug = body.slug || "";
        const doc = getWikiDocBySlug(slug);
        if (!doc) {
          return NextResponse.json({ error: `Document '${slug}' not found` }, { status: 404 });
        }
        return NextResponse.json({ doc });
      }

      case "search_wiki": {
        const query = (body.query || "").toLowerCase();
        const allDocs = getAllWikiDocs();
        const results = allDocs.filter(
          (d) =>
            d.title.toLowerCase().includes(query) ||
            (d.summary && d.summary.toLowerCase().includes(query)) ||
            (d.tags && d.tags.some((t) => t.toLowerCase().includes(query))) ||
            d.content.toLowerCase().includes(query)
        ).map((d) => ({
          title: d.title,
          slug: d.slug,
          category: d.category,
          summary: d.summary,
          tags: d.tags,
        }));
        return NextResponse.json({ query, count: results.length, results });
      }

      case "get_graph": {
        const graph = getWikiGraph();
        return NextResponse.json(graph);
      }

      case "list_pages": {
        const allDocs = getAllWikiDocs();
        const list = allDocs.map((d) => ({
          title: d.title,
          slug: d.slug,
          category: d.category,
          summary: d.summary,
          tags: d.tags,
          version: d.version,
        }));
        return NextResponse.json({ pages: list });
      }

      default:
        return NextResponse.json({ error: `Unknown action '${action}'` }, { status: 400 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Demiurge Wiki MCP Endpoint",
    usage: "Send POST requests with { action: 'capabilities' | 'get_page' | 'search_wiki' | 'get_graph' | 'list_pages' }",
  });
}
