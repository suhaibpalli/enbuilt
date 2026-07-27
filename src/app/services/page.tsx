import type { Metadata } from "next";
import ServicesSection from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description: "End-to-end architectural services — from concept design and BIM coordination to structural engineering and site supervision.",
};

export default function ServicesPage() {
  return (
    <main className="bg-bg-primary">
      <ServicesSection />
    </main>
  );
}
