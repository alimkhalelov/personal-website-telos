'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import type { GraphNode, GraphLink } from '@/lib/wiki';

interface KnowledgeGraphProps {
  nodes: GraphNode[];
  links: GraphLink[];
}

interface SimNode extends GraphNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function KnowledgeGraph({ nodes, links }: KnowledgeGraphProps) {
  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [hoverNodeId, setHoverNodeId] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isDraggingCanvas = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const draggedNode = useRef<SimNode | null>(null);

  const simNodesRef = useRef<SimNode[]>([]);
  const animFrameId = useRef<number | null>(null);

  // Initialize simulation nodes
  useEffect(() => {
    const width = containerRef.current?.clientWidth || 800;
    const height = containerRef.current?.clientHeight || 600;

    simNodesRef.current = nodes.map((n, i) => {
      const angle = (i / Math.max(1, nodes.length)) * 2 * Math.PI;
      const radius = 120 + Math.random() * 80;
      return {
        ...n,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: 0,
        vy: 0,
        radius: Math.max(6, Math.min(18, 4 + Math.sqrt(n.val || 2) * 3.5)),
      };
    });
  }, [nodes]);

  // Main Render & Simulation Loop
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const isDark = document.documentElement.classList.contains('dark');

    // Simulation Physics Step
    const simNodes = simNodesRef.current;
    const kRepel = 1200;
    const kLink = 0.04;
    const linkDist = 110;
    const damping = 0.88;

    // Node-Node Repulsion
    for (let i = 0; i < simNodes.length; i++) {
      for (let j = i + 1; j < simNodes.length; j++) {
        const dx = simNodes[j].x - simNodes[i].x;
        const dy = simNodes[j].y - simNodes[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 350) {
          const force = kRepel / (dist * dist);
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          simNodes[i].vx -= fx;
          simNodes[i].vy -= fy;
          simNodes[j].vx += fx;
          simNodes[j].vy += fy;
        }
      }
    }

    // Link Attraction
    for (const link of links) {
      const sNode = simNodes.find((n) => n.id === link.source);
      const tNode = simNodes.find((n) => n.id === link.target);
      if (sNode && tNode) {
        const dx = tNode.x - sNode.x;
        const dy = tNode.y - sNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - linkDist) * kLink;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        sNode.vx += fx;
        sNode.vy += fy;
        tNode.vx -= fx;
        tNode.vy -= fy;
      }
    }

    // Center Gravity & Integration
    const cx = width / 2;
    const cy = height / 2;
    for (const node of simNodes) {
      if (node !== draggedNode.current) {
        node.vx += (cx - node.x) * 0.002;
        node.vy += (cy - node.y) * 0.002;
        node.vx *= damping;
        node.vy *= damping;
        node.x += node.vx;
        node.y += node.vy;
      }
    }

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.translate(cx, cy);
    ctx.scale(zoom, zoom);
    ctx.translate(-cx, -cy);

    // Draw Links
    for (const link of links) {
      const sNode = simNodes.find((n) => n.id === link.source);
      const tNode = simNodes.find((n) => n.id === link.target);
      if (!sNode || !tNode) continue;

      const isHovered = hoverNodeId === sNode.id || hoverNodeId === tNode.id;
      ctx.beginPath();
      ctx.moveTo(sNode.x, sNode.y);
      ctx.lineTo(tNode.x, tNode.y);
      ctx.strokeStyle = isHovered
        ? (isDark ? '#60a5fa' : '#2563eb')
        : (isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)');
      ctx.lineWidth = isHovered ? 2.2 : 1.2;
      ctx.stroke();

      // Arrow head
      if (isHovered) {
        const angle = Math.atan2(tNode.y - sNode.y, tNode.x - sNode.x);
        const arrowDist = tNode.radius + 6;
        const ax = tNode.x - Math.cos(angle) * arrowDist;
        const ay = tNode.y - Math.sin(angle) * arrowDist;
        ctx.beginPath();
        ctx.arc(ax, ay, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? '#60a5fa' : '#2563eb';
        ctx.fill();
      }
    }

    // Draw Nodes
    for (const node of simNodes) {
      const isCurrentHover = hoverNodeId === node.id;
      const isNeighbor = hoverNodeId && links.some(
        (l) => (l.source === hoverNodeId && l.target === node.id) || (l.target === hoverNodeId && l.source === node.id)
      );
      const isHighlighted = isCurrentHover || isNeighbor;

      // Glow halo
      if (isHighlighted) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(96, 165, 250, 0.25)' : 'rgba(37, 99, 235, 0.2)';
        ctx.fill();
      }

      // Main Node Circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      
      let fillColor = isDark ? '#3b82f6' : '#2563eb';
      if (node.category.toLowerCase().includes('system')) {
        fillColor = isDark ? '#a855f7' : '#7c3aed';
      }
      if (!isHighlighted && hoverNodeId) {
        fillColor = isDark ? '#374151' : '#d1d5db';
      }

      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = isDark ? '#1c1c1c' : '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Node Label
      ctx.font = `${isHighlighted ? '600' : '500'} ${12 / zoom < 10 ? 10 : 12}px sans-serif`;
      ctx.fillStyle = isHighlighted
        ? (isDark ? '#ffffff' : '#000000')
        : (isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)');
      ctx.textAlign = 'center';
      ctx.fillText(node.name, node.x, node.y + node.radius + 14);
    }

    ctx.restore();

    animFrameId.current = requestAnimationFrame(render);
  }, [links, hoverNodeId, zoom, pan]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        canvasRef.current.width = containerRef.current.clientWidth;
        canvasRef.current.height = containerRef.current.clientHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [render]);

  // Coordinate Conversion
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect || !canvasRef.current) return { x: 0, y: 0 };
    const cx = canvasRef.current.width / 2;
    const cy = canvasRef.current.height / 2;

    const screenX = e.clientX - rect.left;
    const screenY = e.clientY - rect.top;

    const x = (screenX - pan.x - cx) / zoom + cx;
    const y = (screenY - pan.y - cy) / zoom + cy;
    return { x, y };
  };

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    const clicked = simNodesRef.current.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 4;
    });

    if (clicked) {
      draggedNode.current = clicked;
    } else {
      isDraggingCanvas.current = true;
      dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedNode.current) {
      const { x, y } = getCanvasCoords(e);
      draggedNode.current.x = x;
      draggedNode.current.y = y;
      draggedNode.current.vx = 0;
      draggedNode.current.vy = 0;
      return;
    }

    if (isDraggingCanvas.current) {
      setPan({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      });
      return;
    }

    const { x, y } = getCanvasCoords(e);
    const hovered = simNodesRef.current.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 4;
    });

    setHoverNodeId(hovered ? hovered.id : null);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = hovered ? 'pointer' : 'default';
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (draggedNode.current) {
      draggedNode.current = null;
    }
    isDraggingCanvas.current = false;
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    const clicked = simNodesRef.current.find((n) => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 4;
    });

    if (clicked) {
      router.push(`/wiki/${clicked.id}`);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-border bg-card shadow-inner">
      <canvas
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onClick={handleClick}
        className="w-full h-full block"
      />

      {/* Floating Canvas Controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-1.5 p-1.5 rounded-xl bg-card/80 backdrop-blur-md border border-border shadow-lg">
        <button
          onClick={() => setZoom((z) => Math.min(z * 1.3, 3))}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setZoom((z) => Math.max(z / 1.3, 0.4))}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
          className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Legend Badge */}
      <div className="absolute top-4 left-4 flex items-center gap-3 px-3 py-1.5 rounded-lg bg-card/80 backdrop-blur-md border border-border text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
          <span>Concepts</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
          <span>Systems</span>
        </div>
      </div>
    </div>
  );
}
