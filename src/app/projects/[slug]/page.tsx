import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, getAllProjects } from "@/lib/projects-data";
import { GenerativeThumbnail } from "@/components/projects/generative-thumbnail";
import { ProjectGlobalSections } from "@/components/projects/project-global-sections";
import { StyleRefGalleryView } from "@/app/projects/styleref/gallery-view";
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
