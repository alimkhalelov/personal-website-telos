"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Play, Volume2, VolumeX } from "lucide-react";
import { useAuth } from "@/components/auth-context";

export interface AppStoreCardProps {
  title: string;
  subtitle: string;
  iconSrc: string;
  demoUrl: string;
  screenshots: (string | { src: string; caption?: string })[];
  videoSrc?: string;
  videoPoster?: string;
  isPublic?: boolean;
  className?: string;
  aspectRatio?: "9/16" | "16/9";
  slug?: string;
  priority?: boolean;
}

interface AppStoreVideoCardProps {
  src: string;
  poster?: string;
  is169: boolean;
  title: string;
}

function AppStoreVideoCard({ src, poster, is169, title }: AppStoreVideoCardProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);

  // Auto-play when visible, pause when scrolled out of view
  React.useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().then(() => {
            setIsPlaying(true);
          }).catch(() => {
            // Browser autoplay policy requires muted
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  return (
    <div
      ref={containerRef}
      onClick={togglePlay}
      className={`relative flex-none overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10 snap-start shadow-2xl group cursor-pointer select-none ${
        is169
          ? "w-[300px] sm:w-[420px] md:w-[480px] aspect-video rounded-[20px]"
          : "w-[205px] sm:w-[245px] md:w-[280px] aspect-[9/16] rounded-[24px]"
      }`}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay
        playsInline
        loop
        muted={isMuted}
        preload="metadata"
        className="w-full h-full object-cover"
        aria-label={`${title} launch video preview`}
      />

      {/* Center Play Icon when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-all">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg text-white">
            <Play className="w-6 h-6 fill-white translate-x-0.5" />
          </div>
        </div>
      )}

      {/* Bottom Controls Overlay: Preview Badge & Sound Toggle */}
      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4 flex items-center justify-between opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity pointer-events-none">
        <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/15 pointer-events-auto shadow-sm">
          Preview
        </span>
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          className="p-1.5 sm:p-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/90 hover:text-white transition-all pointer-events-auto shadow-sm"
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

function AppStoreScreenshotCard({
  src,
  alt,
  is169,
}: {
  src: string;
  alt: string;
  is169: boolean;
}) {
  return (
    <div
      className={`relative flex-none overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-black/5 dark:border-white/10 snap-start shadow-2xl transition-all ${
        is169
          ? "w-[300px] sm:w-[420px] md:w-[480px] aspect-video rounded-[20px]"
          : "w-[205px] sm:w-[245px] md:w-[280px] aspect-[9/16] rounded-[24px]"
      }`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized={true}
        loading="eager"
        decoding="async"
        sizes={
          is169
            ? "(max-width: 640px) 300px, (max-width: 1024px) 420px, 480px"
            : "(max-width: 640px) 205px, (max-width: 1024px) 245px, 280px"
        }
        className="object-cover"
      />
    </div>
  );
}

export function AppStoreProjectCard({
  title,
  subtitle,
  iconSrc,
  demoUrl,
  screenshots,
  videoSrc,
  videoPoster,
  isPublic = true,
  className = "",
  aspectRatio = "9/16",
  slug,
  priority = false,
}: AppStoreCardProps) {
  const { isAdmin } = useAuth();
  const headerRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [fadeWidth, setFadeWidth] = React.useState(80);

  // Wide disappearance window (80px on desktop, 24px on mobile)
  React.useEffect(() => {
    const updateFade = () => {
      setFadeWidth(window.innerWidth < 640 ? 24 : 80);
    };
    updateFade();
    window.addEventListener("resize", updateFade);
    return () => window.removeEventListener("resize", updateFade);
  }, []);

  // Ensure scrollLeft starts at 0 upon load/refresh
  React.useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setCanScrollLeft(e.currentTarget.scrollLeft > 4);
  };

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
        {/* App Icon (Apple Squircle rounded-[22%]) - Borderless clean luxury */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-[22%] overflow-hidden shadow-xl">
          <Image
            src={iconSrc}
            alt={`${title} App Icon`}
            fill
            className="object-cover"
            priority={priority}
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

      {/* 2. Horizontal Screenshots in 9:16 or 16:9:
          - Starts precisely at the left vertical line of the App icon (-fadeWidth margin + fadeWidth padding)
          - Extends across and out to the right edge of the screen (marginRight breakout)
          - Wide 80px disappearance window strictly ON THE LEFT of the App icon line (towards Projects)
          - Zero paint/mask in the viewing area to the right of the line; zero paint/mask on the right side
      */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="w-auto overflow-x-auto pt-2 pb-12 sm:pb-14 -mb-8 scrollbar-none snap-x snap-mandatory"
        style={{
          marginLeft: `-${fadeWidth}px`,
          marginRight: "calc(-1 * max(0px, (100vw - 100%) / 2))",
          scrollPaddingLeft: `${fadeWidth}px`,
          WebkitMaskImage: canScrollLeft
            ? `linear-gradient(to right, transparent 0px, black ${fadeWidth}px, black 100%)`
            : "none",
          maskImage: canScrollLeft
            ? `linear-gradient(to right, transparent 0px, black ${fadeWidth}px, black 100%)`
            : "none",
          transition: "mask-image 0.2s ease, -webkit-mask-image 0.2s ease",
        }}
      >
        <div 
          className="flex gap-4 sm:gap-5 min-w-max"
          style={{
            paddingLeft: `${fadeWidth}px`,
            paddingRight: "3rem",
          }}
        >
          {/* If first screenshot is an animated GIF (e.g. ocus.cc.gif), place it FIRST before the video */}
          {normalizedScreenshots.length > 0 && normalizedScreenshots[0].src.endsWith(".gif") && (
            <AppStoreScreenshotCard
              key={normalizedScreenshots[0].src}
              src={normalizedScreenshots[0].src}
              alt={`${title} live interactive preview`}
              is169={aspectRatio === "16/9"}
            />
          )}

          {/* Launch Video Preview */}
          {videoSrc && (
            <AppStoreVideoCard
              src={videoSrc}
              poster={videoPoster}
              is169={aspectRatio === "16/9"}
              title={title}
            />
          )}

          {/* Remaining screenshots (skip first if it was already rendered as lead GIF) */}
          {(normalizedScreenshots.length > 0 && normalizedScreenshots[0].src.endsWith(".gif")
            ? normalizedScreenshots.slice(1)
            : normalizedScreenshots
          ).map((s, idx) => (
            <AppStoreScreenshotCard
              key={s.src}
              src={s.src}
              alt={`${title} screenshot ${idx + 1}`}
              is169={aspectRatio === "16/9"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
