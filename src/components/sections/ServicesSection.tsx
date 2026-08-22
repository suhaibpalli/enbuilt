"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    index: "01",
    title: "Architecture & Interior Design",
    short: "Design shaped around your vision.",
    description:
      "Creative, functional, and carefully considered design solutions shaped around the client's vision, brand, and operational requirements.",
    tags: ["Concept Design", "Interior Design", "Space Planning", "Brand-Led Design"],
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format",
  },
  {
    index: "02",
    title: "Design Consultation",
    short: "Guidance before the first brick is laid.",
    description:
      "Professional guidance on space planning, materials, finishes, feasibility, budgets, and design direction before construction begins.",
    tags: ["Space Planning", "Material Selection", "Feasibility", "Budgeting"],
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80&auto=format",
  },
  {
    index: "03",
    title: "Turnkey Fit-Out",
    short: "One team, start to handover.",
    description:
      "Complete project delivery covering planning, approvals, procurement, construction, finishing, installation, and final handover.",
    tags: ["Planning & Approvals", "Procurement", "Construction", "Final Handover"],
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format",
  },
  {
    index: "04",
    title: "In-House Furniture & Custom Fabrication",
    short: "Manufactured in-house, matched to design.",
    description:
      "Enbuilt operates its own fabrication facility, allowing us to manufacture custom furniture, joinery, fixtures, display units, counters, and other project-specific elements in-house — giving us direct control over quality, detailing, customization, cost, and production timelines.",
    tags: ["Custom Furniture", "Joinery", "Fixtures & Display Units", "In-House Fabrication"],
    image: "https://images.unsplash.com/photo-1631396326646-c06a935ff3a6?w=900&q=80&auto=format",
  },
  {
    index: "05",
    title: "Civil & Construction Works",
    short: "Built right, from the ground up.",
    description:
      "Reliable civil and construction services delivered with close attention to structural requirements, workmanship, safety, and quality.",
    tags: ["Structural Works", "Workmanship", "Safety Compliance", "Quality Control"],
    image: "https://images.unsplash.com/photo-1694521787162-5373b598945c?w=900&q=80&auto=format",
  },
  {
    index: "06",
    title: "Renovation & Demolition",
    short: "Transforming what's already there.",
    description:
      "Controlled demolition and renovation solutions that transform existing properties into modern, efficient, and purposeful spaces.",
    tags: ["Controlled Demolition", "Renovation", "Space Transformation", "Efficiency Upgrades"],
    image: "https://images.unsplash.com/photo-1731871688430-a3e509d9227e?w=900&q=80&auto=format",
  },
  {
    index: "07",
    title: "Exterior & Façade Works",
    short: "The face your building presents.",
    description:
      "Distinctive exterior and façade solutions that strengthen architectural identity, improve functionality, and create a lasting first impression.",
    tags: ["Façade Design", "Architectural Identity", "Exterior Systems", "Weathering & Finish"],
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format",
  },
  {
    index: "08",
    title: "AMC & Maintenance",
    short: "Protecting what we've built.",
    description:
      "Planned and responsive maintenance services that protect the quality, functionality, and long-term value of completed spaces.",
    tags: ["Planned Maintenance", "Responsive Support", "Asset Protection", "Long-Term Value"],
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format",
  },
];

// ─── Single Service Card ──────────────────────────────────────────────────────

function ServiceCard({ service }: { service: typeof SERVICES[0] }) {
  return (
    <Link
      href="/contact"
      className="service-image-card group relative block aspect-[4/5] overflow-hidden border border-border"
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 via-transparent to-transparent" />

      {/* Beige panel — compact by default, expands to cover the image on hover */}
      <div
        className="absolute inset-x-0 bottom-0 overflow-hidden bg-bg-light transition-all duration-500 ease-out h-[86px] group-hover:h-[72%]"
      >
        <div className="flex h-full flex-col justify-between p-5 md:p-6">
          <div className="flex items-center justify-between">
            <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              {service.index}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="text-text-on-light transition-transform duration-500 group-hover:rotate-45"
            >
              <path d="M2 7H12M12 7L7 2M12 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div>
            <h3 className="font-display text-xl uppercase leading-tight text-text-on-light md:text-2xl">
              {service.title}
            </h3>
            <p className="mt-2 font-condensed text-[10px] uppercase tracking-[0.25em] text-text-on-light/60 opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
              {service.short}
            </p>
            <p className="mt-3 hidden max-w-[92%] font-body text-sm leading-relaxed text-text-on-light/80 opacity-0 transition-opacity duration-300 delay-150 group-hover:opacity-100 md:block">
              {service.description}
            </p>
            <p className="mt-3 hidden font-condensed text-[9px] uppercase tracking-[0.2em] text-text-on-light/50 opacity-0 transition-opacity duration-300 delay-200 group-hover:opacity-100 lg:block">
              {service.tags.join(" · ")}
            </p>
          </div>
        </div>
      </div>
    </Link>
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
      const cards = sectionRef.current?.querySelectorAll(".service-image-card");

      if (prefersReducedMotion()) {
        if (chars?.length) gsap.set(Array.from(chars), { yPercent: 0, opacity: 1 });
        gsap.set([label, sub].filter(Boolean) as Element[], { opacity: 1, y: 0 });
        if (cards?.length) gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

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
              duration: 0.8,
              ease: "power4.out",
              stagger: { amount: 0.35 },
            }, "-=0.4");
          }
          if (sub) tl.to(sub, { opacity: 1, y: 0, duration: 0.7 }, "-=0.4");
        },
      });

      // Service cards stagger in
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

      {/* Services image grid */}
      <div className="services-list grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:gap-5 md:px-10 lg:grid-cols-4">
        {SERVICES.map((service) => (
          <ServiceCard key={service.index} service={service} />
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
