"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/**
 * IntroductionSection
 * Cinematic centered editorial section with:
 *  - Animated red accent line growing on enter
 *  - Word-by-word heading reveal on scroll
 *  - Staggered paragraph fade-in
 *  - Subtle parallax vertical drift of background decorative element
 */
export default function IntroductionSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const decorRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const paragraphs = bodyRef.current
        ? Array.from(bodyRef.current.querySelectorAll(".intro-paragraph"))
        : [];

      if (prefersReducedMotion()) {
        // Neutralize the label (also held at opacity: 0 via inline style in
        // JSX), the word-by-word heading reveal, the paragraph fade-in, and
        // the red accent line to their final visible state. The decorative
        // ghost-numeral parallax has no hidden state — it just drifts — so
        // it's simply skipped.
        if (labelRef.current) gsap.set(labelRef.current, { opacity: 1, y: 0 });
        if (headingRef.current) {
          const words = Array.from(headingRef.current.querySelectorAll(".h-word"));
          if (words.length) gsap.set(words, { yPercent: 0, opacity: 1 });
        }
        if (paragraphs.length) gsap.set(paragraphs, { opacity: 1, y: 0 });
        if (lineRef.current) gsap.set(lineRef.current, { scaleX: 1 });
        return;
      }

      // Label fades in
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Heading reveals word by word
      if (headingRef.current) {
        const words = Array.from(headingRef.current.querySelectorAll(".h-word"));
        if (words.length) {
          gsap.set(words, { yPercent: 120, opacity: 0 });
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power4.out",
            stagger: { amount: 0.6, from: "start" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          });
        }
      }

      // Paragraphs fade + slide up, staggered
      if (paragraphs.length) {
        gsap.set(paragraphs, { opacity: 0, y: 24 });
        gsap.to(paragraphs, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            once: true,
          },
        });
      }

      // Red line grows outward from center
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "expo.out",
            transformOrigin: "center center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 65%",
              once: true,
            },
          }
        );
      }

      // Decorative large char parallax
      if (decorRef.current) {
        gsap.to(decorRef.current, {
          yPercent: -25,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  // Split the heading into words wrapped in spans for animation
  const HEADING = "From Vision to Built Reality";
  const words = HEADING.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-40 px-6 border-y border-border bg-bg-secondary/40 md:py-60"
      aria-label="Introduction"
    >
      {/* Decorative large ghost numeral */}
      <div
        ref={decorRef}
        className="pointer-events-none absolute -right-8 top-0 select-none font-display text-[40vw] leading-none text-white/1.5"
        aria-hidden="true"
      >
        01
      </div>

      {/* Subtle background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(240,242,245,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,242,245,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Section label */}
        <span
          ref={labelRef}
          className="mb-12 block font-condensed text-[11px] font-bold uppercase tracking-[0.6em] text-accent"
          style={{ opacity: 0 }}
        >
          — Introduction
        </span>

        {/* Animated heading */}
        <h2 ref={headingRef} className="overflow-hidden">
          <span className="block font-editorial text-3xl italic leading-relaxed text-text-primary md:text-5xl md:leading-tight lg:text-6xl lg:leading-[1.1]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className="h-word inline-block">
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </span>
              </span>
            ))}
          </span>
        </h2>

        {/* Red accent rule */}
        <div
          ref={lineRef}
          className="mt-10 mx-auto h-[2px] w-32 bg-accent origin-center"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />

        {/* Introduction copy */}
        <div ref={bodyRef} className="mt-10 flex flex-col gap-6">
          <p className="intro-paragraph font-body text-base leading-relaxed text-text-secondary md:text-lg">
            At Enbuilt, we believe exceptional spaces begin with a clear vision and succeed through precise execution.
          </p>
          <p className="intro-paragraph font-body text-base leading-relaxed text-text-secondary md:text-lg">
            Our multidisciplinary team manages every stage of the project—from architecture and interior design to civil works, fit-out, façade development, renovation, and ongoing maintenance. This integrated approach gives our clients one reliable partner throughout the entire journey.
          </p>
        </div>

        {/* Attribution */}
        <p className="mt-10 font-condensed text-[10px] uppercase tracking-[0.5em] text-text-tertiary">
          ENBUILT · Est. 2012
        </p>
      </div>
    </section>
  );
}
