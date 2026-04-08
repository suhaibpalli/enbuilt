"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { PROJECTS_DATA } from "@/lib/projects-data";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

type ViewMode = "split" | "grid" | "table";
type FilterCategory = "All" | "Residential" | "Commercial" | "Cultural" | "Interiors";

interface ProjectEntry {
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  year: string;
  area: string;
  typology: string;
  heroImage: string;
  category: FilterCategory;
}

// ─── Derive flat list from projects-data ─────────────────────────────────────

const typologyToCategory = (typology: string): FilterCategory => {
  if (typology.toLowerCase().includes("residential") || typology.toLowerCase().includes("villa")) return "Residential";
  if (typology.toLowerCase().includes("commercial") || typology.toLowerCase().includes("office") || typology.toLowerCase().includes("campus")) return "Commercial";
  if (typology.toLowerCase().includes("cultural") || typology.toLowerCase().includes("public")) return "Cultural";
  if (typology.toLowerCase().includes("interior")) return "Interiors";
  return "Commercial";
};

const ALL_PROJECTS: ProjectEntry[] = Object.values(PROJECTS_DATA).map((p) => ({
  slug: p.slug,
  title: p.title,
  subtitle: p.subtitle,
  location: p.location,
  year: p.year,
  area: p.area,
  typology: p.typology,
  heroImage: p.heroImage,
  category: typologyToCategory(p.typology),
}));

const CATEGORIES: FilterCategory[] = ["All", "Residential", "Commercial", "Cultural", "Interiors"];

// ─── View mode icons ──────────────────────────────────────────────────────────

const SplitIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="6" height="16" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="9" y="1" width="8" height="7" rx="1" fill="currentColor" opacity="0.4"/>
    <rect x="9" y="10" width="8" height="7" rx="1" fill="currentColor" opacity="0.4"/>
  </svg>
);

const GridIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="7" height="7" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="10" y="1" width="7" height="7" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="1" y="10" width="7" height="7" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="10" y="10" width="7" height="7" rx="1" fill="currentColor" opacity="0.9"/>
  </svg>
);

const TableIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="1" y="1" width="16" height="2.5" rx="1" fill="currentColor" opacity="0.9"/>
    <rect x="1" y="5.5" width="16" height="2" rx="0.5" fill="currentColor" opacity="0.5"/>
    <rect x="1" y="9.5" width="16" height="2" rx="0.5" fill="currentColor" opacity="0.5"/>
    <rect x="1" y="13.5" width="16" height="2" rx="0.5" fill="currentColor" opacity="0.5"/>
  </svg>
);

// ─── Split View (apax-inspired) ───────────────────────────────────────────────

function SplitView({ projects }: { projects: ProjectEntry[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeImage, setActiveImage] = useState(projects[0]?.heroImage ?? "");
  const imageRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleHover = useCallback((idx: number, img: string) => {
    setHoveredIndex(idx);
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.15,
      ease: "power2.in",
      onComplete: () => {
        setActiveImage(img);
        gsap.to(imageRef.current, { opacity: 1, duration: 0.2, ease: "power2.out" });
      },
    });
  }, []);

  const handleLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  useGSAP(
    () => {
      const rows = containerRef.current?.querySelectorAll(".split-row");
      if (!rows?.length) return;
      gsap.fromTo(
        rows,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out",
        }
      );
    },
    { scope: containerRef, dependencies: [projects.length] }
  );

  return (
    <div className="flex h-full min-h-screen">
      {/* Left — scrollable project list */}
      <div
        ref={containerRef}
        className="w-full md:w-[45%] overflow-y-auto border-r border-border"
      >
        {projects.map((project, i) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="split-row group flex items-start justify-between gap-6 border-b border-border px-6 py-6 md:px-10 md:py-7 transition-colors hover:bg-bg-secondary/50"
            onMouseEnter={() => handleHover(i, project.heroImage)}
            onMouseLeave={handleLeave}
          >
            {/* Index */}
            <span className="mt-1 font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-text-tertiary w-8 shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Title block */}
            <div className="flex-1 min-w-0">
              <h3
                className={cn(
                  "font-display text-2xl uppercase leading-none tracking-tight transition-colors duration-200 md:text-3xl",
                  hoveredIndex === i ? "text-accent" : "text-text-primary"
                )}
              >
                {project.title}
              </h3>
              <p className="mt-2 font-condensed text-[10px] uppercase tracking-[0.35em] text-text-tertiary">
                {project.typology}
              </p>
            </div>

            {/* Right meta */}
            <div className="text-right shrink-0 hidden sm:block">
              <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-secondary">
                {project.location}
              </p>
              <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
                {project.year}
              </p>
            </div>

            {/* Hover arrow */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={cn(
                "shrink-0 mt-1 text-accent transition-all duration-300",
                hoveredIndex === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
              )}
            >
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        ))}
      </div>

      {/* Right — sticky image panel */}
      <div className="hidden md:block md:w-[55%] sticky top-0 h-screen overflow-hidden">
        <div ref={imageRef} className="relative w-full h-full">
          {activeImage && (
            <Image
              src={activeImage}
              alt="Project preview"
              fill
              sizes="55vw"
              className="object-cover"
              priority
            />
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-bg-primary/30" />

          {/* Project count */}
          <div className="absolute top-8 right-8 font-display text-7xl text-white/10 leading-none">
            {String(projects.length).padStart(2, "0")}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Grid View ────────────────────────────────────────────────────────────────

function GridView({ projects }: { projects: ProjectEntry[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gridRef.current?.querySelectorAll(".grid-card");
      if (!cards?.length) return;
      gsap.fromTo(
        cards,
        { clipPath: "inset(100% 0 0 0)", opacity: 0 },
        {
          clipPath: "inset(0% 0 0 0)",
          opacity: 1,
          stagger: { amount: 0.5 },
          duration: 0.8,
          ease: "power4.out",
        }
      );
    },
    { scope: gridRef, dependencies: [projects.length] }
  );

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-6 py-8 md:px-10"
    >
      {projects.map((project) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className="grid-card group relative aspect-[4/5] overflow-hidden border border-border bg-bg-secondary block"
        >
          <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/90 via-bg-primary/20 to-transparent" />
          <div className="absolute inset-0 bg-bg-primary/0 group-hover:bg-bg-primary/30 transition-colors duration-500" />

          {/* Top meta */}
          <div className="absolute top-5 left-5 flex items-center gap-3">
            <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              {project.year}
            </span>
          </div>

          {/* Arrow */}
          <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-accent">
              <line x1="2" y1="16" x2="16" y2="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <polyline points="7,2 16,2 16,11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="mb-2 h-[1px] w-0 bg-accent transition-all duration-500 group-hover:w-12" />
            <h3 className="font-display text-2xl uppercase leading-tight text-text-primary">
              {project.title}
            </h3>
            <p className="mt-1 font-condensed text-[10px] uppercase tracking-[0.3em] text-text-secondary">
              {project.typology} · {project.location}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ─── Table View ───────────────────────────────────────────────────────────────

function TableView({ projects }: { projects: ProjectEntry[] }) {
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    if (previewRef.current) {
      gsap.to(previewRef.current, {
        x: e.clientX - rect.left + 24,
        y: e.clientY - rect.top - 80,
        duration: 0.15,
        ease: "power2.out",
      });
    }
  }, []);

  useGSAP(
    () => {
      const rows = tableRef.current?.querySelectorAll(".table-row");
      if (!rows?.length) return;
      gsap.fromTo(
        rows,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.04,
          duration: 0.5,
          ease: "power3.out",
        }
      );
    },
    { scope: tableRef, dependencies: [projects.length] }
  );

  const hoveredProject = projects.find((p) => p.slug === hoveredSlug);

  return (
    <div
      ref={tableRef}
      className="relative px-6 md:px-10 py-8"
      onMouseMove={handleMouseMove}
    >
      {/* Floating image preview */}
      <div
        ref={previewRef}
        className="pointer-events-none absolute z-30 h-48 w-72 overflow-hidden border border-white/10"
        style={{
          opacity: hoveredSlug ? 1 : 0,
          transition: "opacity 0.2s",
          top: 0,
          left: 0,
        }}
      >
        {hoveredProject && (
          <Image
            src={hoveredProject.heroImage}
            alt={hoveredProject.title}
            fill
            sizes="288px"
            className="object-cover"
          />
        )}
      </div>

      {/* Header row */}
      <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr_0.5fr] gap-4 border-b border-border pb-4 mb-2">
        {["Project Name", "Typology", "Location", "Area", "Year"].map((h) => (
          <span key={h} className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-text-tertiary">
            {h}
          </span>
        ))}
      </div>

      {/* Data rows */}
      {projects.map((project, i) => (
        <Link
          key={project.slug}
          href={`/projects/${project.slug}`}
          className={cn(
            "table-row grid grid-cols-[2fr_1.5fr_1fr_1fr_0.5fr] gap-4 items-center border-b border-border py-5 transition-colors duration-200",
            hoveredSlug === project.slug ? "bg-bg-secondary/50" : "hover:bg-bg-secondary/30"
          )}
          onMouseEnter={() => setHoveredSlug(project.slug)}
          onMouseLeave={() => setHoveredSlug(null)}
        >
          {/* Name */}
          <div className="flex items-center gap-4 min-w-0">
            <span className="font-condensed text-[10px] font-bold text-text-tertiary shrink-0">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={cn(
                "font-display text-xl uppercase leading-none truncate transition-colors",
                hoveredSlug === project.slug ? "text-accent" : "text-text-primary"
              )}
            >
              {project.title}
            </span>
          </div>

          {/* Typology */}
          <span className="font-condensed text-[11px] uppercase tracking-[0.25em] text-text-secondary truncate">
            {project.typology}
          </span>

          {/* Location */}
          <span className="font-condensed text-[11px] uppercase tracking-[0.25em] text-text-secondary">
            {project.location}
          </span>

          {/* Area */}
          <span className="font-condensed text-[11px] uppercase tracking-[0.25em] text-text-tertiary">
            {project.area}
          </span>

          {/* Year */}
          <span className="font-condensed text-[11px] uppercase tracking-[0.25em] text-text-tertiary">
            {project.year}
          </span>
        </Link>
      ))}

      {/* Total */}
      <div className="mt-6 flex items-center justify-between">
        <span className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
          {projects.length} projects
        </span>
        <div className="h-px w-24 bg-accent/30" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProjectsListPage() {
  const [view, setView] = useState<ViewMode>("split");
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const pageRef = useRef<HTMLDivElement>(null);

  const filtered = ALL_PROJECTS.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  // Header entrance
  useGSAP(
    () => {
      gsap.fromTo(
        ".header-el",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: "power3.out", delay: 0.3 }
      );
    },
    { scope: pageRef }
  );

  return (
    <div ref={pageRef} className="min-h-screen w-full bg-bg-primary text-text-primary">
      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 flex flex-col gap-0 bg-bg-primary/95 backdrop-blur-md border-b border-border">
        {/* Title row */}
        <div className="flex items-end justify-between px-6 pt-24 pb-5 md:px-10">
          <div className="header-el">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-2">
              — Selected Works
            </p>
            <h1 className="font-display text-4xl uppercase leading-none text-text-primary md:text-5xl">
              Projects
            </h1>
          </div>

          {/* View mode toggles */}
          <div className="header-el flex items-center gap-1 border border-border p-1">
            {(["split", "grid", "table"] as ViewMode[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "p-2.5 transition-all duration-200",
                  view === v ? "bg-accent text-white" : "text-text-tertiary hover:text-text-primary"
                )}
                aria-label={`${v} view`}
              >
                {v === "split" && <SplitIcon />}
                {v === "grid" && <GridIcon />}
                {v === "table" && <TableIcon />}
              </button>
            ))}
          </div>
        </div>

        {/* Filter tabs */}
        <div className="header-el flex items-center gap-1 overflow-x-auto px-6 pb-5 md:px-10 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "shrink-0 px-4 py-1.5 font-condensed text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-200",
                activeCategory === cat
                  ? "bg-accent text-white"
                  : "border border-border text-text-secondary hover:text-text-primary hover:border-accent/40"
              )}
            >
              {cat}
              {activeCategory === cat && (
                <span className="ml-2 text-white/70">
                  {String(filtered.length).padStart(2, "0")}
                </span>
              )}
            </button>
          ))}

          <div className="ml-auto shrink-0 font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
            {String(filtered.length).padStart(2, "0")} / {String(ALL_PROJECTS.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* ── Views ──────────────────────────────────────────────────────── */}
      <div className="min-h-screen">
        {view === "split" && <SplitView projects={filtered} />}
        {view === "grid"  && <GridView  projects={filtered} />}
        {view === "table" && <TableView projects={filtered} />}
      </div>
    </div>
  );
}
