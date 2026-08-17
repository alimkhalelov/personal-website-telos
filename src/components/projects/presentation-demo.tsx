"use client";

import { useState, useEffect, useCallback } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Mic, 
  Sparkles, 
  Layers, 
  Cpu, 
  Terminal, 
  Eye, 
  EyeOff, 
  X,
  Play,
  RotateCcw
} from "lucide-react";

interface Slide {
  id: number;
  kicker: string;
  title: string;
  subtitle?: string;
  theme: "cyber" | "matrix" | "minimal" | "split";
  accent: string;
  badge: string;
  content: React.ReactNode;
  notes: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    kicker: "COMMUNICATION VECTOR: STRATEGIC / VC PITCH",
    title: "The Death of Static Slop Decks",
    subtitle: "Why 50-bullet point PowerPoints fail, and how motion-driven HTML storytelling closes deals.",
    theme: "cyber",
    accent: "#d1fe17",
    badge: "EPISODE 01: THE AWAKENING",
    content: (
      <div className="flex flex-col items-center justify-center gap-6 text-center max-w-2xl mx-auto py-8">
        <div className="px-4 py-1.5 rounded-full bg-[#d1fe17]/20 border border-[#d1fe17]/50 text-[#d1fe17] font-mono text-sm font-bold tracking-widest uppercase">
          LAW 01: 1 IDEA = 1 SLIDE
        </div>
        <p className="text-xl sm:text-2xl text-zinc-300 font-light leading-relaxed">
          Attention spans collapsed to 8 seconds. If a slide requires more than <strong className="text-white font-semibold">25 seconds</strong> to comprehend, your message died before the next click.
        </p>
      </div>
    ),
    notes: "Коллеги, инвесторы и клиенты больше не читают стены текста. Сегодня мы показываем **принцип одного инсайта на слайд**: 25 секунд темпа, кинематографичный HTML и полное погружение.",
  },
  {
    id: 2,
    kicker: "PARADIGM SHIFT // THE 10 COMMUNICATION VECTORS",
    title: "10 Distinct Vectors of Human Alignment",
    subtitle: "From Upward Minto Pyramids to DevRel Deep Dives and Founder Pitches.",
    theme: "split",
    accent: "#38bdf8",
    badge: "THE MATRIX 10",
    content: (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto w-full py-4">
        <div className="p-5 rounded-2xl bg-white/5 border border-sky-500/30 flex flex-col gap-2">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold">Vector 01: Upward / C-Level</span>
          <h4 className="text-lg font-bold text-white">Minto Pyramid Status</h4>
          <p className="text-sm text-zinc-400">P&L risk mitigation, clear bottom-line recommendations first, zero tactical noise.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-[#d1fe17]/30 flex flex-col gap-2">
          <span className="text-xs font-mono text-[#d1fe17] uppercase tracking-widest font-bold">Vector 02: VC Pitch Deck</span>
          <h4 className="text-lg font-bold text-white">Market Pain to Unfair Moat</h4>
          <p className="text-sm text-zinc-400">Traction velocity, unit economics, defensible proprietary IP, and The Ask.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-purple-500/30 flex flex-col gap-2">
          <span className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold">Vector 03: DevRel & Deep Dive</span>
          <h4 className="text-lg font-bold text-white">Under the Hood Architecture</h4>
          <p className="text-sm text-zinc-400">Failure modes, deterministic state machines, and real-world benchmark telemetry.</p>
        </div>
        <div className="p-5 rounded-2xl bg-white/5 border border-emerald-500/30 flex flex-col gap-2">
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-widest font-bold">Vector 04: B2B Enterprise ROI</span>
          <h4 className="text-lg font-bold text-white">Before vs After Transformation</h4>
          <p className="text-sm text-zinc-400">Cost-center bleeding converted into provable compounding pipeline margins.</p>
        </div>
      </div>
    ),
    notes: "Обратите внимание: мы никогда не пишем одинаковые презентации для инвесторов и для разработчиков. **Векторная матрица 10** сразу задает правильную структуру аргументов.",
  },
  {
    id: 3,
    kicker: "ENGINEERING MOTION & TELEPROMPTER",
    title: "Emil-Grade Micro-Motion & Built-In Teleprompter",
    subtitle: "Instant 'S' key press brings up natural speaker script anchors.",
    theme: "matrix",
    accent: "#c084fc",
    badge: "ZERO FRICTION PRESENTER VIEW",
    content: (
      <div className="flex flex-col items-center justify-center gap-6 max-w-2xl mx-auto text-center py-6">
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-purple-950/40 border border-purple-500/40">
          <Terminal className="w-6 h-6 text-purple-400 shrink-0" />
          <span className="font-mono text-sm text-purple-200">
            Press <kbd className="px-2 py-1 bg-black/60 rounded border border-purple-400/50 text-[#d1fe17] font-bold">S</kbd> to toggle live teleprompter notes right now!
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 w-full max-w-lg">
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <span className="text-xs font-mono text-zinc-400 block">NAVIGATION</span>
            <span className="text-sm font-bold text-white">← / → / Space</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <span className="text-xs font-mono text-zinc-400 block">NOTES</span>
            <span className="text-sm font-bold text-[#d1fe17]">Key [S]</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <span className="text-xs font-mono text-zinc-400 block">FULLSCREEN</span>
            <span className="text-sm font-bold text-sky-400">Key [F]</span>
          </div>
        </div>
      </div>
    ),
    notes: "Спикеру больше не нужно зубрить текст наизусть. Нажатие клавиши **S** открывает удобные подсказки с выделенными жирным шрифтом опорными фразами.",
  },
  {
    id: 4,
    kicker: "CONCLUSION // THE FUTURE OF DECKS",
    title: "Autonomous Storytelling is Here",
    subtitle: "Built as an agent skill with zero external heavy frameworks.",
    theme: "cyber",
    accent: "#d1fe17",
    badge: "READY FOR FLIGHT",
    content: (
      <div className="flex flex-col items-center justify-center gap-6 text-center max-w-xl mx-auto py-8">
        <div className="w-16 h-16 rounded-3xl bg-[#d1fe17]/10 border border-[#d1fe17]/40 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-[#d1fe17]" />
        </div>
        <h3 className="text-3xl font-extrabold text-white">Turn Any Pitch into a Cinematic Experience</h3>
        <p className="text-zinc-400 text-base leading-relaxed">
          Integrated into the Demiurge OS knowledge matrix and available as a plug-and-play skill in Antigravity.
        </p>
      </div>
    ),
    notes: "Финал: презентация должна вдохновлять и вести к конкретному действию. Теперь этот инструмент интегрирован прямо в ваш арсенал.",
  },
];

export function PresentationDemo() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = SLIDES[currentSlideIndex];
  const totalSlides = SLIDES.length;

  const nextSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const resetSlides = useCallback(() => {
    setCurrentSlideIndex(0);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        nextSlide();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prevSlide();
      } else if (e.key.toLowerCase() === "s") {
        e.preventDefault();
        setIsNotesOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        setIsFullscreen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div
      id="demo"
      className={`relative w-full rounded-3xl overflow-hidden bg-[#0c0e11] border border-white/10 shadow-2xl transition-all duration-300 flex flex-col ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen" : "aspect-[16/10] sm:aspect-[16/9] min-h-[500px]"
      }`}
    >
      {/* Top Deck HUD Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/40 backdrop-blur z-20">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#d1fe17] animate-pulse" />
          <span className="font-mono text-xs font-bold text-white tracking-widest">
            PRESENTATION STUDIO // LIVE RUNNER
          </span>
          <span className="px-2 py-0.5 rounded bg-white/10 text-zinc-300 text-xs font-mono">
            {currentSlideIndex + 1} / {totalSlides}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsNotesOpen(!isNotesOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
              isNotesOpen
                ? "bg-[#d1fe17] text-black font-bold shadow-lg shadow-[#d1fe17]/20"
                : "bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white"
            }`}
            title="Toggle Speaker Notes [S]"
          >
            <Mic className="w-3.5 h-3.5" />
            <span>{isNotesOpen ? "Notes Active (S)" : "Teleprompter (S)"}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl bg-white/10 text-zinc-300 hover:bg-white/20 hover:text-white transition-colors"
            title="Toggle Fullscreen [F]"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Presentation Stage */}
      <div className="relative flex-1 flex flex-col items-center justify-between p-8 sm:p-14 overflow-hidden select-none">
        {/* Background Radial Ambiance */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${slide.accent} 0%, transparent 70%)`
          }}
        />

        {/* Slide Header Decal */}
        <div className="w-full flex items-center justify-between text-xs font-mono tracking-widest text-zinc-400 z-10">
          <span className="uppercase">{slide.kicker}</span>
          <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white font-bold">
            {slide.badge}
          </span>
        </div>

        {/* Slide Central Focus */}
        <div className="w-full flex-1 flex flex-col items-center justify-center my-6 z-10 text-center animate-in fade-in zoom-in-95 duration-500 key={currentSlideIndex}">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl">
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-lg sm:text-2xl text-zinc-400 font-light mt-4 max-w-2xl leading-relaxed">
              {slide.subtitle}
            </p>
          )}

          {/* Dynamic Content Component */}
          <div className="w-full mt-6">
            {slide.content}
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="w-full flex items-center justify-between z-10 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all"
              title="Previous Slide (←)"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === totalSlides - 1}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 disabled:opacity-30 disabled:cursor-not-allowed text-white transition-all"
              title="Next Slide (→)"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {currentSlideIndex === totalSlides - 1 && (
              <button
                onClick={resetSlides}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-zinc-300 transition-colors ml-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restart</span>
              </button>
            )}
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-2">
            {SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentSlideIndex
                    ? "w-8 bg-[#d1fe17]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-xs font-mono text-zinc-400 hidden sm:block">
            USE KEYBOARD <strong className="text-white">← →</strong> OR <strong className="text-[#d1fe17]">SPACE</strong>
          </div>
        </div>

        {/* Teleprompter Notes Overlay Drawer */}
        {isNotesOpen && (
          <div className="absolute bottom-16 left-6 right-6 sm:left-12 sm:right-12 z-30 p-6 rounded-2xl bg-[#13171b]/95 border border-[#d1fe17]/40 shadow-2xl backdrop-blur-lg animate-in slide-in-from-bottom-6 duration-300">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2 text-[#d1fe17] font-mono text-xs font-bold uppercase tracking-wider">
                <Mic className="w-4 h-4" />
                <span>Speaker Teleprompter Script (RU)</span>
              </div>
              <button
                onClick={() => setIsNotesOpen(false)}
                className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal">
              {slide.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
