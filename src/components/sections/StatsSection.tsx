"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  sublabel?: string;
}

const STATS: Stat[] = [
  { value: 47, suffix: "+", label: "Structures", sublabel: "Completed & Built" },
  { value: 12, suffix: "", label: "Years",       sublabel: "In Practice" },
  { value: 8,  suffix: "",  label: "Cities",     sublabel: "Across India & UAE" },
  { value: 3,  suffix: "",  label: "Awards",     sublabel: "International Recognition" },
];

/**
 * StatsSection
 * Full-width cinematic counter strip.
 * Each number counts up when scrolled into view.
 */
export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRef     = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      // Red accent line grows from left on enter
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: "expo.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Stat items reveal from bottom
      const statItems = sectionRef.current.querySelectorAll(".stat-block");
      if (statItems.length) {
        gsap.fromTo(
          statItems,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // Number counters animate up when in view
      counterRefs.current.forEach((el, i) => {
        if (!el) return;
        const target = STATS[i]?.value ?? 0;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => {
            gsap.fromTo(
              el,
              { textContent: 0 },
              {
                textContent: target,
                duration: 1.8,
                ease: "power2.out",
                delay: i * 0.15,
                snap: { textContent: 1 },
                onUpdate() {
                  el.textContent = Math.round(Number(el.textContent)).toString();
                },
              }
            );
          },
          once: true,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg-secondary border-y border-border overflow-hidden"
      aria-label="Studio statistics"
    >
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(240,242,245,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,242,245,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Red accent line — full width top edge */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 right-0 h-[2px] bg-accent origin-left"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-[1800px] px-6 md:px-20">
        <div className="grid grid-cols-2 gap-0 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`stat-block group relative flex flex-col justify-center gap-3 py-16 px-6 md:py-24 md:px-10 ${
                i < STATS.length - 1 ? "border-r border-border/50" : ""
              }`}
            >
              {/* Hover fill */}
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-colors duration-500" />

              {/* Number */}
              <p
                className="font-display text-[14vw] sm:text-[10vw] md:text-[7vw] leading-none text-text-primary tracking-tight tabular-nums"
                aria-label={`${stat.value}${stat.suffix ?? ""} ${stat.label}`}
              >
                <span
                  ref={(el) => { counterRefs.current[i] = el; }}
                >
                  {stat.value}
                </span>
                {stat.suffix && (
                  <span className="text-accent">{stat.suffix}</span>
                )}
              </p>

              {/* Label */}
              <div className="flex flex-col gap-1">
                <p className="font-display text-xl md:text-2xl uppercase text-text-primary">
                  {stat.label}
                </p>
                {stat.sublabel && (
                  <p className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
                    {stat.sublabel}
                  </p>
                )}
              </div>

              {/* Accent corner mark — appears on hover */}
              <div className="absolute bottom-4 right-4 h-px w-8 bg-accent scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500" aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
