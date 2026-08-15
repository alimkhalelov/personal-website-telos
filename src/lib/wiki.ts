import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WIKI_DIR = path.join(process.cwd(), "src/content/wiki");

export interface HeadingItem {
  depth: number;
  slug: string;
  text: string;
}

export interface WikiDocMeta {
  title: string;
  slug: string;
  summary?: string;
  category: string;
  tags?: string[];
  version?: string;
  last_updated?: string;
  headings?: HeadingItem[];
}

export interface WikiDoc extends WikiDocMeta {
  content: string;
  rawContent: string;
  forwardLinks: string[];
  backlinks: { slug: string; title: string; category: string }[];
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

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function extractHeadings(content: string): HeadingItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const depth = match[1].length;
    const text = match[2].trim();
    headings.push({
      depth,
      slug: slugifyHeading(text),
      text,
    });
  }

  return headings;
}

function extractWikilinks(content: string): string[] {
  const wikilinkRegex = /\[\[([a-zA-Z0-9_\-\/]+)(?:\|[^\]]+)?\]\]/g;
  const links: string[] = [];
  let match;

  while ((match = wikilinkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }

  return Array.from(new Set(links));
}

function scanWikiFiles(dir: string, baseDir: string = dir): string[] {
  if (!fs.existsSync(dir)) return [];
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(scanWikiFiles(filePath, baseDir));
    } else if (file.endsWith(".mdx") || file.endsWith(".md")) {
      const relPath = path.relative(baseDir, filePath).replace(/\\/g, "/");
      results.push(relPath);
    }
  }

  return results;
}

export function getAllWikiDocs(): WikiDoc[] {
  const filePaths = scanWikiFiles(WIKI_DIR);
  const docsMap = new Map<string, WikiDoc>();

  // First pass: load documents
  for (const relPath of filePaths) {
    const fullPath = path.join(WIKI_DIR, relPath);
    const fileContent = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContent);

    const slug = relPath.replace(/\.mdx?$/, "").replace(/\/index$/, "");
    const normalizedSlug = slug === "index" ? "" : slug;

    let title = data.title;
    if (!title) {
      const h1Match = content.match(/^#\s+(.+)$/m);
      title = h1Match ? h1Match[1].trim() : slug;
    }

    const category = data.category || (relPath.includes("/") ? relPath.split("/")[0] : "General");
    const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

    let cleanContent = content;
    const h1Match = content.match(/^#\s+.+$/m);
    if (h1Match) {
      cleanContent = content.replace(/^#\s+.+$/m, "").trim();
    }

    const headings = extractHeadings(cleanContent);
    const forwardLinks = extractWikilinks(cleanContent);

    docsMap.set(normalizedSlug, {
      title,
      slug: normalizedSlug,
      summary: data.summary || data.description || "",
      category: formattedCategory,
      tags: data.tags || [],
      version: data.version || "v1.0.0 (Verified AST)",
      last_updated: data.last_updated || new Date().toISOString().split("T")[0],
      headings,
      content: cleanContent,
      rawContent: fileContent,
      forwardLinks,
      backlinks: [],
    });
  }

  const docs = Array.from(docsMap.values());

  // Second pass: compute backlinks
  for (const doc of docs) {
    for (const link of doc.forwardLinks) {
      const targetDoc = docsMap.get(link);
      if (targetDoc) {
        if (!targetDoc.backlinks.some((b) => b.slug === doc.slug)) {
          targetDoc.backlinks.push({
            slug: doc.slug,
            title: doc.title,
            category: doc.category,
          });
        }
      }
    }
  }

  return docs;
}

export function getWikiDocBySlug(slug: string): WikiDoc | null {
  const allDocs = getAllWikiDocs();
  const normalized = slug === "index" ? "" : slug;
  return allDocs.find((d) => d.slug === normalized) || null;
}

export function getWikiGraph(): { nodes: GraphNode[]; links: GraphLink[] } {
  const docs = getAllWikiDocs();
  const nodes: GraphNode[] = [];
  const links: GraphLink[] = [];

  for (const doc of docs) {
    const backlinkCount = doc.backlinks.length;
    const forwardCount = doc.forwardLinks.length;
    const weight = Math.max(3, 2 + Math.sqrt(backlinkCount + forwardCount) * 2.5);

    nodes.push({
      id: doc.slug === "" ? "index" : doc.slug,
      name: doc.title,
      val: weight,
      category: doc.category,
    });

    for (const targetSlug of doc.forwardLinks) {
      links.push({
        source: doc.slug === "" ? "index" : doc.slug,
        target: targetSlug === "" ? "index" : targetSlug,
      });
    }
  }

  return { nodes, links };
}
