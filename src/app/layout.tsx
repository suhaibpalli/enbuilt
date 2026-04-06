"use client";

import { Bebas_Neue, Barlow_Condensed, DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { useState, useEffect, use } from "react";
import Navbar from "@/components/layout/Navbar";
import Opener from "@/components/animation/Opener";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "500", "600"],
  variable: "--font-barlow",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400"],
  style: ["italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<any>;
}>) {
  const _params = use(params);
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [openerVariant, setOpenerVariant] = useState<"lift" | "blur" | "tiles" | "glow">("lift");

  // Sync theme with document attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Allow switching variants via URL for previewing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("variant") as any;
    if (["lift", "blur", "tiles", "glow"].includes(v)) {
      setOpenerVariant(v);
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  return (
    <html
      lang="en"
      className={`${bebasNeue.variable} ${barlowCondensed.variable} ${dmSans.variable} ${cormorantGaramond.variable} h-full antialiased`}
      data-theme="dark"
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary selection:bg-accent selection:text-white font-body">
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
      </body>
    </html>
  );
}
