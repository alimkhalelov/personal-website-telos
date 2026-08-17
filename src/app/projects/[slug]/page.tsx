import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Check, 
  Sparkles
} from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "@/components/projects/generative-thumbnail";
import { SkillVisualizerCanvas } from "@/components/projects/skill-visualizer-canvas";
import { PresentationDemo } from "@/components/projects/presentation-demo";
import { StyleRefGalleryView } from "@/app/projects/styleref/gallery-view";
import { InteractiveChecklist } from "@/components/projects/interactive-checklist";

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
    <main className="max-w-3xl mx-auto px-6 pt-6 pb-16 sm:pt-8 sm:pb-20 flex flex-col gap-8 w-full relative">
      {/* 1. Hero Group: Metadata Row with Outside Back Arrow -> 16:9 Thumbnail -> Title/Subtitle */}
      <div className="flex flex-col gap-3 w-full">
        {/* Top Metadata Row: Back Arrow + Date (Initiation Date) + Time Ago + Command Badge */}
        <div className="relative flex items-center justify-between text-sm text-muted-foreground w-full">
          {/* Back Arrow button (positioned outside on desktop, inline on mobile) */}
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              aria-label="Back to projects"
              className="group inline-flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all !no-underline sm:absolute sm:-left-12 sm:top-1/2 sm:-translate-y-1/2"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </Link>

            {/* Date & Time Ago */}
            <div className="flex items-center gap-2">
              <time className="font-medium text-foreground/90" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                {project.dateDisplay}
              </time>
              <span>·</span>
              <span className="font-mono text-xs opacity-80">
                {project.timeAgo}
              </span>
            </div>
          </div>

          {/* Command Chip */}
          <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-3 py-0.5 rounded-full border border-accent/20">
            {project.command}
          </span>
        </div>

        {/* 16:9 YouTube-Style Thumbnail */}
        <figure className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 bg-card shadow-sm">
          <GenerativeThumbnail
            theme={project.generativeTheme}
            command={project.command}
            title={project.title}
          />
        </figure>

        {/* Title & Editorial Subtitle */}
        <header className="flex flex-col gap-2 pt-1">
          <h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
            {project.headline}
          </p>
        </header>
      </div>

      {/* 2. The Big Idea (TL;DR) */}
      <section className="flex flex-col gap-3 p-6 sm:p-7 rounded-2xl bg-muted/20 border border-border/70 shadow-sm">
        <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>The Big Idea</span>
        </div>
        <p className="text-lg sm:text-xl text-foreground font-light leading-relaxed">
          {project.tldr}
        </p>
      </section>

      {/* Embedded Live Demos (If Applicable) */}
      {project.slug === "presentation" && (
        <section id="demo" className="flex flex-col gap-4 pt-4 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Interactive Presentation Deck
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Use your keyboard arrow keys [←] [→] or press [S] to toggle presenter notes.
            </p>
          </div>
          <PresentationDemo />
        </section>
      )}

      {project.slug === "styleref" && (
        <section id="demo" className="flex flex-col gap-4 pt-4 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Visual Styles &amp; Prompt Matrix
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Explore 19 curated generative art styles with instant prompt copying.
            </p>
          </div>
          <StyleRefGalleryView />
        </section>
      )}

      {/* 3. Visual Architecture Map (16:9 Vector Canvas) */}
      <section className="flex flex-col gap-4 pt-4 border-t border-border">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Visual Architecture Map
          </h2>
          <p className="text-base text-muted-foreground font-light">
            End-to-end procedural workflow and node execution graph.
          </p>
        </div>

        <SkillVisualizerCanvas
          heroTitle={project.visualizer.heroTitle}
          subNamespace={project.visualizer.subNamespace}
          nodes={project.visualizer.nodes}
        />
      </section>

      {/* 4. How It Works (Readable Single-Column Section) */}
      <section className="flex flex-col gap-8 pt-4 border-t border-border">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed font-light">
            {project.overview}
          </p>
        </div>

        {/* Inputs & Guaranteed Results */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Inputs &amp; Guaranteed Results
          </h3>

          <div className="flex flex-col gap-3.5">
            {/* Inputs */}
            <div className="p-5 rounded-2xl bg-card border border-border/70 flex flex-col gap-2 shadow-sm">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                What Goes In:
              </span>
              <ul className="space-y-2 text-base sm:text-lg text-foreground/90 leading-relaxed font-light">
                {project.specSDD.inputs.map((inp, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-accent font-bold mt-0.5">→</span>
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outputs */}
            <div className="p-5 rounded-2xl bg-card border border-border/70 flex flex-col gap-2 shadow-sm">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                What You Get:
              </span>
              <ul className="space-y-2 text-base sm:text-lg text-foreground/90 leading-relaxed font-light">
                {project.specSDD.outputs.map((out, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Principles */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Core Principles
          </h3>
          <div className="flex flex-col gap-2.5">
            {project.specSDD.invariants.map((inv, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/20 border border-border/60 flex items-start gap-3.5 text-base sm:text-lg text-foreground/90 leading-relaxed font-light">
                <div className="w-5 h-5 rounded-md border border-accent/40 bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-1">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{inv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Workflow Lifecycle */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Workflow Lifecycle
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-light">
            {project.specSDD.coreEngine}
          </p>
          <div className="p-4 rounded-2xl bg-card border border-border/80 flex flex-col gap-2 font-mono text-sm text-accent shadow-sm">
            {project.specSDD.stateMachine.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-muted-foreground opacity-60">0{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive Checklists (Execution & Quality Check) */}
      <InteractiveChecklist
        buildChecklist={project.buildChecklist}
        testChecklist={project.testChecklist}
      />

      {/* 6. More Projects */}
      <footer className="pt-8 border-t border-border flex flex-col gap-4">
        <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          More Projects &amp; Tools
        </h3>
        <div className="flex flex-col divide-y divide-border">
          {getAllProjects()
            .filter((p) => p.slug !== project.slug)
            .slice(0, 3)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/projects/${other.slug}`}
                className="py-3.5 flex items-center justify-between !no-underline group"
              >
                <div className="flex items-center gap-3 text-base">
                  <span className="font-mono text-xs text-accent font-bold w-32 shrink-0">{other.command}</span>
                  <span className="font-medium text-foreground group-hover:underline transition-colors" style={{ fontFamily: "'Google Sans', sans-serif" }}>
                    {other.title}
                  </span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            ))}
        </div>
      </footer>
    </main>
  );
}
