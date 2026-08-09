import { Barlow_Condensed, DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { metadata } from "./metadata";

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
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  subsets: ["latin"],
});

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${dmSans.variable} ${cormorantGaramond.variable}`}
    >
      {/*
        Font variable classes live on <html> (the :root element), not on a
        descendant wrapper. Theme tokens like --font-display: var(--font-cormorant)
        are declared at :root — nested var() references inside a custom
        property resolve using the scope where THAT property is defined, not
        the final consumer's. If --font-cormorant were only defined lower in
        the tree, --font-display would compute as invalid at :root and that
        invalidity would inherit everywhere, no matter what redefines it below.
      */}
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
