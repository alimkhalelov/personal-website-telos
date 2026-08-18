"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface AICopyButtonProps {
  textToCopy: string;
  label?: string;
  copiedLabel?: string;
  className?: string;
}

export function AICopyButton({
  textToCopy,
  label = "Copy for AI Agent",
  copiedLabel = "Copied to clipboard!",
  className = "",
}: AICopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        // Fallback for older contexts
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    } catch (err) {
      console.error("Failed to copy AI prompt:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? copiedLabel : label}
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono font-medium transition-all duration-200 cursor-pointer select-none ${
        copied
          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
          : "bg-muted/10 hover:bg-accent/10 border-border/80 hover:border-accent/40 text-muted-foreground hover:text-accent"
      } ${className}`}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-colors" />
      )}
      <span className="tracking-tight">{copied ? copiedLabel : label}</span>
    </button>
  );
}
