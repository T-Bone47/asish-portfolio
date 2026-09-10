import { skillGroups } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

export function TechnicalArsenal() {
  return (
    <Container as="section" className="py-16 md:py-20">
      <TechnicalLabel className="text-accent">Technical Arsenal</TechnicalLabel>

      <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.id}>
            <TechnicalLabel as="h3">{group.title}</TechnicalLabel>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1.5">
              {group.items.map((item) => (
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
