"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    index: "01",
    title: "Architecture Design",
    short: "From concept to permit-ready drawings.",
    description:
      "Comprehensive architectural design from initial concept through schematic, design development, and construction documentation. We work across residential, commercial, and cultural typologies with equal rigour.",
    tags: ["Concept Design", "Schematic Design", "Construction Documents", "Permit Drawings"],
    icon: "A",
  },
  {
    index: "02",
    title: "Interior Architecture",
    short: "Spatial experiences built from the inside out.",
    description:
      "Interior architecture that is inseparable from the building itself — not applied decoration, but an extension of structural logic. Material palettes, lighting choreography, and spatial sequences designed in concert.",
    tags: ["Space Planning", "Material Specification", "Lighting Design", "FF&E"],
    icon: "I",
  },
  {
    index: "03",
    title: "Urban & Master Planning",
    short: "Designing at the scale of communities.",
    description:
      "Urban design and master planning that responds to existing fabric, infrastructure, and civic ambition. From site feasibility through phased development strategies for mixed-use, residential, and institutional clients.",
    tags: ["Site Analysis", "Land Use Planning", "Phasing Strategy", "Civic Design"],
    icon: "U",
  },
  {
    index: "04",
    title: "BIM Coordination",
    short: "Precision-led digital delivery.",
    description:
      "BIM Level 400 coordination across all building systems — structural, MEP, façade, and fit-out. We lead clash detection, model management, and 4D/5D integration to reduce on-site risk and cost.",
    tags: ["BIM Level 400", "Clash Detection", "4D Scheduling", "As-Built Models"],
    icon: "B",
  },
  {
    index: "05",
    title: "Façade Engineering",
    short: "The skin that defines the building.",
    description:
      "Façade design and engineering as a discipline in its own right — thermal performance, solar shading, material weathering, and visual identity resolved simultaneously. We work with specialist subcontractors from concept through installation.",
    tags: ["Thermal Modelling", "Solar Shading", "Material Testing", "Shop Drawing Review"],
    icon: "F",
  },
  {
    index: "06",
    title: "Project Management",
    short: "From groundbreaking to handover.",
    description:
      "Owner's representative and project management services across all project phases. We protect your interests through procurement, contractor selection, programme management, and quality oversight — on site, every week.",
    tags: ["Procurement", "Contractor Oversight", "Programme Management", "Cost Control"],
    icon: "P",
  },
];

// ─── Single Service Card ──────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef  = useRef<HTMLDivElement>(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const lineRef  = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const toggle = contextSafe(() => {
    if (!bodyRef.current) return;

    if (!isOpen) {
      setIsOpen(true);
      gsap.fromTo(
        bodyRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.5, ease: "power3.out" }
      );
      gsap.to(lineRef.current, { scaleX: 1, duration: 0.4, ease: "expo.out" });
    } else {
      gsap.to(bodyRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => setIsOpen(false),
      });
      gsap.to(lineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
    }
  });

  return (
    <div
      ref={cardRef}
      className={cn(
        "service-card border-b border-border transition-colors duration-300",
        isOpen ? "bg-bg-secondary/50" : "hover:bg-bg-secondary/30"
      )}
    >
      {/* Header row — clickable */}
      <button
        onClick={toggle}
        className="w-full flex items-center gap-6 px-6 py-7 text-left md:px-10 md:py-8 group"
        aria-expanded={isOpen}
      >
        {/* Index */}
        <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-text-tertiary w-8 shrink-0">
          {service.index}
        </span>

        {/* Icon circle */}
        <div
          className={cn(
            "h-10 w-10 shrink-0 rounded-full border flex items-center justify-center font-display text-sm transition-all duration-300",
            isOpen
              ? "border-accent bg-accent text-white"
              : "border-border text-text-tertiary group-hover:border-accent/50"
          )}
        >
          {service.icon}
        </div>

        {/* Title + short */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-2xl uppercase leading-none text-text-primary md:text-3xl">
            {service.title}
          </h3>
          <p className="mt-1.5 font-condensed text-[11px] uppercase tracking-[0.3em] text-text-secondary">
            {service.short}
          </p>
        </div>

        {/* Expand icon */}
        <div
          className={cn(
            "shrink-0 h-8 w-8 border border-border flex items-center justify-center transition-all duration-300",
            isOpen ? "border-accent bg-accent text-white rotate-45" : "text-text-tertiary group-hover:border-accent/40"
          )}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      {/* Red accent line */}
      <div
        ref={lineRef}
        className="mx-6 h-[1px] origin-left bg-accent md:mx-10"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />

      {/* Expanded body */}
      <div
        ref={bodyRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div className="grid grid-cols-1 gap-8 px-6 py-8 md:grid-cols-[1fr_auto] md:gap-16 md:px-10 md:py-10">
          <div>
            <p className="font-body text-base font-light leading-relaxed text-text-secondary md:text-lg max-w-2xl">
              {service.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="border border-border px-3 py-1 font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="shrink-0">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-6 py-3 border border-accent text-accent font-condensed text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-accent hover:text-white transition-all duration-300"
            >
              Enquire
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-1">
                <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Header chars
      const chars = headerRef.current?.querySelectorAll(".service-char");
      const label = headerRef.current?.querySelector(".service-label");
      const sub   = headerRef.current?.querySelector(".service-sub");

      if (chars?.length) gsap.set(Array.from(chars), { yPercent: 110, opacity: 0 });
      gsap.set([label, sub].filter(Boolean) as Element[], { opacity: 0, y: 16 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const tl = gsap.timeline();
          if (label) tl.to(label, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
          if (chars?.length) {
            tl.to(Array.from(chars), {
              yPercent: 0,
              opacity: 1,
              duration: 1,
              ease: "power4.out",
              stagger: { amount: 0.35 },
            }, "-=0.4");
          }
          if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.7 }, "-=0.5");
        },
      });

      // Service cards stagger in
      const cards = sectionRef.current?.querySelectorAll(".service-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current?.querySelector(".services-list"),
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg-primary py-32 md:py-40"
      aria-label="Our services"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-16 px-6 md:mb-20 md:px-10">
        <p className="service-label mb-4 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
          — What We Do
        </p>
        <div className="overflow-hidden" aria-label="Services">
          <h2 className="font-display text-[16vw] uppercase leading-[0.85] tracking-tight text-text-primary md:text-[9vw] lg:text-[7vw]">
            {"SERVICES".split("").map((c, i) => (
              <span key={i} className="service-char inline-block" aria-hidden="true">{c}</span>
            ))}
          </h2>
        </div>
        <p className="service-sub mt-6 font-body text-lg font-light leading-relaxed text-text-secondary max-w-xl">
          End-to-end architectural services — from land appraisal through construction oversight. No handoffs. One team, every phase.
        </p>
      </div>

      {/* Services accordion list */}
      <div className="services-list border-t border-border">
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.index} service={service} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 px-6 md:mt-20 md:px-10">
        <div className="flex flex-col items-start gap-4 border-l-2 border-accent pl-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-condensed text-[10px] uppercase tracking-[0.4em] text-accent font-bold mb-1">
              Bespoke Scope
            </p>
            <p className="font-body text-base text-text-secondary font-light">
              Every project is unique. If your requirements span multiple services or require an unconventional approach, let's talk.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 group relative overflow-hidden bg-accent px-10 py-4 font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-white transition-transform hover:scale-[1.02]"
          >
            <span className="relative z-10">Start a Conversation</span>
            <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
