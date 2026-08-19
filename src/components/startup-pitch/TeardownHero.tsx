'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  ArrowRight, 
  Check, 
  Copy, 
  Sparkles,
  Zap,
  Layers,
  Clock,
  ChevronRight
} from 'lucide-react';

interface FrictionPoint {
  title: string;
  description: string;
}

interface TeardownHeroProps {
  companyName: string;
  founderName: string;
  hook: string;
  frictionPoints: FrictionPoint[];
  architectureHypothesis: string;
}

export default function TeardownHero({ 
  companyName, 
  founderName, 
  hook, 
  frictionPoints, 
  architectureHypothesis 
}: TeardownHeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopySpec = () => {
    const text = `PRODUCT TEARDOWN // ${companyName.toUpperCase()}\n\nFounder: ${founderName}\n\nHook:\n${hook}\n\nFriction Points:\n${frictionPoints.map((p, i) => `${i + 1}. ${p.title}: ${p.description}`).join('\n')}\n\nArchitecture Hypothesis:\n${architectureHypothesis}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full bg-[#111113] text-[#FAFAFA] pt-8 pb-16 px-4 sm:px-6 md:px-12 selection:bg-[#58A6FF]/30">
      <div className="max-w-5xl mx-auto w-full space-y-10">
        
        {/* Floating Minimalist Header Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-4 bg-[#1C1C20] rounded-2xl p-3 sm:px-5"
        >
          <div className="flex items-center space-x-3">
            <a 
              href="/" 
              className="flex items-center space-x-2 text-xs sm:text-sm font-semibold text-[#FAFAFA] hover:text-[#58A6FF] transition-colors"
            >
              <span className="w-6 h-6 rounded-lg bg-[#222226] text-[#58A6FF] flex items-center justify-center font-mono font-bold text-xs">
                AK
              </span>
              <span>Alim Khalelov</span>
            </a>
            <span className="text-[#71717A] text-xs">/</span>
            <div className="flex items-center space-x-1.5 bg-[#222226] text-[#34D399] px-2.5 py-1 rounded-lg text-xs font-mono font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
              <span>LIVE SPEC</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button 
              onClick={handleCopySpec}
              className="flex items-center space-x-1.5 bg-[#222226] hover:bg-[#2E2E35] text-[#A1A1AA] hover:text-[#FAFAFA] px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer"
            >
              {copied ? <Check size={13} className="text-[#34D399]" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy Spec'}</span>
            </button>
            <a 
              href="#connect"
              className="flex items-center space-x-1.5 bg-[#58A6FF] hover:bg-[#79B8FF] text-[#111113] font-bold px-3.5 py-1.5 rounded-xl text-xs transition-all shadow-sm cursor-pointer"
            >
              <span>Schedule 15m</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </motion.div>

        {/* Hero Pitch Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-4 pt-4"
        >
          <div className="inline-flex items-center space-x-2 bg-[#222226] text-[#58A6FF] px-3 py-1 rounded-lg text-xs font-mono uppercase tracking-wider font-semibold">
            <Sparkles size={12} />
            <span>0→1 Product Teardown</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#FAFAFA] leading-[1.1]">
            Hey {founderName}, I audited <span className="text-[#58A6FF]">{companyName}</span>&apos;s product loop.
          </h1>

          <p className="text-base sm:text-xl text-[#A1A1AA] leading-relaxed max-w-3xl font-normal">
            {hook}
          </p>
        </motion.div>

        {/* Bento Grid: Friction & Blueprint */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          
          {/* Card 1: Friction Diagnostics */}
          <div className="md:col-span-7 bg-[#1C1C20] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#222226] text-[#FB7185] flex items-center justify-center">
                    <AlertTriangle size={16} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#FAFAFA]">Friction Points Detected</h2>
                    <p className="text-xs text-[#71717A]">Root-cause UX and dropoff diagnostics</p>
                  </div>
                </div>
                <span className="bg-[#222226] text-[#FB7185] px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
                  {frictionPoints.length} ISSUES
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {frictionPoints.map((point, idx) => (
                  <div 
                    key={idx} 
                    className="bg-[#222226] hover:bg-[#25252A] rounded-xl p-4 sm:p-5 space-y-2 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold text-[#58A6FF] bg-[#1C1C20] px-2 py-0.5 rounded">
                        0{idx + 1}
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-[#FAFAFA]">
                        {point.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed pl-8">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#222226] rounded-xl p-4 flex items-center justify-between text-xs text-[#A1A1AA]">
              <div className="flex items-center space-x-2">
                <Clock size={14} className="text-[#58A6FF]" />
                <span>Estimated UX fix time: <strong className="text-[#FAFAFA]">1 sprint (48-72h)</strong></span>
              </div>
              <span className="text-[#34D399] font-mono font-bold">HIGH ROI</span>
            </div>
          </div>

          {/* Card 2: 0→1 Architecture Blueprint */}
          <div className="md:col-span-5 bg-[#1C1C20] rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#222226] text-[#58A6FF] flex items-center justify-center">
                    <Zap size={16} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[#FAFAFA]">Proposed Solution</h2>
                    <p className="text-xs text-[#71717A]">Optimistic latency &amp; activation flow</p>
                  </div>
                </div>
                <span className="bg-[#222226] text-[#58A6FF] px-2.5 py-1 rounded-lg text-xs font-mono font-bold">
                  BLUEPRINT
                </span>
              </div>

              <div className="bg-[#222226] rounded-xl p-5 space-y-3">
                <span className="text-[11px] font-mono uppercase text-[#71717A] tracking-wider font-semibold">
                  Technical Hypothesis
                </span>
                <p className="text-xs sm:text-sm text-[#EDEDED] leading-relaxed">
                  {architectureHypothesis}
                </p>
              </div>

              {/* Speculative UX Flow Diagram */}
              <div className="bg-[#222226] rounded-xl p-4 space-y-2.5">
                <span className="text-[11px] font-mono uppercase text-[#71717A] tracking-wider font-semibold flex items-center space-x-1.5">
                  <Layers size={12} />
                  <span>Activation Loop Upgrade</span>
                </span>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between bg-[#1C1C20] px-3 py-2 rounded-lg text-[#A1A1AA]">
                    <span className="line-through text-[#71717A]">Config &rarr; Wait &rarr; Result</span>
                    <span className="text-[#FB7185] font-mono text-[11px]">40% Dropoff</span>
                  </div>
                  <div className="flex items-center justify-between bg-[#1C1C20] px-3 py-2 rounded-lg text-[#FAFAFA] font-medium">
                    <span className="text-[#34D399]">Preview &rarr; Instant Magic &rarr; Config</span>
                    <span className="text-[#34D399] font-mono text-[11px] font-bold">+35% Act.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a 
                href="#pow" 
                className="w-full bg-[#222226] hover:bg-[#25252A] text-[#FAFAFA] hover:text-[#58A6FF] p-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <span>Review Proof of Work &amp; Past Builds</span>
                <ChevronRight size={14} />
              </a>
            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
