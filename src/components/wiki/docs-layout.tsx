"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  Share2, 
  Menu, 
  X, 
  Check, 
  Home,
  BookOpen,
  FileText,
  Sparkles,
  Layers
} from "lucide-react";
import { WikiPage } from "@/lib/wiki-loader";
import { SearchModal } from "./search-modal";
import { PropertiesPanel } from "./properties-panel";
import { MarkdownView } from "./markdown-view";

interface DocsLayoutProps {
  currentPage: WikiPage;
  allPages: WikiPage[];
}

export function DocsLayout({ currentPage, allPages }: DocsLayoutProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const projectPages = allPages.filter((p) => p.section === "projects");
  const articlePages = allPages.filter((p) => p.section !== "projects");

  // Keyboard shortcut ⌘K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] dark:bg-[#1c1c1c] text-[#18181B] dark:text-[#E4E4E7] flex flex-col antialiased selection:bg-zinc-300 dark:selection:bg-zinc-800 w-full overflow-x-hidden">
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 sm:px-8 bg-[#FBFBFA]/90 dark:bg-[#1c1c1c]/90 backdrop-blur transition-colors w-full">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl bg-[#EBEBE8] dark:bg-[#252525] text-zinc-700 dark:text-zinc-300 hover:bg-[#E2E2DE] dark:hover:bg-[#2E2E35] transition-colors cursor-pointer shrink-0"
            title="Open menu"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <Link 
            href="/wiki" 
            className="flex items-center gap-2.5 font-bold !text-zinc-950 dark:!text-white hover:opacity-80 transition-opacity !no-underline"
          >
            <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5">
              <BookOpen className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
            </div>
            <span className="tracking-tight text-xl sm:text-2xl font-extrabold">Wiki</span>
          </Link>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2 shrink-0 pr-36 sm:pr-44">
          <Link
            href="/"
            className="p-2 sm:p-2.5 rounded-xl bg-[#EBEBE8] dark:bg-[#252525] hover:bg-[#E2E2DE] dark:hover:bg-[#2E2E35] !text-zinc-700 dark:!text-zinc-300 hover:!text-zinc-950 dark:hover:!text-white transition-all !no-underline flex items-center gap-1.5 text-xs font-medium"
            title="Back to Home"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 sm:p-2.5 rounded-xl bg-[#EBEBE8] dark:bg-[#252525] hover:bg-[#E2E2DE] dark:hover:bg-[#2E2E35] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer"
            title="Search (⌘K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="p-2 sm:p-2.5 rounded-xl bg-[#EBEBE8] dark:bg-[#252525] hover:bg-[#E2E2DE] dark:hover:bg-[#2E2E35] text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer"
            title={copiedLink ? "Link copied!" : "Share link"}
            aria-label="Share"
          >
            {copiedLink ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      {/* Main 3-Column Container: Mathematical Top Baseline Zero-Gap Alignment */}
      <div className="max-w-[1720px] w-full mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-12 flex gap-8 lg:gap-12 flex-1 min-w-0 overflow-x-hidden items-start">
        {/* Left Desktop Sidebar: Zero Top Offset, Aligned with Content Top */}
        <aside className="w-72 shrink-0 hidden md:block select-none text-left sticky top-0 self-start">
          <div className="space-y-6">
            {/* 1. Projects Section (Above Articles & Guides) */}
            {projectPages.length > 0 && (
              <div className="space-y-2">
                <div className="px-3 py-1 text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Projects</span>
                </div>

                <nav className="space-y-1">
                  {projectPages.map((page) => {
                    const isActive = currentPage.slug === page.slug;
                    return (
                      <Link
                        key={page.slug}
                        href={`/wiki/${page.slug}`}
                        className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[14.5px] transition-all !no-underline ${
                          isActive
                            ? "bg-[#E4E4E0] dark:bg-[#252525] !text-zinc-950 dark:!text-white font-bold"
                            : "!text-zinc-600 dark:!text-zinc-400 hover:bg-[#EBEBE8] dark:hover:bg-[#252525] hover:!text-zinc-950 dark:hover:!text-zinc-100 font-normal"
                        }`}
                      >
                        <Sparkles className={`w-4 h-4 shrink-0 ${isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}`} />
                        <span className="truncate">{page.title}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            )}

            {/* 2. Articles & Guides Section */}
            <div className="space-y-2">
              <div className="px-3 py-1 text-xs font-mono uppercase tracking-widest text-zinc-400 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Articles & Guides</span>
              </div>

              <nav className="space-y-1">
                {articlePages.map((page) => {
                  const isActive = currentPage.slug === page.slug;
                  return (
                    <Link
                      key={page.slug}
                      href={`/wiki/${page.slug}`}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-[14.5px] transition-all !no-underline ${
                        isActive
                          ? "bg-[#E4E4E0] dark:bg-[#252525] !text-zinc-950 dark:!text-white font-bold"
                          : "!text-zinc-600 dark:!text-zinc-400 hover:bg-[#EBEBE8] dark:hover:bg-[#252525] hover:!text-zinc-950 dark:hover:!text-zinc-100 font-normal"
                      }`}
                    >
                      <FileText className={`w-4 h-4 shrink-0 ${isActive ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400"}`} />
                      <span className="truncate">{page.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </aside>

        {/* Center Main Reading Column */}
        <main className="flex-1 min-w-0 max-w-full lg:max-w-4xl pb-16 sm:pb-24 text-left overflow-x-hidden">
          {/* Header Title Area */}
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium uppercase tracking-wider bg-black/5 dark:bg-white/5 !text-zinc-800 dark:!text-zinc-200">
                {currentPage.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#191919] dark:text-[#F4F4F5] tracking-tight leading-[1.15]">
              {currentPage.title}
            </h1>

            {currentPage.summary && (
              <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 mt-4 leading-relaxed font-light">
                {currentPage.summary}
              </p>
            )}

            {/* Notion Database Properties Pod */}
            <PropertiesPanel page={currentPage} />
          </header>

          {/* Rendered Prose Content */}
          <MarkdownView content={currentPage.content} />
        </main>

        {/* Right Outline Navigation (TOC): Zero Top Offset, Aligned with Content Top */}
        {currentPage.headings && currentPage.headings.length > 0 && (
          <aside className="w-64 shrink-0 hidden xl:block select-none text-left sticky top-0 self-start">
            <div className="max-h-[calc(100vh-5rem)] overflow-y-auto pl-6 border-l border-black/5 dark:border-white/5">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3">
                On this page
              </span>
              <ul className="space-y-2 text-[14px]">
                {currentPage.headings.map((h) => (
                  <li key={h.slug} className={h.depth === 3 ? "pl-3 text-xs" : ""}>
                    <a
                      href={`#${h.slug}`}
                      className="!text-zinc-500 hover:!text-zinc-950 dark:hover:!text-zinc-100 transition-colors block py-0.5 truncate leading-snug !no-underline"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile Slide-over Drawer Menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden flex"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsMobileMenuOpen(false);
          }}
        >
          <div className="bg-[#FBFBFA] dark:bg-[#1c1c1c] w-4/5 max-w-xs h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-extrabold text-zinc-950 dark:text-white">Wiki</span>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-[#EBEBE8] dark:bg-[#252525] text-zinc-600 dark:text-zinc-400 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6 text-left">
                {/* Mobile Projects Section */}
                {projectPages.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 px-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Projects</span>
                    </div>
                    <div className="space-y-1 pl-2">
                      {projectPages.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/wiki/${page.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors !no-underline ${
                            currentPage.slug === page.slug
                              ? "bg-[#E4E4E0] dark:bg-[#252525] !text-zinc-950 dark:!text-white font-bold"
                              : "!text-zinc-600 dark:!text-zinc-400 hover:bg-[#EBEBE8] dark:hover:bg-[#252525]"
                          }`}
                        >
                          <Sparkles className="w-4 h-4 shrink-0 text-zinc-400" />
                          <span className="truncate">{page.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Mobile Articles Section */}
                <div className="space-y-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 px-2 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Articles & Guides</span>
                  </div>
                  <div className="space-y-1 pl-2">
                    {articlePages.map((page) => (
                      <Link
                        key={page.slug}
                        href={`/wiki/${page.slug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors !no-underline ${
                          currentPage.slug === page.slug
                            ? "bg-[#E4E4E0] dark:bg-[#252525] !text-zinc-950 dark:!text-white font-bold"
                            : "!text-zinc-600 dark:!text-zinc-400 hover:bg-[#EBEBE8] dark:hover:bg-[#252525]"
                        }`}
                      >
                        <FileText className="w-4 h-4 shrink-0 text-zinc-400" />
                        <span className="truncate">{page.title}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/5 dark:border-white/5 text-xs text-zinc-400 flex items-center justify-between">
              <span>AI-Wiki Platform</span>
              <Link href="/" className="hover:underline !text-zinc-300">Home →</Link>
            </div>
          </div>
        </div>
      )}

      {/* Global Command Palette / Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allPages={allPages}
      />
    </div>
  );
}
