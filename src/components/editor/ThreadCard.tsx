import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Bot, User, Check, X, Send, Trash2, Zap } from 'lucide-react';

interface ThreadCardProps {
  id: string;
  selectedText: string;
  initialSkill?: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  onApplySuggestion: (id: string, text: string) => void;
  onResolveSuggestion: (id: string, accept: boolean) => void;
  onAppendTasks?: (text: string) => void;
}

const AVAILABLE_SKILLS = [
  { id: 'grill-me', name: 'Grill Mode', desc: 'Жесткая критика и вопросы' },
  { id: 'humanizer', name: 'Humanizer', desc: 'Убирает ИИ-стилистику' },
  { id: 'writer', name: 'Writer', desc: 'Переписывает текст красиво' },
  { id: 'translator', name: 'Translator', desc: 'Идеальный перевод' },
];

export function ThreadCard({ id, selectedText, initialSkill, isActive, onClick, onDelete, onApplySuggestion, onResolveSuggestion, onAppendTasks }: ThreadCardProps) {
  const [skill, setSkill] = useState<string>(initialSkill || 'default');
  const [suggestionApplied, setSuggestionApplied] = useState(false);
  const [suggestionResolved, setSuggestionResolved] = useState(false);
  const [chatInput, setChatInput] = useState('');
  
  // Mentions State
  const [showMentions, setShowMentions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  const chatContext = useChat({
    id,
    api: '/api/chat',
    body: { skill }
  } as any) as any;
  
  const messages = chatContext.messages || [];
  const sendMessage = chatContext.sendMessage;
  const status: string = chatContext.status || 'ready';
  const isLoading = status === 'submitted' || status === 'streaming';
  const error = chatContext.error;
  
  const initialized = useRef(false);

  // Auto-start the conversation on creation (except for writer skill, which waits for user input)
  useEffect(() => {
    if (!initialized.current && sendMessage) {
      initialized.current = true;
      if (initialSkill !== 'writer') {
        const initialPrompt = `Пожалуйста, проанализируй или улучши этот фрагмент:\n\n> ${selectedText}`;
        sendMessage({ text: initialPrompt });
      }
    }
  }, [sendMessage, selectedText, initialSkill]);

  const lastAiMessage = [...messages].reverse().find((m: any) => m.role === 'assistant');

  // Auto-apply suggestion when AI finishes generating (except for chat-oriented skills)
  // Extract text content from AI message parts
  const getMessageText = (msg: any) => {
    if (msg?.parts) {
      return msg.parts.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('');
    }
    return msg?.content || '';
  };

  useEffect(() => {
    if (!isLoading && lastAiMessage && !suggestionResolved && !suggestionApplied && !error) {
      const aiText = getMessageText(lastAiMessage);
      if (initialSkill === 'grill-me') {
        if (onAppendTasks) onAppendTasks(aiText);
        setSuggestionApplied(true);
      } else {
        // humanizer, writer, default
        onApplySuggestion(id, aiText);
        setSuggestionApplied(true);
      }
    }
  }, [isLoading, lastAiMessage, suggestionResolved, suggestionApplied, id, onApplySuggestion, onAppendTasks, error, initialSkill]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setChatInput(val);
    
    // Check if we are typing a mention
    const match = val.match(/@([a-zA-Z0-9_-]*)$/);
    if (match) {
      setShowMentions(true);
      setMentionQuery(match[1].toLowerCase());
    } else {
      setShowMentions(false);
    }
  };

  const insertMention = (skillId: string) => {
    const newVal = chatInput.replace(/@([a-zA-Z0-9_-]*)$/, `@${skillId} `);
    setChatInput(newVal);
    setShowMentions(false);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isLoading) return;
    
    // Parse @mentions for backend
    let currentSkill = skill;
    const mentionMatch = chatInput.match(/@([a-zA-Z0-9_-]+)/);
    if (mentionMatch) {
      currentSkill = mentionMatch[1];
      setSkill(currentSkill);
    }

    let text = chatInput;
    setChatInput('');
    setShowMentions(false);
    
    if (sendMessage) {
      if (initialSkill === 'writer' && messages.length === 0) {
        text = `Пожалуйста, перепиши или улучши этот фрагмент с учетом моего комментария:\n\nИсходный текст:\n> ${selectedText}\n\nКомментарий/Инструкция:\n${text}`;
      }
      
      sendMessage({ text });
      // Reset suggestion states for next AI response
      setSuggestionApplied(false);
      setSuggestionResolved(false);
    }
  };

  const filteredSkills = AVAILABLE_SKILLS.filter(s => s.id.toLowerCase().includes(mentionQuery) || s.name.toLowerCase().includes(mentionQuery));

  return (
    <div 
      onClick={onClick}
      className={`flex flex-col bg-card/90 backdrop-blur-md border rounded-xl overflow-hidden transition-all duration-300 w-full relative
      ${isActive ? 'border-accent shadow-xl shadow-accent/10 ring-1 ring-accent/20 -translate-x-2' : 'border-border/40 shadow-sm opacity-60 hover:opacity-100 hover:border-border cursor-pointer'}
    `}>
      {/* HEADER */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-border/30 bg-muted/10">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
            <Bot className="w-3 h-3 text-accent" />
          </div>
          <span className="text-xs font-semibold text-foreground tracking-wide truncate">
            {AVAILABLE_SKILLS.find(s => s.id === skill)?.name || 'AI Assistant'}
          </span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-muted hover:text-red-400 transition-colors p-1 rounded-md hover:bg-red-400/10"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {isActive && (
        <div className="flex flex-col">
          {/* MESSAGES */}
          <div className="flex flex-col max-h-[300px] overflow-y-auto p-3 gap-3 scrollbar-hide text-sm">
            {messages.length === 0 && isLoading && (
              <div className="flex items-center gap-2 text-muted px-2 py-1">
                <div className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-medium animate-pulse">Thinking...</span>
              </div>
            )}
            
            {messages.map((m: any, idx: number) => {
              if (idx === 0 && m.role === 'user') return null;

              return (
                <div key={m.id} className={`flex flex-col gap-1 ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`px-3 py-2 rounded-xl max-w-[95%] leading-relaxed ${
                    m.role === 'user' 
                      ? 'bg-accent/10 text-foreground rounded-tr-sm' 
                      : 'bg-background border border-border/50 text-foreground rounded-tl-sm shadow-sm'
                  }`}>
                    <div className="prose prose-sm dark:prose-invert max-w-none text-[13px]">
                      {m.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('') || m.content || ''}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && messages.length > 0 && messages[messages.length - 1].role === 'user' && (
              <div className="flex items-center gap-2 text-muted px-2 py-1 mt-1">
                <div className="w-3.5 h-3.5 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                <span className="text-xs font-medium animate-pulse">Thinking...</span>
              </div>
            )}
            
            {error && (
              <div className="px-3 py-2 bg-red-500/10 text-red-500 rounded-lg text-xs font-medium border border-red-500/20">
                Ошибка: {error.message || 'Не удалось получить ответ'}
              </div>
            )}

            {!isLoading && !error && messages.length === 1 && (
              <div className="px-3 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg text-xs font-medium border border-yellow-500/20 mt-2">
                ИИ не вернул ответ (возможно из-за фильтров). Попробуйте перефразировать текст или написать сообщение ниже.
              </div>
            )}
          </div>

          {/* ACTION BUTTONS (Accept / Reject) */}
          {!isLoading && lastAiMessage && !suggestionResolved && initialSkill !== 'grill-me' && (
            <div className="px-3 pb-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onResolveSuggestion(id, true);
                  setSuggestionResolved(true);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-green-500/10 hover:bg-green-500/20 text-green-500 rounded-lg text-xs font-semibold transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                Accept
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onResolveSuggestion(id, false);
                  setSuggestionResolved(true);
                  setSuggestionApplied(false);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-xs font-semibold transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Reject
              </button>
            </div>
          )}

          {/* REPLY INPUT */}
          <div className="p-2 border-t border-border/30 bg-muted/5 relative">
            <form onSubmit={handleSubmit} className="relative flex items-center">
              <input
                ref={inputRef}
                value={chatInput}
                onChange={handleInput}
                placeholder="Reply or type @ for skills..."
                disabled={isLoading}
                className="w-full bg-background border border-border/50 rounded-lg pl-3 pr-8 py-1.5 text-xs focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
              />
              <button 
                type="submit" 
                disabled={isLoading || !chatInput.trim()}
                className="absolute right-1.5 p-1 bg-accent hover:bg-accent-hover text-white rounded-md disabled:opacity-50 transition-colors"
              >
                <Send className="w-3 h-3" />
              </button>
            </form>

            {/* MENTIONS DROPDOWN */}
            {showMentions && (
              <div className="absolute bottom-full left-0 w-full mb-1 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50">
                <div className="max-h-[150px] overflow-y-auto">
                  {filteredSkills.length > 0 ? (
                    filteredSkills.map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => insertMention(s.id)}
                        className="w-full flex flex-col items-start px-3 py-1.5 hover:bg-accent/10 transition-colors text-left border-b border-border/30 last:border-0"
                      >
                        <span className="text-xs font-medium text-foreground">{s.name} <span className="text-[10px] text-muted ml-1">@{s.id}</span></span>
                      </button>
                    ))
                  ) : (
                    <div className="px-3 py-2 text-xs text-muted text-center">No skills found</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
