import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "@/components/projects/generative-thumbnail";
import { ProjectGlobalSections } from "@/components/projects/project-global-sections";
import { StyleRefGalleryView } from "@/app/projects/styleref/gallery-view";
import { BloobsGallery } from "@/app/projects/bloobs-styles/bloobs-gallery";
import { TeamworkWizard } from "@/app/projects/teamwork-preview/teamwork-wizard";
import { BoostPlayground } from "@/app/projects/boost/boost-playground";
import { JsonLd, getProjectJsonLd, getBreadcrumbJsonLd } from "@/components/seo/json-ld";

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

  const title = `${project.title} | Alim Khalelov`;
  const description = project.tldr;
  const ogImageUrl = `/thumbnails/${project.slug}.jpg`;

  return {
    title: project.title,
    description: description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      type: "article",
      title: title,
      description: description,
      url: `https://alim.dest.page/projects/${project.slug}`,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 675,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [ogImageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const projectSchema = getProjectJsonLd({
    title: project.title,
    headline: project.headline,
    url: `https://alim.dest.page/projects/${project.slug}`,
    image: `/thumbnails/${project.slug}.jpg`,
    datePublished: project.initiationDate,
    keywords: project.badges,
  });

  const breadcrumbsSchema = getBreadcrumbJsonLd([
    { name: "Home", url: "https://alim.dest.page" },
    { name: "Projects", url: "https://alim.dest.page/projects" },
    { name: project.title, url: `https://alim.dest.page/projects/${project.slug}` },
  ]);

  return (
    <main className="max-w-3xl mx-auto px-6 pt-6 pb-16 sm:pt-8 sm:pb-20 flex flex-col gap-10 w-full relative">
      <JsonLd data={projectSchema} />
      <JsonLd data={breadcrumbsSchema} />

      {/* 1. Hero Group: Metadata Row with Outside Back Arrow -> 16:9 Thumbnail -> Title/Subtitle */}
      <div className="flex flex-col gap-4 w-full">
        {/* Top Metadata Row: Back Arrow + Date + Time Ago + Command Badge */}
        <div className="relative flex items-center justify-between text-sm text-muted-foreground w-full">
          {/* Back Arrow button */}
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
            thumbnailSrc={project.thumbnailSrc}
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

      {/* 2. TL;DR — Large Heading, No Icon, Monochromatic */}
      <section className="flex flex-col gap-3 p-6 sm:p-7 rounded-2xl bg-muted/10 border border-border/80 shadow-sm">
        <h2 
          className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          TL;DR
        </h2>
        <p className="text-lg sm:text-xl text-foreground/90 font-light leading-relaxed">
          {project.tldr}
        </p>
      </section>

      {/* 3. The 4 Global Sections: Specs, Plan, Build, Tests with AI Copy Buttons */}
      <ProjectGlobalSections project={project} />

      {/* Optional Interactive Gallery Playground for StyleRef */}
      {project.slug === "styleref" && (
        <section id="demo" className="flex flex-col gap-4 pt-6 border-t border-border">
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

      {/* Optional Interactive Gallery Playground for Bloobs Styles */}
      {project.slug === "bloobs-styles" && (
        <section id="demo" className="flex flex-col gap-4 pt-6 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              10 Visual Styles &amp; Prompt Matrix
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Explore 10 curated design aesthetics with animated reference loop and 1-click prompt copying.
            </p>
          </div>
          <BloobsGallery />
        </section>
      )}

      {/* Interactive Teamwork Wizard for teamwork-preview */}
      {project.slug === "teamwork-preview" && (
        <section id="demo" className="flex flex-col gap-4 pt-6 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Interactive Teamwork Wizard &amp; Swarm Router
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Craft hardened prompt artifacts with objective verification guardrails and simulate multi-agent delegation.
            </p>
          </div>
          <TeamworkWizard />
        </section>
      )}

      {/* Interactive Boost Cognitive Simulator for boost */}
      {project.slug === "boost" && (
        <section id="demo" className="flex flex-col gap-4 pt-6 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Boost Cognitive Dispatcher &amp; Dual-Subagent Simulator
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Toggle Solo/Delegation routines, test DeepCoder vs DeepInvestigator dispatch, and test Rule 1 Decoy defense.
            </p>
          </div>
          <BoostPlayground />
        </section>
      )}

      {/* Interactive Tempo Live Runner */}
      {project.slug === "tempo" && (
        <section id="demo" className="flex flex-col gap-5 pt-6 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Live Tempo Interval HUD Runner
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Interactive 60 FPS viewport embedding the zero-dependency progressive kinematics runner.
            </p>
          </div>
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-neutral-950 shadow-xl">
            <iframe
              src="https://alimkhalelov.github.io/tempo/"
              title="Tempo Progressive Interval & Pacing Visualizer"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>Production deployment: alimkhalelov.github.io/tempo</span>
            <a
              href="https://alimkhalelov.github.io/tempo/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline flex items-center gap-1 font-medium"
            >
              Open fullscreen in new tab →
            </a>
          </div>
        </section>
      )}

      {/* Interactive Ocus Live Runner (Landing & Platform Cockpit) */}
      {project.slug === "ocus" && (
        <section id="demo" className="flex flex-col gap-5 pt-6 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Live Ocus Compliance OS &amp; Launch Cockpit
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Live interactive deployment converting EU MiCA &amp; DORA directives into an executable operations DAG and interactive launch cockpit.
            </p>
          </div>
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-neutral-950 shadow-xl">
            <iframe
              src="https://ocus-eu.vercel.app"
              title="Ocus — EU Crypto Compliance & Operations OS"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>Production deployment: ocus-eu.vercel.app</span>
            <div className="flex items-center gap-4">
              <a
                href="https://ocus-eu.vercel.app/ocus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1 font-medium"
              >
                Launch Cockpit (/ocus) →
              </a>
              <a
                href="https://ocus-eu.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1 font-medium"
              >
                Open in new tab →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Residual Intellect Live Runner */}
      {project.slug === "residual-intellect" && (
        <section id="demo" className="flex flex-col gap-5 pt-6 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Live Residual Intellect Cyberpunk Portal
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Interactive portal exploring realized cyberpunk dystopias, the 52-year prophecy lag, and the retro Windows 95 quiz.
            </p>
          </div>
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-neutral-950 shadow-xl">
            <iframe
              src="https://alimkhalelov.github.io/residual-intellect/"
              title="Residual Intellect — Cyberpunk Reality Radar"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>Production deployment: alimkhalelov.github.io/residual-intellect</span>
            <div className="flex items-center gap-4">
              <a
                href="https://t.me/residual_intellect"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1 font-medium"
              >
                Telegram Channel (@residual_intellect) →
              </a>
              <a
                href="https://alimkhalelov.github.io/residual-intellect/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1 font-medium"
              >
                Open in new tab →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Goal Classifier Live Runner */}
      {project.slug === "goal-classifier" && (
        <section id="demo" className="flex flex-col gap-5 pt-6 border-t border-border">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
              Live Goal Classifier Workspace
            </h2>
            <p className="text-base text-muted-foreground font-light">
              Interactive zero-build workspace for four-dimension goal clarification, real-time heuristic diagnosis, and encrypted BYOK AI planning.
            </p>
          </div>
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border border-border bg-neutral-950 shadow-xl">
            <iframe
              src="https://alimkhalelov.github.io/goal-classifier/"
              title="Goal Classifier — Minimalist Goal & Strategy Diagnosis Workspace"
              className="w-full h-full border-0"
              allow="clipboard-write"
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
            <span>Production deployment: alimkhalelov.github.io/goal-classifier</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/alimkhalelov/goal-classifier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1 font-medium"
              >
                GitHub Repository →
              </a>
              <a
                href="https://alimkhalelov.github.io/goal-classifier/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1 font-medium"
              >
                Open in new tab →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* 4. More Projects & Tools Navigation */}
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
