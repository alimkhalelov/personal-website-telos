import { getArticleBySlug, getSortedArticles } from "@/lib/mdx";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CopyToAgentButton } from "@/components/copy-to-agent-button";
import { Bionify } from "@/components/bionify";
import remarkGfm from "remark-gfm";
import { JsonLd, getArticleJsonLd, getBreadcrumbJsonLd } from "@/components/seo/json-ld";

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

  const title = article.meta.title;
  const description = article.meta.description || `${title} — Essay by Alim Khalelov on AI-native product architecture and autonomous systems.`;
  const url = `https://alim.dest.page/blog/${article.slug}`;

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${title} | Alim Khalelov`,
      description: description,
      url: url,
      publishedTime: article.meta.date,
      authors: ["Alim Khalelov"],
      images: [
        {
          url: "/thumbnails/wiki.jpg",
          width: 1200,
          height: 675,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Alim Khalelov`,
      description: description,
      images: ["/thumbnails/wiki.jpg"],
    },
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
  h1: (props: any) => <h1 className="text-3xl sm:text-4xl font-bold mt-10 mb-6 tracking-tight text-blue-600/70 dark:text-blue-400/70" {...props}><Bionify>{props.children}</Bionify></h1>,
  h2: (props: any) => <h2 className="text-2xl sm:text-3xl font-bold mt-12 mb-6 tracking-tight text-blue-600/70 dark:text-blue-400/70" {...props}><Bionify>{props.children}</Bionify></h2>,
  h3: (props: any) => <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4 tracking-tight text-blue-600/70 dark:text-blue-400/70" {...props}><Bionify>{props.children}</Bionify></h3>,
  p: (props: any) => {
    let isTldr = false;
    let modifiedChildren = props.children;

    const extractText = (child: any): string => {
      if (typeof child === 'string') return child;
      if (child && child.props && child.props.children) {
        if (typeof child.props.children === 'string') return child.props.children;
        if (Array.isArray(child.props.children)) return child.props.children.map(extractText).join('');
      }
      return '';
    };

    const fullText = Array.isArray(props.children) 
      ? props.children.map(extractText).join('') 
      : extractText(props.children);

    if (fullText.trim().toUpperCase().startsWith('TL;DR:')) {
      isTldr = true;
      
      const stripTldr = (child: any): any => {
        if (typeof child === 'string') {
           return child.replace(/^\s*TL;?DR:\s*/i, '');
        }
        if (Array.isArray(child)) {
           let done = false;
           return child.map(c => {
             if (!done && typeof c === 'string') {
               const res = c.replace(/^\s*TL;?DR:\s*/i, '');
               if (res !== c) done = true;
               return res;
             }
             return c;
           });
        }
        return child;
      };
      modifiedChildren = stripTldr(props.children);
    }

    if (isTldr) {
      return (
        <div className="relative my-8 p-6 rounded-2xl bg-muted/40 dark:bg-card border border-border/80 text-[18px] sm:text-[20px] text-[#222222] dark:text-foreground/90 leading-[1.6]">
          <div className="flex items-center gap-2 mb-2 text-accent text-xs font-mono font-bold tracking-wider uppercase">
            <span>TL;DR</span>
          </div>
          <div><Bionify>{modifiedChildren}</Bionify></div>
        </div>
      );
    }

    return (
      <p className="mb-6 text-[18px] sm:text-[20px] text-[#222222] dark:text-foreground/90 leading-[1.6]">
        <Bionify>{props.children}</Bionify>
      </p>
    );
  },
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

  const articleSchema = getArticleJsonLd({
    title: article.meta.title,
    description: article.meta.description || article.meta.title,
    url: `https://alim.dest.page/blog/${article.slug}`,
    datePublished: article.meta.date,
    authorName: "Alim Khalelov",
  });

  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Home", url: "https://alim.dest.page" },
    { name: "Blog", url: "https://alim.dest.page" },
    { name: article.meta.title, url: `https://alim.dest.page/blog/${article.slug}` },
  ]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-background">
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbsSchema} />

      <main className="max-w-[65ch] mx-auto px-6 py-16 sm:py-24 w-full">
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors !no-underline">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <CopyToAgentButton title={article.meta.title} content={article.content} />
        </div>

        <article>
          <header className="mb-10 flex flex-col gap-3">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#222222] dark:text-foreground">{article.meta.title}</h1>
            <time className="text-muted font-mono text-sm">{formatDate(article.meta.date)}</time>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-[18px] sm:text-[20px] text-[#222222] dark:text-foreground/90 leading-[1.6]">
            <MDXRemote 
              source={article.content} 
              components={components} 
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </article>
      </main>
    </div>
  );
}
