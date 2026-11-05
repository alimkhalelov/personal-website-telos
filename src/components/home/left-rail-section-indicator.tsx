"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SectionConfig {
  id: string;
  label: string;
}

const SECTIONS: SectionConfig[] = [
  { id: "hero", label: "hey, I'm" },
  { id: "projects", label: "Projects" },
  { id: "posts", label: "Posts" },
  { id: "network", label: "Network" },
];

export function LeftRailSectionIndicator() {
  const [activeId, setActiveId] = React.useState<string>("hero");
  const [hasEntered, setHasEntered] = React.useState(false);
  const [heroBaselineY, setHeroBaselineY] = React.useState<number>(182);

  // Measure bottom baseline of #hero h1 on mount and resize
  React.useEffect(() => {
    const measureBaseline = () => {
      const h1 = document.querySelector("#hero h1");
      if (h1) {
        const rect = h1.getBoundingClientRect();
        // rect.bottom is the bottom line of the title block.
        // With leading-[1.05], the text baseline sits ~14px above the bottom of the bounding box.
        setHeroBaselineY(rect.bottom - 14);
      }
    };

    measureBaseline();
    window.addEventListener("resize", measureBaseline);
    return () => window.removeEventListener("resize", measureBaseline);
  }, []);

  // Delay the initial entrance of "hey, I'm" by 800ms so it doesn't appear immediately
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Track active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const projectsEl = document.getElementById("projects");
      const postsEl = document.getElementById("posts");
      const networkEl = document.getElementById("network");

      // Sensitivity threshold from top of viewport
      const threshold = 260;

      if (networkEl && networkEl.getBoundingClientRect().top <= threshold) {
        setActiveId("network");
      } else if (postsEl && postsEl.getBoundingClientRect().top <= threshold) {
        setActiveId("posts");
      } else if (projectsEl && projectsEl.getBoundingClientRect().top <= threshold) {
        setActiveId("projects");
      } else {
        setActiveId("hero");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0];

  return (
    <aside
      aria-label="Current section indicator"
      className="hidden lg:flex fixed z-30 pointer-events-none select-none flex-col items-end"
      style={{
        left: 0,
        width: "calc(50vw - 28rem + 0.5rem)",
        // In hero section, align with the bottom baseline of "Alim Khalelov"
        // In other sections, float at comfortable eye level (130px)
        top: activeId === "hero" ? `${heroBaselineY}px` : "130px",
        transform: activeId === "hero" ? "translateY(-88%)" : "translateY(0%)",
        transition: "top 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="pr-5 sm:pr-6 flex items-center justify-end">
        <AnimatePresence mode="wait">
          {hasEntered && (
            <motion.span
              key={currentSection.id}
              initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(10px)" }}
              transition={{
                duration: 0.85, // Slower, luxurious transition
                ease: [0.16, 1, 0.3, 1], // Apple physical spring easing
              }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white/30 drop-shadow-[0_2px_12px_rgba(0,0,0,0.18)] whitespace-nowrap text-right"
              style={{
                fontFamily:
                  "var(--font-sf-pro-rounded), 'SF Pro Rounded', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                lineHeight: 1.05,
              }}
            >
              {currentSection.label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
