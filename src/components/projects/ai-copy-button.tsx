"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

interface AICopyButtonProps {
  textToCopy: string;
  title?: string;
  className?: string;
}

export function AICopyButton({
  textToCopy,
  title = "Copy for AI Agent",
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
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title={copied ? "Copied!" : title}
      aria-label={copied ? "Copied to clipboard" : title}
      className={`inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all duration-200 cursor-pointer select-none ${className}`}
    >
      {copied ? (
        <Check className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}
