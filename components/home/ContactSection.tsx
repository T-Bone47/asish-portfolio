import { siteIdentity } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/**
 * Spec §22 — minimal, no contact form (no backend exists for one to
 * submit to; §55 keeps the site backend-free unless actually needed).
 * Same content on the homepage and the dedicated /contact page — it's
 * already as short as it gets.
 */
export function ContactSection() {
  const { email, github, linkedin } = siteIdentity.social;

  return (
    <Container as="section" className="py-16 md:py-24">
      <TechnicalLabel className="text-accent">Contact</TechnicalLabel>
      <h2 className="mt-4 font-display text-display-md uppercase tracking-tight">
        {siteIdentity.name}
      </h2>
      {siteIdentity.location && (
        <p className="mt-2 font-technical text-xs uppercase tracking-[0.1em] text-foreground-faint">
          {siteIdentity.location}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={`mailto:${email}`}
          className="font-technical text-sm uppercase tracking-[0.1em] text-foreground transition-colors hover:text-accent"
        >
          {email}
        </a>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="font-technical text-sm uppercase tracking-[0.1em] text-foreground transition-colors hover:text-accent"
          >
            GitHub
          </a>
        )}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="font-technical text-sm uppercase tracking-[0.1em] text-foreground transition-colors hover:text-accent"
          >
            LinkedIn
          </a>
        )}
      </div>
    </Container>
  );
}
