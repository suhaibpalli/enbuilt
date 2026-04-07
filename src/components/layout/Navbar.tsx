"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface NavbarProps {
  showLogo?: boolean;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

const NAV_LINKS = [
  { label: "Structures",  href: "/#projects" },
  { label: "Philosophy",  href: "/about#philosophy" },
  { label: "The Firm",    href: "/about" },
  { label: "Contact",     href: "/contact" },
];

export default function Navbar({ showLogo = false, theme, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef   = useRef<HTMLDivElement>(null);
  const linksRef     = useRef<HTMLDivElement>(null);
  const burgerTopRef    = useRef<HTMLSpanElement>(null);
  const burgerMidRef    = useRef<HTMLSpanElement>(null);
  const burgerBotRef    = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // ── Mobile menu GSAP animation ──────────────────────────────────────────────
  const { contextSafe } = useGSAP({ scope: overlayRef });

  const openMenu = contextSafe(() => {
    setIsOpen(true);
    const overlay = overlayRef.current;
    if (!overlay) return;

    overlay.style.display = "flex";

    const tl = gsap.timeline();

    // Animate overlay in
    tl.fromTo(overlay, 
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power4.inOut" }
    );

    // Burger → X transform
    if (burgerTopRef.current && burgerMidRef.current && burgerBotRef.current) {
      tl.to(burgerTopRef.current, { y: 7, rotate: 45, duration: 0.3, ease: "power3.inOut" }, 0)
        .to(burgerMidRef.current, { opacity: 0, scaleX: 0, duration: 0.2 }, 0)
        .to(burgerBotRef.current, { y: -7, rotate: -45, duration: 0.3, ease: "power3.inOut" }, 0);
    }

    // Stagger links
    const links = overlay?.querySelectorAll(".mobile-link");
    if (links?.length) {
      tl.fromTo(links, { yPercent: 100, opacity: 0 }, {
        yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: "power4.out"
      }, 0.3);
    }

    // Meta info
    const meta = overlay?.querySelector(".mobile-meta");
    if (meta) {
      tl.fromTo(meta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.7);
    }
  });

  const closeMenu = contextSafe(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const tl = gsap.timeline({ onComplete: () => {
      setIsOpen(false);
      overlay.style.display = "none";
    }});

    tl.to(overlay, { clipPath: "inset(0 0 100% 0)", duration: 0.55, ease: "power4.inOut" });

    // X → Burger transform
    if (burgerTopRef.current && burgerMidRef.current && burgerBotRef.current) {
      tl.to(burgerTopRef.current, { y: 0, rotate: 0, duration: 0.3, ease: "power3.inOut" }, 0)
        .to(burgerMidRef.current, { opacity: 1, scaleX: 1, duration: 0.2 }, 0.1)
        .to(burgerBotRef.current, { y: 0, rotate: 0, duration: 0.3, ease: "power3.inOut" }, 0);
    }
  });

  const toggleMenu = () => {
    if (isOpen) closeMenu();
    else openMenu();
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 z-40 w-full transition-all duration-500 ease-in-out",
          isScrolled
            ? "bg-bg-primary/80 py-4 backdrop-blur-xl border-b border-border"
            : "bg-transparent py-8"
        )}
      >
        <div className="mx-auto flex max-w-[1800px] items-center justify-between px-6 md:px-20">
          {/* Left: Architectural metadata (desktop only) */}
          <div className="hidden lg:flex items-center gap-6 font-condensed text-[10px] text-text-secondary uppercase tracking-[0.3em]">
            <div className="flex flex-col">
              <span className="text-accent font-bold">Project No.</span>
              <span className="text-text-primary">22-04 / EB</span>
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="flex flex-col">
              <span className="text-accent font-bold">Location</span>
              <span className="text-text-primary">25.2048° N, 55.2708° E</span>
            </div>
          </div>

          {/* Center: Logo */}
          <div
            id="navbar-logo"
            className={cn(
              "relative transition-all duration-700 ease-expo",
              showLogo ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
          >
            <Link href="/" className="block group">
              <Logo className="w-32 h-auto text-accent transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-105" />
            </Link>
          </div>

          {/* Right: Desktop nav + controls */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8 font-condensed text-[12px] font-medium tracking-[0.25em] uppercase">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-secondary transition-colors hover:text-accent"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full border border-border bg-bg-secondary/50 hover:bg-bg-tertiary transition-all text-text-primary"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
              </button>

              {/* Desktop CTA */}
              <Link
                href="/contact"
                className="hidden md:inline-flex px-6 py-2.5 rounded-full border border-accent bg-accent/5 hover:bg-accent hover:text-white text-accent font-condensed text-[11px] font-bold tracking-widest uppercase transition-all"
              >
                Inquire
              </Link>

              {/* Mobile Hamburger */}
              <button
                onClick={toggleMenu}
                className="md:hidden relative z-50 flex flex-col gap-[6px] p-2"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                <span ref={burgerTopRef}  className="block h-px w-6 bg-text-primary origin-center transition-colors" />
                <span ref={burgerMidRef}  className="block h-px w-6 bg-text-primary" />
                <span ref={burgerBotRef}  className="block h-px w-6 bg-text-primary origin-center transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Overlay ─────────────────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-45 hidden flex-col bg-bg-primary px-8 pt-32 pb-16"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-modal="true"
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Architectural grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(240,242,245,1) 1px,transparent 1px),linear-gradient(to bottom,rgba(240,242,245,1) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Red accent top line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-accent" aria-hidden="true" />

        {/* Nav links */}
        <nav className="flex flex-col gap-2 mt-4" aria-label="Mobile navigation">
          {NAV_LINKS.map((link, i) => (
            <div key={link.href} className="overflow-hidden">
              <Link
                href={link.href}
                onClick={closeMenu}
                className="mobile-link group flex items-center gap-4 py-4 border-b border-border"
              >
                <span className="font-condensed text-[11px] text-accent font-bold tracking-[0.4em] w-8">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-5xl uppercase leading-none text-text-primary group-hover:text-accent transition-colors">
                  {link.label}
                </span>
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile meta info */}
        <div className="mobile-meta mt-auto flex flex-col gap-4">
          <div className="h-px w-16 bg-accent" />
          <p className="font-condensed text-[10px] uppercase tracking-[0.4em] text-text-tertiary">
            ENBUILT Studio · Est. 2012
          </p>
          <a
            href="mailto:studio@enbuilt.com"
            className="font-condensed text-sm font-medium text-text-secondary hover:text-accent transition-colors"
          >
            studio@enbuilt.com
          </a>
          <Link
            href="/contact"
            onClick={closeMenu}
            className="mt-4 inline-flex self-start items-center gap-3 px-8 py-4 bg-accent font-condensed text-[11px] font-bold tracking-[0.3em] uppercase text-white"
          >
            Inquire Now
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
