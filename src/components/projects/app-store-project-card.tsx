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
  const [leftOffset, setLeftOffset] = React.useState<number | null>(null);

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

      {/* 2. Full-bleed edge-to-edge Horizontal Screenshots in 9:16:
          - Starts at exact left pixel line of Projects & Tempo icon
          - Flows smoothly to the right edge of the screen
          - No shadow on cards so overflow-x-auto will never clip a shadow line
      */}
      <div className="relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] overflow-x-auto py-2 scrollbar-none snap-x snap-mandatory">
        <div 
          className="flex gap-4 sm:gap-5 min-w-max"
          style={{
            paddingLeft: leftOffset !== null ? `${leftOffset}px` : "1.5rem",
            paddingRight: "2.5rem",
          }}
        >
          {normalizedScreenshots.map((s, idx) => (
            <div
              key={s.src}
              className="relative flex-none w-[210px] sm:w-[250px] md:w-[285px] aspect-[9/16] rounded-[24px] overflow-hidden border border-white/15 bg-neutral-950 snap-start"
            >
              <Image
                src={s.src}
                alt={`${title} screenshot ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 210px, (max-width: 1024px) 250px, 285px"
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
