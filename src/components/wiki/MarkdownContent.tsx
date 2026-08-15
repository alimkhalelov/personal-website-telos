import React from 'react';
import { marked } from 'marked';
import { parseWikilinks } from '@/lib/wiki';

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  // Pre-process wikilinks first
  const withWikilinks = parseWikilinks(content);
  // Parse markdown into HTML string
  const html = marked.parse(withWikilinks, {
    gfm: true,
    breaks: false,
  }) as string;

  return (
    <div 
      className="prose prose-neutral dark:prose-invert max-w-none text-[17px] sm:text-[18px] text-foreground/90 leading-[1.65] space-y-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
