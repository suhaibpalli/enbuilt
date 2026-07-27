/**
 * Shared reduced-motion detection for GSAP-driven components.
 *
 * framer-motion components should use its own `useReducedMotion()` hook
 * instead — this helper is for the GSAP/useGSAP call sites, which need a
 * plain synchronous check at the top of the animation setup callback.
 */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}
