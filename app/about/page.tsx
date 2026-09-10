import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { AboutContent } from "@/components/home/AboutContent";

export const metadata: Metadata = {
  title: "About — Asish Oliver M",
  description: "Engineering philosophy and education.",
};

export default function AboutPage() {
  return (
    <Container as="section" className="py-24">
      <TechnicalLabel className="text-accent">About</TechnicalLabel>
      <h1 className="mt-4 font-display text-display-lg uppercase tracking-tight">About</h1>
      <div className="mt-12">
        <AboutContent />
      </div>
    </Container>
  );
}
