"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { WikiPage } from "@/lib/wiki-loader";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPages: WikiPage[];
}

export function SearchModal({ isOpen, onClose, allPages }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredPages = allPages.filter((page) => {
    if (!query.trim()) return true;

    const q = query.toLowerCase().trim();
    return (
      page.title.toLowerCase().includes(q) ||
      page.slug.toLowerCase().includes(q) ||
      page.summary.toLowerCase().includes(q) ||
      page.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 px-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#FBFBFA] dark:bg-[#1c1c1c] rounded-2xl w-full max-w-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Search Input Pod */}
        <div className="p-3 flex items-center gap-3 bg-[#EBEBE8] dark:bg-[#252525] m-3 rounded-xl">
          <Search className="w-5 h-5 text-zinc-500 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wiki documents (⌘K)..."
            className="w-full bg-transparent border-0 text-sm text-zinc-900 dark:text-zinc-100 focus:outline-none placeholder:text-zinc-500 font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1 text-left">
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <Link
                key={page.slug}
                href={`/wiki/${page.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-[#EBEBE8] dark:hover:bg-[#252525] transition-colors group !no-underline"
              >
                <div className="min-w-0 pr-4">
                  <div className="font-semibold text-zinc-900 dark:text-zinc-100 transition-colors truncate text-sm">
                    {page.title}
                  </div>
                  {page.summary && (
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                      {page.summary}
                    </div>
                  )}
                </div>
                <span className="text-xs text-zinc-400 font-mono shrink-0">/wiki/{page.slug}</span>
              </Link>
            ))
          ) : (
            <div className="text-center py-8 text-zinc-500 text-xs">
              No matching documents found for &quot;{query}&quot;.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2.5 bg-[#FBFBFA] dark:bg-[#1c1c1c] flex items-center justify-between text-xs text-zinc-500 font-mono border-t border-black/5 dark:border-white/5">
          <span>ESC to exit</span>
          <span>{filteredPages.length} documents</span>
        </div>
      </div>
    </div>
  );
}
