// @ts-nocheck
"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Bot, User, FileText, ArrowLeft, Copy, Check, Save } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, Suspense } from "react";
import { useCompletion } from "@ai-sdk/react";
import { useRouter, useSearchParams } from "next/navigation";

function DraftingRoomContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const existingSlug = searchParams.get("slug");
  
  const { messages, input, setInput, append, isLoading, error } = useChat();
  const { completion, complete, isLoading: isHumanizing } = useCompletion({
    api: "/api/humanize",
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [slug, setSlug] = useState("");
  const [editableContent, setEditableContent] = useState("");
  const [userEdited, setUserEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [customError, setCustomError] = useState("");

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCustomError("");
    if (!input.trim() || isLoading || isHumanizing) return;
    
    const userText = input;
    setInput(""); 
    
    try {
      await append({
        role: "user",
        content: userText
      });
    } catch (err: any) {
      setCustomError(err.message || "Ошибка отправки");
      setInput(userText);
    }
  };

  useEffect(() => {
    if (existingSlug) {
      setSlug(existingSlug);
      setIsEditMode(true);
      fetch(`/api/cms?slug=${existingSlug}`)
        .then(res => res.json())
        .then(data => {
          if (data.content) {
            setEditableContent(data.content);
            setUserEdited(true); // Treat as manually edited so completion doesn't override
          }
        })
        .catch(console.error);
    }
  }, [existingSlug]);

  const isReady = messages.some(m => m.content.includes(">>>READY_TO_HUMANIZE<<<"));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, completion]);

  useEffect(() => {
    if (!userEdited) {
      setEditableContent(completion);
    }
  }, [completion, userEdited]);

  const handleHumanize = () => {
    complete("", { body: { messages } });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editableContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
    <main className="max-w-3xl mx-auto px-6 py-8 sm:py-12 flex flex-col h-[100dvh]">
      <header className="flex items-center justify-between mb-8 shrink-0">
        <Link href="/admin" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">В дашборд</span>
        </Link>
        <div className="px-3 py-1 bg-card border border-border rounded-full text-xs font-mono text-muted">
          Drafting Room (Grill Mode)
        </div>
      </header>

      <div className="flex-1 overflow-y-auto flex flex-col gap-6 pb-6 scrollbar-hide pr-2">
        {messages.length === 0 ? (
          <div className="my-auto text-center flex flex-col items-center justify-center text-muted gap-4">
            <div className="w-16 h-16 rounded-2xl bg-card border border-border flex items-center justify-center">
              <Bot className="w-8 h-8 opacity-50" />
            </div>
            <h2 className="text-lg font-medium text-foreground">Закинь поток мыслей</h2>
            <p className="max-w-md text-sm leading-relaxed">
              Я буду использовать скилл <strong>grill-me</strong>, чтобы задавать тебе жесткие вопросы по сути. Когда соберем базу, сгенерируем чистовик через <strong>humanizer</strong>.
            </p>
          </div>
        ) : (
          messages.map((m) => (
            <div key={m.id} className={`flex gap-3 sm:gap-4 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${m.role === "user" ? "bg-accent/10 text-accent" : "bg-card border border-border text-foreground"}`}>
                {m.role === "user" ? <User className="w-4 h-4 sm:w-5 sm:h-5" /> : <Bot className="w-4 h-4 sm:w-5 sm:h-5" />}
              </div>
              <div className={`p-4 rounded-xl sm:rounded-2xl max-w-[90%] sm:max-w-[80%] ${m.role === "user" ? "bg-accent/10 text-foreground" : "bg-card border border-border text-foreground"}`}>
                <p className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">
                  {m.content.replace(">>>READY_TO_HUMANIZE<<<", "✅ Контекст собран! Теперь можно генерировать чистовик (кнопка ниже).")}
                </p>
              </div>
            </div>
          ))
        )}
        
        {/* Final Draft Display / Editor */}
        {(completion || isEditMode) && (
          <div className="mt-8 border border-accent/30 rounded-2xl bg-accent/5 overflow-hidden flex flex-col">
            <div className="bg-accent/10 px-4 py-3 border-b border-accent/20 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h3 className="font-medium text-accent flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {isEditMode ? "Редактирование поста" : "Финальный Чистовик"}
              </h3>
              
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  placeholder="URL поста (slug)" 
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="bg-background border border-border rounded px-3 py-1 text-sm focus:outline-none focus:border-accent w-40"
                />
                <button onClick={handleSave} disabled={isSaving} className="bg-accent hover:bg-accent/90 text-white px-3 py-1 rounded text-sm font-medium transition-colors flex items-center gap-1">
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Publish"}
                </button>
              </div>
            </div>
            <div className="p-0 flex-1 flex flex-col min-h-[300px]">
              <textarea
                value={editableContent}
                onChange={(e) => {
                  setUserEdited(true);
                  setEditableContent(e.target.value);
                }}
                className="w-full h-full min-h-[300px] bg-transparent border-none focus:ring-0 resize-y p-6 font-sans text-sm leading-relaxed placeholder:text-muted/50"
                placeholder="Редактируй текст здесь..."
              />
            </div>
          </div>
        )}

        {(isLoading || isHumanizing) && !completion && (
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-card border border-border text-foreground">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="pt-4 border-t border-border shrink-0 flex flex-col gap-3">
        {isReady && !completion && !isHumanizing && (
          <button 
            onClick={handleHumanize}
            className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 mb-2 shadow-lg shadow-accent/20"
          >
            <FileText className="w-4 h-4" />
            Сгенерировать чистовик (Humanizer Mode)
          </button>
        )}
        
        <form onSubmit={handleManualSubmit} className="flex flex-col relative group gap-2">
          {(error || customError) && (
            <div className="text-red-500 text-xs px-2 mb-1">
              Ошибка: {error?.message || customError}. Проверьте консоль браузера или добавьте API ключ.
            </div>
          )}
          <div className="relative flex w-full">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Твой черновик..."
              className="w-full bg-card border border-border rounded-xl px-4 py-4 pr-12 text-sm sm:text-base focus:outline-none focus:border-muted transition-all text-foreground placeholder:text-muted/50"
              disabled={isLoading || isHumanizing}
            />
            <button 
              type="submit" 
              disabled={isLoading || isHumanizing || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-accent hover:bg-accent-hover text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group-focus-within:shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default function DraftingRoom() {
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center">Загрузка...</div>}>
      <DraftingRoomContent />
    </Suspense>
  );
}
