export type WikiCategory = "methodologies" | "systems" | "articles" | "guides";

export interface WikiItem {
  id: string;
  title: string;
  summary: string;
  category: WikiCategory;
  categoryLabel: string;
  tags: string[];
  date?: string;
  href: string;
  isExternal?: boolean;
  featured?: boolean;
  readingTime?: string;
  keyTakeaway?: string;
}

export function getWikiCategories() {
  return [
    { id: "all", label: "All Topics" },
    { id: "methodologies", label: "Methodologies" },
    { id: "systems", label: "Portfolio & Systems" },
    { id: "articles", label: "Articles" },
    { id: "guides", label: "Guides & Specs" },
  ];
}
