"use client";

import { useId } from "react";

interface GenerativeThumbnailProps {
  theme: "neon-cyan" | "lime-cyber" | "purple-matrix" | "amber-brutalism";
  title?: string;
  command?: string;
  className?: string;
  interactive?: boolean;
}

export function GenerativeThumbnail({
  theme,
  title,
  command,
  className = "w-full h-full",
  interactive = true,
}: GenerativeThumbnailProps) {
  const uniqueId = useId().replace(/:/g, "");

  if (theme === "neon-cyan") {
    // /wiki — Cyber Knowledge Matrix & Solid Pod Hub
    return (
      <div
        className={`relative overflow-hidden bg-[#0a101d] rounded-2xl flex items-center justify-center select-none group ${className}`}
      >
        {/* Background Grid & Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-blue-900/10 to-transparent" />
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf812_1px,transparent_1px),linear-gradient(to_bottom,#38bdf812_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Generative Vector Art */}
        <svg
          className="w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-cyan-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>
            <filter id={`glow-cyan-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Central Knowledge Node Network */}
          <circle cx="200" cy="120" r="48" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.4" className="animate-spin-slow" />
          <circle cx="200" cy="120" r="32" stroke={`url(#grad-cyan-${uniqueId})`} strokeWidth="2" filter={`url(#glow-cyan-${uniqueId})`} />
          <circle cx="200" cy="120" r="8" fill="#38bdf8" filter={`url(#glow-cyan-${uniqueId})`} />

          {/* Branching Nodes */}
          <line x1="200" y1="120" x2="110" y2="60" stroke="#38bdf8" strokeWidth="1.5" opacity="0.7" />
          <line x1="200" y1="120" x2="290" y2="60" stroke="#818cf8" strokeWidth="1.5" opacity="0.7" />
          <line x1="200" y1="120" x2="130" y2="180" stroke="#34d399" strokeWidth="1.5" opacity="0.7" />
          <line x1="200" y1="120" x2="270" y2="180" stroke="#c084fc" strokeWidth="1.5" opacity="0.7" />

          {/* Peripheral Node Circles */}
          <circle cx="110" cy="60" r="16" fill="#0c1a2e" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="110" cy="60" r="5" fill="#38bdf8" />
          
          <circle cx="290" cy="60" r="16" fill="#0c1a2e" stroke="#818cf8" strokeWidth="2" />
          <circle cx="290" cy="60" r="5" fill="#818cf8" />

          <circle cx="130" cy="180" r="14" fill="#0c1a2e" stroke="#34d399" strokeWidth="2" />
          <circle cx="130" cy="180" r="4" fill="#34d399" />

          <circle cx="270" cy="180" r="14" fill="#0c1a2e" stroke="#c084fc" strokeWidth="2" />
          <circle cx="270" cy="180" r="4" fill="#c084fc" />

          {/* Telemetry HUD Labels */}
          <text x="32" y="36" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
            [2-TIER: WIKI]
          </text>
          <text x="368" y="36" textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="10" fontFamily="monospace">
            LATENCY: 0.2ms
          </text>
          <text x="200" y="222" textAnchor="middle" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="3">
            ● PUBLIC MATRIX
          </text>
        </svg>

        {/* Dynamic Badge */}
        {command && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-500/40 backdrop-blur text-sky-300 font-mono text-xs font-bold tracking-wider shadow-lg shadow-sky-500/10">
            {command}
          </div>
        )}
      </div>
    );
  }

  if (theme === "lime-cyber") {
    // /presentation — Higgsfield Dark Cyber & Motion Storytelling
    return (
      <div
        className={`relative overflow-hidden bg-[#0d0f11] rounded-2xl flex items-center justify-center select-none group ${className}`}
      >
        {/* Deep Dark Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-lime-400/25 via-emerald-950/20 to-transparent" />

        {/* Cyber Diagonal Hatching */}
        <div className="absolute inset-0 opacity-15 bg-[repeating-linear-gradient(45deg,#d1fe17_0,#d1fe17_1px,transparent_0,transparent_16px)]" />

        <svg
          className="w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-lime-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d1fe17" />
              <stop offset="60%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id={`glow-lime-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Cinematic 16:9 Slide Canvas Frame */}
          <rect x="50" y="45" width="300" height="150" rx="12" fill="#121518" stroke="#d1fe17" strokeWidth="1.5" strokeOpacity="0.8" />
          <rect x="58" y="53" width="284" height="134" rx="8" fill="#090b0d" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* Dynamic Waveform Motion Stroke */}
          <path
            d="M 70 120 Q 120 70 160 120 T 250 120 T 330 110"
            stroke={`url(#grad-lime-${uniqueId})`}
            strokeWidth="3"
            fill="none"
            filter={`url(#glow-lime-${uniqueId})`}
            strokeLinecap="round"
          />

          {/* 10-Vector Matrix Marker Dots */}
          <circle cx="160" cy="120" r="5" fill="#d1fe17" filter={`url(#glow-lime-${uniqueId})`} />
          <circle cx="250" cy="120" r="5" fill="#22c55e" filter={`url(#glow-lime-${uniqueId})`} />
          <circle cx="330" cy="110" r="5" fill="#06b6d4" filter={`url(#glow-lime-${uniqueId})`} />

          {/* Presenter Teleprompter HUD Pill */}
          <rect x="75" y="148" width="110" height="24" rx="6" fill="#1b2024" stroke="#d1fe17" strokeWidth="1" strokeOpacity="0.5" />
          <text x="130" y="164" textAnchor="middle" fill="#d1fe17" fontSize="10" fontFamily="monospace" fontWeight="bold">
            HOTKEY: [S] NOTES
          </text>

          {/* Slide Indicator Dots */}
          <circle cx="290" cy="160" r="3" fill="#d1fe17" />
          <circle cx="302" cy="160" r="3" fill="rgba(255,255,255,0.2)" />
          <circle cx="314" cy="160" r="3" fill="rgba(255,255,255,0.2)" />

          {/* Corner Decals */}
          <text x="75" y="78" fill="rgba(255,255,255,0.85)" fontSize="13" fontWeight="bold" letterSpacing="1">
            1 IDEA = 1 SLIDE
          </text>
          <text x="325" y="76" textAnchor="end" fill="#d1fe17" fontSize="10" fontFamily="monospace" fontWeight="bold">
            10-VECTORS
          </text>
        </svg>

        {command && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#d1fe17]/20 border border-[#d1fe17]/50 backdrop-blur text-[#d1fe17] font-mono text-xs font-bold tracking-wider shadow-lg shadow-[#d1fe17]/10">
            {command}
          </div>
        )}
      </div>
    );
  }

  if (theme === "purple-matrix") {
    // /skill-visualizer — 16:9 Vector Flowchart & Architecture Engine
    return (
      <div
        className={`relative overflow-hidden bg-[#0f0b18] rounded-2xl flex items-center justify-center select-none group ${className}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/25 via-indigo-950/20 to-transparent" />
        
        {/* Isometric Dot Matrix */}
        <div className="absolute inset-0 bg-[radial-gradient(#c084fc20_1px,transparent_1px)] bg-[size:20px_20px]" />

        <svg
          className="w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-purple-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id={`glow-purple-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* 3 Calibrated Architecture Nodes */}
          <rect x="35" y="80" width="95" height="85" rx="8" fill="#1a1429" stroke="#c084fc" strokeWidth="1.5" />
          <text x="48" y="105" fill="#c084fc" fontSize="11" fontWeight="bold" fontFamily="monospace">01 INPUT</text>
          <rect x="48" y="118" width="70" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
          <rect x="48" y="128" width="55" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
          <rect x="48" y="138" width="62" height="4" rx="2" fill="rgba(255,255,255,0.12)" />

          {/* Vector Arrow 1 */}
          <line x1="130" y1="122" x2="152" y2="122" stroke="#c084fc" strokeWidth="2" />
          <polygon points="152,118 158,122 152,126" fill="#c084fc" />

          {/* Node 2 */}
          <rect x="160" y="70" width="105" height="105" rx="10" fill="#201735" stroke={`url(#grad-purple-${uniqueId})`} strokeWidth="2" filter={`url(#glow-purple-${uniqueId})`} />
          <text x="174" y="98" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">02 COMPILE</text>
          <rect x="174" y="112" width="76" height="5" rx="2.5" fill="#38bdf8" opacity="0.6" />
          <rect x="174" y="124" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.25)" />
          <rect x="174" y="136" width="68" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />
          <rect x="174" y="148" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.15)" />

          {/* Vector Arrow 2 */}
          <line x1="265" y1="122" x2="287" y2="122" stroke="#38bdf8" strokeWidth="2" />
          <polygon points="287,118 293,122 287,126" fill="#38bdf8" />

          {/* Node 3 */}
          <rect x="295" y="80" width="85" height="85" rx="8" fill="#1a1429" stroke="#34d399" strokeWidth="1.5" />
          <text x="307" y="105" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">03 16:9 SVG</text>
          <rect x="307" y="118" width="60" height="4" rx="2" fill="rgba(255,255,255,0.2)" />
          <rect x="307" y="128" width="48" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
          <rect x="307" y="138" width="55" height="4" rx="2" fill="rgba(255,255,255,0.12)" />

          {/* Title & Dimension Stamp */}
          <text x="200" y="42" textAnchor="middle" fill="#c084fc" fontSize="12" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
            VIEWBOX: 0 0 1600 900
          </text>
          <text x="200" y="210" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="monospace">
            DYNAMIC DENSITY SCALING MATRIX
          </text>
        </svg>

        {command && (
          <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/50 backdrop-blur text-purple-300 font-mono text-xs font-bold tracking-wider shadow-lg shadow-purple-500/10">
            {command}
          </div>
        )}
      </div>
    );
  }

  // amber-brutalism — StyleRef Generative Styles & Art Matrix
  return (
    <div
      className={`relative overflow-hidden bg-[#140e0a] rounded-2xl flex items-center justify-center select-none group ${className}`}
    >
      {/* Warm Golden Flare & Ambient Flame */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-orange-500/25 via-amber-950/20 to-transparent" />
      
      {/* Film Grain Texture Simulation */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f973160a_1px,transparent_1px),linear-gradient(to_bottom,#f973160a_1px,transparent_1px)] bg-[size:16px_16px]" />

      <svg
        className="w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-amber-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <filter id={`glow-amber-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* 4 Art Frame Tiles Mosaic */}
        <rect x="50" y="50" width="140" height="75" rx="8" fill="#241710" stroke="#f97316" strokeWidth="1.5" />
        <text x="62" y="74" fill="#fbbf24" fontSize="11" fontWeight="bold">Jakub Różalski</text>
        <text x="62" y="92" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">OIL • 1920+ MECHS</text>
        <rect x="62" y="104" width="70" height="3" rx="1.5" fill="#f97316" opacity="0.6" />

        <rect x="210" y="50" width="140" height="75" rx="8" fill="#241710" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="222" y="74" fill="#f97316" fontSize="11" fontWeight="bold">Simon Stålenhag</text>
        <text x="222" y="92" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">RETRO-FUTURISM</text>
        <rect x="222" y="104" width="60" height="3" rx="1.5" fill="#fbbf24" opacity="0.6" />

        <rect x="50" y="135" width="140" height="75" rx="8" fill="#241710" stroke="#ef4444" strokeWidth="1.5" />
        <text x="62" y="159" fill="#ef4444" fontSize="11" fontWeight="bold">Zdzisław Beksiński</text>
        <text x="62" y="177" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">COSMIC SURREALISM</text>
        <rect x="62" y="189" width="80" height="3" rx="1.5" fill="#ef4444" opacity="0.6" />

        <rect x="210" y="135" width="140" height="75" rx="8" fill="#241710" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="222" y="159" fill="#38bdf8" fontSize="11" fontWeight="bold">Blue Eye Samurai</text>
        <text x="222" y="177" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">EDO DRAMA • 2D/3D</text>
        <rect x="222" y="189" width="65" height="3" rx="1.5" fill="#38bdf8" opacity="0.6" />

        {/* Center Prompt Formula Stamp */}
        <circle cx="200" cy="130" r="22" fill="#140e0a" stroke={`url(#grad-amber-${uniqueId})`} strokeWidth="2" filter={`url(#glow-amber-${uniqueId})`} />
        <text x="200" y="134" textAnchor="middle" fill="#fbbf24" fontSize="10" fontFamily="monospace" fontWeight="bold">
          19 STYLES
        </text>

        <text x="200" y="32" textAnchor="middle" fill="#f97316" fontSize="11" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
          VISUAL PROMPT MATRIX
        </text>
      </svg>

      {command && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/50 backdrop-blur text-orange-300 font-mono text-xs font-bold tracking-wider shadow-lg shadow-orange-500/10">
          {command}
        </div>
      )}
    </div>
  );
}
