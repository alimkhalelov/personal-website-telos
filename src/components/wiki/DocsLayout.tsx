'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sidebar } from './Sidebar';
import { NotionProperties } from './NotionProperties';
import { SearchModal } from './SearchModal';
import { 
  Search, Share2, ChevronRight, 
  Network, BookOpen, Check, ArrowLeft 
} from 'lucide-react';
import type { WikiPageMeta } from '@/lib/wiki';

interface DocsLayoutProps {
  currentPage: WikiPageMeta;
  allPages: WikiPageMeta[];
  children: React.ReactNode;
}

export function DocsLayout({ currentPage, allPages, children }: DocsLayoutProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent/20 selection:text-accent">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-1.5 rounded-lg hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-colors mr-1" title="Back to Portfolio Home">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          
          <Link href="/wiki" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <span className="font-semibold text-[15px] tracking-tight text-foreground group-hover:text-accent transition-colors">
              Wiki & Knowledge Base
            </span>
          </Link>
          <span className="text-muted-foreground/30 hidden sm:inline">/</span>
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <span>wiki</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-foreground/80">{currentPage.category || 'General'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border hover:border-accent/40 text-xs text-muted-foreground hover:text-foreground transition-all w-36 sm:w-52 justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-muted-foreground/60" />
              <span>Search docs...</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-muted/60 text-muted-foreground border border-border">
              ⌘K
            </kbd>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="p-2 rounded-lg bg-muted/30 border border-border hover:border-accent/40 text-muted-foreground hover:text-foreground transition-colors relative cursor-pointer"
            title="Copy page link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main 3-Column Shell */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto flex px-4 sm:px-6 gap-8">
        {/* Column 1: Left Pinned Sidebar (w-64) */}
        <aside className="w-64 flex-shrink-0 hidden md:block py-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border pr-4">
          <Sidebar allPages={allPages} currentSlug={currentPage.slug} />
        </aside>

        {/* Column 2: Center Main Reading Column (max-w-4xl) */}
        <main className="flex-1 min-w-0 py-8 max-w-3xl lg:max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 font-mono">
            <Link href="/wiki" className="hover:text-accent transition-colors">wiki</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-foreground/70">{currentPage.category || 'General'}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-foreground truncate max-w-[200px]">{currentPage.title}</span>
          </div>

          {/* H1 Page Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-6">
            {currentPage.title}
          </h1>

          {/* 2-Column Notion Database Properties List */}
          <div className="mb-8">
            <NotionProperties meta={currentPage} />
          </div>

          {/* Minimalist Bold TL;DR Block (if summary exists) */}
          {currentPage.summary && (
            <div className="mb-10 pb-6 border-b border-border">
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-2">
                TL;DR
              </div>
              <p className="text-[16.5px] leading-relaxed text-foreground/80 font-normal">
                {currentPage.summary}
              </p>
            </div>
          )}

          {/* Markdown Content Article */}
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            {children}
          </article>
        </main>

        {/* Column 3: Right Sticky Table of Contents (w-60) */}
        <aside className="w-60 flex-shrink-0 hidden xl:block py-8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto pl-4 border-l border-border">
          <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            On this page
          </div>
          {currentPage.headings && currentPage.headings.length > 0 ? (
            <nav className="flex flex-col space-y-2 text-xs">
              {currentPage.headings.map((h) => (
                <a
                  key={h.slug}
                  href={`#${h.slug}`}
                  className={`block transition-colors hover:text-foreground ${
                    h.depth === 3 ? 'pl-3 text-muted-foreground' : 'text-foreground/80 font-medium'
                  }`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          ) : (
            <div className="text-xs text-muted-foreground/60 italic">No subheadings</div>
          )}

          {/* Quick Graph Link */}
          <div className="mt-8 pt-6 border-t border-border">
            <Link
              href="/wiki/graph"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20 text-xs font-medium text-accent hover:bg-accent/20 transition-all group"
            >
              <Network className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Interactive Graph</span>
            </Link>
          </div>
        </aside>
      </div>

      {/* Global Search Modal */}
      <SearchModal 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)} 
        allPages={allPages} 
      />
    </div>
  );
}
