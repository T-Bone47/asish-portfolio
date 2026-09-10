import { siteIdentity } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Spec §9. Layout/typography verified against real-browser screenshots
 * (desktop + mobile) before being ported into JSX.
 *
 * Bordered on top/left/right (not bottom) so this reads as one
 * continuous instrument panel with SignatureVisual directly below it,
 * rather than two separate blocks split by a hard divider — verified
 * together via screenshot before porting. The corner-mark decoration
 * fills what was dead space on wide viewports at ~5% opacity, purely
 * decorative (no data claims — see SignatureVisual's own comment on
 * why fabricated readouts aren't used anywhere on this page).
 */
export function Hero() {
  return (
    <Container
      as="section"
      className="relative overflow-hidden border-x border-t border-border-subtle pb-16 pt-28 md:pt-32"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 400 400"
        className="pointer-events-none absolute -right-24 -top-20 h-[400px] w-[400px] opacity-[0.05] md:h-[500px] md:w-[500px]"
      >
        <circle cx="200" cy="200" r="180" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
        <circle cx="200" cy="200" r="120" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
        <circle cx="200" cy="200" r="60" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
        <line x1="200" y1="0" x2="200" y2="400" stroke="var(--color-accent)" strokeWidth="1" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="var(--color-accent)" strokeWidth="1" />
      </svg>

      <div className="flex items-center gap-2 font-technical text-xs uppercase tracking-[0.25em] text-accent">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        Engineering Portfolio
      </div>

      <h1 className="mt-4 font-display text-display-xl uppercase leading-[0.92] tracking-tight">
        {siteIdentity.name}
      </h1>

      <p className="mt-2 font-display text-display-md uppercase leading-tight text-foreground-muted">
        {siteIdentity.primaryRole.map((role, i) => (
          <span key={role}>
            {role}
            {i < siteIdentity.primaryRole.length - 1 && <br />}
          </span>
        ))}
      </p>

      <p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-foreground-muted">
        {siteIdentity.supportingStatement}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button href="/work" variant="primary">
          View Systems
        </Button>
        {siteIdentity.social.github && (
          <Button href={siteIdentity.social.github} variant="secondary" external>
            GitHub
          </Button>
        )}
      </div>
    </Container>
  );
}
