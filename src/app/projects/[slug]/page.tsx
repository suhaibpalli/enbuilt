import type { Metadata } from "next";
import { PROJECTS_DATA } from "@/lib/projects-data";
import ProjectViewSwitcher from "@/components/sections/ProjectViewSwitcher";
import NextProject from "@/components/sections/NextProject";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(PROJECTS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: `${project.subtitle} — ${project.typology} in ${project.location}, ${project.year}. ${project.area}.`,
    openGraph: {
      images: [project.heroImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS_DATA[slug];

  if (!project) {
    notFound();
  }

  const nextProject = PROJECTS_DATA[project.nextProjectSlug];

  return (
    <main className="bg-bg-primary">
      {/* ── 01-03: Hero / Narrative / Technical, or the Cinematic overview ── */}
      <ProjectViewSwitcher project={project} />

      {/* ── 04: Transition Buffer ── */}
      <section className="h-[50vh] bg-bg-primary flex items-center justify-center border-y border-white/5">
         <div className="h-px w-32 bg-accent opacity-50" />
      </section>

      {/* ── 05: Next Project ── */}
      {nextProject && (
        <NextProject
          title={nextProject.title}
          slug={nextProject.slug}
          imageSrc={nextProject.heroImage}
        />
      )}
    </main>
  );
}
