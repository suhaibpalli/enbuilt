"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { ProjectData } from "@/lib/projects-data";
import { prefersReducedMotion } from "@/lib/motion";

interface ProjectBriefOverviewProps {
  project: ProjectData;
}

export default function ProjectBriefOverview({ project }: ProjectBriefOverviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const els = gsap.utils.toArray<HTMLElement>(".brief-el", containerRef.current);
      if (!els.length) return;

      if (prefersReducedMotion()) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(els, { opacity: 0, y: 24 });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.2,
      });
    },
    { scope: containerRef, dependencies: [project.slug] }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-bg-primary"
      aria-label={`${project.title} — overview`}
    >
      {/* Single full-bleed photo — the info card sits on top of it, not beside it */}
      <Image
        src={project.heroImage}
        alt={project.title}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/85 via-bg-primary/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 via-transparent to-transparent" />

      <div className="relative flex h-full flex-col justify-center px-6 md:px-16">
        {/* Info card, overlaid directly on the photo */}
        <div className="brief-el max-w-md border border-white/10 bg-bg-primary/70 p-8 backdrop-blur-md md:p-10">
          <p className="mb-4 font-condensed text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
            Project {project.id}
          </p>
          <h1 className="font-display text-4xl uppercase leading-[0.95] text-text-primary md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 font-editorial text-lg text-text-secondary md:text-xl">
            {project.location}
          </p>

          <div className="mt-6 h-px w-full bg-border" aria-hidden="true" />

          <div className="mt-6 flex flex-col gap-3">
            {[
              { label: "Scope", value: project.typology },
              { label: "Year", value: project.year },
              { label: "Area", value: project.area },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between">
                <span className="font-condensed text-[10px] uppercase tracking-[0.35em] text-text-tertiary">
                  {row.label}
                </span>
                <span className="font-condensed text-[11px] font-medium uppercase tracking-widest text-text-secondary">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="brief-el mt-8 hidden items-center gap-3 font-condensed text-[10px] uppercase tracking-[0.35em] text-text-tertiary md:flex">
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="text-accent" aria-hidden="true">
            <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
            <polyline points="2,10 7,15 12,10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          Scroll for the full story
        </div>
      </div>
    </section>
  );
}
