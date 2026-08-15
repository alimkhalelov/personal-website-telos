import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface WikiHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface WikiPageMeta {
  title: string;
  slug: string;
  summary?: string;
  category?: string;
  tags?: string[];
  version?: string;
  last_updated?: string;
  headings?: WikiHeading[];
}

export interface WikiPage extends WikiPageMeta {
  content: string;
}

export interface GraphNode {
  id: string;
  name: string;
  val: number;
  category: string;
}

export interface GraphLink {
  source: string;
  target: string;
}

const WIKI_DIR = path.join(process.cwd(), 'wiki');

/**
 * Recursively find all markdown files in a directory
 */
function getMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

/**
 * Extract Markdown headings (h2, h3)
 */
function extractHeadings(markdown: string): WikiHeading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: WikiHeading[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim().replace(/\[\[(.*?)\]\]/g, '$1');
    const slug = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ depth, slug, text });
  }

  return headings;
}

/**
 * Get all wiki pages with metadata
 */
export function getAllWikiPages(): WikiPageMeta[] {
  const files = getMarkdownFiles(WIKI_DIR);
  const pages: WikiPageMeta[] = [];

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    if (fileName === 'log.md') continue; // log is handled separately

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    const slug = data.slug || fileName.replace(/\.md$/, '');
    const title = data.title || slug;
    const category = data.category || 'General';
    const summary = data.summary || '';
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const version = data.version || 'v1.0.0';
    const last_updated = data.last_updated || '';
    const headings = extractHeadings(content);

    pages.push({
      title,
      slug,
      summary,
      category,
      tags,
      version,
      last_updated,
      headings,
    });
  }

  return pages.sort((a, b) => a.title.localeCompare(b.title));
}

/**
 * Get a specific wiki page by slug
 */
export function getWikiPageBySlug(slug: string): WikiPage | null {
  const files = getMarkdownFiles(WIKI_DIR);

  for (const filePath of files) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const fileSlug = data.slug || path.basename(filePath).replace(/\.md$/, '');

    if (fileSlug === slug) {
      const headings = extractHeadings(content);
      return {
        title: data.title || fileSlug,
        slug: fileSlug,
        summary: data.summary || '',
        category: data.category || 'General',
        tags: Array.isArray(data.tags) ? data.tags : [],
        version: data.version || 'v1.0.0',
        last_updated: data.last_updated || '',
        headings,
        content,
      };
    }
  }

  return null;
}

/**
 * Preprocess markdown content to parse Obsidian [[Wikilinks]] into styled interactive HTML pills
 */
export function parseWikilinks(raw: string): string {
  if (!raw) return '';
  return raw.replace(/\[\[(.*?)\]\]/g, (match, p1) => {
    const parts = p1.split('|');
    const target = parts[0].trim();
    const label = parts[1] ? parts[1].trim() : target.split('/').pop() || target;
    
    // Normalize target URL (strip category prefix if any)
    const cleanSlug = target.replace(/^concepts\//, '').replace(/^systems\//, '').replace(/^wiki\//, '').replace(/^\//, '');
    const href = `/wiki/${cleanSlug}`;

    return `<a href="${href}" class="inline-flex items-center gap-1 text-[#2563eb] dark:text-[#60a5fa] hover:underline font-mono text-[13px] bg-blue-500/10 hover:bg-blue-500/20 px-2 py-0.5 rounded-md border border-blue-500/20 transition-colors">[[${label}]]</a>`;
  });
}

/**
 * Generate full graph data (nodes & links) from wikilinks
 */
export function getWikiGraphData(): { nodes: GraphNode[]; links: GraphLink[] } {
  const files = getMarkdownFiles(WIKI_DIR);
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];
  const slugToNode: Record<string, GraphNode> = {};

  for (const filePath of files) {
    const fileName = path.basename(filePath);
    if (fileName === 'log.md') continue;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const slug = data.slug || fileName.replace(/\.md$/, '');
    const title = data.title || slug;
    const category = data.category || 'General';

    const node: GraphNode = {
      id: slug,
      name: title,
      val: 3,
      category,
    };

    nodes.push(node);
    slugToNode[slug] = node;
  }

  // Parse links
  for (const filePath of files) {
    const fileName = path.basename(filePath);
    if (fileName === 'log.md') continue;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const sourceSlug = data.slug || fileName.replace(/\.md$/, '');

    const wikilinkRegex = /\[\[(.*?)\]\]/g;
    let match;
    while ((match = wikilinkRegex.exec(content)) !== null) {
      const rawTarget = match[1].split('|')[0].trim();
      const targetSlug = rawTarget.replace(/^concepts\//, '').replace(/^systems\//, '').replace(/^wiki\//, '').replace(/^\//, '');

      if (slugToNode[targetSlug] && targetSlug !== sourceSlug) {
        links.push({
          source: sourceSlug,
          target: targetSlug,
        });
        if (slugToNode[sourceSlug]) slugToNode[sourceSlug].val += 1;
        if (slugToNode[targetSlug]) slugToNode[targetSlug].val += 1;
      }
    }
  }

  return { nodes, links };
}
