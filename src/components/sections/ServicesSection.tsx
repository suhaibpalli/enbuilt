"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

type ViewMode = "grid" | "compact" | "list";

const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" opacity="0.9"/>
  </svg>
);

const CompactIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="4" width="2.5" height="8" rx="0.5" fill="currentColor" opacity="0.9"/>
    <rect x="4.75" y="4" width="2.5" height="8" rx="0.5" fill="currentColor" opacity="0.9"/>
    <rect x="8.5" y="4" width="2.5" height="8" rx="0.5" fill="currentColor" opacity="0.9"/>
    <rect x="12.25" y="4" width="2.5" height="8" rx="0.5" fill="currentColor" opacity="0.9"/>
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1" y="1" width="14" height="2.5" rx="0.5" fill="currentColor" opacity="0.9"/>
    <rect x="1" y="6.75" width="14" height="2.5" rx="0.5" fill="currentColor" opacity="0.6"/>
    <rect x="1" y="12.5" width="14" height="2.5" rx="0.5" fill="currentColor" opacity="0.6"/>
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    index: "01",
    title: "Architecture & Interior Design",
    short: "Design shaped around your vision.",
    description:
      "Creative, functional, and carefully considered design solutions shaped around the client's vision, brand, and operational requirements.",
    tags: ["Concept Design", "Interior Design", "Space Planning", "Brand-Led Design"],
    image: "/images/services/01-architecture-and-interior-design.png",
  },
  {
    index: "02",
    title: "Design Consultation",
    short: "Guidance before the first brick is laid.",
    description:
      "Professional guidance on space planning, materials, finishes, feasibility, budgets, and design direction before construction begins.",
    tags: ["Space Planning", "Material Selection", "Feasibility", "Budgeting"],
    image: "/images/services/02-design-consultation.png",
  },
  {
    index: "03",
    title: "Turnkey Fit-Out",
    short: "One team, start to handover.",
    description:
      "Complete project delivery covering planning, approvals, procurement, construction, finishing, installation, and final handover.",
    tags: ["Planning & Approvals", "Procurement", "Construction", "Final Handover"],
    image: "/images/services/03-turnkey-fit-out.png",
  },
  {
    index: "04",
    title: "In-House Furniture & Custom Fabrication",
    short: "Manufactured in-house, matched to design.",
    description:
      "Enbuilt operates its own fabrication facility, allowing us to manufacture custom furniture, joinery, fixtures, display units, counters, and other project-specific elements in-house — giving us direct control over quality, detailing, customization, cost, and production timelines.",
    tags: ["Custom Furniture", "Joinery", "Fixtures & Display Units", "In-House Fabrication"],
    image: "/images/services/04-in-house-furniture-and-custom-fabrication.png",
  },
  {
    index: "05",
    title: "Civil & Construction Works",
    short: "Built right, from the ground up.",
    description:
      "Reliable civil and construction services delivered with close attention to structural requirements, workmanship, safety, and quality.",
    tags: ["Structural Works", "Workmanship", "Safety Compliance", "Quality Control"],
    image: "/images/services/05-civil-and-construction-works.png",
  },
  {
    index: "06",
    title: "Renovation & Demolition",
    short: "Transforming what's already there.",
    description:
      "Controlled demolition and renovation solutions that transform existing properties into modern, efficient, and purposeful spaces.",
    tags: ["Controlled Demolition", "Renovation", "Space Transformation", "Efficiency Upgrades"],
    image: "/images/services/06-renovation-and-demolition.png",
  },
  {
    index: "07",
    title: "Exterior & Façade Works",
    short: "The face your building presents.",
    description:
      "Distinctive exterior and façade solutions that strengthen architectural identity, improve functionality, and create a lasting first impression.",
    tags: ["Façade Design", "Architectural Identity", "Exterior Systems", "Weathering & Finish"],
    image: "/images/services/07-exterior-and-facade-works.png",
  },
  {
    index: "08",
    title: "AMC & Maintenance",
    short: "Protecting what we've built.",
    description:
      "Planned and responsive maintenance services that protect the quality, functionality, and long-term value of completed spaces.",
    tags: ["Planned Maintenance", "Responsive Support", "Asset Protection", "Long-Term Value"],
    image: "/images/services/08-amc-and-maintenance.png",
  },
];

// ─── Single Service Card (Grid view — beige folder-tab card) ──────────────────

function ServiceCard({ service, dense = false }: { service: typeof SERVICES[0]; dense?: boolean }) {
  return (
    <Link
      href="/contact"
      className="service-image-card group relative block aspect-video overflow-hidden border border-border"
    >
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <Image
          src={service.image}
          alt={service.title}
          fill
          sizes={dense ? "(max-width: 1024px) 50vw, 25vw" : "(max-width: 640px) 100vw, 50vw"}
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 via-transparent to-transparent" />

      {/* Beige panel — folded top-left corner, like a folder tab. Compact by
          default, expands to cover the image on hover. Narrower (dense)
          cards wrap text onto more lines, so they need a taller reveal. */}
      <div
        style={{ clipPath: "polygon(28px 0, 100% 0, 100% 100%, 0 100%, 0 28px)" }}
        className={cn(
          "absolute inset-x-0 bottom-0 overflow-hidden bg-bg-light transition-all duration-500 ease-out h-[112px] md:h-[132px]",
          dense ? "group-hover:h-[88%]" : "group-hover:h-[58%]"
        )}
      >
        <div className="flex h-full flex-col p-5 pt-6 md:p-6 md:pt-7">
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

          <h3 className="mt-3 font-display text-xl uppercase leading-tight text-text-on-light md:text-2xl">
            {service.title}
          </h3>

          {/* Reveal-on-hover content — zero height while collapsed so it
              never pushes the title toward the bottom edge. */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p className="mt-2 font-condensed text-xs font-bold uppercase tracking-[0.15em] text-accent">
                {service.short}
              </p>
              <p
                className={cn(
                  "mt-3 hidden max-w-[92%] font-body text-sm leading-relaxed text-text-on-light md:block",
                  dense && "line-clamp-4"
                )}
              >
                {service.description}
              </p>
              {!dense && (
                <div className="mt-4 hidden flex-wrap gap-1.5 lg:flex">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-text-on-light/15 bg-text-on-light/5 px-2 py-1 font-condensed text-[10px] font-medium uppercase tracking-[0.1em] text-text-on-light/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ─── List Row (click-to-expand accordion) ─────────────────────────────────────

function ServiceListRow({ service }: { service: typeof SERVICES[0] }) {
  const [isOpen, setIsOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);
  const rowRef  = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: rowRef });

  const toggle = contextSafe(() => {
    if (!bodyRef.current) return;

    if (prefersReducedMotion()) {
      if (!isOpen) {
        setIsOpen(true);
        gsap.set(bodyRef.current, { height: "auto", opacity: 1 });
        gsap.set(lineRef.current, { scaleX: 1 });
      } else {
        gsap.set(bodyRef.current, { height: 0, opacity: 0 });
        gsap.set(lineRef.current, { scaleX: 0 });
        setIsOpen(false);
      }
      return;
    }

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
      ref={rowRef}
      className={cn(
        "service-image-card border-b border-border transition-colors duration-300",
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
          {service.title.charAt(0)}
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
  const [view, setView] = useState<ViewMode>("grid");

  useGSAP(
    () => {
      // Header chars
      const chars = headerRef.current?.querySelectorAll(".service-char");
      const label = headerRef.current?.querySelector(".service-label");
      const sub   = headerRef.current?.querySelector(".service-sub");

      if (prefersReducedMotion()) {
        if (chars?.length) gsap.set(Array.from(chars), { yPercent: 0, opacity: 1 });
        gsap.set([label, sub].filter(Boolean) as Element[], { opacity: 1, y: 0 });
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
    },
    { scope: sectionRef }
  );

  // Card/row entrance — re-runs whenever the view toggles
  useGSAP(
    () => {
      const cards = sectionRef.current?.querySelectorAll(".service-image-card");
      if (!cards?.length) return;

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" }
      );
    },
    { scope: sectionRef, dependencies: [view] }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-bg-primary py-32 md:py-40"
      aria-label="Our services"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-16 flex flex-col gap-6 px-6 md:mb-20 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
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

        {/* View mode toggle */}
        <div className="flex shrink-0 items-center gap-1 border border-border p-1">
          {(["grid", "compact", "list"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "p-2.5 transition-all duration-200",
                view === v ? "bg-accent text-white" : "text-text-tertiary hover:text-text-primary"
              )}
              aria-label={`${v} view`}
            >
              {v === "grid" && <GridIcon />}
              {v === "compact" && <CompactIcon />}
              {v === "list" && <ListIcon />}
            </button>
          ))}
        </div>
      </div>

      {/* Services list */}
      {view === "list" ? (
        <div className="services-list border-t border-border">
          {SERVICES.map((service) => (
            <ServiceListRow key={service.index} service={service} />
          ))}
        </div>
      ) : (
        <div
          className={cn(
            "services-list grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:gap-5 md:px-10",
            view === "compact" && "lg:grid-cols-4"
          )}
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.index} service={service} dense={view === "compact"} />
          ))}
        </div>
      )}

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
