"use client";

import { useId } from "react";

interface GenerativeThumbnailProps {
  theme: "neon-cyan" | "lime-cyber" | "purple-matrix" | "amber-brutalism" | "prism-spectrum" | "emerald-terminal";
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

  // 1. NEON-CYAN — /wiki (AI-Wiki Knowledge Compiler & Cosmic AST Graph)
  if (theme === "neon-cyan") {
    return (
      <div className={`relative overflow-hidden bg-[#070c16] flex items-center justify-center select-none group ${className}`}>
        {/* Ambient Plasma Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-blue-950/15 to-transparent animate-pulse" style={{ animationDuration: "4s" }} />
        
        {/* Infinite Rotating Radar Grid */}
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
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <filter id={`glow-cyan-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <style>{`
              @keyframes rotateCw_${uniqueId} {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes rotateCcw_${uniqueId} {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
              }
              @keyframes laserPulse_${uniqueId} {
                0% { stroke-dashoffset: 40; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes corePulse_${uniqueId} {
                0%, 100% { transform: scale(1); opacity: 0.9; }
                50% { transform: scale(1.18); opacity: 1; }
              }
            `}</style>
          </defs>

          {/* Background Matrix Grid */}
          <g opacity="0.15">
            <line x1="40" y1="0" x2="40" y2="240" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="120" y1="0" x2="120" y2="240" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="200" y1="0" x2="200" y2="240" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="280" y1="0" x2="280" y2="240" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="360" y1="0" x2="360" y2="240" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="0" y1="60" x2="400" y2="60" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="0" y1="120" x2="400" y2="120" stroke="#38bdf8" strokeWidth="0.5" />
            <line x1="0" y1="180" x2="400" y2="180" stroke="#38bdf8" strokeWidth="0.5" />
          </g>

          {/* Outer Orbit Rings */}
          <g style={{ transformOrigin: "200px 120px", animation: `rotateCw_${uniqueId} 24s linear infinite` }}>
            <circle cx="200" cy="120" r="70" stroke="#38bdf8" strokeWidth="1" strokeDasharray="6 8" opacity="0.35" />
            <circle cx="270" cy="120" r="3" fill="#38bdf8" />
            <circle cx="130" cy="120" r="2.5" fill="#818cf8" />
          </g>

          <g style={{ transformOrigin: "200px 120px", animation: `rotateCcw_${uniqueId} 18s linear infinite` }}>
            <circle cx="200" cy="120" r="48" stroke={`url(#grad-cyan-${uniqueId})`} strokeWidth="1.5" strokeDasharray="12 16" opacity="0.6" />
            <circle cx="200" cy="72" r="3.5" fill="#34d399" />
            <circle cx="200" cy="168" r="3.5" fill="#38bdf8" />
          </g>

          {/* Active Data Laser Streams to Peripheral Nodes */}
          <g style={{ strokeDasharray: "6 8", animation: `laserPulse_${uniqueId} 2s linear infinite` }}>
            <line x1="200" y1="120" x2="100" y2="55" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
            <line x1="200" y1="120" x2="300" y2="55" stroke="#818cf8" strokeWidth="1.5" opacity="0.8" />
            <line x1="200" y1="120" x2="110" y2="185" stroke="#34d399" strokeWidth="1.5" opacity="0.8" />
            <line x1="200" y1="120" x2="290" y2="185" stroke="#c084fc" strokeWidth="1.5" opacity="0.8" />
          </g>

          {/* Peripheral Nodes with Glow */}
          <circle cx="100" cy="55" r="14" fill="#0b172a" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="100" cy="55" r="4" fill="#38bdf8" filter={`url(#glow-cyan-${uniqueId})`} />

          <circle cx="300" cy="55" r="14" fill="#0b172a" stroke="#818cf8" strokeWidth="1.5" />
          <circle cx="300" cy="55" r="4" fill="#818cf8" filter={`url(#glow-cyan-${uniqueId})`} />

          <circle cx="110" cy="185" r="14" fill="#0b172a" stroke="#34d399" strokeWidth="1.5" />
          <circle cx="110" cy="185" r="4" fill="#34d399" filter={`url(#glow-cyan-${uniqueId})`} />

          <circle cx="290" cy="185" r="14" fill="#0b172a" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="290" cy="185" r="4" fill="#c084fc" filter={`url(#glow-cyan-${uniqueId})`} />

          {/* Central Knowledge Core (Pulsing Heart) */}
          <g style={{ transformOrigin: "200px 120px", animation: `corePulse_${uniqueId} 3s ease-in-out infinite` }}>
            <circle cx="200" cy="120" r="24" fill="#070c16" stroke={`url(#grad-cyan-${uniqueId})`} strokeWidth="2.5" filter={`url(#glow-cyan-${uniqueId})`} />
            <circle cx="200" cy="120" r="9" fill="#38bdf8" filter={`url(#glow-cyan-${uniqueId})`} />
          </g>

          {/* Telemetry Labels */}
          <text x="32" y="32" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5">
            2-TIER AST KNOWLEDGE
          </text>
          <text x="368" y="32" textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
            LATENCY: 0.2ms
          </text>
          <text x="200" y="224" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="600" letterSpacing="2">
            ● LIVE ORBIT ENGINE
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/40 backdrop-blur-sm text-sky-300 font-mono text-[11px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 2. LIME-CYBER — /presentation (Strategic Deck & Motion Storytelling Studio)
  if (theme === "lime-cyber") {
    return (
      <div className={`relative overflow-hidden bg-[#090b0d] flex items-center justify-center select-none group ${className}`}>
        {/* Ambient Dark Neon Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-lime-400/20 via-emerald-950/15 to-transparent animate-pulse" style={{ animationDuration: "5s" }} />

        <svg
          className="w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-lime-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d1fe17" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id={`glow-lime-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <style>{`
              @keyframes waveFlow_${uniqueId} {
                0% { stroke-dashoffset: 160; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes slideBlink_${uniqueId} {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; transform: scale(1.3); }
              }
              @keyframes beamSweep_${uniqueId} {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
            `}</style>
          </defs>

          {/* Diagonal Ambient Lines */}
          <g opacity="0.08">
            <line x1="0" y1="0" x2="400" y2="240" stroke="#d1fe17" strokeWidth="1" />
            <line x1="80" y1="0" x2="480" y2="240" stroke="#d1fe17" strokeWidth="1" />
            <line x1="-80" y1="0" x2="320" y2="240" stroke="#d1fe17" strokeWidth="1" />
          </g>

          {/* 16:9 Viewport Slide Frame */}
          <rect x="45" y="40" width="310" height="160" rx="14" fill="#0f1317" stroke="#d1fe17" strokeWidth="1.5" strokeOpacity="0.8" />
          <rect x="53" y="48" width="294" height="144" rx="10" fill="#07090b" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

          {/* Living Sine Wave Oscilloscope Motion */}
          <path
            d="M 65 125 C 110 50, 150 190, 200 120 C 250 50, 290 190, 335 120"
            stroke={`url(#grad-lime-${uniqueId})`}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            filter={`url(#glow-lime-${uniqueId})`}
            style={{
              strokeDasharray: "160",
              animation: `waveFlow_${uniqueId} 4s ease-in-out infinite alternate`,
            }}
          />

          {/* 4 Interactive Slide Steps */}
          <g transform="translate(0, 0)">
            <circle cx="80" cy="120" r="5" fill="#d1fe17" filter={`url(#glow-lime-${uniqueId})`} style={{ animation: `slideBlink_${uniqueId} 2s infinite 0s`, transformOrigin: "80px 120px" }} />
            <circle cx="160" cy="120" r="5" fill="#22c55e" filter={`url(#glow-lime-${uniqueId})`} style={{ animation: `slideBlink_${uniqueId} 2s infinite 0.5s`, transformOrigin: "160px 120px" }} />
            <circle cx="240" cy="120" r="5" fill="#38bdf8" filter={`url(#glow-lime-${uniqueId})`} style={{ animation: `slideBlink_${uniqueId} 2s infinite 1s`, transformOrigin: "240px 120px" }} />
            <circle cx="320" cy="120" r="5" fill="#a855f7" filter={`url(#glow-lime-${uniqueId})`} style={{ animation: `slideBlink_${uniqueId} 2s infinite 1.5s`, transformOrigin: "320px 120px" }} />
          </g>

          {/* Slide Deck Decals & Teleprompter Hotkey */}
          <text x="68" y="70" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold" letterSpacing="1">
            1 IDEA = 1 SLIDE
          </text>
          <text x="330" y="70" textAnchor="end" fill="#d1fe17" fontSize="10" fontFamily="monospace" fontWeight="bold">
            10-VECTORS
          </text>

          {/* Hotkey Tag */}
          <rect x="68" y="156" width="105" height="22" rx="6" fill="#141a1f" stroke="#d1fe17" strokeWidth="1" strokeOpacity="0.6" />
          <text x="120" y="171" textAnchor="middle" fill="#d1fe17" fontSize="9" fontFamily="monospace" fontWeight="bold">
            HOTKEY: [S] NOTES
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-lime-400/20 border border-lime-400/50 backdrop-blur-sm text-lime-300 font-mono text-[11px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 3. PURPLE-MATRIX — /skill-visualizer (16:9 Vector Flowchart & Architecture Engine)
  if (theme === "purple-matrix") {
    return (
      <div className={`relative overflow-hidden bg-[#0c0816] flex items-center justify-center select-none group ${className}`}>
        {/* Ambient Purple Ray */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/20 via-indigo-950/20 to-transparent" />

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
            <style>{`
              @keyframes arrowDash_${uniqueId} {
                0% { stroke-dashoffset: 24; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes nodeGlow_${uniqueId} {
                0%, 100% { stroke-opacity: 0.6; }
                50% { stroke-opacity: 1; filter: drop-shadow(0 0 6px rgba(192, 132, 252, 0.7)); }
              }
            `}</style>
          </defs>

          {/* 3 Architecture Milestone Nodes */}
          <g>
            {/* Node 1: Input */}
            <rect x="35" y="80" width="95" height="85" rx="10" fill="#171126" stroke="#c084fc" strokeWidth="1.5" style={{ animation: `nodeGlow_${uniqueId} 3s infinite 0s` }} />
            <text x="48" y="105" fill="#c084fc" fontSize="11" fontWeight="bold" fontFamily="monospace">01 INPUT</text>
            <rect x="48" y="118" width="70" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
            <rect x="48" y="128" width="55" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x="48" y="138" width="62" height="4" rx="2" fill="rgba(255,255,255,0.15)" />

            {/* Vector Connector 1 */}
            <line x1="130" y1="122" x2="155" y2="122" stroke="#c084fc" strokeWidth="2" strokeDasharray="4 4" style={{ animation: `arrowDash_${uniqueId} 1s linear infinite` }} />
            <polygon points="155,118 162,122 155,126" fill="#c084fc" />

            {/* Node 2: Compile Engine */}
            <rect x="162" y="70" width="105" height="105" rx="12" fill="#1f1633" stroke={`url(#grad-purple-${uniqueId})`} strokeWidth="2" filter={`url(#glow-purple-${uniqueId})`} style={{ animation: `nodeGlow_${uniqueId} 3s infinite 1s` }} />
            <text x="176" y="98" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">02 COMPILE</text>
            <rect x="176" y="112" width="76" height="5" rx="2.5" fill="#38bdf8" opacity="0.7" />
            <rect x="176" y="124" width="60" height="5" rx="2.5" fill="rgba(255,255,255,0.3)" />
            <rect x="176" y="136" width="68" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />
            <rect x="176" y="148" width="50" height="5" rx="2.5" fill="rgba(255,255,255,0.2)" />

            {/* Vector Connector 2 */}
            <line x1="267" y1="122" x2="292" y2="122" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" style={{ animation: `arrowDash_${uniqueId} 1s linear infinite` }} />
            <polygon points="292,118 299,122 292,126" fill="#38bdf8" />

            {/* Node 3: 16:9 Output */}
            <rect x="299" y="80" width="85" height="85" rx="10" fill="#171126" stroke="#34d399" strokeWidth="1.5" style={{ animation: `nodeGlow_${uniqueId} 3s infinite 2s` }} />
            <text x="311" y="105" fill="#34d399" fontSize="11" fontWeight="bold" fontFamily="monospace">03 16:9 SVG</text>
            <rect x="311" y="118" width="60" height="4" rx="2" fill="rgba(255,255,255,0.25)" />
            <rect x="311" y="128" width="48" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x="311" y="138" width="55" height="4" rx="2" fill="rgba(255,255,255,0.15)" />
          </g>

          {/* Canvas Decals */}
          <text x="200" y="38" textAnchor="middle" fill="#c084fc" fontSize="11" fontFamily="monospace" fontWeight="bold" letterSpacing="2">
            VIEWBOX: 0 0 1600 900
          </text>
          <text x="200" y="214" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="monospace">
            DYNAMIC DENSITY SCALING MATRIX
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/50 backdrop-blur-sm text-purple-300 font-mono text-[11px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 4. AMBER-BRUTALISM — StyleRef (Generative Visual Styles & Prompt DB)
  if (theme === "amber-brutalism") {
    return (
      <div className={`relative overflow-hidden bg-[#110c08] flex items-center justify-center select-none group ${className}`}>
        {/* 4 Art Frame Tiles with Subtle Ken-Burns Drift */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1.5 opacity-80 group-hover:opacity-95 transition-opacity">
          <div 
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5 transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{ backgroundImage: "url('/styleref/img_01.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white/90 font-bold bg-black/70 px-1 rounded">
              Różalski
            </span>
          </div>
          <div 
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5 transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{ backgroundImage: "url('/styleref/img_02.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white/90 font-bold bg-black/70 px-1 rounded">
              Stålenhag
            </span>
          </div>
          <div 
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5 transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{ backgroundImage: "url('/styleref/img_04.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white/90 font-bold bg-black/70 px-1 rounded">
              Beksiński
            </span>
          </div>
          <div 
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5 transition-transform duration-1000 ease-out group-hover:scale-105"
            style={{ backgroundImage: "url('/styleref/img_13.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white/90 font-bold bg-black/70 px-1 rounded">
              Blue Eye Samurai
            </span>
          </div>
        </div>

        {/* Amber Center Glow Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/25 via-black/40 to-black/85 pointer-events-none" />

        <svg
          className="w-full h-full absolute inset-0 pointer-events-none"
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
            <style>{`
              @keyframes rotateSun_${uniqueId} {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </defs>

          {/* Rotating Compass Ring */}
          <g style={{ transformOrigin: "200px 120px", animation: `rotateSun_${uniqueId} 30s linear infinite` }}>
            <circle cx="200" cy="120" r="38" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 6" opacity="0.5" />
          </g>

          {/* Center Stamp Badge */}
          <rect x="135" y="98" width="130" height="44" rx="12" fill="#140e0a" fillOpacity="0.95" stroke={`url(#grad-amber-${uniqueId})`} strokeWidth="1.5" filter={`url(#glow-amber-${uniqueId})`} />
          <text x="200" y="117" textAnchor="middle" fill="#fbbf24" fontSize="12" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
            19 STYLES DB
          </text>
          <text x="200" y="132" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="monospace">
            PROMPT MATRIX
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-orange-500/30 border border-orange-500/60 backdrop-blur-md text-orange-300 font-mono text-[11px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 5. PRISM-SPECTRUM — /design-md-generator (DESIGN.md Token Architecture & OKLCH)
  if (theme === "prism-spectrum") {
    return (
      <div className={`relative overflow-hidden bg-[#0a0e14] flex items-center justify-center select-none group ${className}`}>
        {/* Shifting Prism Spectrum Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/15 via-purple-900/15 to-transparent animate-pulse" style={{ animationDuration: "6s" }} />

        <svg
          className="w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-prism-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="25%" stopColor="#818cf8" />
              <stop offset="50%" stopColor="#c084fc" />
              <stop offset="75%" stopColor="#f43f5e" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
            <filter id={`glow-prism-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <style>{`
              @keyframes barShift_${uniqueId} {
                0%, 100% { width: 140px; }
                50% { width: 180px; }
              }
              @keyframes swatchPulse_${uniqueId} {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.15); }
              }
            `}</style>
          </defs>

          {/* Living Typography Hierarchy Equalizer Bars */}
          <g transform="translate(60, 60)">
            {/* H1 Token Bar */}
            <text x="0" y="16" fill="#38bdf8" fontSize="11" fontFamily="monospace" fontWeight="bold">H1: 3.5rem</text>
            <rect x="90" y="6" width="160" height="12" rx="4" fill="#38bdf8" opacity="0.8" style={{ animation: `barShift_${uniqueId} 3s ease-in-out infinite alternate` }} />

            {/* H2 Token Bar */}
            <text x="0" y="42" fill="#818cf8" fontSize="10" fontFamily="monospace" fontWeight="bold">H2: 2.2rem</text>
            <rect x="90" y="32" width="130" height="10" rx="4" fill="#818cf8" opacity="0.7" style={{ animation: `barShift_${uniqueId} 3.5s ease-in-out infinite alternate` }} />

            {/* Body Token Bar */}
            <text x="0" y="66" fill="#c084fc" fontSize="10" fontFamily="monospace" fontWeight="bold">Body: 1rem</text>
            <rect x="90" y="58" width="105" height="8" rx="4" fill="#c084fc" opacity="0.6" style={{ animation: `barShift_${uniqueId} 4s ease-in-out infinite alternate` }} />
          </g>

          {/* Color Token Swatches (Living Palette) */}
          <g transform="translate(60, 150)">
            <rect x="0" y="0" width="48" height="32" rx="8" fill="#38bdf8" filter={`url(#glow-prism-${uniqueId})`} style={{ transformOrigin: "24px 16px", animation: `swatchPulse_${uniqueId} 2.5s infinite 0s` }} />
            <rect x="58" y="0" width="48" height="32" rx="8" fill="#818cf8" filter={`url(#glow-prism-${uniqueId})`} style={{ transformOrigin: "82px 16px", animation: `swatchPulse_${uniqueId} 2.5s infinite 0.5s` }} />
            <rect x="116" y="0" width="48" height="32" rx="8" fill="#c084fc" filter={`url(#glow-prism-${uniqueId})`} style={{ transformOrigin: "140px 16px", animation: `swatchPulse_${uniqueId} 2.5s infinite 1s` }} />
            <rect x="174" y="0" width="48" height="32" rx="8" fill="#f43f5e" filter={`url(#glow-prism-${uniqueId})`} style={{ transformOrigin: "198px 16px", animation: `swatchPulse_${uniqueId} 2.5s infinite 1.5s` }} />
            <rect x="232" y="0" width="48" height="32" rx="8" fill="#10b981" filter={`url(#glow-prism-${uniqueId})`} style={{ transformOrigin: "256px 16px", animation: `swatchPulse_${uniqueId} 2.5s infinite 2s` }} />
          </g>

          {/* Decal */}
          <text x="200" y="216" textAnchor="middle" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" letterSpacing="1.5">
            YAML TOKENS + DESIGN RATIONALE
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/50 backdrop-blur-sm text-cyan-300 font-mono text-[11px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 6. EMERALD-TERMINAL — /end (End-of-Session Ritual & Living Memory Keeper)
  return (
    <div className={`relative overflow-hidden bg-[#07120a] flex items-center justify-center select-none group ${className}`}>
      {/* Terminal Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e10_1px,transparent_1px),linear-gradient(to_bottom,#22c55e10_1px,transparent_1px)] bg-[size:20px_20px]" />

      <svg
        className="w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`grad-emerald-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id={`glow-emerald-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <style>{`
            @keyframes scanLine_${uniqueId} {
              0% { transform: translateY(35px); opacity: 0.2; }
              50% { opacity: 0.9; }
              100% { transform: translateY(195px); opacity: 0.2; }
            }
            @keyframes stepCheck_${uniqueId} {
              0%, 100% { fill: #10b981; }
              50% { fill: #22c55e; filter: drop-shadow(0 0 6px #22c55e); }
            }
          `}</style>
        </defs>

        {/* Terminal Frame Window */}
        <rect x="40" y="35" width="320" height="165" rx="12" fill="#0b1c10" stroke="#22c55e" strokeWidth="1.5" strokeOpacity="0.8" />
        <rect x="48" y="43" width="304" height="149" rx="8" fill="#040c06" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />

        {/* Terminal Header */}
        <circle cx="62" cy="55" r="3.5" fill="#ef4444" />
        <circle cx="74" cy="55" r="3.5" fill="#fbbf24" />
        <circle cx="86" cy="55" r="3.5" fill="#22c55e" />
        <text x="110" y="59" fill="#22c55e" fontSize="10" fontFamily="monospace" fontWeight="bold">
          SESSION_RITUAL // HARNESS
        </text>

        {/* 4 Execution Checkpoints */}
        <g transform="translate(65, 80)">
          <circle cx="6" cy="6" r="4.5" fill="#22c55e" style={{ animation: `stepCheck_${uniqueId} 2s infinite 0s` }} />
          <text x="20" y="10" fill="#e5e5e5" fontSize="11" fontFamily="monospace">PHASE 0: COMPLETION GATE</text>

          <circle cx="6" cy="30" r="4.5" fill="#22c55e" style={{ animation: `stepCheck_${uniqueId} 2s infinite 0.5s` }} />
          <text x="20" y="34" fill="#e5e5e5" fontSize="11" fontFamily="monospace">PHASE 1: AUDIT &amp; RETRO</text>

          <circle cx="6" cy="54" r="4.5" fill="#22c55e" style={{ animation: `stepCheck_${uniqueId} 2s infinite 1s` }} />
          <text x="20" y="58" fill="#e5e5e5" fontSize="11" fontFamily="monospace">PHASE 2: MEMORY PERSIST</text>

          <circle cx="6" cy="78" r="4.5" fill="#22c55e" style={{ animation: `stepCheck_${uniqueId} 2s infinite 1.5s` }} />
          <text x="20" y="82" fill="#22c55e" fontSize="11" fontFamily="monospace" fontWeight="bold">PHASE 3: GIT PUSH [SAFE]</text>
        </g>

        {/* Scanning Laser Beam Motion */}
        <line
          x1="48"
          y1="0"
          x2="352"
          y2="0"
          stroke="#22c55e"
          strokeWidth="2"
          filter={`url(#glow-emerald-${uniqueId})`}
          style={{ animation: `scanLine_${uniqueId} 3.5s ease-in-out infinite alternate` }}
        />

        {/* Status Decal */}
        <text x="330" y="178" textAnchor="end" fill="#22c55e" fontSize="9" fontFamily="monospace" fontWeight="bold">
          READY TO COMMIT ●
        </text>
      </svg>

      {command && (
        <div className="absolute top-3 left-3 z-10 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-sm text-emerald-300 font-mono text-[11px] font-bold">
          {command}
        </div>
      )}
    </div>
  );
}
