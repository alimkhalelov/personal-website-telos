import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllWikiPages, getWikiPageBySlug } from "@/lib/wiki-loader";
import { DocsLayout } from "@/components/wiki/docs-layout";
import { JsonLd, getBreadcrumbJsonLd } from "@/components/seo/json-ld";

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

  const title = `${page.title} — Wiki | Alim Khalelov`;
  const description = page.summary || `${page.title} documentation and architectural guide.`;

  return {
    title: page.title,
    description: description,
    alternates: {
      canonical: `/wiki/${page.slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      url: `https://alim.dest.page/wiki/${page.slug}`,
      images: [{ url: "/thumbnails/wiki.jpg", width: 1200, height: 675, alt: page.title }],
    },
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

  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Home", url: "https://alim.dest.page" },
    { name: "Wiki", url: "https://alim.dest.page/wiki" },
    { name: currentPage.title, url: `https://alim.dest.page/wiki/${currentPage.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbsSchema} />
      <DocsLayout currentPage={currentPage} allPages={allPages} />
    </>
  );
}
