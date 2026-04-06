"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import Logo from "@/components/ui/Logo";

// Register the useGSAP hook
gsap.registerPlugin(useGSAP);

type OpenerVariant = "lift" | "blur" | "tiles" | "glow";

interface OpenerProps {
  onComplete: () => void;
  variant?: OpenerVariant;
}

export default function Opener({ onComplete, variant = "lift" }: OpenerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const tilesContainerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
      defaults: { ease: "power4.inOut", duration: 1.5 }
    });

    // 1. Initial State - Setup logo for "sketch" effect
    const logoPaths = logoRef.current?.querySelectorAll(".logo-path");
    
    if (logoPaths && logoPaths.length > 0) {
      // Set initial stroke state for drawing effect
      tl.set(logoPaths, { 
        fillOpacity: 0, 
        stroke: "rgba(255,255,255,0.4)", 
        strokeWidth: 0.5,
        strokeDasharray: 2000,
        strokeDashoffset: 2000
      });
      
      tl.set(logoRef.current, { autoAlpha: 1, scale: 0.7 });

      // 2. Sketch Animation (Drawing the logo)
      tl.to(logoPaths, { 
        strokeDashoffset: 0, 
        stagger: { amount: 1.2, from: "start" }, 
        duration: 1.8, 
        ease: "power2.inOut" 
      })
      .to(logoPaths, { 
        fillOpacity: 1, 
        strokeOpacity: 0, 
        duration: 1, 
        ease: "power1.inOut" 
      }, "-=0.6");
    } else {
      // Fallback if paths can't be found
      tl.to(logoRef.current, { autoAlpha: 1, duration: 1 });
    }

    // 3. Entrance Sequence based on variant
    const moveLogoAction = animateLogoToNavbar();

    if (variant === "lift") {
      tl.to(leftPanelRef.current, { xPercent: -100, duration: 1.2 }, "+=0.2")
        .to(rightPanelRef.current, { xPercent: 100, duration: 1.2 }, "<");
      
      if (moveLogoAction) tl.add(moveLogoAction, "<");
    } 
    else if (variant === "blur") {
      tl.set(containerRef.current, { backdropFilter: "blur(40px)", backgroundColor: "rgba(0,0,0,0.8)" })
        .to(containerRef.current, { 
          backdropFilter: "blur(0px)", 
          backgroundColor: "rgba(0,0,0,0)", 
          duration: 1.5 
        }, "+=0.3");
      
      if (moveLogoAction) tl.add(moveLogoAction, "<");
    }
    else if (variant === "tiles") {
      const tiles = tilesContainerRef.current?.querySelectorAll(".opener-tile");
      if (tiles) {
        tl.to(tiles, { 
          scale: 0, 
          opacity: 0, 
          stagger: { amount: 0.8, from: "center", grid: [5, 5] },
          duration: 1
        }, "+=0.5");
      }
      
      if (moveLogoAction) tl.add(moveLogoAction, "<0.2");
    }
    else if (variant === "glow") {
      tl.to(glowRef.current, { opacity: 0.5, scale: 2, duration: 2 }, "-=1")
        .to(glowRef.current, { opacity: 0, scale: 4, duration: 1.5 }, "+=0.2");
      
      if (moveLogoAction) tl.add(moveLogoAction, "<");
    }

    // Helper to calculate and animate logo to navbar position
    function animateLogoToNavbar() {
      const navbarLogo = document.querySelector("#navbar-logo");
      if (!navbarLogo || !logoRef.current) return;

      const navRect = navbarLogo.getBoundingClientRect();
      const logoRect = logoRef.current.getBoundingClientRect();

      // Calculate the transform needed
      const deltaX = navRect.left + navRect.width / 2 - (logoRect.left + logoRect.width / 2);
      const deltaY = navRect.top + navRect.height / 2 - (logoRect.top + logoRect.height / 2);
      const targetScale = navRect.width / logoRect.width;

      const logoTl = gsap.timeline({
        onComplete: () => {
          gsap.set(logoRef.current, { opacity: 0 });
        }
      });

      // Add a slight shimmer/brightness pulse as it moves
      logoTl.to(logoRef.current, {
        x: deltaX,
        y: deltaY,
        scale: targetScale,
        duration: 1.4,
        ease: "expo.inOut",
        filter: "brightness(1.5) blur(0.5px)",
      })
      .to(logoRef.current, {
        filter: "brightness(1) blur(0px)",
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.6");

      return logoTl;
    }

  }, { scope: containerRef, dependencies: [variant] });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none"
    >
      {/* Drafting Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Background Panels for 'lift' variant */}
      {variant === "lift" && (
        <>
          <div ref={leftPanelRef} className="absolute inset-y-0 left-0 w-1/2 bg-[#0a0a0a] border-r border-white/5 pointer-events-auto" />
          <div ref={rightPanelRef} className="absolute inset-y-0 right-0 w-1/2 bg-[#0a0a0a] border-l border-white/5 pointer-events-auto" />
        </>
      )}

      {/* Tiles for 'tiles' variant */}
      {variant === "tiles" && (
        <div ref={tilesContainerRef} className="absolute inset-0 grid grid-cols-5 grid-rows-5 pointer-events-auto bg-black">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="opener-tile bg-[#0d0d0d] border-[0.5px] border-white/10" />
          ))}
        </div>
      )}

      {/* Glow for 'glow' variant */}
      {variant === "glow" && (
        <div className="absolute inset-0 bg-black pointer-events-auto">
          <div 
            ref={glowRef} 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/20 blur-[120px] rounded-full opacity-0 scale-50" 
          />
        </div>
      )}

      {/* Blur overlay for 'blur' variant is handled by containerRef styling in GSAP */}
      {variant === "blur" && <div className="absolute inset-0 bg-black/60 pointer-events-auto" />}

      {/* The Logo */}
      <div ref={logoRef} className="relative z-10">
        <Logo className="w-[75vw] max-w-[1400px] h-auto text-white" />
      </div>
    </div>
  );
}
