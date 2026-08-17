import { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/projects-data";
import { getSortedArticles } from "@/lib/mdx";
import { getAllWikiPages } from "@/lib/wiki-loader";

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
      images: [`${baseUrl}/thumbnails/wiki.jpg`],
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
      priority: 0.9,
    },
    {
      url: `${baseUrl}/petprojects`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // 2. Showcase Projects Routes
  const projects = getAllProjects();
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: `${project.initiationDate}T00:00:00.000Z`,
    changeFrequency: "weekly",
    priority: 0.85,
    images: [`${baseUrl}/thumbnails/${project.slug}.jpg`],
  }));

  // 3. Blog Essay Routes
  const articles = getSortedArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: `${article.date}T00:00:00.000Z`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // 4. Wiki Document Routes
  const wikiPages = getAllWikiPages();
  const wikiRoutes: MetadataRoute.Sitemap = wikiPages.map((page) => ({
    url: `${baseUrl}/wiki/${page.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...projectRoutes, ...articleRoutes, ...wikiRoutes];
}
