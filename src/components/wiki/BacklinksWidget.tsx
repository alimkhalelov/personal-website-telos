"use client";

import React from "react";
import Link from "next/link";
import { Link2, ArrowUpRight, Network } from "lucide-react";

interface BacklinkItem {
  slug: string;
  title: string;
  category: string;
}

interface BacklinksWidgetProps {
  backlinks: BacklinkItem[];
  forwardLinks?: string[];
}

export function BacklinksWidget({ backlinks, forwardLinks = [] }: BacklinksWidgetProps) {
  if (backlinks.length === 0 && forwardLinks.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground flex items-center gap-2">
          <Network className="w-4 h-4 text-blue-500" />
          <span>Knowledge Graph Connections</span>
        </h3>
        <Link
          href="/wiki/graph"
          className="text-xs text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 flex items-center gap-1 transition-colors !no-underline"
        >
          <span>Open Full Graph</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Incoming Backlinks */}
        <div className="space-y-2.5">
          <div className="text-xs font-medium text-muted-foreground/80 flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Referenced by ({backlinks.length})</span>
          </div>

          {backlinks.length > 0 ? (
            <div className="space-y-1.5">
              {backlinks.map((b) => (
                <Link
                  key={b.slug}
                  href={`/wiki/${b.slug}`}
                  className="group flex items-center justify-between p-2.5 rounded-lg bg-card/60 border border-border hover:border-emerald-500/30 hover:bg-emerald-500/[0.05] transition-all !no-underline"
                >
                  <div className="min-w-0 pr-2">
                    <div className="text-xs font-medium text-foreground group-hover:text-emerald-500 transition-colors truncate">
                      {b.title}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {b.category}
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground/60 p-3 rounded-lg border border-border/50 border-dashed">
              No inbound backlinks yet.
            </div>
          )}
        </div>

        {/* Outgoing Forward Links */}
        <div className="space-y-2.5">
          <div className="text-xs font-medium text-muted-foreground/80 flex items-center gap-1.5">
            <Link2 className="w-3.5 h-3.5 text-blue-500 rotate-90" />
            <span>Mentions ({forwardLinks.length})</span>
          </div>

          {forwardLinks.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {forwardLinks.map((f) => (
                <Link
                  key={f}
                  href={`/wiki/${f}`}
                  className="px-2.5 py-1 rounded-md text-xs bg-muted/60 text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 border border-border hover:border-blue-500/20 transition-all font-mono !no-underline"
                >
                  [[{f}]]
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground/60 p-3 rounded-lg border border-border/50 border-dashed">
              No outgoing wikilinks.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
