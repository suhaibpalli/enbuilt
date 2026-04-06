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
  // Sync unwrap params/searchParams to satisfy Next.js 15+ requirements
  const _params = use(params);
  const _searchParams = use(searchParams);
  
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate hero content
    gsap.from(".hero-content > *", {
      y: 40,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: "power4.out",
      delay: 0.5
    });

    // Subtle parallax/float for the background logo
    gsap.to(".bg-logo-watermark", {
      yPercent: -10,
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
    <div ref={container} className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Logo Watermark */}
      <div className="bg-logo-watermark absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] opacity-[0.03] pointer-events-none select-none">
        <Logo className="w-full h-auto text-white" />
      </div>

      {/* Hero Section */}
      <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="hero-content max-w-5xl">
          <div className="mb-6 flex items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/30">
            <span>Spatial Design</span>
            <div className="h-1 w-1 rounded-full bg-white/20" />
            <span>Structural Engineering</span>
          </div>
          <h1 className="mb-10 text-7xl font-light tracking-tight md:text-9xl lg:text-[10rem] leading-[0.9]">
            Form & <br />
            <span className="text-white/20 italic font-serif">Structure.</span>
          </h1>
          <p className="mx-auto mb-16 max-w-2xl text-lg font-light leading-relaxed text-white/50 md:text-xl">
            We define the intersection of monolithic form and human experience. 
            Crafting architectural landmarks with absolute technical precision 
            and a commitment to minimalist permanence.
          </p>
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center font-mono text-[10px] tracking-[0.3em] uppercase">
            <button className="group relative overflow-hidden bg-white px-10 py-5 text-black transition-all">
              <span className="relative z-10">View Portfolio</span>
              <div className="absolute inset-0 translate-y-full bg-black/10 transition-transform group-hover:translate-y-0" />
            </button>
            <button className="group flex items-center gap-3 text-white/60 transition-colors hover:text-white">
              <span>Our Process</span>
              <div className="h-px w-8 bg-white/20 transition-all group-hover:w-12 group-hover:bg-white" />
            </button>
          </div>
        </div>

        {/* Technical Data Overlay */}
        <div className="absolute bottom-12 left-12 hidden lg:block font-mono text-[9px] text-white/20 uppercase tracking-[0.2em] text-left">
          <p>01 / Foundation</p>
          <p>02 / Framework</p>
          <p>03 / Materiality</p>
        </div>

        <div className="absolute bottom-12 right-12 hidden lg:block font-mono text-[9px] text-white/20 uppercase tracking-[0.2em] text-right">
          <p>Built for Permanence</p>
          <p>© 2026 ENBUILT</p>
        </div>
      </section>


      {/* Grid Placeholder */}
      <section className="bg-white/5 py-32 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-white/5 border border-white/10 rounded-3xl" />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
