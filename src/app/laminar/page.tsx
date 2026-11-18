import Link from "next/link";
import { headers } from "next/headers";
import { getSortedArticles } from "@/lib/mdx";
import { ArrowUpRight, Mail, Phone, FileText, Sparkles, Terminal } from "lucide-react";
import { FeaturedProjectsStrip } from "@/components/projects/featured-projects-strip";
import { OneUiWallpaper } from "@/components/one-ui-wallpaper";
import { HomePostsList } from "@/components/home/home-posts-list";
import { LeftRailSectionIndicator } from "@/components/home/left-rail-section-indicator";
import { recordClick } from "@/lib/link-tracker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alim Khalelov — Systems Architect & Product Designer // Laminar",
  description: "Targeted 0→1 Proof of Work for Laminar (YC S24): AI systems, agent observability, and Just-in-Time UX architectures by Alim Khalelov.",
};

function TelegramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701v.001l-.313 4.69c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.431z" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default async function LaminarPortfolioPage() {
  const articles = getSortedArticles();

  // Record visit analytics for outreach tracking
  try {
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headersList.get("x-real-ip") ||
      "127.0.0.1";
    const country = headersList.get("x-vercel-ip-country") || "Unknown";
    const city = decodeURIComponent(headersList.get("x-vercel-ip-city") || "") || "Unknown";
    const region = headersList.get("x-vercel-ip-country-region") || "";
    const referer = headersList.get("referer") || "Direct Email / Outreach";
    const userAgent = headersList.get("user-agent") || "";

    recordClick({
      slug: "laminar",
      targetUrl: "https://alim.dest.page/laminar",
      title: "Laminar Targeted Portfolio (Robert Kim / Din Mailibay)",
      ip,
      country,
      city,
      region,
      referer,
      userAgent,
    }).catch(() => {});
  } catch (e) {}

  return (
    <main className="min-h-screen relative overflow-x-clip bg-black selection:bg-white/20 text-white">
      {/* Dynamic Depth Wallpapers */}
      <OneUiWallpaper />

      {/* Left Rail Section Indicator */}
      <LeftRailSectionIndicator />

      {/* Main Single Column Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 pb-24 flex flex-col gap-16 sm:gap-20">
        
        {/* Hero Section */}
        <section id="hero" className="flex flex-col gap-6 sm:gap-7">
          {/* Target Candidate Pill */}
          <div className="flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-mono uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>Target Brief // Laminar (YC S24)</span>
          </div>

          <div className="flex flex-col gap-2">
            <h1 
              id="hero-title"
              className="text-4xl sm:text-6xl font-light tracking-tight text-white/95"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              Alim Khalelov
              <span
                id="hero-baseline-probe"
                className="inline-block w-0 h-0 align-baseline pointer-events-none select-none opacity-0"
                aria-hidden="true"
              />
            </h1>
            <p className="text-lg sm:text-xl text-white/60 font-light tracking-tight mt-1">
              AI Systems Architect &amp; Product Designer
            </p>
          </div>

          {/* Frosted Matte Glass Squircle Icon Buttons */}
          <div className="flex items-center gap-3.5 sm:gap-4 pt-1">
            {/* Mail */}
            <a
              href="mailto:alim.khalelov@gmail.com"
              aria-label="Email"
              title="Email: alim.khalelov@gmail.com"
              className="group relative w-12 h-12 rounded-[16px] bg-white/12 hover:bg-white/22 active:bg-white/30 backdrop-blur-2xl border border-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-108 active:scale-95 transition-all duration-200 overflow-hidden !no-underline cursor-pointer"
            >
              <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-[16px]" />
              <Mail className="w-5 h-5 text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110" />
            </a>

            {/* Telegram */}
            <a
              href="https://t.me/AlimLLC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              title="Telegram: @AlimLLC"
              className="group relative w-12 h-12 rounded-[16px] bg-white/12 hover:bg-white/22 active:bg-white/30 backdrop-blur-2xl border border-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-108 active:scale-95 transition-all duration-200 overflow-hidden !no-underline cursor-pointer"
            >
              <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-[16px]" />
              <TelegramIcon className="w-5 h-5 text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/alimzhan-khalelov"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn: /in/alimzhan-khalelov"
              className="group relative w-12 h-12 rounded-[16px] bg-white/12 hover:bg-white/22 active:bg-white/30 backdrop-blur-2xl border border-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-108 active:scale-95 transition-all duration-200 overflow-hidden !no-underline cursor-pointer"
            >
              <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-[16px]" />
              <LinkedinIcon className="w-5 h-5 text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110" />
            </a>

            {/* Call / Phone */}
            <a
              href="tel:+77053508033"
              aria-label="Call"
              title="Call: +7 705 350 80 33"
              className="group relative w-12 h-12 rounded-[16px] bg-white/12 hover:bg-white/22 active:bg-white/30 backdrop-blur-2xl border border-white/20 hover:border-white/40 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] flex items-center justify-center hover:scale-108 active:scale-95 transition-all duration-200 overflow-hidden !no-underline cursor-pointer"
            >
              <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-white/25 to-transparent pointer-events-none rounded-t-[16px]" />
              <Phone className="w-5 h-5 text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-110" />
            </a>

            {/* Laminar Targeted Resume Button (Rectangular Frosted Glass Pill) */}
            <a
              href="/2026_Alim_Khalelov_Laminar_Product_Designer_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Laminar Resume"
              title="Download Laminar Tailored Resume (PDF)"
              className="group relative h-12 px-6 sm:px-7 rounded-[16px] bg-white/12 hover:bg-white/22 active:bg-white/30 backdrop-blur-2xl border border-sky-400/40 hover:border-sky-400/70 shadow-[0_8px_32px_0_rgba(56,189,248,0.2)] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 overflow-hidden !no-underline cursor-pointer"
            >
              <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-sky-400/25 to-transparent pointer-events-none rounded-t-[16px]" />
              <span className="text-base sm:text-lg font-bold tracking-tight text-sky-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-transform group-hover:scale-105">
                Resume
              </span>
            </a>
          </div>

          {/* Crisp Bio Tailored for Laminar */}
          <div className="space-y-3 pt-1">
            <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed font-light">
              5+ years shipping 0-to-1 products across AI &amp; systems architecture. Specializing in turning complex multi-agent execution traces into clear, actionable operator signals without cognitive overload.
            </p>
            <p className="text-xs sm:text-sm text-white/50 max-w-2xl leading-relaxed font-mono">
              Prepared for Robert Kim &amp; Dinmukhamed Mailibay. Featured PoW below highlights live code prototyping, DAG execution engines, and enterprise AI evaluation.
            </p>
          </div>
        </section>

        {/* Tailored Proof of Work Strip: Nebuly #1, Ocus #2, Plain #3 */}
        <FeaturedProjectsStrip order={["nebuly", "ocus", "goal-classifier", "residual-intellect", "tempo"]} />

        {/* Posts Section */}
        <HomePostsList initialArticles={articles} />

        {/* Network & Index */}
        <section id="network" className="flex flex-col gap-6 pt-4">
          <h2 className="text-lg font-medium text-white/70 uppercase tracking-wider text-center sm:text-left">
            Network &amp; Index
          </h2>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
            <Link
              href="/wiki"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/60 bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all text-sm font-medium !no-underline text-white shadow-xs"
            >
              Knowledge Wiki
              <ArrowUpRight className="w-3 h-3 text-white/70" />
            </Link>
            <a
              href="https://github.com/alimkhalelov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/60 bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all text-sm font-medium !no-underline text-white shadow-xs"
            >
              GitHub
              <ArrowUpRight className="w-3 h-3 text-white/70" />
            </a>
            <a
              href="https://calendar.app.google/oAzWxXbhNbwFA7Mg6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-sky-400/30 hover:border-sky-400/60 bg-sky-500/10 hover:bg-sky-500/20 backdrop-blur-md transition-all text-sm font-medium !no-underline text-sky-300 shadow-xs"
            >
              Book 15m Sync
              <ArrowUpRight className="w-3 h-3 text-sky-400" />
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
