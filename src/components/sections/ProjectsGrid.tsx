"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectCategory = "All" | "Residential" | "Commercial" | "Cultural" | "Interiors";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, "All">;
  location: string;
  year: string;
  area: string;
  index: string;
  /** Layout variant — controls aspect ratio and grid span */
  size: "tall" | "wide" | "square";
  imageSrc: string;
  imageAlt: string;
  href?: string;
}

// ─── Demo data — replace with your CMS / props ────────────────────────────────

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "The Meridian",
    subtitle: "High-density mixed-use tower",
    category: "Commercial",
    location: "Chennai, IN",
    year: "2024",
    area: "4,200 m²",
    index: "01",
    size: "tall",
    imageSrc: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80&auto=format",
    imageAlt: "The Meridian Tower",
    href: "/projects/meridian-tower",
  },
  {
    id: 2,
    title: "Casa Volta",
    subtitle: "Sculptural private residence",
    category: "Residential",
    location: "Coimbatore, IN",
    year: "2023",
    area: "680 m²",
    index: "02",
    size: "square",
    imageSrc: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&q=80&auto=format",
    imageAlt: "Casa Volta Residence",
    href: "/projects/casa-volta",
  },
  {
    id: 3,
    title: "Lattice Pavilion",
    subtitle: "Public cultural centre",
    category: "Cultural",
    location: "Bangalore, IN",
    year: "2023",
    area: "1,900 m²",
    index: "03",
    size: "wide",
    imageSrc: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format",
    imageAlt: "Lattice Pavilion",
  },
  {
    id: 4,
    title: "The Void House",
    subtitle: "Minimalist courtyard villa",
    category: "Residential",
    location: "Pondicherry, IN",
    year: "2022",
    area: "420 m²",
    index: "04",
    size: "square",
    imageSrc: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&q=80&auto=format",
    imageAlt: "The Void House",
  },
  {
    id: 5,
    title: "Forum One",
    subtitle: "Corporate headquarters campus",
    category: "Commercial",
    location: "Hyderabad, IN",
    year: "2022",
    area: "8,400 m²",
    index: "05",
    size: "tall",
    imageSrc: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80&auto=format",
    imageAlt: "Forum One HQ",
  },
  {
    id: 6,
    title: "Studio Nave",
    subtitle: "Artist live-work loft interiors",
    category: "Interiors",
    location: "Mumbai, IN",
    year: "2021",
    area: "290 m²",
    index: "06",
    size: "square",
    imageSrc: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=900&q=80&auto=format",
    imageAlt: "Studio Nave Interiors",
  },
];

const CATEGORIES: ProjectCategory[] = [
  "All",
  "Residential",
  "Commercial",
  "Cultural",
  "Interiors",
];

// ─── Single project card ──────────────────────────────────────────────────────

interface CardProps {
  project: Project;
  /** data-index for GSAP targeting */
  dataIndex: number;
}

function ProjectCard({ project, dataIndex }: CardProps) {
  const cardRef   = useRef<HTMLAnchorElement>(null);
  const imageRef  = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const infoRef   = useRef<HTMLDivElement>(null);
  const arrowRef  = useRef<HTMLDivElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);

  // ── Hover animations (GSAP — smoother than CSS transition for transforms) ──
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleMouseEnter = contextSafe(() => {
    // Image scales up slightly
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1.07,
        duration: 0.8,
        ease: "power3.out",
      });
    }
    // Dark overlay deepens
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    }
    // Info block slides up
    if (infoRef.current) {
      gsap.to(infoRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power3.out",
      });
    }
    // Arrow appears
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power3.out",
        delay: 0.1,
      });
    }
    // Red accent line expands
    if (redLineRef.current) {
      gsap.to(redLineRef.current, {
        scaleX: 1,
        duration: 0.5,
        ease: "expo.out",
        delay: 0.05,
      });
    }
    // Card border accent
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        borderColor: "rgba(255,59,59,0.5)",
        duration: 0.3,
      });
    }
  });

  const handleMouseLeave = contextSafe(() => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scale: 1,
        duration: 0.7,
        ease: "power3.inOut",
      });
    }
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
    if (infoRef.current) {
      gsap.to(infoRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
    if (arrowRef.current) {
      gsap.to(arrowRef.current, {
        opacity: 0,
        x: -8,
        duration: 0.3,
        ease: "power2.in",
      });
    }
    if (redLineRef.current) {
      gsap.to(redLineRef.current, {
        scaleX: 0,
        duration: 0.35,
        ease: "power2.in",
      });
    }
    if (cardRef.current) {
      gsap.to(cardRef.current, {
        borderColor: "rgba(240,242,245,0.08)",
        duration: 0.3,
      });
    }
  });

  // Aspect ratio by size
  const aspectClass = {
    tall:   "aspect-3/4",
    wide:   "aspect-16/9",
    square: "aspect-square",
  }[project.size];

  return (
    <a
      ref={cardRef}
      href={project.href ?? "#"}
      data-index={dataIndex}
      className={cn(
        "project-card group relative block overflow-hidden border border-border bg-bg-secondary",
        "cursor-none select-none outline-none",
        "will-change-transform",
        aspectClass,
        // Wide cards span full width on desktop
        project.size === "wide" && "md:col-span-2"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={`${project.title} — ${project.subtitle}`}
    >
      {/* ── Image ────────────────────────────────────────────────────────── */}
      <div
        ref={imageRef}
        className="absolute inset-[-4%] will-change-transform"
        style={{ scale: 1 }}
      >
        <Image
          src={project.imageSrc}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center"
          draggable={false}
        />
      </div>

      {/* ── Always-visible base overlay gradient ─────────────────────────── */}
      <div className="absolute inset-0 bg-linear-to-t from-bg-primary/90 via-bg-primary/20 to-transparent" />

      {/* ── Hover overlay (extra darkening) ──────────────────────────────── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-bg-primary/50"
        style={{ opacity: 0 }}
      />

      {/* ── Top-left: project index + category ───────────────────────────── */}
      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
          {project.index}
        </span>
        <span className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
          {project.category}
        </span>
      </div>

      {/* ── Top-right: arrow (appears on hover) ──────────────────────────── */}
      <div
        ref={arrowRef}
        className="absolute right-5 top-5"
        style={{ opacity: 0, x: -8 } as React.CSSProperties}
        aria-hidden="true"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-accent"
        >
          <line x1="3" y1="17" x2="17" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <polyline points="8,3 17,3 17,12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>

      {/* ── Bottom: always-visible title + hover-expanded info ───────────── */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        {/* Red accent line — grows on hover */}
        <div
          ref={redLineRef}
          className="mb-3 h-[2px] w-16 origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />

        {/* Title — always visible */}
        <h3 className="font-display text-2xl uppercase leading-tight tracking-tight text-text-primary md:text-3xl">
          {project.title}
        </h3>

        {/* Metadata — slides up on hover */}
        <div
          ref={infoRef}
          className="mt-3 space-y-2"
          style={{ transform: "translateY(16px)", opacity: 0 }}
        >
          <p className="font-body text-sm font-light text-text-secondary">
            {project.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-condensed text-[10px] uppercase tracking-[0.35em] text-text-tertiary">
            <span>{project.location}</span>
            <span className="text-accent">·</span>
            <span>{project.year}</span>
            <span className="text-accent">·</span>
            <span>{project.area}</span>
          </div>
        </div>
      </div>
    </a>
  );
}

// ─── Custom cursor ────────────────────────────────────────────────────────────
// Follows mouse over the grid and shows "VIEW" label

function GridCursor() {
  const cursorRef  = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLSpanElement>(null);
  const isVisible  = useRef(false);

  useGSAP(() => {
    const onMove = (e: MouseEvent) => {
      if (!isVisible.current || !cursorRef.current) return;
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.25,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  });

  const show = () => {
    isVisible.current = true;
    gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" });
  };
  const hide = () => {
    isVisible.current = false;
    gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
  };

  return (
    <>
      {/* Cursor blob */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-1/2 hidden md:flex"
        style={{ top: 0, left: 0, scale: 0, opacity: 0 }}
        aria-hidden="true"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent">
          <span
            ref={labelRef}
            className="font-condensed text-[10px] font-bold uppercase tracking-[0.3em] text-white"
          >
            VIEW
          </span>
        </div>
      </div>

      {/* Invisible trigger overlay — overlaid on the grid section by the parent */}
      <div
        id="cursor-trigger"
        className="pointer-events-none absolute inset-0 hidden md:block"
        onMouseEnter={show}
        onMouseLeave={hide}
        style={{ pointerEvents: "all" }}
      />
    </>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────────

interface ProjectsGridProps {
  projects?: Project[];
  sectionLabel?: string;
  sectionTitle?: string;
}

export default function ProjectsGrid({
  projects = PROJECTS,
  sectionLabel = "Selected Works",
  sectionTitle = "STRUCTURES",
}: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("All");
  const sectionRef  = useRef<HTMLDivElement>(null);
  const headerRef   = useRef<HTMLDivElement>(null);
  const filterRef   = useRef<HTMLDivElement>(null);
  const countRef    = useRef<HTMLSpanElement>(null);
  const gridRef     = useRef<HTMLDivElement>(null);

  // Filtered list
  const filtered = projects.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  // ── Scroll-triggered reveals ──────────────────────────────────────────────
  useGSAP(
    () => {
      if (!sectionRef.current) return;
      // Header: section label + title stagger in
      const headChars = headerRef.current?.querySelectorAll(".head-char");
      const headLabel = headerRef.current?.querySelector(".section-label");
      const headMeta  = headerRef.current?.querySelector(".section-meta");

      const headCharArray = headChars ? Array.from(headChars) : [];

      if (headCharArray.length) gsap.set(headCharArray, { yPercent: 105, opacity: 0 });
      gsap.set([headLabel, headMeta].filter(Boolean) as Element[], { opacity: 0, y: 16 });

      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => {
          const tl = gsap.timeline();
          if (headLabel) tl.to(headLabel, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" });
          if (headCharArray.length) {
            tl.to(
              headCharArray,
              {
                yPercent: 0,
                opacity: 1,
                duration: 1,
                ease: "power4.out",
                stagger: { amount: 0.4 },
              },
              "-=0.4"
            );
          }
          if (headMeta) tl.to(headMeta, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");
        },
        once: true,
      });

      // Filter bar slides down
      if (filterRef.current) {
        gsap.fromTo(
          filterRef.current,
          { opacity: 0, y: -12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: filterRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // Grid cards — stagger reveal with clip-path wipe
      const cards = gridRef.current?.querySelectorAll(".project-card");
      if (cards && cards.length) {
        const cardArray = Array.from(cards);
        gsap.fromTo(
          cardArray,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.9,
            ease: "power4.out",
            stagger: {
              amount: 0.6,
              from: "start",
            },
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Re-animate cards when category changes (filter)
  const handleFilter = (cat: ProjectCategory) => {
    setActiveCategory(cat);

    // Quick wipe-out of current cards, then let React re-render new filtered set
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (cards && cards.length) {
      const cardArray = Array.from(cards);
      gsap.to(cardArray, {
        opacity: 0,
        y: 20,
        duration: 0.25,
        stagger: 0.04,
        ease: "power2.in",
        onComplete: () => {
          // After state update re-renders, animate new cards in
          requestAnimationFrame(() => {
            const newCards = gridRef.current?.querySelectorAll(".project-card");
            if (!newCards || !newCards.length) return;
            const newCardArray = Array.from(newCards);
            gsap.fromTo(
              newCardArray,
              { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                duration: 0.7,
                ease: "power4.out",
                stagger: { amount: 0.4 },
              }
            );
          });
        },
      });
    }
  };

  // Count text by category
  const displayCount = filtered.length;
  const totalCount   = projects.length;

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full bg-bg-primary px-6 py-32 md:px-20 md:py-40"
      aria-label="Projects portfolio"
    >
      {/* Custom cursor layer */}
      <GridCursor />

      {/* ── Section header ─────────────────────────────────────────────── */}
      <div
        ref={headerRef}
        className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between"
      >
        <div>
          <p className="section-label mb-4 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
            — {sectionLabel}
          </p>
          {/* Character-split heading */}
          <div className="overflow-hidden" aria-label={sectionTitle}>
            <h2 className="font-display text-[18vw] uppercase leading-[0.85] tracking-tight text-text-primary md:text-[10vw] lg:text-[8vw]">
              {sectionTitle.split("").map((char, i) => (
                <span key={i} className="head-char inline-block" aria-hidden="true">
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </h2>
          </div>
        </div>

        {/* Right: project count + view-all */}
        <div className="section-meta flex shrink-0 flex-col items-start gap-3 pb-1 md:items-end">
          <div className="flex items-baseline gap-2 font-display text-text-tertiary">
            <span ref={countRef} className="text-5xl text-text-primary">
              {String(displayCount).padStart(2, "0")}
            </span>
            <span className="text-2xl">/ {String(totalCount).padStart(2, "0")}</span>
          </div>
          <a
            href="#"
            className="group flex items-center gap-3 font-condensed text-[11px] font-bold uppercase tracking-[0.3em] text-text-secondary transition-colors hover:text-accent"
          >
            <span>View All Projects</span>
            <div className="h-px w-6 bg-current transition-all duration-300 group-hover:w-12" />
          </a>
        </div>
      </div>

      {/* ── Category filter ────────────────────────────────────────────── */}
      <div
        ref={filterRef}
        className="mb-12 flex flex-wrap gap-2 border-b border-border pb-8"
        role="tablist"
        aria-label="Filter projects by category"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => handleFilter(cat)}
            className={cn(
              "relative px-5 py-2 font-condensed text-[11px] font-bold uppercase tracking-[0.3em] transition-all duration-300",
              activeCategory === cat
                ? "bg-accent text-white"
                : "border border-border text-text-secondary hover:border-accent/50 hover:text-text-primary"
            )}
          >
            {cat}
            {/* Active dot */}
            {activeCategory === cat && (
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-text-primary" />
            )}
          </button>
        ))}
      </div>

      {/* ── Project grid ───────────────────────────────────────────────── */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:gap-6"
      >
        {filtered.map((project, i) => (
          <ProjectCard key={project.id} project={project} dataIndex={i} />
        ))}
      </div>

      {/* ── Bottom marquee strip ────────────────────────────────────────── */}
      <MarqueeStrip />
    </section>
  );
}

// ─── Marquee strip at the bottom ─────────────────────────────────────────────

function MarqueeStrip() {
  const stripRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const inner = stripRef.current?.querySelector(".marquee-inner");
      if (!inner) return;

      gsap.to(inner, {
        xPercent: -50,
        ease: "none",
        duration: 18,
        repeat: -1,
      });
    },
    { scope: stripRef }
  );

  const items = [
    "Architecture",
    "·",
    "Built Environments",
    "·",
    "Structural Design",
    "·",
    "Material Precision",
    "·",
    "Spatial Experience",
    "·",
  ];

  return (
    <div
      ref={stripRef}
      className="mt-24 overflow-hidden border-y border-border py-5"
      aria-hidden="true"
    >
      <div className="marquee-inner flex w-[200%] gap-10 whitespace-nowrap">
        {/* Duplicate for seamless loop */}
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className={cn(
              "shrink-0 font-display text-xl uppercase tracking-widest",
              item === "·" ? "text-accent" : "text-text-tertiary"
            )}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
