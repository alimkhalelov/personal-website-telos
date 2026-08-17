"use client";

import { motion } from "framer-motion";
import { Sparkles, Terminal, FileText, Play, Compass, Cpu, Check, Layers, BookOpen } from "lucide-react";

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

  // 1. /wiki — AI-Wiki Knowledge Compiler (Living AST Orbit & Node Network)
  if (theme === "neon-cyan") {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#070c14] flex items-center justify-center select-none ${className}`}>
        {/* Background Ambient Glow */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-sky-500/20 via-blue-950/20 to-transparent"
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        />

        {/* Delicate Matrix Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80a_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80a_1px,transparent_1px)] bg-[size:24px_24px]" />

        {/* Rotating Outer Orbit 1 */}
        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full border border-dashed border-sky-400/20"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-indigo-400 shadow-[0_0_6px_#818cf8]" />
        </motion.div>

        {/* Counter-Rotating Orbit 2 */}
        <motion.div
          className="absolute w-[130px] h-[130px] rounded-full border border-sky-500/30"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        </motion.div>

        {/* Floating Peripheral Knowledge Nodes */}
        <motion.div
          className="absolute top-6 left-10 px-2.5 py-1 rounded-lg bg-[#0b1626]/90 border border-sky-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-lg"
          animate={{ y: [-3, 3, -3] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
          <span className="text-[10px] font-mono text-sky-200 font-semibold">raw/intent.md</span>
        </motion.div>

        <motion.div
          className="absolute bottom-6 right-10 px-2.5 py-1 rounded-lg bg-[#0b1626]/90 border border-indigo-500/40 backdrop-blur-md flex items-center gap-1.5 shadow-lg"
          animate={{ y: [3, -3, 3] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
          <span className="text-[10px] font-mono text-indigo-200 font-semibold">wiki/ast-graph</span>
        </motion.div>

        {/* Central Pulsing Knowledge Core */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        >
          <div className="relative w-16 h-16 rounded-2xl bg-[#0c192d] border border-sky-400/60 shadow-[0_0_25px_rgba(56,189,248,0.35)] flex items-center justify-center">
            <BookOpen className="w-7 h-7 text-sky-400" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
          </div>
          <span className="mt-2 text-[11px] font-mono font-bold text-sky-300 tracking-wider">
            2-TIER WIKI
          </span>
        </motion.div>

        {/* Command Pill */}
        {command && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full bg-sky-500/20 border border-sky-500/50 backdrop-blur-md text-sky-300 font-mono text-[10px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 2. /presentation — Strategic Deck & Motion Studio (Interactive 3D Deck Pacing & Waves)
  if (theme === "lime-cyber") {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#090d0b] flex items-center justify-center select-none ${className}`}>
        {/* Ambient Dark Neon Glow */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-lime-400/15 via-emerald-950/20 to-transparent"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        {/* Staggered Floating Slide Cards */}
        <div className="relative z-10 w-[260px] h-[130px]">
          {/* Back Slide 3 */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-[#0f1712] border border-lime-400/20 shadow-xl"
            style={{ transform: "scale(0.88) translateY(-14px)" }}
            animate={{ y: [-16, -12, -16] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          />

          {/* Middle Slide 2 */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-[#131e17] border border-lime-400/35 shadow-xl"
            style={{ transform: "scale(0.94) translateY(-7px)" }}
            animate={{ y: [-9, -5, -9] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.2 }}
          />

          {/* Active Front Slide 1 */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-[#16241c] border border-lime-400/80 p-4 shadow-[0_0_25px_rgba(209,254,23,0.2)] flex flex-col justify-between"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.4 }}
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-lime-300 tracking-wider">
                SLIDE 04 // 1 IDEA = 1 SLIDE
              </span>
              <span className="px-1.5 py-0.5 rounded bg-lime-400/20 text-lime-300 font-mono text-[9px] font-bold">
                10-VECTORS
              </span>
            </div>

            {/* Living Oscilloscope Motion Wave */}
            <div className="flex items-center gap-1.5 h-6">
              {[40, 75, 100, 60, 85, 30, 90, 65, 45, 80].map((h, i) => (
                <motion.span
                  key={i}
                  className="flex-1 rounded-full bg-lime-400"
                  animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.3}%`] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[9px] font-mono text-lime-300/80">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                PACING: 25s
              </span>
              <span className="font-bold">HOTKEY: [S] NOTES</span>
            </div>
          </motion.div>
        </div>

        {/* Command Pill */}
        {command && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full bg-lime-400/20 border border-lime-400/50 backdrop-blur-md text-lime-300 font-mono text-[10px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 3. /skill-visualizer — 16:9 Vector Architecture Engine (Live Dynamic Density Laser Flow)
  if (theme === "purple-matrix") {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#0c0816] flex items-center justify-center select-none ${className}`}>
        {/* Ambient Purple Ray */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/15 via-indigo-950/20 to-transparent"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        {/* 3 Step Architecture Diagram in Motion */}
        <div className="relative z-10 flex items-center gap-3 w-full px-6 max-w-[340px]">
          {/* Node 1: Input */}
          <motion.div
            className="flex-1 p-2.5 rounded-xl bg-[#171026] border border-purple-400/40 shadow-lg flex flex-col gap-1.5"
            animate={{ borderColor: ["rgba(192,132,252,0.4)", "rgba(192,132,252,0.9)", "rgba(192,132,252,0.4)"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0 }}
          >
            <span className="text-[10px] font-mono font-bold text-purple-300">01 INPUT</span>
            <div className="w-full h-1 rounded-full bg-white/20" />
            <div className="w-3/4 h-1 rounded-full bg-white/10" />
          </motion.div>

          {/* Animated Connecting Flow Beam 1 */}
          <div className="relative w-5 h-0.5 bg-purple-500/30 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 bottom-0 w-3 bg-purple-400 shadow-[0_0_6px_#c084fc]"
              animate={{ x: [-12, 24] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
            />
          </div>

          {/* Node 2: Compile (Hero Card) */}
          <motion.div
            className="flex-1 p-3 rounded-xl bg-[#1e1336] border border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.25)] flex flex-col gap-1.5"
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 0.5 }}
          >
            <span className="text-[10px] font-mono font-bold text-sky-300">02 COMPILE</span>
            <div className="w-full h-1.5 rounded-full bg-sky-400/70" />
            <div className="w-4/5 h-1.5 rounded-full bg-purple-400/50" />
            <div className="w-2/3 h-1.5 rounded-full bg-white/20" />
          </motion.div>

          {/* Animated Connecting Flow Beam 2 */}
          <div className="relative w-5 h-0.5 bg-sky-500/30 overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 bottom-0 w-3 bg-sky-400 shadow-[0_0_6px_#38bdf8]"
              animate={{ x: [-12, 24] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "linear", delay: 0.4 }}
            />
          </div>

          {/* Node 3: 16:9 SVG */}
          <motion.div
            className="flex-1 p-2.5 rounded-xl bg-[#171026] border border-emerald-400/40 shadow-lg flex flex-col gap-1.5"
            animate={{ borderColor: ["rgba(52,211,153,0.4)", "rgba(52,211,153,0.9)", "rgba(52,211,153,0.4)"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1 }}
          >
            <span className="text-[10px] font-mono font-bold text-emerald-300">03 16:9 SVG</span>
            <div className="w-full h-1 rounded-full bg-white/20" />
            <div className="w-3/4 h-1 rounded-full bg-white/10" />
          </motion.div>
        </div>

        {/* Blueprint Stamp */}
        <div className="absolute bottom-2 text-center text-[9px] font-mono text-purple-300/60 tracking-wider">
          VIEWBOX: 0 0 1600 900
        </div>

        {/* Command Pill */}
        {command && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/50 backdrop-blur-md text-purple-300 font-mono text-[10px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 4. StyleRef — Generative Visual Styles Gallery (Ken-Burns Pan & Rotating Sunburst Compass)
  if (theme === "amber-brutalism") {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#110c08] flex items-center justify-center select-none ${className}`}>
        {/* 4 Quadrants Art Grid with Smooth Ken-Burns Pan */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-1">
          <motion.div
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5"
            style={{ backgroundImage: "url('/styleref/img_01.jpeg')" }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute bottom-1 left-1.5 text-[8.5px] font-mono text-white/90 font-bold bg-black/70 px-1 rounded">
              Różalski
            </span>
          </motion.div>

          <motion.div
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5"
            style={{ backgroundImage: "url('/styleref/img_02.jpeg')" }}
            animate={{ scale: [1.08, 1, 1.08] }}
            transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute bottom-1 left-1.5 text-[8.5px] font-mono text-white/90 font-bold bg-black/70 px-1 rounded">
              Stålenhag
            </span>
          </motion.div>

          <motion.div
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5"
            style={{ backgroundImage: "url('/styleref/img_04.jpeg')" }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute bottom-1 left-1.5 text-[8.5px] font-mono text-white/90 font-bold bg-black/70 px-1 rounded">
              Beksiński
            </span>
          </motion.div>

          <motion.div
            className="relative rounded-lg overflow-hidden bg-cover bg-center border border-white/5"
            style={{ backgroundImage: "url('/styleref/img_13.jpeg')" }}
            animate={{ scale: [1.08, 1, 1.08] }}
            transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <span className="absolute bottom-1 left-1.5 text-[8.5px] font-mono text-white/90 font-bold bg-black/70 px-1 rounded">
              Blue Eye Samurai
            </span>
          </motion.div>
        </div>

        {/* Ambient Dark Amber Flare */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/25 via-black/40 to-black/80 pointer-events-none" />

        {/* Central Rotating Compass & Seal */}
        <div className="relative z-10 flex items-center justify-center">
          <motion.div
            className="absolute w-24 h-24 rounded-full border border-dashed border-amber-400/40"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
          />

          <motion.div
            className="px-4 py-2 rounded-xl bg-[#140e08]/95 border border-amber-500/80 shadow-[0_0_25px_rgba(245,158,11,0.35)] flex flex-col items-center backdrop-blur-md"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          >
            <span className="text-[11px] font-mono font-black text-amber-300 tracking-wider">
              19 STYLES DB
            </span>
            <span className="text-[9px] font-mono text-amber-200/70">
              PROMPT MATRIX
            </span>
          </motion.div>
        </div>

        {/* Command Pill */}
        {command && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/50 backdrop-blur-md text-amber-300 font-mono text-[10px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 5. /design-md-generator — DESIGN.md Architecture Generator (Live Swatch Prism & Typography Scale)
  if (theme === "prism-spectrum") {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-[#080d14] flex items-center justify-center select-none ${className}`}>
        {/* Ambient Spectrum Glow */}
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/15 via-purple-950/20 to-transparent"
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        <div className="relative z-10 w-full max-w-[320px] px-4 flex flex-col gap-3">
          {/* Typography Scale Bars with Live Harmonic Easing */}
          <div className="p-3 rounded-xl bg-[#0e1622]/90 border border-cyan-500/30 flex flex-col gap-2 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-cyan-300">H1: 3.5rem</span>
              <motion.div
                className="h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]"
                animate={{ width: ["55%", "75%", "55%"] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9.5px] font-mono font-bold text-indigo-300">H2: 2.2rem</span>
              <motion.div
                className="h-1.5 rounded-full bg-indigo-400"
                animate={{ width: ["45%", "65%", "45%"] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.3 }}
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono font-bold text-purple-300">Body: 1rem</span>
              <motion.div
                className="h-1 rounded-full bg-purple-400"
                animate={{ width: ["35%", "50%", "35%"] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.6 }}
              />
            </div>
          </div>

          {/* Floating Color Token Swatches (Staggered Spring Physics) */}
          <div className="flex items-center justify-between gap-1.5">
            {[
              { color: "#38bdf8", name: "Cyan" },
              { color: "#818cf8", name: "Indigo" },
              { color: "#c084fc", name: "Purple" },
              { color: "#f43f5e", name: "Rose" },
              { color: "#10b981", name: "Emerald" },
            ].map((swatch, i) => (
              <motion.div
                key={swatch.name}
                className="flex-1 h-7 rounded-lg border border-white/10 flex items-center justify-center shadow-md cursor-pointer"
                style={{ backgroundColor: swatch.color }}
                animate={{ y: [0, -3, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                  delay: i * 0.25,
                }}
              />
            ))}
          </div>

          <div className="text-center text-[9px] font-mono text-cyan-300/70">
            GOOGLE-LABS / DESIGN.MD TOKENS
          </div>
        </div>

        {/* Command Pill */}
        {command && (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/50 backdrop-blur-md text-cyan-300 font-mono text-[10px] font-bold">
            {command}
          </div>
        )}
      </div>
    );
  }

  // 6. /end — End-of-Session Ritual & Memory Keeper (Live Terminal Laser Scanner & Checkpoints)
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#060f08] flex items-center justify-center select-none ${className}`}>
      {/* Terminal Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22c55e0c_1px,transparent_1px),linear-gradient(to_bottom,#22c55e0c_1px,transparent_1px)] bg-[size:20px_20px]" />

      {/* Terminal Console Window */}
      <div className="relative z-10 w-full max-w-[320px] rounded-xl bg-[#09170d]/90 border border-emerald-500/60 p-3.5 shadow-[0_0_25px_rgba(34,197,94,0.2)] flex flex-col gap-2.5 overflow-hidden">
        {/* Live Laser Scanner Beam */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#22c55e]"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/30 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-300">
            SESSION_RITUAL // HARNESS
          </span>
        </div>

        {/* 4 Checkpoint Stages with Animated Pulse */}
        <div className="flex flex-col gap-1.5 font-mono text-[10px]">
          {[
            { phase: "PHASE 0: COMPLETION GATE", ok: true },
            { phase: "PHASE 1: AUDIT & RETRO", ok: true },
            { phase: "PHASE 2: MEMORY PERSIST", ok: true },
            { phase: "PHASE 3: GIT PUSH [SAFE]", ok: true, bold: true },
          ].map((step, idx) => (
            <div key={step.phase} className="flex items-center justify-between text-emerald-300/90">
              <span className={`flex items-center gap-1.5 ${step.bold ? "font-bold text-emerald-300" : ""}`}>
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: idx * 0.4 }}
                />
                {step.phase}
              </span>
              <Check className="w-3 h-3 text-emerald-400" />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-emerald-500/20 text-[9px] font-mono text-emerald-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            STATUS: ACTIVE
          </span>
          <span className="font-bold">READY TO COMMIT ●</span>
        </div>
      </div>

      {/* Command Pill */}
      {command && (
        <div className="absolute top-3 left-3 z-20 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md text-emerald-300 font-mono text-[10px] font-bold">
          {command}
        </div>
      )}
    </div>
  );
}
