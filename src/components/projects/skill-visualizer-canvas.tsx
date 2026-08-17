"use client";

import { useId } from "react";
import { VisualizerNode } from "@/lib/projects-data";

interface SkillVisualizerCanvasProps {
  heroTitle: string;
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
  heroTitle,
  subNamespace,
  nodes,
  className = "",
}: SkillVisualizerCanvasProps) {
  const uniqueId = useId().replace(/:/g, "");
  const count = nodes.length;

  // Extract clean slug name for header e.g. "skill/flowchart-viz" or "skill/wiki"
  const cleanNamespace = subNamespace.replace(/^skill\//, "");

  // Dynamic Density Scaling Matrix (as in official skill-visualizer reference)
  let cardWidth = 310;
  let cardHeight = 265;
  let titleFontSize = 23;
  let bodyFontSize = 17.5;
  let lineDy = 28;
  const cardY = 310;
  const centerY = cardY + cardHeight / 2; // 442.5px

  if (count === 3) {
    cardWidth = 420;
    cardHeight = 280;
    titleFontSize = 26;
    bodyFontSize = 19;
    lineDy = 30;
  } else if (count === 4) {
    cardWidth = 310;
    cardHeight = 265;
    titleFontSize = 23;
    bodyFontSize = 17.5;
    lineDy = 28;
  } else if (count === 5) {
    cardWidth = 250;
    cardHeight = 255;
    titleFontSize = 20;
    bodyFontSize = 16;
    lineDy = 26;
  } else if (count >= 6) {
    cardWidth = 210;
    cardHeight = 240;
    titleFontSize = 18;
    bodyFontSize = 14.5;
    lineDy = 23;
  }

  // Calculate layout geometry (1600x900 canvas)
  const canvasWidth = 1600;
  const totalCardsWidth = count * cardWidth;
  const availableSpace = canvasWidth - totalCardsWidth;
  const gap = count > 1 ? Math.min(80, Math.max(32, availableSpace / (count + 1))) : 0;
  const startX = (canvasWidth - (totalCardsWidth + (count - 1) * gap)) / 2;

  return (
    <div
      className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#08090d] border border-white/10 shadow-2xl ${className}`}
    >
      <svg
        viewBox="0 0 1600 900"
        className="w-full h-full"
        style={{ display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Crisp Vector Arrow Markers */}
          <marker
            id={`arr-${uniqueId}`}
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
            id={`arr-green-${uniqueId}`}
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

        {/* Large Centered Title (68px) with Translucent "skill/" and White Name */}
        <text
          x="800"
          y="190"
          fontSize="68"
          fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
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
              markerEnd={isLastConnector ? `url(#arr-green-${uniqueId})` : `url(#arr-${uniqueId})`}
            />
          );
        })}

        {/* Solid Pod Flowchart Cards */}
        {nodes.map((node, i) => {
          const x = startX + i * (cardWidth + gap);
          const theme = SOLID_CARD_THEMES[i % SOLID_CARD_THEMES.length];

          return (
            <g key={node.id} transform={`translate(${x}, ${cardY})`}>
              {/* Solid Pod Container */}
              <rect
                width={cardWidth}
                height={cardHeight}
                rx="24"
                fill={theme.bg}
              />

              {/* Title Header (e.g. "01 Анализ сценария" or "01 Discovery") */}
              <text
                x="26"
                y="52"
                fill={theme.titleColor}
                fontSize={titleFontSize}
                fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
                fontWeight="800"
                letterSpacing="-0.3"
              >
                {node.step} {node.title}
              </text>

              {/* Body Text (Readable Paragraph Format) */}
              <text
                x="26"
                y="100"
                fill={theme.textColor}
                fontSize={bodyFontSize}
                fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
                fontWeight="400"
              >
                {node.description.map((line, lineIdx) => (
                  <tspan
                    key={lineIdx}
                    x="26"
                    dy={lineIdx === 0 ? 0 : lineDy}
                  >
                    {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
