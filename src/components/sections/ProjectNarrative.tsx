"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import type { ProjectSection } from "@/lib/projects-data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectNarrativeProps {
  sections: ProjectSection[];
}

export default function ProjectNarrative({ sections }: ProjectNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const triggers = containerRef.current?.querySelectorAll(".narrative-section");
        
        triggers?.forEach((section) => {
          const text = section.querySelector(".section-text");
          const imageContainer = section.querySelector(".image-container");
          const images = imageContainer?.querySelectorAll(".project-image");

          if (!text || !imageContainer) return;

          const imageArray = images ? Array.from(images) : [];

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "+=150%",
              pin: true,
              scrub: true,
            },
          });

          // Text entrance
          tl.from(text, {
            y: 40,
            opacity: 0,
            duration: 0.5,
            ease: "power3.out",
          });

          // Image reveal + parallax
          if (imageArray.length) {
            tl.from(imageArray, {
              scale: 1.3,
              clipPath: "inset(100% 0 0 0)",
              duration: 1,
              stagger: 0.3,
              ease: "power2.inOut",
            }, "-=0.2");

            // Add parallax movement to images during the "stay visible" phase
            imageArray.forEach((img, i) => {
              const imageEl = img.querySelector("img");
              if (imageEl) {
                tl.to(imageEl, {
                  yPercent: 10 + i * 5,
                  scale: 1.1,
                  duration: 2,
                  ease: "none",
                }, 0.8);
              }
            });
          }
          
          // Stay visible
          tl.to({}, { duration: 1 })
          // Fade out
          .to([text, imageContainer], {
            opacity: 0,
            y: -40,
            duration: 0.5,
            ease: "power3.in",
          });
        });
      });

      // Mobile: Simple scroll
      mm.add("(max-width: 767px)", () => {
        // No pinning on mobile, just fade-in reveals
        const triggers = containerRef.current?.querySelectorAll(".narrative-section");
        if (triggers) {
          const triggerArray = Array.from(triggers);
          triggerArray.forEach((section) => {
            gsap.from(section, {
              y: 50,
              opacity: 0,
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            });
          });
        }
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="bg-bg-primary">
      {sections.map((section, idx) => {
        const isReversed = idx % 2 === 1;
        
        return (
          <section
            key={idx}
            className={cn(
              "narrative-section relative h-screen w-full flex flex-col items-center px-6 md:px-16 overflow-hidden border-b border-white/5",
              isReversed ? "md:flex-row-reverse" : "md:flex-row"
            )}
          >
            {/* Text Block */}
            <div className={cn(
              "section-text w-full md:w-1/2 z-10 pt-24 md:pt-0",
              isReversed ? "md:pl-20" : "md:pr-20"
            )}>
              <span className="font-condensed text-accent text-[10px] uppercase tracking-[0.5em] font-bold block mb-4">
                0{idx + 1} / Story
              </span>
              <h2 className="font-display text-5xl md:text-7xl text-text-primary uppercase mb-8 leading-none">
                {section.title}
              </h2>
              <p className="font-body text-lg md:text-xl text-text-secondary max-w-xl leading-relaxed">
                {section.description}
              </p>
            </div>

            {/* Images Block */}
            <div className="image-container w-full md:w-1/2 h-[50vh] md:h-[70vh] relative mt-12 md:mt-0 flex gap-4">
              {section.images.map((img, i) => (
                <div
                  key={i}
                  className={cn(
                    "project-image relative h-full w-full overflow-hidden border border-white/10",
                    i === 1 && "hidden lg:block",
                    // Off-set the second image slightly differently based on layout
                    i === 1 && (isReversed ? "mt-12" : "-mt-12")
                  )}
                >
                  <Image
                    src={img}
                    alt={section.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Background Drafting Grid */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                 style={{
                   backgroundImage: "linear-gradient(to right,rgba(240,242,245,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,242,245,1) 1px,transparent 1px)",
                   backgroundSize: "80px 80px"
                 }}
            />
          </section>
        );
      })}
    </div>
  );
}
