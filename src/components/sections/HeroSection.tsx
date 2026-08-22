"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/SplitText";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

interface HeroStat {
  value: string;
  label: string;
}

interface HeroProject {
  index: string;
  title: string;
  location: string;
  year: string;
}

interface HeroSectionProps {
  /** Firm tagline shown above the massive heading */
  tagline?: string;
  /** The two-line split headline */
  headlineTop?: string;
  headlineBottom?: string;
  /** Optional bold statement shown above the descriptor paragraph */
  descriptorHeading?: string;
  /** Short descriptor under the headline */
  descriptor?: string;
  /** Hero background image URL. Replace with your project image. */
  imageSrc?: string;
  imageAlt?: string;
  /** Optional background image behind the main EN/BUILT headline (Section 1) */
  heroBgImageSrc?: string;
  heroBgImageAlt?: string;
  /** Stats shown during the scrollytelling pin */
  stats?: HeroStat[];
  /** Featured project shown in the lower-left during pin */
  featuredProject?: HeroProject;
  /** Scroll cue label */
  scrollLabel?: string;
  /** Called when the CTA button is clicked */
  onExploreClick?: () => void;
}

// ─── Default content ───────────────────────────────────────────────────────────

const DEFAULT_STATS: HeroStat[] = [
  { value: "47", label: "Projects Built" },
  { value: "12", label: "Years of Practice" },
  { value: "8", label: "Cities" },
];

const DEFAULT_PROJECT: HeroProject = {
  index: "01",
  title: "The Meridian Tower",
  location: "Chennai, India",
  year: "2024",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function HeroSection({
  tagline = "Spatial & Structural Design",
  headlineTop = "BUILT",
  headlineBottom = "FOR FOREVER",
  descriptorHeading,
  descriptor = "Monolithic architecture crafted at the intersection of\ntechnical precision and enduring human experience.",
  imageSrc = "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=85&auto=format",
  imageAlt = "Architectural structure — ENBUILT portfolio",
  heroBgImageSrc,
  heroBgImageAlt = "Hero background — ENBUILT",
  stats = DEFAULT_STATS,
  featuredProject = DEFAULT_PROJECT,
  scrollLabel = "Scroll to explore",
  onExploreClick,
}: HeroSectionProps) {
  // ─── View toggle (Standard EN/BUILT headline vs an alternate without it) ──────
  const [heroView, setHeroView] = useState<"standard" | "alternate">("standard");

  // ─── Refs ────────────────────────────────────────────────────────────────────
  const wrapperRef    = useRef<HTMLDivElement>(null);
  const heroRef       = useRef<HTMLDivElement>(null);
  const pinRef        = useRef<HTMLDivElement>(null);
  const imageRef      = useRef<HTMLDivElement>(null);
  const clipRef       = useRef<HTMLDivElement>(null);
  const statsRef      = useRef<HTMLDivElement>(null);
  const projectTagRef = useRef<HTMLDivElement>(null);
  const redLineRef    = useRef<HTMLDivElement>(null);
  const scrollCueRef  = useRef<HTMLDivElement>(null);
  const counterRefs   = useRef<(HTMLSpanElement | null)[]>([]);

  // ─── GSAP Animations ─────────────────────────────────────────────────────────
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Safety check: ensure required elements exist
      if (!wrapperRef.current) return;

      // ── 1. Entry: Stagger-reveal each split character in the headline ──────
      // Runs immediately (after opener completes — delay matches layout.tsx timing)
      const chars = wrapperRef.current.querySelectorAll(".split-char");
      const taglineEl = wrapperRef.current.querySelector(".hero-tagline");
      const descriptorEl = wrapperRef.current.querySelector(".hero-descriptor");
      const ctaEl = wrapperRef.current.querySelector(".hero-cta");
      const metaLeft = wrapperRef.current.querySelector(".hero-meta-left");
      const metaRight = wrapperRef.current.querySelector(".hero-meta-right");

      const charArray = Array.from(chars);

      if (prefersReducedMotion()) {
        // Neutralize every hidden "from" state so the hero, the pinned
        // reveal, and the stats/project-tag content are all visible
        // immediately — no scroll-scrubbed pin, no fade-out, no count-up.
        if (charArray.length) gsap.set(charArray, { yPercent: 0, opacity: 1 });
        gsap.set(
          [taglineEl, descriptorEl, ctaEl, metaLeft, metaRight, scrollCueRef.current].filter(Boolean) as Element[],
          { opacity: 1, y: 0 }
        );
        if (redLineRef.current) gsap.set(redLineRef.current, { scaleX: 1 });
        if (heroRef.current) gsap.set(heroRef.current, { opacity: 1, y: 0 });
        if (clipRef.current) gsap.set(clipRef.current, { clipPath: "inset(0 0% 0 0)" });
        if (imageRef.current) gsap.set(imageRef.current, { scale: 1, yPercent: 0 });
        if (statsRef.current) {
          gsap.set(statsRef.current, { opacity: 1, x: 0 });
          gsap.set(statsRef.current.querySelectorAll(".stat-item"), { opacity: 1, y: 0 });
        }
        if (projectTagRef.current) gsap.set(projectTagRef.current, { opacity: 1, x: 0 });

        // Counters: land on the final value directly, no count-up tween.
        counterRefs.current.forEach((el, i) => {
          if (!el) return;
          el.textContent = String(stats[i]?.value ?? "0");
        });

        return;
      }

      // Set initial hidden state
      if (charArray.length) gsap.set(charArray, { yPercent: 110, opacity: 0 });
      gsap.set([taglineEl, descriptorEl, ctaEl, metaLeft, metaRight, scrollCueRef.current].filter(Boolean) as Element[], {
        opacity: 0,
        y: 20,
      });

      // Entry timeline — delayed so it starts after the opener hands off
      const entryTl = gsap.timeline({ delay: 0.4 });

      if (taglineEl) {
        entryTl.to(taglineEl, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
      }

      if (charArray.length) {
        entryTl.to(
          charArray,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            stagger: { amount: 0.5, from: "start" },
          },
          "-=0.4"
        );
      }

      if (descriptorEl) {
        entryTl.to(
          descriptorEl,
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          "-=0.35"
        );
      }

      if (ctaEl) {
        entryTl.to(ctaEl, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.5");
      }

      const metaEls = [metaLeft, metaRight].filter(Boolean) as Element[];
      if (metaEls.length) {
        entryTl.to(
          metaEls,
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1 },
          "-=0.5"
        );
      }

      if (scrollCueRef.current) {
        entryTl.to(scrollCueRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");
      }

      // ── 2. Red accent line grows on load ─────────────────────────────────
      if (redLineRef.current) {
        entryTl.fromTo(
          redLineRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.75, ease: "expo.out", transformOrigin: "left center" },
          0.6
        );
      }

      // ── 3. Scroll cue pulsing arrow bounce ────────────────────────────────
      gsap.to(".scroll-arrow", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
        delay: 2,
      });

      // ── 4. Scrollytelling — Pinned full-bleed image reveal ────────────────
      // This is the main scrollytelling sequence.
      // The section is pinned for 200vh of scroll, driving all animations.

      mm.add("(min-width: 768px)", () => {
        if (!pinRef.current) return;

        // Phase A: Clip-path expand — image reveals left-to-right like a blueprint unfold
        // Starts at scroll 0%, completes at 40%
        const revealTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top",
            end: "+=200%",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // A1: Image clip-path reveal (left → full width)
        if (clipRef.current) {
          revealTl.fromTo(
            clipRef.current,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.4,
              ease: "power2.inOut",
            }
          );
        }

        // A2: Image slight scale-in as it reveals (premium zoom feel)
        if (imageRef.current) {
          revealTl.fromTo(
            imageRef.current,
            { scale: 1.15 },
            { scale: 1, duration: 0.4, ease: "power2.out" },
            "<"
          );
        }

        // A3: Hero text fades up and out as image takes over
        if (heroRef.current) {
          revealTl.to(
            heroRef.current,
            { opacity: 0, y: -40, duration: 0.2, ease: "power2.in" },
            0.15
          );
        }

        // A4: Stats slide in from right once image is revealed
        if (statsRef.current) {
          revealTl.fromTo(
            statsRef.current,
            { opacity: 0, x: 40 },
            { opacity: 1, x: 0, duration: 0.2, ease: "power3.out" },
            0.4
          );
        }

        // A5: Individual stat items stagger in
        revealTl.fromTo(
          ".stat-item",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.15, stagger: 0.05, ease: "power3.out" },
          0.44
        );

        // A6: Featured project tag slides in from left
        if (projectTagRef.current) {
          revealTl.fromTo(
            projectTagRef.current,
            { opacity: 0, x: -40 },
            { opacity: 1, x: 0, duration: 0.2, ease: "power3.out" },
            0.46
          );
        }

        // A7: Image slow parallax / zoom while pinned (depth feeling)
        if (imageRef.current) {
          revealTl.to(
            imageRef.current,
            { scale: 1.1, yPercent: 8, duration: 0.6, ease: "none" },
            0.4
          );
        }
      });

      // Mobile: simplified — no pin, just fade in image on scroll
      mm.add("(max-width: 767px)", () => {
        if (clipRef.current) {
          gsap.fromTo(
            clipRef.current,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "power2.out",
              scrollTrigger: {
                trigger: pinRef.current || undefined,
                start: "top 80%",
                end: "top 20%",
                scrub: 1,
              },
            }
          );
        }

        const elementsToReveal = [statsRef.current, projectTagRef.current].filter(Boolean) as Element[];
        if (elementsToReveal.length) {
          gsap.fromTo(
            elementsToReveal,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: pinRef.current || undefined,
                start: "top 60%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      // ── 5. Counter animation for stats ────────────────────────────────────
      // Animates numbers up to their target when scrolled into view
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = parseInt(stats[i]?.value ?? "0", 10);
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { textContent: 0 },
              {
                textContent: target,
                duration: 0.8,
                ease: "power2.out",
                delay: i * 0.12,
                snap: { textContent: 1 },
                onUpdate() {
                  el.textContent = Math.round(Number(el.textContent)).toString();
                },
              }
            );
          },
          once: true,
        });
      });
    },
    { scope: wrapperRef }
  );

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div ref={wrapperRef} className="relative w-full overflow-x-hidden">
      {/* Floating hero view toggle */}
      <div className="fixed top-24 right-6 z-40 flex items-center gap-1 border border-border bg-bg-primary/90 p-1 backdrop-blur-md md:right-16">
        {(["standard", "alternate"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setHeroView(v)}
            className={cn(
              "px-4 py-2 font-condensed text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-200",
              heroView === v ? "bg-accent text-white" : "text-text-tertiary hover:text-text-primary"
            )}
          >
            {v}
          </button>
        ))}
      </div>

      {/* ── Section 1: Initial Hero ───────────────────────────────────────── */}
      {heroView === "standard" ? (
        <section
          ref={heroRef}
          className="relative flex min-h-screen flex-col items-start justify-end overflow-hidden px-6 pb-20 pt-32 md:px-16 md:pb-24"
          aria-label="Hero"
        >
          {heroBgImageSrc && (
            <div className="absolute inset-0">
              <Image
                src={heroBgImageSrc}
                alt={heroBgImageAlt}
                fill
                priority
                sizes="100vw"
                className="object-cover object-center"
                draggable={false}
              />
              {/* Dark scrim so the headline stays legible over the photo */}
              <div className="absolute inset-0 bg-bg-primary/70" />
              <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/40 to-bg-primary/10" />
            </div>
          )}

          {/* Drafting grid overlay */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(to right,rgba(240,242,245,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,242,245,1) 1px,transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Tagline */}
          <p className="hero-tagline mb-6 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent md:text-[12px]">
            — {tagline}
          </p>

          {/* Massive headline — each character split for GSAP */}
          <div className="overflow-hidden" aria-label={`${headlineTop} ${headlineBottom}`}>
            <h1 className="font-display text-[22vw] uppercase leading-[0.82] tracking-[-0.02em] text-text-primary md:text-[17vw] lg:text-[14vw]">
              {/* Line 1 — characters split individually */}
              <span className="block overflow-hidden">
                <SplitText text={headlineTop} />
              </span>
              {/* Line 2 — offset right for asymmetric composition */}
              <span className="block overflow-hidden pl-[5vw] md:pl-[8vw]">
                <SplitText text={headlineBottom} />
              </span>
            </h1>
          </div>

          {/* Red accent line */}
          <div
            ref={redLineRef}
            className="my-8 h-[2px] w-32 origin-left bg-accent md:my-10 md:w-48"
            aria-hidden="true"
          />

          {/* Descriptor + CTA — stacked, left-aligned under the headline */}
          <div className="hero-descriptor flex max-w-xl flex-col gap-8">
            <div className="flex max-w-sm flex-col gap-4">
              {descriptorHeading && (
                <p className="font-condensed text-lg font-bold uppercase tracking-wide text-text-primary md:text-xl">
                  {descriptorHeading}
                </p>
              )}
              <p className="whitespace-pre-line font-body text-base font-light leading-relaxed text-text-secondary md:text-lg">
                {descriptor}
              </p>
            </div>

            <div className="hero-cta flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
              <button
                onClick={onExploreClick}
                className="group relative overflow-hidden bg-accent px-8 py-4 font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-transform hover:scale-[1.03] active:scale-95"
              >
                <span className="relative z-10">View Our Work</span>
                {/* Shimmer on hover */}
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
              </button>

              <button className="group flex items-center gap-3 font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-text-secondary transition-colors hover:text-text-primary">
                <span>Our Philosophy</span>
                <div className="h-px w-8 bg-accent/40 transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
              </button>
            </div>
          </div>

          {/* Bottom-left architectural metadata */}
          <div className="hero-meta-left absolute bottom-8 left-6 md:left-16">
            <p className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
              Est. 2012 · Chennai, India
            </p>
          </div>

          {/* Scroll cue */}
          <div
            ref={scrollCueRef}
            className="absolute bottom-8 right-6 flex flex-col items-center gap-2 md:right-16"
            aria-hidden="true"
          >
            <p className="font-condensed text-[9px] uppercase tracking-[0.4em] text-text-tertiary">
              {scrollLabel}
            </p>
            {/* Animated arrow */}
            <svg
              className="scroll-arrow text-accent"
              width="16"
              height="24"
              viewBox="0 0 16 24"
              fill="none"
            >
              <line x1="8" y1="0" x2="8" y2="18" stroke="currentColor" strokeWidth="1.5" />
              <polyline
                points="3,13 8,19 13,13"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </section>
      ) : (
        // Alternate — page-15 reference: 2-column split, left dark text
        // panel, right full-height bright photo with no scrim/watermark.
        <section
          ref={heroRef}
          className="relative flex min-h-screen w-full flex-col md:flex-row"
          aria-label="Hero"
        >
          <div className="relative flex w-full flex-col justify-center gap-8 bg-bg-primary px-6 py-24 md:w-[42%] md:px-16">
            <div className="h-[2px] w-10 origin-left bg-accent" aria-hidden="true" />

            <h1 className="font-display text-5xl uppercase leading-[1.05] text-text-primary md:text-6xl lg:text-7xl">
              {["Design.", "Build.", "Deliver."].map((line, i) => (
                <span key={i} className="block overflow-hidden">
                  <SplitText text={line} />
                </span>
              ))}
            </h1>

            <div className="hero-descriptor flex max-w-sm flex-col gap-4">
              {descriptorHeading && (
                <p className="font-condensed text-lg font-bold uppercase tracking-wide text-text-primary md:text-xl">
                  {descriptorHeading}
                </p>
              )}
              <p className="whitespace-pre-line font-body text-base font-light leading-relaxed text-text-secondary md:text-lg">
                {descriptor}
              </p>
            </div>

            <p className="font-condensed text-[11px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
              Jeddah · Saudi Arabia
            </p>

            <div className="hero-cta flex shrink-0 flex-col gap-4 sm:flex-row sm:items-center">
              <Link
                href="/projects"
                className="group relative overflow-hidden bg-accent px-8 py-4 text-center font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-transform hover:scale-[1.03] active:scale-95"
              >
                <span className="relative z-10">View Projects</span>
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
              </Link>

              <Link
                href="/contact"
                className="border border-text-primary/30 px-8 py-4 text-center font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-text-primary transition-colors hover:bg-text-primary hover:text-bg-primary"
              >
                Start a Project
              </Link>
            </div>
          </div>

          <div className="relative h-[50vh] w-full md:h-auto md:min-h-screen md:w-[58%]">
            {heroBgImageSrc && (
              <Image
                src={heroBgImageSrc}
                alt={heroBgImageAlt}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 58vw"
                className="object-cover object-center"
                draggable={false}
              />
            )}
          </div>
        </section>
      )}

      {/* ── Section 2: Scrollytelling Pin ─────────────────────────────────── */}
      <section
        ref={pinRef}
        className="relative h-screen w-full will-change-transform"
        aria-label="Featured project reveal"
      >
        {/* Full-bleed image container — clip-path animated by GSAP */}
        <div
          ref={clipRef}
          className="absolute inset-0"
          style={{
            clipPath: "inset(0 100% 0 0)", // starts hidden, GSAP opens it
            willChange: "clip-path",
          }}
        >
          {/* Image wrapper for parallax scale */}
          <div
            ref={imageRef}
            className="absolute inset-[-5%] will-change-transform"
            style={{ scale: 1.15 }} // GSAP will animate this
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
              draggable={false}
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-transparent to-transparent opacity-70" />
            <div className="absolute inset-0 bg-linear-to-r from-bg-primary/60 to-transparent opacity-50" />
          </div>

          {/* Architectural frame lines — top and bottom */}
          <div className="absolute left-6 right-6 top-8 h-px bg-white/10 md:left-16 md:right-16" />
          <div className="absolute bottom-8 left-6 right-6 h-px bg-white/10 md:left-16 md:right-16" />
        </div>

        {/* ── Stats panel — slides in from right after reveal ─────────────── */}
        <div
          ref={statsRef}
          className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 md:right-16"
        >
          <div className="flex flex-col gap-8">
            {stats.map((stat, i) => (
              <div key={stat.label} className="stat-item text-right">
                <p className="font-display text-5xl leading-none text-text-primary md:text-6xl">
                  <span
                    ref={(el) => { counterRefs.current[i] = el; }}
                    aria-label={stat.value}
                  >
                    {stat.value}
                  </span>
                  <span className="text-accent">+</span>
                </p>
                <p className="mt-1 font-condensed text-[10px] uppercase tracking-[0.4em] text-text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Featured project tag — slides in from left ───────────────────── */}
        <div
          ref={projectTagRef}
          className="absolute bottom-12 left-6 opacity-0 md:left-16"
        >
          {/* Red accent vertical line */}
          <div className="mb-4 h-12 w-[2px] bg-accent" />

          <p className="font-condensed text-[10px] uppercase tracking-[0.5em] text-accent">
            Featured Project · {featuredProject.index}
          </p>
          <h2 className="mt-2 font-display text-3xl uppercase leading-tight text-text-primary md:text-4xl">
            {featuredProject.title}
          </h2>
          <div className="mt-3 flex items-center gap-4 font-condensed text-[11px] uppercase tracking-widest text-text-secondary">
            <span>{featuredProject.location}</span>
            <span className="text-accent">·</span>
            <span>{featuredProject.year}</span>
          </div>
        </div>

        {/* Blueprint corner marks */}
        {(["top-8 left-8", "top-8 right-8", "bottom-8 left-8", "bottom-8 right-8"] as const).map(
          (pos, i) => (
            <span
              key={i}
              className={cn("absolute h-4 w-4 border-white/20", "hidden md:block", pos, {
                "border-l border-t": i === 0,
                "border-r border-t": i === 1,
                "border-b border-l": i === 2,
                "border-b border-r": i === 3,
              })}
              aria-hidden="true"
            />
          )
        )}
      </section>
    </div>
  );
}
