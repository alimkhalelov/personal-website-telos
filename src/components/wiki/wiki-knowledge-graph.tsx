"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { KnowledgeGraphData } from "@/lib/wiki";
import { ZoomIn, ZoomOut, RotateCcw, Share2, Sparkles } from "lucide-react";

interface KnowledgeGraphProps {
  data: KnowledgeGraphData;
}

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; fill: string }> = {
  "Methodologies": { bg: "rgba(59, 130, 246, 0.15)", border: "#3B82F6", text: "#60A5FA", fill: "#3B82F6" },
  "AI & Engineering": { bg: "rgba(168, 85, 247, 0.15)", border: "#A855F7", text: "#C084FC", fill: "#A855F7" },
  "Entities & Lab": { bg: "rgba(16, 185, 129, 0.15)", border: "#10B981", text: "#34D399", fill: "#10B981" },
  "Systems & Invariants": { bg: "rgba(245, 158, 11, 0.15)", border: "#F59E0B", text: "#FBBF24", fill: "#F59E0B" },
  "Author": { bg: "rgba(236, 72, 153, 0.2)", border: "#EC4899", text: "#F472B6", fill: "#EC4899" },
  "Articles": { bg: "rgba(148, 163, 184, 0.15)", border: "#64748B", text: "#94A3B8", fill: "#64748B" },
};

export function WikiKnowledgeGraph({ data }: KnowledgeGraphProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Calculate layout coordinates for nodes in a radial/cluster layout
  const layout = useMemo(() => {
    const width = 800;
    const height = 480;
    const centerX = width / 2;
    const centerY = height / 2;

    const nodePositions: Record<string, { x: number; y: number; radius: number }> = {};

    // Center node (HQ)
    const hqNode = data.nodes.find((n) => n.id === "alim-khalelov-hq");
    if (hqNode) {
      nodePositions[hqNode.id] = { x: centerX, y: centerY, radius: 26 };
    }

    // Wiki nodes arranged in an inner orbital ring
    const wikiNodes = data.nodes.filter((n) => n.type === "wiki");
    const wikiCount = wikiNodes.length;
    wikiNodes.forEach((node, idx) => {
      const angle = (idx / wikiCount) * 2 * Math.PI - Math.PI / 2;
      const distance = 145;
      nodePositions[node.id] = {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        radius: 18,
      };
    });

    // Blog nodes in an outer orbital ring
    const blogNodes = data.nodes.filter((n) => n.type === "blog");
    const blogCount = blogNodes.length;
    blogNodes.forEach((node, idx) => {
      const angle = (idx / (blogCount || 1)) * 2 * Math.PI;
      const distance = 215;
      nodePositions[node.id] = {
        x: centerX + Math.cos(angle) * distance,
        y: centerY + Math.sin(angle) * distance,
        radius: 12,
      };
    });

    return { width, height, nodePositions };
  }, [data]);

  // Connected edges and neighbor highlight
  const connectedNodeIds = useMemo(() => {
    if (!hoveredNodeId) return new Set<string>();
    const set = new Set<string>([hoveredNodeId]);
    data.edges.forEach((edge) => {
      if (edge.source === hoveredNodeId) set.add(edge.target);
      if (edge.target === hoveredNodeId) set.add(edge.source);
    });
    return set;
  }, [hoveredNodeId, data.edges]);

  const categories = useMemo(() => {
    const cats = new Set<string>(["All"]);
    data.nodes.forEach((n) => cats.add(n.category));
    return Array.from(cats);
  }, [data.nodes]);

  const filteredNodes = useMemo(() => {
    if (activeCategory === "All") return data.nodes;
    return data.nodes.filter((n) => n.category === activeCategory || n.id === "alim-khalelov-hq");
  }, [data.nodes, activeCategory]);

  return (
    <div className="w-full flex flex-col gap-3 rounded-2xl border border-border/70 bg-card/30 backdrop-blur-md p-4 sm:p-6 relative overflow-hidden">
      {/* Top Bar / Graph Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
            <Share2 className="w-4 h-4 text-accent" />
          </div>
          <div>
            <h3 className="text-base font-bold tracking-tight">Interactive Knowledge Constellation</h3>
            <p className="text-xs text-muted-foreground">Deterministic AST AST-relations between methodologies, systems & blogs</p>
          </div>
        </div>

        {/* Zoom and Recenter Toolbar */}
        <div className="flex items-center gap-1.5 bg-muted/40 p-1 rounded-xl border border-border/50">
          <button
            onClick={() => setZoom((z) => Math.min(1.8, z + 0.2))}
            aria-label="Zoom In"
            className="p-1.5 rounded-lg hover:bg-background/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.2))}
            aria-label="Zoom Out"
            className="p-1.5 rounded-lg hover:bg-background/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setActiveCategory("All");
            }}
            aria-label="Recenter"
            className="p-1.5 rounded-lg hover:bg-background/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category Pills inside Graph */}
      <div className="flex flex-wrap gap-1.5 z-10 pt-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-accent text-accent-foreground font-semibold shadow-sm"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground border border-border/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SVG Canvas */}
      <div className="w-full aspect-[16/10] sm:aspect-[21/10] bg-background/50 rounded-xl border border-border/40 relative overflow-hidden flex items-center justify-center">
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          className="w-full h-full select-none transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          <defs>
            <radialGradient id="hq-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Edges */}
          <g className="edges">
            {data.edges.map((edge, i) => {
              const src = layout.nodePositions[edge.source];
              const tgt = layout.nodePositions[edge.target];
              if (!src || !tgt) return null;

              const isHighlighted =
                hoveredNodeId &&
                (edge.source === hoveredNodeId || edge.target === hoveredNodeId);
              const isDimmed = hoveredNodeId && !isHighlighted;

              return (
                <line
                  key={`edge-${i}`}
                  x1={src.x}
                  y1={src.y}
                  x2={tgt.x}
                  y2={tgt.y}
                  stroke={isHighlighted ? "#38BDF8" : "currentColor"}
                  strokeOpacity={isHighlighted ? 0.9 : isDimmed ? 0.08 : 0.25}
                  strokeWidth={isHighlighted ? 2 : 1}
                  strokeDasharray={edge.label === "expands" ? "4 3" : undefined}
                  className="transition-all duration-200 text-muted-foreground"
                />
              );
            })}
          </g>

          {/* Nodes */}
          <g className="nodes">
            {filteredNodes.map((node) => {
              const pos = layout.nodePositions[node.id];
              if (!pos) return null;

              const color = CATEGORY_COLORS[node.category] || {
                bg: "rgba(100, 116, 139, 0.2)",
                border: "#94A3B8",
                text: "#CBD5E1",
                fill: "#94A3B8",
              };

              const isHovered = hoveredNodeId === node.id;
              const isConnected = connectedNodeIds.has(node.id);
              const isDimmed = hoveredNodeId && !isConnected;

              return (
                <g
                  key={node.id}
                  transform={`translate(${pos.x}, ${pos.y})`}
                  className="cursor-pointer transition-all duration-200"
                  opacity={isDimmed ? 0.2 : 1}
                  onMouseEnter={() => setHoveredNodeId(node.id)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  <Link href={node.url}>
                    {/* Pulsing ring on hover / HQ */}
                    {(isHovered || node.id === "alim-khalelov-hq") && (
                      <circle
                        r={pos.radius + 6}
                        fill="none"
                        stroke={color.border}
                        strokeWidth="1.5"
                        opacity={isHovered ? "0.8" : "0.3"}
                        className="animate-pulse"
                      />
                    )}

                    {/* Node circle */}
                    <circle
                      r={pos.radius}
                      fill={color.bg}
                      stroke={color.border}
                      strokeWidth={isHovered ? "2.5" : "1.5"}
                      filter={isHovered ? "url(#glow)" : undefined}
                    />

                    {/* Node Label */}
                    <text
                      y={pos.radius + 14}
                      textAnchor="middle"
                      fill={color.text}
                      fontSize={node.id === "alim-khalelov-hq" ? 11 : 9.5}
                      fontWeight={isHovered || node.id === "alim-khalelov-hq" ? 700 : 500}
                      className="font-mono tracking-tight pointer-events-none drop-shadow-sm"
                    >
                      {node.label}
                    </text>
                  </Link>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground/80 px-1 font-mono">
        <span>Click node to open document</span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-accent" />
          <span>{data.nodes.length} Grounded Nodes &bull; {data.edges.length} Active Vectors</span>
        </span>
      </div>
    </div>
  );
}
