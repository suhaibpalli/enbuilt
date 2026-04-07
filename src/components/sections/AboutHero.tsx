"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import SplitText from "@/components/ui/SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const chars = titleRef.current?.querySelectorAll(".split-char");
      const charArray = chars ? Array.from(chars) : [];
      const statsChildren = statsRef.current?.children ? Array.from(statsRef.current.children) : [];

      // Initial states
      if (charArray.length) gsap.set(charArray, { yPercent: 110, opacity: 0 });
      if (statsChildren.length) gsap.set(statsChildren, { y: 20, opacity: 0 });

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

      if (statsChildren.length) {
        tl.to(
          statsChildren,
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

      // Parallax zoom on hero image
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
      const elementsToFade = [titleRef.current, statsRef.current].filter(Boolean) as Element[];
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

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-bg-primary"
    >
      {/* Background Image with Parallax */}
      <div ref={imageRef} className="absolute inset-0 h-[120%] w-full">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1800&q=85&auto=format"
          alt="Architectural studio - ENBUILT headquarters"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-50 grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-linear-to-t from-bg-primary via-bg-primary/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative flex h-full flex-col items-start justify-end px-6 pb-20 md:px-16 md:pb-32">
        <div ref={titleRef} className="mb-10">
          <p className="font-condensed text-[12px] font-bold uppercase tracking-[0.5em] text-accent mb-4">
            Established 2012 / Chennai
          </p>
          <h1 className="font-display text-[15vw] uppercase leading-[0.85] tracking-tight text-text-primary md:text-[10vw]">
            <SplitText text="THE FIRM" />
          </h1>
          <p className="mt-6 font-editorial text-2xl italic text-text-secondary md:text-5xl max-w-4xl leading-tight">
            "We build at the intersection of monolithic structural integrity and 
            the visceral human experience of space."
          </p>
        </div>

        {/* Technical Stats Strip */}
        <div
          ref={statsRef}
          className="grid w-full grid-cols-2 gap-8 border-t border-white/10 pt-10 md:grid-cols-4"
        >
          {[
            { label: "Design Philosophy", value: "Monolithicism" },
            { label: "Technical Precision", value: "BIM Level 400" },
            { label: "Structural Core", value: "Raw Honesty" },
            { label: "Coordinates", value: "13.0827° N, 80.2707° E" },
          ].map((item) => (
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

      {/* Vertical Blueprint Label */}
      <div className="absolute bottom-10 right-10 hidden md:block">
        <div className="flex flex-col items-center gap-4">
          <span
            className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            EB / 22-04 / ARCH-STUDIO
          </span>
          <div className="h-20 w-px bg-linear-to-b from-accent to-transparent" />
        </div>
      </div>
    </section>
  );
}
