import { siteIdentity } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/**
 * Spec §22 & Phase 3 Signature Pass: Engineered Communication Channels.
 * Minimal, high-precision technical contact resolution (no backend form).
 */
export function ContactSection() {
  const { email, github, linkedin } = siteIdentity.social;

  const channels = [
    {
      id: "CH.01",
      protocol: "DIRECT_DISPATCH",
      label: "EMAIL",
      value: email,
      href: `mailto:${email}`,
      external: false,
    },
    github
      ? {
          id: "CH.02",
          protocol: "VERSION_CONTROL",
          label: "GITHUB",
          value: github.replace("https://", ""),
          href: github,
          external: true,
        }
      : null,
    linkedin
      ? {
          id: "CH.03",
          protocol: "PROFESSIONAL_GRAPH",
          label: "LINKEDIN",
          value: linkedin.replace("https://", ""),
          href: linkedin,
          external: true,
        }
      : null,
  ].filter(Boolean) as Array<{
    id: string;
    protocol: string;
    label: string;
    value: string;
    href: string;
    external: boolean;
  }>;

  return (
    <Container as="section" className="py-16 md:py-24">
      <div className="flex items-center gap-3">
        <TechnicalLabel className="text-accent">Contact</TechnicalLabel>
        <span aria-hidden="true" className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
          [SYS.04 · COMM_CHANNEL · READY]
        </span>
      </div>

      <h2 className="mt-4 font-display text-display-md uppercase tracking-tight">
        {siteIdentity.name}
      </h2>
      {siteIdentity.location && (
        <p className="mt-2 font-technical text-xs uppercase tracking-[0.1em] text-foreground-faint">
          LOCATION // {siteIdentity.location}
        </p>
      )}

      {/* Engineered communication channel grid */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {channels.map((ch) => (
          <a
            key={ch.id}
            href={ch.href}
            target={ch.external ? "_blank" : undefined}
            rel={ch.external ? "noopener noreferrer" : undefined}
            className="group relative flex flex-col justify-between border border-border-subtle bg-surface/30 p-6 rounded-sm transition-all duration-200 hover:border-accent/50 hover:bg-surface/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            {/* Left accent indicator tick */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            />

            <div>
              <div className="flex items-center justify-between font-technical text-[10px] text-foreground-faint uppercase tracking-widest">
                <span>{ch.id}</span>
                <span className="group-hover:text-accent transition-colors">[{ch.protocol}]</span>
              </div>
              <div className="mt-4 font-display text-xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
                {ch.label}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-border-subtle/50 font-technical text-xs text-foreground-muted group-hover:text-foreground">
              <span className="truncate max-w-[200px]">{ch.value}</span>
              <span aria-hidden="true" className="text-foreground-faint transition-transform group-hover:translate-x-1 group-hover:text-accent">
                →
              </span>
            </div>
          </a>
        ))}
      </div>
    </Container>
  );
}
