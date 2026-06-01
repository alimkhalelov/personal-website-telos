import { getArticleBySlug, getSortedArticles } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
  const articles = getSortedArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);
  if (!article) return {};

  return {
    title: `${article.meta.title} | Alimzhan`,
    description: article.meta.title,
  };
}

const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  } catch (e) {
    return dateString;
  }
};

// Custom components for MDX
const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4 tracking-tight" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-8 mb-4 tracking-tight" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-bold mt-6 mb-3 tracking-tight" {...props} />,
  p: (props: any) => <p className="leading-relaxed mb-6 text-lg text-foreground/90" {...props} />,
  a: (props: any) => <a className="text-accent hover:text-accent-hover hover:underline transition-colors" {...props} />,
  ul: (props: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-lg text-foreground/90" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-lg text-foreground/90" {...props} />,
  li: (props: any) => <li {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-muted pl-4 italic my-6 text-muted" {...props} />
  ),
  strong: (props: any) => <strong className="font-semibold text-foreground" {...props} />,
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16 sm:py-24 w-full">
      <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground mb-12 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm font-medium">На главную</span>
      </Link>

      <article>
        <header className="mb-10 flex flex-col gap-3">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{article.meta.title}</h1>
          <time className="text-muted font-mono text-sm">{formatDate(article.meta.date)}</time>
        </header>

        <div className="prose prose-invert max-w-none">
          <MDXRemote source={article.content} components={components} />
        </div>
      </article>
    </main>
  );
}
