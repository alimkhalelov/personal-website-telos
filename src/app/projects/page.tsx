import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Play, Sparkles } from "lucide-react";
import { getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "@/components/projects/generative-thumbnail";

export const metadata: Metadata = {
  title: "Projects & Skills | Alimzhan",
  description: "Autonomous agent skills, 16:9 vector architecture engines, and generative style databases.",
};

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-16 w-full">
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors !no-underline"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          href="/wiki"
          className="text-sm text-muted-foreground hover:text-accent transition-colors !no-underline"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          Wiki Hub →
        </Link>
      </div>

      {/* Page Title */}
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          Projects & Skills
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
          Engineered agent tools, 16:9 vector architecture engines, and generative design matrices.
        </p>
      </section>

      {/* Single-Column Editorial Feed (Intentional Functional Minimalism) */}
      <section className="flex flex-col divide-y divide-border">
        {projects.map((project) => (
          <article 
            key={project.slug}
            className="py-14 first:pt-0 last:pb-0 flex flex-col gap-6 group"
          >
            {/* Meta Row: Date, Time Ago, Command */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <time style={{ fontFamily: "'Google Sans', sans-serif" }}>
                  {project.dateDisplay}
                </time>
                <span>·</span>
                <span className="text-xs font-mono opacity-80">
                  {project.timeAgo}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-2.5 py-0.5 rounded-full border border-accent/20">
                {project.command}
              </span>
            </div>

            {/* Title & Subtitle */}
            <div className="flex flex-col gap-1.5">
              <Link 
                href={`/projects/${project.slug}`} 
                className="!no-underline group-hover:text-accent transition-colors"
              >
                <h2 
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:underline"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  {project.title}
                </h2>
              </Link>
              <p className="text-base text-muted-foreground font-light">
                {project.headline}
              </p>
            </div>

            {/* Visual Thumbnail */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border/80 group-hover:border-border transition-colors bg-card shadow-sm">
              <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                <GenerativeThumbnail
                  theme={project.generativeTheme}
                  command={project.command}
                  title={project.title}
                />
              </Link>
            </div>

            {/* TL;DR Narrative */}
            <p className="text-base text-foreground/90 leading-relaxed font-light">
              {project.tldr}
            </p>

            {/* Badges & Direct Clean Action Links */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap gap-2">
                {project.badges.slice(0, 3).map((badge) => (
                  <span
                    key={badge}
                    className="text-xs px-2.5 py-1 rounded-md bg-muted/30 text-muted-foreground font-mono"
                  >
                    {badge}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-5 shrink-0">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-accent transition-colors !no-underline"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  <span>Spec & 16:9 Canvas</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>

                <Link
                  href={project.demoUrl}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline !no-underline"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Demo</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
