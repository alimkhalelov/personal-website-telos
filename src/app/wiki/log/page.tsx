import React from 'react';
import fs from 'fs';
import path from 'path';
import { getAllWikiPages } from '@/lib/wiki';
import { DocsLayout } from '@/components/wiki/DocsLayout';
import { MarkdownContent } from '@/components/wiki/MarkdownContent';
import { History, GitCommit, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Product Releases & Changelog | AI-Wiki',
  description: 'Chronological release log, AST milestones, and immutable Git ledger.',
};

export default function WikiLogPage() {
  const allPages = getAllWikiPages();

  let logMarkdown = '';
  const logPath = path.join(process.cwd(), 'wiki', 'log.md');
  if (fs.existsSync(logPath)) {
    logMarkdown = fs.readFileSync(logPath, 'utf8');
  }

  const currentPage = {
    title: 'Product Releases & Changelog',
    slug: 'log',
    category: 'Ledger & Releases',
    summary: 'The immutable chronological ledger of AI-Wiki product milestones, AST synchronization events, and architectural feature releases.',
    tags: ['Releases', 'Changelog', 'Git Ledger', 'Milestones'],
    version: 'v1.0.0 (Production)',
    last_updated: '2026-08-15',
    headings: [
      { depth: 2, slug: 'thematic-milestones', text: 'Thematic Milestones' },
      { depth: 2, slug: 'git-ledger', text: 'Raw Technical Git Ledger' },
    ],
  };

  return (
    <DocsLayout currentPage={currentPage} allPages={allPages}>
      <div className="space-y-10">
        {/* Section 1: Thematic Milestones */}
        <section id="thematic-milestones" className="space-y-6">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground m-0">
              Thematic Milestones
            </h2>
          </div>

          <div className="space-y-4">
            <div className="p-6 rounded-xl border border-border bg-card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    v1.0.0
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    Native AI-Wiki Knowledge Portal Launch
                  </span>
                </div>
                <time className="text-xs font-mono text-muted-foreground">2026-08-15</time>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Deployed full 3-column DocsLayout, Obsidian-grade cosmic knowledge graph, 2-column Notion properties database, 2-tab fuzzy and CategoryRAG search modal, serverless MCP endpoint, and core methodology articles into Demiurge.OS.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Raw Technical Git Ledger */}
        <section id="git-ledger" className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center gap-2">
            <GitCommit className="w-5 h-5 text-muted-foreground" />
            <h2 className="text-xl font-bold tracking-tight text-foreground m-0">
              Raw Technical Git Ledger
            </h2>
          </div>
          <div className="p-5 rounded-xl border border-border bg-muted/20">
            <MarkdownContent content={logMarkdown} />
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
