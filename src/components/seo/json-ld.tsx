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

export function JsonLd({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Unified schema.org @graph connecting Person, WebSite, WebPage (Speakable), Flagship ItemList, and FAQPage. */
export function getPersonAndWebsiteGraph() {
  const baseUrl = "https://alim.dest.page";
  const personId = `${baseUrl}/#person`;
  const websiteId = `${baseUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "Alim Khalelov",
        alternateName: "Alimzhan Khalelov",
        jobTitle: "AI-Native Product Manager",
        description:
          "Product Manager with 5+ years shipping 0-to-1 products across AI and Web3. Focused on multi-agent systems, LLM evaluation pipelines, and rapid prototyping in code.",
        url: baseUrl,
        image: `${baseUrl}/icon.png`,
        email: "mailto:alim.khalelov@gmail.com",
        sameAs: [
          "https://www.linkedin.com/in/alimzhan-khalelov",
          "https://github.com/alimkhalelov",
          "https://github.com/alimzhankhalelov",
          "https://t.me/AlimLLC",
        ],
        knowsAbout: [
          "AI-Native Product Management",
          "Multi-Agent Systems",
          "LLM Evaluation Pipelines",
          "0-to-1 Product Discovery",
          "Rapid Prototyping",
          "Generative Engine Optimization",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: baseUrl,
        name: "Alim Khalelov",
        description:
          "Portfolio, shipped AI systems, and product architecture case studies by Alim Khalelov.",
        publisher: { "@id": personId },
        inLanguage: "en-US",
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        url: baseUrl,
        name: "Alim Khalelov | AI-Native Product Manager",
        description:
          "5+ years shipping 0-to-1 products across AI and Web3. Portfolio of live agent workflows, compliance engines, and rapid product prototypes.",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: ["#hero-title", "#hero-summary"],
        },
        inLanguage: "en-US",
      },
      {
        "@type": "ItemList",
        "@id": `${baseUrl}/#projects`,
        name: "Flagship Shipped Projects",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Tempo",
            url: `${baseUrl}/projects/tempo`,
            description: "Progressive interval telemetry HUD and procedural runner kinematics.",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Ocus",
            url: `${baseUrl}/projects/ocus`,
            description: "EU crypto compliance operating system turning MiCA, DORA, and DAC8 directives into an executable 31-node DAG.",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Residual Intellect",
            url: `${baseUrl}/projects/residual-intellect`,
            description: "Automated AI news analysis and Telegram dispatch radar tracking tech predictions against real launches.",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Plain",
            url: `${baseUrl}/projects/goal-classifier`,
            description: "Minimalist goal clarity workspace with client-side Web Crypto AES-GCM encrypted BYOK AI decomposition.",
          },
          {
            "@type": "ListItem",
            position: 5,
            name: "Nebuly",
            url: `${baseUrl}/projects/nebuly`,
            description: "Executive AI brief platform connecting leadership narratives with conversation telemetry and multi-order ROI.",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "Who is Alim Khalelov and what roles does he focus on?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Alim Khalelov is an AI-Native Product Manager with 5+ years of experience shipping 0-to-1 products across AI and Web3 startups, scaling new launches from 0 to 10,000 users in 30 days and distributing across 50+ content platforms.",
            },
          },
          {
            "@type": "Question",
            name: "What kind of AI systems and products has Alim shipped?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Flagship live prototypes include Ocus (a 31-node EU MiCA/DORA/DAC8 compliance DAG cockpit), Nebuly (an executive AI analytics and conversation telemetry brief), Plain (a goal clarification workspace with Web Crypto encrypted BYOK AI), Residual Intellect (automated AI news curation), and Tempo (a 60 FPS runner interval visualizer).",
            },
          },
          {
            "@type": "Question",
            name: "How can founders or hiring teams contact Alim or book an intro call?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Teams can book a 30-minute intro call directly via Cal.com (cal.com/alim-xjzgyu/30min), download his PDF resume at alim.dest.page/resume.pdf, email alim.khalelov@gmail.com, or message @AlimLLC on Telegram.",
            },
          },
        ],
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
    description,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: authorName,
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Alim Khalelov",
      url: baseUrl,
    },
    image: image ? `${baseUrl}${image}` : `${baseUrl}/icon.png`,
    wordCount,
    inLanguage: "en-US",
  };
}

export function getProjectJsonLd({
  title,
  headline,
  url,
  image,
  datePublished = "2026-11-05",
  authorName = "Alim Khalelov",
  keywords = [],
}: TechArticleSchemaProps) {
  const baseUrl = "https://alim.dest.page";

  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description: headline,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    datePublished,
    author: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: authorName,
      url: baseUrl,
    },
    publisher: {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Alim Khalelov",
      url: baseUrl,
    },
    image: image ? `${baseUrl}${image}` : `${baseUrl}/icon.png`,
    keywords: keywords.join(", "),
    inLanguage: "en-US",
  };
}

export function getBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
