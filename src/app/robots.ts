import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://alim.dest.page";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/admin/draft", "/api/", "/dashboard/", "/laminar"],
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Applebot",
          "Google-Extended",
          "Googlebot",
          "Bingbot",
        ],
        allow: "/",
        disallow: ["/admin/", "/api/", "/laminar"],
      },
      {
        userAgent: ["CCBot", "Bytespider", "anthropic-ai", "cohere-ai"],
        disallow: ["/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
