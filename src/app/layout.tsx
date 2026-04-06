import { Bebas_Neue, Barlow_Condensed, DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";
import { metadata } from "./metadata";

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

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ClientLayout
          bebasVariable={bebasNeue.variable}
          barlowVariable={barlowCondensed.variable}
          dmSansVariable={dmSans.variable}
          cormorantVariable={cormorantGaramond.variable}
        >
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
