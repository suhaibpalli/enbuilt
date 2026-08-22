"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Logo from "@/components/ui/Logo";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * PageTransition
 * A red architectural wipe stripe that plays on every route change, with the
 * logo flashing centered on screen while the wipe covers it.
 * Mounts as a fixed overlay, sweeps across, then retreats — revealing the new page.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const wipeRef  = useRef<HTMLDivElement>(null);
  const logoRef  = useRef<HTMLDivElement>(null);
  const isFirst  = useRef(true);

  // Animate a horizontal wipe on route change
  useEffect(() => {
    if (isFirst.current) {
      // Skip animation on very first mount (opener handles it)
      isFirst.current = false;
      return;
    }

    if (!wipeRef.current) return;

    // Skip the wipe — just make sure it's parked off-screen, never left
    // covering the viewport.
    if (prefersReducedMotion()) {
      gsap.set(wipeRef.current, { x: -window.innerWidth });
      gsap.set(logoRef.current, { opacity: 0 });
      return;
    }

    // Defend against overlapping runs (e.g. React Strict Mode's double
    // effect invocation in dev) — without this, two timelines can fight
    // over the same transform and the wipe never cleanly reaches 0%.
    gsap.killTweensOf([wipeRef.current, logoRef.current]);

    // Pixel-based x, not xPercent — xPercent asks GSAP to measure the
    // element's own rendered width on every run, and that measurement has
    // been landing on stale/doubled values here (mid-transition layout is
    // in flux as the old page unmounts and the new one mounts). A plain
    // pixel offset from the current viewport width sidesteps that.
    const vw = window.innerWidth;
    gsap.set(wipeRef.current, { x: -vw });
    gsap.set(logoRef.current, { opacity: 0 });

    // Logo is a separate fixed, centered layer (not inside the sliding
    // panel) so it flashes in place on screen rather than traveling with
    // the wipe — fades in only once the panel has (nearly) fully covered
    // the viewport, and fades out just before it retreats.
    const tl = gsap.timeline();
    tl.to(wipeRef.current, { x: 0, opacity: 1, duration: 0.95, ease: "power4.inOut" }, 0)
      .to(logoRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" }, 0.55)
      .to(logoRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" }, 1.05)
      .to(wipeRef.current, { x: -vw, duration: 0.95, ease: "power4.inOut" }, 1.15);

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={wipeRef}
        className="pointer-events-none fixed inset-0 z-[9999] bg-accent"
        style={{ transform: "translateX(-100%)" }}
        aria-hidden="true"
      />
      <div
        ref={logoRef}
        className="pointer-events-none fixed inset-0 z-[10000] flex items-center justify-center opacity-0"
        aria-hidden="true"
      >
        <Logo className="h-auto w-40 text-white md:w-56" />
      </div>
    </>
  );
}
