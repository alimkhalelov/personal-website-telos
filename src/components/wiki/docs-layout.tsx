"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, 
  Share2, 
  ChevronDown, 
  Eye, 
  EyeOff, 
  Menu, 
  X, 
  Check, 
  ArrowLeft,
  BookOpen,
  Home
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
  const [collapsedFolders, setCollapsedFolders] = useState<string[]>([]);

  const publicPages = allPages.filter((p) => p.visibility === "public");
  const privatePages = allPages.filter((p) => p.visibility === "private");

  // Load collapsed folder state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("wiki_collapsed_folders");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setCollapsedFolders(parsed);
        } else {
          setCollapsedFolders([]);
        }
      }
    } catch {
      setCollapsedFolders([]);
    }
  }, []);

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

  const toggleFolder = (folderId: string) => {
    const list = Array.isArray(collapsedFolders) ? collapsedFolders : [];
    const next = list.includes(folderId)
      ? list.filter((id) => id !== folderId)
      : [...list, folderId];
    setCollapsedFolders(next);
    try {
      localStorage.setItem("wiki_collapsed_folders", JSON.stringify(next));
    } catch {}
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {}
  };

  const isPublicCollapsed = Array.isArray(collapsedFolders) && collapsedFolders.includes("public-docs");
  const isPrivateCollapsed = Array.isArray(collapsedFolders) && collapsedFolders.includes("private-docs");

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

          <Link href="/wiki" className="flex items-center gap-2.5 font-bold text-zinc-950 dark:text-white hover:opacity-80 transition-opacity !no-underline">
            <div className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5">
              <BookOpen className="w-5 h-5 text-accent" />
            </div>
            <span className="tracking-tight text-xl sm:text-2xl font-extrabold">Wiki</span>
          </Link>
        </div>

        {/* Header Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/"
            className="p-2 sm:p-2.5 rounded-xl bg-[#EBEBE8] dark:bg-[#252525] hover:bg-[#E2E2DE] dark:hover:bg-[#2E2E35] text-zinc-700 dark:text-zinc-300 transition-all !no-underline flex items-center gap-1.5 text-xs font-medium"
            title="Back to Home"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 sm:p-2.5 rounded-xl bg-[#EBEBE8] dark:bg-[#252525] hover:bg-[#E2E2DE] dark:hover:bg-[#2E2E35] text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
            title="Поиск (⌘K)"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="p-2 sm:p-2.5 rounded-xl bg-[#EBEBE8] dark:bg-[#252525] hover:bg-[#E2E2DE] dark:hover:bg-[#2E2E35] text-zinc-700 dark:text-zinc-300 transition-all cursor-pointer"
            title={copiedLink ? "Ссылка скопирована!" : "Поделиться"}
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
            {/* Public Section Folder */}
            {publicPages.length > 0 && (
              <div className="folder-group">
                <button
                  type="button"
                  onClick={() => toggleFolder("public-docs")}
                  className="flex items-center justify-between w-full text-left py-2 px-3 rounded-xl text-[15.5px] font-bold text-zinc-900 dark:text-zinc-100 hover:bg-[#EBEBE8] dark:hover:bg-[#252525] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Eye className="w-4 h-4 text-zinc-500" />
                    <span>Public</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
                      isPublicCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                </button>

                {!isPublicCollapsed && (
                  <nav className="space-y-1 mt-1.5 pl-3 ml-2.5">
                    {publicPages.map((page) => {
                      const isActive = currentPage.slug === page.slug;
                      return (
                        <Link
                          key={page.slug}
                          href={`/wiki/${page.slug}`}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[15px] transition-all !no-underline ${
                            isActive
                              ? "bg-[#E4E4E0] dark:bg-[#252525] text-zinc-950 dark:text-white font-bold"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-[#EBEBE8] dark:hover:bg-[#252525] hover:text-zinc-950 dark:hover:text-zinc-200 font-medium"
                          }`}
                        >
                          <span className="truncate">{page.title}</span>
                        </Link>
                      );
                    })}
                  </nav>
                )}
              </div>
            )}

            {/* Private Section Folder */}
            {privatePages.length > 0 && (
              <div className="folder-group">
                <button
                  type="button"
                  onClick={() => toggleFolder("private-docs")}
                  className="flex items-center justify-between w-full text-left py-2 px-3 rounded-xl text-[15.5px] font-bold text-zinc-900 dark:text-zinc-100 hover:bg-[#EBEBE8] dark:hover:bg-[#252525] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <EyeOff className="w-4 h-4 text-zinc-500" />
                    <span>Private (Harness)</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-500 transition-transform duration-200 ${
                      isPrivateCollapsed ? "-rotate-90" : ""
                    }`}
                  />
                </button>

                {!isPrivateCollapsed && (
                  <nav className="space-y-1 mt-1.5 pl-3 ml-2.5">
                    {privatePages.map((page) => {
                      const isActive = currentPage.slug === page.slug;
                      return (
                        <Link
                          key={page.slug}
                          href={`/wiki/${page.slug}`}
                          className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[15px] transition-all !no-underline ${
                            isActive
                              ? "bg-[#E4E4E0] dark:bg-[#252525] text-zinc-950 dark:text-white font-bold"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-[#EBEBE8] dark:hover:bg-[#252525] hover:text-zinc-950 dark:hover:text-zinc-200 font-medium"
                          }`}
                        >
                          <span className="truncate">{page.title}</span>
                        </Link>
                      );
                    })}
                  </nav>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* Center Main Reading Column */}
        <main className="flex-1 min-w-0 max-w-full lg:max-w-4xl pb-16 sm:pb-24 text-left overflow-x-hidden">
          {/* Header Title Area */}
          <header className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                {currentPage.category}
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono capitalize bg-black/5 dark:bg-white/5 text-zinc-600 dark:text-zinc-400">
                {currentPage.visibility}
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
                Оглавление
              </span>
              <ul className="space-y-2 text-[14px]">
                {currentPage.headings.map((h) => (
                  <li key={h.slug} className={h.depth === 3 ? "pl-3 text-xs" : ""}>
                    <a
                      href={`#${h.slug}`}
                      className="text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors block py-0.5 truncate leading-snug !no-underline"
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
                {publicPages.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                      <Eye className="w-4 h-4" />
                      <span>Public</span>
                    </div>
                    <div className="space-y-1 pl-2">
                      {publicPages.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/wiki/${page.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors !no-underline ${
                            currentPage.slug === page.slug
                              ? "bg-[#E4E4E0] dark:bg-[#252525] text-zinc-950 dark:text-white font-bold"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-[#EBEBE8] dark:hover:bg-[#252525]"
                          }`}
                        >
                          {page.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {privatePages.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                      <EyeOff className="w-4 h-4" />
                      <span>Private (Harness)</span>
                    </div>
                    <div className="space-y-1 pl-2">
                      {privatePages.map((page) => (
                        <Link
                          key={page.slug}
                          href={`/wiki/${page.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors !no-underline ${
                            currentPage.slug === page.slug
                              ? "bg-[#E4E4E0] dark:bg-[#252525] text-zinc-950 dark:text-white font-bold"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-[#EBEBE8] dark:hover:bg-[#252525]"
                          }`}
                        >
                          {page.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-black/5 dark:border-white/5 text-xs text-zinc-400 flex items-center justify-between">
              <span>AI-Wiki Platform</span>
              <Link href="/" className="hover:underline text-accent">Home →</Link>
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
