"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface NavbarProps {
  showLogo?: boolean;
}

export default function Navbar({ showLogo = false }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 z-40 w-full transition-all duration-500 ease-in-out",
        isScrolled
          ? "bg-black/50 py-4 backdrop-blur-xl"
          : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        {/* Left: Project Numbering (Architectural Accent) */}
        <div className="hidden lg:flex items-center gap-4 font-mono text-[10px] text-white/30 uppercase tracking-[0.2em]">
          <span>Project: No. 22-04</span>
          <div className="w-12 h-px bg-white/10" />
          <span>Coordinates: 25.2048° N, 55.2708° E</span>
        </div>

        {/* Center: Logo (Transition Destination) */}
        <div 
          ref={logoRef}
          id="navbar-logo"
          className={cn(
            "relative transition-opacity duration-300",
            showLogo ? "opacity-100" : "opacity-0"
          )}
        >
          <Link href="/" className="block">
            <Logo className="w-28 h-auto text-white" />
          </Link>
        </div>


        {/* Right: Navigation */}
        <div className="flex items-center gap-8 text-[11px] font-medium tracking-[0.2em] uppercase">
          <Link 
            href="#projects" 
            className="text-white/40 transition-colors hover:text-white"
          >
            Structures
          </Link>
          <Link 
            href="#philosophy" 
            className="text-white/40 transition-colors hover:text-white"
          >
            Philosophy
          </Link>
          <button className="px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all">
            Inquire
          </button>
        </div>
      </div>
    </nav>
  );
}
