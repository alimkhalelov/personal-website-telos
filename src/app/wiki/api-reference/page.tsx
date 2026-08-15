import React from 'react';
import { getAllWikiPages } from '@/lib/wiki';
import { DocsLayout } from '@/components/wiki/DocsLayout';
import { Terminal, Code, Cpu } from 'lucide-react';

export const metadata = {
  title: 'Serverless MCP & API Reference | AI-Wiki',
  description: 'Model Context Protocol endpoint specifications and machine interfaces.',
};

export default function WikiApiReferencePage() {
  const allPages = getAllWikiPages();

  const currentPage = {
    title: 'Serverless MCP API & Machine Interfaces',
    slug: 'api-reference',
    category: 'API & Machine Interfaces',
    summary: 'The Model Context Protocol (MCP) serverless endpoint allows AI agents and LLM tools to dynamically inspect the knowledge graph, query CategoryRAG, and retrieve verified documentation nodes.',
    tags: ['MCP', 'Model Context Protocol', 'API Reference', 'Serverless', 'JSON API'],
    version: 'v1.0.0 (Verified AST)',
    last_updated: '2026-08-15',
    headings: [
      { depth: 2, slug: 'endpoint-spec', text: 'Endpoint Specifications' },
      { depth: 2, slug: 'supported-actions', text: 'Supported Actions & Payloads' },
      { depth: 2, slug: 'code-examples', text: 'Code Examples & cURL' },
    ],
  };

  return (
    <DocsLayout currentPage={currentPage} allPages={allPages}>
      <div className="space-y-10">
        {/* Section 1: Endpoint Spec */}
        <section id="endpoint-spec" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Terminal className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground m-0">
              Endpoint Specifications
            </h2>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">
            The AI-Wiki platform provides a unified JSON-RPC-like serverless endpoint for external LLM subagents and IDE plugins.
          </p>

          <div className="p-4 rounded-xl border border-border bg-card space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold border border-blue-500/20">
                POST
              </span>
              <span className="text-foreground">/api/mcp</span>
            </div>
            <div className="text-muted-foreground">
              Content-Type: application/json
            </div>
          </div>
        </section>

        {/* Section 2: Supported Actions */}
        <section id="supported-actions" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Cpu className="w-5 h-5 text-purple-500" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground m-0">
              Supported Actions & Payloads
            </h2>
          </div>

          <div className="space-y-4">
            {/* Action 1: capabilities */}
            <div className="p-5 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accent">action: &quot;capabilities&quot;</span>
                <span className="text-[11px] text-muted-foreground">Server metadata & available tools</span>
              </div>
              <pre className="p-3 rounded-lg bg-muted/40 text-xs font-mono text-foreground/90 overflow-x-auto">
{`{
  "action": "capabilities"
}`}
              </pre>
            </div>

            {/* Action 2: get_page */}
            <div className="p-5 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accent">action: &quot;get_page&quot;</span>
                <span className="text-[11px] text-muted-foreground">Retrieve raw page AST & frontmatter</span>
              </div>
              <pre className="p-3 rounded-lg bg-muted/40 text-xs font-mono text-foreground/90 overflow-x-auto">
{`{
  "action": "get_page",
  "slug": "fan-filter-scale"
}`}
              </pre>
            </div>

            {/* Action 3: search_wiki */}
            <div className="p-5 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accent">action: &quot;search_wiki&quot;</span>
                <span className="text-[11px] text-muted-foreground">Grounded CategoryRAG query search</span>
              </div>
              <pre className="p-3 rounded-lg bg-muted/40 text-xs font-mono text-foreground/90 overflow-x-auto">
{`{
  "action": "search_wiki",
  "query": "Loop Engineering"
}`}
              </pre>
            </div>

            {/* Action 4: get_graph */}
            <div className="p-5 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-accent">action: &quot;get_graph&quot;</span>
                <span className="text-[11px] text-muted-foreground">Full topology nodes and links</span>
              </div>
              <pre className="p-3 rounded-lg bg-muted/40 text-xs font-mono text-foreground/90 overflow-x-auto">
{`{
  "action": "get_graph"
}`}
              </pre>
            </div>
          </div>
        </section>

        {/* Section 3: Code Examples */}
        <section id="code-examples" className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <Code className="w-5 h-5 text-emerald-500" />
            <h2 className="text-xl font-bold tracking-tight text-foreground m-0">
              Code Examples & cURL
            </h2>
          </div>

          <div className="space-y-3">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              cURL Request
            </div>
            <pre className="p-4 rounded-xl bg-card border border-border text-xs font-mono text-foreground/90 overflow-x-auto">
{`curl -X POST https://alim.dest.page/api/mcp \\
  -H "Content-Type: application/json" \\
  -d '{"action": "get_graph"}'`}
            </pre>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
