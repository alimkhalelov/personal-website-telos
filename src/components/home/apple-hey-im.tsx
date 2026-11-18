"use client";

import React from "react";
import { motion } from "framer-motion";

interface AppleHeyImProps {
  className?: string;
  speed?: number;
}

/**
 * AppleHeyIm: Authentic Apple-grade vector calligraphy reproduction of "hey, I'm"
 * designed with the exact stroke mechanics, open loops, and 3D frosted glass tube depth
 * of Apple's iconic 2021 iMac "hello" screensaver.
 *
 * Uses continuous cubic Bézier paths with round caps and joints:
 * 1. Ambient Glow (diffuse neon aura with blur)
 * 2. Translucent Frosted Glass Tube (volumetric body)
 * 3. Specular Crest Highlight (sharp white glossy crown)
 */
export function AppleHeyIm({
  className = "h-12 sm:h-14 w-auto",
  speed = 1.0,
}: AppleHeyImProps) {
  const calc = (s: number) => s / speed;

  // Exact Apple-proportioned calligraphy curves:
  // 1. h ascender loop
  const pathH1 =
    "M 8.7 166.6 C 36.2 151.2, 61.3 131.5, 89.8 98.0 C 109.2 75.1, 119.6 49.0, 120.1 31.0 C 120.4 17.6, 113.8 7.4, 101.8 7.4 C 88.4 7.4, 79.9 17.6, 74.7 40.9 C 69.0 66.6, 64.8 96.0, 54.1 190.4";
  
  // 2. h arch + e oval loop + y descender loop
  const pathHEY =
    "M 55.2 181.1 C 60.6 133.1, 81.4 98.0, 108.0 98.0 C 123.8 98.0, 133.9 110.7, 131.1 128.8 C 129.5 139.5, 127.6 150.4, 125.4 163.1 C 122.9 178.9, 130.1 191.3, 152.1 191.3 C 184.2 191.3, 219.2 173.5, 237.1 145.9 C 243.2 136.5, 245.7 128.1, 245.9 119.9 C 246.2 105.0, 237.7 93.8, 222.9 93.8 C 204.0 93.8, 189.6 115.2, 189.6 142.5 C 189.6 171.7, 205.5 192.3, 239.2 192.3 C 255 192.3, 270 175, 282 150 C 290 132, 295 115, 298 98 C 298 120, 292 155, 280 195 C 265 240, 245 270, 225 270 C 210 270, 202 258, 205 244 C 210 224, 235 200, 275 185 C 295 178, 312 182, 325 188";

  // 3. Comma
  const pathComma =
    "M 345 192 C 349 192, 352 195, 350 202 C 347 212, 338 222, 332 226";

  // 4. Script capital I
  const pathI =
    "M 382 95 C 388 78, 404 74, 412 82 C 418 89, 412 100, 402 118 C 390 140, 382 168, 384 186 C 386 193, 396 193, 408 188 C 418 183, 428 175, 435 168";

  // 5. Apostrophe
  const pathApos =
    "M 440 76 C 444 76, 447 79, 445 85 C 443 92, 435 100, 431 103";

  // 6. Cursive m with 3 Apple h-style arches
  const pathM =
    "M 458 142 C 464 110, 480 98, 498 98 C 510 98, 516 108, 514 122 C 512 138, 508 165, 506 191 M 510 142 C 516 110, 532 98, 550 98 C 562 98, 568 108, 566 122 C 564 138, 560 165, 558 191 M 562 142 C 568 110, 584 98, 602 98 C 615 98, 622 108, 620 125 C 616 150, 620 185, 634 188 C 646 190, 660 180, 670 168";

  const segments = [
    { d: pathH1, duration: 0.8, delay: 0 },
    { d: pathHEY, duration: 1.6, delay: 0.65 },
    { d: pathComma, duration: 0.3, delay: 2.1 },
    { d: pathI, duration: 0.6, delay: 2.3 },
    { d: pathApos, duration: 0.25, delay: 2.8 },
    { d: pathM, duration: 0.85, delay: 3.0 },
  ];

  return (
    <motion.svg
      className={`${className} overflow-visible select-none pointer-events-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 680 280"
      fill="none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <title>hey, I'm</title>

      {/* Layer 1: Frosted Glass Ambient Glow (Outer diffuse blur) */}
      {segments.map((seg, i) => (
        <motion.path
          key={`glow-${i}`}
          d={seg.d}
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "blur(5px)" }}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: calc(seg.duration),
            delay: calc(seg.delay),
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Layer 2: Core Translucent Glass Tube Body (Main structure) */}
      {segments.map((seg, i) => (
        <motion.path
          key={`body-${i}`}
          d={seg.d}
          stroke="rgba(255, 255, 255, 0.70)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: calc(seg.duration),
            delay: calc(seg.delay),
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}

      {/* Layer 3: Specular Crest Highlight (3D glass reflection along the top ridge) */}
      {segments.map((seg, i) => (
        <motion.path
          key={`highlight-${i}`}
          d={seg.d}
          stroke="rgba(255, 255, 255, 0.95)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: calc(seg.duration),
            delay: calc(seg.delay),
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      ))}
    </motion.svg>
  );
}
