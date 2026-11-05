"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Плавающий оверлейный скроллбар в стиле iOS / macOS:
 * - Нативный системный скроллбар Windows полностью скрыт (display: none).
 * - Бегунок появляется ТОЛЬКО во время активного скролла как матовая стеклянная капсула.
 * - Плавно затухает через 700мс после остановки.
 * - Не резервирует место, не создает полос справа.
 */
export function ScrollController() {
  const [isScrolling, setIsScrolling] = useState(false);
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(40);
  const [isScrollable, setIsScrollable] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateMetrics = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollable = scrollHeight > clientHeight + 10;
      setIsScrollable(scrollable);

      if (scrollable) {
        const height = Math.max(36, (clientHeight / scrollHeight) * clientHeight);
        setThumbHeight(height);
        const maxScroll = scrollHeight - clientHeight;
        const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
        setThumbTop(progress * (clientHeight - height));
      }
    };

    const handleScroll = () => {
      updateMetrics();
      setIsScrolling(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateMetrics);
    updateMetrics();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateMetrics);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!isScrollable) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 right-1 sm:right-1.5 bottom-0 w-1.5 pointer-events-none z-50 transition-opacity duration-300"
      style={{ opacity: isScrolling ? 1 : 0 }}
    >
      <div
        className="w-1 sm:w-1.5 rounded-full bg-white/40 dark:bg-white/45 backdrop-blur-md shadow-xs transition-transform duration-75 ease-out"
        style={{
          height: `${thumbHeight}px`,
          transform: `translateY(${thumbTop}px)`,
        }}
      />
    </div>
  );
}
