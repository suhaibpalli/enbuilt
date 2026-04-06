import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENBUILT | Spatial & Structural Design",
  description: "Architectural landmarks built for permanence. Monolithic form meeting technical precision.",
  metadataBase: new URL("https://enbuiltdesign.com"),
  openGraph: {
    title: "ENBUILT | Spatial & Structural Design",
    description: "Architectural landmarks built for permanence.",
    url: "https://enbuiltdesign.com",
    siteName: "ENBUILT",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};
