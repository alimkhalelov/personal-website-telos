import React, { useEffect, useRef, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Bot, User, Check, X, Send, Trash2, Zap } from 'lucide-react';

interface ThreadCardProps {
  id: string;
  selectedText: string;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  onApplySuggestion: (id: string, text: string) => void;
  onResolveSuggestion: (id: string, accept: boolean) => void;
}

const AVAILABLE_SKILLS = [
  { id: 'grill-me', name: 'Grill Mode', desc: 'Жесткая критика и вопросы' },
  { id: 'humanizer', name: 'Humanizer', desc: 'Убирает ИИ-стилистику' },
  { id: 'writer', name: 'Writer', desc: 'Переписывает текст красиво' },
  { id: 'translator', name: 'Translator', desc: 'Идеальный перевод' },
];

export function ThreadCard({ id, selectedText, isActive, onClick, onDelete, onApplySuggestion, onResolveSuggestion }: ThreadCardProps) {
  const [skill, setSkill] = useState<string>('default');
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
  const append = chatContext.append || chatContext.sendMessage;
  const isLoading = chatContext.isLoading || false;
  
  const initialized = useRef(false);

  // Auto-start the conversation on creation
  useEffect(() => {
    if (!initialized.current && append) {
      initialized.current = true;
      const initialPrompt = `Пожалуйста, проанализируй или улучши этот фрагмент:\n\n> ${selectedText}`;
      append({ role: 'user', content: initialPrompt });
    }
  }, [append, selectedText]);

  const lastAiMessage = [...messages].reverse().find(m => m.role === 'assistant');

  // Auto-apply suggestion when AI finishes generating
  useEffect(() => {
    if (!isLoading && lastAiMessage && !suggestionResolved && !suggestionApplied) {
      // It finished generating! Apply the suggestion directly to the editor overlay
      onApplySuggestion(id, lastAiMessage.content);
      setSuggestionApplied(true);
    }
  }, [isLoading, lastAiMessage, suggestionResolved, suggestionApplied, id, onApplySuggestion]);

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

    const text = chatInput;
    setChatInput('');
    setShowMentions(false);
    
    if (append) {
      append({ role: 'user', content: text });
      // Reset suggestion states for next AI response
      setSuggestionApplied(false);
      setSuggestionResolved(false);
    }
  };

  const filteredSkills = AVAILABLE_SKILLS.filter(s => s.id.toLowerCase().includes(mentionQuery) || s.name.toLowerCase().includes(mentionQuery));

  return (
    <div 
      className={`border rounded-xl mb-4 transition-all overflow-visible ${isActive ? 'border-accent shadow-md ring-1 ring-accent/20' : 'border-border/50 hover:border-border cursor-pointer opacity-70 hover:opacity-100'}`}
      onClick={!isActive ? onClick : undefined}
    >
      <div className="bg-muted/30 px-3 py-2 flex items-center justify-between border-b border-border/50">
        <div className="text-xs font-medium text-muted-foreground truncate pr-2">
          "{selectedText.substring(0, 40)}{selectedText.length > 40 ? '...' : ''}"
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-muted-foreground hover:text-red-500 transition-colors p-1"
          title="Remove comment"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {isActive && (
        <div className="flex flex-col bg-card">
          <div className="max-h-[300px] overflow-y-auto p-3 flex flex-col gap-3">
            {messages.map((m: any) => (
              <div key={m.id} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`p-2.5 rounded-xl max-w-[85%] text-[13px] leading-relaxed ${m.role === 'user' ? 'bg-accent/10 text-foreground rounded-tr-sm' : 'bg-muted/30 border border-border/50 text-foreground rounded-tl-sm'}`}>
                  <p className="whitespace-pre-wrap">{m.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="p-2.5 rounded-xl rounded-tl-sm bg-muted/30 border border-border/50 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
          </div>
          
          {/* Suggestion Actions */}
          {!isLoading && lastAiMessage && !suggestionResolved && suggestionApplied && (
            <div className="px-3 py-2 bg-accent/5 border-t border-b border-accent/10 flex flex-col gap-2">
              <div className="text-[11px] text-muted-foreground flex items-center gap-1 mb-1">
                <Zap className="w-3 h-3 text-accent" />
                <span>AI suggestion applied. Review in editor.</span>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    onResolveSuggestion(id, true);
                    setSuggestionResolved(true);
                  }}
                  className="flex-1 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Accept
                </button>
                <button 
                  onClick={() => {
                    onResolveSuggestion(id, false);
                    setSuggestionApplied(false); // Can be retried
                  }}
                  className="flex-1 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <X className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            </div>
          )}

          <div className="p-3 border-t border-border/50 relative">
            {/* Mentions Dropdown */}
            {showMentions && filteredSkills.length > 0 && (
              <div className="absolute bottom-full left-3 right-3 mb-1 bg-card border border-border shadow-lg rounded-lg overflow-hidden z-50">
                <div className="px-3 py-1.5 bg-muted/50 text-[10px] uppercase font-semibold text-muted-foreground">
                  Select Skill
                </div>
                <div className="max-h-[150px] overflow-y-auto">
                  {filteredSkills.map(s => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => insertMention(s.id)}
                      className="w-full text-left px-3 py-2 hover:bg-accent/10 flex flex-col transition-colors border-b border-border/50 last:border-0"
                    >
                      <span className="text-sm font-medium text-foreground">{s.name} <span className="text-xs text-muted-foreground ml-1">@{s.id}</span></span>
                      <span className="text-xs text-muted-foreground">{s.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="relative flex w-full">
              <input
                ref={inputRef}
                value={chatInput}
                onChange={handleInput}
                placeholder="Reply or type @ for skills..."
                className="w-full bg-background border border-border rounded-lg px-3 py-2 pr-8 text-xs focus:outline-none focus:border-muted transition-all"
                disabled={isLoading}
                autoComplete="off"
              />
              <button 
                type="submit" 
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-md transition-colors ${isLoading || !chatInput.trim() ? 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed' : 'bg-accent hover:bg-accent-hover text-white'}`}
              >
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
