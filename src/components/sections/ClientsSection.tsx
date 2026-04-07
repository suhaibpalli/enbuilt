"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// ─── Client data — replace with real logos/names ──────────────────────────────

const CLIENTS = [
  { name: "Al Futtaim Group",   sector: "Real Estate"    },
  { name: "Emaar Properties",   sector: "Development"    },
  { name: "Saudi Aramco",       sector: "Energy"         },
  { name: "NEOM",               sector: "Master Planning"},
  { name: "Dar Al Riyadh",      sector: "Corporate"      },
  { name: "Aldar Properties",   sector: "Real Estate"    },
  { name: "Red Sea Global",     sector: "Tourism"        },
  { name: "Majid Al Futtaim",   sector: "Mixed-Use"      },
  { name: "ACWA Power",         sector: "Infrastructure" },
  { name: "Ministry of Culture",sector: "Government"     },
  { name: "Misk Foundation",    sector: "Cultural"       },
  { name: "ROSHN Group",        sector: "Residential"    },
];

// ─── Single marquee track ─────────────────────────────────────────────────────

function ClientMarquee({
  clients,
  direction = 1,
  duration = 30,
}: {
  clients: typeof CLIENTS;
  direction?: 1 | -1;
  duration?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!innerRef.current) return;
      gsap.to(innerRef.current, {
        xPercent: -50 * direction,
        ease: "none",
        duration,
        repeat: -1,
      });
    },
    { scope: trackRef }
  );

  const doubled = [...clients, ...clients, ...clients, ...clients];

  return (
    <div ref={trackRef} className="overflow-hidden py-4">
      <div ref={innerRef} className="flex w-max items-center gap-12">
        {doubled.map((client, i) => (
          <div key={i} className="flex shrink-0 items-center gap-4">
            {/* Accent dot */}
            <div className="h-1.5 w-1.5 rounded-full bg-accent/40" aria-hidden="true" />
            {/* Client name */}
            <div className="flex flex-col gap-0.5">
              <span className="font-display text-xl uppercase tracking-tight text-text-tertiary hover:text-text-secondary transition-colors cursor-default">
                {client.name}
              </span>
              <span className="font-condensed text-[9px] uppercase tracking-[0.35em] text-text-tertiary/50">
                {client.sector}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ClientsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const els = headerRef.current?.querySelectorAll(".clients-el");
      if (!els?.length) return;

      gsap.fromTo(
        els,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

      // Stats count up
      const counters = sectionRef.current?.querySelectorAll(".clients-counter");
      counters?.forEach((el) => {
        const target = parseInt(el.getAttribute("data-target") ?? "0", 10);
        ScrollTrigger.create({
          trigger: el,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              el,
              { textContent: 0 },
              {
                textContent: target,
                duration: 1.6,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate() {
                  el.textContent = Math.round(Number(el.textContent)).toString();
                },
              }
            );
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg-secondary py-24 md:py-32 border-y border-border overflow-hidden"
      aria-label="Our clients"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(240,242,245,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,242,245,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      {/* Header */}
      <div ref={headerRef} className="mb-16 flex flex-col gap-10 px-6 md:mb-12 md:flex-row md:items-end md:justify-between md:px-16">
        <div>
          <p className="clients-el mb-4 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
            — Trusted By
          </p>
          <h2 className="clients-el font-display text-5xl uppercase leading-none text-text-primary md:text-6xl">
            Our Clients
          </h2>
          <p className="clients-el mt-4 font-body text-base font-light leading-relaxed text-text-secondary max-w-sm">
            From sovereign wealth funds to independent developers — clients who build things that matter.
          </p>
        </div>

        {/* Stats */}
        <div className="clients-el flex gap-12">
          <div className="text-right">
            <p className="font-display text-5xl text-text-primary md:text-6xl">
              <span className="clients-counter" data-target="47">47</span>
              <span className="text-accent">+</span>
            </p>
            <p className="mt-1 font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
              Projects
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-5xl text-text-primary md:text-6xl">
              <span className="clients-counter" data-target="28">28</span>
            </p>
            <p className="mt-1 font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
              Clients
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-5xl text-text-primary md:text-6xl">
              <span className="clients-counter" data-target="8">8</span>
            </p>
            <p className="mt-1 font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
              Countries
            </p>
          </div>
        </div>
      </div>

      {/* Marquee tracks */}
      <div className="flex flex-col gap-2">
        {/* Track 1: left to right */}
        <ClientMarquee clients={CLIENTS} direction={1} duration={28} />
        {/* Track 2: right to left */}
        <ClientMarquee clients={[...CLIENTS].reverse()} direction={-1} duration={35} />
      </div>
    </section>
  );
}
