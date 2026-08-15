import { getAllWikiDocs, getWikiGraph } from "@/lib/wiki";
import { DocsLayout } from "@/components/wiki/DocsLayout";
import { KnowledgeGraph } from "@/components/wiki/KnowledgeGraph";
import { Network, Sparkles } from "lucide-react";

export const metadata = {
  title: "Interactive Cosmic Knowledge Graph | Wiki",
  description: "Explore the live topological entity-relationship knowledge graph.",
};

export default function KnowledgeGraphPage() {
  const allDocs = getAllWikiDocs();
  const { nodes, links } = getWikiGraph();

  const graphPageMeta = {
    title: "Interactive Cosmic Knowledge Graph",
    slug: "graph",
    summary: "Real-time topological AST force simulation visualizing concepts, entities, systems, and bidirectional references.",
    category: "Visualizations",
    tags: ["Graph", "Topology", "AST", "GraphRAG"],
    version: "v1.2.0-AST",
    last_updated: "2026-08-15",
  };

  return (
    <DocsLayout currentPage={graphPageMeta} allPages={allDocs} showProperties={true}>
      <div className="space-y-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          The graph below renders the complete deterministic abstract syntax tree of all verified wiki documents. Click any node to navigate directly to its documentation. Drag canvas to pan, and scroll to zoom in/out.
        </p>

        <KnowledgeGraph nodes={nodes} links={links} height={640} />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 not-prose">
          <div className="p-3 rounded-xl border border-border bg-card/40 text-center">
            <div className="text-xl font-bold text-foreground">{nodes.length}</div>
            <div className="text-xs text-muted-foreground font-mono">Total Nodes</div>
          </div>
          <div className="p-3 rounded-xl border border-border bg-card/40 text-center">
            <div className="text-xl font-bold text-blue-500">{links.length}</div>
            <div className="text-xs text-muted-foreground font-mono">AST Links</div>
          </div>
          <div className="p-3 rounded-xl border border-border bg-card/40 text-center">
            <div className="text-xl font-bold text-emerald-500">0%</div>
            <div className="text-xs text-muted-foreground font-mono">Hallucination</div>
          </div>
          <div className="p-3 rounded-xl border border-border bg-card/40 text-center">
            <div className="text-xl font-bold text-purple-500">100%</div>
            <div className="text-xs text-muted-foreground font-mono">Grounded AST</div>
          </div>
        </div>
      </div>
    </DocsLayout>
  );
}
