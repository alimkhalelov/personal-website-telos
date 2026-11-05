"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { useAuth } from "@/components/auth-context";

export interface AppStoreCardProps {
  title: string;
  subtitle: string;
  category?: string;
  badges?: string[];
  iconSrc: string;
  demoUrl: string;
  detailUrl?: string;
  screenshots: {
    src: string;
    caption: string;
  }[];
  isPublic?: boolean;
  className?: string;
}

export function AppStoreProjectCard({
  title,
  subtitle,
  category = "Health & Fitness",
  badges = ["Interval Running", "Zero Dependencies", "60 FPS Kinematics"],
  iconSrc,
  demoUrl,
  detailUrl = "/projects/tempo",
  screenshots,
  isPublic = true,
  className = "",
}: AppStoreCardProps) {
  const { isAdmin } = useAuth();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState<number | null>(null);

  // If not public and user is not admin, do not render
  if (!isPublic && !isAdmin) {
    return null;
  }

  const isDimmed = !isPublic && isAdmin;

  return (
    <div
      className={`relative w-full rounded-3xl bg-neutral-900/60 dark:bg-black/40 border border-white/10 dark:border-white/15 p-5 sm:p-7 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all ${
        isDimmed ? "opacity-40 hover:opacity-85 border-dashed border-amber-500/30" : ""
      } ${className}`}
    >
      {/* Admin Private Banner if applicable */}
      {isDimmed && (
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Private Project — Visible to Admin Only</span>
        </div>
      )}

      {/* 1. App Store Desktop Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-white/10">
        <div className="flex items-start sm:items-center gap-4 sm:gap-5 min-w-0">
          {/* App Icon (Apple Squircle rounded-[22%]) */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[22%] overflow-hidden bg-neutral-950 border border-white/15 shadow-lg group">
            <Image
              src={iconSrc}
              alt={`${title} App Icon`}
              fill
              className="object-cover p-1 transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Title & Subtitle block (Clean Title Case, no all-caps, no delimiters) */}
          <div className="flex flex-col min-w-0 gap-1">
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-white hover:text-sky-400 transition-colors !no-underline flex items-center gap-1.5"
                style={{ fontFamily: "'Google Sans', system-ui, sans-serif" }}
              >
                <span>{title}</span>
                <ArrowUpRight className="w-5 h-5 text-white/50 group-hover:text-sky-400" />
              </a>
            </div>

            {/* Subtitle - Clean sentence/title case */}
            <p className="text-sm sm:text-base text-neutral-300 font-normal leading-snug">
              {subtitle}
            </p>

            {/* Metadata / Category row */}
            <div className="flex items-center gap-2 pt-0.5 text-xs text-neutral-400 flex-wrap">
              <span className="font-medium text-neutral-200">{category}</span>
              {badges.map((b, i) => (
                <React.Fragment key={b}>
                  <span className="text-neutral-500">·</span>
                  <span className="text-neutral-400">{b}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button: App Store Pill Button ("GET" / "OPEN") */}
        <div className="flex items-center gap-3 self-start sm:self-center shrink-0 pt-1 sm:pt-0">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-sky-400 hover:text-sky-300 font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md border border-white/15 transition-all !no-underline shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get</span>
            <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
          </a>

          {detailUrl && (
            <Link
              href={detailUrl}
              className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 active:scale-95 text-white/70 hover:text-white text-xs sm:text-sm font-medium transition-all !no-underline border border-white/10 cursor-pointer"
            >
              Specs &amp; SDD →
            </Link>
          )}
        </div>
      </div>

      {/* 2. Horizontal Screenshots Gallery (App Store squircle curvature rounded-[20px]) */}
      <div className="pt-6 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
          <span className="uppercase font-mono tracking-wider text-[11px] text-white/50">Screenshots &amp; Telemetry HUD</span>
          <span className="text-neutral-500">Scroll horizontally · Click to zoom</span>
        </div>

        <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x snap-mandatory">
          {screenshots.map((s, idx) => (
            <button
              type="button"
              key={s.src}
              onClick={() => setSelectedImageIndex(idx)}
              className="group relative flex-none w-[280px] sm:w-[360px] md:w-[410px] aspect-[16/10] rounded-[20px] overflow-hidden border border-white/15 bg-neutral-950 shadow-md snap-start transition-all duration-200 hover:scale-[1.02] hover:border-white/30 cursor-pointer text-left focus:outline-none"
            >
              <Image
                src={s.src}
                alt={s.caption || `${title} screenshot ${idx + 1}`}
                fill
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 410px"
                className="object-cover transition-transform duration-300 group-hover:scale-102"
              />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-between text-xs text-white/90">
                <span className="font-medium truncate max-w-[85%]">{s.caption}</span>
                <Eye className="w-3.5 h-3.5 text-white/60 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox / Zoom Dialog */}
      {selectedImageIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setSelectedImageIndex(null)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between text-white/80 px-2">
              <span className="text-sm font-medium">
                {screenshots[selectedImageIndex].caption} ({selectedImageIndex + 1}/{screenshots.length})
              </span>
              <button
                type="button"
                onClick={() => setSelectedImageIndex(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Canvas */}
            <div className="relative w-full aspect-[16/10] max-h-[75vh] rounded-[24px] overflow-hidden border border-white/20 shadow-2xl bg-black">
              <Image
                src={screenshots[selectedImageIndex].src}
                alt={screenshots[selectedImageIndex].caption}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => setSelectedImageIndex((prev) => (prev! > 0 ? prev! - 1 : screenshots.length - 1))}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-white/50">
                {selectedImageIndex + 1} of {screenshots.length}
              </span>
              <button
                type="button"
                onClick={() => setSelectedImageIndex((prev) => (prev! < screenshots.length - 1 ? prev! + 1 : 0))}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
