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
  const [heroTop, setHeroTop] = React.useState<number>(175);
  const asideRef = React.useRef<HTMLElement>(null);

  // Sync baseline of "hey, I'm" to the bottom baseline of "Alim Khalelov"
  const syncBaseline = React.useCallback(() => {
    const heroProbe = document.getElementById("hero-baseline-probe");
    const indProbe = document.getElementById("indicator-baseline-probe");
    const aside = asideRef.current;

    if (heroProbe && indProbe && aside) {
      const heroProbeY = heroProbe.getBoundingClientRect().top;
      const indProbeY = indProbe.getBoundingClientRect().top;
      const asideY = aside.getBoundingClientRect().top;
      const probeOffsetInAside = indProbeY - asideY;
      setHeroTop(heroProbeY - probeOffsetInAside);
    } else if (heroProbe) {
      const heroProbeY = heroProbe.getBoundingClientRect().top;
      // Approximate probe offset (~26px for 32px font) before indicator probe is mounted
      setHeroTop(heroProbeY - 26);
    }
  }, []);

  // Measure on mount and on window resize
  React.useEffect(() => {
    syncBaseline();
    window.addEventListener("resize", syncBaseline);
    return () => window.removeEventListener("resize", syncBaseline);
  }, [syncBaseline]);

  // Delay the initial entrance of "hey, I'm" by 800ms
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHasEntered(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Re-sync baseline once the indicator probe mounts
  React.useEffect(() => {
    if (hasEntered) {
      // Allow DOM to paint the probe
      const id = requestAnimationFrame(() => {
        syncBaseline();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [hasEntered, syncBaseline]);

  // Track active section and baseline on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const projectsEl = document.getElementById("projects");
      const postsEl = document.getElementById("posts");
      const networkEl = document.getElementById("network");

      const threshold = 260;

      if (networkEl && networkEl.getBoundingClientRect().top <= threshold) {
        setActiveId("network");
      } else if (postsEl && postsEl.getBoundingClientRect().top <= threshold) {
        setActiveId("posts");
      } else if (projectsEl && projectsEl.getBoundingClientRect().top <= threshold) {
        setActiveId("projects");
      } else {
        setActiveId("hero");
        syncBaseline();
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [syncBaseline]);

  const currentSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[0];

  return (
    <aside
      ref={asideRef}
      aria-label="Current section indicator"
      className="hidden lg:flex fixed z-30 pointer-events-none select-none flex-col items-end"
      style={{
        left: 0,
        width: "calc(50vw - 28rem + 0.5rem)",
        // In hero section, align top so baseline matches "Alim Khalelov"
        // In other sections, float at comfortable eye level (130px)
        top: activeId === "hero" ? `${heroTop}px` : "130px",
        transition:
          activeId === "hero"
            ? "none"
            : "top 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <div className="pr-5 sm:pr-6 flex items-center justify-end">
        <AnimatePresence mode="wait">
          {hasEntered && (
            <motion.span
              key={currentSection.id}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
              transition={{
                duration: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight text-white/35 drop-shadow-[0_2px_12px_rgba(0,0,0,0.18)] whitespace-nowrap text-right"
              style={{
                fontFamily:
                  "var(--font-sf-pro-rounded), 'SF Pro Rounded', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                lineHeight: 1.05,
              }}
            >
              {currentSection.label}
              {activeId === "hero" && (
                <span
                  id="indicator-baseline-probe"
                  className="inline-block w-0 h-0 align-baseline pointer-events-none select-none opacity-0"
                  aria-hidden="true"
                />
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}