"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    index: "01",
    title: "Purposeful Design",
    body: "We create spaces that are visually distinctive, functional, practical, and aligned with each client's objectives.",
  },
  {
    index: "02",
    title: "Reliable Execution",
    body: "We approach every project with structured planning, technical coordination, and accountability from beginning to completion.",
  },
  {
    index: "03",
    title: "In-House Quality",
    body: "Our own fabrication capability gives us closer control over materials, workmanship, finishes, and production quality.",
  },
  {
    index: "04",
    title: "Commitment to Delivery",
    body: "We value our clients' time and work carefully to maintain agreed schedules without compromising the quality of the finished project.",
  },
  {
    index: "05",
    title: "Lasting Relationships",
    body: "We aim to become a long-term partner to our clients by providing responsive communication, dependable service, and continued support beyond project handover.",
  },
];

interface Founder {
  name: string;
  role: string;
  quote?: string;
  bio: string[];
  stats?: { value: string; label: string }[];
  imageSrc?: string;
  placeholder?: boolean;
}

const FOUNDERS: Founder[] = [
  {
    name: "Ar. Vikram Seth",
    role: "Founding Principal",
    quote: "Architecture fails when it stops asking difficult questions. The best buildings are the ones that made the architect uncomfortable.",
    bio: [
      "With over 18 years of practice across India, the UAE, and Southeast Asia, Ar. Vikram Seth founded ENBUILT in 2012 after recognising that the most enduring architecture comes not from trend-following but from a relentless commitment to structural honesty and civic responsibility.",
      "He holds an M.Arch from ETH Zürich and a B.Arch from CEPT Ahmedabad. He has been a visiting critic at NID and has lectured at institutions across the Gulf region on the ethics of architectural practice.",
    ],
    stats: [
      { value: "18+", label: "Years Experience" },
      { value: "M.Arch", label: "ETH Zürich" },
    ],
    imageSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format",
  },
  {
    name: "Name Pending",
    role: "Co-Founder",
    bio: ["Bio and portrait to be added once details are provided."],
    placeholder: true,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ValuesSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const founderRef  = useRef<HTMLDivElement>(null);
  const valuesRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = valuesRef.current?.querySelectorAll(".value-item");
      const founderImages = founderRef.current?.querySelectorAll(".founder-image");
      const founderEls = founderRef.current?.querySelectorAll(".founder-el");

      if (prefersReducedMotion()) {
        if (items?.length) gsap.set(items, { opacity: 1, x: 0 });
        if (founderImages?.length) {
          gsap.set(founderImages, { clipPath: "inset(0% 0% 0% 0%)" });
        }
        if (founderEls?.length) gsap.set(founderEls, { opacity: 1, y: 0 });
        return;
      }

      // Values items stagger in
      if (items?.length) {
        gsap.fromTo(
          items,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 75%",
              once: true,
            },
          }
        );
      }

      // Founder image clip reveal — one per card
      if (founderImages?.length) {
        gsap.fromTo(
          founderImages,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 0.75,
            stagger: 0.15,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: founderRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }

      // Founder text
      if (founderEls?.length) {
        gsap.fromTo(
          founderEls,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: founderRef.current,
              start: "top 70%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative w-full bg-bg-primary">

      {/* ── Who We Are + Values ─────────────────────────────────────────── */}
      <div className="border-b border-border py-32 px-6 md:py-40 md:px-16">
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-20 md:grid-cols-[1fr_1.5fr]">

          {/* Left — label + heading */}
          <div>
            <p className="mb-6 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
              — Our Values
            </p>
            <h2 className="font-display text-5xl uppercase leading-none text-text-primary md:text-6xl">
              What We<br />Stand For.
            </h2>
            <div className="mt-8 h-[2px] w-16 bg-accent" aria-hidden="true" />
          </div>

          {/* Right — values */}
          <div ref={valuesRef} className="flex flex-col gap-0 border-t border-border">
            {VALUES.map((v) => (
              <div
                key={v.index}
                className="value-item group border-b border-border py-8 pr-4 flex gap-6"
              >
                <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-accent shrink-0 mt-1">
                  {v.index}
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase leading-tight text-text-primary group-hover:text-accent transition-colors duration-200 md:text-2xl">
                    {v.title}
                  </h3>
                  <p className="mt-3 font-body text-base font-light leading-relaxed text-text-secondary">
                    {v.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Founder Spotlight ───────────────────────────────────────────── */}
      <div ref={founderRef} className="py-32 px-6 md:py-40 md:px-16 bg-bg-secondary/40">
        <div className="mx-auto max-w-7xl">
          <div className="founder-el mb-16 max-w-2xl">
            <p className="mb-4 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
              — The Founders
            </p>
            <h2 className="font-display text-4xl uppercase leading-tight text-text-primary md:text-5xl">
              Built On<br />Principle
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-16">
            {FOUNDERS.map((founder) => (
              <div key={founder.name} className="flex flex-col gap-8">
                {/* Image */}
                <div
                  className="founder-image relative aspect-[3/4] overflow-hidden border border-white/5"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  {founder.placeholder ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-bg-tertiary">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full border border-border">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" className="text-text-tertiary" />
                          <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" className="text-text-tertiary" />
                        </svg>
                      </div>
                      <p className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
                        Portrait Coming Soon
                      </p>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={founder.imageSrc!}
                        alt={`${founder.name} — ${founder.role}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover grayscale"
                      />
                      <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
                    </>
                  )}
                  {/* Bottom tag */}
                  <div className="absolute bottom-6 left-6">
                    <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
                      {founder.role}
                    </p>
                    <p className="font-display text-2xl uppercase text-white">
                      {founder.name}
                    </p>
                  </div>
                </div>

                {/* Text */}
                <div className="founder-el flex flex-col gap-6">
                  {founder.quote && (
                    <>
                      <p className="font-editorial text-xl italic leading-relaxed text-text-secondary">
                        "{founder.quote}"
                      </p>
                      <div className="h-px w-24 bg-accent" aria-hidden="true" />
                    </>
                  )}

                  {founder.bio.map((paragraph, i) => (
                    <p
                      key={i}
                      className="font-body text-base font-light leading-relaxed text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}

                  {founder.stats && (
                    <div className="grid grid-cols-2 gap-6 border-t border-border pt-6">
                      {founder.stats.map((stat) => (
                        <div key={stat.label}>
                          <p className="font-display text-2xl text-text-primary">{stat.value}</p>
                          <p className="font-condensed text-[9px] uppercase tracking-[0.4em] text-text-tertiary mt-1">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
