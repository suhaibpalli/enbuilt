"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollCubeProps {
  images?: string[];
  /** Scroll distance in vh to complete one full 360° rotation. Default 300 */
  scrollDistance?: number;
  /** Axis of rotation. Default 'Y' */
  axis?: "X" | "Y";
  /** Size of the cube in px. Default 280 */
  size?: number;
}

const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80&auto=format",
];

export default function ScrollCube({
  images = DEFAULT_IMAGES,
  scrollDistance = 300,
  axis = "Y",
  size = 280,
}: ScrollCubeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cubeRef    = useRef<HTMLDivElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const half = size / 2;

  // 6 faces: front, back, right, left, top, bottom
  const faces = [
    { label: "Front",  transform: `translateZ(${half}px)` },
    { label: "Back",   transform: `rotateY(180deg) translateZ(${half}px)` },
    { label: "Right",  transform: `rotateY(90deg) translateZ(${half}px)` },
    { label: "Left",   transform: `rotateY(-90deg) translateZ(${half}px)` },
    { label: "Top",    transform: `rotateX(90deg) translateZ(${half}px)` },
    { label: "Bottom", transform: `rotateX(-90deg) translateZ(${half}px)` },
  ];

  useGSAP(
    () => {
      if (!sectionRef.current || !cubeRef.current) return;

      // Initial cube entrance
      gsap.fromTo(
        cubeRef.current,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      // Rotation on scroll — 360° per scrollDistance vh
      const rotationProp = axis === "Y" ? "rotationY" : "rotationX";

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: `+=${scrollDistance}%`,
        scrub: 1.2,
        onUpdate(self) {
          const deg = self.progress * 360;
          gsap.set(cubeRef.current, { [rotationProp]: deg });

          // Update progress bar
          if (progressRef.current) {
            progressRef.current.style.height = `${self.progress * 100}%`;
          }
        },
      });

      // Label fade in
      if (labelRef.current) {
        gsap.fromTo(
          labelRef.current.querySelectorAll(".label-el"),
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
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
      className="relative w-full bg-bg-secondary overflow-hidden py-32 md:py-48"
      aria-label="Rotating architectural showcase"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(240,242,245,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,242,245,1) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <div className="flex flex-col items-center gap-16 md:flex-row md:gap-24">

          {/* Left: Text block */}
          <div ref={labelRef} className="flex-1 max-w-lg">
            <p className="label-el mb-6 font-condensed text-[11px] font-bold uppercase tracking-[0.5em] text-accent">
              — Our Portfolio
            </p>
            <h2 className="label-el font-display text-5xl uppercase leading-none text-text-primary md:text-7xl">
              Every<br />Structure<br />Tells A<br />Story
            </h2>
            <p className="label-el mt-8 font-body text-lg font-light leading-relaxed text-text-secondary max-w-sm">
              Six projects. Six philosophies. One unwavering commitment to material honesty and structural precision.
            </p>
            <div className="label-el mt-10 flex items-center gap-6">
              <div className="relative h-32 w-[2px] bg-border">
                <div
                  ref={progressRef}
                  className="absolute top-0 left-0 w-full bg-accent"
                  style={{ height: "0%" }}
                />
              </div>
              <p className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
                Scroll to rotate
              </p>
            </div>
          </div>

          {/* Right: 3D Cube */}
          <div
            className="flex-1 flex items-center justify-center"
            style={{
              perspective: `${size * 3}px`,
              perspectiveOrigin: "50% 50%",
            }}
          >
            <div
              ref={cubeRef}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                position: "relative",
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {faces.map((face, i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    width: `${size}px`,
                    height: `${size}px`,
                    transform: face.transform,
                    backfaceVisibility: "visible",
                    overflow: "hidden",
                    border: "1px solid rgba(240,242,245,0.08)",
                  }}
                >
                  {images[i] && (
                    <Image
                      src={images[i]}
                      alt={`Project ${i + 1}`}
                      fill
                      sizes={`${size}px`}
                      className="object-cover"
                    />
                  )}
                  {/* Accent overlay */}
                  <div className="absolute inset-0 bg-bg-primary/30" />
                  {/* Face label */}
                  <div className="absolute bottom-4 left-4">
                    <span className="font-condensed text-[9px] font-bold uppercase tracking-[0.4em] text-white/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Corner marks */}
      {["top-6 left-6 border-l border-t", "top-6 right-6 border-r border-t",
        "bottom-6 left-6 border-b border-l", "bottom-6 right-6 border-b border-r"].map((cls, i) => (
        <span
          key={i}
          className={`absolute h-4 w-4 border-white/10 ${cls}`}
          aria-hidden="true"
        />
      ))}
    </section>
  );
}
