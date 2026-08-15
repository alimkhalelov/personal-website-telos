import { getAllWikiEntries, getWikiEntryBySlug } from "@/lib/wiki";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers, ArrowUpRight, Cpu } from "lucide-react";
import { WikiProperties } from "@/components/wiki/wiki-properties";
import { CopyToAgentButton } from "@/components/copy-to-agent-button";
import { Bionify } from "@/components/bionify";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const entries = getAllWikiEntries();
  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const entry = getWikiEntryBySlug(resolvedParams.slug);
  if (!entry) return {};

  return {
    title: `${entry.meta.title} | Wiki | Alimzhan Khalelov`,
    description: entry.meta.summary,
  };
}

const components = {
  h1: (props: any) => (
    <h1 className="text-3xl sm:text-4xl font-bold mt-10 mb-6 tracking-tight text-foreground" {...props}>
      <Bionify>{props.children}</Bionify>
    </h1>
  ),
  h2: (props: any) => (
    <h2 className="text-2xl sm:text-3xl font-bold mt-12 mb-6 tracking-tight text-foreground border-b border-border/40 pb-3" {...props}>
      <Bionify>{props.children}</Bionify>
    </h2>
  ),
  h3: (props: any) => (
    <h3 className="text-xl sm:text-2xl font-bold mt-8 mb-4 tracking-tight text-foreground" {...props}>
      <Bionify>{props.children}</Bionify>
    </h3>
  ),
  p: (props: any) => {
    let isTldr = false;
    let modifiedChildren = props.children;

    const extractText = (child: any): string => {
      if (typeof child === "string") return child;
      if (child && child.props && child.props.children) {
        if (typeof child.props.children === "string") return child.props.children;
        if (Array.isArray(child.props.children)) return child.props.children.map(extractText).join("");
      }
      return "";
    };

    const fullText = Array.isArray(props.children)
      ? props.children.map(extractText).join("")
      : extractText(props.children);

    if (fullText.trim().toUpperCase().startsWith("TL;DR")) {
      isTldr = true;
      const stripTldr = (child: any): any => {
        if (typeof child === "string") {
          return child.replace(/^\s*TL;?DR:\s*/i, "");
        }
        if (Array.isArray(child)) {
          let done = false;
          return child.map((c) => {
            if (done) return c;
            const text = extractText(c);
            if (/^\s*TL;?DR:\s*/i.test(text)) {
              done = true;
              return stripTldr(c);
            } else if (text.trim().toUpperCase() === "TL;DR" || text.trim().toUpperCase() === "TL;DR:") {
              done = true;
              return null;
            }
            return c;
          });
        }
        if (child && child.props && child.props.children) {
          const text = extractText(child);
          if (/^\s*TL;?DR:\s*/i.test(text) || text.trim().toUpperCase() === "TL;DR:") {
            const newChildren = stripTldr(child.props.children);
            if (!newChildren || (typeof newChildren === "string" && newChildren.trim() === "")) return null;
            return { ...child, props: { ...child.props, children: newChildren } };
          }
        }
        return child;
      };
      modifiedChildren = stripTldr(props.children);
    }

    if (isTldr) {
      return (
        <div className="my-8 p-6 sm:p-7 bg-accent/5 border border-accent/20 rounded-2xl">
          <div className="mb-2">
            <span className="font-mono font-bold text-accent tracking-wider uppercase text-xs">TL;DR &bull; Core Takeaway</span>
          </div>
          <p className="text-[17px] sm:text-[18px] text-foreground/90 leading-relaxed m-0 font-light">
            <Bionify>{modifiedChildren}</Bionify>
          </p>
        </div>
      );
    }

    return (
      <p className="mb-6 text-[17px] sm:text-[18px] text-foreground/90 leading-relaxed font-light" {...props}>
        <Bionify>{props.children}</Bionify>
      </p>
    );
  },
  a: (props: any) => (
    <a className="text-accent hover:underline decoration-accent/40 underline-offset-4 transition-colors font-medium" {...props}>
      <Bionify>{props.children}</Bionify>
    </a>
  ),
  ul: (props: any) => (
    <ul className="list-disc pl-6 mb-6 space-y-2 text-[17px] sm:text-[18px] text-foreground/90 leading-relaxed font-light" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-[17px] sm:text-[18px] text-foreground/90 leading-relaxed font-light" {...props} />
  ),
  li: (props: any) => (
    <li className="pl-1" {...props}>
      <Bionify>{props.children}</Bionify>
    </li>
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-2 border-accent/60 pl-5 py-2 italic my-6 text-muted-foreground bg-muted/10 rounded-r-xl" {...props}>
      <Bionify>{props.children}</Bionify>
    </blockquote>
  ),
  strong: (props: any) => (
    <strong className="font-semibold text-foreground" {...props}>
      <Bionify>{props.children}</Bionify>
    </strong>
  ),
  table: (props: any) => (
    <div className="my-8 w-full overflow-x-auto rounded-xl border border-border/70">
      <table className="w-full text-left text-sm" {...props} />
    </div>
  ),
  th: (props: any) => (
    <th className="bg-muted/30 px-4 py-3 font-semibold text-foreground border-b border-border/60" {...props} />
  ),
  td: (props: any) => (
    <td className="px-4 py-3 border-b border-border/40 text-muted-foreground" {...props} />
  ),
  pre: (props: any) => (
    <pre className="my-6 p-4 rounded-xl bg-card border border-border/70 overflow-x-auto text-sm font-mono leading-relaxed" {...props} />
  ),
  code: (props: any) => {
    if (props.className) {
      return <code {...props} />;
    }
    return (
      <code className="px-1.5 py-0.5 rounded bg-muted/40 text-accent font-mono text-xs border border-border/40" {...props} />
    );
  },
};

export default async function WikiEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const entry = getWikiEntryBySlug(resolvedParams.slug);

  if (!entry) {
    notFound();
  }

  const { meta, content } = entry;

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-10 w-full">
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/wiki"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Wiki Directory</span>
            </Link>
            <span className="text-muted-foreground/40 font-mono text-xs">/</span>
            <span className="text-xs font-mono text-muted-foreground">{meta.category}</span>
          </div>

          <CopyToAgentButton title={meta.title} content={content} />
        </div>

        {/* Header Block */}
        <header className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono font-medium text-accent uppercase tracking-wider">
              {meta.category}
            </span>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-[1.15]">
              {meta.title}
            </h1>
          </div>

          {/* Notion Database Properties */}
          <WikiProperties
            version={meta.version}
            domain={meta.category}
            tags={meta.tags}
            grounding={meta.grounding}
            author={meta.author}
          />
        </header>

        {/* Content Body */}
        <article className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote
            source={content}
            components={components}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </article>

        {/* Related Links & Cross References */}
        {((meta.relatedPosts && meta.relatedPosts.length > 0) ||
          (meta.relatedProjects && meta.relatedProjects.length > 0)) && (
          <section className="flex flex-col gap-4 pt-10 border-t border-border/60">
            <h3 className="text-lg font-bold tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-accent" />
              Connected Knowledge Vectors
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {meta.relatedPosts?.map((postSlug) => (
                <Link
                  key={postSlug}
                  href={`/blog/${postSlug}`}
                  className="group flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-card/40 hover:bg-muted/40 hover:border-accent transition-all !no-underline"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground uppercase">Blog Essay</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors mt-2">
                    {postSlug.replace(/-/g, " ")}
                  </h4>
                </Link>
              ))}

              {meta.relatedProjects?.map((projSlug) => (
                <Link
                  key={projSlug}
                  href={`/wiki/${projSlug}`}
                  className="group flex flex-col justify-between p-4 rounded-xl border border-border/60 bg-card/40 hover:bg-muted/40 hover:border-accent transition-all !no-underline"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground uppercase">Wiki Concept</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors mt-2">
                    {projSlug.replace(/-/g, " ")}
                  </h4>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-border/40 text-sm">
          <Link
            href="/wiki"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            Explore All Wiki Entries
          </Link>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Headquarters
          </Link>
        </div>
      </main>
    </div>
  );
}
