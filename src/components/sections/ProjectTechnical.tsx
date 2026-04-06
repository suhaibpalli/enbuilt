"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { TechnicalSpec } from "@/lib/projects-data";

gsap.registerPlugin(ScrollTrigger);

interface ProjectTechnicalProps {
  blueprintSrc: string;
  specs: TechnicalSpec[];
}

export default function ProjectTechnical({ blueprintSrc, specs }: ProjectTechnicalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Blueprint reveal: clip-path geometric wipe
      if (blueprintRef.current) {
        gsap.fromTo(
          blueprintRef.current,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.5,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 60%",
              once: true,
            },
          }
        );
      }

      // Specs animation
      const specChildren = specsRef.current?.children ? Array.from(specsRef.current.children) : [];
      if (specChildren.length) {
        gsap.from(specChildren, {
          x: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: specsRef.current,
            start: "top 80%",
            once: true,
          },
        });
      }

      // Markers animation
      gsap.from(".blueprint-marker", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: blueprintRef.current,
          start: "top 40%",
          once: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-bg-secondary px-6 py-32 md:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="font-condensed text-accent text-[11px] font-bold uppercase tracking-[0.5em] mb-4">
              — BIM Coordination & Performance
            </p>
            <h2 className="font-display text-5xl md:text-7xl text-text-primary uppercase leading-none">
              Technical Core
            </h2>
          </div>
          <div className="hidden md:block">
            <p className="font-condensed text-[10px] text-text-tertiary uppercase tracking-widest text-right">
              Project No. 22-04 / EB<br />
              Structural Precision System
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Blueprint Reveal Area */}
          <div className="lg:col-span-8 relative">
            <div
              ref={blueprintRef}
              className="relative aspect-video w-full overflow-hidden border border-white/5 bg-bg-primary"
            >
              <Image
                src={blueprintSrc}
                alt="Technical Blueprint"
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover opacity-60 grayscale invert"
              />
              
              {/* Floating Blueprint Markers */}
              <div className="blueprint-marker absolute top-[25%] left-[30%] h-4 w-4 rounded-full bg-accent animate-pulse shadow-[0_0_20px_rgba(255,59,59,0.5)] cursor-help group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-bg-primary border border-white/10 px-3 py-1 scale-0 group-hover:scale-100 transition-transform origin-left">
                   <span className="font-condensed text-[9px] uppercase tracking-widest text-text-primary">Load-Bearing Core</span>
                </div>
              </div>

              <div className="blueprint-marker absolute top-[60%] left-[70%] h-4 w-4 rounded-full bg-accent animate-pulse shadow-[0_0_20px_rgba(255,59,59,0.5)] cursor-help group">
                <div className="absolute right-6 top-1/2 -translate-y-1/2 whitespace-nowrap bg-bg-primary border border-white/10 px-3 py-1 scale-0 group-hover:scale-100 transition-transform origin-right">
                   <span className="font-condensed text-[9px] uppercase tracking-widest text-text-primary">Thermal Envelope System</span>
                </div>
              </div>
            </div>

            {/* Corner Metadata */}
            <div className="absolute -bottom-8 left-0 font-condensed text-[9px] text-text-tertiary uppercase tracking-widest">
              Blueprint Visualization / v2.1.0-EB
            </div>
          </div>

          {/* Technical Specs List */}
          <div ref={specsRef} className="lg:col-span-4 flex flex-col gap-10">
            {specs.map((spec) => (
              <div key={spec.label} className="border-b border-white/5 pb-6 group">
                <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-accent mb-2 transition-colors group-hover:text-text-primary">
                  {spec.label}
                </p>
                <p className="font-display text-4xl text-text-primary uppercase tracking-tight">
                  {spec.value}
                </p>
              </div>
            ))}

            <div className="mt-8 bg-accent/5 border border-accent/20 p-6">
               <h4 className="font-condensed text-[11px] uppercase tracking-widest text-accent font-bold mb-3">Efficiency Report</h4>
               <p className="font-body text-xs text-text-secondary leading-relaxed">
                 The structure employs a monolithic core system that reduces material waste by 18% while enhancing the thermal mass performance of the interior spaces.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
