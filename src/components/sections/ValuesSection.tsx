"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const VALUES = [
  {
    index: "01",
    title: "Structural Honesty",
    body: "We never hide what a building is made of. Concrete, steel, and timber are left raw, allowed to age, permitted to tell their own story.",
  },
  {
    index: "02",
    title: "Civic Responsibility",
    body: "Every building is a gift or an imposition to its neighbourhood. We design as if the street matters as much as the client — because it does.",
  },
  {
    index: "03",
    title: "Technical Precision",
    body: "Beautiful intention without technical rigour is poetry, not architecture. We hold both simultaneously, without compromise in either direction.",
  },
  {
    index: "04",
    title: "Material Intelligence",
    body: "We specify materials we understand — their source, their behaviour across time, their environmental footprint. No material is chosen for appearance alone.",
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ValuesSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const founderRef  = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const valuesRef   = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Values items stagger in
      const items = valuesRef.current?.querySelectorAll(".value-item");
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

      // Founder image clip reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            duration: 1.3,
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
      const founderEls = founderRef.current?.querySelectorAll(".founder-el");
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

          {/* Left — label + intro */}
          <div>
            <p className="mb-6 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
              — Who We Are
            </p>
            <h2 className="font-display text-5xl uppercase leading-none text-text-primary md:text-6xl">
              A Studio<br />Defined By<br />Conviction.
            </h2>
            <div className="mt-8 h-[2px] w-16 bg-accent" aria-hidden="true" />
            <p className="mt-8 font-body text-lg font-light leading-relaxed text-text-secondary">
              ENBUILT was founded on a single belief: that architecture should be an act of honesty — with materials, with structure, with the city, and with the people who inhabit our buildings.
            </p>
            <p className="mt-4 font-body text-base font-light leading-relaxed text-text-secondary">
              We are not a large practice. We are a precise one. Every project receives the same level of attention regardless of scale. Every material decision is made deliberately. Every line drawn is defended.
            </p>
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
        <div className="mx-auto max-w-7xl grid grid-cols-1 gap-16 md:grid-cols-[1fr_1fr] md:gap-24 items-center">

          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] overflow-hidden border border-white/5"
            style={{ clipPath: "inset(0 100% 0 0)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format"
              alt="Ar. Vikram Seth — Founding Principal"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover grayscale"
            />
            {/* Accent overlay */}
            <div className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
            {/* Bottom tag */}
            <div className="absolute bottom-6 left-6">
              <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
                Founding Principal
              </p>
              <p className="font-display text-2xl uppercase text-white">
                Ar. Vikram Seth
              </p>
            </div>
          </div>

          {/* Text */}
          <div className="flex flex-col gap-8">
            <div className="founder-el">
              <p className="mb-4 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
                — The Founder
              </p>
              <h2 className="font-display text-4xl uppercase leading-tight text-text-primary md:text-5xl">
                Built On<br />Principle
              </h2>
            </div>

            <p className="founder-el font-editorial text-2xl italic leading-relaxed text-text-secondary">
              "Architecture fails when it stops asking difficult questions. The best buildings are the ones that made the architect uncomfortable."
            </p>

            <div className="founder-el h-px w-24 bg-accent" aria-hidden="true" />

            <p className="founder-el font-body text-base font-light leading-relaxed text-text-secondary">
              With over 18 years of practice across India, the UAE, and Southeast Asia, Ar. Vikram Seth founded ENBUILT in 2012 after recognising that the most enduring architecture comes not from trend-following but from a relentless commitment to structural honesty and civic responsibility.
            </p>

            <p className="founder-el font-body text-base font-light leading-relaxed text-text-secondary">
              He holds an M.Arch from ETH Zürich and a B.Arch from CEPT Ahmedabad. He has been a visiting critic at NID and has lectured at institutions across the Gulf region on the ethics of architectural practice.
            </p>

            <div className="founder-el grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { value: "18+", label: "Years Experience" },
                { value: "M.Arch", label: "ETH Zürich" },
                { value: "3", label: "Awards" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl text-text-primary">{stat.value}</p>
                  <p className="font-condensed text-[9px] uppercase tracking-[0.4em] text-text-tertiary mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
