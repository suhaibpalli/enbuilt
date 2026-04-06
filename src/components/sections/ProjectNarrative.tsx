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

          // Image reveal
          if (imageArray.length) {
            tl.from(imageArray, {
              scale: 1.2,
              clipPath: "inset(100% 0 0 0)",
              duration: 1,
              stagger: 0.3,
              ease: "power2.inOut",
            }, "-=0.2");
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
      {sections.map((section, idx) => (
        <section
          key={idx}
          className="narrative-section relative h-screen w-full flex flex-col md:flex-row items-center px-6 md:px-16 overflow-hidden border-b border-white/5"
        >
          {/* Left Side: Text */}
          <div className="section-text w-full md:w-1/2 z-10 pt-24 md:pt-0">
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

          {/* Right Side: Images */}
          <div className="image-container w-full md:w-1/2 h-[50vh] md:h-[70vh] relative mt-12 md:mt-0 flex gap-4">
            {section.images.map((img, i) => (
              <div
                key={i}
                className={cn(
                  "project-image relative h-full w-full overflow-hidden border border-white/10",
                  i === 1 && "hidden lg:block -mt-12"
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
      ))}
    </div>
  );
}
