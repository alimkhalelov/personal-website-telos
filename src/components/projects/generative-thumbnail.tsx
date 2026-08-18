"use client";

import Image from "next/image";

interface GenerativeThumbnailProps {
  theme: "neon-cyan" | "lime-cyber" | "purple-matrix" | "amber-brutalism" | "prism-spectrum" | "emerald-terminal";
  title?: string;
  command?: string;
  className?: string;
  interactive?: boolean;
}

const THUMBNAIL_IMAGES: Record<GenerativeThumbnailProps["theme"], { src: string; alt: string }> = {
  "neon-cyan": {
    src: "/thumbnails/wiki.jpg",
    alt: "AI-Wiki Knowledge Compiler Thumbnail",
  },
  "lime-cyber": {
    src: "/thumbnails/presentation.jpg",
    alt: "HTML Presentation & Motion Studio Thumbnail",
  },
  "purple-matrix": {
    src: "/thumbnails/skill-visualizer.jpg",
    alt: "16:9 Vector Flowchart & Architecture Engine Thumbnail",
  },
  "amber-brutalism": {
    src: "/thumbnails/styleref.jpg",
    alt: "AI Art Styles & Prompt Matrix Gallery Thumbnail",
  },
  "prism-spectrum": {
    src: "/thumbnails/design-md-generator.jpg",
    alt: "DESIGN.md Design Systems Token Generator Thumbnail",
  },
  "emerald-terminal": {
    src: "/thumbnails/end.jpg",
    alt: "Agent Session Ritual & Memory Persistence Protocol Thumbnail",
  },
};

export function GenerativeThumbnail({
  theme,
  title,
  className = "w-full h-full",
}: GenerativeThumbnailProps) {
  const thumbnail = THUMBNAIL_IMAGES[theme] || THUMBNAIL_IMAGES["neon-cyan"];

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0a0d12] select-none group ${className}`}>
      {/* 1. High-Impact YouTube Thumbnail Image with Smooth Cinematic Hover */}
      <Image
        src={thumbnail.src}
        alt={title || thumbnail.alt}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        priority
      />

      {/* 2. Subtle Dark Vignette Border */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
    </div>
  );
}
