import { getAllWikiDocs, getWikiDocBySlug } from "@/lib/wiki";
import { DocsLayout } from "@/components/wiki/DocsLayout";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import Link from "next/link";

export async function generateStaticParams() {
  const docs = getAllWikiDocs();
  return docs
    .filter((d) => d.slug !== "")
    .map((d) => ({
      slug: d.slug.split("/"),
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join("/");
  const doc = getWikiDocBySlug(slugPath);
  if (!doc) return {};

  return {
    title: `${doc.title} | Wiki & Knowledge Base`,
    description: doc.summary || doc.title,
  };
}

// Convert [[slug|Label]] or [[slug]] to standard Markdown links
function transformWikilinks(raw: string): string {
  return raw.replace(/\[\[([a-zA-Z0-9_\-\/]+)(?:\|([^\]]+))?\]\]/g, (match, slug, label) => {
    const text = label || slug.split("/").pop() || slug;
    return `[${text}](/wiki/${slug})`;
  });
}

const components = {
  a: ({ href, children, ...props }: any) => {
    if (href && (href.startsWith("/") || href.startsWith("#"))) {
      return <Link href={href} {...props} className="text-blue-500 hover:underline">{children}</Link>;
    }
    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline" {...props}>{children}</a>;
  },
};

export default async function WikiDocumentPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slugPath = resolvedParams.slug.join("/");
  const doc = getWikiDocBySlug(slugPath);

  if (!doc) {
    notFound();
  }

  const allDocs = getAllWikiDocs();
  const processedContent = transformWikilinks(doc.content);

  return (
    <DocsLayout currentPage={doc} allPages={allDocs}>
      <MDXRemote
        source={processedContent}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </DocsLayout>
  );
}
