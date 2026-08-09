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
        tagline="Engineering Production & Services"
        descriptorHeading="Designed with Purpose. Built with Precision."
        descriptor={"Enbuilt is a Saudi-based architecture, interior design, and turnkey contracting company delivering thoughtfully designed, expertly executed spaces across Saudi Arabia.\n\nFrom initial concept to final handover, we bring design, construction, and project delivery together under one roof."}
        heroBgImageSrc="https://images.unsplash.com/photo-1663900108404-a05e8bf82cda?w=1800&q=85&auto=format"
        heroBgImageAlt="Riyadh skyline at night, featuring the Kingdom Centre Tower — ENBUILT"
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
