"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * PhilosophyQuote
 * Cinematic centered editorial section with:
 *  - Animated red accent line growing on enter
 *  - Character-by-character quote reveal on scroll
 *  - Subtle parallax vertical drift of background decorative element
 */
export default function PhilosophyQuote() {
  const sectionRef  = useRef<HTMLElement>(null);
  const quoteRef    = useRef<HTMLQuoteElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLSpanElement>(null);
  const decorRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

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

      // Quote reveals line by line with stagger (split by word group)
      if (quoteRef.current) {
        const words = Array.from(quoteRef.current.querySelectorAll(".q-word"));
        if (words.length) {
          gsap.set(words, { yPercent: 120, opacity: 0 });
          gsap.to(words, {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power4.out",
            stagger: { amount: 0.8, from: "start" },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
          });
        }
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

  // Split the quote into words wrapped in spans for animation
  const QUOTE = "Architecture should speak of its time and place, but yearn for timelessness through structural integrity.";
  const words = QUOTE.split(" ");

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-40 px-6 border-y border-border bg-bg-secondary/40 md:py-60"
      aria-label="Studio philosophy"
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

      <div className="relative mx-auto max-w-5xl text-center">
        {/* Section label */}
        <span
          ref={labelRef}
          className="mb-12 block font-condensed text-[11px] font-bold uppercase tracking-[0.6em] text-accent"
          style={{ opacity: 0 }}
        >
          — Our Philosophy
        </span>

        {/* Animated quote */}
        <blockquote
          ref={quoteRef}
          className="overflow-hidden"
          cite="ENBUILT Studio Manifesto"
        >
          <p className="font-editorial text-3xl italic leading-relaxed text-text-primary md:text-5xl md:leading-tight lg:text-6xl lg:leading-[1.1]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <span className="q-word inline-block">
                  {word}
                  {i < words.length - 1 ? "\u00a0" : ""}
                </span>
              </span>
            ))}
          </p>
        </blockquote>

        {/* Red accent rule */}
        <div
          ref={lineRef}
          className="mt-16 mx-auto h-[2px] w-32 bg-accent origin-center"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />

        {/* Attribution */}
        <p className="mt-8 font-condensed text-[10px] uppercase tracking-[0.5em] text-text-tertiary">
          ENBUILT Studio Manifesto · Est. 2012
        </p>
      </div>
    </section>
  );
}
