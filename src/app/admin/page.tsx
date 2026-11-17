import { getSortedArticles } from "@/lib/mdx";
import DashboardClient from "./DashboardClient";
import Link from "next/link";

export default function AdminDashboard() {
  const articles = getSortedArticles(true);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 p-8 sm:p-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold tracking-tighter uppercase font-mono">Demiurge.OS</h1>
            <p className="text-muted-foreground text-sm tracking-widest uppercase">Content Management & Orchestration</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/10 text-white font-semibold transition-colors"
            >
              Content & Articles
            </Link>
            <Link
              href="/admin/analytics"
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-white/80 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors"
            >
              📊 Links & Analytics
            </Link>
            <Link
              href="/admin/draft"
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            >
              Drafting Room
            </Link>
          </div>
        </header>

        <DashboardClient initialArticles={articles} />
      </div>
    </div>
  );
}
