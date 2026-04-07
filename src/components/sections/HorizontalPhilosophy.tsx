"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHY_PANELS = [
  {
    id: "01",
    title: "Structural Honesty",
    label: "Core Methodology",
    description: "We believe architecture is the art of revealing, not concealing. Every beam, joint, and surface is a testament to the structural logic that governs the build.",
    image: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80&auto=format",
  },
  {
    id: "02",
    title: "Material Sincerity",
    label: "Tactile Experience",
    description: "Raw concrete, oxidized steel, and reclaimed timber. Our palette is defined by materials that age with grace, telling the story of time and environment.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format",
  },
  {
    id: "03",
    title: "Human Resonance",
    label: "Spatial Psychology",
    description: "Design is failing if it doesn't move the soul. We choreograph light and shadow to create atmospheres that resonate with the visceral human condition.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80&auto=format",
  },
  {
    id: "04",
    title: "Future Legacy",
    label: "Enduring Vision",
    description: "Sustainability is not a feature; it is a prerequisite. We build structures designed to outlast generations, becoming part of the permanent urban fabric.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format",
  },
];

export default function HorizontalPhilosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !containerRef.current) return;

      const panels = containerRef.current.querySelectorAll(".philosophy-panel");
      if (!panels.length) return;

      // ── Main horizontal scroll tween ──────────────────────────────────────
      const horizontalTween = gsap.to(containerRef.current, {
        x: () => -(containerRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${containerRef.current!.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // ── Per-panel reveals — pass containerAnimation correctly ──────────────
      panels.forEach((panel) => {
        const title = panel.querySelector(".panel-title");
        const desc  = panel.querySelector(".panel-desc");
        const img   = panel.querySelector(".panel-image");

        const targets = [title, desc, img].filter(Boolean) as Element[];
        if (!targets.length) return;

        gsap.fromTo(
          targets,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horizontalTween, // ✅ passes the actual tween
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-bg-secondary"
    >
      {/* Background Grid Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: "linear-gradient(to right,rgba(240,242,245,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,242,245,1) 1px,transparent 1px)",
             backgroundSize: "100px 100px"
           }}
      />

      <div
        ref={containerRef}
        className="flex h-screen w-max items-center"
      >
        {/* Intro Panel */}
        <div className="flex h-full w-screen flex-shrink-0 flex-col justify-center px-6 md:px-20">
          <span className="font-condensed text-accent text-[12px] uppercase tracking-[0.5em] font-bold mb-6">
            — Our Manifesto
          </span>
          <h2 className="font-display text-[12vw] md:text-[8vw] text-text-primary uppercase leading-[0.9]">
            THE<br />PHILOSOPHY
          </h2>
          <div className="mt-12 flex items-center gap-6">
            <div className="h-px w-24 bg-accent" />
            <span className="font-condensed text-[10px] text-text-tertiary uppercase tracking-widest">
              Scroll horizontally to explore
            </span>
          </div>
        </div>

        {/* Philosophy Panels */}
        {PHILOSOPHY_PANELS.map((panel, idx) => (
          <div
            key={panel.id}
            className="philosophy-panel relative flex h-full w-[80vw] flex-shrink-0 items-center px-10 md:px-24 border-l border-white/5"
          >
            <div className="flex flex-col md:flex-row items-center gap-16 w-full">
              {/* Image side */}
              <div className="panel-image relative aspect-[4/5] w-full md:w-[400px] overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
                <Image
                  src={panel.image}
                  alt={panel.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-accent/10 mix-blend-overlay" />
              </div>

              {/* Text side */}
              <div className="flex flex-col max-w-xl">
                <span className="font-condensed text-accent text-[10px] uppercase tracking-[0.4em] font-bold mb-4">
                  {panel.id} / {panel.label}
                </span>
                <h3 className="panel-title font-display text-5xl md:text-7xl text-text-primary uppercase mb-8 leading-none">
                  {panel.title}
                </h3>
                <p className="panel-desc font-body text-lg md:text-xl text-text-secondary leading-relaxed">
                  {panel.description}
                </p>
              </div>
            </div>

            {/* Vertical Panel Number */}
            <span className="absolute bottom-10 right-10 font-display text-[10vw] text-white/5 pointer-events-none">
              {panel.id}
            </span>
          </div>
        ))}

        {/* Outro Buffer */}
        <div className="w-[20vw] h-full" />
      </div>
    </section>
  );
}
