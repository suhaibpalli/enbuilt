"use client";

import { useRef } from "react";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsGrid from "@/components/sections/ProjectsGrid";

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

      {/* ENBUILT Architectural Grid */}
      <ProjectsGrid />
    </main>
  );
}
