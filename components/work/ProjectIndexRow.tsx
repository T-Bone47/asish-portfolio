import Link from "next/link";
import type { Project } from "@/types/project";
import { StatusBadge } from "@/components/ui/Badge";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { cn } from "@/lib/utils";

/**
 * Spec §12: index, title, category, status, year, short description,
 * technologies, metric preview, interaction affordance — all present
 * on every row; flagship rows (project.featured) get materially more
 * visual weight, not extra fields.
 */
export function ProjectIndexRow({ project, index }: { project: Project; index: number }) {
  const isFlagship = project.featured;
  const number = String(index + 1).padStart(2, "0");
  const previewMetric = project.metrics?.[0];

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 border-b border-border-subtle py-8 transition-colors hover:bg-surface/60",
        isFlagship ? "gap-y-3" : "gap-y-1"
      )}
    >
      <span
        className={cn(
          "font-technical tabular-nums",
          isFlagship ? "text-2xl text-accent" : "text-base text-foreground-faint"
        )}
      >
        {number}
      </span>

      <div>
        <h3
          className={cn(
            "font-display uppercase tracking-tight",
            isFlagship ? "text-3xl md:text-4xl" : "text-xl md:text-2xl text-foreground-muted"
          )}
        >
          {project.title}
        </h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <TechnicalLabel>{project.tagline}</TechnicalLabel>
          <StatusBadge status={project.status} />
          {/* "TBD" is an internal not-yet-known sentinel (see data/projects.ts),
              never a real verified year — spec §12 wants year shown only
              "when verified", so it's simply omitted here otherwise. */}
          {project.year !== "TBD" && <TechnicalLabel>{project.year}</TechnicalLabel>}
        </div>

        {isFlagship && (
          <p className="mt-3 max-w-xl font-body text-sm text-foreground-muted">
            {project.description}
          </p>
        )}

        {project.technologies.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
            {project.technologies.slice(0, isFlagship ? 8 : 5).map((tech) => (
              <li key={tech} className="font-technical text-[11px] uppercase tracking-wide text-foreground-faint">
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col items-end gap-2 text-right">
        {previewMetric && (
          <div className="hidden md:block">
            <div className="font-technical text-lg text-accent">{previewMetric.value}</div>
            <TechnicalLabel>{previewMetric.label}</TechnicalLabel>
          </div>
        )}
        <span
          aria-hidden="true"
          className="font-technical text-foreground-faint transition-transform duration-150 group-hover:translate-x-1 group-hover:text-accent"
        >
          →
        </span>
      </div>
    </Link>
  );
}
