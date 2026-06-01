import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/posts");

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  description?: string;
};

export function getSortedArticles(): ArticleMeta[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(contentDirectory);
  const allArticles = fileNames
    .filter((fileName) => fileName.endsWith(".mdx") || fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx?$/, "");
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);

      return {
        slug,
        title: matterResult.data.title || slug,
        date: matterResult.data.date || new Date().toISOString(),
        ...(matterResult.data as Omit<ArticleMeta, "slug" | "title" | "date">),
      };
    });

  return allArticles.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getArticleBySlug(slug: string) {
  const fullPathMDX = path.join(contentDirectory, `${slug}.mdx`);
  const fullPathMD = path.join(contentDirectory, `${slug}.md`);
  
  const fullPath = fs.existsSync(fullPathMDX) ? fullPathMDX : fullPathMD;
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    meta: {
      ...data,
      title: data.title,
      date: data.date,
    } as ArticleMeta,
    content,
  };
}
