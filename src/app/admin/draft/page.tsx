// @ts-nocheck
"use client";

import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RichTextEditor, { RichTextEditorRef } from "@/components/RichTextEditor";
import { ThreadCard } from "@/components/editor/ThreadCard";

type Thread = {
  id: string;
  selectedText: string;
  initialSkill?: string;
};

function DraftingRoomContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingSlug = searchParams.get("slug");
  
  const [slug, setSlug] = useState("");
  const [editableContent, setEditableContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Threads State
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  
  const editorRef = useRef<RichTextEditorRef>(null);

  useEffect(() => {
    if (existingSlug) {
      setSlug(existingSlug);
      fetch(`/api/cms?slug=${existingSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data.content) {
            setEditableContent(data.content);
          }
        })
        .catch(console.error);
    }
  }, [existingSlug]);

  // Load threads from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("telos_draft_threads");
      if (saved) {
        try {
          setThreads(JSON.parse(saved));
        } catch(e) {}
      }
    }
  }, []);

  // Save threads to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("telos_draft_threads", JSON.stringify(threads));
    }
  }, [threads]);

  const handleSave = async () => {
    if (!slug) return alert("Пожалуйста, введите URL (slug) для поста.");
    if (!editableContent) return alert("Контент пуст.");
    setIsSaving(true);
    
    let finalContent = editableContent;
    if (!finalContent.startsWith("---")) {
      finalContent = `---
title: '${slug.replace(/-/g, " ")}'
date: '${new Date().toISOString()}'
description: 'Новый пост от Demiurge'
---

${finalContent}`;
    }

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, content: finalContent }),
      });
      if (res.ok) {
        router.push("/admin");
      } else {
        const err = await res.json();
        alert("Ошибка при сохранении: " + err.error);
      }
    } catch(e) {
      alert("Ошибка при сохранении");
    } finally {
      setIsSaving(false);
    }
  };

  const handleApplySuggestion = (id: string, text: string) => {
    editorRef.current?.applySuggestion(id, text);
  };

  const handleResolveSuggestion = (id: string, accept: boolean) => {
    editorRef.current?.resolveSuggestion(id, accept);
    if (accept) {
      // Option: Remove thread after accept
      // setThreads(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden">
      
      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        
        {/* TOP HEADER */}
        <header className="h-16 shrink-0 flex items-center justify-between px-6 border-b border-border/50 bg-background/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 -ml-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="h-6 w-[1px] bg-border hidden sm:block"></div>
            <input 
              type="text" 
              placeholder="post-url-slug" 
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              className="bg-transparent border-none text-sm sm:text-base font-medium focus:outline-none focus:ring-0 placeholder:text-muted/50 w-32 sm:w-64"
            />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleSave} 
              disabled={isSaving} 
              className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">{isSaving ? "Saving..." : "Publish"}</span>
            </button>
          </div>
        </header>

        {/* EDITOR AREA + COMMENTS MARGIN */}
        <div className="flex-1 overflow-y-auto relative scrollbar-hide">
          <div className="max-w-6xl mx-auto px-6 py-12 sm:py-20 min-h-full flex items-start gap-8">
            
            {/* EDITOR COLUMN */}
            <div className="flex-1 max-w-3xl bg-background rounded-xl">
              <RichTextEditor 
                ref={editorRef}
                content={editableContent}
                onChange={(md) => setEditableContent(md)}
                onAskAI={(text, commentId, skill) => {
                  setThreads(prev => [...prev, { id: commentId, selectedText: text, initialSkill: skill || 'default' }]);
                  setActiveThreadId(commentId);
                }}
              />
            </div>

            {/* COMMENTS MARGIN (Google Docs style) */}
            <div className="w-80 shrink-0 hidden lg:flex flex-col gap-4">
              {threads.map(thread => (
                <ThreadCard
                  key={thread.id}
                  id={thread.id}
                  selectedText={thread.selectedText}
                  initialSkill={thread.initialSkill}
                  isActive={activeThreadId === thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  onDelete={() => {
                    setThreads(prev => prev.filter(t => t.id !== thread.id));
                    if (activeThreadId === thread.id) setActiveThreadId(null);
                    editorRef.current?.resolveSuggestion(thread.id, false);
                  }}
                  onApplySuggestion={handleApplySuggestion}
                  onResolveSuggestion={handleResolveSuggestion}
                />
              ))}
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}

export default function DraftingRoom() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Загрузка...</div>}>
      <DraftingRoomContent />
    </Suspense>
  );
}
