"use client";

import { useId } from "react";
import { VisualizerNode } from "@/lib/projects-data";

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
  const count = nodes.length;

  // Dynamic Density Scaling Matrix (as specified in /skill-visualizer SKILL.md)
  let cardWidth = 310;
  let cardHeight = 265;
  let titleFontSize = 22;
  let bodyFontSize = 17;
  let lineDy = 26;

  if (count === 3) {
    cardWidth = 410;
    cardHeight = 280;
    titleFontSize = 26;
    bodyFontSize = 19;
    lineDy = 30;
  } else if (count === 4) {
    cardWidth = 315;
    cardHeight = 265;
    titleFontSize = 22;
    bodyFontSize = 16.5;
    lineDy = 27;
  } else if (count === 5) {
    cardWidth = 255;
    cardHeight = 255;
    titleFontSize = 20;
    bodyFontSize = 15;
    lineDy = 25;
  } else if (count >= 6) {
    cardWidth = 210;
    cardHeight = 240;
    titleFontSize = 18;
    bodyFontSize = 14;
    lineDy = 23;
  }

  // Calculate layout geometry
  const canvasWidth = 1600;
  const canvasHeight = 900;
  const totalCardsWidth = count * cardWidth;
  const totalGapWidth = canvasWidth - 160 - totalCardsWidth; // 80px margin left/right
  const gap = Math.max(28, totalGapWidth / (count - 1));
  const startX = (canvasWidth - (totalCardsWidth + (count - 1) * gap)) / 2;
  const cardY = 380; // Centered below the hero title area

  return (
    <div
      className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-[#0a0a0c] border border-white/10 shadow-2xl ${className}`}
    >
      <svg
        viewBox="0 0 1600 900"
        className="w-full h-full"
        style={{ display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Crisp Geometric Vector Arrowhead Marker */}
          <marker
            id={`arrow-${uniqueId}`}
            viewBox="0 0 10 10"
            refX="7"
            refY="5"
            markerWidth="8"
            markerHeight="8"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="rgba(255, 255, 255, 0.4)" />
          </marker>

          {nodes.map((node, i) => (
            <marker
              key={node.id}
              id={`arrow-accent-${i}-${uniqueId}`}
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="8"
              markerHeight="8"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill={node.accent} />
            </marker>
          ))}

          {/* Canvas Ambient Glow */}
          <radialGradient id={`bg-radial-${uniqueId}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#1e1830" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Glow & Matrix Dots */}
        <rect width="1600" height="900" fill="#0a0a0c" />
        <rect width="1600" height="900" fill={`url(#bg-radial-${uniqueId})`} />

        {/* Subtle 16:9 Grid Lines */}
        <g stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1">
          <line x1="100" y1="180" x2="1500" y2="180" />
          <line x1="100" y1="760" x2="1500" y2="760" />
          <line x1="100" y1="180" x2="100" y2="760" />
          <line x1="1500" y1="180" x2="1500" y2="760" />
        </g>

        {/* Hero Title Section */}
        <g textAnchor="middle">
          <text x="800" y="195" fontSize="22" fontFamily="monospace" fontWeight="600" letterSpacing="4">
            <tspan fill="rgba(255, 255, 255, 0.4)">{subNamespace.toUpperCase()} // </tspan>
            <tspan fill="#38bdf8">ARCHITECTURE MAP</tspan>
          </text>
          <text
            x="800"
            y="265"
            fontSize="54"
            fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
            fontWeight="800"
            letterSpacing="-1.5"
            fill="#ffffff"
          >
            {heroTitle}
          </text>
        </g>

        {/* Flowchart Arrow Connections */}
        {nodes.map((node, i) => {
          if (i === nodes.length - 1) return null;
          const currentX = startX + i * (cardWidth + gap);
          const nextX = startX + (i + 1) * (cardWidth + gap);
          const x1 = currentX + cardWidth;
          const x2 = nextX;
          const y = cardY + cardHeight / 2;

          return (
            <g key={`line-${i}`}>
              <line
                x1={x1 + 6}
                y1={y}
                x2={x2 - 6}
                y2={y}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="2.5"
                strokeDasharray="5 5"
                markerEnd={`url(#arrow-accent-${i}-${uniqueId})`}
              />
            </g>
          );
        })}

        {/* Flowchart Nodes */}
        {nodes.map((node, i) => {
          const x = startX + i * (cardWidth + gap);
          const y = cardY;

          return (
            <g key={node.id} className="transition-all duration-300">
              {/* Card Container */}
              <rect
                x={x}
                y={y}
                width={cardWidth}
                height={cardHeight}
                rx="16"
                fill="#121216"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="1.5"
              />

              {/* Accent Top Border Highlight */}
              <rect
                x={x}
                y={y}
                width={cardWidth}
                height="4"
                rx="2"
                fill={node.accent}
                opacity="0.85"
              />

              {/* Unified Single-Line Header (Step + Title share same font size & color) */}
              <text
                x={x + 22}
                y={y + 44}
                fill={node.accent}
                fontSize={titleFontSize}
                fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
                fontWeight="800"
                letterSpacing="-0.3"
              >
                <tspan fill="rgba(255, 255, 255, 0.45)" fontFamily="monospace" fontWeight="bold">
                  {node.step}
                </tspan>
                <tspan dx="8">{node.title}</tspan>
              </text>

              {/* Separator */}
              <line
                x1={x + 22}
                y1={y + 60}
                x2={x + cardWidth - 22}
                y2={y + 60}
                stroke="rgba(255, 255, 255, 0.06)"
                strokeWidth="1"
              />

              {/* Description Lines (Bullet-free, high density) */}
              <text
                x={x + 22}
                y={y + 92}
                fill="rgba(255, 255, 255, 0.72)"
                fontSize={bodyFontSize}
                fontFamily="'Plus Jakarta Sans', -apple-system, sans-serif"
                fontWeight="400"
              >
                {node.description.map((line, lineIndex) => (
                  <tspan
                    key={lineIndex}
                    x={x + 22}
                    dy={lineIndex === 0 ? 0 : lineDy}
                  >
                    • {line}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}

        {/* Bottom Specs Decal */}
        <g textAnchor="middle">
          <text x="800" y="730" fill="rgba(255, 255, 255, 0.35)" fontSize="13" fontFamily="monospace" letterSpacing="3">
            STATIC 16:9 VECTOR CANVAS • VIEWBOX 0 0 1600 900 • ZERO VOID SPACE
          </text>
        </g>
      </svg>
    </div>
  );
}
