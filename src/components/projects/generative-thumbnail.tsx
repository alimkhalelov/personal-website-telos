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

  // 1. NEON-CYAN: /wiki — Lottie Cosmic Knowledge Graph (Calm Harmonic Orbit & AST Links)
  if (theme === "neon-cyan") {
    return (
      <div className={`relative overflow-hidden bg-[#090D14] flex items-center justify-center select-none group ${className}`}>
        {/* Ambient Layer: Deep Oceanic Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_var(--tw-gradient-stops))] from-sky-500/12 via-blue-950/20 to-transparent" />
        
        {/* Subtle Static Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf808_1px,transparent_1px),linear-gradient(to_bottom,#38bdf808_1px,transparent_1px)] bg-[size:28px_28px]" />

        <svg
          className="w-full h-full absolute inset-0"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-wiki-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <filter id={`glow-wiki-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <style>{`
              @keyframes orbitSpin1_${uniqueId} {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
              @keyframes orbitSpin2_${uniqueId} {
                from { transform: rotate(360deg); }
                to { transform: rotate(0deg); }
              }
              @keyframes breatheCore_${uniqueId} {
                0%, 100% { transform: scale(1); opacity: 0.85; }
                50% { transform: scale(1.12); opacity: 1; }
              }
              @keyframes dashStream_${uniqueId} {
                0% { stroke-dashoffset: 48; }
                100% { stroke-dashoffset: 0; }
              }
              @keyframes nodeDrift_${uniqueId} {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-4px); }
              }
            `}</style>
          </defs>

          {/* Secondary Layer: Smooth Orbital Concentric Circles */}
          <g style={{ transformOrigin: "200px 120px", animation: `orbitSpin1_${uniqueId} 32s linear infinite` }}>
            <circle cx="200" cy="120" r="75" stroke="#38bdf8" strokeWidth="1" strokeDasharray="4 8" opacity="0.25" />
            <circle cx="275" cy="120" r="2.5" fill="#38bdf8" opacity="0.8" />
            <circle cx="125" cy="120" r="2" fill="#818cf8" opacity="0.6" />
          </g>

          <g style={{ transformOrigin: "200px 120px", animation: `orbitSpin2_${uniqueId} 24s linear infinite` }}>
            <circle cx="200" cy="120" r="50" stroke="#818cf8" strokeWidth="1" strokeDasharray="6 10" opacity="0.35" />
            <circle cx="200" cy="70" r="3" fill="#a855f7" opacity="0.9" />
            <circle cx="200" cy="170" r="2.5" fill="#38bdf8" opacity="0.7" />
          </g>

          {/* Primary Layer: Animated AST Relational Graph Links */}
          <g opacity="0.6" style={{ strokeDasharray: "4 6", animation: `dashStream_${uniqueId} 3s linear infinite` }}>
            <line x1="200" y1="120" x2="95" y2="60" stroke="#38bdf8" strokeWidth="1.2" />
            <line x1="200" y1="120" x2="305" y2="60" stroke="#818cf8" strokeWidth="1.2" />
            <line x1="200" y1="120" x2="110" y2="180" stroke="#6366f1" strokeWidth="1.2" />
            <line x1="200" y1="120" x2="290" y2="180" stroke="#a855f7" strokeWidth="1.2" />
          </g>

          {/* Graph Nodes */}
          <g style={{ animation: `nodeDrift_${uniqueId} 4s ease-in-out infinite` }}>
            {/* Node 1 */}
            <circle cx="95" cy="60" r="12" fill="#0c1524" stroke="#38bdf8" strokeWidth="1.2" />
            <circle cx="95" cy="60" r="3.5" fill="#38bdf8" />

            {/* Node 2 */}
            <circle cx="305" cy="60" r="12" fill="#0c1524" stroke="#818cf8" strokeWidth="1.2" />
            <circle cx="305" cy="60" r="3.5" fill="#818cf8" />

            {/* Node 3 */}
            <circle cx="110" cy="180" r="12" fill="#0c1524" stroke="#6366f1" strokeWidth="1.2" />
            <circle cx="110" cy="180" r="3.5" fill="#6366f1" />

            {/* Node 4 */}
            <circle cx="290" cy="180" r="12" fill="#0c1524" stroke="#a855f7" strokeWidth="1.2" />
            <circle cx="290" cy="180" r="3.5" fill="#a855f7" />
          </g>

          {/* Primary Focal Hero: Central Living Knowledge Core */}
          <g style={{ transformOrigin: "200px 120px", animation: `breatheCore_${uniqueId} 3.5s ease-in-out infinite` }}>
            <circle cx="200" cy="120" r="22" fill="#090D14" stroke={`url(#grad-wiki-${uniqueId})`} strokeWidth="2" filter={`url(#glow-wiki-${uniqueId})`} />
            <circle cx="200" cy="120" r="7" fill="#38bdf8" filter={`url(#glow-wiki-${uniqueId})`} />
          </g>

          {/* Minimalist Micro-Typography */}
          <text x="32" y="32" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="1.5">
            AST KNOWLEDGE GRAPH
          </text>
          <text x="368" y="32" textAnchor="end" fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="monospace">
            2-TIER
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 font-mono text-[10px] font-medium tracking-wide">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 2. LIME-CYBER: /presentation — Lottie Motion Studio (Fluid Morphing Ribbon Wave & Slide Pacing)
  if (theme === "lime-cyber") {
    return (
      <div className={`relative overflow-hidden bg-[#0A0D0E] flex items-center justify-center select-none group ${className}`}>
        {/* Ambient Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-lime-500/10 via-emerald-950/15 to-transparent" />

        <svg
          className="w-full h-full absolute inset-0"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-pres-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d1fe17" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <filter id={`glow-pres-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <style>{`
              @keyframes morphWave1_${uniqueId} {
                0%, 100% {
                  d: path("M 60 120 C 110 70, 150 170, 200 120 C 250 70, 290 170, 340 120");
                }
                50% {
                  d: path("M 60 120 C 110 160, 150 80, 200 120 C 250 160, 290 80, 340 120");
                }
              }
              @keyframes stepSequence_${uniqueId} {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.3); }
              }
            `}</style>
          </defs>

          {/* Slide Viewport Canvas Frame */}
          <rect x="45" y="42" width="310" height="156" rx="14" fill="#0E1316" stroke="rgba(209,254,23,0.3)" strokeWidth="1" />
          <rect x="52" y="49" width="296" height="142" rx="10" fill="#070A0B" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

          {/* Primary Focal Hero: Fluid Morphing Ribbon Wave */}
          <path
            d="M 60 120 C 110 70, 150 170, 200 120 C 250 70, 290 170, 340 120"
            stroke={`url(#grad-pres-${uniqueId})`}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            filter={`url(#glow-pres-${uniqueId})`}
            style={{
              animation: `morphWave1_${uniqueId} 5s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
            }}
          />

          {/* Secondary Layer: 4 Synchronized Narrative Beats */}
          <g>
            <circle cx="85" cy="120" r="4.5" fill="#d1fe17" filter={`url(#glow-pres-${uniqueId})`} style={{ transformOrigin: "85px 120px", animation: `stepSequence_${uniqueId} 3s ease-in-out infinite 0s` }} />
            <circle cx="160" cy="120" r="4.5" fill="#22c55e" filter={`url(#glow-pres-${uniqueId})`} style={{ transformOrigin: "160px 120px", animation: `stepSequence_${uniqueId} 3s ease-in-out infinite 0.75s` }} />
            <circle cx="240" cy="120" r="4.5" fill="#14b8a6" filter={`url(#glow-pres-${uniqueId})`} style={{ transformOrigin: "240px 120px", animation: `stepSequence_${uniqueId} 3s ease-in-out infinite 1.5s` }} />
            <circle cx="315" cy="120" r="4.5" fill="#06b6d4" filter={`url(#glow-pres-${uniqueId})`} style={{ transformOrigin: "315px 120px", animation: `stepSequence_${uniqueId} 3s ease-in-out infinite 2.25s` }} />
          </g>

          {/* Minimalist Editorial Decals */}
          <text x="68" y="70" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="600" letterSpacing="0.8">
            1 IDEA = 1 SLIDE
          </text>
          <text x="332" y="70" textAnchor="end" fill="#d1fe17" fontSize="9" fontFamily="monospace" fontWeight="600">
            10-VECTORS
          </text>
          <text x="68" y="172" fill="#d1fe17" fontSize="8.5" fontFamily="monospace" opacity="0.9">
            HOTKEY: [S] NOTES
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-lime-400/10 border border-lime-400/30 text-lime-300 font-mono text-[10px] font-medium tracking-wide">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 3. PURPLE-MATRIX: /skill-visualizer — Lottie Vector Architecture Blueprint (Harmonic Node Pulse)
  if (theme === "purple-matrix") {
    return (
      <div className={`relative overflow-hidden bg-[#0B0813] flex items-center justify-center select-none group ${className}`}>
        {/* Ambient Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-indigo-950/15 to-transparent" />

        <svg
          className="w-full h-full absolute inset-0"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-vis-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc" />
              <stop offset="50%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <filter id={`glow-vis-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <style>{`
              @keyframes borderPulse_${uniqueId} {
                0%, 100% { stroke-opacity: 0.35; }
                50% { stroke-opacity: 0.85; }
              }
              @keyframes lineFlow_${uniqueId} {
                0% { stroke-dashoffset: 16; }
                100% { stroke-dashoffset: 0; }
              }
            `}</style>
          </defs>

          {/* 3 Architecture Blueprint Milestone Cards */}
          <g>
            {/* Card 01 */}
            <rect x="38" y="82" width="94" height="82" rx="10" fill="#130E20" stroke="#c084fc" strokeWidth="1" style={{ animation: `borderPulse_${uniqueId} 3.5s ease-in-out infinite 0s` }} />
            <text x="50" y="104" fill="#c084fc" fontSize="10" fontWeight="bold" fontFamily="monospace">01 INPUT</text>
            <rect x="50" y="116" width="68" height="3.5" rx="1.5" fill="rgba(255,255,255,0.2)" />
            <rect x="50" y="125" width="52" height="3.5" rx="1.5" fill="rgba(255,255,255,0.12)" />
            <rect x="50" y="134" width="60" height="3.5" rx="1.5" fill="rgba(255,255,255,0.12)" />

            {/* Connecting Vector Arrow 1 */}
            <line x1="132" y1="123" x2="158" y2="123" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: `lineFlow_${uniqueId} 1.5s linear infinite` }} />
            <polygon points="158,119 164,123 158,127" fill="#c084fc" />

            {/* Card 02: Central Engine */}
            <rect x="164" y="72" width="102" height="102" rx="12" fill="#181129" stroke={`url(#grad-vis-${uniqueId})`} strokeWidth="1.5" filter={`url(#glow-vis-${uniqueId})`} style={{ animation: `borderPulse_${uniqueId} 3.5s ease-in-out infinite 1s` }} />
            <text x="178" y="98" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="monospace">02 COMPILE</text>
            <rect x="178" y="111" width="74" height="4.5" rx="2" fill="#38bdf8" opacity="0.6" />
            <rect x="178" y="122" width="58" height="4.5" rx="2" fill="rgba(255,255,255,0.25)" />
            <rect x="178" y="133" width="66" height="4.5" rx="2" fill="rgba(255,255,255,0.15)" />
            <rect x="178" y="144" width="48" height="4.5" rx="2" fill="rgba(255,255,255,0.15)" />

            {/* Connecting Vector Arrow 2 */}
            <line x1="266" y1="123" x2="292" y2="123" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" style={{ animation: `lineFlow_${uniqueId} 1.5s linear infinite` }} />
            <polygon points="292,119 298,123 292,127" fill="#38bdf8" />

            {/* Card 03 */}
            <rect x="298" y="82" width="86" height="82" rx="10" fill="#130E20" stroke="#38bdf8" strokeWidth="1" style={{ animation: `borderPulse_${uniqueId} 3.5s ease-in-out infinite 2s` }} />
            <text x="310" y="104" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="monospace">03 16:9 SVG</text>
            <rect x="310" y="116" width="60" height="3.5" rx="1.5" fill="rgba(255,255,255,0.2)" />
            <rect x="310" y="125" width="46" height="3.5" rx="1.5" fill="rgba(255,255,255,0.12)" />
            <rect x="310" y="134" width="54" height="3.5" rx="1.5" fill="rgba(255,255,255,0.12)" />
          </g>

          {/* Blueprint Coordinates */}
          <text x="200" y="40" textAnchor="middle" fill="#c084fc" fontSize="9.5" fontFamily="monospace" fontWeight="600" letterSpacing="1.5">
            VIEWBOX: 0 0 1600 900
          </text>
          <text x="200" y="210" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8.5" fontFamily="monospace">
            DYNAMIC DENSITY SCALING MATRIX
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[10px] font-medium tracking-wide">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 4. AMBER-BRUTALISM: StyleRef — Editorial Master Art Gallery (Calm Parallax Aura & Precision Seal)
  if (theme === "amber-brutalism") {
    return (
      <div className={`relative overflow-hidden bg-[#0D0906] flex items-center justify-center select-none group ${className}`}>
        {/* 4 Art Frames with Smooth Calm Contrast */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1.5 opacity-75 group-hover:opacity-90 transition-opacity">
          <div 
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5"
            style={{ backgroundImage: "url('/styleref/img_01.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/45" />
            <span className="absolute bottom-1 left-1.5 text-[8.5px] font-mono text-white/80 font-semibold bg-black/60 px-1 rounded">
              Różalski
            </span>
          </div>
          <div 
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5"
            style={{ backgroundImage: "url('/styleref/img_02.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/45" />
            <span className="absolute bottom-1 left-1.5 text-[8.5px] font-mono text-white/80 font-semibold bg-black/60 px-1 rounded">
              Stålenhag
            </span>
          </div>
          <div 
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5"
            style={{ backgroundImage: "url('/styleref/img_04.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/45" />
            <span className="absolute bottom-1 left-1.5 text-[8.5px] font-mono text-white/80 font-semibold bg-black/60 px-1 rounded">
              Beksiński
            </span>
          </div>
          <div 
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5"
            style={{ backgroundImage: "url('/styleref/img_13.jpeg')" }}
          >
            <div className="absolute inset-0 bg-black/45" />
            <span className="absolute bottom-1 left-1.5 text-[8.5px] font-mono text-white/80 font-semibold bg-black/60 px-1 rounded">
              Blue Eye Samurai
            </span>
          </div>
        </div>

        {/* Ambient Amber Glow Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-black/40 to-black/85 pointer-events-none" />

        <svg
          className="w-full h-full absolute inset-0 pointer-events-none"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id={`grad-amb-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <style>{`
              @keyframes slowCompass_${uniqueId} {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
              }
            `}</style>
          </defs>

          {/* Rotating Compass Ring */}
          <g style={{ transformOrigin: "200px 120px", animation: `slowCompass_${uniqueId} 40s linear infinite` }}>
            <circle cx="200" cy="120" r="36" stroke="#f59e0b" strokeWidth="0.8" strokeDasharray="3 5" opacity="0.4" />
          </g>

          {/* Center Precision Seal */}
          <rect x="138" y="100" width="124" height="40" rx="10" fill="#120D08" fillOpacity="0.95" stroke="#f59e0b" strokeWidth="1" strokeOpacity="0.6" />
          <text x="200" y="117" textAnchor="middle" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold" letterSpacing="0.8">
            19 STYLES DB
          </text>
          <text x="200" y="131" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8.5" fontFamily="monospace">
            PROMPT MATRIX
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-[10px] font-medium tracking-wide">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 5. PRISM-SPECTRUM: /design-md-generator — Lottie Design System Tokens (Harmonic Scale & Swatches)
  if (theme === "prism-spectrum") {
    return (
      <div className={`relative overflow-hidden bg-[#080B10] flex items-center justify-center select-none group ${className}`}>
        {/* Ambient Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/10 via-purple-950/15 to-transparent" />

        <svg
          className="w-full h-full absolute inset-0"
          viewBox="0 0 400 240"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <style>{`
              @keyframes barHarmonic_${uniqueId} {
                0%, 100% { width: 140px; }
                50% { width: 175px; }
              }
              @keyframes swatchFloat_${uniqueId} {
                0%, 100% { transform: translateY(0px); opacity: 0.85; }
                50% { transform: translateY(-3px); opacity: 1; }
              }
            `}</style>
          </defs>

          {/* Typography Scale Bars */}
          <g transform="translate(65, 62)">
            <text x="0" y="15" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="600">H1: 3.5rem</text>
            <rect x="85" y="6" width="150" height="10" rx="3.5" fill="#38bdf8" opacity="0.75" style={{ animation: `barHarmonic_${uniqueId} 4s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate` }} />

            <text x="0" y="38" fill="#818cf8" fontSize="9.5" fontFamily="monospace" fontWeight="600">H2: 2.2rem</text>
            <rect x="85" y="30" width="125" height="8.5" rx="3" fill="#818cf8" opacity="0.65" style={{ animation: `barHarmonic_${uniqueId} 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate 0.5s` }} />

            <text x="0" y="60" fill="#c084fc" fontSize="9" fontFamily="monospace" fontWeight="600">Body: 1rem</text>
            <rect x="85" y="53" width="100" height="7.5" rx="2.5" fill="#c084fc" opacity="0.55" style={{ animation: `barHarmonic_${uniqueId} 5s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate 1s` }} />
          </g>

          {/* Color Token Swatches */}
          <g transform="translate(65, 148)">
            <rect x="0" y="0" width="46" height="28" rx="7" fill="#38bdf8" style={{ animation: `swatchFloat_${uniqueId} 3s ease-in-out infinite 0s` }} />
            <rect x="56" y="0" width="46" height="28" rx="7" fill="#818cf8" style={{ animation: `swatchFloat_${uniqueId} 3s ease-in-out infinite 0.6s` }} />
            <rect x="112" y="0" width="46" height="28" rx="7" fill="#c084fc" style={{ animation: `swatchFloat_${uniqueId} 3s ease-in-out infinite 1.2s` }} />
            <rect x="168" y="0" width="46" height="28" rx="7" fill="#f43f5e" style={{ animation: `swatchFloat_${uniqueId} 3s ease-in-out infinite 1.8s` }} />
            <rect x="224" y="0" width="46" height="28" rx="7" fill="#10b981" style={{ animation: `swatchFloat_${uniqueId} 3s ease-in-out infinite 2.4s` }} />
          </g>

          {/* Decals */}
          <text x="200" y="214" textAnchor="middle" fill="#38bdf8" fontSize="9" fontFamily="monospace" fontWeight="600" letterSpacing="1.2">
            YAML TOKENS &amp; DESIGN SYSTEM SPEC
          </text>
        </svg>

        {command && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-[10px] font-medium tracking-wide">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 6. EMERALD-TERMINAL: /end — Lottie Session Lifecycle Terminal (Harmonic Status Pulse & Scan Line)
  return (
    <div className={`relative overflow-hidden bg-[#060E08] flex items-center justify-center select-none group ${className}`}>
      {/* Subtle Terminal Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e08_1px,transparent_1px),linear-gradient(to_bottom,#22c55e08_1px,transparent_1px)] bg-[size:24px_24px]" />

      <svg
        className="w-full h-full absolute inset-0"
        viewBox="0 0 400 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes scanSlow_${uniqueId} {
              0% { transform: translateY(40px); opacity: 0.15; }
              50% { opacity: 0.7; }
              100% { transform: translateY(185px); opacity: 0.15; }
            }
            @keyframes checkPulse_${uniqueId} {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
          `}</style>
        </defs>

        {/* Terminal Frame Window */}
        <rect x="42" y="38" width="316" height="160" rx="12" fill="#0A160D" stroke="#22c55e" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="49" y="45" width="302" height="146" rx="8" fill="#040905" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

        {/* Terminal Header */}
        <circle cx="62" cy="56" r="3" fill="#ef4444" opacity="0.8" />
        <circle cx="72" cy="56" r="3" fill="#fbbf24" opacity="0.8" />
        <circle cx="82" cy="56" r="3" fill="#22c55e" opacity="0.8" />
        <text x="102" y="60" fill="#22c55e" fontSize="9.5" fontFamily="monospace" fontWeight="600">
          SESSION_RITUAL // HARNESS
        </text>

        {/* 4 Checkpoint Stages */}
        <g transform="translate(62, 80)">
          <circle cx="6" cy="6" r="3.5" fill="#22c55e" style={{ animation: `checkPulse_${uniqueId} 2.5s infinite 0s` }} />
          <text x="18" y="9.5" fill="#e5e5e5" fontSize="10" fontFamily="monospace" opacity="0.85">PHASE 0: COMPLETION GATE</text>

          <circle cx="6" cy="28" r="3.5" fill="#22c55e" style={{ animation: `checkPulse_${uniqueId} 2.5s infinite 0.6s` }} />
          <text x="18" y="31.5" fill="#e5e5e5" fontSize="10" fontFamily="monospace" opacity="0.85">PHASE 1: AUDIT &amp; RETRO</text>

          <circle cx="6" cy="50" r="3.5" fill="#22c55e" style={{ animation: `checkPulse_${uniqueId} 2.5s infinite 1.2s` }} />
          <text x="18" y="53.5" fill="#e5e5e5" fontSize="10" fontFamily="monospace" opacity="0.85">PHASE 2: MEMORY PERSIST</text>

          <circle cx="6" cy="72" r="3.5" fill="#22c55e" style={{ animation: `checkPulse_${uniqueId} 2.5s infinite 1.8s` }} />
          <text x="18" y="75.5" fill="#22c55e" fontSize="10" fontFamily="monospace" fontWeight="bold">PHASE 3: GIT PUSH [SAFE]</text>
        </g>

        {/* Scanning Laser Beam */}
        <line
          x1="49"
          y1="0"
          x2="351"
          y2="0"
          stroke="#22c55e"
          strokeWidth="1.5"
          opacity="0.8"
          style={{ animation: `scanSlow_${uniqueId} 4s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate` }}
        />

        {/* Status Decal */}
        <text x="328" y="174" textAnchor="end" fill="#22c55e" fontSize="8.5" fontFamily="monospace" fontWeight="bold">
          READY TO COMMIT ●
        </text>
      </svg>

      {command && (
        <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-medium tracking-wide">
          {command}
        </div>
      )}
    </div>
  );
}
