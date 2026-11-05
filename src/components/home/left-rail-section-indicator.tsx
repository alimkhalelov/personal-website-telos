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

  React.useEffect(() => {
    const handleScroll = () => {
      // Find the currently active section by top offset relative to viewport
      const heroEl = document.getElementById("hero");
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
    handleScroll(); // Trigger initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0];

  return (
    <aside
      aria-label="Current section indicator"
      className="hidden lg:flex fixed top-[118px] sm:top-[128px] md:top-[132px] z-30 pointer-events-none select-none flex-col items-end"
      style={{
        left: 0,
        width: "calc(50vw - 28rem + 0.5rem)",
      }}
    >
      <div className="pr-4 sm:pr-5 flex items-center justify-end">
        <AnimatePresence mode="wait">
          <motion.span
            key={currentSection.id}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
            transition={{
              duration: 0.38,
              ease: [0.16, 1, 0.3, 1], // Smooth Apple physical spring curve
            }}
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white/35 drop-shadow-[0_1px_8px_rgba(0,0,0,0.18)] whitespace-nowrap text-right"
            style={{
              fontFamily:
                "var(--font-sf-pro-rounded), 'SF Pro Rounded', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            }}
          >
            {currentSection.label}
          </motion.span>
        </AnimatePresence>
      </div>
    </aside>
  );
}
