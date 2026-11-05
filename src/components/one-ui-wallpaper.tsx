"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface Keyframe {
  hour: number;
  stops: [string, string, string, string, string];
}

/**
 * Палитра One UI Dynamic Wallpaper по времени суток (0.0 — 24.0 часа).
 * Значение 18.5 (вечер/закат) повторяет карточку Dynamic со скриншота One UI:
 * Верх: #256AE5 -> #5E7CE2 -> #9E78C9 -> #CF7E8E -> Низ: #E88D67
 */
const KEYFRAMES: Keyframe[] = [
  {
    // 00:00 — Глубокая ночь (Night: Purples and dark blues)
    hour: 0.0,
    stops: ["#080B1E", "#13183F", "#251E52", "#3B2562", "#4D2E66"],
  },
  {
    // 04:30 — Предрассветные сумерки
    hour: 4.5,
    stops: ["#121C4E", "#26357A", "#4F4B94", "#7E5A9B", "#B06E94"],
  },
  {
    // 07:30 — Утро (Morning: Soft blue shades & gentle sunrise warmth)
    hour: 7.5,
    stops: ["#3876F2", "#5C93F8", "#89A8F9", "#C6B4EE", "#F3BC9C"],
  },
  {
    // 13:00 — День (Afternoon: Bright greens and blues)
    hour: 13.0,
    stops: ["#0D5CE8", "#1C82F6", "#28A9F4", "#3DC9E8", "#68E3D4"],
  },
  {
    // 16:30 — Ранний вечер (Переход к тёплым тонам)
    hour: 16.5,
    stops: ["#1D65EC", "#4283F0", "#7E87DE", "#B987BA", "#E59580"],
  },
  {
    // 18:30 — Вечер / Закат (Эталонный Dynamic из One UI)
    hour: 18.5,
    stops: ["#256AE5", "#5E7CE2", "#9E78C9", "#CF7E8E", "#E88D67"],
  },
  {
    // 21:00 — Поздние сумерки (Dusk: Deepening purples & indigo)
    hour: 21.0,
    stops: ["#11194A", "#292968", "#523479", "#7C407B", "#9D526E"],
  },
  {
    // 24:00 — Замыкание суточного цикла
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

function formatHour(hour: number): string {
  const normalized = ((hour % 24) + 24) % 24;
  const h = Math.floor(normalized);
  const m = Math.floor((normalized - h) * 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function getPhaseLabel(hour: number): string {
  const h = ((hour % 24) + 24) % 24;
  if (h >= 23 || h < 4.5) return "Night";
  if (h >= 4.5 && h < 6.5) return "Dawn";
  if (h >= 6.5 && h < 11.5) return "Morning";
  if (h >= 11.5 && h < 15.5) return "Noon";
  if (h >= 15.5 && h < 18.0) return "Golden Hour";
  if (h >= 18.0 && h < 20.5) return "Sunset";
  return "Dusk";
}

interface OneUiWallpaperProps {
  initialHour?: number;
  showControls?: boolean;
}

export function OneUiWallpaper({
  initialHour,
  showControls = true,
}: OneUiWallpaperProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Определение реального текущего времени суток (часы + доли)
  const getRealTimeHour = useCallback(() => {
    const now = new Date();
    return now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
  }, []);

  const [sliderTime, setSliderTime] = useState<number>(() => initialHour ?? 18.5);
  const [isAutoTime, setIsAutoTime] = useState<boolean>(initialHour === undefined);
  const [displayTime, setDisplayTime] = useState<string>("18:30");
  const [phaseLabel, setPhaseLabel] = useState<string>("Sunset");

  // Внутренние ссылки анимации (избегаем лишних ререндеров React внутри rAF)
  const animState = useRef({
    targetTime: initialHour ?? 18.5,
    currentTime: initialHour ?? 18.5,
    unlockStartTime: 0,
    unlockDuration: 1900,
    unlockProgress: 0,
    isAutoTime: initialHour === undefined,
    rafId: 0,
  });

  // Запуск фирменного перелива открытия / разблокировки One UI
  const triggerUnlock = useCallback(() => {
    animState.current.unlockStartTime = performance.now();
    animState.current.unlockProgress = 0;
  }, []);

  // Инициализация времени при монтировании
  useEffect(() => {
    if (initialHour === undefined) {
      const realHour = getRealTimeHour();
      animState.current.targetTime = realHour;
      animState.current.currentTime = realHour;
      setSliderTime(realHour);
      setDisplayTime(formatHour(realHour));
      setPhaseLabel(getPhaseLabel(realHour));
    }
  }, [initialHour, getRealTimeHour]);

  // Главный цикл Canvas
  useEffect(() => {
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

    // Запуск анимации открытия
    animState.current.unlockStartTime = performance.now();
    animState.current.unlockProgress = 0;

    let lastMinuteTick = Date.now();

    const render = (now: number) => {
      const state = animState.current;
      const w = canvas.width;
      const h = canvas.height;

      // Автообновление реального времени раз в минуту, если включён авто-режим
      if (state.isAutoTime && now - lastMinuteTick > 15000) {
        lastMinuteTick = now;
        const real = getRealTimeHour();
        state.targetTime = real;
      }

      // Плавная инерция ползунка / смены времени
      const diff = state.targetTime - state.currentTime;
      state.currentTime += diff * 0.12;

      // Прогресс анимации открытия (Unlock Bloom)
      const elapsed = now - state.unlockStartTime;
      const rawUnlock = Math.min(1, Math.max(0, elapsed / state.unlockDuration));
      state.unlockProgress = easeOutQuart(rawUnlock);

      // Во время открытия градиент делает сдвиг во времени назад на -2.2ч и "нагоняет"
      const introTimeOffset = (1 - state.unlockProgress) * -2.2;
      const effectiveHour = state.currentTime + introTimeOffset;

      // Текущие 5 цветов One UI
      const stops = getColorsForHour(effectiveHour);

      // Едва уловимое непрерывное "дыхание" живых обоев
      const breath = Math.sin(now * 0.0012) * 0.018;

      // Эффект волны и растяжения при открытии
      const openShift = (1 - state.unlockProgress) * 0.28;
      const tiltX = Math.sin(now * 0.0007 + (1 - state.unlockProgress) * 2.5) * w * 0.08;

      // Построение линейного градиента
      const x0 = w * 0.5 - tiltX;
      const y0 = -h * openShift;
      const x1 = w * 0.5 + tiltX;
      const y1 = h * (1 + openShift * 0.65);

      const grad = ctx.createLinearGradient(x0, y0, x1, y1);

      // Позиции узлов со смещением и эластичной волной
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

      // Мягкое радиальное свечение (Ambient Bloom) при открытии и в idle
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
  }, [getRealTimeHour]);

  // Обработчик ползунка времени
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setSliderTime(val);
    setIsAutoTime(false);
    animState.current.isAutoTime = false;
    animState.current.targetTime = val;
    setDisplayTime(formatHour(val));
    setPhaseLabel(getPhaseLabel(val));
  };

  // Возврат к реальному времени системы
  const handleResetToRealTime = () => {
    const real = getRealTimeHour();
    setIsAutoTime(true);
    animState.current.isAutoTime = true;
    animState.current.targetTime = real;
    setSliderTime(real);
    setDisplayTime(formatHour(real));
    setPhaseLabel(getPhaseLabel(real));
    triggerUnlock();
  };

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Canvas динамического градиента One UI */}
      <canvas
        ref={canvasRef}
        onClick={triggerUnlock}
        className="w-full h-full block cursor-pointer pointer-events-auto"
        title="Click to trigger One UI Unlock Bloom"
      />

      {/* Тончайшая вуаль (scrim) для гарантированного контраста текста сайта */}
      <div className="absolute inset-0 bg-background/55 dark:bg-black/45 backdrop-blur-[0.5px] pointer-events-none transition-colors duration-500" />

      {/* Минималистичный контроллер внизу страницы */}
      {showControls && (
        <div className="fixed bottom-5 left-0 right-0 flex flex-col items-center gap-1.5 pointer-events-none z-30">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 dark:bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-tight text-white/80 pointer-events-auto shadow-sm">
            <button
              type="button"
              onClick={triggerUnlock}
              title="Replay unlock animation"
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>One UI 9 Dynamic</span>
            </button>
            <span className="text-white/30">•</span>
            <span className="tabular-nums font-semibold text-white">{displayTime}</span>
            <span className="text-white/40">({phaseLabel})</span>
            {isAutoTime ? (
              <span className="px-1.5 py-0.2 rounded text-[9px] bg-white/15 text-white/90 uppercase tracking-widest font-sans">
                Live
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResetToRealTime}
                className="text-[10px] text-blue-400 hover:text-blue-300 underline underline-offset-2 ml-1 cursor-pointer"
              >
                Sync Live
              </button>
            )}
          </div>

          <div className="pointer-events-auto flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="24"
              step="0.05"
              value={sliderTime}
              onChange={handleSliderChange}
              aria-label="One UI Dynamic Wallpaper Time of Day"
              className="w-56 sm:w-80 h-[3px] accent-white/80 bg-white/20 hover:bg-white/30 rounded-full cursor-grab active:cursor-grabbing transition-all opacity-40 hover:opacity-100 focus:opacity-100"
            />
          </div>
        </div>
      )}
    </div>
  );
}
