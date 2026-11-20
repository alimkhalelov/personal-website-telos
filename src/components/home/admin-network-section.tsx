"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { useAuth } from "@/components/auth-context";

/**
 * Admin-only terminal links section (Knowledge Wiki, Telegram, GitHub, LinkedIn).
 * Hidden from public visitors, matching HomePostsList visibility behavior.
 */
export function AdminNetworkSection() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  return (
    <section id="network" className="flex flex-col gap-6 pt-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-medium text-white/70 uppercase tracking-wider text-center sm:text-left">
          Network &amp; Index
        </h2>
        <div className="flex items-center gap-1.5 text-xs text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
          <span>Admin Only</span>
        </div>
      </div>

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
          href="https://github.com/alimkhalelov"
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
  );
}
