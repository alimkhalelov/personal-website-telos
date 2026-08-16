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
  tags: string[];
  summary: string;
  visibility: "public" | "private";
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
  defaultVis: "public" | "private",
  defaultCategory?: string
): WikiPage | null {
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);

  let title = data.title || path.basename(fullPath).replace(/\.(mdx?|md)$/, "");
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match && !data.title) {
    title = h1Match[1].trim().replace(/[*_`]/g, "");
  }

  const category = data.category || defaultCategory || (defaultVis === "public" ? "Public Guide" : "Private Harness");
  const tags = Array.isArray(data.tags)
    ? data.tags
    : typeof data.tags === "string"
    ? data.tags.split(",").map((t: string) => t.trim())
    : [];
  
  const summary = data.description || data.summary || "";
  const visibility = data.visibility === "private" ? "private" : defaultVis;
  const last_updated = data.date || data.last_updated || new Date().toISOString().split("T")[0];
  const headings = extractHeadings(content);

  return {
    slug,
    title,
    category,
    tags,
    summary,
    visibility,
    last_updated,
    content,
    headings,
  };
}

export function getAllWikiPages(): WikiPage[] {
  const rootDir = process.cwd();
  const pages: WikiPage[] = [];

  // 1. Scan Public Articles / Posts (src/content/posts)
  const postsDir = path.join(rootDir, "src/content/posts");
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir);
    for (const file of files) {
      if (file.endsWith(".mdx") || file.endsWith(".md")) {
        const fullPath = path.join(postsDir, file);
        const slug = file.replace(/\.mdx?$/, "");
        const page = parseMarkdownDoc(fullPath, slug, "public", "Methodology & Research");
        if (page) pages.push(page);
      }
    }
  }

  // 2. Scan Private Agent Memory (.agents/agents.md, .agents/wiki/*.md)
  const agentsMd = path.join(rootDir, ".agents/agents.md");
  if (fs.existsSync(agentsMd)) {
    const page = parseMarkdownDoc(agentsMd, "agents-manifest", "private", "Agent Harness");
    if (page) {
      page.title = "Agent Harness Manifest";
      page.summary = "Central harness router, invariants, and feedback loops.";
      page.tags = ["Agent", "Harness", "Router"];
      pages.push(page);
    }
  }

  const agentsWikiDir = path.join(rootDir, ".agents/wiki");
  if (fs.existsSync(agentsWikiDir)) {
    const files = fs.readdirSync(agentsWikiDir);
    for (const file of files) {
      if (file.endsWith(".md")) {
        const fullPath = path.join(agentsWikiDir, file);
        const slug = `agent-${file.replace(/\.md$/, "")}`;
        const page = parseMarkdownDoc(fullPath, slug, "private", "Living Memory");
        if (page) {
          if (file === "user_intent.md") {
            page.title = "Living User Intent Matrix";
            page.summary = "Cumulative buffer of user requirements, goals, and constraints.";
            page.tags = ["Intent", "Anti-Drift", "Memory"];
          } else if (file === "architecture.md") {
            page.title = "System Architecture";
            page.summary = "Living system architecture, tech stack, and module topology.";
            page.tags = ["Architecture", "Next.js", "CMS"];
          } else if (file === "artifacts.md") {
            page.title = "Artifacts Router";
            page.summary = "Registry of generated plans, specs, and walkthroughs.";
            page.tags = ["Artifacts", "Router"];
          }
          pages.push(page);
        }
      }
    }
  }

  return pages;
}

export function getWikiPageBySlug(slug: string): WikiPage | undefined {
  const pages = getAllWikiPages();
  return pages.find((p) => p.slug === slug);
}
