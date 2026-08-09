"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Opener from "@/components/animation/Opener";
import PageTransition from "@/components/animation/PageTransition";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion";

type OpenerVariant = "lift" | "blur" | "tiles" | "glow";

// Register ScrollTrigger once at module level
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [openerVariant, setOpenerVariant] = useState<OpenerVariant>("lift");

  // Reduced-motion: skip the opener entirely and show content immediately.
  // Set from an effect (not a useState initializer) so the server-rendered
  // and first-hydrated output always match — this only ever flips true on
  // the client, one tick after mount.
  useEffect(() => {
    if (prefersReducedMotion()) {
      setIsLoaded(true);
    }
  }, []);

  // Lenis Initialization & ScrollTrigger Sync
  useEffect(() => {
    // Respect prefers-reduced-motion: fall back to native scrolling instead
    // of Lenis's smoothed/inertial scroll. CSS can't reach this — Lenis sets
    // `scroll-behavior: auto !important` on its own wrapper while active.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on("scroll", ScrollTrigger.update);

    // Store the ticker fn so we can remove the exact same reference
    const tickerFn = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerFn);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerFn); // ✅ removes the exact fn reference
    };
  }, []);

  // URL Variant Preview
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("variant");
    if (v === "lift" || v === "blur" || v === "tiles" || v === "glow") {
      setOpenerVariant(v);
    }
  }, []);

  return (
    <div className="min-h-full flex flex-col">
      <Navbar showLogo={isLoaded} />

      {!isLoaded && (
        <Opener 
          variant={openerVariant} 
          onComplete={() => setIsLoaded(true)} 
        />
      )}

      <PageTransition />
      <main className={`flex-1 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        {children}
      </main>

      <Footer />

      {/* Variant Switcher - dev-only preview control, never ships to production */}
      {process.env.NODE_ENV === "development" && (
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
      )}
    </div>
  );
}
