"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Modular sub-components
import { ProjectCard } from "./projects/ProjectCard";
import { MarqueeStrip } from "./projects/MarqueeStrip";
import { ProjectFilter } from "./projects/ProjectFilter";
import { ProjectGridHeader } from "./projects/ProjectGridHeader";

// Data and Types
import { PROJECTS } from "./projects/projects-data";
import { Project, ProjectCategory } from "./projects/types";

interface ProjectsGridProps {
  projects?: Project[];
  sectionLabel?: string;
  sectionTitle?: string;
}

export default function ProjectsGrid({
  projects = PROJECTS,
  sectionLabel = "Selected Works",
  sectionTitle = "STRUCTURES",
}: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Filtered list
  const filtered = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  const handleFilter = (cat: ProjectCategory) => {
    setActiveCategory(cat);
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-bg-primary px-6 py-32 md:px-20 md:py-48 overflow-x-clip"
      aria-label="Projects portfolio"
    >
      {/* Subtle background drafting grid */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(to right,rgba(240,242,245,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,242,245,1) 1px,transparent 1px)",
          backgroundSize: "80px 80px"
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1600px]">
        {/* Architectural corner marks for the whole section */}
        <span className="absolute -left-4 -top-4 h-8 w-8 border-l border-t border-accent/20 hidden lg:block" aria-hidden="true" />
        <span className="absolute -right-4 -top-4 h-8 w-8 border-r border-t border-accent/20 hidden lg:block" aria-hidden="true" />

        <ProjectGridHeader 
          sectionLabel={sectionLabel}
          sectionTitle={sectionTitle}
          displayCount={filtered.length}
          totalCount={projects.length}
        />

        <ProjectFilter 
          activeCategory={activeCategory}
          onFilter={handleFilter}
        />

        {/* ── Project grid — Modular Architectural Layout ──────────────────── */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8 lg:gap-16">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              // Create an asymmetric architectural layout
              // We use md:col-span values that sum up to 12 across rows for structured asymmetry
              const gridConfig = [
                "md:col-span-7 md:aspect-[16/10]",         // Row 1, Col 1-7: Large
                "md:col-span-5 md:mt-32 md:aspect-[4/5]",  // Row 1, Col 8-12: Tall (offset down)
                "md:col-span-5 md:-mt-16 md:aspect-[1/1]", // Row 2, Col 1-5: Square (offset up)
                "md:col-span-7 md:aspect-[16/9]",          // Row 2, Col 6-12: Wide
                "md:col-span-8 md:aspect-[16/10]",         // Row 3, Col 1-8: Wide main
                "md:col-span-4 md:mt-20 md:aspect-[4/5]",  // Row 3, Col 9-12: Tall end
              ][i % 6];

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.215, 0.61, 0.355, 1],
                    delay: (i % 3) * 0.1 
                  }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={cn("relative group", gridConfig)}
                >
                  {/* Subtle index number floating near the card for editorial feel */}
                  <span className="absolute -left-6 top-0 hidden font-display text-xs text-text-tertiary/20 vertical-text lg:block">
                    PROJ_{project.index}
                  </span>
                  
                  <ProjectCard project={project} dataIndex={i} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <MarqueeStrip />
    </section>
  );
}
