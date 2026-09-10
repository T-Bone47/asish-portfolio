import Link from "next/link";
import { projects } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/** Spec §39 — only projects with a real, stated current-state note
 *  appear here (currently 4 of 6; EA FC Intelligence and VyaparPulse
 *  have no verified current-state text, so they're correctly absent
 *  rather than padded with invented status). */
export function CurrentlyBuilding() {
  const active = projects.filter((project) => project.currentState);
  if (active.length === 0) return null;

  return (
    <Container as="section" className="py-16 md:py-20">
      <TechnicalLabel className="text-accent">Currently Building</TechnicalLabel>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        {active.map((project) => (
          <Link
            key={project.id}
            href={`/work/${project.slug}`}
            className="group block border-t border-border-subtle pt-4"
          >
            <h3 className="font-display text-xl uppercase tracking-tight transition-colors group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-2 font-body text-sm text-foreground-muted">{project.currentState}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
