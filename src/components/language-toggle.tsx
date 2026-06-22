"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Globe } from "lucide-react";

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

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState("en");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if the user has manually chosen a language previously
    const storedLang = localStorage.getItem("preferred_lang");
    
    // Check for googtrans cookie
    const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
    let cookieLang = null;
    if (match && match[2]) {
      const parts = match[2].split('/');
      if (parts.length === 3) {
        cookieLang = parts[2];
      }
    }

    let targetLang = "en";

    if (storedLang) {
      targetLang = storedLang;
    } else if (cookieLang) {
      targetLang = cookieLang;
    } else {
      // Auto-detect browser language if neither is set
      const browserLang = navigator.language.split('-')[0];
      if (languages.some(l => l.code === browserLang)) {
        targetLang = browserLang;
      }
    }

    // Set cookie if needed
    if (targetLang !== cookieLang) {
      setLanguageCookie(targetLang);
    }
    
    setCurrentLang(targetLang);

    // Provide the initialization callback for Google Translate
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en', autoDisplay: false },
        'google_translate_element'
      );
    };
  }, []);

  const setLanguageCookie = (lang: string) => {
    if (lang === "en") {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${location.hostname};`;
    } else {
      document.cookie = `googtrans=/en/${lang}; path=/;`;
      document.cookie = `googtrans=/en/${lang}; path=/; domain=${location.hostname};`;
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    setCurrentLang(newLang);
    localStorage.setItem("preferred_lang", newLang);
    setLanguageCookie(newLang);
    // Reload the page to apply the translation immediately
    window.location.reload();
  };

  if (!isClient) return null;

  return (
    <>
      {/* Hidden element required for Google Translate to mount */}
      <div id="google_translate_element" style={{ display: 'none' }}></div>
      <Script 
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="lazyOnload"
      />
      
      <div className="relative inline-flex items-center">
        <div className="absolute left-2.5 pointer-events-none text-muted-foreground/70">
          <Globe className="w-3.5 h-3.5" />
        </div>
        <select 
          value={currentLang} 
          onChange={handleLanguageChange}
          className="bg-transparent text-xs font-medium border border-border/40 hover:border-border rounded-md pl-8 pr-6 py-1.5 outline-none text-muted-foreground hover:text-foreground transition-all appearance-none cursor-pointer"
        >
          {languages.map(lang => (
            <option key={lang.code} value={lang.code} className="bg-background text-foreground">
              {lang.name}
            </option>
          ))}
        </select>
        <div className="absolute right-2.5 pointer-events-none text-muted-foreground/70">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
        </div>
      </div>
    </>
  );
}
