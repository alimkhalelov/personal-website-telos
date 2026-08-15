'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Network, History, Terminal, FileText, 
  ChevronDown, ChevronRight, Layers, Sparkles 
} from 'lucide-react';
import type { WikiPageMeta } from '@/lib/wiki';

interface SidebarProps {
  allPages: WikiPageMeta[];
  currentSlug: string;
}

export function Sidebar({ allPages, currentSlug }: SidebarProps) {
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('wiki_collapsed_folders');
      if (saved) {
        setCollapsedCategories(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
  }, []);

  const toggleCategory = (cat: string) => {
    const updated = { ...collapsedCategories, [cat]: !collapsedCategories[cat] };
    setCollapsedCategories(updated);
    try {
      localStorage.setItem('wiki_collapsed_folders', JSON.stringify(updated));
    } catch {
      // fallback
    }
  };

  // Group pages by category
  const categories = allPages.reduce((acc, page) => {
    const cat = page.category || 'General';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(page);
    return acc;
  }, {} as Record<string, WikiPageMeta[]>);

  const getCategoryIcon = (cat: string) => {
    const lower = cat.toLowerCase();
    if (lower.includes('concept') || lower.includes('method')) {
      return <Layers className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />;
    }
    if (lower.includes('system') || lower.includes('invariant') || lower.includes('model')) {
      return <Sparkles className="w-3.5 h-3.5 text-purple-500 dark:text-purple-400" />;
    }
    return <FileText className="w-3.5 h-3.5 text-muted-foreground" />;
  };

  return (
    <nav className="flex flex-col space-y-6 text-sm">
      {/* Pinned Quick Navigation */}
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 px-2">
          Overview
        </div>
        <div className="space-y-1">
          <Link
            href="/wiki"
            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentSlug === '' || currentSlug === 'index'
                ? 'bg-accent/10 text-accent font-semibold border border-accent/20'
                : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span>Introduction & Hub</span>
          </Link>

          <Link
            href="/wiki/graph"
            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentSlug === 'graph'
                ? 'bg-accent/10 text-accent font-semibold border border-accent/20'
                : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <Network className="w-4 h-4 text-purple-500 dark:text-purple-400" />
            <span>Knowledge Graph</span>
          </Link>

          <Link
            href="/wiki/log"
            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentSlug === 'log'
                ? 'bg-accent/10 text-accent font-semibold border border-accent/20'
                : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <History className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
            <span>Product Releases</span>
          </Link>

          <Link
            href="/wiki/api-reference"
            className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              currentSlug === 'api-reference'
                ? 'bg-accent/10 text-accent font-semibold border border-accent/20'
                : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
            }`}
          >
            <Terminal className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Serverless MCP API</span>
          </Link>
        </div>
      </div>

      {/* Hierarchical Collapsible Folders */}
      <div className="space-y-4">
        {Object.entries(categories).map(([cat, pages]) => {
          const isCollapsed = collapsedCategories[cat];
          return (
            <div key={cat} className="space-y-1">
              <button
                onClick={() => toggleCategory(cat)}
                className="w-full flex items-center justify-between px-2 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors group cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {getCategoryIcon(cat)}
                  <span>{cat}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground">
                    {pages.length}
                  </span>
                </div>
                {isCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-foreground transition-transform" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60 group-hover:text-foreground transition-transform" />
                )}
              </button>

              {!isCollapsed && (
                <div className="pl-2.5 space-y-0.5 border-l border-border ml-2 mt-1">
                  {pages.map((p) => {
                    const isActive = currentSlug === p.slug;
                    return (
                      <Link
                        key={p.slug}
                        href={`/wiki/${p.slug}`}
                        className={`block px-2.5 py-1.5 rounded-md text-xs transition-colors truncate ${
                          isActive
                            ? 'bg-accent/10 text-accent font-semibold border border-accent/20'
                            : 'text-foreground/70 hover:text-foreground hover:bg-muted/30'
                        }`}
                        title={p.title}
                      >
                        {p.title}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
}
