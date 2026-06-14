import Link from "next/link";
import { getSortedArticles } from "@/lib/mdx";
import { ArrowUpRight, Cpu, Layers, Sparkles } from "lucide-react";

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

export default function Home() {
  const articles = getSortedArticles();

  return (
    <main className="max-w-4xl mx-auto px-6 py-20 sm:py-32 flex flex-col gap-24 w-full">
      {/* Hero Section */}
      <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[1.1]">
          Alim Khalelov
        </h1>
        <h2 className="text-2xl sm:text-4xl text-muted-foreground/50 font-medium mt-2">
          Architect of Autonomous Systems
        </h2>
        
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light mt-4">
          I am an AI-Native Product Manager and Game Designer. I build high-leverage products using the <Link href="/blog/fan-filter-scale-methodology" className="italic hover:text-accent underline decoration-muted-foreground/30 underline-offset-4 transition-colors">Fan-Filter-Scale</Link> methodology.
        </p>
      </section>

      {/* Lab Log / Blog Section */}
      <section className="flex flex-col gap-10">
        <div className="flex items-center justify-between border-b border-border pb-6">
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
        </div>
        
        <div className="flex flex-col gap-1">
          {articles.length > 0 ? (
            articles.map((article) => (
              <Link 
                href={`/blog/${article.slug}`} 
                key={article.slug}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 -mx-4 rounded-xl hover:bg-muted/50 transition-colors gap-2"
              >
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{article.description}</p>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <time className="text-sm font-mono shrink-0">
                    {formatDate(article.date)}
                  </time>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                </div>
              </Link>
            ))
          ) : (
            <div className="p-8 text-center text-muted-foreground bg-muted/10 rounded-xl border border-border border-dashed">
              No logs emitted yet. The Demiurge is currently building.
            </div>
          )}
        </div>
      </section>



      {/* Terminal Links */}
      <section className="flex flex-col gap-8 pt-8">
        <h2 className="text-lg font-medium text-muted-foreground uppercase tracking-wider text-center sm:text-left">Network</h2>
        <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
          <Link href="/petprojects" className="flex items-center gap-2 px-5 py-3 rounded-full border border-accent hover:border-accent text-accent bg-accent/10 hover:bg-accent/20 transition-all text-sm font-medium">
            Pet-Projects Labs
            <ArrowUpRight className="w-3 h-3" />
          </Link>
          <a href="#" className="flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-accent hover:text-accent bg-card hover:bg-accent/5 transition-all text-sm font-medium">
            Telegram
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="#" className="flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-accent hover:text-accent bg-card hover:bg-accent/5 transition-all text-sm font-medium">
            GitHub
            <ArrowUpRight className="w-3 h-3" />
          </a>
          <a href="#" className="flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-accent hover:text-accent bg-card hover:bg-accent/5 transition-all text-sm font-medium">
            LinkedIn
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </section>

    </main>
  );
}
