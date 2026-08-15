import { getAllWikiDocs } from "@/lib/wiki";
import { DocsLayout } from "@/components/wiki/DocsLayout";
import { Terminal, Code, Sparkles, Send, Check } from "lucide-react";

export const metadata = {
  title: "Serverless MCP & API Reference | Wiki",
  description: "Documentation for Model Context Protocol (MCP) endpoints and machine-readable APIs.",
};

export default function ApiReferencePage() {
  const allDocs = getAllWikiDocs();

  const apiMeta = {
    title: "Serverless Model Context Protocol (MCP) API Reference",
    slug: "api-reference",
    summary: "Machine interfaces, tools, and endpoints allowing AI assistants, IDE sidecars, and automated subagents to query the verified knowledge base.",
    category: "Machine API",
    tags: ["MCP", "OpenAPI", "APIs", "Serverless"],
    version: "v1.2.0-MCP",
    last_updated: "2026-08-15",
  };

  return (
    <DocsLayout currentPage={apiMeta} allPages={allDocs} showProperties={true}>
      <div className="space-y-8">
        <p className="text-sm text-muted-foreground leading-relaxed">
          The wiki exposes a high-performance, stateless Model Context Protocol (MCP) endpoint at <code className="text-blue-500 font-mono text-xs bg-muted px-1.5 py-0.5 rounded">/api/mcp</code>. It accepts standard JSON POST requests with zero authentication for public knowledge queries.
        </p>

        {/* Action 1: Capabilities */}
        <div className="p-5 rounded-xl border border-border bg-card/50 space-y-3 not-prose">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">POST</span>
              <span className="font-mono text-xs font-semibold text-foreground">/api/mcp</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">action: "capabilities"</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Returns supported tool definitions, protocol version, and server metadata.
          </p>
          <pre className="p-3 rounded-lg bg-muted/60 border border-border text-[11px] font-mono text-foreground/90 overflow-x-auto">
{`curl -X POST https://alim.dest.page/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"action": "capabilities"}'`}
          </pre>
        </div>

        {/* Action 2: Get Page */}
        <div className="p-5 rounded-xl border border-border bg-card/50 space-y-3 not-prose">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">POST</span>
              <span className="font-mono text-xs font-semibold text-foreground">/api/mcp</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">action: "get_page"</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Retrieves verified markdown content, frontmatter, and AST backlinks for a specific slug.
          </p>
          <pre className="p-3 rounded-lg bg-muted/60 border border-border text-[11px] font-mono text-foreground/90 overflow-x-auto">
{`curl -X POST https://alim.dest.page/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"action": "get_page", "slug": "concepts/loop-engineering"}'`}
          </pre>
        </div>

        {/* Action 3: Search Wiki */}
        <div className="p-5 rounded-xl border border-border bg-card/50 space-y-3 not-prose">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-purple-500/10 text-purple-500 border border-purple-500/20">POST</span>
              <span className="font-mono text-xs font-semibold text-foreground">/api/mcp</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">action: "search_wiki"</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Executes a deterministic CategoryRAG query with zero-hallucination guarantees.
          </p>
          <pre className="p-3 rounded-lg bg-muted/60 border border-border text-[11px] font-mono text-foreground/90 overflow-x-auto">
{`curl -X POST https://alim.dest.page/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"action": "search_wiki", "query": "Fan-Filter-Scale"}'`}
          </pre>
        </div>

        {/* Action 4: Get Graph */}
        <div className="p-5 rounded-xl border border-border bg-card/50 space-y-3 not-prose">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20">POST</span>
              <span className="font-mono text-xs font-semibold text-foreground">/api/mcp</span>
            </div>
            <span className="text-xs text-muted-foreground font-mono">action: "get_graph"</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Returns all topological graph nodes, node degrees, categories, and directional links.
          </p>
          <pre className="p-3 rounded-lg bg-muted/60 border border-border text-[11px] font-mono text-foreground/90 overflow-x-auto">
{`curl -X POST https://alim.dest.page/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"action": "get_graph"}'`}
          </pre>
        </div>
      </div>
    </DocsLayout>
  );
}
