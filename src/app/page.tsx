import Link from "next/link";
import { getSortedArticles } from "@/lib/mdx";

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
    <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-16 w-full">
      {/* Header section */}
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold tracking-tight">Алимжан</h1>
        <p className="text-muted leading-relaxed max-w-xl text-lg">
          AI-Native Product Manager / Game Designer. Архитектор автономных систем на базе LLM. Демиург и вайбкодер.
        </p>
      </section>

      {/* Vibecoding Callout */}
      <section className="border border-border p-6 md:p-8 rounded-xl bg-card shadow-sm">
        <h2 className="text-sm text-muted mb-3 font-medium uppercase tracking-wider">Вайбкодинг</h2>
        <p className="text-base leading-relaxed">
          Создание программ без написания кода вручную. Ты описываешь что хочешь, агент (Claude Code, Cursor, Antigravity) пишет за тебя. Фокус на продукте и архитектуре, а не на синтаксисе.
        </p>
      </section>

      {/* Latest Blog Posts */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold tracking-tight">Последнее из блога</h2>
        <div className="flex flex-col gap-5">
          {articles.length > 0 ? (
            articles.map((article) => (
              <article key={article.slug} className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group">
                <time className="text-muted text-sm font-mono shrink-0 w-28">
                  {formatDate(article.date)}
                </time>
                <Link href={`/blog/${article.slug}`} className="text-lg font-medium group-hover:text-accent transition-colors">
                  {article.title}
                </Link>
              </article>
            ))
          ) : (
            <p className="text-muted">Пока нет статей.</p>
          )}
        </div>
      </section>

      {/* Links */}
      <section className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold tracking-tight">Ссылки</h2>
        <ul className="flex flex-col gap-4">
          <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-accent sm:w-5">•</span>
            <a href="#" className="hover:underline font-medium">Telegram</a>
            <span className="text-muted text-sm sm:ml-1">— мой канал про AI, вайбкодинг и стратегии</span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-accent sm:w-5">•</span>
            <a href="#" className="hover:underline font-medium">GitHub</a>
            <span className="text-muted text-sm sm:ml-1">— опенсорс и пет-проекты</span>
          </li>
          <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <span className="text-accent sm:w-5">•</span>
            <a href="#" className="hover:underline font-medium">LinkedIn</a>
            <span className="text-muted text-sm sm:ml-1">— профессиональный профиль PM</span>
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="pt-12 mt-12 border-t border-border/50 flex justify-between items-center text-xs text-muted">
        <p>© {new Date().getFullYear()} Alimzhan</p>
        <Link href="/admin/draft" className="hover:text-foreground transition-colors">
          Drafting Room ⚡
        </Link>
      </footer>
    </main>
  );
}
