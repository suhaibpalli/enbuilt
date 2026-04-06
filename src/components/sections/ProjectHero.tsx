"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ProjectHeroProps {
  title: string;
  subtitle: string;
  location: string;
  year: string;
  area: string;
  typology: string;
  imageSrc: string;
}

function splitIntoChars(text: string, className?: string): React.ReactNode {
  return text.split("").map((char, i) => (
    <span
      key={i}
      className={cn("split-char inline-block", className)}
      aria-hidden={char === " " ? undefined : "true"}
      style={{ display: char === " " ? "inline" : "inline-block" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export default function ProjectHero({
  title,
  subtitle,
  location,
  year,
  area,
  typology,
  imageSrc,
}: ProjectHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = titleRef.current?.querySelectorAll(".split-char");
      const charArray = chars ? Array.from(chars) : [];
      const metaChildren = metaRef.current?.children ? Array.from(metaRef.current.children) : [];
      
      // Initial states
      if (charArray.length) gsap.set(charArray, { yPercent: 110, opacity: 0 });
      if (metaChildren.length) gsap.set(metaChildren, { y: 20, opacity: 0 });

      // Entrance animation
      const tl = gsap.timeline({ delay: 0.5 });
      
      if (charArray.length) {
        tl.to(charArray, {
          yPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: { amount: 0.5 },
        });
      }

      if (metaChildren.length) {
        tl.to(
          metaChildren,
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.6"
        );
      }

      // Scroll Parallax
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: 15,
          scale: 1.1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Fade out on scroll
      const elementsToFade = [titleRef.current, metaRef.current].filter(Boolean) as Element[];
      if (elementsToFade.length) {
        gsap.to(elementsToFade, {
          opacity: 0,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "50% top",
            scrub: true,
          },
        });
      }
    },
    { scope: containerRef }
  );

  const metaItems = [
    { label: "Location", value: location },
    { label: "Year", value: year },
    { label: "Area", value: area },
    { label: "Typology", value: typology },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-bg-primary"
    >
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0 h-[120%] w-full">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-start justify-end px-6 pb-20 md:px-16 md:pb-32">
        <div ref={titleRef} className="mb-8">
          <p className="font-condensed text-[12px] font-bold uppercase tracking-[0.5em] text-accent mb-4">
            Project Case Study
          </p>
          <h1 className="font-display text-[15vw] uppercase leading-[0.85] tracking-tight text-text-primary md:text-[10vw]">
            {splitIntoChars(title)}
          </h1>
          <p className="mt-4 font-editorial text-2xl italic text-text-secondary md:text-4xl max-w-3xl">
            {subtitle}
          </p>
        </div>

        {/* Technical Metadata Row */}
        <div
          ref={metaRef}
          className="grid w-full grid-cols-2 gap-8 border-t border-white/10 pt-8 md:grid-cols-4"
        >
          {metaItems.map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
                {item.label}
              </span>
              <span className="font-condensed text-sm font-bold uppercase tracking-widest text-text-primary">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Cue */}
      <div className="absolute bottom-10 right-10 hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <span className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary vertical-text">
            Scroll to explore
          </span>
          <div className="h-20 w-px bg-linear-to-b from-accent to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}</style>
    </section>
  );
}
