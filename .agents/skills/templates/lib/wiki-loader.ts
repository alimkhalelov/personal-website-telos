import fs from 'node:fs';
import path from 'node:path';

export interface WikiPage {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  summary: string;
  visibility: 'public' | 'private';
  last_updated: string;
  content: string;
  headings: { depth: number; slug: string; text: string }[];
}

let cachedPages: WikiPage[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL_MS = 2000; // Invalidate cache after 2 seconds or on file change

export function getAllWikiPages(): WikiPage[] {
  const now = Date.now();
  if (cachedPages && (now - lastCacheTime < CACHE_TTL_MS)) {
    return cachedPages;
  }

  const wikiDir = path.join(process.cwd(), 'wiki');
  const pages: WikiPage[] = [];

  function scanDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        const raw = fs.readFileSync(fullPath, 'utf-8');
        const relative = path.relative(wikiDir, fullPath).replace(/\\/g, '/');
        const slug = relative.replace(/\.md$/, '');

        // Fast frontmatter parser
        const frontmatterMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
        let content = raw;
        let title = path.basename(entry.name, '.md');
        let category = 'general';
        let tags: string[] = [];
        let summary = '';
        let visibility: 'public' | 'private' = 'public';
        let last_updated = new Date().toISOString().split('T')[0];

        if (frontmatterMatch) {
          const fmText = frontmatterMatch[1];
          content = frontmatterMatch[2];

          const titleMatch = fmText.match(/title:\s*["']?([^"'\n\r]+)["']?/);
          const catMatch = fmText.match(/category:\s*["']?([^"'\n\r]+)["']?/);
          const sumMatch = fmText.match(/summary:\s*["']?([^"'\n\r]+)["']?/);
          const visMatch = fmText.match(/visibility:\s*["']?([^"'\n\r]+)["']?/);
          const dateMatch = fmText.match(/last_updated:\s*["']?([^"'\n\r]+)["']?/);

          if (titleMatch) title = titleMatch[1];
          if (catMatch) category = catMatch[1];
          if (sumMatch) summary = sumMatch[1];
          if (visMatch && visMatch[1] === 'private') visibility = 'private';
          if (dateMatch) last_updated = dateMatch[1];
        }

        // Extract headings for Table of Contents (H2 and H3)
        const headings: { depth: number; slug: string; text: string }[] = [];
        const headingMatches = content.matchAll(/^(#{2,3})\s+(.+)$/gm);
        for (const match of headingMatches) {
          const depth = match[1].length;
          const text = match[2].trim();
          const headingSlug = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          headings.push({ depth, slug: headingSlug, text });
        }

        pages.push({
          slug,
          title,
          category,
          tags,
          summary,
          visibility,
          last_updated,
          content,
          headings,
        });
      }
    }
  }

  scanDir(wikiDir);
  cachedPages = pages;
  lastCacheTime = now;
  return pages;
}
