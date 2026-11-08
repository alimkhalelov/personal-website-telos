"use client";

import * as React from "react";
import { Download, ArrowUpRight } from "lucide-react";

interface RoleExperience {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

const EXPERIENCES: RoleExperience[] = [
  {
    role: "Independent AI Product Consultant",
    company: "Autonomous Practice & Ventures",
    period: "01/2025 - Present",
    location: "Remote",
    bullets: [
      "AI Property Staging: Architected a full-stack Next.js system with multi-agent validation, cutting time-to-market by 70%.",
      "Automated Prospecting: Programmed an autonomous lead-generation engine processing 100+ qualified leads daily.",
      "Local Agent Workspace: Integrated multi-agent environments for research and PRD drafting, cutting routine workflows by 80%.",
    ],
  },
  {
    role: "Senior / Founding Product Manager",
    company: "Cryptomeria Capital Group",
    period: "04/2023 - 01/2025",
    location: "Dubai, UAE (Remote)",
    bullets: [
      "0→1 Discovery: Prototyped and validated 7+ Web3 products (NFTs, Telegram mini-apps), establishing early shutdown criteria to protect capital.",
      "Telegram Mini-Apps & Growth: Designed gamified onboarding mini-apps as the primary user acquisition engine; scaled community 0 → 10K in 30 days.",
      "Narrative AI & Partnerships: Directed an automated AI storytelling pipeline (lorebook, 60 comics, 10 trailers); closed 50+ strategic deals including Animoca Brands and The Sandbox.",
    ],
  },
  {
    role: "Junior Product Manager",
    company: "Startup Studio B51",
    period: "09/2021 - 05/2023",
    location: "Tomsk (Part-time)",
    bullets: [
      "Founder Mentorship: Mentored student founders on rapid assumption testing (RAT) and lean MVP design before writing code.",
      "Funding & Grants: Connected early-stage teams with VC networks, securing government startup grants (UMNIK, Start, Student Startup).",
    ],
  },
];

export function ResumeSection() {
  return (
    <section id="resume" className="flex flex-col gap-8 w-full scroll-mt-24">
      {/* Section Header (Matches Posts header styling) */}
      <div className="flex items-center justify-between pb-1">
        <h2
          className="text-3xl font-bold tracking-tight text-white"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          Experience
        </h2>

        {/* Download PDF button (Matches Network pill styling) */}
        <a
          href="/Resume-Product-Manager-Alim-Khalelov.pdf"
          target="_blank"
          rel="noopener noreferrer"
          download="Resume-Product-Manager-Alim-Khalelov.pdf"
          className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border border-white/20 hover:border-white/60 bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all text-xs sm:text-sm font-medium !no-underline text-white shadow-xs cursor-pointer group"
          title="Download PDF Resume (Q2 2026 Edition)"
        >
          <span>Download CV</span>
          <Download className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
        </a>
      </div>

      {/* Experience Roles List (Directly on background, no card podlozhka, large comfortable typography) */}
      <div className="flex flex-col gap-10 sm:gap-12">
        {EXPERIENCES.map((item) => (
          <article key={item.role + item.company} className="flex flex-col gap-3">
            {/* Role title & Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4">
              <h3
                className="text-xl sm:text-2xl font-bold text-white tracking-tight"
                style={{ fontFamily: "'Google Sans', sans-serif" }}
              >
                {item.role}
              </h3>
              <time
                className="text-sm sm:text-base font-mono text-white/50 shrink-0"
              >
                {item.period}
              </time>
            </div>

            {/* Company & Location subtitle */}
            <p className="text-base text-white/60 font-light">
              <span>{item.company}</span>
              <span className="mx-2 text-white/30">·</span>
              <span>{item.location}</span>
            </p>

            {/* Concise Impact Bullets (Large, comfortable text matching Hero bio) */}
            <ul className="flex flex-col gap-2.5 pt-1 text-base sm:text-lg text-white/85 font-light leading-relaxed">
              {item.bullets.map((bullet, idx) => {
                const [lead, ...rest] = bullet.split(":");
                const detail = rest.join(":");
                return (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 mt-3 shrink-0" />
                    <span>
                      {detail ? (
                        <>
                          <strong className="font-medium text-white">{lead}:</strong>
                          {detail}
                        </>
                      ) : (
                        bullet
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
