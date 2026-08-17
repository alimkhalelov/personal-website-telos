import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllWikiPages, getWikiPageBySlug } from "@/lib/wiki-loader";
import { DocsLayout } from "@/components/wiki/docs-layout";

export const metadata: Metadata = {
  title: "Wiki & Knowledge Base | Alim Khalelov",
  description: "AI-Native Product Management methodologies, autonomous systems, and research by Alim Khalelov.",
  alternates: {
    canonical: "/wiki",
  },
  openGraph: {
    title: "Wiki & Knowledge Base | Alim Khalelov",
    description: "AI-Native Product Management methodologies, autonomous systems, and research by Alim Khalelov.",
    url: "https://alim.dest.page/wiki",
    images: [{ url: "/thumbnails/wiki.jpg", width: 1200, height: 675, alt: "Wiki & Knowledge Base" }],
  },
};

export default function WikiIndexPage() {
  const allPages = getAllWikiPages();
  const publicPages = allPages.filter((p) => p.visibility === "public");
  
  // Default to fan-filter-scale-methodology or the first public page
  const defaultSlug = publicPages.find((p) => p.slug === "fan-filter-scale-methodology")?.slug || publicPages[0]?.slug;
  const currentPage = getWikiPageBySlug(defaultSlug);

  if (!currentPage) {
    notFound();
  }

  return <DocsLayout currentPage={currentPage} allPages={allPages} />;
}
