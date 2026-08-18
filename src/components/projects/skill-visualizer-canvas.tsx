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

  // Extract clean slug name for header e.g. "skill/wiki"
  const cleanNamespace = subNamespace.replace(/^skill\//, "");

  // Dynamic Density Scaling Matrix (1600x900 coordinate system)
  let cardWidth = 320;
  let cardHeight = 320;
  let gap = 50;

  if (count === 3) {
    cardWidth = 430;
    cardHeight = 330;
    gap = 65;
  } else if (count === 4) {
    cardWidth = 320;
    cardHeight = 320;
    gap = 50;
  } else if (count === 5) {
    cardWidth = 265;
    cardHeight = 310;
    gap = 35;
  } else if (count >= 6) {
    cardWidth = 220;
    cardHeight = 300;
    gap = 25;
  }

  const canvasWidth = 1600;
  const totalCardsWidth = count * cardWidth + (count - 1) * gap;
  const startX = (canvasWidth - totalCardsWidth) / 2;
  const cardY = 300;
  const centerY = cardY + cardHeight / 2;

  const renderSvgContent = (isModal = false) => (
    <svg
      viewBox="0 0 1600 900"
      className="w-full h-full select-none"
      style={{ display: "block" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Crisp Vector Arrow Markers */}
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

      {/* Subtle Dot Matrix Grid */}
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
        y="170"
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
        y="225"
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
            strokeWidth="3.5"
            fill="none"
            markerEnd={
              isLastConnector
                ? `url(#arr-accent-${uniqueId}${isModal ? "-m" : ""})`
                : `url(#arr-${uniqueId}${isModal ? "-m" : ""})`
            }
          />
        );
      })}

      {/* HTML / ForeignObject Flowchart Pod Cards for Flawless Text Wrapping */}
      {nodes.map((node, i) => {
        const x = startX + i * (cardWidth + gap);
        const isLast = i === count - 1;

        return (
          <foreignObject
            key={node.id}
            x={x}
            y={cardY}
            width={cardWidth}
            height={cardHeight}
          >
            <div
              className={`w-full h-full p-6 rounded-2xl bg-[#18181b] border flex flex-col justify-start gap-3 shadow-xl transition-colors ${
                isLast
                  ? "border-blue-500/80 shadow-blue-500/10"
                  : "border-zinc-800 hover:border-zinc-700"
              }`}
              style={{
                fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
                boxSizing: "border-box",
              }}
            >
              {/* Step Tag */}
              <div className="flex items-center justify-between">
                <span
                  className="font-mono font-bold text-xs uppercase tracking-wider text-blue-400"
                  style={{ fontSize: "14px" }}
                >
                  PHASE {node.step}
                </span>
                {isLast && (
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                    title="Active / Terminal State"
                  />
                )}
              </div>

              {/* Title Header (Wrapped safely) */}
              <h3
                className="font-bold text-zinc-100 tracking-tight leading-snug break-words"
                style={{ fontSize: count >= 5 ? "19px" : "22px" }}
              >
                {node.title}
              </h3>

              {/* Divider Line */}
              <div className="w-full h-px bg-zinc-800" />

              {/* Description List with Auto-wrapping */}
              <ul className="flex flex-col gap-2 overflow-hidden">
                {node.description.map((line, lineIdx) => (
                  <li
                    key={lineIdx}
                    className="flex items-start gap-2 text-zinc-300 font-light leading-snug break-words"
                    style={{ fontSize: count >= 5 ? "15px" : "16.5px" }}
                  >
                    <span className="text-blue-400 font-bold shrink-0 mt-0.5">•</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </foreignObject>
        );
      })}
    </svg>
  );

  return (
    <>
      {/* 1. Standard 16:9 Canvas View with Fullscreen Button */}
      <div
        className={`group relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#09090b] border border-border/80 shadow-md ${className}`}
      >
        {renderSvgContent(false)}

        {/* Expand / Fullscreen Button Overlay */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          title="Expand Architecture Diagram to Fullscreen"
          aria-label="Expand Architecture Diagram to Fullscreen"
          className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black/90 text-white/80 hover:text-white border border-white/15 hover:border-white/40 backdrop-blur-md transition-all text-xs font-mono cursor-pointer shadow-sm"
        >
          <Maximize2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Fullscreen</span>
        </button>
      </div>

      {/* 2. Responsive Mobile Card Strip (Ensures readable text on narrow phones) */}
      <div className="sm:hidden flex flex-col gap-3 pt-2">
        {nodes.map((node) => (
          <div
            key={`mobile-${node.id}`}
            className="p-4 rounded-xl bg-card border border-border/80 flex flex-col gap-2 shadow-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-accent">PHASE {node.step}</span>
              <span className="text-xs font-mono text-muted-foreground">·</span>
              <h4 className="text-sm font-bold text-foreground">{node.title}</h4>
            </div>
            <ul className="space-y-1 text-xs text-muted-foreground leading-relaxed">
              {node.description.map((line, lIdx) => (
                <li key={lIdx} className="flex items-start gap-1.5">
                  <span className="text-accent">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 3. Fullscreen Modal View (No heavy background podlozhka, transparent blurred backdrop) */}
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
