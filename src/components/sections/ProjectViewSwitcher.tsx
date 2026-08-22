"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { ProjectData } from "@/lib/projects-data";
import ProjectHero from "@/components/sections/ProjectHero";
import ProjectNarrative from "@/components/sections/ProjectNarrative";
import ProjectTechnical from "@/components/sections/ProjectTechnical";
import ProjectBriefOverview from "@/components/sections/ProjectBriefOverview";

type ViewMode = "standard" | "overview";

interface ProjectViewSwitcherProps {
  project: ProjectData;
}

export default function ProjectViewSwitcher({ project }: ProjectViewSwitcherProps) {
  const [view, setView] = useState<ViewMode>("overview");

  return (
    <>
      {/* Floating view toggle */}
      <div className="fixed bottom-8 right-6 z-40 flex items-center gap-1 border border-border bg-bg-primary/90 p-1 backdrop-blur-md md:right-16">
        {(["standard", "overview"] as ViewMode[]).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={cn(
              "px-4 py-2 font-condensed text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-200",
              view === v ? "bg-accent text-white" : "text-text-tertiary hover:text-text-primary"
            )}
          >
            {v}
          </button>
        ))}
      </div>

      {/* First screen differs by view; the full story below is shared either way */}
      {view === "standard" ? (
        <ProjectHero
          title={project.title}
          subtitle={project.subtitle}
          location={project.location}
          year={project.year}
          area={project.area}
          typology={project.typology}
          imageSrc={project.heroImage}
        />
      ) : (
        <ProjectBriefOverview project={project} />
      )}
      <ProjectNarrative sections={project.narrative} />
      <ProjectTechnical blueprintSrc={project.blueprintImage} specs={project.technicalSpecs} />
    </>
  );
}
