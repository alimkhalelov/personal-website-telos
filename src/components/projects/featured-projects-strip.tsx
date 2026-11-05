"use client";

import * as React from "react";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "./generative-thumbnail";
import { AppStoreProjectCard } from "./app-store-project-card";
import { useAuth } from "@/components/auth-context";
import { ShieldCheck } from "lucide-react";

interface FeaturedProjectsStripProps {
  className?: string;
}

export function FeaturedProjectsStrip({ className = "" }: FeaturedProjectsStripProps) {
  const projects = getAllProjects();
  const { isAdmin } = useAuth();

  const tempoProject = projects.find((p) => p.slug === "tempo");
  const privateProjects = projects.filter((p) => p.slug !== "tempo");

  return (
    <section id="projects" className={`flex flex-col gap-6 w-full ${className}`}>
      {/* Section Header (Duplicate Projects title removed on desktop; View all link aligned to right) */}
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-2xl font-bold tracking-tight text-white lg:hidden">Projects</h2>
        <div className="ml-auto">
          <Link
            href="/projects"
            className="text-sm font-medium text-white/60 hover:text-white transition-colors !no-underline"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            View all →
          </Link>
        </div>
      </div>

      {/* Featured Public App: Tempo in App Store Layout */}
      {tempoProject && (
        <AppStoreProjectCard
          title={tempoProject.title}
          subtitle={tempoProject.subtitle || tempoProject.headline}
          iconSrc={tempoProject.iconSrc || "/projects/tempo/icon.svg"}
          demoUrl={tempoProject.demoUrl}
          isPublic={true}
          screenshots={[
            "/projects/tempo/01-tempo-brand-hero.png",
            "/projects/tempo/02-crush-fatigue.png",
            "/projects/tempo/03-surge-past-equator.png",
            "/projects/tempo/04-lock-in-your-zone.png",
            "/projects/tempo/05-rig-any-treadmill.png",
          ]}
        />
      )}

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
