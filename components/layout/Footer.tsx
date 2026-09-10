import { siteIdentity } from "@/data/site";
import { Container } from "@/components/ui/Container";

/**
 * Spec §17 & Phase 3 Signature Pass: Minimal System Footer.
 * Restrained, informative status display with direct channel access.
 */
export function Footer() {
  const { email, github, linkedin } = siteIdentity.social;
  const links = [
    { label: "EMAIL", href: `mailto:${email}` },
    github ? { label: "GITHUB", href: github } : null,
    linkedin ? { label: "LINKEDIN", href: linkedin } : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  return (
    <footer className="border-t border-border-subtle bg-canvas">
      <Container
        as="div"
        className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex flex-col gap-1.5">
          <div className="font-display text-xs uppercase tracking-wider text-foreground">
            {siteIdentity.name} — {new Date().getFullYear()}
          </div>
          <div className="flex items-center gap-2.5 font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50 duration-1000" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="text-foreground-muted">STATUS: ONLINE</span>
            <span className="text-border-subtle">·</span>
            <span>SYSTEM ARCHIVE</span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-6" aria-label="Footer Links">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-muted transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              {...(item.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
