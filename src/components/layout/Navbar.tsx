"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

interface NavbarProps {
  showLogo?: boolean;
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Navbar({ showLogo = false, theme, toggleTheme }: NavbarProps) {
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
          ? "bg-bg-primary/80 py-4 backdrop-blur-xl border-b border-border"
          : "bg-transparent py-8"
      )}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-12">
        {/* Left: Project Numbering (Architectural Accent) */}
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

        {/* Center: Logo (Transition Destination) */}
        <div 
          ref={logoRef}
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

        {/* Right: Navigation & Theme Toggle */}
        <div className="flex items-center gap-10">
          <div className="hidden md:flex items-center gap-8 font-condensed text-[12px] font-medium tracking-[0.25em] uppercase">
            <Link 
              href="#projects" 
              className="text-text-secondary transition-colors hover:text-accent"
            >
              Structures
            </Link>
            <Link 
              href="#philosophy" 
              className="text-text-secondary transition-colors hover:text-accent"
            >
              Philosophy
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full border border-border bg-bg-secondary/50 hover:bg-bg-tertiary transition-all text-text-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            <button className="px-6 py-2.5 rounded-full border border-accent bg-accent/5 hover:bg-accent hover:text-white text-accent font-condensed text-[11px] font-bold tracking-widest uppercase transition-all">
              Inquire
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
