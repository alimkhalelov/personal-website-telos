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

      {/* 1. Header: Icon in squircle + Title & Subtitle without divider or action buttons */}
      <div className="flex items-center gap-4 sm:gap-5 min-w-0">
        {/* App Icon (Apple Squircle rounded-[22%]) */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[22%] overflow-hidden border border-white/20 shadow-lg">
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

      {/* 2. Horizontal Screenshots Gallery in 9:16 (Squircle rounded-[20px], no zoom, no captions) */}
      <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory">
        {normalizedScreenshots.map((s, idx) => (
          <div
            key={s.src}
            className="relative flex-none w-[200px] sm:w-[240px] md:w-[270px] aspect-[9/16] rounded-[20px] overflow-hidden border border-white/15 bg-neutral-950 shadow-md snap-start"
          >
            <Image
              src={s.src}
              alt={`${title} screenshot ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 240px, 270px"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
