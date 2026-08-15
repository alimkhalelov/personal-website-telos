import { getAllWikiDocs, getWikiDocBySlug } from "@/lib/wiki";
import { DocsLayout } from "@/components/wiki/DocsLayout";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Layers, Database, Sparkles, Network, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Wiki & Knowledge Base | Alimzhan Khalelov",
  description: "Deterministic knowledge base, living architectural graph, and production methodologies of Alimzhan Khalelov.",
};

const components = {
  a: ({ href, children, ...props }: any) => {
    if (href && (href.startsWith("/") || href.startsWith("#"))) {
      return <Link href={href} {...props} className="text-blue-500 hover:underline">{children}</Link>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" {...props}>{children}</a>;
  },
};

export default function WikiIndexPage() {
  const allDocs = getAllWikiDocs();
  const indexDoc = getWikiDocBySlug("") || getWikiDocBySlug("index") || {
    title: "Wiki Hub & Sovereign Knowledge Base",
    slug: "",
    summary: "Central nervous system and deterministic knowledge graph of Alimzhan's methodologies, autonomous systems, and architectural invariants.",
    category: "Overview",
    tags: ["KnowledgeBase", "GraphRAG", "DemiurgeOS", "Architecture"],
    version: "v1.2.0 (Verified AST)",
    last_updated: "2026-08-15",
    content: "Welcome to the sovereign knowledge base.",
    rawContent: "",
    forwardLinks: [],
    backlinks: [],
    headings: [],
  };

  const concepts = allDocs.filter((d) => d.category.toLowerCase().includes("concept"));
  const entities = allDocs.filter((d) => d.category.toLowerCase().includes("entit"));
  const systems = allDocs.filter((d) => d.category.toLowerCase().includes("system"));

  return (
    <DocsLayout currentPage={indexDoc} allPages={allDocs}>
      {/* Overview Cards Catalog */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 not-prose">
        {/* Concepts Card */}
        <div className="p-4 rounded-xl border border-border bg-card/50 flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-500">
            <Layers className="w-4 h-4" />
            <span>Concepts ({concepts.length})</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Product models, Loop Engineering, and GraphRAG methodologies.
          </p>
          <div className="space-y-1 pt-1">
            {concepts.slice(0, 3).map((c) => (
              <Link
                key={c.slug}
                href={`/wiki/${c.slug}`}
                className="flex items-center justify-between text-xs text-foreground/80 hover:text-blue-500 py-0.5 transition-colors !no-underline"
              >
                <span className="truncate">{c.title}</span>
                <ArrowRight className="w-3 h-3 opacity-60 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Entities Card */}
        <div className="p-4 rounded-xl border border-border bg-card/50 flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-500">
            <Database className="w-4 h-4" />
            <span>Entities ({entities.length})</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Creator profile, Demiurge.OS environment, and domain nodes.
          </p>
          <div className="space-y-1 pt-1">
            {entities.slice(0, 3).map((e) => (
              <Link
                key={e.slug}
                href={`/wiki/${e.slug}`}
                className="flex items-center justify-between text-xs text-foreground/80 hover:text-emerald-500 py-0.5 transition-colors !no-underline"
              >
                <span className="truncate">{e.title}</span>
                <ArrowRight className="w-3 h-3 opacity-60 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* Systems Card */}
        <div className="p-4 rounded-xl border border-border bg-card/50 flex flex-col justify-between space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-500">
            <Sparkles className="w-4 h-4" />
            <span>Systems ({systems.length})</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Drafting room, social publisher, and CategoryRAG engine.
          </p>
          <div className="space-y-1 pt-1">
            {systems.slice(0, 3).map((s) => (
              <Link
                key={s.slug}
                href={`/wiki/${s.slug}`}
                className="flex items-center justify-between text-xs text-foreground/80 hover:text-purple-500 py-0.5 transition-colors !no-underline"
              >
                <span className="truncate">{s.title}</span>
                <ArrowRight className="w-3 h-3 opacity-60 flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Index Content */}
      <MDXRemote
        source={indexDoc.content}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </DocsLayout>
  );
}
