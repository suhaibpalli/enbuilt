"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useState, useEffect, use } from "react";
import Navbar from "@/components/layout/Navbar";
import Opener from "@/components/animation/Opener";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
  const [openerVariant, setOpenerVariant] = useState<"lift" | "blur" | "tiles" | "glow">("lift");

  // Allow switching variants via URL for previewing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const v = params.get("variant") as any;
    if (["lift", "blur", "tiles", "glow"].includes(v)) {
      setOpenerVariant(v);
    }
  }, []);

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-white selection:bg-white selection:text-black">
        <Navbar showLogo={isLoaded} />
        
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
        <div className="fixed bottom-6 left-6 z-50 flex gap-1.5 p-1.5 rounded-full border border-white/5 bg-black/20 backdrop-blur-md opacity-10 hover:opacity-100 transition-all duration-500 group">
          {["lift", "blur", "tiles", "glow"].map((v) => (
            <button
              key={v}
              onClick={() => {
                window.location.href = `?variant=${v}`;
              }}
              className={`px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] rounded-full transition-all duration-300 ${
                openerVariant === v 
                  ? "bg-white text-black scale-100" 
                  : "text-white/40 hover:text-white hover:bg-white/5"
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
