"use client";

import { useState, useMemo, useTransition } from "react";
import Link from "next/link";
import { 
  Search, 
  X, 
  ArrowUpRight, 
  Layers, 
  Cpu, 
  BookOpen, 
  Compass, 
  Check, 
  Copy, 
  Sparkles,
  Tag
} from "lucide-react";
import { WikiItem, getWikiCategories } from "@/lib/wiki-types";

interface WikiHubProps {
  initialItems: WikiItem[];
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  methodologies: <Cpu className="w-4 h-4" />,
  systems: <Layers className="w-4 h-4" />,
  articles: <BookOpen className="w-4 h-4" />,
  guides: <Compass className="w-4 h-4" />,
};

export function WikiHub({ initialItems }: WikiHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const categories = useMemo(() => getWikiCategories(), []);

  // Filter items based on category, tag, and search query
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) => {
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
      const matchesTag = !selectedTag || item.tags.includes(selectedTag);
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.summary.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (item.keyTakeaway && item.keyTakeaway.toLowerCase().includes(query));

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [initialItems, selectedCategory, selectedTag, searchQuery]);


  const handleCopyLink = async (item: WikiItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      const url = `${window.location.origin}${item.href}`;
      await navigator.clipboard.writeText(url);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className="flex flex-col gap-12 w-full">
      {/* Search and Category Filter Pod */}
      <section className="flex flex-col gap-6">
        {/* Search Bar Pod */}
        <div className="relative flex items-center w-full bg-[#F4F4F2] dark:bg-[#1C1C20] rounded-2xl px-5 py-4 transition-all focus-within:ring-2 focus-within:ring-accent/40">
          <Search className="w-5 h-5 text-muted-foreground shrink-0 mr-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              startTransition(() => {
                setSearchQuery(e.target.value);
              });
            }}
            placeholder="Search methodologies, architectures, systems, articles..."
            className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/70 text-base sm:text-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-full text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              title="Clear search"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setSelectedTag(null);
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-foreground text-background shadow-sm"
                    : "bg-[#F4F4F2] dark:bg-[#1C1C20] text-muted-foreground hover:text-foreground hover:bg-[#EAEAE7] dark:hover:bg-[#25252A]"
                }`}
              >
                {cat.id !== "all" && CATEGORY_ICONS[cat.id]}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Tag or Tag Pills */}
        {selectedTag && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase font-mono tracking-wider">Filtered by tag:</span>
            <div className="flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">
              <Tag className="w-3.5 h-3.5" />
              <span>{selectedTag}</span>
              <button 
                onClick={() => setSelectedTag(null)}
                className="ml-1 hover:opacity-75"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Stats Counter & Results Header */}
      <div className="flex items-center justify-between text-sm text-muted-foreground pb-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-foreground font-semibold">{filteredItems.length}</span>
          <span>{filteredItems.length === 1 ? "entry found" : "entries indexed"}</span>
        </div>
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="hidden sm:inline">2-TIER META CLASSIFICATION</span>
          <span className="px-2 py-0.5 rounded-full bg-[#EAEAE7] dark:bg-[#25252A] text-foreground">
            PUBLIC TIER
          </span>
        </div>
      </div>

      {/* Grid of Solid Pod Cards */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredItems.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-[#F4F4F2] dark:bg-[#1C1C20] hover:bg-[#EAEAE7] dark:hover:bg-[#25252A] transition-all duration-200"
              >
                <div className="flex flex-col gap-4">
                  {/* Card Header: Category Badge & Share / Link Icons */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-foreground">
                        {CATEGORY_ICONS[item.category] || <Sparkles className="w-3.5 h-3.5" />}
                      </span>
                      <span>{item.categoryLabel}</span>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => handleCopyLink(item, e)}
                        className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                        title={isCopied ? "Link Copied!" : "Copy Link"}
                        aria-label="Copy Link"
                      >
                        {isCopied ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                      <Link
                        href={item.href}
                        className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors"
                        title="Open Resource"
                        aria-label="Open Resource"
                      >
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Title */}
                  <Link href={item.href} className="!no-underline">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                      {item.title}
                    </h3>
                  </Link>

                  {/* Summary */}
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {item.summary}
                  </p>

                  {/* Key Takeaway Pod */}
                  {item.keyTakeaway && (
                    <div className="p-3.5 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] text-sm text-foreground/90 leading-snug">
                      <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">
                        Core Takeaway
                      </span>
                      {item.keyTakeaway}
                    </div>
                  )}
                </div>

                {/* Card Footer: Tags & Reading Time */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-4 border-t border-black/5 dark:border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.slice(0, 3).map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className={`text-xs px-2.5 py-1 rounded-md transition-colors ${
                          selectedTag === tag
                            ? "bg-accent text-white"
                            : "bg-black/5 dark:bg-white/5 text-muted-foreground hover:text-foreground hover:bg-black/10 dark:hover:bg-white/10"
                        }`}
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>

                  {item.readingTime && (
                    <span className="text-xs font-mono text-muted-foreground shrink-0">
                      {item.readingTime}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-[#F4F4F2] dark:bg-[#1C1C20] flex flex-col items-center justify-center gap-3">
          <Search className="w-8 h-8 text-muted-foreground/50" />
          <h4 className="text-lg font-bold text-foreground">No matching entries found</h4>
          <p className="text-sm text-muted-foreground max-w-md">
            Try adjusting your search terms or clearing the selected filters to view all public entries.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setSelectedTag(null);
            }}
            className="mt-2 px-4 py-2 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
