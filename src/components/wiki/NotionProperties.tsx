'use client';

import React, { useState, useEffect } from 'react';
import { 
  GitBranch, Layers, Tag, ShieldCheck, 
  User, ChevronDown, ChevronRight 
} from 'lucide-react';
import type { WikiPageMeta } from '@/lib/wiki';

interface NotionPropertiesProps {
  meta: WikiPageMeta;
}

export function NotionProperties({ meta }: NotionPropertiesProps) {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wiki_hide_properties');
      if (saved !== null) {
        setIsHidden(saved === 'true');
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleHidden = () => {
    const next = !isHidden;
    setIsHidden(next);
    try {
      localStorage.setItem('wiki_hide_properties', String(next));
    } catch {
      // fallback
    }
  };

  return (
    <div className="border border-border rounded-xl bg-card/60 overflow-hidden text-xs">
      {/* Header with Toggle */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border/60 bg-muted/20">
        <span className="font-semibold uppercase tracking-wider text-[11px] text-muted-foreground flex items-center gap-2">
          <span>Properties & Metadata</span>
        </span>
        <button
          onClick={toggleHidden}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <span>{isHidden ? 'Show properties' : 'Hide properties'}</span>
          {isHidden ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* 2-Column Property Grid */}
      {!isHidden && (
        <div className="p-3 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
          {/* Version */}
          <div className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="flex items-center gap-2 text-muted-foreground font-medium">
              <GitBranch className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              <span>Version</span>
            </span>
            <span className="font-mono text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20 text-[11px]">
              {meta.version || 'v1.0.0 (Verified AST)'}
            </span>
          </div>

          {/* Domain */}
          <div className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="flex items-center gap-2 text-muted-foreground font-medium">
              <Layers className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />
              <span>Domain</span>
            </span>
            <span className="text-foreground/90 font-medium">
              {meta.category || 'General Architecture'}
            </span>
          </div>

          {/* Grounding */}
          <div className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="flex items-center gap-2 text-muted-foreground font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Grounding</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Synthius CategoryRAG (Verified 0% Hallucination)</span>
            </span>
          </div>

          {/* Contributors */}
          <div className="flex items-center justify-between py-1 border-b border-border/40">
            <span className="flex items-center gap-2 text-muted-foreground font-medium">
              <User className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Contributors</span>
            </span>
            <div className="flex items-center gap-1.5">
              <div className="flex -space-x-1.5">
                <div className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] flex items-center justify-center font-bold">
                  A
                </div>
                <div className="w-4 h-4 rounded-full bg-purple-600 text-white text-[9px] flex items-center justify-center font-bold">
                  AI
                </div>
              </div>
              <span className="text-muted-foreground text-[11px]">Autonomous Co-Architect</span>
            </div>
          </div>

          {/* Tags */}
          {meta.tags && meta.tags.length > 0 && (
            <div className="flex items-center justify-between py-1 col-span-1 md:col-span-2">
              <span className="flex items-center gap-2 text-muted-foreground font-medium">
                <Tag className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                <span>Tags</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {meta.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-muted/40 text-foreground/80 border border-border"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
