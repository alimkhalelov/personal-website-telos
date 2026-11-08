"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";

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

const RESUME_TEXT = `Alim Khalelov | Product Manager (0→1 | AI & Web3)
Email: alim.khalelov@gmail.com | Telegram: @AlimLLC | LinkedIn: alimzhan-khalelov
Portfolio: https://alim.dest.page

EXPERIENCE:

• Independent AI Product Consultant (01/2025 - Present · Remote)
  - AI Property Staging: Architected a full-stack Next.js system with multi-agent validation, cutting time-to-market by 70%.
  - Automated Prospecting: Programmed an autonomous lead-generation engine processing 100+ qualified leads daily.
  - Local Agent Workspace: Integrated multi-agent environments for research and PRD drafting, cutting routine workflows by 80%.

• Senior / Founding Product Manager - Cryptomeria Capital Group (04/2023 - 01/2025 · Dubai, UAE)
  - 0→1 Discovery: Prototyped and validated 7+ Web3 products (NFTs, Telegram mini-apps), establishing early shutdown criteria to protect capital.
  - Telegram Mini-Apps & Growth: Designed gamified onboarding mini-apps as the primary user acquisition engine; scaled community 0 → 10K in 30 days.
  - Narrative AI & Partnerships: Directed an automated AI storytelling pipeline (lorebook, 60 comics, 10 trailers); closed 50+ strategic deals including Animoca Brands and The Sandbox.

• Junior Product Manager - Startup Studio B51 (09/2021 - 05/2023 · Tomsk)
  - Founder Mentorship: Mentored student founders on rapid assumption testing (RAT) and lean MVP design before writing code.
  - Funding & Grants: Connected early-stage teams with VC networks, securing government startup grants (UMNIK, Start, Student Startup).

CV PDF: https://alim.dest.page/Resume-Product-Manager-Alim-Khalelov.pdf`;

export function ResumeSection() {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(RESUME_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is restricted
      const textarea = document.createElement("textarea");
      textarea.value = RESUME_TEXT;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <section id="resume" className="flex flex-col gap-6 sm:gap-8 w-full scroll-mt-24">
      {/* Section Header:
          - Experience title hidden on desktop (lg:hidden) because Left Rail already displays "Experience"
          - Frosted squircle Copy button placed on the right, matching Hero icon buttons
      */}
      <div className="flex items-center justify-between pb-1">
        <h2
          className="text-2xl font-bold tracking-tight text-white lg:hidden"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          Experience
        </h2>

        {/* Copy Button (Frosted Matte Glass Squircle, exactly like Hero icons) */}
        <div className="ml-auto flex items-center gap-3">
          {copied && (
            <span className="text-xs font-mono text-emerald-300 animate-in fade-in duration-200">
              Copied to clipboard
            </span>
          )}
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy resume experience to clipboard"
            title={copied ? "Copied!" : "Copy experience summary"}
            className="group relative w-12 h-12 rounded-[16px] bg-white/12 hover:bg-white/22 active:bg-white/30 backdrop-blur-2xl border border-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-108 active:scale-95 transition-all duration-200 overflow-hidden cursor-pointer"
          >
            <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-[16px]" />
            {copied ? (
              <Check className="w-5 h-5 text-emerald-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]" />
            ) : (
              <Copy className="w-5 h-5 text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110" />
            )}
          </button>
        </div>
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
