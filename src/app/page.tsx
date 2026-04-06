"use client";

import { useRef } from "react";
import HeroSection from "@/components/sections/HeroSection";

export default function Home() {
  return (
    <main className="relative bg-bg-primary">
      {/* 
          ENBUILT Hero Section 
          - Pinning: 200vh
          - Entrance: SplitText + Red Line
          - Scroll: Blueprint reveal + Parallax
      */}
      <HeroSection 
        headlineTop="EN"
        headlineBottom="BUILT"
        tagline="Architectural Evolution · Structural Precision"
        descriptor="We define the intersection of monolithic form and human experience. Crafting architectural landmarks with absolute technical precision and a commitment to permanence."
        stats={[
          { value: "47", label: "Structures Defined" },
          { value: "12", label: "Years of Practice" },
          { value: "08", label: "Metropolitan Cities" },
          { value: "03", label: "Design Awards" },
        ]}
        featuredProject={{
          index: "01",
          title: "The Monolith Center",
          location: "Dubai, UAE",
          year: "2024"
        }}
      />

      {/* Philosophy Moment */}
      <section className="py-40 px-6 border-y border-border bg-bg-secondary/30 relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <span className="font-condensed text-accent text-[12px] uppercase tracking-[0.5em] mb-8 block font-bold">Our Philosophy</span>
          <h2 className="text-4xl md:text-6xl font-editorial italic text-text-primary leading-tight">
            "Architecture should speak of its time and place, but yearn for timelessness through structural integrity."
          </h2>
          <div className="mt-12 h-px w-24 bg-accent mx-auto" />
        </div>
      </section>

      {/* Simple Grid Placeholder for continuity */}
      <section className="py-40 px-6 relative z-10 bg-bg-primary">
        <div className="mx-auto max-w-7xl">
          <div className="flex justify-between items-end mb-16">
            <h3 className="font-display text-5xl text-text-primary uppercase tracking-tight">Selected Works</h3>
            <span className="font-condensed text-text-secondary text-sm tracking-widest uppercase mb-2">Portfolio / 01-06</span>
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
    </main>
  );
}
