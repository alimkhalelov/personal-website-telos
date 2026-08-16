"use client";

import { useEffect, useRef } from "react";
import { marked } from "marked";

interface MarkdownViewProps {
  content: string;
}

export function MarkdownView({ content }: MarkdownViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Preprocess [[Wikilinks]] into HTML links
  let processedContent = content.replace(
    /`?\[\[(?:wiki\/)?([^\]#|`]+)(?:#([^\]|`]+))?(?:\|([^\]`]+))?\]\]`?/g,
    (_, target, anchor, label) => {
      const cleanTarget = target.trim();
      const displayLabel = label ? label.trim() : cleanTarget.split("/").pop() || cleanTarget;
      const href = `/wiki/${cleanTarget}${anchor ? `#${anchor}` : ""}`;
      return `<a href="${href}" class="inline-flex items-center gap-1 !text-zinc-900 dark:!text-zinc-100 hover:underline font-mono text-[14px] bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-md !no-underline">[[${displayLabel}]]</a>`;
    }
  );

  // Strip leading H1 if it was already rendered in page header
  processedContent = processedContent.replace(/^#\s+.+$/m, "").trim();

  // Create marked renderer with custom headings for TOC anchor support
  const renderer = new marked.Renderer();
  
  renderer.heading = ({ text, depth }: { text: string; depth: number }) => {
    const cleanText = text.replace(/[*_`]/g, "");
    const slug = cleanText
      .toLowerCase()
      .replace(/[^\w\u0400-\u04FF\s-]/g, "")
      .replace(/\s+/g, "-");
    
    // Parse inline formatting inside heading (e.g. bold or code)
    const formattedText = marked.parseInline(text);

    if (depth === 2) {
      return `<h2 id="${slug}" class="text-2xl sm:text-3xl font-bold tracking-tight mt-12 mb-5 scroll-mt-24 text-zinc-900 dark:text-zinc-100">${formattedText}</h2>`;
    } else if (depth === 3) {
      return `<h3 id="${slug}" class="text-xl sm:text-2xl font-bold tracking-tight mt-8 mb-4 scroll-mt-24 text-zinc-900 dark:text-zinc-100">${formattedText}</h3>`;
    }
    return `<h${depth} id="${slug}" class="font-bold tracking-tight mt-6 mb-3 scroll-mt-24 text-zinc-900 dark:text-zinc-100">${formattedText}</h${depth}>`;
  };

  marked.use({ 
    gfm: true, 
    breaks: false, 
    renderer 
  });
  
  const rawHtml = marked.parse(processedContent);
  const html = typeof rawHtml === "string" ? rawHtml : "";

  // Inject copy buttons for pre code blocks after render
  useEffect(() => {
    if (!containerRef.current) return;
    const preBlocks = containerRef.current.querySelectorAll("pre");
    preBlocks.forEach((pre) => {
      if (pre.closest(".code-wrapper")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "code-wrapper relative group my-6 rounded-2xl bg-[#EBEBE8] dark:bg-[#252525] p-5 overflow-hidden";

      const header = document.createElement("div");
      header.className = "flex items-center justify-between text-xs font-mono text-zinc-500 mb-3 pb-2 border-b border-black/5 dark:border-white/5";
      header.innerHTML = `<span>code</span>`;

      const copyBtn = document.createElement("button");
      copyBtn.type = "button";
      copyBtn.className = "px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-zinc-600 dark:text-zinc-300 transition-colors text-[11px] font-mono cursor-pointer";
      copyBtn.textContent = "Copy";
      copyBtn.addEventListener("click", async () => {
        const textToCopy = pre.innerText || pre.textContent || "";
        try {
          await navigator.clipboard.writeText(textToCopy.trim());
          copyBtn.textContent = "Copied!";
          setTimeout(() => {
            copyBtn.textContent = "Copy";
          }, 2000);
        } catch {}
      });

      header.appendChild(copyBtn);

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);

      pre.className = "overflow-x-auto text-[14px] font-mono leading-relaxed text-zinc-900 dark:text-zinc-100 p-0 m-0 bg-transparent";
    });
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="wiki-prose prose prose-neutral dark:prose-invert max-w-none text-left 
        [&_p]:mb-6 [&_p]:text-[17.5px] [&_p]:leading-[1.85] [&_p]:text-zinc-800 dark:[&_p]:text-zinc-200 [&_p]:font-normal
        [&_strong]:font-bold [&_strong]:text-zinc-950 dark:[&_strong]:text-white
        [&_em]:italic
        [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-[0.88em] [&_code]:font-mono [&_code]:bg-[#EBEBE8] dark:[&_code]:bg-[#252525] [&_code]:text-zinc-900 dark:[&_code]:text-zinc-100
        [&_blockquote]:border-l-4 [&_blockquote]:border-zinc-400 dark:[&_blockquote]:border-zinc-600 [&_blockquote]:pl-5 [&_blockquote]:py-2 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:bg-[#EBEBE8]/50 dark:[&_blockquote]:bg-[#252525]/50 [&_blockquote]:rounded-r-xl [&_blockquote]:text-zinc-700 dark:[&_blockquote]:text-zinc-300 [&_blockquote]:text-[17px] [&_blockquote]:leading-relaxed
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:space-y-2 [&_ul]:text-[17.5px] [&_ul]:leading-[1.85] 
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-6 [&_ol]:space-y-2 [&_ol]:text-[17.5px] [&_ol]:leading-[1.85]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
