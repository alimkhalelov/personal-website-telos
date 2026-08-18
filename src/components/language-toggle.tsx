"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Script from "next/script";

const languages = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "es", name: "Español" },
  { code: "zh-CN", name: "中文" },
  { code: "fr", name: "Français" },
  { code: "de", name: "Deutsch" },
  { code: "ja", name: "日本語" },
  { code: "ko", name: "한국어" },
  { code: "ar", name: "العربية" },
  { code: "pt", name: "Português" },
  { code: "it", name: "Italiano" },
  { code: "kk", name: "Қазақша" },
];

function setLanguageCookie(lang: string) {
  if (typeof document === "undefined") return;
  if (lang === "en") {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname};`;
  } else {
    document.cookie = `googtrans=/en/${lang}; path=/;`;
    document.cookie = `googtrans=/en/${lang}; path=/; domain=${location.hostname};`;
  }
}

function getInitialLanguage(): string {
  if (typeof window === "undefined") return "en";
  try {
    const storedLang = localStorage.getItem("preferred_lang");
    if (storedLang) return storedLang;

    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    if (match && match[2]) {
      const parts = match[2].split("/");
      if (parts.length === 3) return parts[2];
    }

    const browserLang = navigator.language.split("-")[0];
    if (languages.some((l) => l.code === browserLang)) {
      return browserLang;
    }
  } catch {}
  return "en";
}

const emptySubscribe = () => () => {};

export function LanguageToggle() {
  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [currentLang, setCurrentLang] = useState<string>(getInitialLanguage);

  useEffect(() => {
    // Provide the initialization callback for Google Translate
    (window as unknown as { googleTranslateElementInit: () => void }).googleTranslateElementInit = () => {
      const googleObj = (window as unknown as { google?: { translate: { TranslateElement: new (config: { pageLanguage: string; autoDisplay: boolean }, el: string) => void } } }).google;
      if (googleObj?.translate?.TranslateElement) {
        new googleObj.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
      }
    };
  }, []);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setCurrentLang(newLang);
    try {
      localStorage.setItem("preferred_lang", newLang);
      setLanguageCookie(newLang);
    } catch {}
    window.location.reload();
  };

  if (!isClient) return null;

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }}></div>
      <Script 
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
      
      <div className="relative inline-flex items-center text-right">
        <select 
          value={currentLang} 
          onChange={handleLanguageChange}
          aria-label="Select Language"
          className="bg-transparent text-xs font-mono font-medium outline-none text-muted-foreground hover:text-foreground transition-all appearance-none cursor-pointer pr-4 pl-1.5 py-1.5 rounded-md hover:bg-muted/20"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code} className="bg-background text-foreground text-xs font-mono">
              {lang.code.toUpperCase()}
            </option>
          ))}
        </select>
        <div className="absolute right-1 pointer-events-none text-muted-foreground/70">
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </>
  );
}
