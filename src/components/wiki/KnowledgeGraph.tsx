"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ZoomIn, ZoomOut, RotateCcw, Sparkles } from "lucide-react";
import type { GraphNode, GraphLink } from "@/lib/wiki";

interface KnowledgeGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
  height?: number | string;
  onNodeClick?: (nodeId: string) => void;
}

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

const CATEGORY_COLORS: Record<string, { main: string; light: string; border: string }> = {
  Concepts: { main: "#3B82F6", light: "rgba(59, 130, 246, 0.2)", border: "#60A5FA" },
  Entities: { main: "#10B981", light: "rgba(16, 185, 129, 0.2)", border: "#34D399" },
  Systems: { main: "#8B5CF6", light: "rgba(139, 92, 246, 0.2)", border: "#A78BFA" },
  Overview: { main: "#F59E0B", light: "rgba(245, 158, 11, 0.2)", border: "#FBBF24" },
  General: { main: "#64748B", light: "rgba(100, 116, 139, 0.2)", border: "#94A3B8" },
};

export function KnowledgeGraph({ nodes, links, height = 600, onNodeClick }: KnowledgeGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [hoveredNode, setHoveredNode] = useState<SimNode | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Viewport Transform: pan and zoom
  const transformRef = useRef({ x: 0, y: 0, k: 1 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const draggedNodeRef = useRef<SimNode | null>(null);

  // Simulation state
  const simNodesRef = useRef<SimNode[]>([]);
  const simLinksRef = useRef<{ source: SimNode; target: SimNode }[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Initialize simulation nodes and links
  useEffect(() => {
    const width = containerRef.current?.clientWidth || 800;
    const h = typeof height === "number" ? height : 600;

    const nodeMap = new Map<string, SimNode>();

    const simNodes: SimNode[] = nodes.map((node, i) => {
      const angle = (i / Math.max(1, nodes.length)) * 2 * Math.PI;
      const radiusDist = 120 + Math.random() * 100;
      const r = Math.max(6, Math.min(16, 4 + Math.sqrt(node.val) * 2.2));

      const sn: SimNode = {
        ...node,
        x: width / 2 + Math.cos(angle) * radiusDist + (Math.random() - 0.5) * 50,
        y: h / 2 + Math.sin(angle) * radiusDist + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: r,
      };
      nodeMap.set(node.id, sn);
      return sn;
    });

    const simLinks: { source: SimNode; target: SimNode }[] = [];
    for (const link of links) {
      const src = nodeMap.get(link.source);
      const tgt = nodeMap.get(link.target);
      if (src && tgt) {
        simLinks.push({ source: src, target: tgt });
      }
    }

    simNodesRef.current = simNodes;
    simLinksRef.current = simLinks;
  }, [nodes, links, height]);

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isRunning = true;
    let alpha = 1;

    const runPhysics = () => {
      if (alpha < 0.005) return;
      const simNodes = simNodesRef.current;
      const simLinks = simLinksRef.current;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      const cx = width / 2;
      const cy = h / 2;

      // Center gravity
      for (const n of simNodes) {
        n.vx += (cx - n.x) * 0.0008 * alpha;
        n.vy += (cy - n.y) * 0.0008 * alpha;
      }

      // Repulsion (Coulomb)
      for (let i = 0; i < simNodes.length; i++) {
        for (let j = i + 1; j < simNodes.length; j++) {
          const n1 = simNodes[i];
          const n2 = simNodes[j];
          const dx = n2.x - n1.x;
          const dy = n2.y - n1.y;
          const distSq = dx * dx + dy * dy || 1;
          const dist = Math.sqrt(distSq);
          const minDist = n1.radius + n2.radius + 35;

          const force = (500 / distSq) * alpha;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;

          n1.vx -= fx;
          n1.vy -= fy;
          n2.vx += fx;
          n2.vy += fy;

          if (dist < minDist) {
            const push = (minDist - dist) * 0.05 * alpha;
            n1.vx -= (dx / dist) * push;
            n1.vy -= (dy / dist) * push;
            n2.vx += (dx / dist) * push;
            n2.vy += (dy / dist) * push;
          }
        }
      }

      // Link spring attraction (Hooke)
      for (const link of simLinks) {
        const dx = link.target.x - link.source.x;
        const dy = link.target.y - link.source.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const targetDist = 90;
        const springForce = (dist - targetDist) * 0.03 * alpha;
        const fx = (dx / dist) * springForce;
        const fy = (dy / dist) * springForce;

        link.source.vx += fx;
        link.source.vy += fy;
        link.target.vx -= fx;
        link.target.vy -= fy;
      }

      // Apply velocity and friction damping
      for (const n of simNodes) {
        if (n !== draggedNodeRef.current) {
          n.x += n.vx;
          n.y += n.vy;
          n.vx *= 0.92;
          n.vy *= 0.92;
        }
      }

      alpha *= 0.992;
    };

    const draw = () => {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.scale(dpr, dpr);

      // Apply camera transform
      const { x, y, k } = transformRef.current;
      ctx.translate(x, y);
      ctx.scale(k, k);

      const simNodes = simNodesRef.current;
      const simLinks = simLinksRef.current;
      const hNode = hoveredNode;

      // 1. Draw Links
      for (const link of simLinks) {
        const isNeighbor = hNode && (link.source.id === hNode.id || link.target.id === hNode.id);
        const isDimmed = hNode && !isNeighbor;

        ctx.beginPath();
        ctx.moveTo(link.source.x, link.source.y);
        ctx.lineTo(link.target.x, link.target.y);

        if (isNeighbor) {
          ctx.strokeStyle = "#60A5FA";
          ctx.lineWidth = 2.2;
          ctx.globalAlpha = 0.9;
        } else if (isDimmed) {
          ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.2;
        } else {
          ctx.strokeStyle = "rgba(148, 163, 184, 0.25)";
          ctx.lineWidth = 1.2;
          ctx.globalAlpha = 0.6;
        }
        ctx.stroke();

        // Draw directional arrow midway
        const mx = (link.source.x + link.target.x) / 2;
        const my = (link.source.y + link.target.y) / 2;
        const angle = Math.atan2(link.target.y - link.source.y, link.target.x - link.source.x);
        const arrowLen = 5;

        ctx.save();
        ctx.translate(mx, my);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(-arrowLen, -arrowLen / 2);
        ctx.lineTo(0, 0);
        ctx.lineTo(-arrowLen, arrowLen / 2);
        ctx.strokeStyle = isNeighbor ? "#60A5FA" : "rgba(148, 163, 184, 0.4)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }

      // 2. Draw Nodes
      for (const node of simNodes) {
        const colors = CATEGORY_COLORS[node.category] || CATEGORY_COLORS.General;
        const isHovered = hNode?.id === node.id;
        const isConnectedNeighbor = hNode && simLinks.some(
          (l) => (l.source.id === hNode.id && l.target.id === node.id) ||
                 (l.target.id === hNode.id && l.source.id === node.id)
        );
        const isCategoryMatch = selectedCategory ? node.category === selectedCategory : true;
        const isDimmed = (hNode && !isHovered && !isConnectedNeighbor) || !isCategoryMatch;

        ctx.globalAlpha = isDimmed ? 0.2 : 1;

        // Glowing outer aura on hover
        if (isHovered) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius + 8, 0, Math.PI * 2);
          ctx.fillStyle = colors.light;
          ctx.fill();
        }

        // Main node circle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.main;
        ctx.fill();
        ctx.lineWidth = isHovered ? 2.5 : 1.5;
        ctx.strokeStyle = isHovered ? "#FFFFFF" : colors.border;
        ctx.stroke();

        // Node Title Label
        if (k > 0.55 || isHovered || isConnectedNeighbor) {
          ctx.font = isHovered ? "bold 12px sans-serif" : "11px sans-serif";
          ctx.fillStyle = isHovered ? "#FFFFFF" : "rgba(240, 240, 245, 0.85)";
          ctx.textAlign = "center";
          ctx.textBaseline = "top";
          ctx.fillText(node.name, node.x, node.y + node.radius + 5);
        }
      }

      ctx.restore();

      runPhysics();
      if (isRunning) {
        animFrameRef.current = requestAnimationFrame(draw);
      }
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [hoveredNode, selectedCategory]);

  // Handle Resize and Retina DPI
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const h = typeof height === "number" ? height : 600;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [height]);

  // Screen to Canvas Coordinates helper
  const getCanvasCoords = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const sx = clientX - rect.left;
    const sy = clientY - rect.top;
    const { x, y, k } = transformRef.current;
    return {
      x: (sx - x) / k,
      y: (sy - y) / k,
    };
  };

  // Find node under cursor
  const findNodeAt = (clientX: number, clientY: number): SimNode | null => {
    const { x, y } = getCanvasCoords(clientX, clientY);
    for (const node of simNodesRef.current) {
      const dx = node.x - x;
      const dy = node.y - y;
      if (dx * dx + dy * dy <= (node.radius + 6) * (node.radius + 6)) {
        return node;
      }
    }
    return null;
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const node = findNodeAt(e.clientX, e.clientY);
    if (node) {
      draggedNodeRef.current = node;
    } else {
      isDraggingRef.current = true;
      dragStartRef.current = {
        x: e.clientX - transformRef.current.x,
        y: e.clientY - transformRef.current.y,
      };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNodeRef.current) {
      const { x, y } = getCanvasCoords(e.clientX, e.clientY);
      draggedNodeRef.current.x = x;
      draggedNodeRef.current.y = y;
      draggedNodeRef.current.vx = 0;
      draggedNodeRef.current.vy = 0;
    } else if (isDraggingRef.current) {
      transformRef.current.x = e.clientX - dragStartRef.current.x;
      transformRef.current.y = e.clientY - dragStartRef.current.y;
    } else {
      const node = findNodeAt(e.clientX, e.clientY);
      setHoveredNode(node);
      if (containerRef.current) {
        containerRef.current.style.cursor = node ? "pointer" : "grab";
      }
    }
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (draggedNodeRef.current) {
      draggedNodeRef.current = null;
    }
    isDraggingRef.current = false;
  };

  const handleClick = (e: React.MouseEvent) => {
    const node = findNodeAt(e.clientX, e.clientY);
    if (node) {
      if (onNodeClick) {
        onNodeClick(node.id);
      } else {
        const dest = node.id === "index" ? "/wiki" : `/wiki/${node.id}`;
        router.push(dest);
      }
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    const newK = Math.max(0.3, Math.min(3.5, transformRef.current.k * zoomFactor));

    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    transformRef.current.x = mx - (mx - transformRef.current.x) * (newK / transformRef.current.k);
    transformRef.current.y = my - (my - transformRef.current.y) * (newK / transformRef.current.k);
    transformRef.current.k = newK;
  };

  const zoomIn = () => {
    transformRef.current.k = Math.min(3.5, transformRef.current.k * 1.3);
  };

  const zoomOut = () => {
    transformRef.current.k = Math.max(0.3, transformRef.current.k / 1.3);
  };

  const resetView = () => {
    transformRef.current = { x: 0, y: 0, k: 1 };
  };

  const categories = Array.from(new Set(nodes.map((n) => n.category)));

  return (
    <div 
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden border border-border bg-[#0E0E10] select-none"
      style={{ height: typeof height === "number" ? `${height}px` : height }}
    >
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleClick}
        onWheel={handleWheel}
        className="w-full h-full block cursor-grab active:cursor-grabbing"
      />

      {/* Top Filter Chips */}
      <div className="absolute top-4 left-4 flex flex-wrap gap-1.5 z-10">
        <button
          type="button"
          onClick={() => setSelectedCategory(null)}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-md transition-all cursor-pointer ${
            selectedCategory === null
              ? "bg-white/20 text-white border border-white/30"
              : "bg-black/40 text-white/60 border border-white/10 hover:text-white"
          }`}
        >
          All ({nodes.length})
        </button>
        {categories.map((cat) => {
          const colors = CATEGORY_COLORS[cat] || CATEGORY_COLORS.General;
          const count = nodes.filter((n) => n.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium backdrop-blur-md transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-white/20 text-white border border-white/30"
                  : "bg-black/40 text-white/60 border border-white/10 hover:text-white"
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.main }} />
              <span>{cat}</span>
              <span className="text-[10px] opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 p-1.5 rounded-xl bg-card/80 backdrop-blur-md border border-border shadow-lg z-10">
        <button
          type="button"
          onClick={zoomIn}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={zoomOut}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={resetView}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Hover Info Tooltip */}
      {hoveredNode && (
        <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-card/90 backdrop-blur-md border border-border text-xs max-w-xs shadow-xl pointer-events-none animate-in fade-in duration-150">
          <div className="font-semibold text-foreground flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>{hoveredNode.name}</span>
          </div>
          <div className="text-muted-foreground text-[11px] mt-1 font-mono">
            Category: {hoveredNode.category} | Weight: {Math.round(hoveredNode.val)}
          </div>
          <div className="text-blue-500 text-[10px] mt-1">Click node to open document</div>
        </div>
      )}
    </div>
  );
}
