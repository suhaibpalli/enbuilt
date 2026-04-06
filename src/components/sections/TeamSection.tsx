"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

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
];

function TeamCard({ member }: { member: typeof TEAM[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const onMouseEnter = contextSafe(() => {
    gsap.to(imageRef.current, { scale: 1.1, filter: "grayscale(0) brightness(0.5)", duration: 0.6 });
    gsap.to(overlayRef.current, { opacity: 1, duration: 0.4 });
    gsap.to(infoRef.current, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(imageRef.current, { scale: 1, filter: "grayscale(1) brightness(1)", duration: 0.6 });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.4 });
    gsap.to(infoRef.current, { y: 20, opacity: 0, duration: 0.4, ease: "power3.in" });
  });

  return (
    <div
      ref={cardRef}
      className="group relative aspect-[3/4] w-full overflow-hidden bg-bg-secondary border border-white/5"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Grayscale Portrait */}
      <div ref={imageRef} className="absolute inset-0 grayscale transition-all duration-700">
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>

      {/* Red Technical Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-accent/20 opacity-0 pointer-events-none transition-opacity" />

      {/* Bottom Info (Always Visible Name/Role) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-black/80 to-transparent">
        <span className="font-condensed text-accent text-[10px] uppercase tracking-widest font-bold mb-1 block">
          {member.id} / {member.role}
        </span>
        <h4 className="font-display text-2xl text-text-primary uppercase tracking-tight">
          {member.name}
        </h4>
        
        {/* Hover-only detail */}
        <div ref={infoRef} className="mt-4 opacity-0 translate-y-5">
          <p className="font-condensed text-[11px] text-white uppercase tracking-[0.2em] border-t border-white/20 pt-4">
            Spec: {member.specialization}
          </p>
        </div>
      </div>

      {/* Corner Mark */}
      <div className="absolute top-4 right-4 h-2 w-2 bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

export default function TeamSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = containerRef.current?.querySelectorAll(".team-card-wrapper");
      if (!cards?.length) return;

      gsap.from(cards, {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="relative bg-bg-primary py-32 md:py-48 px-6 md:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="font-condensed text-accent text-[11px] font-bold uppercase tracking-[0.5em] mb-4">
              — The Collective
            </p>
            <h2 className="font-display text-5xl md:text-8xl text-text-primary uppercase leading-none">
              OUR TEAM
            </h2>
          </div>
          <p className="font-body text-text-secondary max-w-sm text-right leading-relaxed hidden md:block">
            A diverse collective of architects, engineers, and researchers united by a 
            shared obsession with structural honesty and spatial resonance.
          </p>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member) => (
            <div key={member.id} className="team-card-wrapper">
              <TeamCard member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
