import type { Metadata } from "next";
import ServicesSection from "@/components/sections/ServicesSection";

export const metadata: Metadata = {
  title: "Services",
  description: "End-to-end architectural services — from land appraisal through construction oversight. No handoffs. One team, every phase.",
};

export default function ServicesPage() {
  return (
    <main className="bg-bg-primary">
      <ServicesSection />
    </main>
  );
}
