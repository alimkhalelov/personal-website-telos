"use client";

import React from "react";

interface LiquidGlassTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "div";
  style?: React.CSSProperties;
}

/**
 * Authentic Apple Liquid Glass Typography (iOS / VisionOS):
 * - Clean optical crystal body with zero internal wireframe/glyph artifacts.
 * - Multi-tier raster drop-shadow catching perimeter specular light from top-left.
 * - Translucent lens refraction letting the dynamic One UI canvas glow through.
 */
export function LiquidGlassTitle({
  children,
  className = "",
  as: Component = "h1",
  style = {},
}: LiquidGlassTitleProps) {
  return (
    <Component
      className={`apple-liquid-glass-heading ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}


