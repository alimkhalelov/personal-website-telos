import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllWikiPages, getWikiPageBySlug } from "@/lib/wiki-loader";
import { DocsLayout } from "@/components/wiki/docs-layout";

export async function generateStaticParams() {
  const pages = getAllWikiPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getWikiPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found | Wiki",
    };
  }

  return {
    title: `${page.title} — Wiki | Alimzhan`,
    description: page.summary || `${page.title} documentation and architectural guide.`,
  };
}

export default async function WikiSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allPages = getAllWikiPages();
  const currentPage = getWikiPageBySlug(slug);

  if (!currentPage) {
    notFound();
  }

  return <DocsLayout currentPage={currentPage} allPages={allPages} />;
}
