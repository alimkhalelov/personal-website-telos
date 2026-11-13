"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";

export interface Keyframe {
  hour: number;
  phase: string;
  stops: [string, string, string, string, string];
  radial: { x: number; y: number; color: string; size: string };
}

const STORAGE_KEY = "oneui-dynamic-daytime";
const EVENT_NAME = "dynamic-daytime-toggle";

export function getDynamicDaytimeEnabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val !== null ? val === "true" : true;
  } catch {
    return true;
  }
}

export function setDynamicDaytimeEnabled(enabled: boolean) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, String(enabled));
    if (enabled) {
      document.documentElement.classList.add("has-dynamic-daytime");
    } else {
      document.documentElement.classList.remove("has-dynamic-daytime");
    }
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: enabled }));
  } catch {}
}

export function useDynamicDaytime() {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    const isEn = getDynamicDaytimeEnabled();
    setEnabled(isEn);
    if (isEn) {
      document.documentElement.classList.add("has-dynamic-daytime");
    } else {
      document.documentElement.classList.remove("has-dynamic-daytime");
    }

    const handler = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      if (typeof custom.detail === "boolean") {
        setEnabled(custom.detail);
        if (custom.detail) {
          document.documentElement.classList.add("has-dynamic-daytime");
        } else {
          document.documentElement.classList.remove("has-dynamic-daytime");
        }
      }
    };
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const toggle = useCallback(() => {
    const next = !enabled;
    setEnabled(next);
    setDynamicDaytimeEnabled(next);
  }, [enabled]);

  return { enabled, toggle };
}

/**
 * 8 Circadian Keyframes across the 24-hour cycle.
 * Designed with distinct, unmistakably different visual identities:
 * - Night (23:00 - 05:00): Cosmic Midnight Obsidian & Violet
 * - Dawn / Sunrise (05:00 - 08:30): Golden Morning Amber, Rose Gold & Apricot
 * - Day / High Noon (08:30 - 16:30): Radiant Cerulean Azure & Crystal Sky
 * - Sunset (16:30 - 19:30): Velvet Indigo, Electric Magenta & Fiery Coral
 * - Twilight / Blue Hour (19:30 - 23:00): Cobalt Indigo & Dusk Plum
 */
export const CIRCADIAN_KEYFRAMES: Keyframe[] = [
  {
    hour: 0.0,
    phase: "Cosmic Midnight",
    stops: ["#050714", "#0C102A", "#15173B", "#221845", "#180D2D"],
    radial: { x: 50, y: 15, color: "rgba(120, 110, 200, 0.16)", size: "70%" },
  },
  {
    hour: 5.0,
    phase: "Pre-Dawn Awakening",
    stops: ["#0D1230", "#1C1D4D", "#3E295E", "#6B355A", "#994754"],
    radial: { x: 50, y: 80, color: "rgba(220, 110, 130, 0.22)", size: "75%" },
  },
  {
    hour: 6.8,
    phase: "Golden Sunrise",
    stops: ["#171B47", "#3B336A", "#7E4E7A", "#C9636A", "#F8A56E"],
    radial: { x: 50, y: 85, color: "rgba(255, 180, 100, 0.45)", size: "85%" },
  },
  {
    hour: 9.0,
    phase: "Crisp Morning",
    stops: ["#0A5BA5", "#1577C6", "#3CA2E0", "#7DC8EE", "#BDE4F4"],
    radial: { x: 50, y: 35, color: "rgba(255, 255, 255, 0.35)", size: "80%" },
  },
  {
    hour: 13.0,
    phase: "Radiant High Noon",
    stops: ["#0277BD", "#0288D1", "#29B6F6", "#81D4FA", "#E1F5FE"],
    radial: { x: 50, y: 10, color: "rgba(255, 255, 255, 0.42)", size: "90%" },
  },
  {
    hour: 16.5,
    phase: "Late Afternoon",
    stops: ["#0D5CA8", "#245EA5", "#625997", "#A55B7E", "#E27766"],
    radial: { x: 50, y: 65, color: "rgba(255, 210, 140, 0.35)", size: "80%" },
  },
  {
    hour: 18.5,
    phase: "Sunset Glow",
    stops: ["#18153A", "#431E6E", "#882375", "#D83A56", "#FF764A"],
    radial: { x: 50, y: 85, color: "rgba(255, 120, 80, 0.52)", size: "85%" },
  },
  {
    hour: 21.0,
    phase: "Twilight Blue Hour",
    stops: ["#090D24", "#141B49", "#28296A", "#423778", "#5A3F7A"],
    radial: { x: 50, y: 50, color: "rgba(110, 110, 230, 0.22)", size: "75%" },
  },
  {
    hour: 24.0,
    phase: "Cosmic Midnight",
    stops: ["#050714", "#0C102A", "#15173B", "#221845", "#180D2D"],
    radial: { x: 50, y: 15, color: "rgba(120, 110, 200, 0.16)", size: "70%" },
  },
];

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(t: number): number {
  return t * t * (3 - 2 * t);
}

function lerpColor(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const bl = Math.round(lerp(a.b, b.b, t));
  return `rgb(${r}, ${g}, ${bl})`;
}

export function getCircadianDataForHour(hour: number): {
  phase: string;
  stops: [string, string, string, string, string];
  radial: { x: number; y: number; color: string; size: string };
} {
  const h = ((hour % 24) + 24) % 24;
  for (let i = 0; i < CIRCADIAN_KEYFRAMES.length - 1; i++) {
    const k1 = CIRCADIAN_KEYFRAMES[i];
    const k2 = CIRCADIAN_KEYFRAMES[i + 1];
    if (h >= k1.hour && h <= k2.hour) {
      const span = k2.hour - k1.hour;
      const localT = span === 0 ? 0 : smoothstep((h - k1.hour) / span);
      const stops = k1.stops.map((c, idx) => lerpColor(c, k2.stops[idx], localT)) as [
        string,
        string,
        string,
        string,
        string
      ];
      const radialX = Math.round(lerp(k1.radial.x, k2.radial.x, localT));
      const radialY = Math.round(lerp(k1.radial.y, k2.radial.y, localT));
      const phase = localT < 0.5 ? k1.phase : k2.phase;
      return {
        phase,
        stops,
        radial: {
          x: radialX,
          y: radialY,
          color: k1.radial.color,
          size: k1.radial.size,
        },
      };
    }
  }
  return {
    phase: CIRCADIAN_KEYFRAMES[0].phase,
    stops: CIRCADIAN_KEYFRAMES[0].stops,
    radial: CIRCADIAN_KEYFRAMES[0].radial,
  };
}

export function OneUiWallpaper() {
  const { enabled } = useDynamicDaytime();
  const [mounted, setMounted] = useState<boolean>(false);
  const [currentHour, setCurrentHour] = useState<number>(12);
  const [bloomActive, setBloomActive] = useState(false);

  // Synchronize directly with the visitor's local system time immediately on mount
  useEffect(() => {
    const getLocalHour = () => {
      const now = new Date();
      return now.getHours() + now.getMinutes() / 60;
    };

    setCurrentHour(getLocalHour());

    // Allow initial paint with the base canvas, then smoothly transition into local circadian sky
    const rafId = requestAnimationFrame(() => {
      setMounted(true);
    });

    const interval = setInterval(() => {
      setCurrentHour(getLocalHour());
    }, 15000);

    return () => {
      cancelAnimationFrame(rafId);
      clearInterval(interval);
    };
  }, [enabled]);

  const circadianData = useMemo(() => {
    return getCircadianDataForHour(currentHour);
  }, [currentHour]);

  const triggerBloom = useCallback(() => {
    setBloomActive(true);
    const timer = setTimeout(() => setBloomActive(false), 900);
    return () => clearTimeout(timer);
  }, []);

  if (!enabled) {
    return null;
  }

  const { phase, stops, radial } = circadianData;
  const gradientCss = `linear-gradient(175deg, ${stops[0]} 0%, ${stops[1]} 26%, ${stops[2]} 52%, ${stops[3]} 76%, ${stops[4]} 100%)`;
  const radialCss = `radial-gradient(circle at ${radial.x}% ${radial.y}%, ${radial.color} 0%, rgba(0,0,0,0) ${radial.size})`;

  const displayHours = Math.floor(currentHour);
  const displayMinutes = Math.floor((currentHour - displayHours) * 60);
  const timeFormatted = `${String(displayHours).padStart(2, "0")}:${String(
    displayMinutes
  ).padStart(2, "0")}`;

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
      title={`Local Time: ${timeFormatted} (${phase}) • One UI Dynamic Circadian Wallpaper`}
    >
      {/* 1. Fast 0ms Base Canvas: Deep atmospheric midnight obsidian rendered immediately */}
      <div
        className="base-canvas w-full h-full absolute inset-0"
        style={{
          background:
            "linear-gradient(175deg, #050714 0%, #0C102A 26%, #15173B 52%, #221845 76%, #180D2D 100%)",
        }}
      />

      {/* 2. Circadian Daytime Layer: smoothly fades in over 1.5s to match visitor's local timezone */}
      <div
        className="circadian-layer w-full h-full absolute inset-0 transition-opacity duration-1500 ease-out"
        style={{
          background: gradientCss,
          opacity: mounted ? 1 : 0,
        }}
      />

      {/* 3. Ambient Sun/Moon Horizon Radial Glow: smoothly adapts with visitor's local sun position */}
      <div
        className="w-full h-full absolute inset-0 transition-opacity duration-1500 ease-out pointer-events-none"
        style={{
          background: radialCss,
          opacity: mounted ? 1 : 0,
        }}
      />

      {/* 3. Interactive Touch / Click Bloom Effect */}
      {bloomActive && (
        <div
          className="w-full h-full absolute inset-0 pointer-events-none animate-in fade-in zoom-in duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${stops[2]} 0%, transparent 65%)`,
            opacity: 0.35,
          }}
        />
      )}

      {/* 4. Subtle Vignette for pristine typography contrast without color washout */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 25%, transparent 40%, rgba(0, 0, 0, 0.22) 100%)",
        }}
      />

      {/* 5. Clickable surface to re-trigger bloom */}
      <div
        onClick={triggerBloom}
        className="absolute inset-0 pointer-events-auto cursor-pointer"
        aria-hidden="true"
      />
    </div>
  );
}
