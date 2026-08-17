import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  CheckCircle2, 
  Play, 
  BookOpen
} from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "@/components/projects/generative-thumbnail";
import { SkillVisualizerCanvas } from "@/components/projects/skill-visualizer-canvas";
import { PresentationDemo } from "@/components/projects/presentation-demo";
import { StyleRefGalleryView } from "@/app/projects/styleref/gallery-view";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} | Alimzhan`,
    description: project.tldr,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-16 w-full">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors !no-underline"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex items-center gap-5 text-sm">
          <Link
            href="/wiki"
            className="text-muted-foreground hover:text-accent transition-colors !no-underline"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            Wiki Hub →
          </Link>
          {project.demoUrl && project.slug !== "presentation" && project.slug !== "styleref" && (
            <Link
              href={project.demoUrl}
              className="font-semibold text-accent hover:underline !no-underline"
              style={{ fontFamily: "'Google Sans', sans-serif" }}
            >
              {project.demoLabel} ↗
            </Link>
          )}
        </div>
      </div>

      {/* Hero Header (Intentional Functional Minimalism) */}
      <section className="flex flex-col gap-6">
        {/* Date, Time Ago, Command */}
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

        {/* Main Title & Headline */}
        <div className="flex flex-col gap-2">
          <h1 
            className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
            {project.headline}
          </p>
        </div>

        {/* Visual Banner */}
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border/80 bg-card shadow-sm">
          <GenerativeThumbnail
            theme={project.generativeTheme}
            command={project.command}
            title={project.title}
          />
        </div>

        {/* TL;DR Narrative Block */}
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/60 flex flex-col gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
            TL;DR & Value Proposition
          </span>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-light">
            {project.tldr}
          </p>
        </div>
      </section>

      {/* Embedded Live Demos (If Applicable) */}
      {project.slug === "presentation" && (
        <section id="demo" className="flex flex-col gap-6 pt-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Interactive Deck Demo
            </h2>
            <span className="text-xs font-mono text-muted-foreground">Keys: [←] [→] [S] [F]</span>
          </div>
          <PresentationDemo />
        </section>
      )}

      {project.slug === "styleref" && (
        <section id="demo" className="flex flex-col gap-6 pt-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Visual Styles Gallery
            </h2>
            <span className="text-xs font-mono text-muted-foreground">19 Curated Styles</span>
          </div>
          <StyleRefGalleryView />
        </section>
      )}

      {/* 16:9 Skill Visualizer Vector Architecture */}
      <section className="flex flex-col gap-6 pt-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            16:9 Vector Architecture Map
          </h2>
          <span className="text-xs font-mono text-muted-foreground">1600x900 Canvas</span>
        </div>

        <SkillVisualizerCanvas
          heroTitle={project.visualizer.heroTitle}
          subNamespace={project.visualizer.subNamespace}
          nodes={project.visualizer.nodes}
        />
      </section>

      {/* Spec-Driven Development (SDD) Architectural Invariants */}
      <section className="flex flex-col gap-6 pt-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Spec (SDD) Architecture
          </h2>
          <span className="text-xs font-mono text-muted-foreground">Invariants & Core Engine</span>
        </div>

        <div className="flex flex-col gap-8 text-sm">
          {/* Inputs & Outputs Contract */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Inputs & Outputs Contract
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-muted/20 border border-border/60 flex flex-col gap-2">
                <span className="text-xs font-mono font-bold uppercase text-accent">Inputs:</span>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs leading-relaxed">
                  {project.specSDD.inputs.map((inp, i) => (
                    <li key={i}>{inp}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-muted/20 border border-border/60 flex flex-col gap-2">
                <span className="text-xs font-mono font-bold uppercase text-accent">Outputs:</span>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs leading-relaxed">
                  {project.specSDD.outputs.map((out, i) => (
                    <li key={i}>{out}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* System Invariants */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              System Invariants & Boundary Rules
            </h3>
            <ul className="space-y-2 text-foreground/90 leading-relaxed font-light">
              {project.specSDD.invariants.map((inv, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-accent font-bold mt-0.5">•</span>
                  <span>{inv}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Core Engine & State Machine */}
          <div className="flex flex-col gap-3">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Core Engine & State Machine
            </h3>
            <p className="text-muted-foreground leading-relaxed font-light">
              {project.specSDD.coreEngine}
            </p>
            <div className="p-3.5 rounded-xl bg-card border border-border/70 text-xs font-mono text-accent overflow-x-auto">
              <code>{project.specSDD.stateMachine.join(" \n")}</code>
            </div>
          </div>
        </div>
      </section>

      {/* Build & Test (TDD) Checklists */}
      <section className="flex flex-col gap-8 pt-4">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Build & Test Plan
          </h2>
          <span className="text-xs font-mono text-muted-foreground">TDD Verification</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Build Phases */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Build Checklist
            </h3>
            <div className="flex flex-col gap-4">
              {project.buildChecklist.map((phase, pIdx) => (
                <div key={pIdx} className="flex flex-col gap-2">
                  <h4 className="text-xs font-mono uppercase text-accent font-bold">
                    {phase.phase}
                  </h4>
                  <div className="flex flex-col gap-1.5">
                    {phase.tasks.map((task, tIdx) => (
                      <div key={tIdx} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{task.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Suites */}
          <div className="flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Test Plan (TDD)
            </h3>
            <div className="flex flex-col gap-4">
              {project.testChecklist.map((suite, sIdx) => (
                <div key={sIdx} className="flex flex-col gap-2">
                  <h4 className="text-xs font-mono uppercase text-purple-400 font-bold">
                    {suite.suite}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {suite.tests.map((t, tIdx) => (
                      <div key={tIdx} className="flex flex-col gap-0.5 text-xs">
                        <div className="flex items-start gap-2 text-foreground/90">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-snug font-medium">{t.label}</span>
                        </div>
                        <code className="text-[11px] font-mono text-muted-foreground ml-5 truncate">
                          {t.assertion}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="pt-10 border-t border-border flex flex-col gap-4">
        <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          More Projects
        </h3>
        <div className="flex flex-col divide-y divide-border">
          {getAllProjects()
            .filter((p) => p.slug !== project.slug)
            .slice(0, 3)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/projects/${other.slug}`}
                className="py-3 flex items-center justify-between !no-underline group"
              >
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-mono text-xs text-accent font-bold w-32 shrink-0">{other.command}</span>
                  <span className="font-medium text-foreground group-hover:underline transition-colors" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    {other.title}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
