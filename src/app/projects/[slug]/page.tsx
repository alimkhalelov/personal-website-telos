import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  Layers, 
  Cpu, 
  Code, 
  CheckSquare, 
  Play, 
  BookOpen,
  Eye
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
    title: `${project.title} — Spec, Visualizer & Architecture | Alimzhan`,
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
    <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24 flex flex-col gap-16 w-full">
      {/* Navigation Top Bar */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors !no-underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Headquarters</span>
        </Link>

        <div className="flex items-center gap-4 text-sm font-mono">
          <Link
            href="/wiki"
            className="text-muted-foreground hover:text-accent transition-colors !no-underline flex items-center gap-1"
          >
            <BookOpen className="w-4 h-4" />
            <span>Public Wiki</span>
          </Link>
          <Link
            href={project.demoUrl}
            className="px-3 py-1.5 rounded-xl bg-accent text-white hover:opacity-90 transition-opacity font-semibold flex items-center gap-1.5 !no-underline"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{project.demoLabel}</span>
          </Link>
        </div>
      </div>

      {/* Hero Section with Generative Thumbnail & Metadata */}
      <section className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Generative Banner Thumbnail */}
        <div className="w-full aspect-[21/9] sm:aspect-[2.4/1] rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
          <GenerativeThumbnail
            theme={project.generativeTheme}
            command={project.command}
            title={project.title}
          />
        </div>

        {/* Title, Initiation Date, and Badges */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-bold">
                {project.command}
              </span>
              <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 text-foreground">
                {project.tag}
              </span>
            </div>
            <div className="text-muted-foreground">
              INITIATION DATE: <strong className="text-foreground">{project.initiationDate}</strong> ({project.dateDisplay})
            </div>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground font-light leading-relaxed">
            {project.headline}
          </p>
        </div>

        {/* TL;DR Callout Box */}
        <div className="p-6 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-accent uppercase tracking-widest font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Core Epiphany & TL;DR</span>
          </div>
          <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-medium">
            {project.tldr}
          </p>
        </div>
      </section>

      {/* Interactive Demo Player / Gallery View (If applicable) */}
      {project.slug === "presentation" && (
        <section className="flex flex-col gap-6 pt-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2 text-sm font-mono text-foreground font-bold uppercase tracking-wider">
              <Play className="w-4 h-4 text-accent fill-current" />
              <span>Interactive Live Demo // Deck Runner</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Hotkeys: [←] [→] [S] [F]</span>
          </div>
          <PresentationDemo />
        </section>
      )}

      {project.slug === "styleref" && (
        <section className="flex flex-col gap-6 pt-4">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="flex items-center gap-2 text-sm font-mono text-foreground font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Interactive Visual Styles Gallery & Prompt Matrix</span>
            </div>
            <span className="text-xs font-mono text-muted-foreground">19 Curated Master Styles</span>
          </div>
          <StyleRefGalleryView />
        </section>
      )}

      {/* 16:9 Skill Visualizer Vector Architecture Diagram */}
      <section className="flex flex-col gap-6 pt-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2 text-sm font-mono text-foreground font-bold uppercase tracking-wider">
            <Cpu className="w-4 h-4 text-accent" />
            <span>Skill Visualizer // 16:9 Vector Architecture Map</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">Standard 1600x900 Canvas</span>
        </div>

        <SkillVisualizerCanvas
          heroTitle={project.visualizer.heroTitle}
          subNamespace={project.visualizer.subNamespace}
          nodes={project.visualizer.nodes}
        />
      </section>

      {/* Spec (SDD) Architecture Section */}
      <section className="flex flex-col gap-6 pt-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div className="flex items-center gap-2 text-sm font-mono text-foreground font-bold uppercase tracking-wider">
            <Terminal className="w-4 h-4 text-accent" />
            <span>Spec-Driven Development (SDD) // Architectural Invariants</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">Formal Spec Kit</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Inputs & Outputs */}
          <div className="p-6 rounded-2xl bg-[#F4F4F2] dark:bg-[#16161a] border border-black/5 dark:border-white/5 flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              Inputs & Outputs Contract
            </h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <strong className="text-xs font-mono uppercase text-foreground">Inputs:</strong>
              <ul className="list-disc list-inside space-y-1">
                {project.specSDD.inputs.map((inp, i) => (
                  <li key={i}>{inp}</li>
                ))}
              </ul>
              <strong className="text-xs font-mono uppercase text-foreground mt-2">Outputs:</strong>
              <ul className="list-disc list-inside space-y-1">
                {project.specSDD.outputs.map((out, i) => (
                  <li key={i}>{out}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* System Invariants */}
          <div className="p-6 rounded-2xl bg-[#F4F4F2] dark:bg-[#16161a] border border-black/5 dark:border-white/5 flex flex-col gap-4">
            <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              System Invariants & Principles
            </h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              {project.specSDD.invariants.map((inv, i) => (
                <li key={i} className="leading-relaxed">
                  {inv}
                </li>
              ))}
            </ul>
          </div>

          {/* Core Engine & Data Structures */}
          <div className="p-6 rounded-2xl bg-[#F4F4F2] dark:bg-[#16161a] border border-black/5 dark:border-white/5 flex flex-col gap-4 md:col-span-2">
            <h3 className="text-base font-bold text-foreground font-mono flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Core Engine & State Machine
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.specSDD.coreEngine}
            </p>
            <div className="p-4 rounded-xl bg-black/40 text-xs font-mono text-emerald-400 overflow-x-auto">
              <code>{project.specSDD.stateMachine.join(" \n")}</code>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Checklist (Build) & Test Checklist (TDD) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
        {/* Build Checklist */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-sm font-mono text-foreground font-bold uppercase tracking-wider border-b border-border pb-4">
            <CheckSquare className="w-4 h-4 text-accent" />
            <span>Build Plan Checklist</span>
          </div>

          <div className="flex flex-col gap-5">
            {project.buildChecklist.map((phase, pIdx) => (
              <div
                key={pIdx}
                className="p-5 rounded-2xl bg-[#F4F4F2] dark:bg-[#16161a] border border-black/5 dark:border-white/5 flex flex-col gap-3"
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-accent font-bold">
                  {phase.phase}
                </h4>
                <div className="flex flex-col gap-2">
                  {phase.tasks.map((task, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2.5 text-sm text-foreground/90">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-snug">{task.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Checklist (TDD) */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 text-sm font-mono text-foreground font-bold uppercase tracking-wider border-b border-border pb-4">
            <Code className="w-4 h-4 text-accent" />
            <span>Test Plan (TDD Verification)</span>
          </div>

          <div className="flex flex-col gap-5">
            {project.testChecklist.map((suite, sIdx) => (
              <div
                key={sIdx}
                className="p-5 rounded-2xl bg-[#F4F4F2] dark:bg-[#16161a] border border-black/5 dark:border-white/5 flex flex-col gap-3"
              >
                <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold">
                  {suite.suite}
                </h4>
                <div className="flex flex-col gap-3">
                  {suite.tests.map((t, tIdx) => (
                    <div key={tIdx} className="flex flex-col gap-1 text-sm">
                      <div className="flex items-start gap-2 text-foreground/90">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug font-medium">{t.label}</span>
                      </div>
                      <code className="text-xs font-mono text-muted-foreground ml-6 p-1.5 rounded bg-black/20 overflow-x-auto">
                        {t.assertion}
                      </code>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Navigation Back to Other Projects */}
      <section className="pt-12 border-t border-border flex flex-col gap-6">
        <h3 className="text-lg font-bold text-foreground">Explore Other Autonomous Projects</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {getAllProjects()
            .filter((p) => p.slug !== project.slug)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/projects/${other.slug}`}
                className="p-4 rounded-2xl bg-[#F4F4F2] dark:bg-[#16161a] hover:bg-[#EAEAE7] dark:hover:bg-[#202026] border border-black/5 dark:border-white/5 flex flex-col gap-2 transition-all !no-underline group"
              >
                <span className="text-xs font-mono text-accent font-bold">{other.command}</span>
                <h4 className="text-base font-bold text-foreground group-hover:text-accent transition-colors">
                  {other.title}
                </h4>
                <span className="text-xs text-muted-foreground font-mono">INIT: {other.dateDisplay}</span>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
