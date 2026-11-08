"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { ProjectDetail } from "@/lib/projects-data";
import { GenerativeThumbnail } from "@/components/projects/generative-thumbnail";
import { AppStoreProjectCard } from "@/components/projects/app-store-project-card";
import { useAuth } from "@/components/auth-context";

interface ProjectsFeedProps {
  initialProjects: ProjectDetail[];
}

export function ProjectsFeed({ initialProjects }: ProjectsFeedProps) {
  const { isAdmin } = useAuth();

  // Non-admins see only public projects; Admins see all, but private items are dimmed
  const visibleProjects = React.useMemo(() => {
    if (isAdmin) return initialProjects;
    return initialProjects.filter((p) => p.isPublic !== false);
  }, [initialProjects, isAdmin]);

  return (
    <div className="flex flex-col gap-10 w-full">
      {/* Admin Status Pill */}
      {isAdmin && (
        <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-xs text-white/80">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">Admin Inspection Mode</span>
            <span className="text-white/40">·</span>
            <span className="text-white/60">
              1 Public project · {initialProjects.length - 1} Private drafts (semi-transparent)
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            alimzhan.khalelov@gmail.com
          </span>
        </div>
      )}

      {/* Projects List */}
      <section className="flex flex-col divide-y divide-border">
        {visibleProjects.map((project) => {
          const isPrivate = project.isPublic === false;

          // If the project specifies App Store Layout (Tempo, Ocus, Ocus Portal)
          if (project.appStoreLayout) {
            return (
              <div key={project.slug} className="py-8 first:pt-0 last:pb-0 !border-t-0">
                <AppStoreProjectCard
                  slug={project.slug}
                  title={project.title}
                  subtitle={project.subtitle || project.headline}
                  iconSrc={project.iconSrc || "/projects/tempo/icon.svg"}
                  demoUrl={project.demoUrl}
                  isPublic={project.isPublic !== false}
                  aspectRatio={project.aspectRatio || "9/16"}
                  screenshots={project.screenshots || [
                    "/projects/tempo/01-tempo-brand-hero.png",
                    "/projects/tempo/02-crush-fatigue.png",
                    "/projects/tempo/03-surge-past-equator.png",
                    "/projects/tempo/04-lock-in-your-zone.png",
                    "/projects/tempo/05-rig-any-treadmill.png",
                  ]}
                />
              </div>
            );
          }

          // Standard Showcase Project layout for other projects
          return (
            <article 
              key={project.slug}
              className={`py-12 first:pt-0 last:pb-0 flex flex-col gap-5 group transition-all duration-300 ${
                isPrivate
                  ? "opacity-40 hover:opacity-85 border-dashed"
                  : ""
              }`}
            >
              {/* Private indicator for admin */}
              {isPrivate && (
                <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Private Draft</span>
                </div>
              )}

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
                <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-3 py-0.5 rounded-full border border-accent/20">
                  {project.command}
                </span>
              </div>

              {/* Visual Thumbnail */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 group-hover:border-border transition-colors bg-card shadow-sm">
                <Link href={`/projects/${project.slug}`} className="block w-full h-full">
                  <GenerativeThumbnail
                    theme={project.generativeTheme}
                    command={project.command}
                    title={project.title}
                    thumbnailSrc={project.thumbnailSrc}
                  />
                </Link>
              </div>

              {/* Title & Subtitle */}
              <div className="flex flex-col gap-1.5 pt-1">
                <Link 
                  href={`/projects/${project.slug}`} 
                  className="!no-underline group-hover:text-accent transition-colors"
                >
                  <h2 
                    className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground group-hover:underline"
                    style={{ fontFamily: "'Google Sans', sans-serif" }}
                  >
                    {project.title}
                  </h2>
                </Link>
                <p className="text-xl text-muted-foreground font-light leading-relaxed">
                  {project.headline}
                </p>
              </div>

              {/* TL;DR Narrative */}
              <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed font-light">
                {project.tldr}
              </p>

              {/* Badges & Direct Clean Action Link */}
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

                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-base font-medium text-accent hover:underline !no-underline"
                  style={{ fontFamily: "'Google Sans', sans-serif" }}
                >
                  <span>Read Project Article</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
