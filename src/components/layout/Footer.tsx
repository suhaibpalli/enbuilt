"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Structures",  href: "/#projects"       },
  { label: "Philosophy",  href: "/about#philosophy" },
  { label: "The Firm",    href: "/about"            },
  { label: "Contact",     href: "/contact"          },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn",  href: "https://linkedin.com"  },
  { label: "Archinect", href: "https://archinect.com" },
  { label: "Dezeen",    href: "https://dezeen.com"    },
];

const OFFICE_LOCATIONS = [
  {
    city: "Chennai",
    country: "India",
    address: "12, Adyar Bridge Road,\nAdyar, Chennai 600 020",
    coords: "13.0827° N, 80.2707° E",
    primary: true,
  },
  {
    city: "Dubai",
    country: "UAE",
    address: "Level 22, Boulevard Plaza,\nDowntown Dubai, UAE",
    coords: "25.2048° N, 55.2708° E",
    primary: false,
  },
];

// ─── Marquee line ─────────────────────────────────────────────────────────────

function FooterMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const inner = marqueeRef.current?.querySelector(".footer-marquee-inner");
      if (!inner) return;
      gsap.to(inner, {
        xPercent: -50,
        ease: "none",
        duration: 22,
        repeat: -1,
      });
    },
    { scope: marqueeRef }
  );

  const words = [
    "ENBUILT",
    "—",
    "Structural Integrity",
    "—",
    "Monolithic Form",
    "—",
    "Built For Permanence",
    "—",
    "Est. 2012",
    "—",
  ];

  return (
    <div
      ref={marqueeRef}
      className="overflow-hidden border-b border-border py-6"
      aria-hidden="true"
    >
      <div className="footer-marquee-inner flex w-max gap-12 whitespace-nowrap">
        {[...words, ...words, ...words, ...words].map((w, i) => (
          <span
            key={i}
            className={cn(
              "font-display text-2xl uppercase tracking-widest",
              w === "—" ? "text-accent" : "text-text-tertiary/60"
            )}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export default function Footer() {
  const footerRef  = useRef<HTMLDivElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const colsRef    = useRef<HTMLDivElement>(null);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!footerRef.current) return;

      // ── 1. Red horizontal line grows from left ──────────────────────────
      gsap.fromTo(
        redLineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.4,
          ease: "expo.out",
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            once: true,
          },
        }
      );

      // ── 2. Logo reveals from clip-path ─────────────────────────────────
      gsap.fromTo(
        logoRef.current,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );

      // ── 3. Columns stagger in from bottom ──────────────────────────────
      const cols = colsRef.current?.querySelectorAll(".footer-col");
      if (cols?.length) {
        gsap.fromTo(
          cols,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: colsRef.current,
              start: "top 88%",
              once: true,
            },
          }
        );
      }

      // ── 4. Bottom bar slides up ─────────────────────────────────────────
      gsap.fromTo(
        bottomRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bottomRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    },
    { scope: footerRef }
  );

  const year = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="relative w-full bg-bg-secondary">
      {/* Marquee strip */}
      <FooterMarquee />

      {/* Main grid */}
      <div className="mx-auto max-w-[1800px] px-6 md:px-20">

        {/* ── Big logo block ───────────────────────────────────────────── */}
        <div
          ref={logoRef}
          className="border-b border-border py-16 md:py-24"
          style={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
        >
          <Link href="/" aria-label="ENBUILT — home">
            <Logo className="w-full h-auto text-text-primary opacity-[0.07] transition-opacity duration-500 hover:opacity-[0.15]" />
          </Link>
        </div>

        {/* Red accent rule */}
        <div
          ref={redLineRef}
          className="h-[2px] origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
          aria-hidden="true"
        />

        {/* ── Columns ──────────────────────────────────────────────────── */}
        <div
          ref={colsRef}
          className="grid grid-cols-2 gap-12 py-20 md:grid-cols-4 md:gap-16"
        >
          {/* Col 1: Brand + tagline */}
          <div className="footer-col col-span-2 md:col-span-1 flex flex-col gap-8">
            <div>
              <p className="mb-3 font-condensed text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
                — ENBUILT Studio
              </p>
              <p className="font-editorial text-lg italic leading-relaxed text-text-secondary">
                "Architecture should speak of its time and place, but yearn for timelessness."
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
                Global Inquiry
              </p>
              <a
                href="mailto:studio@enbuilt.com"
                className="font-condensed text-sm font-medium text-text-primary underline-offset-4 transition-colors hover:text-accent hover:underline"
              >
                studio@enbuilt.com
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col flex flex-col gap-8">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
              — Navigate
            </p>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-4">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-3 font-condensed text-sm font-medium uppercase tracking-widest text-text-secondary transition-colors hover:text-text-primary"
                    >
                      <span className="h-[1px] w-0 bg-accent transition-all duration-300 group-hover:w-6" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3: Social */}
          <div className="footer-col flex flex-col gap-8">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
              — Follow
            </p>
            <ul className="flex flex-col gap-4">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between font-condensed text-sm font-medium uppercase tracking-widest text-text-secondary transition-colors hover:text-accent"
                  >
                    <span>{s.label}</span>
                    {/* Diagonal arrow */}
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      <line x1="1" y1="11" x2="11" y2="1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <polyline points="5,1 11,1 11,7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/>
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Office locations */}
          <div className="footer-col col-span-2 md:col-span-1 flex flex-col gap-8">
            <p className="font-condensed text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
              — Offices
            </p>
            <div className="flex flex-col gap-10">
              {OFFICE_LOCATIONS.map((office) => (
                <div key={office.city} className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-condensed text-sm font-bold uppercase tracking-widest text-text-primary">
                      {office.city}
                    </span>
                    {office.primary && (
                      <span className="border border-accent/30 bg-accent/5 px-2 py-0.5 font-condensed text-[9px] font-bold uppercase tracking-widest text-accent">
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="whitespace-pre-line font-body text-sm font-light leading-relaxed text-text-secondary">
                    {office.address}
                  </p>
                  <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
                    {office.coords}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div
          ref={bottomRef}
          className="flex flex-col items-start justify-between gap-6 border-t border-border py-8 md:flex-row md:items-center"
          style={{ opacity: 0 }}
        >
          <div className="flex flex-wrap items-center gap-6">
            <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
              © {year} ENBUILT Studio Pvt Ltd
            </p>
            <span className="text-border" aria-hidden="true">|</span>
            <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
              CIN: U74120TN2012PTC086421
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-8">
            <Link
              href="/privacy"
              className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary transition-colors hover:text-text-secondary"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary transition-colors hover:text-text-secondary"
            >
              Terms
            </Link>
            <p className="font-condensed text-[10px] uppercase tracking-[0.3em] text-text-tertiary">
              Designed & Built by{" "}
              <a
                href="https://blackquantumlabs.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent transition-opacity hover:opacity-70"
              >
                BQL
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
