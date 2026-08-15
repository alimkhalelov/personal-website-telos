"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { WikiEntryMeta, KnowledgeGraphData } from "@/lib/wiki";
import { WikiProperties } from "@/components/wiki/wiki-properties";
import { WikiKnowledgeGraph } from "@/components/wiki/wiki-knowledge-graph";
import {
  Search,
  Layers,
  Cpu,
  GitBranch,
  Sparkles,
  ShieldCheck,
  User,
  Flame,
  FileText,
  Database,
  ArrowUpRight,
  LayoutGrid,
  Share2,
  List,
  Command,
  ArrowLeft
} from "lucide-react";

interface WikiExplorerProps {
  entries: WikiEntryMeta[];
  graphData: KnowledgeGraphData;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Layers: <Layers className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  User: <User className="w-5 h-5" />,
  Flame: <Flame className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  FileText: <FileText className="w-5 h-5" />,
};

export function WikiExplorer({ entries, graphData }: WikiExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"grid" | "graph" | "list">("grid");

  // Keyboard shortcut listener for search focus
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        document.getElementById("wiki-search-input")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    entries.forEach((e) => set.add(e.category));
    return Array.from(set);
  }, [entries]);

  const allTags = useMemo(() => {
    const set = new Set<string>();
    entries.forEach((e) => e.tags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, [entries]);

  const filteredEntries = useMemo(() => {
    return entries.filter((entry) => {
      const matchesCategory =
        selectedCategory === "All" || entry.category === selectedCategory;
      const matchesTag = !selectedTag || entry.tags.includes(selectedTag);
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        entry.title.toLowerCase().includes(q) ||
        entry.summary.toLowerCase().includes(q) ||
        entry.tags.some((t) => t.toLowerCase().includes(q)) ||
        entry.category.toLowerCase().includes(q);

      return matchesCategory && matchesTag && matchesQuery;
    });
  }, [entries, selectedCategory, selectedTag, searchQuery]);

  return (
    <div className="w-full flex flex-col gap-10">
      {/* Top Breadcrumbs & Headquarters return */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Headquarters
        </Link>
        <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
          <span className="hidden sm:inline-flex items-center gap-1 bg-muted/40 px-2.5 py-1 rounded-md border border-border/50">
            <Command className="w-3 h-3" />K to search
          </span>
          <span className="text-emerald-500 flex items-center gap-1.5 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live AST Graph
          </span>
        </div>
      </div>

      {/* Main Page Title Header */}
      <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-none">
              Wiki & Knowledge Base
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground font-light mt-1">
              Deterministic directory of methodologies, autonomous systems, AI architectures, and domain entities.
            </p>
          </div>
        </div>

        {/* Notion-grade Properties Bar */}
        <WikiProperties
          version="v1.2.0-AST"
          domain="Autonomous Systems, Product Management & AI Loops"
          tags={["Fan-Filter-Scale", "Loop Engineering", "GraphRAG", "GEO/LLMO", "Demiurge OS"]}
          grounding="Synthius CategoryRAG (Verified 0% Hallucination)"
          author="Alim Khalelov & Autonomous Co-Architect"
        />
      </section>

      {/* Controls Bar: Search + Category Filter + View Switcher */}
      <section className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="wiki-search-input"
              type="text"
              placeholder="Search concepts, methodologies, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-card border border-border/80 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all placeholder:text-muted-foreground/60"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* View Switcher: Grid vs Graph vs List */}
          <div className="flex items-center gap-1 bg-muted/40 p-1 rounded-xl border border-border/60 self-start sm:self-auto">
            <button
              onClick={() => setActiveView("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeView === "grid"
                  ? "bg-background text-foreground shadow-sm border border-border/40 font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
            <button
              onClick={() => setActiveView("graph")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeView === "graph"
                  ? "bg-background text-foreground shadow-sm border border-border/40 font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Graph</span>
            </button>
            <button
              onClick={() => setActiveView("list")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeView === "list"
                  ? "bg-background text-foreground shadow-sm border border-border/40 font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Index</span>
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedTag(null);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                  : "bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground border border-border/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tag Pills (if any filter active or quick select) */}
        {selectedCategory !== "All" && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span className="text-xs text-muted-foreground font-mono mr-1">Filter tag:</span>
            {allTags.slice(0, 8).map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-2.5 py-0.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                  selectedTag === tag
                    ? "bg-accent text-accent-foreground font-bold"
                    : "bg-muted/20 text-muted-foreground hover:text-foreground border border-border/30"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Main View Area */}
      {activeView === "graph" ? (
        <WikiKnowledgeGraph data={graphData} />
      ) : activeView === "list" ? (
        /* List View */
        <div className="flex flex-col divide-y divide-border/50 border border-border/60 rounded-2xl bg-card/40 overflow-hidden">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/wiki/${entry.slug}`}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-muted/40 transition-colors gap-3 !no-underline"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-muted/40 flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:bg-accent/10 transition-colors shrink-0 mt-0.5 sm:mt-0">
                    {ICON_MAP[entry.icon || "FileText"] || <FileText className="w-4 h-4" />}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold group-hover:text-accent transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {entry.summary}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-muted/40 text-muted-foreground">
                    {entry.category}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground font-mono text-sm">
              No matching knowledge entries found.
            </div>
          )}
        </div>
      ) : (
        /* Grid Card View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/wiki/${entry.slug}`}
                className="group relative flex flex-col justify-between p-6 rounded-2xl border border-border/70 bg-card/40 hover:bg-card/80 hover:border-accent/80 transition-all duration-300 gap-5 !no-underline shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col gap-3">
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-muted/50 group-hover:bg-accent/10 group-hover:text-accent flex items-center justify-center text-muted-foreground transition-colors">
                        {ICON_MAP[entry.icon || "FileText"] || <FileText className="w-4 h-4" />}
                      </div>
                      <span className="text-xs font-mono font-medium text-muted-foreground uppercase tracking-wider">
                        {entry.category}
                      </span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  {/* Title & Summary */}
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-accent transition-colors">
                      {entry.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed mt-2 line-clamp-3">
                      {entry.summary}
                    </p>
                  </div>
                </div>

                {/* Bottom Tags & Links */}
                <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-border/40">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-muted/40 text-muted-foreground group-hover:border-accent/20 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full p-12 text-center text-muted-foreground bg-muted/10 rounded-2xl border border-border/60 border-dashed">
              No entries matching your search. Try adjusting the query or category filter.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
