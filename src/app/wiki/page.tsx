import React from 'react';
import Link from 'next/link';
import { getAllWikiPages } from '@/lib/wiki';
import { DocsLayout } from '@/components/wiki/DocsLayout';
import { Layers, Sparkles, Network, Terminal, History, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Wiki & Knowledge Base | Alimzhan',
  description: 'Living knowledge base, methodologies, and autonomous system architectures.',
};

export default function WikiIndexPage() {
  const allPages = getAllWikiPages();

  const currentPage = {
    title: 'AI-Wiki & Knowledge Base Hub',
    slug: 'index',
    category: 'Hub & Overview',
    summary: 'The central knowledge nexus for Alimzhan\'s product management methodologies, autonomous loop engineering principles, deterministic GraphRAG models, and Demiurge.OS architectures.',
    tags: ['Wiki', 'Knowledge Base', 'Product Systems', 'GraphRAG', 'Loop Engineering'],
    version: 'v1.0.0 (Production)',
    last_updated: '2026-08-15',
    headings: [
      { depth: 2, slug: 'core-methodologies', text: 'Core Methodologies & Frameworks' },
      { depth: 2, slug: 'autonomous-systems', text: 'Autonomous Systems & Architectures' },
      { depth: 2, slug: 'knowledge-graph-explorer', text: 'Knowledge Graph & Machine Interfaces' },
    ],
  };

  const methodologies = allPages.filter((p) => p.category?.toLowerCase().includes('concept'));
  const systems = allPages.filter((p) => p.category?.toLowerCase().includes('system'));

  return (
    <DocsLayout currentPage={currentPage} allPages={allPages}>
      <div className="space-y-12">
        {/* Intro statement */}
        <p className="text-lg text-foreground/80 leading-relaxed">
          Welcome to the living knowledge repository. This wiki operates under the <strong>CategoryRAG</strong> protocol, combining deterministic AST relations with zero-hallucination guarantees. Every concept is tightly coupled to production implementations and verifiable articles.
        </p>

        {/* Section 1: Core Methodologies */}
        <section id="core-methodologies" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Layers className="w-5 h-5 text-blue-500" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground m-0">
              Core Methodologies & Frameworks
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {methodologies.map((page) => (
              <Link
                key={page.slug}
                href={`/wiki/${page.slug}`}
                className="group p-5 rounded-xl border border-border bg-card hover:border-accent/40 hover:bg-accent/5 transition-all flex flex-col justify-between gap-3 !no-underline"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors m-0">
                      {page.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                  {page.summary && (
                    <p className="text-xs text-muted-foreground line-clamp-2 m-0">
                      {page.summary}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-border/40">
                  {page.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 2: Autonomous Systems */}
        <section id="autonomous-systems" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground m-0">
              Autonomous Systems & Architectures
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {systems.map((page) => (
              <Link
                key={page.slug}
                href={`/wiki/${page.slug}`}
                className="group p-5 rounded-xl border border-border bg-card hover:border-accent/40 hover:bg-accent/5 transition-all flex flex-col justify-between gap-3 !no-underline"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="text-base font-semibold text-foreground group-hover:text-accent transition-colors m-0">
                      {page.title}
                    </h3>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                  {page.summary && (
                    <p className="text-xs text-muted-foreground line-clamp-2 m-0">
                      {page.summary}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-1.5 flex-wrap pt-2 border-t border-border/40">
                  {page.tags?.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Section 3: Knowledge Graph & Machine Interfaces */}
        <section id="knowledge-graph-explorer" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Network className="w-5 h-5 text-emerald-500" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground m-0">
              Knowledge Graph & Machine Interfaces
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/wiki/graph"
              className="p-5 rounded-xl border border-border bg-card hover:border-purple-500/40 hover:bg-purple-500/5 transition-all flex flex-col gap-2 !no-underline group"
            >
              <Network className="w-6 h-6 text-purple-500" />
              <h3 className="text-sm font-semibold text-foreground group-hover:text-purple-500 transition-colors m-0">
                Interactive Graph
              </h3>
              <p className="text-xs text-muted-foreground m-0">
                Explore the complete cosmic network of cross-linked concepts in real-time.
              </p>
            </Link>

            <Link
              href="/wiki/log"
              className="p-5 rounded-xl border border-border bg-card hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all flex flex-col gap-2 !no-underline group"
            >
              <History className="w-6 h-6 text-emerald-500" />
              <h3 className="text-sm font-semibold text-foreground group-hover:text-emerald-500 transition-colors m-0">
                Product Releases
              </h3>
              <p className="text-xs text-muted-foreground m-0">
                Inspect the chronological Git changelog and milestone version history.
              </p>
            </Link>

            <Link
              href="/wiki/api-reference"
              className="p-5 rounded-xl border border-border bg-card hover:border-amber-500/40 hover:bg-amber-500/5 transition-all flex flex-col gap-2 !no-underline group"
            >
              <Terminal className="w-6 h-6 text-amber-500" />
              <h3 className="text-sm font-semibold text-foreground group-hover:text-amber-500 transition-colors m-0">
                Serverless MCP API
              </h3>
              <p className="text-xs text-muted-foreground m-0">
                Connect external AI agents directly to the Model Context Protocol endpoint.
              </p>
            </Link>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
