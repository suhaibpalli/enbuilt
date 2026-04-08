"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Project } from "./types";

interface ProjectCardProps {
  project: Project;
  /** data-index for layout positioning if needed */
  dataIndex: number;
}

export function ProjectCard({ project, dataIndex }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax effect for the image inside the card
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative h-full w-full overflow-hidden bg-bg-secondary",
        "border border-border/50 transition-colors duration-500 hover:border-accent/30"
      )}
    >
      {/* ── Image with Parallax ─────────────────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y, height: "120%", top: "-10%" }}
          className="relative w-full"
        >
          <Image
            src={project.imageSrc}
            alt={project.imageAlt}
            fill
            priority={dataIndex < 2}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
            draggable={false}
          />
        </motion.div>
      </div>

      {/* ── Overlays ────────────────────────────────────────────────────── */}
      {/* Base gradient for readability */}
      <div className="absolute inset-0 bg-linear-to-t from-bg-primary/90 via-bg-primary/20 to-transparent opacity-60" />
      
      {/* Interactive hover overlay */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        {/* Index + Category Tag */}
        <div className="mb-auto flex items-center justify-between opacity-0 transition-all duration-500 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0">
          <div className="flex flex-col">
            <span className="font-condensed text-[10px] font-bold uppercase tracking-[0.4em] text-accent">
              {project.index}
            </span>
            {project.coords && (
              <span className="mt-1 font-condensed text-[8px] uppercase tracking-[0.2em] text-text-tertiary">
                {project.coords}
              </span>
            )}
          </div>
          <span className="bg-bg-primary/80 px-2 py-1 backdrop-blur-sm font-condensed text-[9px] uppercase tracking-[0.2em] text-text-secondary">
            {project.category}
          </span>
        </div>

        {/* Title & Info */}
        <div className="relative z-10 translate-y-4 transition-transform duration-500 ease-out group-hover:translate-y-0">
          <div className="flex items-end justify-between">
            <h3 className="font-display text-2xl uppercase leading-none tracking-tight text-text-primary md:text-3xl lg:text-4xl">
              {project.title}
            </h3>
            <span className="mb-1 font-condensed text-[9px] font-bold uppercase tracking-widest text-accent">
              {project.status}
            </span>
          </div>
          
          <div className="mt-4 overflow-hidden">
            <div className="translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
              <p className="font-body text-sm font-light text-text-secondary line-clamp-1">
                {project.subtitle}
              </p>
              
              <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4 font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
                <span>{project.location}</span>
                <span className="text-accent">·</span>
                <span>{project.year}</span>
                <span className="text-accent">·</span>
                <span>{project.area}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Magnetic Arrow Link ────────────────────────────────────────── */}
      <div className="absolute right-6 top-6 h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-500 scale-0 group-hover:scale-100 hidden md:flex">
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="none"
          className="text-white transition-transform duration-500 group-hover:rotate-45"
        >
          <line x1="3" y1="17" x2="17" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <polyline points="8,3 17,3 17,12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        </svg>
      </div>

      {/* Click layer */}
      <a 
        href={project.href ?? "#"} 
        className="absolute inset-0 z-20"
        aria-label={`View project: ${project.title}`}
      />
    </div>
  );
}
