// @ts-nocheck
"use client";

import { Save, ArrowLeft, Twitter, Linkedin, Send } from "lucide-react";
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
  const braindumpId = searchParams.get("braindumpId");
  
  const [slug, setSlug] = useState("");
  const [editableContent, setEditableContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // Threads State
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  
  const editorRef = useRef<RichTextEditorRef>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (existingSlug) {
      setSlug(existingSlug);
      fetch(`/api/cms?slug=${existingSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data.content) {
            setEditableContent(data.content);
          }
          setIsLoaded(true);
        })
        .catch(console.error);
    }
  }, [existingSlug]);

  // Load draft state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (braindumpId) {
        const braindumps = JSON.parse(localStorage.getItem("telos_braindumps") || "[]");
        const dump = braindumps.find((b: any) => b.id === braindumpId);
        if (dump && dump.result) {
          setEditableContent(dump.result);
        }
        setIsLoaded(true);
      } else if (!existingSlug) {
        const savedThreads = localStorage.getItem("telos_draft_threads");
        if (savedThreads) {
          try {
            setThreads(JSON.parse(savedThreads));
          } catch(e) {}
        }
        const savedContent = localStorage.getItem("telos_draft_content");
        if (savedContent) setEditableContent(savedContent);

        const savedSlug = localStorage.getItem("telos_draft_slug");
        if (savedSlug) setSlug(savedSlug);
        
        setIsLoaded(true);
      }
    }
  }, [existingSlug, braindumpId]);

  // Save state to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && isLoaded && !braindumpId) {
      localStorage.setItem("telos_draft_threads", JSON.stringify(threads));
      
      if (!existingSlug) {
        localStorage.setItem("telos_draft_content", editableContent);
        localStorage.setItem("telos_draft_slug", slug);
      }
    }
  }, [threads, editableContent, slug, existingSlug, isLoaded, braindumpId]);

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

  const handleAppendTasks = (text: string) => {
    editorRef.current?.appendAsTasks(text);
  };

  const handleResolveSuggestion = (id: string, accept: boolean) => {
    editorRef.current?.resolveSuggestion(id, accept);
    if (accept) {
      // Option: Remove thread after accept
      // setThreads(prev => prev.filter(t => t.id !== id));
    }
  };

  const handleCopyPrompt = (platform: 'x' | 'linkedin' | 'telegram') => {
    let prompt = '';
    if (platform === 'x') {
      prompt = `Сгенерируй виральный тред для X (Twitter) на основе следующего текста. Используй короткие предложения, мощный хук в первом твите, делай пробелы между строками и минимум эмодзи:\n\n${editableContent}`;
    } else if (platform === 'linkedin') {
      prompt = `Сгенерируй профессиональный пост для LinkedIn на основе следующего текста. Добавь ключевые инсайты (bullet points) и призыв к дискуссии в конце, чтобы собрать комментарии:\n\n${editableContent}`;
    } else if (platform === 'telegram') {
      prompt = `Сгенерируй авторский пост для Telegram-канала на основе следующего текста. Сделай его емким, абзацы короткими, выдели главное жирным и добавь структуру:\n\n${editableContent}`;
    }

    navigator.clipboard.writeText(prompt).then(() => {
      alert(`Промпт для ${platform.toUpperCase()} скопирован в буфер обмена! Можно вставлять в ChatGPT/Claude.`);
    }).catch(() => {
      alert("Не удалось скопировать текст.");
    });
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

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 mr-4 border-r border-border/50 pr-4">
              <button 
                onClick={() => handleCopyPrompt('x')} 
                title="Copy X (Twitter) Prompt"
                className="p-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-md transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleCopyPrompt('linkedin')} 
                title="Copy LinkedIn Prompt"
                className="p-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-md transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </button>
              <button 
                onClick={() => handleCopyPrompt('telegram')} 
                title="Copy Telegram Prompt"
                className="p-2 text-muted hover:text-foreground hover:bg-accent/10 rounded-md transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
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
            <div className="flex-1 max-w-3xl bg-background rounded-xl" onClick={(e) => {
              // Only clear if clicking outside the text content
              if (e.target === e.currentTarget) setActiveThreadId(null);
            }}>
              <RichTextEditor 
                ref={editorRef}
                content={editableContent}
                activeThreadId={activeThreadId}
                onChange={(md) => setEditableContent(md)}
                onAskAI={(text, commentId, skill) => {
                  setThreads(prev => [...prev, { id: commentId, selectedText: text, initialSkill: skill || 'default' }]);
                  setActiveThreadId(commentId);
                }}
                onActiveThreadChange={(id) => setActiveThreadId(id)}
              />
            </div>

            {/* COMMENTS MARGIN (Google Docs style) */}
            <div className="w-80 shrink-0 hidden md:flex flex-col gap-4">
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
                  onAppendTasks={handleAppendTasks}
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
