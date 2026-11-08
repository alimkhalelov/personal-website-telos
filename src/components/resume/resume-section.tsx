"use client";

import * as React from "react";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  Download, 
  FileText, 
  Sparkles, 
  Layers, 
  Code2, 
  ArrowUpRight,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type ResumeTab = "experience" | "skills" | "education" | "all";

interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  summary: string;
  bullets: {
    highlight: string;
    detail: string;
  }[];
}

interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  note?: string;
  location?: string;
}

interface AchievementItem {
  title: string;
  category: string;
  description: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    role: "Independent AI Product Consultant",
    company: "Autonomous Practice & Ventures",
    location: "Remote",
    period: "01/2025 - Present",
    summary:
      "Architect and deploy autonomous multi-agent systems, full-stack AI pipelines, and rapid GTM validation prototypes for early-stage startups and B2B clients.",
    bullets: [
      {
        highlight: "AI Property Staging Platform (Sydney)",
        detail:
          "Architected a full-stack Next.js system generating suburb-specific local SEO pages and staging strategies. Built a multi-agent verification loop to check LLM outputs against real-time market data, reducing time-to-market by 70% with rigorous source validation.",
      },
      {
        highlight: "Automated Prospecting Engine",
        detail:
          "Programmed a resilient lead generation pipeline with name-filtering logic and DOM scraping. Built custom watchdog timers and auto-retry systems to handle scraper edge cases, processing 100+ high-value leads daily.",
      },
      {
        highlight: "Local Agent Workspace",
        detail:
          "Integrated a multi-agent environment automating market research, competitor analysis, and draft preparation, reducing routine workflows by 80% and maintaining personal focus on core product architecture.",
      },
      {
        highlight: "PMF Validation Engine",
        detail:
          "Built a dynamic landing page factory that customizes value propositions per lead using targeted LLM adapters, validating product-market fit in the psychotherapist and service provider vertical.",
      },
      {
        highlight: "Web3 Marketing & AI Platform",
        detail:
          "Co-founded agency focused on KOL-driven growth and AI-assisted market research. Led product discovery and pre-launch for AI Agent meme coin and AI-wrapped SaaS concepts, validating demand and terminating low-PMF ideas early.",
      },
    ],
  },
  {
    role: "Senior / Founding Product Manager",
    company: "Cryptomeria Capital Group",
    location: "Dubai, UAE (Remote)",
    period: "04/2023 - 01/2025",
    summary:
      "Led 0-to-1 product discovery, GTM execution, and ecosystem strategy for an early-stage Web3 ecosystem operating under extreme uncertainty and limited budgets.",
    bullets: [
      {
        highlight: "Portfolio Strategy & Rapid Discovery",
        detail:
          "Prototyped and validated 7+ high-uncertainty Web3 products (NFTs, mobile games, lending, Telegram mini-apps). Established strict verification metrics to identify and shut down unviable concepts early, protecting capital.",
      },
      {
        highlight: "Gamified Onboarding & Telegram Mini-Apps",
        detail:
          "Designed and validated a gamified onboarding system to address cold-start dynamics and bootstrap early network effects. Personally led Telegram mini-app experiments that became the primary driver of community activation and user growth.",
      },
      {
        highlight: "Narrative AI Storytelling Pipeline",
        detail:
          "Directed an automated AI narrative engine producing a 200-page lorebook, 60 comic episodes, and 10 video trailers, proving that narrative-driven loops lower user acquisition costs.",
      },
      {
        highlight: "Strategic Partnerships & Market Integration",
        detail:
          "Negotiated and closed 50+ strategic partnerships (including Animoca Brands, The Sandbox, and Decentraland) to integrate the ecosystem across the wider market.",
      },
      {
        highlight: "Ecosystem Risk Management & Economic Design",
        detail:
          "Modeled and stress-tested token utility, monetization mechanics, and network incentives to manage regulatory and financial risks under pre-PMF conditions.",
      },
      {
        highlight: "Growth & Audience Experiments",
        detail:
          "Ran rapid growth and content experiments, scaling Twitter community from 0 to 10K in 30 days through structured hypothesis-driven testing.",
      },
    ],
  },
  {
    role: "Junior Product Manager",
    company: "Startup Studio B51",
    location: "Tomsk, Russia (Part-time)",
    period: "09/2021 - 05/2023",
    summary:
      "Startup accelerator for university founders, guiding student entrepreneurs through early MVP stages, lean experimentation, and grant funding.",
    bullets: [
      {
        highlight: "MVP Design & Rapid Assumption Testing",
        detail:
          "Mentored student founders on MVP design, rapid experimentation, and assumption testing (RAT) before writing code, boosting fundraising readiness.",
      },
      {
        highlight: "Venture Grant Access",
        detail:
          "Connected early-stage teams with VC networks and angel mentors, securing multiple government grants (UMNIK, Start, Student Startup).",
      },
      {
        highlight: "Ecosystem Building",
        detail:
          "Organized 10+ startup events and hackathons, fostering entrepreneurial culture and increasing program participation across university incubators.",
      },
    ],
  },
];

const SKILL_GROUPS = [
  {
    title: "Product Discovery & Strategy",
    icon: Briefcase,
    skills: [
      "0→1 Product Discovery",
      "GTM Strategy",
      "PRD & User Stories",
      "Assumption Testing (RAT)",
      "Sprint Planning",
      "Backlog Prioritization",
      "A/B & Qualitative Testing",
      "Stakeholder Alignment",
      "Rapid Prototyping",
      "Cold-Start Dynamics",
      "Gamified Ecosystems",
    ],
  },
  {
    title: "AI Engineering & Orchestration",
    icon: Sparkles,
    skills: [
      "Multi-Agent Orchestration",
      "LLM API Integration (Gemini, Claude, OpenAI)",
      "Prompt Engineering",
      "Human-in-the-Loop Eval Pipelines",
      "LLM-as-Judge Scoring",
      "Output Validation Against Source Data",
      "DOM Scraping & Lead Pipelines",
      "Autonomous Watchdog Timers",
    ],
  },
  {
    title: "Tech Stack & Development",
    icon: Code2,
    skills: [
      "Next.js 15 (App Router)",
      "React",
      "TypeScript",
      "Python",
      "Tailwind CSS v4",
      "Vercel",
      "Firebase",
      "SQL",
      "Claude Code",
      "Antigravity Agent Harness",
      "Git Workflow",
    ],
  },
  {
    title: "Product Analytics & Operations",
    icon: Layers,
    skills: [
      "Linear",
      "Jira",
      "Notion",
      "Figma",
      "Miro",
      "Mixpanel",
      "Amplitude",
      "Google Analytics",
      "Confluence",
    ],
  },
];

const EDUCATION: EducationItem[] = [
  {
    degree: "MSc",
    field: "Innovation: Technology Brokerage",
    institution: "Tomsk Polytechnic University",
    period: "2021 - 2023",
  },
  {
    degree: "MSc Exchange",
    field: "School of Innovation",
    institution: "University of Trento",
    location: "Italy",
    period: "2022",
    note: "Erasmus+ Excellence Program",
  },
  {
    degree: "BSc",
    field: "Innovation & Entrepreneurship in Digital Economy",
    institution: "Tomsk Polytechnic University",
    period: "2017 - 2021",
  },
  {
    degree: "Academic Exchange",
    field: "Engineering & Innovation Management",
    institution: "Karlsruhe Institute of Technology (KIT)",
    location: "Germany",
    period: "2020 - 2021",
  },
  {
    degree: "Academic Exchange",
    field: "Business Administration & Technology",
    institution: "Cooperative State University Baden-Württemberg",
    location: "Germany",
    period: "2019 - 2020",
  },
];

const ACHIEVEMENTS: AchievementItem[] = [
  {
    title: "Winner, GameDev AI Hackathon 2025",
    category: "Hackathon",
    description: "Led architecture for an automated branching quest generator and story arcs.",
  },
  {
    title: "Winner, AI News & GTM Marketing Hackathon",
    category: "Hackathon",
    description: "Built an end-to-end automated GTM and outreach system with AI adapters.",
  },
  {
    title: "Finalist, Yandex Product Case",
    category: "Competition",
    description: "Designed innovative contextual ad placement models and interactive ad format concepts.",
  },
  {
    title: "Erasmus+ Scholar",
    category: "Honor",
    description: "Recognized with European academic excellence grant for international study programs.",
  },
  {
    title: "Published Researcher",
    category: "Academic",
    description: "Authored peer-reviewed research papers in flexible and wearable electronics.",
  },
];

export function ResumeSection() {
  const [activeTab, setActiveTab] = React.useState<ResumeTab>("experience");

  return (
    <section id="resume" className="flex flex-col gap-6 sm:gap-8 w-full scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-white/10">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <h2
              className="text-3xl sm:text-4xl font-bold tracking-tight text-white"
              style={{
                fontFamily:
                  "var(--font-sf-pro-rounded), 'SF Pro Rounded', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
              }}
            >
              Resume
            </h2>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/70 border border-white/15">
              Q2 2026 Verified
            </span>
          </div>
          <p className="text-sm sm:text-base text-white/60 font-light">
            0→1 Product Discovery · Autonomous AI Systems · Web3 Ecosystems
          </p>
        </div>

        {/* Action: Download authentic PDFs */}
        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <a
            href="/Resume-Product-Manager-Alim-Khalelov.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Resume-Product-Manager-Alim-Khalelov.pdf"
            className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/20 hover:border-white/40 text-xs sm:text-sm font-medium text-white transition-all backdrop-blur-md shadow-xs !no-underline"
            title="Download PDF resume (Q2 2026 Edition)"
          >
            <Download className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
            <span>Download CV (PDF)</span>
          </a>

          <a
            href="/Resume-Product-Manager-Alim-Khalelov-Q3-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Resume-Product-Manager-Alim-Khalelov-Q3-2025.pdf"
            className="group hidden sm:inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/12 border border-white/15 hover:border-white/30 text-xs font-mono text-white/70 hover:text-white transition-all backdrop-blur-md !no-underline"
            title="Download technical edition (Q3 2025)"
          >
            <FileText className="w-3.5 h-3.5 text-white/60 group-hover:text-white" />
            <span>Q3 2025 Tech PDF</span>
          </a>
        </div>
      </div>

      {/* About Summary Callout Card (Radical restraint, frosted matte glass) */}
      <div className="relative p-5 sm:p-6 rounded-2xl bg-white/[0.04] border border-white/15 backdrop-blur-xl flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-mono text-white/50 uppercase tracking-wider">
          <span>Executive Discovery Profile</span>
          <span>5+ Years Startup Experience</span>
        </div>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
          Product Builder (0→1) specializing in product discovery under extreme uncertainty. I focus on fast-cycle experimentation, rapid prototyping, and lean go-to-market, validating ideas before heavy execution. Known for aligning founders, engineers, and users without formal authority. Startups bring me in when there is no PMF, unclear users, or chaotic scope, and I turn that into a coherent, testable product system.
        </p>
      </div>

      {/* Segmented Navigation Bar */}
      <div
        role="tablist"
        aria-label="Resume sections"
        className="flex items-center p-1 rounded-2xl bg-white/[0.06] border border-white/15 backdrop-blur-xl overflow-x-auto scrollbar-none gap-1"
      >
        <button
          role="tab"
          aria-selected={activeTab === "experience"}
          onClick={() => setActiveTab("experience")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "experience"
              ? "bg-white/20 text-white shadow-xs border border-white/25"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Experience</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "skills"}
          onClick={() => setActiveTab("skills")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "skills"
              ? "bg-white/20 text-white shadow-xs border border-white/25"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Skills & Stack</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "education"}
          onClick={() => setActiveTab("education")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "education"
              ? "bg-white/20 text-white shadow-xs border border-white/25"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Education & Awards</span>
        </button>

        <button
          role="tab"
          aria-selected={activeTab === "all"}
          onClick={() => setActiveTab("all")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
            activeTab === "all"
              ? "bg-white/20 text-white shadow-xs border border-white/25"
              : "text-white/60 hover:text-white hover:bg-white/5"
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>All in One</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="flex flex-col gap-10">
        {/* 1. EXPERIENCE PANEL */}
        {(activeTab === "experience" || activeTab === "all") && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-white/70" />
                <span>Work Experience</span>
              </h3>
              <span className="text-xs font-mono text-white/50">3 Key Roles</span>
            </div>

            <div className="flex flex-col gap-6">
              {EXPERIENCES.map((exp) => (
                <article
                  key={exp.role + exp.company}
                  className="p-6 sm:p-7 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/15 hover:border-white/25 transition-all backdrop-blur-xl flex flex-col gap-4"
                >
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex flex-col gap-1">
                      <h4
                        className="text-lg sm:text-xl font-bold text-white tracking-tight"
                        style={{ fontFamily: "'Google Sans', sans-serif" }}
                      >
                        {exp.role}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-white/70">
                        <span className="text-white/90 font-medium">{exp.company}</span>
                        <span>·</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-white/80 self-start sm:self-auto shrink-0">
                      {exp.period}
                    </div>
                  </div>

                  {/* Summary */}
                  <p className="text-sm text-white/70 font-light leading-relaxed">
                    {exp.summary}
                  </p>

                  {/* Bullets with Bold Highlights */}
                  <ul className="flex flex-col gap-3 pt-2 border-t border-white/10">
                    {exp.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-2 shrink-0" />
                        <div className="text-white/80">
                          <strong className="text-white font-medium">
                            {bullet.highlight}:
                          </strong>{" "}
                          <span>{bullet.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* 2. SKILLS & TECH STACK PANEL */}
        {(activeTab === "skills" || activeTab === "all") && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-white/70" />
                <span>Competencies & Stack</span>
              </h3>
              <span className="text-xs font-mono text-white/50">4 Core Domains</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {SKILL_GROUPS.map((group) => {
                const Icon = group.icon;
                return (
                  <div
                    key={group.title}
                    className="p-5 sm:p-6 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/15 hover:border-white/25 transition-all backdrop-blur-xl flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-2.5 pb-2 border-b border-white/10">
                      <Icon className="w-4 h-4 text-white/70" />
                      <h4 className="text-base font-semibold text-white tracking-tight">
                        {group.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-lg bg-white/8 hover:bg-white/15 border border-white/15 hover:border-white/30 text-xs font-mono text-white/85 transition-colors"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. EDUCATION & AWARDS PANEL */}
        {(activeTab === "education" || activeTab === "all") && (
          <div className="flex flex-col gap-8">
            {/* Education subsection */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-white/70" />
                  <span>Academic Degrees & International Exchange</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EDUCATION.map((edu, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/15 hover:border-white/25 transition-all backdrop-blur-xl flex flex-col gap-2 justify-between"
                  >
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono px-2 py-0.5 rounded bg-white/10 text-white/80 border border-white/15">
                          {edu.degree}
                        </span>
                        <span className="text-xs font-mono text-white/50">{edu.period}</span>
                      </div>
                      <h4 className="text-base font-bold text-white tracking-tight mt-1">
                        {edu.field}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/70">
                        {edu.institution}
                        {edu.location ? `, ${edu.location}` : ""}
                      </p>
                    </div>

                    {edu.note && (
                      <div className="text-[11px] font-mono text-white/60 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 self-start mt-1">
                        {edu.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements & Hackathon Wins */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-white/70" />
                  <span>Key Honors & Hackathon Wins</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ACHIEVEMENTS.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/15 hover:border-white/25 transition-all backdrop-blur-xl flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-white/50">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
