"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  MoreVertical, 
  X, 
  FolderKanban, 
  BookOpen, 
  Home, 
  Sun, 
  Moon, 
  Send, 
  Mail, 
  ExternalLink 
} from "lucide-react";

function LinkedinIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
import { useTheme } from "next-themes";
import { LanguageToggle } from "./language-toggle";
import { BionicToggle } from "./bionic-toggle";

export function KebabNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Закрытие при клике вне меню
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Закрывать при смене страницы
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div ref={menuRef} className="fixed top-4 right-4 sm:right-8 z-50 select-none">
      {/* Кнопка 3 вертикальные точки */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Navigation menu"
        aria-expanded={isOpen}
        className={`p-2.5 rounded-full backdrop-blur-xl border transition-all cursor-pointer flex items-center justify-center shadow-sm ${
          isOpen
            ? "bg-foreground/15 border-border/80 text-foreground scale-105"
            : "bg-background/60 dark:bg-zinc-900/60 border-border/40 hover:border-border text-foreground/80 hover:text-foreground hover:bg-background/80 dark:hover:bg-zinc-900/80"
        }`}
      >
        {isOpen ? (
          <X className="w-5 h-5 transition-transform rotate-0 hover:rotate-90 duration-200" />
        ) : (
          <MoreVertical className="w-5 h-5" />
        )}
      </button>

      {/* Выпадающее меню */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-64 rounded-2xl border border-border/80 bg-background/90 dark:bg-zinc-950/90 backdrop-blur-2xl shadow-2xl p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Раздел: Навигация */}
          <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
            Navigation
          </div>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors !no-underline ${
              pathname === "/"
                ? "bg-accent/15 text-accent font-semibold"
                : "text-foreground/80 hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Home className="w-4 h-4 text-muted-foreground" />
            <span>Home</span>
          </Link>

          <Link
            href="/projects"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors !no-underline ${
              pathname?.startsWith("/projects")
                ? "bg-accent/15 text-accent font-semibold"
                : "text-foreground/80 hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <FolderKanban className="w-4 h-4 text-muted-foreground" />
            <span>Projects</span>
          </Link>

          <Link
            href="/wiki"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors !no-underline ${
              pathname?.startsWith("/wiki")
                ? "bg-accent/15 text-accent font-semibold"
                : "text-foreground/80 hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <BookOpen className="w-4 h-4 text-muted-foreground" />
            <span>Wiki Hub</span>
          </Link>

          {/* Разделитель */}
          <div className="h-px bg-border/50 my-1" />

          {/* Раздел: Настройки и сервисы */}
          <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
            Preferences
          </div>

          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl hover:bg-muted/30 transition-colors">
            <span className="text-xs text-foreground/80 flex items-center gap-2">
              {mounted && theme === "dark" ? (
                <Moon className="w-3.5 h-3.5 text-muted-foreground" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-muted-foreground" />
              )}
              Theme
            </span>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-xs font-mono px-2 py-0.5 rounded-md bg-muted/30 hover:bg-muted/60 text-foreground transition-colors cursor-pointer"
              >
                {theme === "dark" ? "Dark" : "Light"}
              </button>
            )}
          </div>

          <div className="flex items-center justify-between px-3 py-1 rounded-xl hover:bg-muted/30 transition-colors">
            <span className="text-xs text-foreground/80">Language</span>
            <LanguageToggle />
          </div>

          {/* Bionic reading появляется если мы внутри статьи */}
          <BionicToggle />

          {/* Разделитель */}
          <div className="h-px bg-border/50 my-1" />

          {/* Раздел: Прямой контакт */}
          <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-muted-foreground/70">
            Connect
          </div>

          <div className="flex items-center gap-1 px-1">
            <a
              href="https://t.me/AlimLLC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-muted/40 transition-colors !no-underline"
              title="Telegram: @AlimLLC"
            >
              <Send className="w-3.5 h-3.5 text-blue-400" />
              <span>Telegram</span>
            </a>

            <a
              href="https://linkedin.com/in/alimzhan-khalelov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-muted/40 transition-colors !no-underline"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:alim.khalelov@gmail.com"
              className="p-1.5 rounded-lg text-foreground/80 hover:text-foreground hover:bg-muted/40 transition-colors !no-underline"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5 text-foreground/70" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
