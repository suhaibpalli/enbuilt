"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProjectCategory } from "./types";
import { CATEGORIES } from "./projects-data";

interface ProjectFilterProps {
  activeCategory: ProjectCategory;
  onFilter: (category: ProjectCategory) => void;
}

export function ProjectFilter({ activeCategory, onFilter }: ProjectFilterProps) {
  return (
    <div
      className="mb-16 flex flex-wrap gap-3 border-b border-border/50 pb-10"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {CATEGORIES.map((cat, i) => (
        <motion.button
          key={cat}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          role="tab"
          aria-selected={activeCategory === cat}
          onClick={() => onFilter(cat)}
          className={cn(
            "group relative px-6 py-2.5 font-condensed text-[12px] font-bold uppercase tracking-[0.4em] transition-all duration-500",
            activeCategory === cat
              ? "text-white"
              : "text-text-secondary hover:text-text-primary"
          )}
        >
          {/* Background fill */}
          {activeCategory === cat && (
            <motion.div 
              layoutId="activeFilter"
              className="absolute inset-0 bg-accent"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          
          <span className="relative z-10">{cat}</span>
          
          {/* Hover underline */}
          {activeCategory !== cat && (
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-full" />
          )}
        </motion.button>
      ))}
    </div>
  );
}
