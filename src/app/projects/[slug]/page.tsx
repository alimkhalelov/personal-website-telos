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
    <main className="max-w-3xl mx-auto px-6 py-12 sm:py-20 flex flex-col gap-14 w-full">
      {/* Top Navigation */}
      <nav className="flex items-center justify-between border-b border-border pb-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors !no-underline"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </Link>

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/wiki"
            className="text-muted-foreground hover:text-accent transition-colors !no-underline"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            Wiki Hub →
          </Link>
        </div>
      </nav>

      {/* 1. Красочный 16:9 Thumbnail (Без перекрывающих бейджей) */}
      <figure className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/80 bg-card shadow-sm">
        <GenerativeThumbnail
          theme={project.generativeTheme}
          command={project.command}
          title={project.title}
        />
      </figure>

      {/* 2. Метаданные: Дата инициации, время назад и бейдж команды */}
      <div className="flex items-center justify-between text-sm text-muted-foreground -mt-4">
        <div className="flex items-center gap-2">
          <time style={{ fontFamily: "'Google Sans', sans-serif" }}>
            {project.dateDisplay}
          </time>
          <span>·</span>
          <span className="text-xs font-mono opacity-80">
            {project.timeAgo}
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-accent bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
          {project.command}
        </span>
      </div>

      {/* 3. Заголовок и подзаголовок: Крупный заголовок с естественным описанием */}
      <header className="flex flex-col gap-3 -mt-2">
        <h1 
          className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-[1.15]"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          {project.title}
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
          {project.headline}
        </p>
      </header>

      {/* 4. Кнопка интерактивного демо: Заметная кнопка запуска / перехода в демо */}
      {project.demoUrl && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-card border border-border/80 shadow-sm">
          <div className="flex flex-col gap-1">
            <span className="text-base font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Interactive Experience
            </span>
            <span className="text-sm text-muted-foreground">
              Run this engine live in your browser or explore the full interactive demo.
            </span>
          </div>
          <Link
            href={project.demoUrl}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-white font-medium text-sm hover:opacity-90 transition-opacity !no-underline shrink-0 shadow-sm"
            style={{ fontFamily: "'Google Sans', sans-serif" }}
          >
            <span>{project.demoLabel}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}

      {/* 5. TL;DR: Выделенный блок с сутью и главной ценностью проекта */}
      <section className="flex flex-col gap-4 p-6 sm:p-8 rounded-2xl bg-muted/20 border border-border/70 shadow-sm">
        <div className="flex items-center gap-2 text-accent text-xs font-mono font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Executive Summary &amp; Breakthrough</span>
        </div>
        <p className="text-lg sm:text-xl text-foreground font-light leading-relaxed">
          {project.tldr}
        </p>
      </section>

      {/* Embedded Live Demo (Presentation / StyleRef) */}
      {project.slug === "presentation" && (
        <section id="demo" className="flex flex-col gap-6 pt-4 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Interactive Presentation Deck
            </h2>
            <p className="text-sm text-muted-foreground">
              Use your keyboard arrow keys [←] [→] or press [S] to toggle presenter notes.
            </p>
          </div>
          <PresentationDemo />
        </section>
      )}

      {project.slug === "styleref" && (
        <section id="demo" className="flex flex-col gap-6 pt-4 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Visual Styles &amp; Prompt Matrix
            </h2>
            <p className="text-sm text-muted-foreground">
              Explore 19 curated generative art styles with instant prompt copying.
            </p>
          </div>
          <StyleRefGalleryView />
        </section>
      )}

      {/* 6. Skill Visualizer: Встроенная 16:9 векторная схема архитектуры */}
      <section className="flex flex-col gap-6 pt-4 border-t border-border">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Visual Architecture Map
          </h2>
          <p className="text-sm text-muted-foreground">
            End-to-end procedural workflow and node execution graph.
          </p>
        </div>

        <SkillVisualizerCanvas
          heroTitle={project.visualizer.heroTitle}
          subNamespace={project.visualizer.subNamespace}
          nodes={project.visualizer.nodes}
        />
      </section>

      {/* 7. Архитектурные гарантии (SDD): Читаемый раздел с потоком данных и этапами */}
      <section className="flex flex-col gap-10 pt-4 border-t border-border">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            How It Works Under the Hood
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed font-light">
            {project.overview}
          </p>
        </div>

        {/* Data Flow & Interface Contract (Single Column) */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Data Flow &amp; Interface Contract
          </h3>

          <div className="flex flex-col gap-4">
            {/* Inputs */}
            <div className="p-5 rounded-2xl bg-card border border-border/70 flex flex-col gap-2 shadow-sm">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent">
                What Goes In (Inputs):
              </span>
              <ul className="space-y-2 text-base text-foreground/90 leading-relaxed font-light">
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
                What Comes Out (Guaranteed Outputs):
              </span>
              <ul className="space-y-2 text-base text-foreground/90 leading-relaxed font-light">
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

        {/* Architectural Guarantees */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Architectural Guarantees &amp; Invariants
          </h3>
          <div className="flex flex-col gap-3">
            {project.specSDD.invariants.map((inv, i) => (
              <div key={i} className="p-4 rounded-xl bg-muted/20 border border-border/60 flex items-start gap-3.5 text-base text-foreground/90 leading-relaxed font-light">
                <div className="w-5 h-5 rounded-md border border-accent/40 bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>
                <span>{inv}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Engine Narrative */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
            Execution Engine &amp; State Machine
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed font-light">
            {project.specSDD.coreEngine}
          </p>
          <div className="p-4 rounded-2xl bg-card border border-border/80 flex flex-col gap-2 font-mono text-xs sm:text-sm text-accent">
            {project.specSDD.stateMachine.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="text-muted-foreground opacity-60">0{idx + 1}.</span>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Чеклисты сборки и тестирования: Интерактивные квадратные чекбоксы (пустые по умолчанию) */}
      <InteractiveChecklist
        buildChecklist={project.buildChecklist}
        testChecklist={project.testChecklist}
      />

      {/* 9. Другие проекты: Лаконичный список */}
      <footer className="pt-10 border-t border-border flex flex-col gap-4">
        <h3 className="text-base font-bold text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
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
      </footer>
    </main>
  );
}
