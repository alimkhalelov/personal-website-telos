"use client";

import * as React from "react";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "./generative-thumbnail";
import { AppStoreProjectCard } from "./app-store-project-card";
import { useAuth } from "@/components/auth-context";
import { ShieldCheck } from "lucide-react";
import { DockingHeader } from "@/components/home/docking-header";

interface FeaturedProjectsStripProps {
  className?: string;
}

export function FeaturedProjectsStrip({ className = "" }: FeaturedProjectsStripProps) {
  const projects = getAllProjects();
  const { isAdmin } = useAuth();

  const featuredAppProjects = projects.filter((p) => p.isPublic && p.appStoreLayout);
  const privateProjects = projects.filter((p) => !p.appStoreLayout || p.isPublic === false);

  return (
    <section id="projects" className={`flex flex-col gap-8 w-full ${className}`}>
      {/* Dynamic Docking Section Header: In-flow above cards, glides left on scroll into left rail */}
      <DockingHeader
        sectionId="projects"
        title="Projects"
        rightAction={
          <Link
            href="/projects"
            className="text-sm font-medium text-white/60 hover:text-white transition-colors !no-underline"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            View all →
          </Link>
        }
      />

      {/* Featured Public Apps: Tempo & Ocus in App Store Layout (Clean, No Dividers) */}
      <div className="flex flex-col gap-14 sm:gap-16">
        {featuredAppProjects.map((proj) => (
          <div key={proj.slug}>
            <AppStoreProjectCard
              slug={proj.slug}
              title={proj.title}
              subtitle={proj.subtitle || proj.headline}
              iconSrc={proj.iconSrc || "/projects/tempo/icon.svg"}
              demoUrl={proj.demoUrl}
              isPublic={true}
              aspectRatio={proj.aspectRatio || "9/16"}
              screenshots={proj.screenshots || []}
            />
          </div>
        ))}
      </div>

      {/* Admin Marquee: 11 Private Projects Visible Semi-Transparently */}
      {isAdmin && (
        <div className="flex flex-col gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-amber-300 font-mono">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Admin Private Drafts ({privateProjects.length} archived/unreleased — semi-transparent)</span>
          </div>

          <div className="relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] w-screen max-w-[100vw] overflow-hidden py-1 opacity-40 hover:opacity-85 transition-opacity">
            <div className="animate-marquee flex gap-6 px-3">
              {/* Set A */}
              {privateProjects.map((project) => (
                <Link
                  key={`a-${project.slug}`}
                  href={`/projects/${project.slug}`}
                  className="group flex-none w-[280px] sm:w-[320px] flex flex-col gap-2.5 !no-underline select-none"
                >
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-amber-500/30 group-hover:border-amber-400 transition-colors bg-card shadow-sm">
                    <GenerativeThumbnail
                      theme={project.generativeTheme}
                      command={project.command}
                      title={project.title}
                      thumbnailSrc={project.thumbnailSrc}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 px-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono text-amber-400">[Private]</span>
                      <span>{project.dateDisplay}</span>
                      <span>·</span>
                      <span className="font-mono">{project.command}</span>
                    </div>
                    <h3 
                      className="text-base font-bold text-foreground group-hover:text-accent transition-colors truncate"
                      style={{ fontFamily: "'Google Sans', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}

              {/* Set B clone */}
              {privateProjects.map((project) => (
                <Link
                  key={`b-${project.slug}`}
                  href={`/projects/${project.slug}`}
                  className="group flex-none w-[280px] sm:w-[320px] flex flex-col gap-2.5 !no-underline select-none"
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-amber-500/30 group-hover:border-amber-400 transition-colors bg-card shadow-sm">
                    <GenerativeThumbnail
                      theme={project.generativeTheme}
                      command={project.command}
                      title={project.title}
                      thumbnailSrc={project.thumbnailSrc}
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 px-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-mono text-amber-400">[Private]</span>
                      <span>{project.dateDisplay}</span>
                      <span>·</span>
                      <span className="font-mono">{project.command}</span>
                    </div>
                    <h3 
                      className="text-base font-bold text-foreground group-hover:text-accent transition-colors truncate"
                      style={{ fontFamily: "'Google Sans', sans-serif" }}
                    >
                      {project.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
