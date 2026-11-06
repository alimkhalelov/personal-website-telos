"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useAuth } from "@/components/auth-context";

export interface AppStoreCardProps {
  title: string;
  subtitle: string;
  iconSrc: string;
  demoUrl: string;
  screenshots: (string | { src: string; caption?: string })[];
  isPublic?: boolean;
  className?: string;
}

export function AppStoreProjectCard({
  title,
  subtitle,
  iconSrc,
  demoUrl,
  screenshots,
  isPublic = true,
  className = "",
}: AppStoreCardProps) {
  const { isAdmin } = useAuth();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [leftOffset, setLeftOffset] = React.useState<number | null>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setCanScrollLeft(e.currentTarget.scrollLeft > 6);
  };

  // Measure exact pixel offset of the header so screenshots align with "Projects" & Tempo icon
  React.useEffect(() => {
    const updateOffset = () => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setLeftOffset(rect.left);
      }
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);
    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // If not public and user is not admin, do not render
  if (!isPublic && !isAdmin) {
    return null;
  }

  const isDimmed = !isPublic && isAdmin;

  const normalizedScreenshots = screenshots.map((s) =>
    typeof s === "string" ? { src: s } : s
  );

  return (
    <div
      className={`relative w-full flex flex-col gap-6 transition-all ${
        isDimmed ? "opacity-40 hover:opacity-85" : ""
      } ${className}`}
    >
      {/* Admin Private Banner if applicable */}
      {isDimmed && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono self-start">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Private Project — Visible to Admin Only</span>
        </div>
      )}

      {/* 1. Header: Icon in squircle + Title & Subtitle */}
      <div ref={headerRef} className="flex items-center gap-4 sm:gap-5 min-w-0">
        {/* App Icon (Apple Squircle rounded-[22%]) */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[22%] overflow-hidden border border-white/20 shadow-md">
          <Image
            src={iconSrc}
            alt={`${title} App Icon`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Title & Subtitle block (Clean Title Case, no all-caps, no delimiters) */}
        <div className="flex flex-col min-w-0 gap-1">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-sky-400 transition-colors !no-underline inline-flex items-center gap-1.5"
            style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
          >
            <span>{title}</span>
            <ArrowUpRight className="w-5 h-5 text-white/50" />
          </a>

          {/* Subtitle - Clean sentence/title case */}
          <p className="text-sm sm:text-base text-neutral-300 font-normal leading-snug">
            {subtitle}
          </p>
        </div>
      </div>

      {/* 2. Horizontal Screenshots in 9:16:
          - Full viewport width breakout (left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw])
          - Starts precisely at the left vertical line of the Tempo icon via paddingLeft: leftOffset
          - Cards scroll freely to the left PAST "Projects" into the left margin (no hard wall at Tempo icon)
          - Zero paint/mask on cards in the viewport; zero paint on the right side
          - Soft fade only at the extreme left edge of the screen (0px to 64px) when scrolled past Projects
      */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] overflow-x-auto py-2 scrollbar-none snap-x snap-mandatory"
        style={{
          WebkitMaskImage: canScrollLeft
            ? "linear-gradient(to right, transparent 0px, black 64px, black 100%)"
            : "none",
          maskImage: canScrollLeft
            ? "linear-gradient(to right, transparent 0px, black 64px, black 100%)"
            : "none",
          transition: "mask-image 0.25s ease, -webkit-mask-image 0.25s ease",
        }}
      >
        <div 
          className="flex gap-4 sm:gap-5 min-w-max"
          style={{
            paddingLeft: leftOffset !== null ? `${leftOffset}px` : "max(1.5rem, calc((100vw - 56rem) / 2 + 1.5rem))",
            paddingRight: "max(2rem, calc((100vw - 56rem) / 2))",
          }}
        >
          {normalizedScreenshots.map((s, idx) => (
            <div
              key={s.src}
              className="relative flex-none w-[205px] sm:w-[245px] md:w-[280px] aspect-[9/16] rounded-[24px] overflow-hidden border border-white/15 bg-neutral-950 snap-start"
            >
              <Image
                src={s.src}
                alt={`${title} screenshot ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 205px, (max-width: 1024px) 245px, 280px"
                className="object-cover"
                priority={idx < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
