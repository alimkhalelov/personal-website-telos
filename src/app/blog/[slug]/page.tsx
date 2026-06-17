import { getArticleBySlug, getSortedArticles } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CopyToAgentButton } from "@/components/copy-to-agent-button";
import { Bionify } from "@/components/bionify";

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
  h1: (props: any) => <h1 className="text-3xl sm:text-4xl font-bold mt-10 mb-6 tracking-tight text-[#222222]/70 dark:text-foreground/70" {...props}><Bionify>{props.children}</Bionify></h1>,
  h2: (props: any) => <h2 className="text-2xl sm:text-3xl font-bold mt-12 mb-6 tracking-tight text-[#222222]/70 dark:text-foreground/70" {...props}><Bionify>{props.children}</Bionify></h2>,
  h3: (props: any) => <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4 tracking-tight text-[#222222]/70 dark:text-foreground/70" {...props}><Bionify>{props.children}</Bionify></h3>,
  p: (props: any) => <p className="mb-8 text-[18px] sm:text-[20px] text-[#222222] dark:text-foreground/90 leading-[1.6]" {...props}><Bionify>{props.children}</Bionify></p>,
  a: (props: any) => <a className="text-accent hover:text-accent-hover hover:underline transition-colors" {...props}><Bionify>{props.children}</Bionify></a>,
  ul: (props: any) => <ul className="list-disc pl-6 mb-8 space-y-3 text-[18px] sm:text-[20px] text-[#222222] dark:text-foreground/90 leading-[1.6]" {...props} />,
  ol: (props: any) => <ol className="list-decimal pl-6 mb-8 space-y-3 text-[18px] sm:text-[20px] text-[#222222] dark:text-foreground/90 leading-[1.6]" {...props} />,
  li: (props: any) => <li className="pl-2" {...props}><Bionify>{props.children}</Bionify></li>,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-muted pl-6 py-2 italic my-8 text-muted-foreground bg-muted/20 rounded-r-lg" {...props}><Bionify>{props.children}</Bionify></blockquote>
  ),
  strong: (props: any) => <strong className="font-bold text-accent" {...props}><Bionify>{props.children}</Bionify></strong>,
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const article = getArticleBySlug(resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background">
      <main className="max-w-[65ch] mx-auto px-6 py-16 sm:py-24 w-full">
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <CopyToAgentButton title={article.meta.title} content={article.content} />
        </div>

        <article>
          <header className="mb-10 flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#222222]/70 dark:text-foreground/70">{article.meta.title}</h1>
            <time className="text-muted font-mono text-sm">{formatDate(article.meta.date)}</time>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-[18px] sm:text-[20px] text-[#222222] dark:text-foreground/90 leading-[1.6]">
            <MDXRemote source={article.content} components={components} />
          </div>
        </article>
      </main>
    </div>
  );
}
