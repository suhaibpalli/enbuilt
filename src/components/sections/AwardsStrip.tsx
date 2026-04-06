"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

const AWARDS = [
  "AIA Firm of the Year 2023",
  "Pritzker Architecture Prize Nomination",
  "LEED Platinum Certification",
  "WAF Cultural Award Winner",
  "Dezeen Architect of the Year 2022",
  "BIM Precision Excellence Award",
  "Concrete Structural Innovation 2021",
];

export default function AwardsStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const inner = containerRef.current?.querySelector(".awards-inner");
      if (!inner) return;

      gsap.to(inner, {
        xPercent: -50,
        ease: "none",
        duration: 25,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section 
      ref={containerRef}
      className="relative bg-bg-secondary py-16 overflow-hidden border-y border-white/5"
    >
      <div className="awards-inner flex w-max gap-20 items-center">
        {/* Triple the items for a smooth seamless loop */}
        {[...AWARDS, ...AWARDS, ...AWARDS].map((award, i) => (
          <div key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-condensed text-accent text-[10px] font-bold uppercase tracking-[0.5em]">
              ★
            </span>
            <span className="font-display text-2xl md:text-4xl text-text-tertiary uppercase tracking-tight hover:text-text-primary transition-colors cursor-default">
              {award}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
