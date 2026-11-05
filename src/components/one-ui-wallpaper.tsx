"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface Keyframe {
  hour: number;
  stops: [string, string, string, string, string];
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
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: enabled }));
  } catch {}
}

export function useDynamicDaytime() {
  const [enabled, setEnabled] = useState<boolean>(true);

  useEffect(() => {
    setEnabled(getDynamicDaytimeEnabled());

    const handler = (e: Event) => {
      const custom = e as CustomEvent<boolean>;
      if (typeof custom.detail === "boolean") {
        setEnabled(custom.detail);
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
 * Палитра One UI Dynamic Wallpaper по времени суток (0.0 — 24.0 часа).
 * Значение 18.5 (вечер/закат) повторяет карточку Dynamic со скриншота One UI:
 * Верх: #256AE5 -> #5E7CE2 -> #9E78C9 -> #CF7E8E -> Низ: #E88D67
 */
const KEYFRAMES: Keyframe[] = [
  {
    hour: 0.0,
    stops: ["#080B1E", "#13183F", "#251E52", "#3B2562", "#4D2E66"],
  },
  {
    hour: 4.5,
    stops: ["#121C4E", "#26357A", "#4F4B94", "#7E5A9B", "#B06E94"],
  },
  {
    hour: 7.5,
    stops: ["#3876F2", "#5C93F8", "#89A8F9", "#C6B4EE", "#F3BC9C"],
  },
  {
    hour: 13.0,
    stops: ["#0D5CE8", "#1C82F6", "#28A9F4", "#3DC9E8", "#68E3D4"],
  },
  {
    hour: 16.5,
    stops: ["#1D65EC", "#4283F0", "#7E87DE", "#B987BA", "#E59580"],
  },
  {
    hour: 18.5,
    stops: ["#256AE5", "#5E7CE2", "#9E78C9", "#CF7E8E", "#E88D67"],
  },
  {
    hour: 21.0,
    stops: ["#11194A", "#292968", "#523479", "#7C407B", "#9D526E"],
  },
  {
    hour: 24.0,
    stops: ["#080B1E", "#13183F", "#251E52", "#3B2562", "#4D2E66"],
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

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

function lerpColor(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const r = Math.round(lerp(a.r, b.r, t));
  const g = Math.round(lerp(a.g, b.g, t));
  const bl = Math.round(lerp(a.b, b.b, t));
  return `rgb(${r}, ${g}, ${bl})`;
}

function getColorsForHour(hour: number): [string, string, string, string, string] {
  const h = ((hour % 24) + 24) % 24;
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const k1 = KEYFRAMES[i];
    const k2 = KEYFRAMES[i + 1];
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
      return stops;
    }
  }
  return KEYFRAMES[0].stops;
}

export function OneUiWallpaper() {
  const { enabled } = useDynamicDaytime();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getRealTimeHour = useCallback(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  }, []);

  const animState = useRef({
    targetTime: 18.5,
    currentTime: 18.5,
    unlockStartTime: 0,
    unlockDuration: 1900,
    unlockProgress: 0,
    rafId: 0,
  });

  const triggerUnlock = useCallback(() => {
    animState.current.unlockStartTime = performance.now();
    animState.current.unlockProgress = 0;
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const realHour = getRealTimeHour();
    animState.current.targetTime = realHour;
    animState.current.currentTime = realHour;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener("resize", resize);
    resize();

    animState.current.unlockStartTime = performance.now();
    animState.current.unlockProgress = 0;

    let lastMinuteTick = Date.now();

    const render = (now: number) => {
      const state = animState.current;
      const w = canvas.width;
      const h = canvas.height;

      if (now - lastMinuteTick > 20000) {
        lastMinuteTick = now;
        state.targetTime = getRealTimeHour();
      }

      const diff = state.targetTime - state.currentTime;
      state.currentTime += diff * 0.12;

      const elapsed = now - state.unlockStartTime;
      const rawUnlock = Math.min(1, Math.max(0, elapsed / state.unlockDuration));
      state.unlockProgress = easeOutQuart(rawUnlock);

      const introTimeOffset = (1 - state.unlockProgress) * -2.2;
      const effectiveHour = state.currentTime + introTimeOffset;

      const stops = getColorsForHour(effectiveHour);
      const breath = Math.sin(now * 0.0012) * 0.018;

      const openShift = (1 - state.unlockProgress) * 0.28;
      const tiltX = Math.sin(now * 0.0007 + (1 - state.unlockProgress) * 2.5) * w * 0.08;

      const x0 = w * 0.5 - tiltX;
      const y0 = -h * openShift;
      const x1 = w * 0.5 + tiltX;
      const y1 = h * (1 + openShift * 0.65);

      const grad = ctx.createLinearGradient(x0, y0, x1, y1);

      const p0 = 0.0;
      const p1 = Math.min(0.95, Math.max(0.05, 0.27 + breath * 0.8 + openShift * 0.18));
      const p2 = Math.min(0.95, Math.max(0.10, 0.53 + breath * 1.1 + openShift * 0.12));
      const p3 = Math.min(0.98, Math.max(0.15, 0.77 - breath * 0.7 + openShift * 0.06));
      const p4 = 1.0;

      grad.addColorStop(p0, stops[0]);
      grad.addColorStop(p1, stops[1]);
      grad.addColorStop(p2, stops[2]);
      grad.addColorStop(p3, stops[3]);
      grad.addColorStop(p4, stops[4]);

      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const bloomIntensity = (1 - state.unlockProgress) * 0.32 + 0.08;
      const bloomY = h * (0.85 - (1 - state.unlockProgress) * 0.35);
      const bloomX = w * 0.5 + Math.cos(now * 0.001) * w * 0.1;
      const radial = ctx.createRadialGradient(
        bloomX,
        bloomY,
        0,
        bloomX,
        bloomY,
        Math.max(w, h) * 0.75
      );

      radial.addColorStop(
        0,
        stops[4].replace("rgb(", "rgba(").replace(")", `, ${bloomIntensity})`)
      );
      radial.addColorStop(
        0.5,
        stops[2].replace("rgb(", "rgba(").replace(")", `, ${bloomIntensity * 0.4})`)
      );
      radial.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, w, h);

      state.rafId = requestAnimationFrame(render);
    };

    animState.current.rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animState.current.rafId);
    };
  }, [enabled, getRealTimeHour]);

  if (!enabled) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none transition-opacity duration-700">
      <canvas
        ref={canvasRef}
        onClick={triggerUnlock}
        className="w-full h-full block cursor-pointer pointer-events-auto"
        title="One UI Dynamic Circadian Wallpaper (Click to re-trigger unlock bloom)"
      />
      <div className="absolute inset-0 bg-background/55 dark:bg-black/45 backdrop-blur-[0.5px] pointer-events-none transition-colors duration-500" />
    </div>
  );
}
