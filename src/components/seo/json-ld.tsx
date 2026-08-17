interface PersonSchemaProps {
  name?: string;
  jobTitle?: string;
  url?: string;
  sameAs?: string[];
}

interface WebSiteSchemaProps {
  name?: string;
  url?: string;
  description?: string;
}

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  authorName?: string;
  wordCount?: number;
}

interface TechArticleSchemaProps {
  title: string;
  headline: string;
  url: string;
  image?: string;
  datePublished?: string;
  authorName?: string;
  keywords?: string[];
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function getPersonAndWebsiteGraph() {
  const baseUrl = "https://alim.dest.page";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${baseUrl}/#person`,
        name: "Alim Khalelov",
        jobTitle: "Architect of Autonomous Systems",
        description: "AI-Native Product Manager and Game Designer. Building high-leverage products using the Fan-Filter-Scale methodology.",
        url: baseUrl,
        sameAs: [
          "https://github.com/alimkhalelov",
          "https://github.com/alimzhankhalelov",
          "https://t.me/alim_khalelov",
        ],
        knowsAbout: [
          "Autonomous Agent Architectures",
          "AI-Native Product Management",
          "Generative Engine Optimization",
          "Spec-Driven Development",
          "Loop Engineering",
          "Fan-Filter-Scale Methodology",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        url: baseUrl,
        name: "Alim Khalelov",
        description: "Personal website, showcase of autonomous agent skills, and essays by Alim Khalelov.",
        publisher: {
          "@id": `${baseUrl}/#person`,
        },
        inLanguage: "en-US",
      },
    ],
  };
}

export function getArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  authorName = "Alim Khalelov",
  wordCount,
}: ArticleSchemaProps) {
  const baseUrl = "https://alim.dest.page";

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Alim Khalelov",
      url: baseUrl,
    },
    image: image ? `${baseUrl}${image}` : `${baseUrl}/thumbnails/wiki.jpg`,
    wordCount: wordCount,
    inLanguage: "en-US",
  };
}

export function getProjectJsonLd({
  title,
  headline,
  url,
  image,
  datePublished = "2026-07-01",
  authorName = "Alim Khalelov",
  keywords = [],
}: TechArticleSchemaProps) {
  const baseUrl = "https://alim.dest.page";

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: headline,
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished: datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      name: "Alim Khalelov",
      url: baseUrl,
    },
    image: image ? `${baseUrl}${image}` : `${baseUrl}/thumbnails/wiki.jpg`,
    keywords: keywords.join(", "),
    inLanguage: "en-US",
  };
}

export function getBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
