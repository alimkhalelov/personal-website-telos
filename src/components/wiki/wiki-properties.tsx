"use client";

import React, { useState, useEffect } from "react";
import { 
  GitBranch, 
  Layers, 
  Tag, 
  ShieldCheck, 
  User, 
  ChevronDown, 
  ChevronUp 
} from "lucide-react";

interface WikiPropertiesProps {
  version?: string;
  domain?: string;
  tags?: string[];
  grounding?: string;
  author?: string;
  lastUpdated?: string;
}

export function WikiProperties({
  version = "v1.2.0-AST",
  domain = "Methodology & Autonomous Systems",
  tags = ["AI-Native PM", "Loop Engineering", "Fan-Filter-Scale", "GraphRAG"],
  grounding = "Synthius CategoryRAG (Verified 0% Hallucination)",
  author = "Alim Khalelov & Autonomous Compiler",
  lastUpdated = "2026-08-15",
}: WikiPropertiesProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("wiki_hide_properties");
    if (saved === "true") {
      setIsCollapsed(true);
    }
  }, []);

  const toggleCollapsed = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    localStorage.setItem("wiki_hide_properties", String(next));
  };

  return (
    <div className="w-full border border-border/60 rounded-xl bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-200">
      {/* Header / Toggle Button */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-muted/20 border-b border-border/40 text-xs font-mono text-muted-foreground">
        <span className="uppercase tracking-wider font-semibold flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-accent" />
          Properties & Metadata
        </span>
        <button
          onClick={toggleCollapsed}
          className="inline-flex items-center gap-1.5 px-2 py-1 rounded hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors cursor-pointer text-xs"
        >
          {isCollapsed ? (
            <>
              <span>Show properties</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span>Hide properties</span>
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>

      {/* 2-Column Notion Property Rows */}
      {!isCollapsed && (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-sm">
          {/* Row 1: Version */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground w-28 shrink-0">
              <GitBranch className="w-4 h-4 text-blue-500" />
              <span>Version</span>
            </div>
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-500 font-medium border border-blue-500/20">
              {version}
            </span>
          </div>

          {/* Row 2: Domain */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground w-28 shrink-0">
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Domain</span>
            </div>
            <span className="font-medium text-foreground text-xs sm:text-sm">
              {domain}
            </span>
          </div>

          {/* Row 3: Grounding */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground w-28 shrink-0">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Grounding</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {grounding}
            </span>
          </div>

          {/* Row 4: Author */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground w-28 shrink-0">
              <User className="w-4 h-4 text-amber-500" />
              <span>Authors</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="flex -space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-[10px] text-white flex items-center justify-center font-bold">
                  A
                </span>
                <span className="w-5 h-5 rounded-full bg-purple-600 text-[9px] text-white flex items-center justify-center font-bold">
                  AI
                </span>
              </div>
              <span className="text-muted-foreground">{author}</span>
            </div>
          </div>

          {/* Row 5: Tags (Full Width on mobile, span 2 if needed) */}
          <div className="md:col-span-2 flex flex-wrap items-center gap-2 pt-1 border-t border-border/30">
            <div className="flex items-center gap-2 text-muted-foreground w-28 shrink-0">
              <Tag className="w-4 h-4 text-accent" />
              <span>Tags</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-accent/10 text-accent border border-accent/20"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
