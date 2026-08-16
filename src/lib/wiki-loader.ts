import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface WikiHeading {
  depth: number;
  slug: string;
  text: string;
}

export interface WikiPage {
  slug: string;
  title: string;
  category: string;
  section: "projects" | "articles";
  tags: string[];
  summary: string;
  visibility: "public";
  last_updated: string;
  content: string;
  headings: WikiHeading[];
}

export function extractHeadings(content: string): WikiHeading[] {
  const headings: WikiHeading[] = [];
  const headingMatches = content.matchAll(/^(#{2,3})\s+(.+)$/gm);
  for (const match of headingMatches) {
    const depth = match[1].length;
    const rawText = match[2].trim();
    // Strip markdown formatting from heading text
    const cleanText = rawText.replace(/[*_`]/g, "");
    const slug = cleanText
      .toLowerCase()
      .replace(/[^\w\u0400-\u04FF\s-]/g, "")
      .replace(/\s+/g, "-");
    headings.push({ depth, slug, text: cleanText });
  }
  return headings;
}

export function parseMarkdownDoc(
  fullPath: string,
  slug: string,
  section: "projects" | "articles",
  defaultCategory: string = "Methodology & Frameworks"
): WikiPage | null {
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);

  let title = data.title || path.basename(fullPath).replace(/\.(mdx?|md)$/, "");
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match && (!data.title || data.title.toLowerCase() === title.toLowerCase())) {
    title = h1Match[1].trim().replace(/[*_`]/g, "");
  }

  const category = data.category || defaultCategory;
  const tags = Array.isArray(data.tags)
    ? data.tags
    : typeof data.tags === "string"
    ? data.tags.split(",").map((t: string) => t.trim())
    : [];
  
  const summary = data.description || data.summary || "";
  const last_updated = data.date || data.last_updated || new Date().toISOString().split("T")[0];
  const headings = extractHeadings(content);

  return {
    slug,
    title,
    category,
    section,
    tags,
    summary,
    visibility: "public",
    last_updated,
    content,
    headings,
  };
}

export function getAllWikiPages(): WikiPage[] {
  const rootDir = process.cwd();
  const pages: WikiPage[] = [];

  // 1. Scan Projects (src/content/projects)
  const projectsDir = path.join(rootDir, "src/content/projects");
  if (fs.existsSync(projectsDir)) {
    const files = fs.readdirSync(projectsDir);
    for (const file of files) {
      if (file.endsWith(".mdx") || file.endsWith(".md")) {
        const fullPath = path.join(projectsDir, file);
        const slug = file.replace(/\.mdx?$/, "");
        const page = parseMarkdownDoc(fullPath, slug, "projects", "Project");
        if (page) pages.push(page);
      }
    }
  }

  // 2. Scan Articles / Posts (src/content/posts)
  const postsDir = path.join(rootDir, "src/content/posts");
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir);
    for (const file of files) {
      if (file.endsWith(".mdx") || file.endsWith(".md")) {
        const fullPath = path.join(postsDir, file);
        const slug = file.replace(/\.mdx?$/, "");
        const page = parseMarkdownDoc(fullPath, slug, "articles", "Methodology & Research");
        if (page) pages.push(page);
      }
    }
  }

  return pages;
}

export function getWikiPageBySlug(slug: string): WikiPage | undefined {
  const pages = getAllWikiPages();
  return pages.find((p) => p.slug === slug);
}
