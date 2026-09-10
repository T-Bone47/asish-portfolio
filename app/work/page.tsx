import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ProjectIndex } from "@/components/work/ProjectIndex";

export const metadata: Metadata = {
  title: "Selected Systems — Asish Oliver M",
  description:
    "Motorsport telemetry, simulation, and AI/ML systems built by Asish Oliver M.",
};

export default function WorkPage() {
  return (
    <Container as="section" className="py-24">
      <TechnicalLabel className="text-accent">Selected Systems</TechnicalLabel>
      <h1 className="mt-4 font-display text-display-lg uppercase tracking-tight">
        Work
      </h1>
      <p className="mt-4 max-w-xl font-body text-foreground-muted">
        Motorsport telemetry, simulation, and AI/ML systems.
      </p>

      <div className="mt-12">
        <ProjectIndex />
      </div>
    </Container>
  );
}
