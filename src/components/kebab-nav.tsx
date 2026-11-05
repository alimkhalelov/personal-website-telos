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
  Sparkles 
} from "lucide-react";
import { useTheme } from "next-themes";
import { LanguageToggle } from "./language-toggle";
import { BionicToggle } from "./bionic-toggle";
import { useDynamicDaytime } from "./one-ui-wallpaper";

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

export function KebabNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const { enabled: daytimeEnabled, toggle: toggleDaytime } = useDynamicDaytime();

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

  // Закрывать при переходе на другую страницу
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div ref={menuRef} className="fixed top-4 right-4 sm:right-8 z-50 select-none">
      {/* Кнопка 3 вертикальные точки — чистый белый цвет темы, без подложки и без обводки */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        className="p-2.5 transition-all cursor-pointer flex items-center justify-center text-white/90 hover:text-white hover:scale-110 active:scale-95 bg-transparent border-0 shadow-none outline-none focus:outline-none"
      >
        {isOpen ? (
          <X className="w-5 h-5 transition-transform rotate-0 hover:rotate-90 duration-200" />
        ) : (
          <MoreVertical className="w-5 h-5 drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]" />
        )}
      </button>

      {/* Выпадающее меню — спроектировано по стандартам /design (Frosted Glassmorphism, 44px hitboxes) */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-68 rounded-3xl bg-black/55 dark:bg-black/75 backdrop-blur-3xl border border-white/15 shadow-[0_24px_64px_rgba(0,0,0,0.5)] p-2.5 flex flex-col gap-1.5 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200">
          {/* Секция: Навигация */}
          <div className="px-3 pt-1.5 pb-0.5 text-[11px] font-mono uppercase tracking-wider text-white/45">
            Navigation
          </div>

          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[15px] font-medium transition-all !no-underline ${
              pathname === "/"
                ? "bg-white/15 text-white font-semibold"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <Home className="w-4 h-4 text-white/70" />
            <span>Home</span>
          </Link>

          <Link
            href="/projects"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[15px] font-medium transition-all !no-underline ${
              pathname?.startsWith("/projects")
                ? "bg-white/15 text-white font-semibold"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <FolderKanban className="w-4 h-4 text-white/70" />
            <span>Projects</span>
          </Link>

          <Link
            href="/wiki"
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-2xl text-[15px] font-medium transition-all !no-underline ${
              pathname?.startsWith("/wiki")
                ? "bg-white/15 text-white font-semibold"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
          >
            <BookOpen className="w-4 h-4 text-white/70" />
            <span>Wiki Hub</span>
          </Link>

          <div className="pt-1.5" />

          {/* Секция: Настройки */}
          <div className="px-3 pt-1 pb-0.5 text-[11px] font-mono uppercase tracking-wider text-white/45">
            Preferences
          </div>

          {/* Переключатель темы */}
          <div className="flex items-center justify-between px-3 py-2 rounded-2xl hover:bg-white/5 transition-colors">
            <span className="text-[14px] text-white/90 flex items-center gap-2.5">
              {mounted && theme === "dark" ? (
                <Moon className="w-4 h-4 text-white/70" />
              ) : (
                <Sun className="w-4 h-4 text-white/70" />
              )}
              Theme
            </span>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                {theme === "dark" ? "Dark" : "Light"}
              </button>
            )}
          </div>

          {/* Переключатель Dynamic Daytime */}
          <div className="flex items-center justify-between px-3 py-2 rounded-2xl hover:bg-white/5 transition-colors">
            <span className="text-[14px] text-white/90 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-300" />
              Dynamic Daytime
            </span>
            <button
              type="button"
              onClick={toggleDaytime}
              className={`text-xs font-mono px-3 py-1 rounded-full transition-colors cursor-pointer ${
                daytimeEnabled
                  ? "bg-white/25 text-white font-semibold shadow-xs"
                  : "bg-white/10 text-white/60 hover:bg-white/15"
              }`}
            >
              {daytimeEnabled ? "On" : "Off"}
            </button>
          </div>

          {/* Выбор языка */}
          <div className="flex items-center justify-between px-3 py-1.5 rounded-2xl hover:bg-white/5 transition-colors">
            <span className="text-[14px] text-white/90">Language</span>
            <LanguageToggle />
          </div>

          <BionicToggle />

          <div className="pt-1.5" />

          {/* Секция: Прямая связь (Tactile Frosted Squircles) */}
          <div className="px-3 pt-1 pb-0.5 text-[11px] font-mono uppercase tracking-wider text-white/45">
            Connect
          </div>

          <div className="flex items-center gap-2 px-1 pb-1">
            <a
              href="https://t.me/AlimLLC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              title="Telegram: @AlimLLC"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 active:scale-95 transition-all !no-underline"
            >
              <Send className="w-3.5 h-3.5 text-sky-400" />
              <span>Telegram</span>
            </a>

            <a
              href="https://linkedin.com/in/alimzhan-khalelov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium text-white/90 bg-white/10 hover:bg-white/20 active:scale-95 transition-all !no-underline"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-400" />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:alim.khalelov@gmail.com"
              aria-label="Email"
              title="Email: alim.khalelov@gmail.com"
              className="w-9 h-9 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white/90 flex items-center justify-center transition-all !no-underline"
            >
              <Mail className="w-3.5 h-3.5 text-white/80" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
