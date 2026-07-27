import type { Metadata } from "next";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsGrid from "@/components/sections/ProjectsGrid";
import StatsSection from "@/components/sections/StatsSection";
import PhilosophyQuote from "@/components/sections/PhilosophyQuote";
import ClientsSection from "@/components/sections/ClientsSection";
import ScrollCube from "@/components/ui/ScrollCube";

export const metadata: Metadata = {
  title: "Spatial & Structural Design",
  description: "Architectural landmarks built for permanence. Monolithic form meeting technical precision — 47 structures across 8 metropolitan cities.",
};

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

      {/* Cinematic Philosophy Quote */}
      <PhilosophyQuote />

      {/* Studio Statistics Counter */}
      <StatsSection />

      {/* ENBUILT Architectural Portfolio Grid */}
      <ProjectsGrid />

      {/* Interactive Architectural Showcase */}
      <ScrollCube />

      {/* Global Client Marquee */}
      <ClientsSection />
    </main>
  );
}
