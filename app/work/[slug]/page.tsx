import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects, getProjectBySlug } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { StatusBadge } from "@/components/ui/Badge";
import { CaseStudySection } from "@/components/work/CaseStudySection";
import { ArchitecturePipeline } from "@/components/work/ArchitecturePipeline";
import { MetricGrid } from "@/components/work/MetricGrid";
import { TelemetryFlowVisual } from "@/components/work/TelemetryFlowVisual";
import { NumericalDecomposition } from "@/components/work/NumericalDecomposition";
import { RaceMindSessionVisual } from "@/components/work/RaceMindSessionVisual";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

// Next.js 16: params is a Promise on every page/layout/generateMetadata —
// this isn't the old deprecated-but-working Next 15 shim, it's required.
type ProjectPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Asish Oliver M`,
    description: project.description,
    openGraph: { title: project.title, description: project.description, type: "article" },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const hasLinks = Boolean(
    project.links.repository || project.links.demo || project.links.documentation
  );
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <article>
      {/* PROJECT HERO + STATUS/YEAR/DISCIPLINE */}
      <Container as="section" className="py-24">
        <Link
          href="/work"
          className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-faint transition-colors hover:text-foreground"
        >
          ← All Systems
        </Link>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <StatusBadge status={project.status} />
          {project.year !== "TBD" && <TechnicalLabel>{project.year}</TechnicalLabel>}
          <TechnicalLabel>{project.category.replace("-", " / ")}</TechnicalLabel>
        </div>

        <h1 className="mt-4 font-display text-display-xl uppercase leading-[0.95] tracking-tight">
          {project.title}
        </h1>
        <p className="mt-4 max-w-2xl font-body text-lg text-foreground-muted">
          {project.description}
        </p>
      </Container>

      <Container as="section">
        {/* ENGINEERING PROBLEM — omitted: no project has verified problem-statement prose yet */}
        {project.problem && (
          <CaseStudySection label="Engineering Problem">
            <p className="max-w-2xl font-body text-foreground-muted">{project.problem}</p>
          </CaseStudySection>
        )}

        {project.architecture && (
          <CaseStudySection label="Architecture">
            <p className="max-w-2xl font-body text-foreground-muted">
              {project.architecture.summary}
            </p>
            {project.architecture.pipeline && (
              <div className="mt-8">
                <ArchitecturePipeline stages={project.architecture.pipeline} />
              </div>
            )}
          </CaseStudySection>
        )}

        {/* Specialized flagship engineering visualizers */}
        {project.slug === "live-f1-intelligence" && <TelemetryFlowVisual />}
        {project.slug === "f1-lap-time-simulator" && <NumericalDecomposition />}
        {project.slug === "racemind-ai" && <RaceMindSessionVisual />}

        {project.implementation && (
          <CaseStudySection label="Implementation">
            <p className="max-w-2xl font-body text-foreground-muted">{project.implementation}</p>
          </CaseStudySection>
        )}

        {project.algorithms && (
          <CaseStudySection label="Algorithms / Models">
            <p className="max-w-2xl font-body text-foreground-muted">{project.algorithms}</p>
          </CaseStudySection>
        )}

        {project.validation && (
          <CaseStudySection label="Validation">
            <p className="max-w-2xl font-body text-foreground-muted">{project.validation}</p>
          </CaseStudySection>
        )}

        {(project.metrics?.length || project.results) && (
          <CaseStudySection label="Performance / Results">
            {project.metrics && project.metrics.length > 0 && (
              <MetricGrid metrics={project.metrics} />
            )}
            {project.results && (
              <p className="mt-8 max-w-2xl font-body text-foreground-muted">{project.results}</p>
            )}
          </CaseStudySection>
        )}

        {project.engineeringDecisions && project.engineeringDecisions.length > 0 && (
          <CaseStudySection label="Engineering Decisions">
            <dl className="max-w-2xl space-y-6">
              {project.engineeringDecisions.map((decision) => (
                <div key={decision.title}>
                  <dt className="font-display text-lg uppercase tracking-tight">{decision.title}</dt>
                  <dd className="mt-1 font-body text-foreground-muted">{decision.rationale}</dd>
                </div>
              ))}
            </dl>
          </CaseStudySection>
        )}

        {project.limitations && (
          <CaseStudySection label="Limitations">
            <p className="max-w-2xl font-body text-foreground-muted">{project.limitations}</p>
          </CaseStudySection>
        )}

        {project.currentState && (
          <CaseStudySection label="Current State">
            <p className="max-w-2xl font-body text-foreground-muted">{project.currentState}</p>
          </CaseStudySection>
        )}

        {hasLinks && (
          <CaseStudySection label="Links">
            <div className="flex flex-wrap gap-6">
              {project.links.repository && (
                <a
                  href={project.links.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-technical text-xs uppercase tracking-[0.15em] text-foreground hover:text-accent"
                >
                  Repository
                </a>
              )}
              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-technical text-xs uppercase tracking-[0.15em] text-foreground hover:text-accent"
                >
                  Demo
                </a>
              )}
              {project.links.documentation && (
                <a
                  href={project.links.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-technical text-xs uppercase tracking-[0.15em] text-foreground hover:text-accent"
                >
                  Documentation
                </a>
              )}
            </div>
          </CaseStudySection>
        )}
      </Container>

      {/* NEXT PROJECT */}
      {nextProject && (
        <Link
          href={`/work/${nextProject.slug}`}
          className="group block border-t border-border-subtle"
        >
          <Container as="div" className="flex items-center justify-between py-12">
            <div>
              <TechnicalLabel>Next System</TechnicalLabel>
              <div className="mt-2 font-display text-3xl uppercase tracking-tight md:text-4xl">
                {nextProject.title}
              </div>
            </div>
            <span
              aria-hidden="true"
              className="font-technical text-2xl text-foreground-faint transition-transform duration-150 group-hover:translate-x-1 group-hover:text-accent"
            >
              →
            </span>
          </Container>
        </Link>
      )}
    </article>
  );
}
