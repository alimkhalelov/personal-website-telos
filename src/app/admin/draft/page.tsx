"use client";

import { useChat } from "@ai-sdk/react";
import { Send, Bot, User, FileText, ArrowLeft, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCompletion } from "@ai-sdk/react";

export default function DraftingRoom() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const { completion, complete, isLoading: isHumanizing } = useCompletion({
    api: "/api/humanize",
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const isReady = messages.some(m => m.content.includes(">>>READY_TO_HUMANIZE<<<"));

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, completion]);

  const handleHumanize = () => {
    complete("", { body: { messages } });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(completion);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-8 sm:py-12 flex flex-col h-[100dvh]">
      <header className="flex items-center justify-between mb-8 shrink-0">
        <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">На главную</span>
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
        
        {/* Final Draft Display */}
        {completion && (
          <div className="mt-8 border border-accent/30 rounded-2xl bg-accent/5 overflow-hidden">
            <div className="bg-accent/10 px-4 py-3 border-b border-accent/20 flex justify-between items-center">
              <h3 className="font-medium text-accent flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Финальный Чистовик (RU & EN)
              </h3>
              <button onClick={copyToClipboard} className="text-accent hover:bg-accent/20 p-2 rounded-md transition-colors flex items-center gap-2 text-sm">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Скопировано" : "Копировать MDX"}
              </button>
            </div>
            <div className="p-6 prose prose-invert max-w-none">
              <p className="whitespace-pre-wrap font-sans text-sm">{completion}</p>
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
        
        <form onSubmit={handleSubmit} className="flex relative group">
          <input
            value={input}
            onChange={handleInputChange}
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
        </form>
      </div>
    </main>
  );
}
