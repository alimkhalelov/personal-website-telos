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
  { id: "resume", label: "Resume" },
  { id: "posts", label: "Posts" },
  { id: "network", label: "Network" },
];

export function LeftRailSectionIndicator() {
  const [activeId, setActiveId] = React.useState<string>("hero");
  const [hasEntered, setHasEntered] = React.useState(false);
  const [heroDocTop, setHeroDocTop] = React.useState<number>(175);
  const heroAsideRef = React.useRef<HTMLDivElement>(null);

  // Sync baseline of "hey, I'm" to the bottom baseline of "Alim Khalelov"
  // Uses document coordinates so "hey, I'm" is positioned absolutely and
  // scrolls hardware-locked with the hero section on the compositor thread with 0 lag.
  const syncBaseline = React.useCallback(() => {
    const heroProbe = document.getElementById("hero-baseline-probe");
    const indProbe = document.getElementById("indicator-baseline-probe");
    const container = heroAsideRef.current;

    if (heroProbe && container) {
      const heroRect = heroProbe.getBoundingClientRect();
      const offsetParent = container.offsetParent as HTMLElement | null;
      const parentTop = offsetParent ? offsetParent.getBoundingClientRect().top : 0;

      // Distance from document / parent top to hero baseline
      const heroYInParent = heroRect.top - parentTop;

      if (indProbe) {
        const indRect = indProbe.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const probeOffsetInContainer = indRect.top - containerRect.top;
        setHeroDocTop(heroYInParent - probeOffsetInContainer);
      } else {
        // Fallback estimate (~26px for 32px font) before indicator probe is mounted
        setHeroDocTop(heroYInParent - 26);
      }
    }
  }, []);

  // Measure on mount, window resize, and font load
  React.useEffect(() => {
    syncBaseline();
    window.addEventListener("resize", syncBaseline);
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(syncBaseline);
    }
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
      const id = requestAnimationFrame(() => {
        syncBaseline();
      });
      return () => cancelAnimationFrame(id);
    }
  }, [hasEntered, syncBaseline]);

  // Track active section on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      const projectsEl = document.getElementById("projects");
      const resumeEl = document.getElementById("resume");
      const postsEl = document.getElementById("posts");
      const networkEl = document.getElementById("network");

      const threshold = 260;

      if (networkEl && networkEl.getBoundingClientRect().top <= threshold) {
        setActiveId("network");
      } else if (postsEl && postsEl.getBoundingClientRect().top <= threshold) {
        setActiveId("posts");
      } else if (resumeEl && resumeEl.getBoundingClientRect().top <= threshold) {
        setActiveId("resume");
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

  const currentSection = SECTIONS.find((s) => s.id === activeId) || SECTIONS[1];

  return (
    <>
      {/* 1. HERO INDICATOR: Absolute position in document flow.
          Scrolls synchronously with "Alim Khalelov" on the GPU compositor with ZERO lag. */}
      <div
        ref={heroAsideRef}
        aria-label="Hero section indicator"
        className="hidden lg:flex absolute z-30 pointer-events-none select-none flex-col items-end"
        style={{
          left: 0,
          width: "calc(50vw - 28rem + 0.5rem)",
          top: `${heroDocTop}px`,
        }}
      >
        <div className="pr-5 sm:pr-6 flex items-center justify-end">
          <AnimatePresence>
            {hasEntered && activeId === "hero" && (
              <motion.span
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
                hey, I&apos;m
                <span
                  id="indicator-baseline-probe"
                  className="inline-block w-0 h-0 align-baseline pointer-events-none select-none opacity-0"
                  aria-hidden="true"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 2. OTHER SECTIONS (Projects, Posts, Network): Fixed eye-level rail at 130px */}
      <aside
        aria-label="Current section indicator"
        className="hidden lg:flex fixed z-30 pointer-events-none select-none flex-col items-end"
        style={{
          left: 0,
          width: "calc(50vw - 28rem + 0.5rem)",
          top: "130px",
        }}
      >
        <div className="pr-5 sm:pr-6 flex items-center justify-end">
          <AnimatePresence mode="wait">
            {activeId !== "hero" && (
              <motion.span
                key={activeId}
                initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -14, filter: "blur(8px)" }}
                transition={{
                  duration: 0.6,
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
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </aside>
    </>
  );
}