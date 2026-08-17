"use client";

import Link from "next/link";
import { getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "./generative-thumbnail";

interface FeaturedProjectsStripProps {
  className?: string;
}

export function FeaturedProjectsStrip({ className = "" }: FeaturedProjectsStripProps) {
  const projects = getAllProjects();

  return (
    <section className={`flex flex-col gap-8 w-full ${className}`}>
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <Link
          href="/projects"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors !no-underline"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          View all →
        </Link>
      </div>

      {/* Full-width edge-to-edge infinite horizontal marquee */}
      <div className="relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] overflow-hidden py-1">
        <div className="animate-marquee flex gap-6 px-3">
          {/* Set A */}
          {projects.map((project) => (
            <Link
              key={`a-${project.slug}`}
              href={`/projects/${project.slug}`}
              className="group flex-none w-[300px] sm:w-[360px] flex flex-col gap-3 !no-underline select-none"
            >
              {/* 1. 16:9 YouTube-Style Thumbnail */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 group-hover:border-border transition-colors bg-card shadow-sm">
                <GenerativeThumbnail
                  theme={project.generativeTheme}
                  command={project.command}
                  title={project.title}
                />
              </div>

              {/* 2. Typography */}
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    {project.dateDisplay}
                  </time>
                  <span>·</span>
                  <span className="text-xs font-mono opacity-80">
                    {project.timeAgo}
                  </span>
                </div>
                <h3 
                  className="text-lg font-bold text-foreground group-hover:text-accent transition-colors"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}

          {/* Set B (Identical clone for seamless 0px jump loop) */}
          {projects.map((project) => (
            <Link
              key={`b-${project.slug}`}
              href={`/projects/${project.slug}`}
              className="group flex-none w-[300px] sm:w-[360px] flex flex-col gap-3 !no-underline select-none"
              aria-hidden="true"
              tabIndex={-1}
            >
              {/* 1. 16:9 YouTube-Style Thumbnail */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 group-hover:border-border transition-colors bg-card shadow-sm">
                <GenerativeThumbnail
                  theme={project.generativeTheme}
                  command={project.command}
                  title={project.title}
                />
              </div>

              {/* 2. Typography */}
              <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    {project.dateDisplay}
                  </time>
                  <span>·</span>
                  <span className="text-xs font-mono opacity-80">
                    {project.timeAgo}
                  </span>
                </div>
                <h3 
                  className="text-lg font-bold text-foreground group-hover:text-accent transition-colors"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  {project.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
