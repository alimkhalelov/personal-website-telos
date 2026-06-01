"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Plus, Trash2, Edit3, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ArticleMeta } from "@/lib/mdx";

export default function DashboardClient({ initialArticles }: { initialArticles: ArticleMeta[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async (slug: string) => {
    if (!confirm("Are you sure you want to delete this log?")) return;
    setIsDeleting(slug);
    try {
      const res = await fetch(`/api/cms?slug=${slug}`, { method: "DELETE" });
      if (res.ok) {
        setArticles((prev) => prev.filter((a) => a.slug !== slug));
      } else {
        alert("Failed to delete");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting file.");
    } finally {
      setIsDeleting(null);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium tracking-tight">System Logs ({articles.length})</h2>
        <div className="flex gap-4">
          <Link
            href="/admin/draft"
            className="group relative overflow-hidden rounded-md bg-accent px-6 py-2.5 text-sm font-medium text-accent-foreground transition-all hover:bg-accent/90"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Log
            </span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {articles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center text-muted-foreground border border-dashed border-white/10 rounded-xl bg-white/5"
            >
              No logs emitted yet. Start typing.
            </motion.div>
          )}
          {articles.map((article, idx) => (
            <motion.div
              key={article.slug}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-accent/30 transition-all gap-4"
            >
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mt-1">
                  <span className="flex items-center gap-1.5"><FileText className="w-3 h-3"/> {article.slug}.mdx</span>
                  <span>•</span>
                  <span>{new Date(article.date).toISOString().split('T')[0]}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                {/* We link edit to draft, assuming draft handles existing post editing, or just drafting new ones */}
                <Link
                  href={`/admin/draft?slug=${article.slug}`}
                  className="p-2 rounded-md bg-white/5 hover:bg-accent/20 hover:text-accent text-muted-foreground transition-colors"
                  title="Edit Log"
                >
                  <Edit3 className="w-4 h-4" />
                </Link>
                <button
                  onClick={() => handleDelete(article.slug)}
                  disabled={isDeleting === article.slug}
                  className="p-2 rounded-md bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-muted-foreground transition-colors disabled:opacity-50"
                  title="Delete Log"
                >
                  {isDeleting === article.slug ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
