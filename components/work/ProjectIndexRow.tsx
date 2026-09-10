import Link from "next/link";
import type { Project } from "@/types/project";
import { StatusBadge } from "@/components/ui/Badge";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { cn } from "@/lib/utils";

/**
 * Spec §12 & Phase 2G-E — High-precision Telemetry Project Index Row.
 *
 * Index, title, category, status, year, short description,
 * technologies, metric preview, interaction affordance:
 * - Flagship rows (project.featured) command stronger visual prominence
 * - Active telemetry coordinate readout [SYS.XX] on hover/focus
 * - Left telemetry border tick on active interaction
 * - Accessible keyboard navigation & clear visual focus boundary
 */
export function ProjectIndexRow({ project, index }: { project: Project; index: number }) {
  const isFlagship = project.featured;
  const number = String(index + 1).padStart(2, "0");
  const previewMetric = project.metrics?.[0];

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group relative grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 border-b border-border-subtle px-3 py-8 transition-all duration-200 hover:bg-surface/60 hover:pl-5",
        isFlagship ? "gap-y-3" : "gap-y-1",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:bg-surface/80"
      )}
    >
      {/* Left telemetry indicator tick that illuminates on hover/focus */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      />

      <div className="flex flex-col items-start">
        <span
          className={cn(
            "font-technical tabular-nums transition-colors duration-150",
            isFlagship ? "text-2xl text-accent font-semibold" : "text-base text-foreground-faint group-hover:text-foreground"
          )}
        >
          {number}
        </span>
        <span
          aria-hidden="true"
          className="font-technical text-[9px] uppercase tracking-widest text-foreground-faint opacity-0 transition-opacity duration-150 group-hover:opacity-100"
        >
          SYS.{number}
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-3">
          <h3
            className={cn(
              "font-display uppercase tracking-tight transition-colors duration-150",
              isFlagship
                ? "text-3xl md:text-4xl text-foreground group-hover:text-accent"
                : "text-xl md:text-2xl text-foreground-muted group-hover:text-foreground"
            )}
          >
            {project.title}
          </h3>
          <span className="hidden font-technical text-[10px] uppercase tracking-widest text-foreground-faint sm:inline">
            {"//"} {project.category.replace("-", " ")}
          </span>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <TechnicalLabel>{project.tagline}</TechnicalLabel>
          <StatusBadge status={project.status} />
          {/* "TBD" is an internal sentinel — shown only when verified */}
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
              <li
                key={tech}
                className="font-technical text-[11px] uppercase tracking-wide text-foreground-faint transition-colors duration-150 group-hover:text-foreground-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex flex-col items-end gap-2 text-right">
        {previewMetric && (
          <div className="hidden md:block">
            <div className="font-technical text-lg text-accent font-medium">{previewMetric.value}</div>
            <TechnicalLabel>{previewMetric.label}</TechnicalLabel>
          </div>
        )}
        <span
          aria-hidden="true"
          className="font-technical text-foreground-faint transition-transform duration-150 group-hover:translate-x-1.5 group-hover:text-accent"
        >
          →
        </span>
      </div>
    </Link>
  );
}
