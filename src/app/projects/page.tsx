import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, ArrowUpRight, Play, BookOpen } from "lucide-react";
import { getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "@/components/projects/generative-thumbnail";

export const metadata: Metadata = {
  title: "Showcase Projects & Skills | Alimzhan",
  description: "Explore autonomous agent skills, 16:9 vector architecture engines, and generative style databases.",
};

export default function ProjectsIndexPage() {
  const projects = getAllProjects();

  return (
    <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-16 w-full">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors !no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Headquarters</span>
        </Link>
        <Link
          href="/wiki"
          className="text-sm font-mono text-muted-foreground hover:text-accent transition-colors !no-underline flex items-center gap-1"
        >
          <BookOpen className="w-4 h-4" />
          <span>Public Wiki</span>
        </Link>
      </div>

      {/* Hero */}
      <section className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest font-semibold">
          <Sparkles className="w-4 h-4" />
          <span>Autonomous Systems & Creative Intelligence</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground">
          Showcase Projects & Skills
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl font-light leading-relaxed">
          Interactive tools, 16:9 vector architectural diagrams, and curated generative design matrices.
        </p>
      </section>

      {/* Grid of Projects */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <div
            key={project.slug}
            className="flex flex-col rounded-3xl overflow-hidden bg-[#F4F4F2] dark:bg-[#16161a] border border-black/5 dark:border-white/5 hover:border-accent/50 transition-all duration-300 group shadow-sm hover:shadow-2xl"
          >
            <div className="relative aspect-[16/10] w-full p-4 pb-0">
              <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                <GenerativeThumbnail
                  theme={project.generativeTheme}
                  command={project.command}
                  title={project.title}
                />
              </Link>
            </div>

            <div className="p-6 flex flex-col justify-between flex-1 gap-5">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-foreground font-semibold">
                    {project.tag}
                  </span>
                  <span className="text-muted-foreground">INIT: {project.dateDisplay}</span>
                </div>

                <Link href={`/projects/${project.slug}`} className="!no-underline group-hover:text-accent transition-colors">
                  <h3 className="text-2xl font-bold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                </Link>

                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {project.tldr}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-black/5 dark:border-white/5">
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-foreground hover:text-accent transition-colors !no-underline"
                >
                  <span>Spec & Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href={project.demoUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity text-xs font-mono font-semibold !no-underline shadow-sm"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Demo</span>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
