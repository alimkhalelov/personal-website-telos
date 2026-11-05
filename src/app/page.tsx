import Link from "next/link";
import { getSortedArticles } from "@/lib/mdx";
import { ArrowUpRight, Mail, Send, Phone } from "lucide-react";
import { FeaturedProjectsStrip } from "@/components/projects/featured-projects-strip";
import { OneUiWallpaper } from "@/components/one-ui-wallpaper";

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

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
      <main className="max-w-4xl mx-auto px-6 py-20 sm:py-32 flex flex-col gap-20 sm:gap-24 w-full relative z-10">
        {/* Minimalist Hero Section */}
        <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground">
              Alim Khalelov
            </h1>
            <p className="text-xl sm:text-2xl text-muted-foreground font-light tracking-tight">
              AI-Native Product Manager
            </p>
          </div>

          {/* Minimalist Contact Icon Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <a
              href="mailto:alim.khalelov@gmail.com"
              title="alim.khalelov@gmail.com"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/70 hover:border-foreground/40 bg-card/70 hover:bg-card text-xs font-mono text-foreground/80 hover:text-foreground transition-all shadow-xs !no-underline"
            >
              <Mail className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Email</span>
            </a>

            <a
              href="https://t.me/AlimLLC"
              target="_blank"
              rel="noopener noreferrer"
              title="@AlimLLC"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/70 hover:border-foreground/40 bg-card/70 hover:bg-card text-xs font-mono text-foreground/80 hover:text-foreground transition-all shadow-xs !no-underline"
            >
              <Send className="w-3.5 h-3.5 text-blue-500" />
              <span>Telegram</span>
            </a>

            <a
              href="https://linkedin.com/in/alimzhan-khalelov"
              target="_blank"
              rel="noopener noreferrer"
              title="linkedin.com/in/alimzhan-khalelov"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/70 hover:border-foreground/40 bg-card/70 hover:bg-card text-xs font-mono text-foreground/80 hover:text-foreground transition-all shadow-xs !no-underline"
            >
              <LinkedinIcon className="w-3.5 h-3.5 text-blue-600" />
              <span>LinkedIn</span>
            </a>

            <a
              href="tel:+77053508033"
              title="+7 705 350 80 33"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-border/70 hover:border-foreground/40 bg-card/70 hover:bg-card text-xs font-mono text-foreground/80 hover:text-foreground transition-all shadow-xs !no-underline"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              <span>+7 705 350 80 33</span>
            </a>
          </div>

          {/* Crisp, Non-Repetitive Summary Bio */}
          <p className="text-base sm:text-lg text-foreground/85 max-w-2xl leading-relaxed font-light pt-2">
            5+ years shipping 0-to-1 products across AI & Web3. Building multi-agent systems, LLM evaluation pipelines, and rapid prototyping cycles to validate product-market fit before scaling.
          </p>
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
                  className="group flex items-center justify-between p-4 -mx-4 rounded-xl hover:bg-muted/50 transition-colors gap-4 !no-underline"
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
