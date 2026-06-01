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
        <div className="flex items-center gap-3 text-accent text-sm font-mono uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          System Active
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter leading-[1.1]">
          Alimzhan
          <br />
          <span className="text-muted-foreground/50">Architect of Autonomous Systems</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl leading-relaxed font-light mt-4">
          I am a <strong className="text-foreground font-medium">Demiurge</strong>, AI-Native Product Manager, and Game Designer. I build high-leverage products using the <span className="italic">Fan-Filter-Scale</span> methodology.
        </p>
      </section>

      {/* Philosophy Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 hover:border-accent/30 transition-colors flex flex-col gap-4 group">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg tracking-tight">The Spark</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Starting with 100% creativity and hyperfocus. Products must be built for fun to protect attention and prevent burnout.
          </p>
        </div>
        
        <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 hover:border-accent/30 transition-colors flex flex-col gap-4 group">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg tracking-tight">The Filter</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ruthless pragmatism. Analyzing ROI, identifying the market bottleneck, and utilizing orphaned infrastructure.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-accent/5 border border-accent/10 hover:border-accent/30 transition-colors flex flex-col gap-4 group">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="font-semibold text-lg tracking-tight">The Scale</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Automating the solution via AI agents (SAE Levels 3-5). The system sells and services itself, preserving my autonomy.
          </p>
        </div>
      </section>

      {/* Lab Log / Blog Section */}
      <section className="flex flex-col gap-10">
        <div className="flex items-center justify-between border-b border-border pb-6">
          <h2 className="text-3xl font-bold tracking-tight">System Logs</h2>
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest bg-muted/30 px-3 py-1 rounded-full">Output</span>
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
