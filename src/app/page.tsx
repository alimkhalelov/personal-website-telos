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
    <main className="max-w-4xl mx-auto px-6 py-20 sm:py-32 flex flex-col gap-24 w-full relative">
      {/* Top Header / Hamster Area */}
      <header className="absolute top-8 right-6 sm:top-12 sm:right-12 z-50">
        <div className="relative group flex items-center gap-4">
          <Link href="/petprojects" className="text-lg font-medium !text-white/50 hover:!text-white transition-colors !no-underline">
            Pet-Projects Labs
          </Link>
        </div>
      </header>

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
                className="group flex items-center justify-between p-4 -mx-4 rounded-xl hover:bg-muted/50 transition-colors gap-4 !no-underline text-blue-600 visited:text-purple-600"
              >
                <div className="flex items-center gap-4">
                  <time 
                    className="text-base w-[105px] shrink-0 group-hover:underline"
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                  >
                    {formatDate(article.date)}
                  </time>
                  <h3 
                    className="text-base font-medium group-hover:underline transition-colors"
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                  >
                    {article.title}
                  </h3>
                </div>
                <div className="flex items-center shrink-0">
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
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
