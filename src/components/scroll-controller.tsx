"use client";

import { useEffect } from "react";

/**
 * Отслеживает скролл страницы и добавляет класс 'is-scrolling',
 * чтобы скроллбар плавно появлялся как полупрозрачное матовое стекло во время скролла
 * и полностью исчезал в покое.
 */
export function ScrollController() {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      document.documentElement.classList.add("is-scrolling");
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.documentElement.classList.remove("is-scrolling");
      }, 850);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
