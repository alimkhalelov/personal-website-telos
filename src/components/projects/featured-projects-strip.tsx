"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, ChevronRight, Play, Compass, Layers } from "lucide-react";
import { getAllProjects, ProjectDetail } from "@/lib/projects-data";
import { GenerativeThumbnail } from "./generative-thumbnail";

interface FeaturedProjectsStripProps {
  className?: string;
}

export function FeaturedProjectsStrip({ className = "" }: FeaturedProjectsStripProps) {
  const projects = getAllProjects();

  return (
    <section className={`flex flex-col gap-8 w-full ${className}`}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase & Autonomous Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Featured Projects & Skills
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl font-light">
            Engineered agent tools, 16:9 visual architecture engines, and generative media databases.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
            Scroll horizontally →
          </span>
          <Link
            href="/wiki"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:underline !no-underline"
          >
            Open Wiki Hub
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Horizontal Drifting Showcase Strip */}
      <div className="relative w-full -mx-6 px-6 sm:-mx-8 sm:px-8">
        <div className="flex gap-6 overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex-none w-[310px] sm:w-[360px] snap-start flex flex-col rounded-3xl overflow-hidden bg-[#F4F4F2] dark:bg-[#16161a] border border-border/80 hover:border-accent/60 transition-all duration-300 group shadow-sm hover:shadow-2xl flex-between"
            >
              {/* Top Generative Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden p-3 pb-0">
                <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                  <GenerativeThumbnail
                    theme={project.generativeTheme}
                    command={project.command}
                    title={project.title}
                  />
                </Link>
              </div>

              {/* Card Metadata & Body */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-5">
                <div className="flex flex-col gap-3">
                  {/* Initiation Date & Tag */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-black/5 dark:bg-white/5 text-foreground font-semibold">
                      {project.tag}
                    </span>
                    <time className="text-muted-foreground font-medium">
                      INIT: {project.dateDisplay}
                    </time>
                  </div>

                  {/* Project Title */}
                  <Link href={`/projects/${project.slug}`} className="!no-underline group-hover:text-accent transition-colors">
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground line-clamp-1">
                      {project.title}
                    </h3>
                  </Link>

                  {/* TL;DR Summary */}
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-light">
                    {project.tldr}
                  </p>
                </div>

                {/* Badges and Action Links */}
                <div className="flex flex-col gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.badges.slice(0, 2).map((badge) => (
                      <span
                        key={badge}
                        className="text-[11px] px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 text-muted-foreground font-mono"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-foreground hover:text-accent transition-colors !no-underline"
                    >
                      <span>Spec & Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
