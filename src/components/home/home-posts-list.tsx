"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Lock } from "lucide-react";
import { ArticleMeta } from "@/lib/mdx";
import { useAuth } from "@/components/auth-context";

interface HomePostsListProps {
  initialArticles: ArticleMeta[];
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

export function HomePostsList({ initialArticles }: HomePostsListProps) {
  const { isAdmin } = useAuth();

  const visibleArticles = React.useMemo(() => {
    if (isAdmin) return initialArticles;
    return initialArticles.filter((a) => a.isPublic === true);
  }, [initialArticles, isAdmin]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-3xl font-bold tracking-tight text-white">Posts</h2>
        {isAdmin && (
          <div className="flex items-center gap-1.5 text-xs text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Admin View ({initialArticles.length} private drafts)</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1">
        {visibleArticles.length > 0 ? (
          visibleArticles.map((article) => {
            const isPrivate = article.isPublic !== true;
            return (
              <Link
                href={`/blog/${article.slug}`}
                key={article.slug}
                className={`group flex items-center justify-between p-4 -mx-4 rounded-xl hover:bg-white/10 transition-all gap-4 !no-underline ${
                  isPrivate ? "opacity-40 hover:opacity-85" : ""
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <time
                    className="text-base w-[105px] shrink-0 group-hover:underline text-white/70"
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                  >
                    {formatDate(article.date)}
                  </time>
                  <h3
                    className="text-base font-medium group-hover:underline transition-colors text-white truncate"
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                  >
                    {article.title}
                  </h3>
                  {isPrivate && (
                    <span className="text-[10px] font-mono uppercase font-bold text-amber-400 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30 shrink-0">
                      Private
                    </span>
                  )}
                </div>
                <div className="flex items-center shrink-0">
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-white/70" />
                </div>
              </Link>
            );
          })
        ) : (
          <div className="p-8 text-center text-white/70 bg-white/5 rounded-2xl border border-white/10 border-dashed flex flex-col items-center gap-2">
            <Lock className="w-5 h-5 text-white/40 mb-1" />
            <p className="text-sm">All research articles and engineering essays are currently set to private.</p>
            <p className="text-xs text-white/40">Sign in as admin via the 3-dots menu to inspect private drafts.</p>
          </div>
        )}
      </div>
    </section>
  );
}
