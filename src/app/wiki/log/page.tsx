import { getAllWikiDocs } from "@/lib/wiki";
import { DocsLayout } from "@/components/wiki/DocsLayout";
import { GitCommit, Tag, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Product Releases & Technical Ledger | Wiki",
  description: "Living changelog and technical release audit log.",
};

const RELEASES = [
  {
    version: "v1.2.0",
    date: "2026-08-15",
    title: "AI-Wiki Master Architecture & Cosmic Graph",
    description: "Full integration of the 3-column DocsLayout, interactive Canvas knowledge graph, Notion database properties, 2-tab grounded search modal, and serverless Model Context Protocol (MCP) endpoint.",
    highlights: [
      "Mandatory 3-Column DocsLayout with collapsible left sidebar and sticky TOC.",
      "Obsidian-grade Canvas knowledge graph with real-time physics and cluster filtering.",
      "Zero-Hallucination CategoryRAG Search Modal with instant docs fuzzy matching.",
      "Serverless /api/mcp endpoint with tools for external agent querying.",
      "GEO discovery suite with /llms.txt and /llms-full.txt.",
    ],
  },
  {
    version: "v1.1.0",
    date: "2026-08-14",
    title: "AI Drafting Room & Vercel AI SDK 5 Stream Migration",
    description: "Engineered the /admin/draft suite with Grill-Me interview flows, Humanizer tone refinement, multi-model fallback, and Vercel AI SDK 5 streaming stability.",
    highlights: [
      "Integrated Vercel AI SDK 5 with toUIMessageStreamResponse() protocol.",
      "Added multi-model fallback across Gemini 3.1 Pro, 3.5 Flash, 3.1 Flash-Lite, and OpenAI.",
      "Built dual-mode Tiptap rich text / markdown editor with AST sync.",
    ],
  },
  {
    version: "v1.0.0",
    date: "2026-08-10",
    title: "Initial Launch of Demiurge.OS Portfolio",
    description: "Launch of minimal personal portfolio and lab blog on Next.js 16 App Router and Tailwind CSS v4.",
    highlights: [
      "Custom Avant-Garde minimalist dark theme with next-themes.",
      "MDX blog engine with Bionic reading toggle.",
      "Automated social distribution pipeline for Telegram, X, and LinkedIn.",
    ],
  },
];

export default function ReleasesLogPage() {
  const allDocs = getAllWikiDocs();

  const logMeta = {
    title: "Product Releases & Changelog Ledger",
    slug: "log",
    summary: "Historical audit log of system milestones, architectural invariant upgrades, and production deployments.",
    category: "Ledger",
    tags: ["Releases", "Changelog", "Ledger", "Git"],
    version: "v1.2.0",
    last_updated: "2026-08-15",
  };

  return (
    <DocsLayout currentPage={logMeta} allPages={allDocs} showProperties={true}>
      <div className="space-y-8">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every production change and system evolution is recorded here as an immutable ledger node.
        </p>

        <div className="space-y-8 not-prose">
          {RELEASES.map((rel) => (
            <div key={rel.version} className="p-6 rounded-2xl border border-border bg-card/50 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 font-semibold">
                    {rel.version}
                  </span>
                  <h2 className="text-lg font-bold text-foreground">{rel.title}</h2>
                </div>
                <time className="text-xs font-mono text-muted-foreground">{rel.date}</time>
              </div>

              <p className="text-sm text-foreground/80 leading-relaxed">
                {rel.description}
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Key Deliverables
                </div>
                <ul className="space-y-1.5 text-xs text-foreground/90">
                  {rel.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DocsLayout>
  );
}
