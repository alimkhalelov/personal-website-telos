"use client";

import { useState, useEffect } from "react";
import { ChevronDown, Calendar, Eye, EyeOff, Tag, Layers, Hash } from "lucide-react";
import { WikiPage } from "@/lib/wiki-loader";

interface PropertiesPanelProps {
  page: WikiPage;
}

export function PropertiesPanel({ page }: PropertiesPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("wiki_properties_collapsed");
      if (stored === "true") {
        setIsCollapsed(true);
      }
    } catch {}
  }, []);

  const toggleCollapsed = () => {
    const next = !isCollapsed;
    setIsCollapsed(next);
    try {
      localStorage.setItem("wiki_properties_collapsed", String(next));
    } catch {}
  };

  return (
    <div className="my-6 border-t border-black/5 dark:border-white/5 pt-3 select-none">
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={toggleCollapsed}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors py-1 px-2 -ml-2 rounded-md hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 cursor-pointer"
          title="Свернуть / развернуть свойства"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isCollapsed ? "-rotate-90" : ""
            }`}
          />
          <span className="font-mono uppercase tracking-wider text-[11px]">
            {isCollapsed ? "Показать свойства" : "Свойства документа"}
          </span>
        </button>
      </div>

      {!isCollapsed && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-[#EBEBE8] dark:bg-[#252525] text-sm animate-in fade-in duration-150">
          {/* Category Property */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 w-28 shrink-0">
              <Layers className="w-3.5 h-3.5" />
              <span>Категория</span>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
              {page.category}
            </span>
          </div>

          {/* Last Updated Property */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 w-28 shrink-0">
              <Calendar className="w-3.5 h-3.5" />
              <span>Обновлено</span>
            </div>
            <span className="text-xs font-mono text-zinc-700 dark:text-zinc-300">
              {page.last_updated}
            </span>
          </div>

          {/* Visibility Property */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 w-28 shrink-0">
              {page.visibility === "public" ? (
                <Eye className="w-3.5 h-3.5" />
              ) : (
                <EyeOff className="w-3.5 h-3.5" />
              )}
              <span>Доступ</span>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-mono capitalize px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-zinc-800 dark:text-zinc-200">
              {page.visibility} Tier
            </span>
          </div>

          {/* Tags Property */}
          {page.tags && page.tags.length > 0 && (
            <div className="flex items-center gap-3 sm:col-span-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500 w-28 shrink-0">
                <Tag className="w-3.5 h-3.5" />
                <span>Теги</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {page.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400"
                  >
                    <Hash className="w-3 h-3 text-zinc-400" />
                    <span>{t}</span>
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
