"use client";

import { useId, useState, useEffect, useRef } from "react";
import { Maximize2, X } from "lucide-react";
import type { VisualizerNode } from "@/lib/projects-data";

interface SkillVisualizerCanvasProps {
  heroTitle?: string;
  subNamespace: string;
  nodes: VisualizerNode[];
  className?: string;
}

const SOLID_CARD_THEMES = [
  { bg: "#131d2e", titleColor: "#38bdf8", textColor: "#cbd5e1" }, // Cyan
  { bg: "#201533", titleColor: "#c084fc", textColor: "#cbd5e1" }, // Purple
  { bg: "#2a1d0d", titleColor: "#fbbf24", textColor: "#fde68a" }, // Amber
  { bg: "#0d2b1d", titleColor: "#34d399", textColor: "#a7f3d0" }, // Emerald
  { bg: "#1e1329", titleColor: "#f43f5e", textColor: "#fecdd3" }, // Rose
  { bg: "#101e2b", titleColor: "#38bdf8", textColor: "#bae6fd" }, // Blue
];

export function SkillVisualizerCanvas({
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

  // Extract clean slug name for header e.g. "wiki" from "skill/wiki"
  const cleanNamespace = subNamespace.replace(/^skill\//, "");

  // Dynamic Density Scaling Matrix (as specified in skill-visualizer standard)
  let cardWidth = 310;
  let cardHeight = 265;
  let titleFontSize = 23;
  let bodyFontSize = 17.5;
  let gap = 45;

  if (count === 3) {
    cardWidth = 420;
    cardHeight = 280;
    titleFontSize = 26;
    bodyFontSize = 19;
    gap = 60;
  } else if (count === 4) {
    cardWidth = 310;
    cardHeight = 265;
    titleFontSize = 23;
    bodyFontSize = 17.5;
    gap = 45;
  } else if (count === 5) {
    cardWidth = 250;
    cardHeight = 255;
    titleFontSize = 20;
    bodyFontSize = 16;
    gap = 35;
  } else if (count >= 6) {
    cardWidth = 210;
    cardHeight = 240;
    titleFontSize = 18;
    bodyFontSize = 14.5;
    gap = 25;
  }

  const canvasWidth = 1600;
  const totalCardsWidth = count * cardWidth + (count - 1) * gap;
  const startX = (canvasWidth - totalCardsWidth) / 2;
  const cardY = 310;
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
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
        </marker>
        <marker
          id={`arr-green-${uniqueId}${isModal ? "-m" : ""}`}
          viewBox="0 0 10 10"
          refX="7"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto"
        >
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
        </marker>
      </defs>

      {/* 16:9 Canvas Background */}
      <rect width="1600" height="900" fill="#08090d" />

      {/* Large Centered Hero Title (68px) with Translucent "skill/" and White Name */}
      <text
        x="800"
        y="190"
        fontSize="68"
        fontFamily="var(--font-sans), system-ui, -apple-system, sans-serif"
        fontWeight="800"
        textAnchor="middle"
        letterSpacing="-1.5"
      >
        <tspan fill="rgba(255, 255, 255, 0.35)">skill/</tspan>
        <tspan fill="#ffffff">{cleanNamespace}</tspan>
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
            stroke={isLastConnector ? "#10b981" : "#475569"}
            strokeWidth="3.5"
            fill="none"
            markerEnd={
              isLastConnector
                ? `url(#arr-green-${uniqueId}${isModal ? "-m" : ""})`
                : `url(#arr-${uniqueId}${isModal ? "-m" : ""})`
            }
          />
        );
      })}

      {/* Solid Pod Flowchart Cards (Zero Borders, Zero Dividers, No "Phase" Word) */}
      {nodes.map((node, i) => {
        const x = startX + i * (cardWidth + gap);
        const theme = SOLID_CARD_THEMES[i % SOLID_CARD_THEMES.length];

        return (
          <foreignObject
            key={node.id}
            x={x}
            y={cardY}
            width={cardWidth}
            height={cardHeight}
          >
            <div
              className="w-full h-full flex flex-col justify-start gap-3 select-none"
              style={{
                backgroundColor: theme.bg,
                borderRadius: "24px",
                padding: "24px 26px",
                border: "none",
                outline: "none",
                boxSizing: "border-box",
                fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
              }}
            >
              {/* Single-line Header: Step number + Title (No "Phase" word) */}
              <h3
                className="font-extrabold tracking-tight leading-snug break-words"
                style={{
                  color: theme.titleColor,
                  fontSize: `${titleFontSize}px`,
                  margin: 0,
                  padding: 0,
                }}
              >
                {node.step} {node.title}
              </h3>

              {/* Body Text (Readable Paragraph / Bullet List) */}
              <ul
                className="flex flex-col gap-2 overflow-hidden list-none p-0 m-0"
                style={{
                  color: theme.textColor,
                  fontSize: `${bodyFontSize}px`,
                  fontWeight: 400,
                  lineHeight: "1.35",
                }}
              >
                {node.description.map((line, lineIdx) => (
                  <li key={lineIdx} className="break-words">
                    • {line}
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
      {/* 1. In-Page 16:9 Canvas with Fullscreen Button */}
      <div
        className={`group relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#08090d] border border-white/10 shadow-xl ${className}`}
      >
        {renderSvgContent(false)}

        {/* Fullscreen Button Overlay */}
        <button
          type="button"
          onClick={() => setIsFullscreen(true)}
          title="Expand to Fullscreen"
          aria-label="Expand Diagram to Fullscreen"
          className="absolute top-3.5 right-3.5 z-10 p-2 rounded-lg bg-black/40 hover:bg-black/80 text-white/70 hover:text-white border border-white/10 backdrop-blur-md transition-all cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Fullscreen Modal View (No heavy background podlozhka, transparent blurred backdrop) */}
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
          aria-label="Skill Visualizer Fullscreen Modal"
        >
          {/* Close Button on Top-Right */}
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            title="Close (Esc)"
            aria-label="Close Fullscreen"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md transition-all cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Clean 16:9 SVG Canvas */}
          <div className="relative w-full max-w-6xl aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-white/15 bg-[#08090d]">
            {renderSvgContent(true)}
          </div>
        </div>
      )}
    </>
  );
}
