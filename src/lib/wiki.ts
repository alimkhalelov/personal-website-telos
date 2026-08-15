import fs from "fs";
import path from "path";
import matter from "gray-matter";

const wikiDirectory = path.join(process.cwd(), "src/content/wiki");

export type WikiEntryMeta = {
  slug: string;
  title: string;
  category: "Methodologies" | "AI & Engineering" | "Entities & Lab" | "Systems & Invariants" | string;
  tags: string[];
  summary: string;
  version?: string;
  grounding?: string;
  author?: string;
  relatedPosts?: string[];
  relatedProjects?: string[];
  icon?: string;
  order?: number;
  lastUpdated?: string;
};

export type WikiEntry = {
  meta: WikiEntryMeta;
  content: string;
  rawContent: string;
};

export type GraphNode = {
  id: string;
  label: string;
  category: string;
  type: "wiki" | "blog" | "project";
  url: string;
};

export type GraphEdge = {
  source: string;
  target: string;
  label?: string;
};

export type KnowledgeGraphData = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export function getAllWikiEntries(): WikiEntryMeta[] {
  if (!fs.existsSync(wikiDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(wikiDirectory);
  const entries: WikiEntryMeta[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) continue;
    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(wikiDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);

    entries.push({
      slug,
      title: data.title || slug,
      category: data.category || "General",
      tags: data.tags || [],
      summary: data.summary || "",
      version: data.version || "v1.2.0-AST",
      grounding: data.grounding || "Verified 0% Hallucination",
      author: data.author || "Alim Khalelov",
      relatedPosts: data.relatedPosts || [],
      relatedProjects: data.relatedProjects || [],
      icon: data.icon || "FileText",
      order: data.order !== undefined ? data.order : 99,
      lastUpdated: data.lastUpdated || "2026-08-15",
    });
  }

  return entries.sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function getWikiEntryBySlug(slug: string): WikiEntry | null {
  if (!fs.existsSync(wikiDirectory)) return null;

  const fullPathMD = path.join(wikiDirectory, `${slug}.md`);
  const fullPathMDX = path.join(wikiDirectory, `${slug}.mdx`);
  const fullPath = fs.existsSync(fullPathMD) ? fullPathMD : fullPathMDX;

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      title: data.title || slug,
      category: data.category || "General",
      tags: data.tags || [],
      summary: data.summary || "",
      version: data.version || "v1.2.0-AST",
      grounding: data.grounding || "Verified 0% Hallucination",
      author: data.author || "Alim Khalelov",
      relatedPosts: data.relatedPosts || [],
      relatedProjects: data.relatedProjects || [],
      icon: data.icon || "FileText",
      order: data.order !== undefined ? data.order : 99,
      lastUpdated: data.lastUpdated || "2026-08-15",
    },
    content,
    rawContent: fileContents,
  };
}

export function getWikiCategories(): string[] {
  const entries = getAllWikiEntries();
  const categories = new Set<string>();
  entries.forEach((e) => categories.add(e.category));
  return Array.from(categories);
}

export function getKnowledgeGraphData(): KnowledgeGraphData {
  const entries = getAllWikiEntries();
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Add Headquarters node
  nodes.push({
    id: "alim-khalelov-hq",
    label: "Alim Khalelov (HQ)",
    category: "Author",
    type: "project",
    url: "/",
  });

  entries.forEach((entry) => {
    nodes.push({
      id: `wiki:${entry.slug}`,
      label: entry.title,
      category: entry.category,
      type: "wiki",
      url: `/wiki/${entry.slug}`,
    });

    // Link from HQ to major categories
    edges.push({
      source: "alim-khalelov-hq",
      target: `wiki:${entry.slug}`,
      label: "authored",
    });

    // Cross-link to related posts
    if (entry.relatedPosts) {
      entry.relatedPosts.forEach((postSlug) => {
        const postId = `blog:${postSlug}`;
        if (!nodes.some((n) => n.id === postId)) {
          nodes.push({
            id: postId,
            label: postSlug.replace(/-/g, " "),
            category: "Articles",
            type: "blog",
            url: `/blog/${postSlug}`,
          });
        }
        edges.push({
          source: `wiki:${entry.slug}`,
          target: postId,
          label: "expands",
        });
      });
    }

    // Cross-link to related projects
    if (entry.relatedProjects) {
      entry.relatedProjects.forEach((projSlug) => {
        edges.push({
          source: `wiki:${entry.slug}`,
          target: `wiki:${projSlug}`,
          label: "implements",
        });
      });
    }
  });

  return { nodes, edges };
}
