"use client";

import { useState, useMemo, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Search, 
  X, 
  Copy, 
  Check, 
  Sparkles, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight, 
  Layers, 
  ArrowLeft,
  ArrowUpRight,
  Palette
} from "lucide-react";
import { STYLES_DATABASE, StyleRefEntry } from "@/lib/styles-data";

export function StyleRefGalleryView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [activeModalStyle, setActiveModalStyle] = useState<StyleRefEntry | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Extract all unique tags
  const tags = useMemo(() => {
    const set = new Set<string>();
    STYLES_DATABASE.forEach((s) => {
      if (s.tag) set.add(s.tag);
    });
    return ["all", ...Array.from(set)];
  }, []);

  // Filtered styles list
  const filteredStyles = useMemo(() => {
    return STYLES_DATABASE.filter((s) => {
      const matchesTag = selectedTag === "all" || s.tag === selectedTag;
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        s.style.toLowerCase().includes(query) ||
        s.shortName.toLowerCase().includes(query) ||
        s.core_concept.toLowerCase().includes(query) ||
        s.medium.toLowerCase().includes(query) ||
        s.mood.toLowerCase().includes(query) ||
        s.tag.toLowerCase().includes(query);

      return matchesTag && matchesSearch;
    });
  }, [searchQuery, selectedTag]);

  // Prompt Formula synthesizer
  const generatePromptFormula = (entry: StyleRefEntry): string => {
    const parts = [
      entry.style,
      entry.medium,
      entry.core_concept,
      entry.composition,
      entry.lighting,
      entry.color_palette,
      entry.mood ? `mood: ${entry.mood}` : "",
      entry.negative_prompts ? `--no ${entry.negative_prompts}` : "",
    ].filter(Boolean);

    return parts.join(", ");
  };

  const handleCopyPrompt = async (entry: StyleRefEntry, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    const formula = generatePromptFormula(entry);
    try {
      await navigator.clipboard.writeText(formula);
      setCopiedId(entry.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNextInModal = () => {
    if (!activeModalStyle) return;
    const currentIndex = filteredStyles.findIndex((s) => s.id === activeModalStyle.id);
    if (currentIndex !== -1 && currentIndex < filteredStyles.length - 1) {
      setActiveModalStyle(filteredStyles[currentIndex + 1]);
    } else {
      setActiveModalStyle(filteredStyles[0]);
    }
  };

  const handlePrevInModal = () => {
    if (!activeModalStyle) return;
    const currentIndex = filteredStyles.findIndex((s) => s.id === activeModalStyle.id);
    if (currentIndex > 0) {
      setActiveModalStyle(filteredStyles[currentIndex - 1]);
    } else {
      setActiveModalStyle(filteredStyles[filteredStyles.length - 1]);
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Search & Filter Controls Pod */}
      <section className="flex flex-col gap-5 p-6 rounded-3xl bg-[#F4F4F2] dark:bg-[#16161a] border border-black/5 dark:border-white/5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative flex items-center w-full bg-white dark:bg-[#202026] rounded-2xl px-4 py-3 border border-black/5 dark:border-white/5 focus-within:ring-2 focus-within:ring-orange-500/40 transition-all">
            <Search className="w-4 h-4 text-muted-foreground mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                startTransition(() => {
                  setSearchQuery(e.target.value);
                });
              }}
              placeholder="Search by artist (Beksiński, Stålenhag, Miura), medium, or mood..."
              className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/70 text-sm sm:text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-muted-foreground shrink-0 self-end sm:self-center">
            INDEXED: <strong className="text-foreground">{filteredStyles.length} / {STYLES_DATABASE.length}</strong> STYLES
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-black/5 dark:border-white/5">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                selectedTag === tag
                  ? "bg-orange-500 text-white shadow-sm font-semibold"
                  : "bg-white/60 dark:bg-white/5 text-muted-foreground hover:text-foreground hover:bg-white dark:hover:bg-white/10"
              }`}
            >
              {tag === "all" ? "All Mediums" : tag}
            </button>
          ))}
        </div>
      </section>

      {/* Styles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStyles.map((item) => {
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setActiveModalStyle(item)}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#F4F4F2] dark:bg-[#16161a] border border-black/5 dark:border-white/5 hover:border-orange-500/50 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-xl"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/20">
                <Image
                  src={item.image}
                  alt={item.style}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                {/* Floating Tag Badge */}
                <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur border border-white/10 text-white font-mono text-[11px] font-medium">
                  {item.tag}
                </div>

                {/* Quick Copy Button */}
                <button
                  onClick={(e) => handleCopyPrompt(item, e)}
                  className={`absolute top-3 right-3 z-10 p-2 rounded-xl backdrop-blur transition-all ${
                    isCopied
                      ? "bg-emerald-500 text-white"
                      : "bg-black/60 text-white hover:bg-orange-500 hover:text-white"
                  }`}
                  title="Copy Prompt Formula"
                >
                  {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>

                {/* Bottom Overlay Title on Image */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="text-lg font-bold text-white leading-snug drop-shadow-md">
                    {item.shortName}
                  </h3>
                </div>
              </div>

              {/* Text Card Body */}
              <div className="p-5 flex flex-col justify-between flex-1 gap-4">
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {item.core_concept}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5 text-xs text-muted-foreground font-mono">
                  <span className="truncate max-w-[180px]">{item.mood || "Atmospheric"}</span>
                  <span className="flex items-center gap-1 text-orange-500 font-bold group-hover:translate-x-0.5 transition-transform">
                    Inspect <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Style Modal Inspection Popup */}
      {activeModalStyle && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveModalStyle(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#121216] text-white rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              onClick={() => setActiveModalStyle(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/60 hover:bg-white/20 text-white transition-colors"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Left: Image */}
            <div className="relative w-full md:w-1/2 aspect-square md:aspect-auto min-h-[300px] md:min-h-full bg-black/40 overflow-hidden">
              <Image
                src={activeModalStyle.image}
                alt={activeModalStyle.style}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
              
              {/* Modal Navigation Arrows */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                <button
                  onClick={handlePrevInModal}
                  className="p-2.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur transition-all border border-white/10"
                  title="Previous Style"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextInModal}
                  className="p-2.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur transition-all border border-white/10"
                  title="Next Style"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Right: Detailed Prompt Attributes */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-[85vh] gap-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 font-mono text-xs font-bold">
                    {activeModalStyle.tag}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {activeModalStyle.style}
                </h2>

                {/* 6-Axis Attributes Grid */}
                <div className="flex flex-col gap-3 text-sm text-zinc-300 font-light">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <strong className="text-xs font-mono uppercase tracking-wider text-orange-400 block mb-1">
                      Medium & Technique
                    </strong>
                    {activeModalStyle.medium}
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <strong className="text-xs font-mono uppercase tracking-wider text-sky-400 block mb-1">
                      Core Concept & Narrative
                    </strong>
                    {activeModalStyle.core_concept}
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <strong className="text-xs font-mono uppercase tracking-wider text-purple-400 block mb-1">
                      Composition & Perspective
                    </strong>
                    {activeModalStyle.composition}
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <strong className="text-xs font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                      Lighting & Volumetrics
                    </strong>
                    {activeModalStyle.lighting}
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <strong className="text-xs font-mono uppercase tracking-wider text-amber-400 block mb-1">
                      Color Palette & Atmosphere
                    </strong>
                    {activeModalStyle.color_palette}
                  </div>

                  {activeModalStyle.negative_prompts && (
                    <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20">
                      <strong className="text-xs font-mono uppercase tracking-wider text-red-400 block mb-1">
                        Negative Prompts (--no)
                      </strong>
                      {activeModalStyle.negative_prompts}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button: Copy Full Prompt Formula */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <button
                  onClick={() => handleCopyPrompt(activeModalStyle)}
                  className={`w-full py-3.5 px-6 rounded-2xl font-mono text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                    copiedId === activeModalStyle.id
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                      : "bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25 active:scale-[0.98]"
                  }`}
                >
                  {copiedId === activeModalStyle.id ? (
                    <>
                      <Check className="w-5 h-5" />
                      <span>PROMPT FORMULA COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      <span>COPY MIDJOURNEY / FLUX PROMPT</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
