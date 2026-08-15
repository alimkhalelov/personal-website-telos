"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "./Sidebar";
import { NotionProperties } from "./NotionProperties";
import { SearchModal } from "./SearchModal";
import { BacklinksWidget } from "./BacklinksWidget";
import { 
  Search, Sun, Moon, Share2, 
  ChevronRight, Network, BookOpen, Check, ArrowLeft, Menu, X 
} from "lucide-react";
import { useTheme } from "next-themes";
import type { WikiDocMeta } from "@/lib/wiki";

interface DocsLayoutProps {
  currentPage: WikiDocMeta & {
    backlinks?: { slug: string; title: string; category: string }[];
    forwardLinks?: string[];
  };
  allPages: WikiDocMeta[];
  children: React.ReactNode;
  showProperties?: boolean;
}

export function DocsLayout({ 
  currentPage, 
  allPages, 
  children,
  showProperties = true 
}: DocsLayoutProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

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
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-500 transition-colors duration-300">
      {/* Top Sticky Navbar */}
      <header className="sticky top-0 z-40 h-14 border-b border-border bg-background/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg border border-border md:hidden text-muted-foreground hover:text-foreground cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <Link href="/" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mr-2 !no-underline hidden sm:flex">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Alim.dest.page</span>
          </Link>

          <span className="text-border hidden sm:inline">|</span>

          <Link href="/wiki" className="flex items-center gap-2 group !no-underline">
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400 group-hover:scale-105 transition-transform">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-foreground group-hover:text-blue-500 transition-colors">
              Wiki & Knowledge Base
            </span>
          </Link>

          <span className="text-muted-foreground/30 hidden md:inline">/</span>
          <div className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <span>wiki</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-foreground/80">{currentPage.category || "General"}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Trigger */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/50 border border-border hover:border-muted-foreground/30 text-xs text-muted-foreground hover:text-foreground transition-all w-32 sm:w-48 justify-between shadow-inner cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-muted-foreground/70" />
              <span className="hidden sm:inline">Search docs...</span>
              <span className="sm:hidden">Search...</span>
            </span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-mono bg-background text-muted-foreground border border-border">
              ⌘K
            </kbd>
          </button>

          {/* Share Button */}
          <button
            type="button"
            onClick={handleShare}
            className="p-2 rounded-lg bg-muted/40 border border-border hover:border-muted-foreground/40 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Copy page link"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
          </button>

          {/* Theme Toggle */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-muted/40 border border-border hover:border-muted-foreground/40 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              title="Toggle theme"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-blue-500" />
              )}
            </button>
          )}
        </div>
      </header>

      {/* Main 3-Column Container */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto flex px-4 sm:px-6 gap-8">
        {/* Column 1: Left Pinned Sidebar (w-64) */}
        <aside className="w-64 flex-shrink-0 hidden md:block py-6 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto border-r border-border pr-4">
          <Sidebar allPages={allPages} currentSlug={currentPage.slug} />
        </aside>

        {/* Mobile Sidebar Drawer */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div 
              className="w-72 bg-card border-r border-border h-full p-6 overflow-y-auto shadow-2xl animate-in slide-in-from-left duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <span className="font-semibold text-sm">Navigation</span>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <Sidebar allPages={allPages} currentSlug={currentPage.slug} />
            </div>
          </div>
        )}

        {/* Column 2: Center Main Reading Column (max-w-4xl) */}
        <main className="flex-1 min-w-0 py-8 max-w-3xl lg:max-w-4xl">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 font-mono">
            <Link href="/wiki" className="hover:text-blue-500 transition-colors !no-underline">wiki</Link>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-muted-foreground">{currentPage.category || "General"}</span>
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            <span className="text-foreground font-medium truncate max-w-[220px]">{currentPage.title}</span>
          </div>

          {/* H1 Page Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-6">
            {currentPage.title}
          </h1>

          {/* 2-Column Notion Database Properties List */}
          {showProperties && (
            <div className="mb-8">
              <NotionProperties meta={currentPage} />
            </div>
          )}

          {/* Minimalist Bold TL;DR Block (if summary exists) */}
          {currentPage.summary && (
            <div className="mb-10 pb-6 border-b border-border">
              <div className="text-xl sm:text-2xl font-black tracking-tight text-foreground mb-2">
                TL;DR
              </div>
              <p className="text-[16.5px] leading-relaxed text-foreground/80 font-normal">
                {currentPage.summary}
              </p>
            </div>
          )}

          {/* Markdown Content Article */}
          <div className="prose prose-neutral dark:prose-invert max-w-none text-[16px] sm:text-[17.5px] leading-[1.7] prose-headings:tracking-tight prose-headings:font-bold prose-a:text-blue-500 hover:prose-a:underline prose-code:font-mono prose-code:text-blue-500 dark:prose-code:text-blue-400">
            {children}
          </div>

          {/* Deterministic Backlinks Widget */}
          {currentPage.backlinks && (
            <BacklinksWidget 
              backlinks={currentPage.backlinks} 
              forwardLinks={currentPage.forwardLinks} 
            />
          )}
        </main>

        {/* Column 3: Right Sticky Table of Contents (w-60) */}
        <aside className="w-60 flex-shrink-0 hidden xl:block py-8 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto pl-4 border-l border-border">
          <div className="text-xs font-semibold text-muted-foreground/70 uppercase tracking-wider mb-3">
            On this page
          </div>
          {currentPage.headings && currentPage.headings.length > 0 ? (
            <nav className="flex flex-col space-y-2 text-xs">
              {currentPage.headings.map((h) => (
                <a
                  key={h.slug}
                  href={`#${h.slug}`}
                  className={`block transition-colors hover:text-foreground !no-underline ${
                    h.depth === 3
                      ? "pl-3 text-muted-foreground/60 hover:text-foreground"
                      : "text-muted-foreground font-medium hover:text-foreground"
                  }`}
                >
                  {h.text}
                </a>
              ))}
            </nav>
          ) : (
            <div className="text-xs text-muted-foreground/50 italic">No subheadings</div>
          )}

          {/* Quick Graph Link */}
          <div className="mt-8 pt-6 border-t border-border">
            <Link
              href="/wiki/graph"
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-xs font-medium text-blue-500 dark:text-blue-400 hover:bg-blue-500/20 transition-all group !no-underline"
            >
              <Network className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Cosmic Graph</span>
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
