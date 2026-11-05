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
 * Replicates pure optical glass:
 * - Crystal translucent body allowing the dynamic One UI canvas to shine through.
 * - feSpecularLighting 3D curved surface reflection catching ambient overhead light.
 * - Delicate 0.65px optical lens perimeter (NO cartoon neon borders).
 * - Diffused physical ambient drop-shadow.
 */
export function LiquidGlassTitle({
  children,
  className = "",
  as: Component = "h1",
  style = {},
}: LiquidGlassTitleProps) {
  return (
    <>
      {/* SVG Specular Light Filter for Physical 3D Glass Refraction & Curved Bevel */}
      <svg
        width="0"
        height="0"
        className="absolute pointer-events-none opacity-0 overflow-hidden"
        style={{ position: "absolute", width: 0, height: 0 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="apple-liquid-glass" x="-20%" y="-20%" width="140%" height="140%">
            {/* Height profile of the curved liquid surface */}
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.2" result="blur" />
            {/* Top-left ambient specular reflection (natural curved glass glint) */}
            <feSpecularLighting
              in="blur"
              surfaceScale="3.2"
              specularConstant="1.3"
              specularExponent="22"
              lightingColor="#ffffff"
              result="specular"
            >
              <feDistantLight azimuth="132" elevation="58" />
            </feSpecularLighting>
            {/* Mask specular highlight to stay strictly inside the glyph perimeter */}
            <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularInside" />
            {/* Composite glass gradient body + specular highlight */}
            <feComposite in="SourceGraphic" in2="specularInside" operator="over" />
          </filter>
        </defs>
      </svg>

      <Component
        className={`apple-liquid-glass-heading ${className}`}
        style={style}
      >
        {children}
      </Component>
    </>
  );
}

