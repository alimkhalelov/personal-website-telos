"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, FileText, Plus, Trash2, Edit3, Loader2, Brain, ChevronDown, RefreshCw, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ArticleMeta } from "@/lib/mdx";

type BraindumpItem = {
  id: string;
  text: string;
  result: string;
  status: 'generating' | 'done' | 'error';
  startedAt: number;
  elapsed: number;
};

export default function DashboardClient({ initialArticles }: { initialArticles: ArticleMeta[] }) {
  const [articles, setArticles] = useState(initialArticles);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  
  // Braindump State
  const [braindumps, setBraindumps] = useState<BraindumpItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [braindumpText, setBraindumpText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const router = useRouter();

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("telos_braindumps");
      if (saved) {
        try {
          setBraindumps(JSON.parse(saved));
        } catch(e) {}
      }
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("telos_braindumps", JSON.stringify(braindumps));
    }
  }, [braindumps, isLoaded]);

  // Timer & Timeout effect
  useEffect(() => {
    const interval = setInterval(() => {
      setBraindumps(prev => prev.map(bd => {
        if (bd.status === 'generating') {
          const newElapsed = Math.floor((Date.now() - bd.startedAt) / 1000);
          if (newElapsed > 120) {
            return { ...bd, elapsed: newElapsed, status: 'error' };
          }
          return { ...bd, elapsed: newElapsed };
        }
        return bd;
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

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

  const handleBraindumpSubmit = () => {
    if (!braindumpText.trim()) return;
    const newId = Date.now().toString();
    const newItem: BraindumpItem = {
      id: newId,
      text: braindumpText,
      result: "",
      status: 'generating',
      startedAt: Date.now(),
      elapsed: 0
    };
    setBraindumps(prev => [newItem, ...prev]);
    setIsModalOpen(false);
    setBraindumpText("");
    
    // Start generating
    generateBraindump(newItem);
  };

  const generateBraindump = async (item: BraindumpItem) => {
    try {
      // Set to generating in case this is a retry
      setBraindumps(prev => prev.map(bd => bd.id === item.id ? { ...bd, status: 'generating', startedAt: Date.now(), elapsed: 0, result: "" } : bd));
      
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: item.text }],
          skill: "blog-post-writer"
        })
      });

      if (!res.ok) throw new Error("API Error");

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value, { stream: true });
      }

      setBraindumps(prev => prev.map(bd => bd.id === item.id ? { ...bd, status: 'done', result: fullText } : bd));

    } catch (e) {
      console.error(e);
      setBraindumps(prev => prev.map(bd => bd.id === item.id ? { ...bd, status: 'error' } : bd));
    }
  };

  const deleteBraindump = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Delete this generated item?")) return;
    setBraindumps(prev => prev.filter(bd => bd.id !== id));
  };

  return (
    <div className="flex flex-col gap-12">
      
      {/* BRAINDUMP UI SECTION */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-medium tracking-tight">AI Generations</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative overflow-hidden rounded-md bg-accent/10 border border-accent/20 px-6 py-2.5 text-sm font-medium text-accent hover:text-white transition-all hover:bg-accent flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            <span>Braindump</span>
            <ChevronDown className="w-3 h-3 ml-1 opacity-70" />
          </button>
        </div>

        {braindumps.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {braindumps.map((bd) => (
                <motion.div
                  key={bd.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => {
                    if (bd.status === 'done') {
                      router.push(`/admin/draft?braindumpId=${bd.id}`);
                    }
                  }}
                  className={`group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl border transition-all gap-4 ${
                    bd.status === 'done' 
                      ? 'border-accent/30 bg-accent/5 hover:bg-accent/10 cursor-pointer' 
                      : bd.status === 'error'
                      ? 'border-red-500/30 bg-red-500/5'
                      : 'border-white/5 bg-white/5'
                  }`}
                >
                  <div className="flex flex-col gap-1 overflow-hidden">
                    <h3 className="text-base font-medium tracking-tight truncate max-w-lg text-foreground/90">
                      {bd.text.substring(0, 60)}{bd.text.length > 60 ? '...' : ''}
                    </h3>
                    <div className="flex items-center gap-3 text-xs font-mono mt-1">
                      {bd.status === 'generating' && (
                        <span className="flex items-center gap-1.5 text-accent">
                          <Loader2 className="w-3 h-3 animate-spin" /> Generating... ({bd.elapsed}s)
                        </span>
                      )}
                      {bd.status === 'done' && (
                        <span className="flex items-center gap-1.5 text-green-500">
                          Ready to Publish (Took {bd.elapsed}s)
                        </span>
                      )}
                      {bd.status === 'error' && (
                        <span className="flex items-center gap-1.5 text-red-400">
                          Generation Error / Timeout
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {bd.status === 'error' && (
                      <button
                        onClick={(e) => { e.stopPropagation(); generateBraindump(bd); }}
                        className="p-2 rounded-md bg-white/5 hover:bg-accent/20 hover:text-accent text-muted-foreground transition-colors"
                        title="Regenerate"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    )}
                    {bd.status === 'done' && (
                      <div className="p-2 text-accent">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                    <button
                      onClick={(e) => deleteBraindump(bd.id, e)}
                      className="p-2 rounded-md bg-white/5 hover:bg-red-500/20 hover:text-red-500 text-muted-foreground transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* SYSTEM LOGS SECTION */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h2 className="text-xl font-medium tracking-tight">System Logs ({articles.length})</h2>
          <div className="flex gap-4">
            <Link
              href="/admin/draft"
              className="group relative overflow-hidden rounded-md bg-white/10 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-white/20"
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
                onClick={() => router.push(`/admin/draft?slug=${article.slug}`)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                className="group relative flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-accent/30 transition-all gap-4 cursor-pointer"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold tracking-tight group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mt-1">
                    <span className="flex items-center gap-1.5"><FileText className="w-3 h-3"/> {article.slug}.mdx</span>
                    {article.hidden && <span className="text-accent">Hidden</span>}
                    {article.archived && <span className="text-yellow-500">Archived</span>}
                    <span>•</span>
                    <span>{new Date(article.date).toISOString().split('T')[0]}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <Link
                    href={`/admin/draft?slug=${article.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-md bg-white/5 hover:bg-accent/20 hover:text-accent text-muted-foreground transition-colors"
                    title="Edit Log"
                  >
                    <Edit3 className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(article.slug); }}
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

      {/* BRAINDUMP MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#1c1c1c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <Brain className="w-5 h-5 text-accent" />
                  <h3 className="text-lg font-semibold text-white">New Braindump</h3>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-muted-foreground hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4 bg-[#1c1c1c]">
                <textarea 
                  value={braindumpText}
                  onChange={(e) => setBraindumpText(e.target.value)}
                  placeholder="Dump your raw thoughts, architecture, or problems here... The AI will turn it into a high-leverage article."
                  className="w-full h-64 bg-[#252525] border border-white/10 rounded-xl p-4 text-white placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  autoFocus
                />
                <div className="flex justify-end pt-2">
                  <button 
                    onClick={handleBraindumpSubmit}
                    disabled={!braindumpText.trim()}
                    className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
                  >
                    <span>Submit to AI</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
