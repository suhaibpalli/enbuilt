"use client";

import { use, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/components/ui/Logo";

// Register ScrollTrigger globally once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home({ 
  params, 
  searchParams 
}: { 
  params: Promise<any>; 
  searchParams: Promise<any>; 
}) {
  const _params = use(params);
  const _searchParams = use(searchParams);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate hero content
    gsap.from(".hero-content > *", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1.4,
      ease: "power4.out",
      delay: 0.8
    });

    // Subtle parallax/float for the background logo
    gsap.to(".bg-logo-watermark", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  }, { scope: container });

  return (
    <div ref={container} className="relative min-h-screen bg-bg-primary text-text-primary overflow-hidden font-body">
      {/* Background Logo Watermark */}
      <div className="bg-logo-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] opacity-[0.04] pointer-events-none select-none text-text-primary transition-colors duration-500">
        <Logo className="w-full h-auto" />
      </div>

      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="hero-content max-w-[1200px]">
          <div className="mb-8 flex items-center justify-center gap-6 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
            <span className="opacity-60">Architectural Evolution</span>
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span className="opacity-60">Technical Precision</span>
          </div>
          <h1 className="mb-12 text-[15vw] lg:text-[12rem] font-display uppercase leading-[0.8] tracking-[-0.02em] text-text-primary">
            EN<span className="text-accent">BUILT</span>
          </h1>
          <p className="mx-auto mb-20 max-w-2xl text-xl font-light leading-relaxed text-text-secondary md:text-2xl">
            Defining the intersection of <span className="text-text-primary">monolithic form</span> and human experience. 
            Crafting architectural landmarks with absolute technical precision 
            and a commitment to permanence.
          </p>
          
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:justify-center font-condensed text-[12px] font-bold tracking-[0.3em] uppercase">
            <button className="group relative overflow-hidden bg-accent px-12 py-5 text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_var(--accent-glow)]">
              <span className="relative z-10">Explore Structures</span>
              <div className="absolute inset-0 translate-y-full bg-white/10 transition-transform group-hover:translate-y-0" />
            </button>
            <button className="group flex items-center gap-4 text-text-secondary transition-all hover:text-text-primary">
              <span>Firm Philosophy</span>
              <div className="h-[2px] w-12 bg-accent/30 transition-all group-hover:w-20 group-hover:bg-accent" />
            </button>
          </div>
        </div>

        {/* Technical Data Overlay */}
        <div className="absolute bottom-16 left-16 hidden lg:block font-condensed text-[10px] text-text-secondary uppercase tracking-[0.4em] text-left">
          <p className="mb-1 text-accent font-bold">Phase 01</p>
          <p>Structural Foundation</p>
          <p className="mt-2 mb-1 text-accent font-bold">Phase 02</p>
          <p>Material Framework</p>
        </div>

        <div className="absolute bottom-16 right-16 hidden lg:block font-condensed text-[10px] text-text-secondary uppercase tracking-[0.4em] text-right">
          <p className="text-accent font-bold">Concept</p>
          <p>Built for Permanence</p>
          <p className="mt-4 opacity-30">© 2026 ENBUILT STUDIO</p>
        </div>
      </section>

      {/* Philosophy Moment */}
      <section className="py-40 px-6 border-y border-border bg-bg-secondary/30 relative">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-condensed text-accent text-[12px] uppercase tracking-[0.5em] mb-8 block font-bold">Our Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-editorial italic text-text-primary leading-tight">
            "Architecture should speak of its time and place, but yearn for timelessness through structural integrity."
          </h2>
          <div className="mt-12 h-px w-24 bg-accent mx-auto" />
        </div>
      </section>

      {/* Grid Placeholder */}
      <section className="py-40 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-16">
            <h3 className="font-display text-5xl text-text-primary uppercase tracking-tight">Recent Works</h3>
            <span className="font-condensed text-text-secondary text-sm tracking-widest uppercase mb-2">Selected Projects / 01-06</span>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative aspect-3/4 bg-bg-secondary border border-border overflow-hidden transition-all hover:border-accent/50">
                <div className="absolute inset-0 bg-linear-to-t from-bg-primary to-transparent opacity-60" />
                <div className="absolute bottom-8 left-8">
                  <span className="font-condensed text-accent text-[10px] tracking-widest uppercase mb-2 block font-bold">Structure {i}</span>
                  <span className="font-display text-2xl text-text-primary uppercase tracking-tight">Monolith 0{i}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
