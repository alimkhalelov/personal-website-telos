import Link from "next/link";
import { getSortedArticles } from "@/lib/mdx";
import { ArrowUpRight } from "lucide-react";
import { FeaturedProjectsStrip } from "@/components/projects/featured-projects-strip";
import { OneUiWallpaper } from "@/components/one-ui-wallpaper";

const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
};

export default function Home() {
  const articles = getSortedArticles();

  return (
    <>
      <OneUiWallpaper />
      <main className="max-w-4xl mx-auto px-6 py-20 sm:py-32 flex flex-col gap-24 w-full relative z-10">
        {/* Hero Section */}
        <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter leading-[1.15]">
              Alim Khalelov <span className="text-muted-foreground/60 font-light text-2xl sm:text-4xl block sm:inline">| AI-Native Product Manager</span>
            </h1>

            {/* Contacts Row */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs sm:text-sm text-muted-foreground font-mono">
              <a
                href="mailto:alim.khalelov@gmail.com"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline !no-underline text-foreground/80"
              >
                alim.khalelov@gmail.com
              </a>
              <span className="text-muted-foreground/40">·</span>
              <a
                href="tel:+77053508033"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline !no-underline text-foreground/80"
              >
                +7 705 350 80 33
              </a>
              <span className="text-muted-foreground/40">·</span>
              <a
                href="https://t.me/AlimLLC"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline !no-underline text-foreground/80"
              >
                Telegram: @AlimLLC
              </a>
              <span className="text-muted-foreground/40">·</span>
              <a
                href="https://linkedin.com/in/alimzhan-khalelov"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline !no-underline text-foreground/80"
              >
                linkedin.com/in/alimzhan-khalelov
              </a>
            </div>
          </div>

          {/* Summary Section */}
          <div className="flex flex-col gap-2 pt-4 border-t border-border/50">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/80 font-mono">
              Summary
            </h2>
            <p className="text-base sm:text-lg text-foreground/90 max-w-3xl leading-relaxed font-light">
              Product Manager with 5+ years shipping 0-to-1 products at AI and Web3 startups. I build multi-agent systems, design validation pipelines for LLM outputs, and run rapid prototyping cycles to find product-market fit before scaling.
            </p>
          </div>
        </section>

        {/* Featured Showcase & Agent Skills Horizontal Strip */}
        <FeaturedProjectsStrip />

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
                      className="text-base w-[105px] shrink-0 group-hover:underline text-muted-foreground"
                      style={{ fontFamily: "'Google Sans', sans-serif" }}
                    >
                      {formatDate(article.date)}
                    </time>
                    <h3
                      className="text-base font-medium group-hover:underline transition-colors text-foreground"
                      style={{ fontFamily: "'Google Sans', sans-serif" }}
                    >
                      {article.title}
                    </h3>
                  </div>
                  <div className="flex items-center shrink-0">
                    <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-muted-foreground" />
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
          <h2 className="text-lg font-medium text-muted-foreground uppercase tracking-wider text-center sm:text-left">
            Network & Index
          </h2>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
            <Link
              href="/wiki"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-accent hover:text-accent bg-card hover:bg-accent/5 transition-all text-sm font-medium !no-underline text-foreground"
            >
              Knowledge Wiki
              <ArrowUpRight className="w-3 h-3" />
            </Link>
            <a
              href="https://t.me/AlimLLC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-accent hover:text-accent bg-card hover:bg-accent/5 transition-all text-sm font-medium !no-underline text-foreground"
            >
              Telegram
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/alimzhankhalelov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-accent hover:text-accent bg-card hover:bg-accent/5 transition-all text-sm font-medium !no-underline text-foreground"
            >
              GitHub
              <ArrowUpRight className="w-3 h-3" />
            </a>
            <a
              href="https://linkedin.com/in/alimzhan-khalelov"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-border hover:border-accent hover:text-accent bg-card hover:bg-accent/5 transition-all text-sm font-medium !no-underline text-foreground"
            >
              LinkedIn
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </section>
      </main>
    </>
  );
}
