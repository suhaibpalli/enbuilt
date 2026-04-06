"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Opener from "@/components/animation/Opener";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientLayout({
  children,
  bebasVariable,
  barlowVariable,
  dmSansVariable,
  cormorantVariable,
}: {
  children: React.ReactNode;
  bebasVariable: string;
  barlowVariable: string;
  dmSansVariable: string;
  cormorantVariable: string;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [openerVariant, setOpenerVariant] = useState<"lift" | "blur" | "tiles" | "glow">("lift");

  // Lenis Initialization & ScrollTrigger Sync
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Theme Sync
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // URL Variant Preview
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("variant") as any;
    if (["lift", "blur", "tiles", "glow"].includes(v)) {
      setOpenerVariant(v);
    }
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className={`${bebasVariable} ${barlowVariable} ${dmSansVariable} ${cormorantVariable} min-h-full flex flex-col`}>
      <Navbar 
        showLogo={isLoaded} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />
      
      {!isLoaded && (
        <Opener 
          variant={openerVariant} 
          onComplete={() => setIsLoaded(true)} 
        />
      )}

      <main className={`flex-1 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {children}
      </main>

      {/* Variant Switcher - Minimal & Premium */}
      <div className="fixed bottom-6 left-6 z-50 flex gap-1.5 p-1.5 rounded-full border border-border bg-bg-secondary/20 backdrop-blur-md opacity-10 hover:opacity-100 transition-all duration-500">
        {["lift", "blur", "tiles", "glow"].map((v) => (
          <button
            key={v}
            onClick={() => {
              window.location.href = `?variant=${v}`;
            }}
            className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
              openerVariant === v 
                ? "bg-accent text-white scale-100" 
                : "text-text-secondary hover:text-text-primary hover:bg-bg-tertiary"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
}
