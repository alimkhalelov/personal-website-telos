"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles, ChevronLeft, ChevronRight, Play, Compass, Clock } from "lucide-react";
import { getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "./generative-thumbnail";

interface FeaturedProjectsStripProps {
  className?: string;
}

export function FeaturedProjectsStrip({ className = "" }: FeaturedProjectsStripProps) {
  const projects = getAllProjects();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -380, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 380, behavior: "smooth" });
    }
  };

  return (
    <section className={`flex flex-col gap-6 w-full ${className}`}>
      {/* Section Header with Controls */}
      <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Showcase Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Projects & Agent Skills
          </h2>
        </div>

        {/* Scroll Navigation Arrows */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={scrollLeft}
            className="p-2 rounded-xl bg-[#F4F4F2] dark:bg-[#1C1C20] hover:bg-[#EAEAE7] dark:hover:bg-[#25252A] text-foreground transition-all border border-black/5 dark:border-white/5"
            title="Scroll Left"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={scrollRight}
            className="p-2 rounded-xl bg-[#F4F4F2] dark:bg-[#1C1C20] hover:bg-[#EAEAE7] dark:hover:bg-[#25252A] text-foreground transition-all border border-black/5 dark:border-white/5"
            title="Scroll Right"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sideways Scrolling Gallery Shelf */}
      <div className="relative w-full -mx-6 px-6 sm:-mx-12 sm:px-12">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
        >
          {projects.map((project) => (
            <div
              key={project.slug}
              className="flex-none w-[320px] sm:w-[380px] snap-start flex flex-col rounded-3xl overflow-hidden bg-[#F4F4F2] dark:bg-[#16161a] border border-border/70 hover:border-accent/60 transition-all duration-300 group shadow-sm hover:shadow-2xl justify-between"
            >
              {/* 1. Visible High-Contrast Thumbnail */}
              <div className="relative aspect-[16/10] w-full overflow-hidden p-3.5 pb-0">
                <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                  <GenerativeThumbnail
                    theme={project.generativeTheme}
                    command={project.command}
                    title={project.title}
                  />
                </Link>
              </div>

              {/* 2. Card Metadata: Elapsed Time ("как давно"), Title, TL;DR */}
              <div className="p-6 flex flex-col justify-between flex-1 gap-5">
                <div className="flex flex-col gap-3">
                  {/* Date & Elapsed Time Row */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5 text-accent font-bold bg-accent/10 px-2.5 py-1 rounded-full border border-accent/20">
                      <Clock className="w-3 h-3" />
                      <span>{project.timeAgo}</span>
                    </div>
                    <time className="text-muted-foreground font-medium">
                      {project.dateDisplay}
                    </time>
                  </div>

                  {/* Project Title */}
                  <Link 
                    href={`/projects/${project.slug}`} 
                    className="!no-underline group-hover:text-accent transition-colors"
                  >
                    <h3 className="text-2xl font-black tracking-tight text-foreground leading-snug line-clamp-1">
                      {project.title}
                    </h3>
                  </Link>

                  {/* TL;DR Summary */}
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-light">
                    {project.tldr}
                  </p>
                </div>

                {/* 3. Action Triggers & Badges */}
                <div className="flex flex-col gap-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.badges.slice(0, 2).map((badge) => (
                      <span
                        key={badge}
                        className="text-[11px] px-2.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-muted-foreground font-mono"
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
                      <span>Spec & 16:9 Canvas</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    <Link
                      href={project.demoUrl}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity text-xs font-mono font-semibold !no-underline shadow-sm"
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
