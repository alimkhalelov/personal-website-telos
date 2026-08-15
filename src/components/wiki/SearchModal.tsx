'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Sparkles, FileText, X, ArrowRight } from 'lucide-react';
import type { WikiPageMeta } from '@/lib/wiki';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allPages: WikiPageMeta[];
}

export function SearchModal({ isOpen, onClose, allPages }: SearchModalProps) {
  const [tab, setTab] = useState<'docs' | 'ai'>('docs');
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiCitation, setAiCitation] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setAiAnswer(null);
      setAiCitation(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredPages = query.trim() === '' ? [] : allPages.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      (p.summary && p.summary.toLowerCase().includes(q)) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  });

  const handleAiAsk = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();

    // Check for matching topic in verified wiki pages
    const matched = allPages.find((p) => 
      p.title.toLowerCase().includes(q) || 
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(q))) ||
      (p.summary && p.summary.toLowerCase().includes(q))
    );

    if (matched) {
      setAiAnswer(matched.summary || `Verified knowledge found in ${matched.title}.`);
      setAiCitation(matched.slug);
    } else {
      // Zero-Hallucination strict refusal
      setAiAnswer("Information not found in verified project knowledge base. (Strict Zero-Hallucination Grounding)");
      setAiCitation(null);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl rounded-2xl bg-card border border-border shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Tabs */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setTab('docs'); setAiAnswer(null); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                tab === 'docs'
                  ? 'bg-accent/10 text-accent border border-accent/20 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Instant Docs Search</span>
            </button>

            <button
              onClick={() => setTab('ai')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                tab === 'ai'
                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI (Grounded)</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Bar */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && tab === 'ai') handleAiAsk();
            }}
            placeholder={
              tab === 'docs'
                ? "Search methodologies, concepts, systems by title or tag..."
                : "Ask a grounded question (e.g. 'What is Fan-Filter-Scale?')..."
            }
            className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          {tab === 'ai' && (
            <button
              onClick={handleAiAsk}
              className="px-3 py-1.5 rounded-lg bg-purple-600 text-white text-xs font-semibold hover:bg-purple-700 transition-colors flex-shrink-0 cursor-pointer"
            >
              Ask
            </button>
          )}
        </div>

        {/* Search Results Area */}
        <div className="p-4 overflow-y-auto flex-1 space-y-2">
          {tab === 'docs' ? (
            query.trim() === '' ? (
              <div className="text-center py-8 text-xs text-muted-foreground">
                Type a query to search across {allPages.length} documentation entries.
              </div>
            ) : filteredPages.length === 0 ? (
              <div className="text-center py-8 text-xs text-muted-foreground">
                No matching documentation entries found.
              </div>
            ) : (
              filteredPages.map((page) => (
                <Link
                  key={page.slug}
                  href={`/wiki/${page.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between p-3 rounded-xl bg-card border border-border/60 hover:border-accent/40 hover:bg-accent/5 transition-all group"
                >
                  <div>
                    <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {page.title}
                    </div>
                    {page.summary && (
                      <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                        {page.summary}
                      </div>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                </Link>
              ))
            )
          ) : (
            <div>
              {aiAnswer ? (
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-sm space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-4 h-4" />
                    <span>Grounded Answer</span>
                  </div>
                  <p className="text-foreground/90 leading-relaxed text-xs sm:text-sm">
                    {aiAnswer}
                  </p>
                  {aiCitation && (
                    <div className="pt-2 border-t border-purple-500/20 text-xs">
                      <span className="text-muted-foreground">Verified Provenance: </span>
                      <Link
                        href={`/wiki/${aiCitation}`}
                        onClick={onClose}
                        className="text-purple-600 dark:text-purple-400 hover:underline font-mono"
                      >
                        /wiki/{aiCitation}
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-xs text-muted-foreground">
                  Ask a question and press Enter. The system will strictly refuse to hallucinate ungrounded facts.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
