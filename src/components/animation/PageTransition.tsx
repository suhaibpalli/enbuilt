"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * PageTransition
 * A red architectural wipe stripe that plays on every route change.
 * Mounts as a fixed overlay, sweeps across, then retreats — revealing the new page.
 */
export default function PageTransition() {
  const pathname = usePathname();
  const wipeRef  = useRef<HTMLDivElement>(null);
  const isFirst  = useRef(true);

  // Animate a horizontal wipe on route change
  useEffect(() => {
    if (isFirst.current) {
      // Skip animation on very first mount (opener handles it)
      isFirst.current = false;
      return;
    }

    if (!wipeRef.current) return;

    const tl = gsap.timeline();

    // 1. Wipe enters from left → covers screen
    tl.fromTo(
      wipeRef.current,
      { xPercent: -100, opacity: 1 },
      { xPercent: 0, duration: 0.55, ease: "power4.inOut" }
    )
    // 2. Hold briefly, then wipe exits to right
    .to(
      wipeRef.current,
      { xPercent: 100, duration: 0.55, ease: "power4.inOut", delay: 0.05 }
    )
    // 3. Reset off-screen for next use
    .set(wipeRef.current, { xPercent: -100 });
  }, [pathname]);

  return (
    <div
      ref={wipeRef}
      className="pointer-events-none fixed inset-0 z-9999 bg-accent"
      style={{ transform: "translateX(-100%)" }}
      aria-hidden="true"
    />
  );
}
