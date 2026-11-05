import Link from "next/link";
import { getSortedArticles } from "@/lib/mdx";
import { ArrowUpRight, Mail, Send, Phone } from "lucide-react";
import { FeaturedProjectsStrip } from "@/components/projects/featured-projects-strip";
import { OneUiWallpaper } from "@/components/one-ui-wallpaper";
import { HomePostsList } from "@/components/home/home-posts-list";
import { LeftRailSectionIndicator } from "@/components/home/left-rail-section-indicator";

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

const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
};

export default function Home() {
  const articles = getSortedArticles();

  return (
    <>
      <OneUiWallpaper />
      <LeftRailSectionIndicator />
      <main className="max-w-4xl mx-auto px-6 py-16 sm:py-28 flex flex-col gap-16 sm:gap-20 w-full relative z-10">
        {/* Minimalist Hero Section */}
        <section id="hero" className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex flex-col gap-1.5">
            {/* Apple SF Pro Rounded Hero Title (Matte Translucent White) */}
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.05] select-none text-white/80 drop-shadow-[0_2px_12px_rgba(0,0,0,0.18)]"
              style={{ fontFamily: "var(--font-sf-pro-rounded), 'SF Pro Rounded', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
            >
              Alim Khalelov
            </h1>
            <p className="text-lg sm:text-xl text-white/60 font-light tracking-tight mt-1">
              AI-Native Product Manager
            </p>
          </div>

          {/* 4 Frosted Matte Glass Squircle Icon Buttons (Etched on Glass, Monochromatic) */}
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
          </div>

          {/* Crisp Bio (No redundant "Product Manager" repeats, no divider line) */}
          <p className="text-base sm:text-lg text-white/90 max-w-2xl leading-relaxed font-light pt-1">
            5+ years shipping 0-to-1 products across AI & Web3. Building multi-agent systems, LLM evaluation pipelines, and rapid prototyping cycles to validate product-market fit before scaling.
          </p>
        </section>

        {/* Featured Showcase & Agent Skills Horizontal Strip */}
        <FeaturedProjectsStrip />

        {/* Posts Section */}
        <HomePostsList initialArticles={articles} />

        {/* Terminal Links (No divider lines) */}
        <section id="network" className="flex flex-col gap-6 pt-4">
          <h2 className="text-lg font-medium text-white/70 uppercase tracking-wider text-center sm:text-left">
            Network & Index
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
              href="https://t.me/AlimLLC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/60 bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all text-sm font-medium !no-underline text-white shadow-xs"
            >
              Telegram
              <ArrowUpRight className="w-3 h-3 text-white/70" />
            </a>
            <a
              href="https://github.com/alimzhankhalelov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/60 bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all text-sm font-medium !no-underline text-white shadow-xs"
            >
              GitHub
              <ArrowUpRight className="w-3 h-3 text-white/70" />
            </a>
            <a
              href="https://linkedin.com/in/alimzhan-khalelov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 hover:border-white/60 bg-white/10 hover:bg-white/15 backdrop-blur-md transition-all text-sm font-medium !no-underline text-white shadow-xs"
            >
              LinkedIn
              <ArrowUpRight className="w-3 h-3 text-white/70" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
