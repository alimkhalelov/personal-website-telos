"use client";

import { useId, useState, useEffect, useRef } from "react";
import { Maximize2, X } from "lucide-react";
import type { VisualizerNode } from "@/lib/projects-data";

interface SkillVisualizerCanvasProps {
  heroTitle: string;
  subNamespace: string;
  nodes: VisualizerNode[];
  className?: string;
}

export function SkillVisualizerCanvas({
  heroTitle,
  subNamespace,
  nodes,
  className = "",
}: SkillVisualizerCanvasProps) {
  const uniqueId = useId().replace(/:/g, "");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const count = nodes.length;

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  // Extract clean slug name for header e.g. "skill/flowchart-viz" or "skill/wiki"
  const cleanNamespace = subNamespace.replace(/^skill\//, "");

  // Dynamic Density Scaling Matrix
  let cardWidth = 310;
  let cardHeight = 275;
  let titleFontSize = 22;
  let bodyFontSize = 16.5;
  let lineDy = 26;
  const cardY = 310;
  const centerY = cardY + cardHeight / 2;

  if (count === 3) {
    cardWidth = 420;
    cardHeight = 290;
    titleFontSize = 25;
    bodyFontSize = 18;
    lineDy = 28;
  } else if (count === 4) {
    cardWidth = 310;
    cardHeight = 275;
    titleFontSize = 22;
    bodyFontSize = 16.5;
    lineDy = 26;
  } else if (count === 5) {
    cardWidth = 255;
    cardHeight = 265;
    titleFontSize = 19;
    bodyFontSize = 15;
    lineDy = 24;
  } else if (count >= 6) {
    cardWidth = 215;
    cardHeight = 250;
    titleFontSize = 17;
    bodyFontSize = 14;
    lineDy = 22;
  }

  // Calculate layout geometry (1600x900 canvas)
  const canvasWidth = 1600;
  const totalCardsWidth = count * cardWidth;
  const availableSpace = canvasWidth - totalCardsWidth;
  const gap = count > 1 ? Math.min(70, Math.max(28, availableSpace / (count + 1))) : 0;
  const startX = (canvasWidth - (totalCardsWidth + (count - 1) * gap)) / 2;

  const renderSvgContent = (isModal = false) => (
    <svg
      viewBox="0 0 1600 900"
      className="w-full h-full select-none"
      style={{ display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Vector Arrow Markers */}
        <marker
          id={`arr-${uniqueId}${isModal ? "-m" : ""}`}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#52525b" />
        </marker>
        <marker
          id={`arr-accent-${uniqueId}${isModal ? "-m" : ""}`}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#3b82f6" />
        </marker>
      </defs>

      {/* 16:9 Canvas Background - Deep Monochromatic Dark */}
      <rect width="1600" height="900" fill="#09090b" />

      {/* Subtle Dot Grid Background */}
      <g opacity="0.12">
        {Array.from({ length: 16 }).map((_, r) =>
          Array.from({ length: 28 }).map((_, c) => (
            <circle
              key={`dot-${r}-${c}`}
              cx={40 + c * 56}
              cy={30 + r * 56}
              r="1.5"
              fill="#ffffff"
            />
          ))
        )}
      </g>

      {/* Large Centered Title with Monochromatic + Brand Blue Namespace */}
      <text
        x="800"
        y="180"
        fontSize="64"
        fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
        fontWeight="700"
        textAnchor="middle"
        letterSpacing="-1"
      >
        <tspan fill="#3b82f6" opacity="0.9">skill/</tspan>
        <tspan fill="#f4f4f5">{cleanNamespace}</tspan>
      </text>

      {/* Subtitle / Category Hook */}
      <text
        x="800"
        y="230"
        fontSize="20"
        fontFamily="var(--font-mono), monospace"
        fontWeight="500"
        textAnchor="middle"
        fill="#71717a"
        letterSpacing="0.5"
      >
        {heroTitle.toUpperCase()}
      </text>

      {/* Connecting Vector Arrows */}
      {nodes.map((_, i) => {
        if (i === count - 1) return null;
        const currentX = startX + i * (cardWidth + gap);
        const nextX = startX + (i + 1) * (cardWidth + gap);
        const x1 = currentX + cardWidth;
        const x2 = nextX;
        const isLastConnector = i === count - 2;

        return (
          <path
            key={`connector-${i}`}
            d={`M ${x1} ${centerY} L ${x2} ${centerY}`}
            stroke={isLastConnector ? "#3b82f6" : "#3f3f46"}
            strokeWidth="3"
            fill="none"
            markerEnd={
              isLastConnector
                ? `url(#arr-accent-${uniqueId}${isModal ? "-m" : ""})`
                : `url(#arr-${uniqueId}${isModal ? "-m" : ""})`
            }
          />
        );
      })}

      {/* Monochromatic Flowchart Pod Cards */}
      {nodes.map((node, i) => {
        const x = startX + i * (cardWidth + gap);
        const isLead = i === 0;
        const isLast = i === count - 1;

        return (
          <g key={node.id} transform={`translate(${x}, ${cardY})`}>
            {/* Solid Card Container */}
            <rect
              width={cardWidth}
              height={cardHeight}
              rx="20"
              fill="#18181b"
              stroke={isLast ? "#3b82f6" : isLead ? "#27272a" : "#27272a"}
              strokeWidth={isLast ? "2" : "1"}
            />

            {/* Step Number Tag (Mono) */}
            <text
              x="24"
              y="44"
              fill={isLast ? "#60a5fa" : "#3b82f6"}
              fontSize="14"
              fontFamily="var(--font-mono), monospace"
              fontWeight="700"
              letterSpacing="0.5"
            >
              PHASE {node.step}
            </text>

            {/* Title Header */}
            <text
              x="24"
              y="74"
              fill="#fafafa"
              fontSize={titleFontSize}
              fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
              fontWeight="700"
              letterSpacing="-0.2"
            >
              {node.title}
            </text>

            {/* Subtle Divider Line */}
            <line
              x1="24"
              y1="94"
              x2={cardWidth - 24}
              y2="94"
              stroke="#27272a"
              strokeWidth="1"
            />

            {/* Body Lines */}
            <text
              x="24"
              y="126"
              fill="#a1a1aa"
              fontSize={bodyFontSize}
              fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
              fontWeight="400"
            >
              {node.description.map((line, lineIdx) => (
                <tspan
                  key={lineIdx}
                  x="24"
                  dy={lineIdx === 0 ? 0 : lineDy}
                >
                  • {line}
                </tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );

  return (
    <>
      {/* Standard In-Page 16:9 Canvas View */}
      <div
        className={`group relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#09090b] border border-border/80 shadow-md ${className}`}
      >
        {renderSvgContent(false)}

        {/* Expand / Fullscreen Button Overlay */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          title="Expand to Fullscreen"
          aria-label="Expand Architecture Diagram to Fullscreen"
          className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md transition-all text-xs font-mono cursor-pointer"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fullscreen</span>
        </button>
      </div>

      {/* Fullscreen Modal View (No heavy background podlozhka, transparent blurred backdrop) */}
      {isFullscreen && (
        <div
          ref={backdropRef}
          onClick={(e) => {
            if (e.target === backdropRef.current) {
              setIsFullscreen(false);
            }
          }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Architecture Diagram Fullscreen Modal"
        >
          {/* Close Button on Top-Right */}
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            title="Close Fullscreen (Esc)"
            aria-label="Close Fullscreen Modal"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Clean 16:9 SVG Canvas */}
          <div className="relative w-full max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#09090b]">
            {renderSvgContent(true)}
          </div>
        </div>
      )}
    </>
  );
}
