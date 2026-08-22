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
  const galleryImages = project.narrative.flatMap((s) => s.images).slice(0, 2);

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
      className="relative flex w-full flex-col bg-bg-primary md:h-screen md:flex-row md:overflow-hidden"
      aria-label={`${project.title} — overview`}
    >
      {/* Left: brief text panel */}
      <div className="relative order-2 flex w-full flex-col justify-center gap-6 px-6 py-16 md:order-1 md:w-[38%] md:px-14 md:py-0">
        <div className="brief-el h-[2px] w-10 bg-accent" aria-hidden="true" />

        <div className="brief-el">
          <p className="mb-3 font-condensed text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
            {project.typology}
          </p>
          <h1 className="font-display text-4xl uppercase leading-[0.95] text-text-primary md:text-5xl">
            {project.title}
          </h1>
          <p className="mt-3 font-editorial text-lg text-text-secondary md:text-xl">
            {project.subtitle}
          </p>
        </div>

        <p className="brief-el max-w-md font-body text-sm leading-relaxed text-text-secondary md:text-base line-clamp-5">
          {project.narrative[0]?.description}
        </p>

        <div className="brief-el flex flex-wrap gap-x-6 gap-y-2 font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
          <span>{project.location}</span>
          <span className="text-accent">·</span>
          <span>{project.year}</span>
          <span className="text-accent">·</span>
          <span>{project.area}</span>
        </div>

        <div className="brief-el mt-2 hidden items-center gap-3 font-condensed text-[10px] uppercase tracking-[0.35em] text-text-tertiary md:flex">
          <svg width="14" height="20" viewBox="0 0 14 20" fill="none" className="text-accent" aria-hidden="true">
            <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
            <polyline points="2,10 7,15 12,10" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          Scroll for the full story
        </div>
      </div>

      {/* Right: image collage — hero + supporting images, all visible at once */}
      <div className="relative order-1 grid h-[52vh] w-full grid-rows-[1.4fr_1fr] gap-2 p-2 md:order-2 md:h-auto md:w-[62%]">
        <div className="brief-el relative overflow-hidden">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 62vw"
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {galleryImages.map((img, i) => (
            <div key={i} className="brief-el relative overflow-hidden">
              <Image
                src={img}
                alt={`${project.title} — detail ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 31vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
