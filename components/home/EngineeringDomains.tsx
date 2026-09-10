import { engineeringDomains } from "@/data/engineering-domains";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

export function EngineeringDomains() {
  return (
    <Container as="section" className="py-16 md:py-20">
      <TechnicalLabel className="text-accent">Engineering Domains</TechnicalLabel>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {engineeringDomains.map((domain) => (
          <div key={domain.id}>
            <h3 className="font-display text-xl uppercase tracking-tight">{domain.title}</h3>
            <ul className="mt-3 space-y-1.5">
              {domain.items.map((item) => (
                <li key={item} className="font-body text-sm text-foreground-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
