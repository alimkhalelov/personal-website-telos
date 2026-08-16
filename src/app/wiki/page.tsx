import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Layers } from "lucide-react";
import { getPublicWikiRegistry } from "@/lib/wiki";
import { WikiHub } from "@/components/wiki/wiki-hub";

export const metadata: Metadata = {
  title: "Wiki & Public Knowledge Base | Alimzhan",
  description: "Public knowledge base, core methodologies, lab architectures, and technical articles by Alimzhan Khalelov.",
  openGraph: {
    title: "Public Knowledge Base | Alimzhan Khalelov",
    description: "Explore core methodologies (Fan-Filter-Scale, Loop Engineering, GraphRAG), autonomous systems, and engineering guides.",
  },
};

export default function WikiPage() {
  const wikiItems = getPublicWikiRegistry();

  return (
    <main className="max-w-5xl mx-auto px-6 py-20 sm:py-32 flex flex-col gap-16 w-full">
      {/* Top Header / Breadcrumb Navigation */}
      <div className="flex items-center justify-between gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors !no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Headquarters</span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link 
            href="/petprojects" 
            className="text-muted-foreground hover:text-foreground transition-colors !no-underline flex items-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Pet-Projects Labs</span>
          </Link>
        </div>
      </div>

      {/* Hero / Header Section */}
      <section className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-[#F4F4F2] dark:bg-[#1C1C20] text-foreground">
            <BookOpen className="w-6 h-6 text-accent" />
          </div>
          <span className="text-sm font-mono uppercase tracking-widest text-muted-foreground">
            Public Knowledge Matrix
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter leading-[1.1]">
          Wiki & Methodologies
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl leading-relaxed font-light mt-1">
          A living, hyper-minimalist public index of core AI frameworks, autonomous systems architectures, engineering guides, and published research articles.
        </p>
      </section>

      {/* Main Interactive Hub */}
      <WikiHub initialItems={wikiItems} />
    </main>
  );
}
