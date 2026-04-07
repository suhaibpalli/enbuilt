"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    id: "01",
    quote:
      "ENBUILT delivered a building that exceeded the brief on every dimension. The structural honesty of the design has become our firm's landmark — clients visit the site before they visit our office.",
    author: "Khalid Al-Mansouri",
    role: "CEO",
    company: "Al Futtaim Ventures",
    project: "Forum One Headquarters",
    year: "2022",
  },
  {
    id: "02",
    quote:
      "What separates ENBUILT from other practices is their refusal to treat architecture as a service. They treated it as a collaboration — pushing us to a brief we didn't know we had. The result is extraordinary.",
    author: "Priya Krishnamurthy",
    role: "Director of Real Estate",
    company: "Redwood Holdings",
    project: "Casa Volta Residence",
    year: "2023",
  },
  {
    id: "03",
    quote:
      "The BIM coordination and on-site management were flawless. We had zero major RFIs on a technically complex project. That is extremely rare and entirely due to ENBUILT's process discipline.",
    author: "David Henriksen",
    role: "Project Director",
    company: "Nordic Construct Group",
    project: "Lattice Pavilion",
    year: "2023",
  },
  {
    id: "04",
    quote:
      "I gave them an impossible site, a modest budget, and a vague dream. They returned a building that made the site possible, stretched the budget intelligently, and realised something better than the dream.",
    author: "Amina Al-Rashid",
    role: "Homeowner",
    company: "Private Client",
    project: "The Void House",
    year: "2022",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const sectionRef  = useRef<HTMLElement>(null);
  const quoteRef    = useRef<HTMLDivElement>(null);
  const authorRef   = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  // Entrance
  useGSAP(
    () => {
      const els = sectionRef.current?.querySelectorAll(".testimonial-header-el");
      if (els?.length) {
        gsap.fromTo(
          els,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Initial line animation
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  const switchTo = (idx: number) => {
    if (isAnimating.current || idx === active) return;
    isAnimating.current = true;

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false; },
    });

    // Fade out current
    tl.to([quoteRef.current, authorRef.current], {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.in",
      stagger: 0.05,
      onComplete: () => setActive(idx),
    })
    // Fade in new
    .fromTo(
      [quoteRef.current, authorRef.current],
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
      }
    );
  };

  const current = TESTIMONIALS[active];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg-primary py-32 md:py-48 overflow-hidden"
      aria-label="Client testimonials"
    >
      {/* Ghost background label */}
      <div
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[30vw] leading-none text-white/[0.02]"
        aria-hidden="true"
      >
        {current.id}
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-16">
        {/* Section label */}
        <div className="mb-16 flex items-end justify-between md:mb-20">
          <div>
            <p className="testimonial-header-el mb-4 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
              — Client Words
            </p>
            <h2 className="testimonial-header-el font-display text-5xl uppercase leading-none text-text-primary md:text-6xl">
              Testimonials
            </h2>
          </div>

          {/* Counter */}
          <div className="testimonial-header-el font-display text-text-tertiary">
            <span className="text-4xl text-text-primary">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-2xl"> / {String(TESTIMONIALS.length).padStart(2, "0")}</span>
          </div>
        </div>

        {/* Red accent line */}
        <div
          ref={lineRef}
          className="mb-16 h-[2px] w-24 origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />

        {/* Quote */}
        <div ref={quoteRef} className="mb-12">
          <blockquote className="font-editorial text-2xl italic leading-relaxed text-text-primary md:text-4xl lg:text-5xl lg:leading-[1.15]">
            "{current.quote}"
          </blockquote>
        </div>

        {/* Author + project */}
        <div ref={authorRef} className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-condensed text-sm font-bold uppercase tracking-[0.25em] text-text-primary">
              {current.author}
            </p>
            <p className="font-condensed text-[11px] uppercase tracking-[0.3em] text-text-secondary">
              {current.role}, {current.company}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="font-condensed text-[10px] uppercase tracking-[0.4em] text-accent font-bold">
              Project
            </p>
            <p className="font-condensed text-[11px] uppercase tracking-[0.3em] text-text-secondary">
              {current.project} · {current.year}
            </p>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="mt-16 flex items-center gap-4">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              className={cn(
                "h-[2px] transition-all duration-400 ease-out",
                i === active ? "w-12 bg-accent" : "w-6 bg-border hover:bg-text-tertiary"
              )}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}

          {/* Prev / Next */}
          <div className="ml-auto flex gap-3">
            <button
              onClick={() => switchTo((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="h-10 w-10 border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10 7H4M4 7L7 4M4 7L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={() => switchTo((active + 1) % TESTIMONIALS.length)}
              className="h-10 w-10 border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all duration-200"
              aria-label="Next testimonial"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M4 7H10M10 7L7 4M10 7L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
