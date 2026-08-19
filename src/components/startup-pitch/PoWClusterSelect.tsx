'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Cpu, 
  Rocket, 
  ArrowUpRight, 
  Mail, 
  Send, 
  Linkedin, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Sparkles,
  Terminal
} from 'lucide-react';

interface PoWClusterSelectProps {
  cluster: string;
}

export default function PoWClusterSelect({ cluster }: PoWClusterSelectProps) {
  // Determine initial cluster index
  const getInitialIndex = () => {
    if (cluster.includes('Cluster 1')) return 0;
    if (cluster.includes('Cluster 2')) return 1;
    return 2;
  };

  const [selectedIndex, setSelectedIndex] = useState(getInitialIndex());

  const clustersData = [
    {
      id: 'cluster-1',
      tag: 'CLUSTER 01',
      title: 'Consumer AI & UGC Growth',
      icon: Users,
      badgeColor: '#34D399',
      thesis: 'I build viral product loops that hook everyday users. My core competency lies in reducing time-to-value, eliminating onboarding friction, and architecting UGC creator economies.',
      stats: [
        { label: 'D7 Retention', value: '+22%', desc: 'Via dynamic narrative engines' },
        { label: 'Activation Speed', value: '3.3x', desc: 'From 40m down to 12m' },
        { label: 'AI Hackathon', value: '1st Place', desc: 'GameDev AI Autonomous Agents' },
      ],
      cases: [
        {
          title: 'AI Dynamic Lore & Quest Engine',
          category: 'Consumer AI',
          description: 'A procedural storytelling engine generating adaptive side-quests in real-time. Increased player engagement and monetization by turning passive players into creators.',
          impact: '+22% Day 7 Retention Multiplier',
          tags: ['Prompt Routing', 'Vector Memory', 'Next.js'],
        },
        {
          title: 'Creator Studio Self-Serve Onboarding',
          category: 'Product Growth',
          description: 'Complete teardown and rebuild of creator tools with optimistic previews. Cut activation dropoff by 60% on first session.',
          impact: '12-min Time-to-Value',
          tags: ['0→1 UX', 'Optimistic UI', 'Figma'],
        }
      ]
    },
    {
      id: 'cluster-2',
      tag: 'CLUSTER 02',
      title: 'Agent Infra & LLM Evaluation',
      icon: Cpu,
      badgeColor: '#58A6FF',
      thesis: 'I understand the deep technical architecture of agentic loops. From context window engineering and persistent memory trees to LLM-as-a-judge benchmarking and latency masking.',
      stats: [
        { label: 'Token Efficiency', value: '-45%', desc: 'Dynamic model tiered routing' },
        { label: 'Evaluation Speed', value: '10x', desc: 'Automated synthetic judging' },
        { label: 'Multi-Agent', value: 'Production', desc: 'Sandboxed Python & ReAct harnesses' },
      ],
      cases: [
        {
          title: 'Living Memory & Agent Harness Engine',
          category: 'Agent Infrastructure',
          description: 'Designed a persistent stateful memory system that stops context decay in long multi-turn sessions with automatic rollbacks and memory compaction.',
          impact: 'Zero State Drift across 50+ steps',
          tags: ['Living Memory', 'LangGraph', 'Python'],
        },
        {
          title: 'Hybrid Model Cost Optimizer',
          category: 'LLM Orchestration',
          description: 'Intelligent router classifying user intent to cascade queries between high-speed local inference and frontier reasoning models.',
          impact: '-45% Monthly API Bill',
          tags: ['Routing Logic', 'FastAPI', 'TypeScript'],
        }
      ]
    },
    {
      id: 'cluster-3',
      tag: 'CLUSTER 03',
      title: '0→1 PMF & Venture Sprints',
      icon: Rocket,
      badgeColor: '#FB7185',
      thesis: 'I am a 0→1 Product Builder. I take abstract founder vision, ship functional prototypes in 48 hours, run ruthless fake-door experiments, and validate unit economics before burning runway.',
      stats: [
        { label: 'MVP Velocity', value: '48h', desc: 'Idea to live deployed reality' },
        { label: 'Presales Generated', value: '$12k+', desc: '4 landing page validation sprints' },
        { label: 'Experience', value: '5+ Years', desc: 'Startups, Web3, and AI-native products' },
      ],
      cases: [
        {
          title: 'Autonomous Startup Discovery Pipeline',
          category: 'Venture Ops',
          description: 'Full-stack scraping, LLM scoring, and automated founder outreach engine with personalized Proof-of-Work landing page deployment.',
          impact: 'Autonomous 24/7 lead execution',
          tags: ['Next.js App Router', 'Telegram API', 'Tailwind'],
        },
        {
          title: 'Zero-Code Fake-Door Validation Framework',
          category: '0→1 PMF Sprint',
          description: 'Systematic testing engine measuring intent through interactive interactive prototypes, landing micro-surveys, and stripe pre-orders.',
          impact: 'Validated 4 products with $0 burn',
          tags: ['Growth Loops', 'Analytics', 'Conversion'],
        }
      ]
    }
  ];

  const current = clustersData[selectedIndex];
  const IconComponent = current.icon;

  return (
    <section id="pow" className="w-full bg-[#111113] text-[#FAFAFA] py-16 px-4 sm:px-6 md:px-12 selection:bg-[#58A6FF]/30">
      <div className="max-w-5xl mx-auto w-full space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 bg-[#1C1C20] text-[#A1A1AA] w-fit px-3 py-1 rounded-lg text-xs font-mono uppercase font-semibold">
            <Award size={13} className="text-[#58A6FF]" />
            <span>Verified Proof of Work</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#FAFAFA]">
                Track Record &amp; Architectural Proof
              </h2>
              <p className="text-sm sm:text-base text-[#A1A1AA] pt-1">
                Real code, measured growth metrics, and high-conviction product execution.
              </p>
            </div>

            {/* Cluster Switcher Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-[#1C1C20] p-1.5 rounded-2xl w-fit">
              {clustersData.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedIndex(i)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedIndex === i 
                      ? 'bg-[#222226] text-[#FAFAFA] shadow-sm' 
                      : 'text-[#71717A] hover:text-[#A1A1AA]'
                  }`}
                >
                  {c.tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Cluster Detail Pod */}
        <motion.div 
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          {/* Main Focus Card */}
          <div className="bg-[#1C1C20] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#222226] text-[#58A6FF] flex items-center justify-center">
                  <IconComponent size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-[#58A6FF] uppercase tracking-wider">
                    {current.tag} FOCUS
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#FAFAFA]">
                    {current.title}
                  </h3>
                </div>
              </div>
              
              <div className="flex items-center space-x-1.5 bg-[#222226] px-3 py-1.5 rounded-lg text-xs font-mono text-[#34D399]">
                <ShieldCheck size={14} />
                <span>ACTIVE CAPABILITY</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-3xl font-normal">
              {current.thesis}
            </p>

            {/* Metrics Trio */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {current.stats.map((stat, sIdx) => (
                <div key={sIdx} className="bg-[#222226] rounded-xl p-4 space-y-1">
                  <span className="text-xs text-[#71717A] font-medium">{stat.label}</span>
                  <div className="text-2xl font-extrabold text-[#FAFAFA] font-mono tracking-tight">
                    {stat.value}
                  </div>
                  <p className="text-xs text-[#A1A1AA]">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Project Case Studies Bento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {current.cases.map((project, pIdx) => (
              <div 
                key={pIdx} 
                className="bg-[#1C1C20] hover:bg-[#222226] transition-all rounded-2xl p-6 sm:p-7 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono uppercase bg-[#222226] text-[#A1A1AA] px-2.5 py-0.5 rounded">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#34D399]">
                      {project.impact}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-[#FAFAFA]">
                    {project.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-4 flex flex-wrap gap-2">
                  {project.tags.map((t, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="text-[11px] font-mono bg-[#111113] text-[#71717A] px-2.5 py-1 rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Executive Action Pod */}
        <div id="connect" className="bg-[#1C1C20] rounded-2xl p-8 sm:p-10 space-y-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center space-x-2 bg-[#222226] text-[#58A6FF] px-3 py-1 rounded-lg text-xs font-mono font-semibold uppercase">
                <Sparkles size={12} />
                <span>Next Step</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">
                Let&apos;s build the next release together.
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                I am actively seeking my next 0→1 Product Builder role. If you want an autonomous operator to own onboarding, spec architecture, and growth experiments, reach out directly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <a 
                href="mailto:alim.khalelov@gmail.com?subject=0-%3E1%20Product%20Builder%20Chat&body=Hey%20Alim%2C%20saw%20your%20product%20teardown%20and%20wanted%20to%20connect."
                className="bg-[#58A6FF] hover:bg-[#79B8FF] text-[#111113] font-bold px-6 py-3 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all shadow-sm cursor-pointer"
              >
                <Mail size={16} />
                <span>Send Direct Email</span>
              </a>
              <a 
                href="https://t.me/alimzhan_khalelov" 
                target="_blank" 
                rel="noreferrer"
                className="bg-[#222226] hover:bg-[#25252A] text-[#FAFAFA] font-medium px-5 py-3 rounded-xl text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <Send size={15} className="text-[#58A6FF]" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          <div className="pt-6 border-0 bg-[#222226] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#71717A]">
            <div className="flex items-center space-x-3">
              <span className="font-mono text-[#FAFAFA]">Alim Khalelov</span>
              <span>•</span>
              <span>5+ Years Startup Builder</span>
              <span>•</span>
              <span>Almaty / Worldwide Remote</span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="https://linkedin.com/in/alim-khalelov" target="_blank" rel="noreferrer" className="hover:text-[#FAFAFA] flex items-center space-x-1">
                <Linkedin size={13} />
                <span>LinkedIn</span>
              </a>
              <a href="https://github.com/alimkhalelov" target="_blank" rel="noreferrer" className="hover:text-[#FAFAFA] flex items-center space-x-1">
                <Terminal size={13} />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
