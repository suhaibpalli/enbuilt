"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface Chapter {
  index: string;
  label: string;
  heading: string;
  paragraphs: string[];
}

const CHAPTERS: Chapter[] = [
  {
    index: "01",
    label: "About Enbuilt",
    heading: "We Design. We Build. We Deliver.",
    paragraphs: [
      "Enbuilt is an architecture-led design and build firm based in Jeddah, Saudi Arabia. We create purposeful spaces and deliver them with the technical expertise, craftsmanship, and attention to detail required to turn strong ideas into built reality.",
    ],
  },
  {
    index: "02",
    label: "Our Story",
    heading: "From an Architecture Practice to an Integrated Design-and-Build Firm",
    paragraphs: [
      "Enbuilt began as an architecture and design practice founded on the belief that every successful project should balance creativity, functionality, and buildability.",
      "As our projects and capabilities grew, Enbuilt evolved into an integrated design-and-build firm offering architecture, interior design, consultation, civil works, turnkey fit-out, renovation, façade works, custom fabrication, and ongoing maintenance.",
      "Today, our multidisciplinary team delivers projects across Saudi Arabia, managing every stage from the first design discussion to construction, installation, final handover, and long-term support.",
      "Our architectural foundation continues to guide everything we do. It allows us to approach construction with a designer's eye while ensuring that every concept is practical, carefully coordinated, and executed to a high standard.",
    ],
  },
  {
    index: "03",
    label: "Our Approach",
    heading: "One Vision. One Team. Complete Delivery.",
    paragraphs: [
      "We believe the best results are achieved when design and execution work together.",
      "By bringing designers, technical professionals, project managers, site teams, and fabrication specialists under one coordinated process, Enbuilt provides clients with a single reliable partner throughout the project.",
      "This integrated approach allows us to maintain the original design intent, improve coordination, control quality, and deliver projects more efficiently.",
    ],
  },
  {
    index: "04",
    label: "In-House Fabrication",
    heading: "Designed by Enbuilt. Fabricated by Enbuilt.",
    paragraphs: [
      "Enbuilt operates its own fabrication facility for custom furniture, joinery, fixtures, counters, display units, and other project-specific requirements.",
      "Our in-house production capability gives us direct control over materials, dimensions, finishes, detailing, quality, and delivery schedules. It also allows us to create customized elements that respond precisely to the architectural concept and the client's operational requirements.",
      "By reducing dependence on external suppliers, we can coordinate design and fabrication more closely, respond quickly to project requirements, and maintain consistent quality from production through installation.",
    ],
  },
  {
    index: "05",
    label: "Our Experience",
    heading: "Experience Built Across Disciplines",
    paragraphs: [
      "Our team brings extensive experience across architecture, interior design, construction, civil works, project management, fabrication, fit-out, and maintenance.",
      "This combination of creative and technical expertise enables Enbuilt to deliver projects across retail, food and beverage, corporate, commercial, residential, hospitality, and other sectors throughout Saudi Arabia.",
    ],
  },
];

const MISSION = "To transform ideas into thoughtfully designed and expertly built spaces through creativity, reliable execution, in-house craftsmanship, and a client-focused approach.";
const VISION = "To become a trusted design-and-build partner across Saudi Arabia, recognized for purposeful design, dependable project delivery, quality workmanship, and lasting client relationships.";

/**
 * AboutStory
 * Long-form narrative sequence for the About page. Each chapter is a
 * full-bleed asymmetric band with a giant ghost index numeral (same
 * device as IntroductionSection's "01"), alternating background tint for
 * rhythm, then a Mission/Vision highlight panel and a closing statement.
 */
export default function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const blocks = sectionRef.current?.querySelectorAll(".story-block");
      if (!blocks?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(blocks, { opacity: 1, y: 0 });
        return;
      }

      blocks.forEach((block) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: block,
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-bg-primary" aria-label="About Enbuilt">
      {/* ── Chapters ─────────────────────────────────────────────────────── */}
      {CHAPTERS.map((chapter, i) => (
        <div
          key={chapter.index}
          className={cn(
            "story-block relative overflow-hidden border-b border-border py-24 px-6 md:py-32 md:px-16",
            i % 2 === 1 && "bg-bg-secondary/40"
          )}
        >
          {/* Ghost index numeral */}
          <span
            className="pointer-events-none absolute -right-4 -top-10 select-none font-display text-[32vw] leading-none text-white/[0.025] md:-top-16 md:text-[22vw]"
            aria-hidden="true"
          >
            {chapter.index}
          </span>

          <div className="relative mx-auto max-w-7xl grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.5fr] md:gap-20 md:items-start">
            <div className="md:sticky md:top-32">
              <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
                — {chapter.label}
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase leading-tight text-text-primary md:text-4xl">
                {chapter.heading}
              </h2>
              <div className="mt-6 h-[2px] w-16 bg-accent" aria-hidden="true" />
            </div>

            <div className="flex flex-col gap-6">
              {chapter.paragraphs.map((p, pi) => (
                <p
                  key={pi}
                  className="font-body text-base font-light leading-relaxed text-text-secondary md:text-lg"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* ── Mission / Vision highlight panel ────────────────────────────── */}
      <div className="story-block relative overflow-hidden border-b border-border bg-bg-secondary/60 py-24 px-6 md:py-32 md:px-16">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-accent" aria-hidden="true" />
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-24">
          <div>
            <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
              — Our Mission
            </p>
            <p className="mt-6 font-editorial text-2xl italic leading-relaxed text-text-primary md:text-3xl">
              {MISSION}
            </p>
          </div>
          <div className="border-t border-border pt-16 md:border-t-0 md:border-l md:pl-24 md:pt-0">
            <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
              — Our Vision
            </p>
            <p className="mt-6 font-editorial text-2xl italic leading-relaxed text-text-primary md:text-3xl">
              {VISION}
            </p>
          </div>
        </div>
      </div>

      {/* ── Closing statement ───────────────────────────────────────────── */}
      <div className="story-block relative overflow-hidden py-32 px-6 text-center md:py-48 md:px-16">
        <span
          className="pointer-events-none absolute inset-x-0 top-0 select-none text-center font-display text-[24vw] leading-none text-white/[0.02] md:text-[16vw]"
          aria-hidden="true"
        >
          EB
        </span>
        <div className="relative mx-auto max-w-4xl">
          <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
            — Closing Section
          </p>
          <h2 className="mt-6 font-display text-4xl uppercase leading-tight text-text-primary md:text-6xl">
            More Than a Designer.<br />More Than a Contractor.
          </h2>
          <div className="mx-auto mt-8 h-[2px] w-24 bg-accent" aria-hidden="true" />
          <p className="mt-8 font-body text-base font-light leading-relaxed text-text-secondary md:text-lg">
            Enbuilt combines the creativity of an architecture studio, the capability of a turnkey contractor, and the control of an in-house fabrication facility.
          </p>
          <p className="mt-4 font-body text-base font-light leading-relaxed text-text-secondary md:text-lg">
            From the first sketch to the final installation, we take responsibility for creating spaces that are designed with purpose and built to perform.
          </p>
        </div>
      </div>
    </section>
  );
}
