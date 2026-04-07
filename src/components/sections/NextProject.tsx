"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface NextProjectProps {
  title: string;
  slug: string;
  imageSrc: string;
}

export default function NextProject({ title, slug, imageSrc }: NextProjectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP({ scope: containerRef });

  const onMouseEnter = contextSafe(() => {
    gsap.to(previewRef.current, {
      opacity: 1,
      scale: 1,
      y: -20,       // lifts up slightly from below the text
      rotate: -3,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0,
      y: 0,
      rotate: 0,
      duration: 0.4,
      ease: "power3.in",
    });
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-bg-primary py-40 md:py-60 px-6 md:px-16 flex flex-col items-center justify-center text-center"
    >
      <span className="font-condensed text-accent text-[12px] uppercase tracking-[0.5em] font-bold mb-8">
        — Next Project
      </span>

      <Link
        href={`/projects/${slug}`}
        className="group relative inline-block"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <h2 className="font-display text-[12vw] md:text-[8vw] text-text-primary uppercase leading-none transition-colors group-hover:text-accent">
          {title}
        </h2>
        
        {/* Animated underline */}
        <div className="absolute -bottom-4 left-0 h-[2px] w-0 bg-accent transition-all duration-500 group-hover:w-full" />
      </Link>

      {/* Floating Preview Card */}
      <div
        ref={previewRef}
        className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[450px] -z-10 overflow-hidden border border-white/10 shadow-2xl"
        style={{ opacity: 0, scale: 0 } as React.CSSProperties}
      >
        <Image
          src={imageSrc}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 450px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-bg-primary/20" />
      </div>

      <div className="mt-20">
        <Link 
          href="/"
          className="font-condensed text-[11px] uppercase tracking-[0.3em] text-text-tertiary hover:text-text-primary transition-colors"
        >
          Back to Index
        </Link>
      </div>
    </section>
  );
}
