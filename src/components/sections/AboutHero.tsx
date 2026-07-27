"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/SplitText";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const HERO_QUOTE =
  '"We build at the intersection of monolithic structural integrity and the visceral human experience of space."';

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrambleRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const chars = titleRef.current?.querySelectorAll(".split-char");
      const charArray = chars ? Array.from(chars) : [];
      const statsChildren = statsRef.current?.children ? Array.from(statsRef.current.children) : [];

      if (prefersReducedMotion()) {
        // Neutralize the split-char title and stats row to their final,
        // visible position; skip the parallax zoom, the scroll fade-out,
        // and the cursor's perpetual blink loop. The scramble is a single
        // one-shot reveal, not a scroll-scrubbed effect, so we just land the
        // text on its final string instantly instead of animating it.
        if (charArray.length) gsap.set(charArray, { yPercent: 0, opacity: 1 });
        if (statsChildren.length) gsap.set(statsChildren, { y: 0, opacity: 1 });
        if (scrambleRef.current) scrambleRef.current.textContent = HERO_QUOTE;
        if (cursorRef.current) gsap.set(cursorRef.current, { opacity: 0 });
        return;
      }

      // Initial states
      if (charArray.length) gsap.set(charArray, { yPercent: 110, opacity: 0 });
      if (statsChildren.length) gsap.set(statsChildren, { y: 20, opacity: 0 });

      // Entrance animation
      const tl = gsap.timeline({ id: "hero-timeline", delay: 0.5 });
      timelineRef.current = tl;
      
      if (charArray.length) {
        tl.to(charArray, {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: { amount: 0.5 },
        });
      }

      if (statsChildren.length) {
        tl.to(
          statsChildren,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.6"
        );
      }

      // Scramble Text Animation
      tl.to(scrambleRef.current, {
        scrambleText: {
          text: HERO_QUOTE,
          chars: "ABCDEFGHIJKLMN0123456789!@#$%^&*",
          speed: 1.2,
          revealDelay: 0.1
        },
        duration: 3.5,
        ease: "none",
        onComplete: () => {
          gsap.to(cursorRef.current, { opacity: 0, duration: 0.5 });
        }
      }, 0.5);

      // Cursor blinking
      gsap.to(cursorRef.current, {
        opacity: 0,
        repeat: -1,
        yoyo: true,
        duration: 0.4,
        ease: "power2.inOut"
      });

      // Parallax zoom on hero image
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Fade out on scroll
      const elementsToFade = [titleRef.current, statsRef.current].filter(Boolean) as Element[];
      if (elementsToFade.length) {
        gsap.to(elementsToFade, {
          opacity: 0,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "50% top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-bg-primary"
      onClick={() => {
        if (timelineRef.current) timelineRef.current.play(0);
      }}
    >
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0 h-[120%] w-full">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85&auto=format"
          alt="Architectural studio - ENBUILT headquarters"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-start justify-end px-6 pb-20 md:px-16 md:pb-32">
        <div ref={titleRef} className="mb-10">
          <p className="font-condensed text-[12px] font-bold uppercase tracking-[0.5em] text-accent mb-4">
            Established 2012 / Chennai
          </p>
          <h1 className="font-display text-[15vw] uppercase leading-[0.85] tracking-tight text-text-primary md:text-[10vw]">
            <SplitText text="THE FIRM" />
          </h1>
          <p className="mt-6 font-editorial text-2xl italic text-text-secondary md:text-5xl max-w-4xl leading-tight">
            <span className="sr-only">{HERO_QUOTE}</span>
            <span aria-hidden="true" className="relative group/scramble">
              <span ref={scrambleRef}></span>
              <span ref={cursorRef} className="ml-1 inline-block h-[0.9em] w-[0.1em] translate-y-[0.1em] bg-current opacity-70"></span>
            </span>
          </p>
        </div>

        {/* Technical Stats Strip */}
        <div
          ref={statsRef}
          className="grid w-full grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4"
        >
          {[
            { label: "Design Philosophy", value: "Monolithicism" },
            { label: "Technical Precision", value: "BIM Level 400" },
            { label: "Structural Core", value: "Raw Honesty" },
            { label: "Coordinates", value: "13.0827° N, 80.2707° E" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
                {item.label}
              </span>
              <span className="font-condensed text-sm font-bold uppercase tracking-widest text-text-primary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Vertical Blueprint Label */}
      <div className="absolute bottom-10 right-10 hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <span
            className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            EB / 22-04 / ARCH-STUDIO
          </span>
          <div className="h-20 w-px bg-linear-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}
