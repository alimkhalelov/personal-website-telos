// @ts-nocheck
"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Bot, User, FileText, ArrowLeft, Check, Save, MessageSquare, PanelRightClose, PanelRightOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, Suspense } from "react";
import { useCompletion } from "@ai-sdk/react";
import { useRouter, useSearchParams } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor";

function DraftingRoomContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingSlug = searchParams.get("slug");
  
  const { messages, input, setInput, append, isLoading, error } = useChat();
  const { completion, complete, isLoading: isHumanizing } = useCompletion({
    api: "/api/humanize",
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [slug, setSlug] = useState("");
  const [editableContent, setEditableContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [customError, setCustomError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError("");
    if (!(input || "").trim() || isLoading || isHumanizing) return;
    
    const userText = input;
    setInput(""); 
    
    try {
      await append({
        role: "user",
        content: userText
      });
      // Automatically open sidebar if closed and user submits
      if (!isSidebarOpen) setIsSidebarOpen(true);
    } catch (err: any) {
      setCustomError(err.message || "Ошибка отправки");
      setInput(userText);
    }
  };

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

  const isReady = messages.some(m => m.content.includes(">>>READY_TO_HUMANIZE<<<"));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, completion]);

  // When AI finishes humanizing, append to the editor
  useEffect(() => {
    if (completion) {
      // In a real app we'd want a more robust way to sync tiptap state,
      // but passing it down as a new string or appending works well for this flow.
      setEditableContent((prev) => {
        // Only append if it's not already at the end
        if (prev.endsWith(completion)) return prev;
        return prev + (prev ? "\n\n" : "") + completion;
      });
    }
  }, [completion]);

  const handleHumanize = () => {
    complete("", { body: { messages } });
  };

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
              content={editableContent}
              onChange={(md) => setEditableContent(md)}
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
            <span className="text-sm font-medium text-foreground">Grill Mode AI</span>
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

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide">
          {messages.length === 0 ? (
            <div className="m-auto text-center flex flex-col items-center justify-center text-muted gap-3 p-4">
              <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center">
                <Bot className="w-6 h-6 opacity-50" />
              </div>
              <p className="text-sm leading-relaxed">
                Закинь поток мыслей. Я буду задавать жесткие вопросы, а потом сгенерирую чистовик прямо в редактор.
              </p>
            </div>
          ) : (
            messages.map((m) => (
              <div key={m.id} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`p-3 rounded-2xl max-w-[85%] ${m.role === "user" ? "bg-accent/10 text-foreground rounded-tr-sm" : "bg-background border border-border text-foreground rounded-tl-sm"}`}>
                  <p className="whitespace-pre-wrap text-[13px] sm:text-sm leading-relaxed">
                    {m.content.replace(">>>READY_TO_HUMANIZE<<<", "✅ Контекст собран! Жми кнопку ниже.")}
                  </p>
                </div>
              </div>
            ))
          )}
          
          {(isLoading || isHumanizing) && !completion && (
            <div className="flex gap-3">
              <div className="p-3 rounded-2xl rounded-tl-sm bg-background border border-border flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-1.5 h-1.5 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-border/50 bg-card">
          {isReady && !isHumanizing && (
            <button 
              onClick={handleHumanize}
              className="w-full py-2.5 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 mb-3 shadow-md shadow-accent/20"
            >
              <FileText className="w-4 h-4" />
              Сгенерировать чистовик
            </button>
          )}
          
          <form onSubmit={handleManualSubmit} className="flex flex-col relative group gap-2">
            {(error || customError) && (
              <div className="text-red-500 text-[11px] px-1 mb-1">
                {error?.message || customError}
              </div>
            )}
            <div className="relative flex w-full">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ответить..."
                className="w-full bg-background border border-border rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:border-muted transition-all text-foreground placeholder:text-muted/50"
                disabled={isLoading || isHumanizing}
              />
              <button 
                type="submit" 
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors ${(isLoading || isHumanizing || !(input || "").trim()) ? 'bg-accent/50 text-white/50 cursor-not-allowed' : 'bg-accent hover:bg-accent-hover text-white'}`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
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
