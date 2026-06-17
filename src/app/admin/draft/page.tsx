// @ts-nocheck
"use client";

import { Save, ArrowLeft, Sparkles, Loader2, Eye, EyeOff, Archive, Trash2, ExternalLink } from "lucide-react";
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
  const [frontmatter, setFrontmatter] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);
  const [toastMsg, setToastMsg] = useState("");

  const parseContent = (text: string) => {
    if (text.startsWith("---")) {
      const endIdx = text.indexOf("---", 3);
      if (endIdx !== -1) {
        setFrontmatter(text.substring(3, endIdx));
        setEditableContent(text.substring(endIdx + 3).replace(/^\n+/, ''));
        return;
      }
    }
    setFrontmatter("");
    setEditableContent(text);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

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
            parseContent(data.content);
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
          parseContent(dump.result);
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

        const savedFrontmatter = localStorage.getItem("telos_draft_fm");
        if (savedFrontmatter) setFrontmatter(savedFrontmatter);

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
        localStorage.setItem("telos_draft_fm", frontmatter);
        localStorage.setItem("telos_draft_slug", slug);
      }
    }
  }, [threads, editableContent, frontmatter, slug, existingSlug, isLoaded, braindumpId]);

  const handleSave = async () => {
    let currentSlug = slug;
    
    if (!currentSlug) {
      if (!editableContent || editableContent.length < 10) {
        return alert("Слаг пуст, а контент слишком короткий для авто-генерации. Пожалуйста, введите слаг.");
      }
      setIsSaving(true);
      try {
        const promptText = editableContent.substring(0, 1000);
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [{ role: "user", content: promptText }],
            skill: "slug-generator"
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

        currentSlug = fullText.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        setSlug(currentSlug);
      } catch (e) {
        console.error(e);
        alert("Ошибка при автоматической генерации слага.");
        setIsSaving(false);
        return;
      }
    }

    if (!editableContent) {
      setIsSaving(false);
      return alert("Контент пуст.");
    }
    
    setIsSaving(true);
    let currentFm = frontmatter;
    if (!currentFm) {
      currentFm = `\ntitle: '${currentSlug.replace(/-/g, " ")}'\ndate: '${new Date().toISOString()}'\ndescription: 'Новый пост от Demiurge'\n`;
      setFrontmatter(currentFm);
    }
    
    const finalContent = `---${currentFm}---

${editableContent}`;

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: currentSlug, content: finalContent }),
      });
      if (res.ok) {
        if (braindumpId) {
          try {
            const braindumps = JSON.parse(localStorage.getItem("telos_braindumps") || "[]");
            const filtered = braindumps.filter((b: any) => b.id !== braindumpId);
            localStorage.setItem("telos_braindumps", JSON.stringify(filtered));
          } catch(e) {}
        }
        showToast("Changes saved.");
        if (!existingSlug) {
          router.replace(`/admin/draft?slug=${currentSlug}`);
        }
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

  const handleDeleteArticle = async () => {
    if (!existingSlug) return alert("Nothing to delete yet.");
    if (!confirm("Are you sure you want to delete this article completely?")) return;
    try {
      const res = await fetch(`/api/cms?slug=${existingSlug}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/admin");
      } else {
        alert("Failed to delete");
      }
    } catch (e) {
      console.error(e);
      alert("Error deleting file.");
    }
  };

  const toggleMeta = async (key: 'hidden' | 'archived') => {
    if (!frontmatter) {
      alert("Please save the draft first to create the initial frontmatter.");
      return;
    }
    
    let currentFm = frontmatter;
    const regex = new RegExp(`\n${key}:\\s*(true|false)`);
    let newValue = true;
    
    if (regex.test(currentFm)) {
      currentFm = currentFm.replace(regex, (match, p1) => {
        newValue = p1 === 'false';
        return `\n${key}: ${newValue}`;
      });
    } else {
      if (!currentFm.endsWith('\n')) currentFm += '\n';
      currentFm += `${key}: true\n`;
      newValue = true;
    }
    
    setFrontmatter(currentFm);
    const newContent = `---${currentFm}---

${editableContent}`;
    
    let currentSlug = existingSlug || slug;
    if (!currentSlug) return;

    setIsSaving(true);
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: currentSlug, content: newContent }),
      });
      if (res.ok) {
        showToast(`${key} is now ${newValue ? 'ON' : 'OFF'}. Auto-saved!`);
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

  const isHidden = frontmatter.includes('\nhidden: true');
  const isArchived = frontmatter.includes('\narchived: true');

  const handleGenerateSlug = async () => {
    if (!editableContent || editableContent.length < 10) return alert("Контент слишком короткий для генерации слага.");
    setIsGeneratingSlug(true);
    try {
      const promptText = editableContent.substring(0, 1000);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: promptText }],
          skill: "slug-generator"
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

      setSlug(fullText.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, ''));
    } catch (e) {
      console.error(e);
      alert("Ошибка при генерации слага.");
    } finally {
      setIsGeneratingSlug(false);
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
            <div className="flex items-center group relative min-w-[150px] sm:min-w-[300px]">
              <input 
                type="text" 
                placeholder="post-url-slug" 
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                className="bg-transparent border-none text-sm sm:text-base font-medium focus:outline-none focus:ring-0 placeholder:text-muted/50 w-full pr-8 truncate"
              />
              <button 
                onClick={handleGenerateSlug}
                disabled={isGeneratingSlug || !editableContent}
                title="Сгенерировать слаг с помощью ИИ"
                className="absolute right-0 p-1 text-muted-foreground hover:text-accent disabled:opacity-50 transition-opacity opacity-0 group-hover:opacity-100"
              >
                {isGeneratingSlug ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {toastMsg && (
              <span className="text-sm font-medium bg-accent text-white px-3 py-1 rounded-md animate-in fade-in mr-2 shadow-sm">
                {toastMsg}
              </span>
            )}
            {existingSlug && (
              <div className="flex items-center gap-1 mr-2 border-r border-border/50 pr-4">
                <a 
                  href={`/blog/${existingSlug}`} 
                  target="_blank"
                  title="View Article"
                  className="p-2 text-muted-foreground hover:text-accent hover:bg-accent/10 rounded-md transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button 
                  onClick={() => toggleMeta('hidden')} 
                  title={isHidden ? "Unhide (Make Public)" : "Hide (Make Private)"}
                  className={`p-2 rounded-md transition-colors ${isHidden ? 'text-accent bg-accent/10 hover:bg-accent/20' : 'text-muted-foreground hover:text-accent hover:bg-accent/10'}`}
                >
                  {isHidden ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => toggleMeta('archived')} 
                  title="Toggle Archive"
                  className={`p-2 rounded-md transition-colors ${isArchived ? 'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20' : 'text-muted-foreground hover:text-yellow-500 hover:bg-yellow-500/10'}`}
                >
                  <Archive className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleDeleteArticle} 
                  title="Delete Article"
                  className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            )}
            <div className="flex items-center gap-1 mr-4 border-r border-border/50 pr-4">
              <button 
                onClick={() => handleCopyPrompt('x')} 
                title="Copy X (Twitter) Prompt"
                className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-accent/10 rounded-md transition-colors"
              >
                X / Twitter
              </button>
              <button 
                onClick={() => handleCopyPrompt('linkedin')} 
                title="Copy LinkedIn Prompt"
                className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-accent/10 rounded-md transition-colors"
              >
                LinkedIn
              </button>
              <button 
                onClick={() => handleCopyPrompt('telegram')} 
                title="Copy Telegram Prompt"
                className="px-3 py-1.5 text-xs font-medium text-muted hover:text-foreground hover:bg-accent/10 rounded-md transition-colors"
              >
                Telegram
              </button>
            </div>
            <button 
              onClick={handleSave} 
              disabled={isSaving} 
              className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              <span className="hidden sm:inline">{isSaving ? "Saving..." : (existingSlug ? "Save Changes" : "Publish")}</span>
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
