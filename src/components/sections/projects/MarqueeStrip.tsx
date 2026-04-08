"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ITEMS = [
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

export function MarqueeStrip() {
  return (
    <div
      className="mt-32 overflow-hidden border-y border-border/50 py-8"
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-16 pr-16"
        >
          {/* Duplicate for seamless loop */}
          {[...ITEMS, ...ITEMS, ...ITEMS, ...ITEMS].map((item, i) => (
            <span
              key={i}
              className={cn(
                "shrink-0 font-display text-2xl uppercase tracking-[0.2em] md:text-3xl",
                item === "·" ? "text-accent" : "text-text-tertiary/40"
              )}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
