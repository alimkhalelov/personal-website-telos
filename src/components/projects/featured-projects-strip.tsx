"use client";

import Link from "next/link";
import { getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "./generative-thumbnail";

interface FeaturedProjectsStripProps {
  className?: string;
}

export function FeaturedProjectsStrip({ className = "" }: FeaturedProjectsStripProps) {
  const projects = getAllProjects();
  // Duplicate for seamless infinite marquee loop
  const marqueeProjects = [...projects, ...projects, ...projects];

  return (
    <section className={`flex flex-col gap-8 w-full ${className}`}>
      {/* Section Header matching Posts section minimalism */}
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
      <div className="w-screen relative left-1/2 -translate-x-1/2 overflow-hidden py-1">
        <div className="animate-marquee flex gap-6 px-6">
          {marqueeProjects.map((project, idx) => (
            <Link
              key={`${project.slug}-${idx}`}
              href={`/projects/${project.slug}`}
              className="group flex-none w-[300px] sm:w-[360px] flex flex-col gap-3 !no-underline select-none"
            >
              {/* 1. Crisp Generative / Art Thumbnail */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border/80 group-hover:border-border transition-colors bg-card shadow-sm">
                <GenerativeThumbnail
                  theme={project.generativeTheme}
                  command={project.command}
                  title={project.title}
                />
              </div>

              {/* 2. Intentional Minimalist Typography */}
              <div className="flex flex-col gap-1 px-1">
                {/* Date & Time Ago */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    {project.dateDisplay}
                  </time>
                  <span>·</span>
                  <span className="text-xs font-mono opacity-80">
                    {project.timeAgo}
                  </span>
                </div>

                {/* Project Title */}
                <h3 
                  className="text-base sm:text-lg font-medium text-foreground group-hover:underline transition-colors line-clamp-1"
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
