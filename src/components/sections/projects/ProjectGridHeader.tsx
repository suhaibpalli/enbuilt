"use client";

import { motion } from "framer-motion";

interface ProjectGridHeaderProps {
  sectionLabel: string;
  sectionTitle: string;
  displayCount: number;
  totalCount: number;
}

export function ProjectGridHeader({
  sectionLabel,
  sectionTitle,
  displayCount,
  totalCount,
}: ProjectGridHeaderProps) {
  return (
    <div
      className="project-grid-header mb-16 flex flex-col gap-8 md:mb-24 md:flex-row md:items-end md:justify-between"
    >
      <div className="max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-label mb-6 font-condensed text-[12px] font-bold uppercase tracking-[0.6em] text-accent"
        >
          — {sectionLabel}
        </motion.p>
        
        <div className="overflow-hidden">
          <motion.h2 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
            className="font-display text-[14vw] uppercase leading-[0.85] tracking-tight text-text-primary md:text-[8vw] lg:text-[7vw]"
          >
            {sectionTitle}
          </motion.h2>
        </div>
      </div>

      {/* Right: project count + view-all */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="section-meta flex shrink-0 flex-col items-start gap-4 pb-2 md:items-end"
      >
        <div className="flex items-baseline gap-3 font-display text-text-tertiary">
          <span className="text-6xl text-text-primary">
            {String(displayCount).padStart(2, "0")}
          </span>
          <span className="text-2xl opacity-40">/ {String(totalCount).padStart(2, "0")}</span>
        </div>
        
        <a
          href="/work"
          className="group flex items-center gap-4 font-condensed text-[12px] font-bold uppercase tracking-[0.4em] text-text-secondary transition-colors hover:text-accent"
        >
          <span className="relative overflow-hidden">
            <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full text-text-primary">
              Full Archive
            </span>
            <span className="absolute left-0 top-full inline-block transition-transform duration-500 group-hover:-translate-y-full text-accent">
              Full Archive
            </span>
          </span>
          <div className="h-[1px] w-8 bg-current transition-all duration-500 group-hover:w-16 group-hover:bg-accent" />
        </a>
      </motion.div>
    </div>
  );
}
