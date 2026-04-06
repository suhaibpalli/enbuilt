"use client";

import AboutHero from "@/components/sections/AboutHero";
import HorizontalPhilosophy from "@/components/sections/HorizontalPhilosophy";
import TeamSection from "@/components/sections/TeamSection";
import AwardsStrip from "@/components/sections/AwardsStrip";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="bg-bg-primary">
      {/* ── 01: Hero ── */}
      <AboutHero />

      {/* ── 02: Awards Marquee ── */}
      <AwardsStrip />

      {/* ── 03: Philosophy (Horizontal Scroll) ── */}
      <HorizontalPhilosophy />

      {/* ── 04: Team Grid ── */}
      <TeamSection />

      {/* ── 05: Final CTA ── */}
      <section className="relative py-40 md:py-60 px-6 md:px-20 text-center bg-bg-secondary border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <span className="font-condensed text-accent text-[12px] uppercase tracking-[0.5em] font-bold mb-8 block">
            — Next Chapter
          </span>
          <h2 className="font-display text-5xl md:text-8xl text-text-primary uppercase leading-none mb-12">
            Build Something<br />That Lasts.
          </h2>
          <Link 
            href="/contact"
            className="group relative inline-flex items-center gap-6 px-12 py-6 bg-accent overflow-hidden transition-transform hover:scale-105"
          >
            <span className="relative z-10 font-condensed text-[12px] font-bold uppercase tracking-[0.3em] text-white">
              Start a Conversation
            </span>
            <div className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
            <svg 
              className="relative z-10 text-white transition-transform group-hover:translate-x-2" 
              width="24" height="24" viewBox="0 0 24 24" fill="none"
            >
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </section>
    </main>
  );
}
