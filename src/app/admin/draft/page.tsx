// @ts-nocheck
"use client";

import { Send, Bot, User, FileText, ArrowLeft, Check, Save, MessageSquare, PanelRightClose, PanelRightOpen, MessageSquarePlus } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import RichTextEditor, { RichTextEditorRef } from "@/components/RichTextEditor";
import { ThreadCard } from "@/components/editor/ThreadCard";

type Thread = {
  id: string;
  selectedText: string;
};

function DraftingRoomContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingSlug = searchParams.get("slug");
  
  const [slug, setSlug] = useState("");
  const [editableContent, setEditableContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
      // Option: Close/delete thread on accept?
      // setThreads(prev => prev.filter(t => t.id !== id));
    }
  };

  return (
    <div className="flex h-[100dvh] w-full bg-background overflow-hidden">
      
      {/* LEFT: MAIN EDITOR CANVAS */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarOpen ? 'mr-0' : 'mr-0'}`}>
        
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
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors ${isSidebarOpen ? 'lg:hidden' : ''}`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* EDITOR AREA */}
        <div className="flex-1 overflow-y-auto relative scrollbar-hide">
          <div className="max-w-3xl mx-auto px-6 py-12 sm:py-20 min-h-full">
            <RichTextEditor 
              ref={editorRef}
              content={editableContent}
              onChange={(md) => setEditableContent(md)}
              onAskAI={(text, commentId) => {
                setThreads(prev => [...prev, { id: commentId, selectedText: text }]);
                setActiveThreadId(commentId);
                if (!isSidebarOpen) {
                  setIsSidebarOpen(true);
                }
              }}
            />
          </div>
        </div>
      </main>

      {/* RIGHT: GRILL MODE SIDEBAR */}
      <aside 
        className={`${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 lg:w-[350px] lg:border-l lg:mr-[-350px]'} 
        fixed lg:static right-0 top-0 h-full w-[350px] max-w-[90vw] sm:max-w-sm bg-card/95 backdrop-blur-xl border-l border-border/50 
        flex flex-col shadow-2xl lg:shadow-none transition-transform duration-300 z-50`}
      >
        <div className="h-16 shrink-0 flex items-center justify-between px-5 border-b border-border/50">
          <div className="flex items-center gap-2 text-muted">
            <Bot className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-foreground">AI Comments</span>
          </div>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors lg:hidden"
          >
            <PanelRightClose className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="hidden lg:flex p-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-lg transition-colors"
          >
            <PanelRightOpen className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col scrollbar-hide">
          {threads.length === 0 ? (
            <div className="m-auto text-center flex flex-col items-center justify-center text-muted gap-3 p-4">
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center">
                <MessageSquarePlus className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-sm leading-relaxed">
                Выделите текст в редакторе и нажмите "Ask AI", чтобы добавить комментарий и запросить помощь ИИ.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {threads.map(thread => (
                <ThreadCard
                  key={thread.id}
                  id={thread.id}
                  selectedText={thread.selectedText}
                  isActive={activeThreadId === thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  onDelete={() => {
                    setThreads(prev => prev.filter(t => t.id !== thread.id));
                    if (activeThreadId === thread.id) setActiveThreadId(null);
                    // Optionally remove the mark from editor
                    editorRef.current?.resolveSuggestion(thread.id, false);
                  }}
                  onApplySuggestion={handleApplySuggestion}
                  onResolveSuggestion={handleResolveSuggestion}
                />
              ))}
            </div>
          )}
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE SIDEBAR */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
        />
      )}
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
