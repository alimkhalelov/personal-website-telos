import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects-data";
import { getSortedArticles } from "@/lib/mdx";
import { getAllWikiPages } from "@/lib/wiki-loader";

function toIsoDate(value?: string): string {
  if (!value) return new Date().toISOString();
  const parsed = new Date(value.includes("T") ? value : `${value}T00:00:00.000Z`);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://alim.dest.page";
  const now = new Date().toISOString();

  // 1. Core Static Landing Routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
      images: [`${baseUrl}/icon.png`],
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
  ];

  // 2. Public Flagship Showcase Projects Only
  const projects = getAllProjects().filter((project) => project.isPublic === true);
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: toIsoDate(project.initiationDate),
    changeFrequency: "weekly",
    priority: 0.9,
    images: project.thumbnailSrc ? [`${baseUrl}${project.thumbnailSrc}`] : undefined,
  }));

  // 3. Public Blog Essays Only
  const articles = getSortedArticles().filter((article) => article.isPublic === true);
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: toIsoDate(article.date),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Public Wiki Pages Only
  const wikiPages = getAllWikiPages().filter((page) => page.visibility === "public");
  const wikiRoutes: MetadataRoute.Sitemap = wikiPages.map((page) => ({
    url: `${baseUrl}/wiki/${page.slug}`,
    lastModified: toIsoDate(page.last_updated),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...wikiRoutes];
}
