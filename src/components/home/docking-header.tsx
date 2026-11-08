"use client";

import * as React from "react";

interface DockingHeaderProps {
  sectionId: string;
  title: string;
  rightAction?: React.ReactNode;
  className?: string;
}

export function DockingHeader({
  sectionId,
  title,
  rightAction,
  className = "",
}: DockingHeaderProps) {
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const textRef = React.useRef<HTMLHeadingElement>(null);

  const [isLg, setIsLg] = React.useState(false);
  const [textWidth, setTextWidth] = React.useState(130);

  // Motion state
  const [motionState, setMotionState] = React.useState<{
    isDocked: boolean;
    x: number;
    y: number;
    opacity: number;
  }>({
    isDocked: false,
    x: 0,
    y: 0,
    opacity: 0.85,
  });

  // Check screen width for desktop breakpoint (>= 1024px)
  React.useEffect(() => {
    const checkWidth = () => {
      setIsLg(window.innerWidth >= 1024);
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Measure text width once mounted/resized
  React.useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth || 130);
    }
  }, [title, isLg]);

  // Scroll-driven docking kinematics
  React.useEffect(() => {
    if (!isLg) {
      setMotionState({ isDocked: false, x: 0, y: 0, opacity: 0.85 });
      return;
    }

    let rafId = 0;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        const anchor = anchorRef.current;
        if (!anchor) return;

        const anchorRect = anchor.getBoundingClientRect();
        const top = anchorRect.top;

        // Parent section bounds to handle exit transition
        const sectionEl = document.getElementById(sectionId);
        const sectionBottom = sectionEl
          ? sectionEl.getBoundingClientRect().bottom
          : 9999;

        // Kinematic thresholds (in viewport pixels)
        const dockY = 130; // Eye-level dock line (matches left-rail indicator)
        const takeoffY = 240; // Point where header begins gliding left
        const exitThreshold = 220; // Point where section starts scrolling off

        // Calculated horizontal travel distance to left rail:
        // Main container has px-6 (24px) inside max-w-4xl.
        // Left rail is right-aligned 16px outside max-w-4xl.
        // Total shift = -(textWidth + 40px).
        const maxShiftX = -(textWidth + 40);

        // Phase 1: Fully above flight zone (Resting in-flow)
        if (top > takeoffY) {
          setMotionState({
            isDocked: false,
            x: 0,
            y: 0,
            opacity: 0.85,
          });
          return;
        }

        // Phase 2: In-Flight Zone (gliding from in-flow to left rail)
        if (top > dockY && top <= takeoffY) {
          const rawProgress = (takeoffY - top) / (takeoffY - dockY);
          // Ease out cubic
          const eased = 1 - Math.pow(1 - rawProgress, 3);
          const currentX = maxShiftX * eased;
          const currentOpacity = 0.85 - eased * (0.85 - 0.35);

          setMotionState({
            isDocked: false,
            x: currentX,
            y: 0,
            opacity: currentOpacity,
          });
          return;
        }

        // Phase 3 & 4: Docked at dockY (130px) or exiting
        if (top <= dockY) {
          let exitY = 0;
          let exitOpacity = 0.35;

          // When the section is scrolling away
          if (sectionBottom < exitThreshold) {
            const exitProgress = Math.min(
              1,
              Math.max(0, (exitThreshold - sectionBottom) / 100)
            );
            exitY = -exitProgress * 22;
            exitOpacity = 0.35 * (1 - exitProgress);
          }

          setMotionState({
            isDocked: true,
            x: maxShiftX,
            y: exitY,
            opacity: exitOpacity,
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [isLg, sectionId, textWidth]);

  return (
    <div
      ref={anchorRef}
      className={`relative flex items-center justify-between pb-1 h-9 sm:h-10 w-full ${className}`}
    >
      {/* 
        The Title:
        - On mobile (< 1024px): stays normally in-flow above the card/logo
        - On desktop (>= 1024px): glides leftwards on scroll into the left rail and docks at eye-level
      */}
      <div
        className="pointer-events-none select-none flex items-center"
        style={{
          position: isLg && motionState.isDocked ? "fixed" : "relative",
          top: isLg && motionState.isDocked ? "130px" : undefined,
          left: isLg && motionState.isDocked ? "calc(50vw - 28rem + 1.5rem)" : undefined,
          transform: isLg
            ? `translate3d(${motionState.x}px, ${motionState.y}px, 0)`
            : "none",
          opacity: isLg ? motionState.opacity : 0.85,
          transition: isLg ? "none" : undefined,
          willChange: isLg ? "transform, opacity" : undefined,
          zIndex: 30,
        }}
      >
        <h2
          ref={textRef}
          className="text-2xl sm:text-3xl lg:text-[2rem] font-bold tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.18)] whitespace-nowrap"
          style={{
            fontFamily:
              "var(--font-sf-pro-rounded), 'SF Pro Rounded', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
            lineHeight: 1.05,
          }}
        >
          {title}
        </h2>
      </div>

      {/* Right-aligned action (View all → or Copy button) stays in-flow */}
      {rightAction && (
        <div className="ml-auto flex items-center z-10 pointer-events-auto">
          {rightAction}
        </div>
      )}
    </div>
  );
}
