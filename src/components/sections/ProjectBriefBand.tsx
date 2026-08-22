"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ProjectData } from "@/lib/projects-data";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface ProjectBriefBandProps {
  project: ProjectData;
}

export default function ProjectBriefBand({ project }: ProjectBriefBandProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const els = sectionRef.current?.querySelectorAll(".brief-band-el");
      if (!els?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }

      gsap.set(els, { opacity: 0, y: 28 });
      gsap.to(els, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef, dependencies: [project.slug] }
  );

  const brief = project.narrative[0];
  const approach = project.narrative[1] ?? project.narrative[0];
  const fabricationImage = brief?.images[1] ?? project.heroImage;

  return (
    <section ref={sectionRef} aria-label="From brief to built reality">
      {/* ── Beige band: Brief + Approach ─────────────────────────────────── */}
      <div className="relative overflow-hidden bg-bg-light py-24 px-6 md:py-32 md:px-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-[1.1fr_1fr_1fr] md:gap-16">
          <div className="brief-band-el">
            <div className="mb-6 h-[2px] w-16 bg-accent" aria-hidden="true" />
            <h2 className="font-display text-4xl uppercase leading-[1.05] text-text-on-light md:text-5xl">
              From Brief to<br />Built Reality
            </h2>
          </div>

          <div className="brief-band-el">
            <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
              — The Brief
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-text-on-light/70 md:text-lg">
              {brief?.description}
            </p>
          </div>

          <div className="brief-band-el border-t border-border-on-light pt-8 md:border-t-0 md:border-l md:pl-16 md:pt-0">
            <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.4em] text-accent">
              — Our Approach
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-text-on-light/70 md:text-lg">
              {approach.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Dark strip: Material Palette / Floor Plan / Fabrication / Delivery ── */}
      <div className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
        {/* Material Palette */}
        <div className="brief-band-el flex flex-col gap-6 bg-bg-primary p-6 md:p-8">
          <div>
            <div className="mb-2 h-[2px] w-8 bg-accent" aria-hidden="true" />
            <p className="font-condensed text-xs font-bold uppercase tracking-[0.3em] text-text-primary">
              Material Palette
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {project.materialPalette.map((m) => (
              <div key={m.name} className="flex flex-col gap-2">
                <div
                  className="h-12 w-10 border border-white/10"
                  style={{ backgroundColor: m.hex }}
                  aria-hidden="true"
                />
                <p className="max-w-[3.5rem] font-condensed text-[8px] uppercase leading-tight tracking-[0.15em] text-text-tertiary">
                  {m.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Floor Plan */}
        <div className="brief-band-el relative flex flex-col gap-4 bg-bg-primary p-6 md:p-8">
          <div>
            <div className="mb-2 h-[2px] w-8 bg-accent" aria-hidden="true" />
            <p className="font-condensed text-xs font-bold uppercase tracking-[0.3em] text-text-primary">
              Floor Plan
            </p>
          </div>
          <div className="relative h-32 flex-1 overflow-hidden">
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
        <div className="brief-band-el relative flex flex-col gap-4 bg-bg-primary p-6 md:p-8">
          <div>
            <div className="mb-2 h-[2px] w-8 bg-accent" aria-hidden="true" />
            <p className="font-condensed text-xs font-bold uppercase tracking-[0.3em] text-text-primary">
              Fabrication
            </p>
          </div>
          <div className="relative h-32 flex-1 overflow-hidden">
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
        <div className="brief-band-el relative flex flex-col gap-4 bg-bg-primary p-6 md:p-8">
          <div>
            <div className="mb-2 h-[2px] w-8 bg-accent" aria-hidden="true" />
            <p className="font-condensed text-xs font-bold uppercase tracking-[0.3em] text-text-primary">
              Delivery
            </p>
          </div>
          <div className="relative h-32 flex-1 overflow-hidden">
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
    </section>
  );
}
