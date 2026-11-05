import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllProjects } from "@/lib/projects-data";
import { ProjectsFeed } from "@/components/projects/projects-feed";
import { JsonLd, getBreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Projects & Agent Skills | Alim Khalelov",
  description: "Curated collection of autonomous agent skills, 16:9 vector architecture engines, and creative intelligence tools by Alim Khalelov.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Agent Skills | Alim Khalelov",
    description: "Curated collection of autonomous agent skills, 16:9 vector architecture engines, and creative intelligence tools by Alim Khalelov.",
    url: "https://alim.dest.page/projects",
    images: [{ url: "/thumbnails/wiki.jpg", width: 1200, height: 675, alt: "Projects & Skills" }],
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  const breadcrumbData = getBreadcrumbJsonLd([
    { name: "Home", url: "https://alim.dest.page" },
    { name: "Projects", url: "https://alim.dest.page/projects" },
  ]);

  return (
    <main className="max-w-3xl mx-auto px-6 pt-8 pb-20 flex flex-col gap-12 w-full">
      <JsonLd data={breadcrumbData} />

      {/* Top Header Navigation */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link
          href="/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors !no-underline"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          ← Home
        </Link>
        <Link
          href="/wiki"
          className="text-sm font-medium text-muted-foreground hover:text-accent transition-colors !no-underline"
          style={{ fontFamily: "'Google Sans', sans-serif" }}
        >
          Wiki Hub →
        </Link>
      </div>

      {/* Page Title */}
      <section className="flex flex-col gap-3">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground" style={{ fontFamily: "'Google Sans', sans-serif" }}>
          Projects &amp; Skills
        </h1>
        <p className="text-lg sm:text-xl text-muted-foreground font-light leading-relaxed">
          Engineered agent tools, 16:9 vector architecture engines, and generative design matrices.
        </p>
      </section>

      {/* Dynamic Projects Feed (App Store Layout for Tempo + Admin semi-transparent drafts) */}
      <ProjectsFeed initialProjects={projects} />
    </main>
  );
}
