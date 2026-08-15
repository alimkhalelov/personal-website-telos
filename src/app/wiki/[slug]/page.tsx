import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllWikiPages, getWikiPageBySlug } from '@/lib/wiki';
import { DocsLayout } from '@/components/wiki/DocsLayout';
import { MarkdownContent } from '@/components/wiki/MarkdownContent';
import { ArrowLeft, Link as LinkIcon } from 'lucide-react';

interface WikiSlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const pages = getAllWikiPages();
  return pages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: WikiSlugPageProps) {
  const resolvedParams = await params;
  const page = getWikiPageBySlug(resolvedParams.slug);
  if (!page) return {};

  return {
    title: `${page.title} | AI-Wiki`,
    description: page.summary || page.title,
  };
}

export default async function WikiSlugPage({ params }: WikiSlugPageProps) {
  const resolvedParams = await params;
  const page = getWikiPageBySlug(resolvedParams.slug);
  const allPages = getAllWikiPages();

  if (!page) {
    notFound();
  }

  // Find incoming backlinks from other pages
  const backlinks = allPages.filter((otherPage) => {
    if (otherPage.slug === page.slug) return false;
    const fullOther = getWikiPageBySlug(otherPage.slug);
    if (!fullOther) return false;
    return fullOther.content.includes(`[[${page.slug}`) || fullOther.content.includes(`[[concepts/${page.slug}`) || fullOther.content.includes(`[[systems/${page.slug}`);
  });

  return (
    <DocsLayout currentPage={page} allPages={allPages}>
      <div className="space-y-10">
        {/* Main Article Body */}
        <MarkdownContent content={page.content} />

        {/* Backlinks & Referenced Nodes */}
        {backlinks.length > 0 && (
          <div className="mt-12 pt-8 border-t border-border space-y-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              <LinkIcon className="w-4 h-4 text-accent" />
              <span>Referenced in Backlinks ({backlinks.length})</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {backlinks.map((b) => (
                <Link
                  key={b.slug}
                  href={`/wiki/${b.slug}`}
                  className="p-3 rounded-lg border border-border/80 bg-card hover:border-accent/40 hover:bg-accent/5 transition-all !no-underline group"
                >
                  <div className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
                    {b.title}
                  </div>
                  {b.summary && (
                    <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {b.summary}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <Link
            href="/wiki"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Wiki Hub</span>
          </Link>
          <Link
            href="/wiki/graph"
            className="inline-flex items-center gap-1.5 text-xs text-accent hover:underline"
          >
            <span>Explore in Knowledge Graph &rarr;</span>
          </Link>
        </div>
      </div>
    </DocsLayout>
  );
}
