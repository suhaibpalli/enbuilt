"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
  /**
   * The intensity of the parallax effect. 
   * Higher values = more movement.
   * Default: 15 (percentage)
   */
  speed?: number;
  sizes?: string;
}

/**
 * A premium parallax image component.
 * Ensures the image is always larger than the container so it has room to move.
 */
export default function ParallaxImage({
  src,
  alt,
  fill = true,
  width,
  height,
  priority = false,
  className,
  containerClassName,
  speed = 15,
  sizes = "100vw",
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !imageRef.current) return;

      gsap.to(imageRef.current, {
        yPercent: speed,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", containerClassName)}
    >
      <div
        ref={imageRef}
        className="absolute inset-[-20%] h-[140%] w-[140%] will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={width}
          height={height}
          priority={priority}
          sizes={sizes}
          className={cn("object-cover", className)}
        />
      </div>
    </div>
  );
}
