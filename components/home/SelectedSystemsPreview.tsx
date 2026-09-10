import Link from "next/link";
import { projects } from "@/data/projects";
import { ProjectIndexRow } from "@/components/work/ProjectIndexRow";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

export function SelectedSystemsPreview() {
  const flagships = projects.filter((project) => project.featured);

  return (
    <Container as="section" className="py-16 md:py-20">
      <div className="flex items-baseline justify-between">
        <TechnicalLabel className="text-accent">Selected Systems</TechnicalLabel>
        <Link
          href="/work"
          className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-muted transition-colors hover:text-foreground"
        >
          View All →
        </Link>
      </div>

      <div className="mt-6 border-t border-border-subtle">
        {flagships.map((project, index) => (
          <ProjectIndexRow key={project.id} project={project} index={index} />
        ))}
      </div>
    </Container>
  );
}
