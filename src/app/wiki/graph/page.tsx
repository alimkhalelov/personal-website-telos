import React from 'react';
import { getAllWikiPages, getWikiGraphData } from '@/lib/wiki';
import { DocsLayout } from '@/components/wiki/DocsLayout';
import { KnowledgeGraph } from '@/components/wiki/KnowledgeGraph';

export const metadata = {
  title: 'Cosmic Knowledge Graph | AI-Wiki',
  description: 'Interactive topological knowledge graph mapping relations between methodologies and autonomous systems.',
};

export default function WikiGraphPage() {
  const allPages = getAllWikiPages();
  const graphData = getWikiGraphData();

  const currentPage = {
    title: 'Cosmic Knowledge Graph',
    slug: 'graph',
    category: 'Interactive Visualizations',
    summary: 'A deterministic 2D topological graph visualizing bi-directional AST wikilink connections across all methodologies, frameworks, and system components.',
    tags: ['Knowledge Graph', 'Topological AST', 'Obsidian', 'GraphRAG', 'Visualizer'],
    version: 'v2.0.0-AST',
    last_updated: '2026-08-15',
    headings: [
      { depth: 2, slug: 'interactive-network', text: 'Interactive Topological Network' },
      { depth: 2, slug: 'graph-mechanics', text: 'Graph Mechanics & Legend' },
    ],
  };

  return (
    <DocsLayout currentPage={currentPage} allPages={allPages}>
      <div className="space-y-8">
        <section id="interactive-network">
          <KnowledgeGraph nodes={graphData.nodes} links={graphData.links} />
        </section>

        <section id="graph-mechanics" className="space-y-4 pt-6 border-t border-border">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Graph Mechanics & Legend
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider">Node Dynamics</h3>
              <p className="text-xs leading-relaxed">
                Nodes are proportional in size to their degree of in-and-out connections (backlinks). Hovering over a node highlights its immediate cluster and dims external entities.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-2">
              <h3 className="font-semibold text-foreground text-xs uppercase tracking-wider">Navigation</h3>
              <p className="text-xs leading-relaxed">
                Click any node to navigate directly to its full documentation article. Drag canvas to pan; use mouse wheel or floating buttons to zoom in and out.
              </p>
            </div>
          </div>
        </section>
      </div>
    </DocsLayout>
  );
}
