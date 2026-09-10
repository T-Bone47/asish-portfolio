import { SystemBoot } from "@/components/home/SystemBoot";
import { Hero } from "@/components/home/Hero";
import { SignatureVisual } from "@/components/home/SignatureVisual";
import { EngineeringStatement } from "@/components/home/EngineeringStatement";
import { SelectedSystemsPreview } from "@/components/home/SelectedSystemsPreview";
import { EngineeringDomains } from "@/components/home/EngineeringDomains";
import { AiMlSection } from "@/components/home/AiMlSection";
import { ExperienceTimeline } from "@/components/home/ExperienceTimeline";
import { CurrentlyBuilding } from "@/components/home/CurrentlyBuilding";
import { TechnicalArsenal } from "@/components/home/TechnicalArsenal";
import { AboutPreview } from "@/components/home/AboutPreview";
import { ContactSection } from "@/components/home/ContactSection";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Spec §7's homepage order, now complete. That order list doesn't
 * name "AI/ML section" as its own line, but §18 gives it distinct
 * content and the document's own section numbering runs Engineering
 * Domains (§17) → AI/ML (§18) → Experience (§19) — so it's placed
 * there rather than dropped or merged into something else.
 *
 * Hero and SignatureVisual are NOT wrapped in <Reveal> — they're
 * above the fold, and delaying the page's actual LCP content for an
 * entrance animation would work against spec §29's own performance
 * targets. Everything below the fold reveals on scroll.
 */
export default function Home() {
  return (
    <>
      <SystemBoot />
      <Hero />
      <SignatureVisual />
      <Reveal>
        <EngineeringStatement />
      </Reveal>
      <Reveal className="bg-surface">
        <SelectedSystemsPreview />
      </Reveal>
      <Reveal>
        <EngineeringDomains />
      </Reveal>
      <Reveal className="bg-surface">
        <AiMlSection />
      </Reveal>
      <Reveal>
        <Container as="section" className="py-16 md:py-20">
          <TechnicalLabel className="text-accent">Experience</TechnicalLabel>
          <div className="mt-6">
            <ExperienceTimeline />
          </div>
        </Container>
      </Reveal>
      <Reveal className="bg-surface">
        <CurrentlyBuilding />
      </Reveal>
      <Reveal>
        <TechnicalArsenal />
      </Reveal>
      <Reveal>
        <AboutPreview />
      </Reveal>
      <Reveal className="bg-surface">
        <ContactSection />
      </Reveal>
    </>
  );
}
