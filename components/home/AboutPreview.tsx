import Link from "next/link";
import { education } from "@/data/education";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/** Homepage teaser — Engineering Statement (earlier on the same page)
 *  already carries the pipeline/philosophy, so this section doesn't
 *  repeat it; it surfaces Education and links out to the full page. */
export function AboutPreview() {
  return (
    <Container as="section" className="py-16 md:py-20">
      <div className="flex items-baseline justify-between">
        <TechnicalLabel className="text-accent">About</TechnicalLabel>
        <Link
          href="/about"
          className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-muted transition-colors hover:text-foreground"
        >
          Full Page →
        </Link>
      </div>
      <h3 className="mt-6 font-display text-2xl uppercase tracking-tight">
        {education.institution}
      </h3>
      <p className="mt-1 font-body text-sm text-foreground-muted">{education.program}</p>
    </Container>
  );
}
