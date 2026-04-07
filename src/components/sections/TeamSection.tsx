"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TEAM = [
  {
    name: "Ar. Vikram Seth",
    role: "Founding Principal",
    specialization: "Monolithic Systems",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&auto=format",
    id: "01",
  },
  {
    name: "Ar. Sarah Chen",
    role: "Design Director",
    specialization: "Spatial Psychology",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80&auto=format",
    id: "02",
  },
  {
    name: "Eng. David Miller",
    role: "Technical Lead",
    specialization: "Structural Engineering",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80&auto=format",
    id: "03",
  },
  {
    name: "Ar. Elena Rossi",
    role: "Senior Associate",
    specialization: "Material Research",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format",
    id: "04",
  },
  {
    name: "Ar. Rajan Nair",
    role: "Project Architect",
    specialization: "Bioclimatic Design",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&q=80&auto=format",
    id: "05",
  },
  {
    name: "Ar. Priya Mehta",
    role: "Interior Lead",
    specialization: "Adaptive Reuse",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80&auto=format",
    id: "06",
  },
];

function TeamCard({ member }: { member: typeof TEAM[0] }) {
  const cardRef    = useRef<HTMLDivElement>(null);
  const imageRef   = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const onMouseEnter = contextSafe(() => {
    gsap.to(imageRef.current,   { scale: 1.08, filter: "grayscale(0) brightness(0.55)", duration: 0.7, ease: "power3.out" });
    gsap.to(overlayRef.current, { opacity: 1,   duration: 0.4 });
    gsap.to(infoRef.current,    { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(imageRef.current,   { scale: 1, filter: "grayscale(1) brightness(1)", duration: 0.7, ease: "power3.inOut" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4 });
    gsap.to(infoRef.current,    { y: 20, opacity: 0, duration: 0.4, ease: "power3.in" });
  });

  return (
    <div
      ref={cardRef}
      className="group relative aspect-3/4 w-full overflow-hidden bg-bg-secondary border border-white/5"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Portrait */}
      <div ref={imageRef} className="absolute inset-0 grayscale transition-all duration-700">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 16vw"
          className="object-cover object-top"
        />
      </div>

      {/* Red accent overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-accent/15 opacity-0 pointer-events-none" />

      {/* Always-visible base gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent" />

      {/* Bottom Info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <span className="font-condensed text-accent text-[10px] uppercase tracking-widest font-bold mb-1 block">
          {member.id} / {member.role}
        </span>
        <h4 className="font-display text-2xl text-text-primary uppercase tracking-tight">
          {member.name}
        </h4>

        {/* Hover-only specialization detail */}
        <div ref={infoRef} className="mt-4 opacity-0 translate-y-5">
          <div className="h-px w-8 bg-accent mb-3" />
          <p className="font-condensed text-[11px] text-white/70 uppercase tracking-[0.2em]">
            {member.specialization}
          </p>
        </div>
      </div>

      {/* Corner accent — visible on hover */}
      <div className="absolute top-4 right-4 h-2 w-2 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-4 left-4 font-condensed text-[10px] uppercase tracking-[0.3em] text-white/30 group-hover:text-accent transition-colors duration-300">
        EB
      </div>
    </div>
  );
}

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".team-card-wrapper");
      if (!cards?.length) return;

      gsap.fromTo(
        cards,
        { y: 60, opacity: 0, clipPath: "inset(30% 0% 0% 0%)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0%)",
          stagger: 0.1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Header reveal
      const label = headerRef.current?.querySelector(".team-label");
      const title = headerRef.current?.querySelector(".team-title");
      const desc  = headerRef.current?.querySelector(".team-desc");

      if (label && title && desc) {
        gsap.fromTo(
          [label, title, desc],
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section className="relative bg-bg-primary py-32 md:py-48 px-6 md:px-20">
      <div className="mx-auto max-w-[1800px]">
        <div ref={headerRef} className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="team-label font-condensed text-accent text-[11px] font-bold uppercase tracking-[0.5em] mb-4">
              — The Collective
            </p>
            <h2 className="team-title font-display text-5xl md:text-8xl text-text-primary uppercase leading-none">
              OUR TEAM
            </h2>
          </div>
          <p className="team-desc font-body text-text-secondary max-w-sm text-right leading-relaxed hidden md:block">
            A diverse collective of architects, engineers, and researchers united by a
            shared obsession with structural honesty and spatial resonance.
          </p>
        </div>

        {/* 6-member team grid */}
        <div ref={containerRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {TEAM.map((member) => (
            <div key={member.id} className="team-card-wrapper">
              <TeamCard member={member} />
            </div>
          ))}
        </div>

        {/* Bottom marquee of specializations */}
        <div className="mt-16 overflow-hidden border-t border-border pt-8">
          <div className="flex gap-12 whitespace-nowrap">
            {[...TEAM, ...TEAM].map((m, i) => (
              <span
                key={i}
                className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary shrink-0"
              >
                {m.specialization}
                <span className="ml-12 text-accent">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
