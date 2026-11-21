import { cookies } from "next/headers";
import { getAnalyticsSummary } from "@/lib/link-tracker";
import { OWNER_COOKIE, verifyOwnerToken } from "@/lib/admin-auth";
import AnalyticsClient from "./AnalyticsClient";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AnalyticsDashboardPage() {
  const cookieStore = await cookies();
  const isOwner = verifyOwnerToken(cookieStore.get(OWNER_COOKIE)?.value);

  if (!isOwner) {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans flex items-center justify-center p-6">
        <form
          method="POST"
          action="/api/owner"
          className="w-full max-w-sm rounded-2xl border border-white/15 bg-card p-6 flex flex-col gap-4"
        >
          <div className="flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">
            <Lock className="w-4 h-4" />
            <span>Protected Analytics</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Enter your admin passphrase to inspect links, click logs, and visitor stats.
          </p>
          <input type="hidden" name="next" value="/admin/analytics" />
          <input
            type="password"
            name="key"
            placeholder="Admin passphrase"
            required
            className="w-full px-3.5 py-2 rounded-lg border border-white/15 bg-background text-sm focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium cursor-pointer"
          >
            Unlock Analytics
          </button>
        </form>
      </div>
    );
  }

  const initialData = getAnalyticsSummary();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent/30 p-8 sm:p-16">
      <div className="max-w-6xl mx-auto flex flex-col gap-10">
        {/* Navigation & Header */}
        <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Link
                href="/admin"
                className="text-muted-foreground hover:text-white transition-colors text-xs font-mono flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Admin Hub</span>
              </Link>
            </div>
            <h1 className="text-4xl font-bold tracking-tighter uppercase font-mono">
              Demiurge.OS / Analytics
            </h1>
            <p className="text-muted-foreground text-sm tracking-widest uppercase">
              Custom Links Telemetry &amp; Real-Time Visitor Stream
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            >
              Content &amp; Articles
            </Link>
            <Link
              href="/admin/analytics"
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 transition-colors"
            >
              Links &amp; Analytics
            </Link>
            <Link
              href="/admin/draft"
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-colors"
            >
              Drafting Room
            </Link>
          </div>
        </header>

        {/* Client Interface */}
        <AnalyticsClient initialData={initialData} />
      </div>
    </div>
  );
}
