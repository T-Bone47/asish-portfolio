import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";

export const metadata: Metadata = {
  title: "Experience — Asish Oliver M",
  description: "Motorsport, eSports, and AI/ML engineering experience.",
};

export default function ExperiencePage() {
  return (
    <Container as="section" className="py-24">
      <div className="flex flex-wrap items-center gap-3">
        <TechnicalLabel className="text-accent">Experience</TechnicalLabel>
        <span
          aria-hidden="true"
          className="font-technical text-[11px] uppercase tracking-widest text-foreground-faint"
        >
          [SYS.02 · CAREER_TRACE]
        </span>
      </div>
      <h1 className="mt-4 font-display text-display-lg uppercase tracking-tight">Experience</h1>
      <div className="mt-12">
        <ExperienceTimeline />
      </div>
    </Container>
  );
}
