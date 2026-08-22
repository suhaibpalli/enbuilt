"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { ProjectData } from "@/lib/projects-data";
import { prefersReducedMotion } from "@/lib/motion";

interface ProjectDetailedViewProps {
  project: ProjectData;
}

/**
 * ProjectDetailedView
 * Reference page 18: hero+card, Brief/Approach, and the Material Palette/
 * Floor Plan/Fabrication/Delivery strip all fit one screen at md+ — no
 * scroll. Below md, the three bands stack and scroll normally; cramming
 * this much content into a phone-height viewport isn't legible.
 */
export default function ProjectDetailedView({ project }: ProjectDetailedViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const els = gsap.utils.toArray<HTMLElement>(".detailed-el", containerRef.current);
      if (!els.length) return;

      if (prefersReducedMotion()) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(els, { opacity: 0, y: 20 });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.06,
        delay: 0.15,
      });
    },
    { scope: containerRef, dependencies: [project.slug] }
  );

  const brief = project.narrative[0];
  const approach = project.narrative[1] ?? project.narrative[0];
  // Pick the first narrative image that isn't the same photo as
  // blueprintImage (Floor Plan) — several projects' narrative images and
  // blueprintImage coincidentally reuse the same source URL.
  const fabricationImage =
    project.narrative.flatMap((s) => s.images).find((img) => img !== project.blueprintImage) ??
    project.heroImage;

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col bg-bg-primary md:h-screen md:overflow-hidden"
      aria-label={`${project.title} — detailed`}
    >
      {/* ── Hero + info card ─────────────────────────────────────────────── */}
      <div className="relative h-[46vh] w-full shrink-0 overflow-hidden md:h-auto md:flex-[1.8]">
        <Image src={project.heroImage} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/85 via-bg-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 via-transparent to-transparent" />
        {/* Top scrim — this view never scrolls, so the navbar never reaches
            its solid/scrolled state. Keep its text legible regardless of
            how bright the top of the hero photo is. */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-bg-primary/80 to-transparent" aria-hidden="true" />

        <div className="relative flex h-full flex-col justify-center px-6 md:px-16">
          <div className="detailed-el max-w-sm border border-white/10 bg-bg-primary/70 p-6 backdrop-blur-md md:p-8">
            <p className="mb-3 font-condensed text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
              Project {project.id}
            </p>
            <h1 className="font-display text-3xl uppercase leading-[0.95] text-text-primary md:text-4xl">
              {project.title}
            </h1>
            <p className="mt-2 font-editorial text-base text-text-secondary md:text-lg">
              {project.location}
            </p>

            <div className="mt-4 h-px w-full bg-border" aria-hidden="true" />

            <div className="mt-4 flex flex-col gap-2">
              {[
                { label: "Scope", value: project.typology },
                { label: "Year", value: project.year },
                { label: "Area", value: project.area },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="font-condensed text-[9px] uppercase tracking-[0.3em] text-text-tertiary">
                    {row.label}
                  </span>
                  <span className="font-condensed text-[10px] font-medium uppercase tracking-widest text-text-secondary">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Beige band: Brief + Approach ─────────────────────────────────── */}
      <div className="relative shrink-0 overflow-hidden bg-bg-light px-6 py-6 md:flex-1 md:px-16 md:py-6">
        <div className="mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-6 md:grid-cols-[1.1fr_1fr_1fr] md:gap-12">
          <div className="detailed-el">
            <div className="mb-3 h-[2px] w-12 bg-accent" aria-hidden="true" />
            <h2 className="font-display text-2xl uppercase leading-[1.05] text-text-on-light md:text-3xl">
              From Brief to<br />Built Reality
            </h2>
          </div>

          <div className="detailed-el">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.35em] text-accent">
              — The Brief
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-text-on-light/70 md:text-base line-clamp-4">
              {brief?.description}
            </p>
          </div>

          <div className="detailed-el border-t border-border-on-light pt-4 md:border-t-0 md:border-l md:pl-12 md:pt-0">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.35em] text-accent">
              — Our Approach
            </p>
            <p className="mt-2 font-body text-sm leading-relaxed text-text-on-light/70 md:text-base line-clamp-4">
              {approach.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Dark strip: Material Palette / Floor Plan / Fabrication / Delivery ── */}
      <div className="grid shrink-0 grid-cols-2 gap-px bg-border md:flex-1 lg:grid-cols-4">
        {/* Material Palette */}
        <div className="detailed-el flex flex-col gap-3 overflow-hidden bg-bg-primary p-4 md:p-6">
          <div>
            <div className="mb-1.5 h-[2px] w-6 bg-accent" aria-hidden="true" />
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary">
              Material Palette
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.materialPalette.map((m) => (
              <div key={m.name} className="flex flex-col gap-1">
                <div className="h-8 w-7 border border-white/10" style={{ backgroundColor: m.hex }} aria-hidden="true" />
                <p className="max-w-[3rem] font-condensed text-[7px] uppercase leading-tight tracking-[0.1em] text-text-tertiary">
                  {m.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Plan */}
        <div className="detailed-el relative flex flex-col gap-2 overflow-hidden bg-bg-primary p-4 md:p-6">
          <div>
            <div className="mb-1.5 h-[2px] w-6 bg-accent" aria-hidden="true" />
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary">
              Floor Plan
            </p>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src={project.blueprintImage}
              alt={`${project.title} — floor plan reference`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover opacity-80"
            />
          </div>
        </div>

        {/* Fabrication */}
        <div className="detailed-el relative flex flex-col gap-2 overflow-hidden bg-bg-primary p-4 md:p-6">
          <div>
            <div className="mb-1.5 h-[2px] w-6 bg-accent" aria-hidden="true" />
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary">
              Fabrication
            </p>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src={fabricationImage}
              alt={`${project.title} — fabrication detail`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Delivery */}
        <div className="detailed-el relative flex flex-col gap-2 overflow-hidden bg-bg-primary p-4 md:p-6">
          <div>
            <div className="mb-1.5 h-[2px] w-6 bg-accent" aria-hidden="true" />
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.25em] text-text-primary">
              Delivery
            </p>
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <Image
              src={project.heroImage}
              alt={`${project.title} — completed`}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
