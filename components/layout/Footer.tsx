import { siteIdentity } from "@/data/site";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const { email, github, linkedin } = siteIdentity.social;
  const links = [
    { label: email, href: `mailto:${email}` },
    github ? { label: "GITHUB", href: github } : null,
    linkedin ? { label: "LINKEDIN", href: linkedin } : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  return (
    <footer className="border-t border-border-subtle">
      <Container
        as="div"
        className="flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between"
      >
        <TechnicalLabel as="p">
          {siteIdentity.name} — {new Date().getFullYear()}
        </TechnicalLabel>
        <nav className="flex flex-wrap gap-6" aria-label="Contact">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-muted transition-colors hover:text-foreground"
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
