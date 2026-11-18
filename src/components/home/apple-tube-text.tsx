"use client";

import * as React from "react";
import { Letters, type LettersHandle } from "@kumailnanji/letters";
import { useInView } from "framer-motion";

interface AppleTubeTextProps {
  text: string;
  className?: string;
  strokeWidth?: number;
  duration?: number;
  autoPlay?: boolean;
  loop?: boolean;
  delayMs?: number;
  triggerOnView?: boolean;
  onComplete?: () => void;
}

/**
 * AppleTubeText: Renders smooth handwritten cursive script in Apple's iconic
 * 3D frosted glass neon tube aesthetic (2021 iMac screensaver style).
 * 
 * Uses @kumailnanji/letters for continuous vector calligraphy with cubic Bézier paths,
 * thick stroke weight (sw ~ 4.4), and a 3-layer frosted glass tube depth:
 * 1. Outer ambient diffuse glow (soft blur)
 * 2. Translucent frosted glass tube body (structural volume)
 * 3. Inner specular ridge highlight (sharp glossy white reflection along the crest)
 */
export function AppleTubeText({
  text,
  className = "h-9 sm:h-10 w-auto",
  strokeWidth = 2.2,
  duration = 1.8,
  autoPlay = true,
  loop = false,
  delayMs = 0,
  triggerOnView = false,
  onComplete,
}: AppleTubeTextProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const lettersRef = React.useRef<LettersHandle>(null);
  const glowRef = React.useRef<LettersHandle>(null);
  const highlightRef = React.useRef<LettersHandle>(null);

  const isInView = useInView(containerRef, {
    once: true,
    margin: "0px 0px -10% 0px",
  });

  const [hasStarted, setHasStarted] = React.useState(!triggerOnView && delayMs === 0 && autoPlay);

  React.useEffect(() => {
    if (!autoPlay) return;

    if (triggerOnView) {
      if (isInView) {
        const timer = setTimeout(() => {
          setHasStarted(true);
          lettersRef.current?.replay();
          glowRef.current?.replay();
          highlightRef.current?.replay();
        }, delayMs);
        return () => clearTimeout(timer);
      }
    } else if (delayMs > 0) {
      const timer = setTimeout(() => {
        setHasStarted(true);
        lettersRef.current?.replay();
        glowRef.current?.replay();
        highlightRef.current?.replay();
      }, delayMs);
      return () => clearTimeout(timer);
    }
  }, [isInView, triggerOnView, delayMs, autoPlay]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center select-none pointer-events-none ${className}`}
    >
      {/* 1. Ambient Frosted Glass Bloom Layer (outer soft neon tube aura) */}
      <div className="absolute inset-0 pointer-events-none filter blur-[2px] opacity-60">
        <Letters
          ref={glowRef}
          text={text}
          strokeWidth={strokeWidth * 1.25}
          color="rgba(255, 255, 255, 0.45)"
          animation={{ type: "tween", duration, ease: "easeInOut" }}
          autoPlay={hasStarted}
          loop={loop}
          className="w-full h-full"
        />
      </div>

      {/* 2. Main 3D Frosted Glass Tube Body (translucent white cylinder with drop-shadow) */}
      <div className="relative z-10 w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.22)]">
        <Letters
          ref={lettersRef}
          text={text}
          strokeWidth={strokeWidth}
          color="rgba(255, 255, 255, 0.90)"
          animation={{ type: "tween", duration, ease: "easeInOut" }}
          autoPlay={hasStarted}
          loop={loop}
          onComplete={onComplete}
          className="w-full h-full"
        />
      </div>

      {/* 3. Inner Specular Ridge Highlight (glossy white reflection along the tube crown) */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-95">
        <Letters
          ref={highlightRef}
          text={text}
          strokeWidth={strokeWidth * 0.35}
          color="#ffffff"
          animation={{ type: "tween", duration, ease: "easeInOut" }}
          autoPlay={hasStarted}
          loop={loop}
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
