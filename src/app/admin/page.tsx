import { getSortedArticles } from "@/lib/mdx";
import DashboardClient from "./DashboardClient";

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
        </header>

        <DashboardClient initialArticles={articles} />
      </div>
    </div>
  );
}
