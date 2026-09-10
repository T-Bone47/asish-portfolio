import Link from "next/link";
import type { Project } from "@/types/project";
import { StatusBadge } from "@/components/ui/Badge";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { cn } from "@/lib/utils";

/**
 * Abstract System Traces corresponding to each project's engineering identity.
 * Strictly decorative abstract vector geometry (spec §7 & Phase 3 Signature Pass).
 */
function ProjectTraceVisual({ slug }: { slug: string }) {
  switch (slug) {
    case "live-f1-intelligence":
      return (
        <svg viewBox="0 0 180 32" className="h-8 w-44 select-none" aria-hidden="true">
          <path
            d="M 0,16 Q 22,2 45,18 T 90,8 T 135,24 T 180,12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
          <circle cx="135" cy="24" r="2.5" fill="currentColor" />
          <line x1="0" y1="16" x2="180" y2="16" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4" />
        </svg>
      );
    case "f1-lap-time-simulator":
      return (
        <svg viewBox="0 0 180 32" className="h-8 w-44 select-none" aria-hidden="true">
          <path
            d="M 0,26 C 30,26 50,6 90,6 C 130,6 150,22 180,22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
          <circle cx="90" cy="6" r="2.5" fill="currentColor" />
          <line x1="90" y1="6" x2="90" y2="28" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.5" />
        </svg>
      );
    case "racemind-ai":
      return (
        <svg viewBox="0 0 180 32" className="h-8 w-44 select-none" aria-hidden="true">
          <path
            d="M 0,16 L 25,16 L 35,4 L 50,28 L 65,8 L 80,22 L 95,16 L 180,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
          <circle cx="50" cy="28" r="2" fill="currentColor" />
          <circle cx="65" cy="8" r="2" fill="currentColor" />
        </svg>
      );
    case "f1-race-manager":
      return (
        <svg viewBox="0 0 180 32" className="h-8 w-44 select-none" aria-hidden="true">
          <path
            d="M 0,24 L 40,24 L 40,16 L 90,16 L 90,8 L 140,8 L 140,24 L 180,24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
          <circle cx="40" cy="16" r="2" fill="currentColor" />
          <circle cx="90" cy="8" r="2" fill="currentColor" />
          <circle cx="140" cy="24" r="2" fill="currentColor" />
        </svg>
      );
    case "ea-fc-intelligence":
      return (
        <svg viewBox="0 0 180 32" className="h-8 w-44 select-none" aria-hidden="true">
          <path
            d="M 0,22 L 35,12 L 70,26 L 105,4 L 140,18 L 180,10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
          <circle cx="105" cy="4" r="2.5" fill="currentColor" />
        </svg>
      );
    case "vyaparpulse":
    default:
      return (
        <svg viewBox="0 0 180 32" className="h-8 w-44 select-none" aria-hidden="true">
          <path
            d="M 0,26 Q 50,26 85,18 T 140,10 T 180,4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="transition-all duration-300"
          />
          <circle cx="140" cy="10" r="2.5" fill="currentColor" />
        </svg>
      );
  }
}

/**
 * Spec §12 & Phase 3 Signature Pass: Engineering System Index Row.
 * 
 * Features:
 * - Persistent inspection state affordance
 * - Bespoke abstract system trace per project domain
 * - Visual bridge connecting system identity to verified evidence metrics
 * - Zero layout reflow on interaction (opacity & transform only)
 * - Accessible keyboard navigation & high-contrast focus boundaries
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

      {/* Index & System ID Block */}
      <div className="flex flex-col items-start">
        <span
          className={cn(
            "font-technical tabular-nums transition-colors duration-150",
            isFlagship
              ? "text-2xl text-accent font-semibold"
              : "text-base text-foreground-faint group-hover:text-foreground"
          )}
        >
          {number}
        </span>
        <span
          aria-hidden="true"
          className="font-technical text-[9px] uppercase tracking-widest text-foreground-faint transition-colors duration-150 group-hover:text-accent"
        >
          SYS.{number}
        </span>
        <span
          aria-hidden="true"
          className="font-technical text-[8px] uppercase tracking-wider text-accent opacity-0 transition-opacity duration-150 group-hover:opacity-100 mt-0.5"
        >
          [INSPECT]
        </span>
      </div>

      {/* Primary Engineering Details */}
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

        {/* Technologies list */}
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

        {/* Compact Engineering Inspection Strip (appears on hover/focus without reflow) */}
        <div
          aria-hidden="true"
          className="mt-3 flex flex-wrap items-center gap-x-4 text-[10px] font-technical uppercase tracking-widest text-foreground-faint opacity-60 transition-opacity duration-150 group-hover:opacity-100 group-hover:text-accent/90"
        >
          <span>TYPE: {project.category.toUpperCase()}</span>
          <span>·</span>
          <span>PIPELINE: {project.status.toUpperCase()}</span>
          {project.featured && (
            <>
              <span>·</span>
              <span className="text-accent">FLAGSHIP_ARCHITECTURE</span>
            </>
          )}
        </div>
      </div>

      {/* Right Column: Abstract System Trace + Metric Evidence */}
      <div className="flex items-center gap-6 text-right">
        {/* Abstract Trace Vector */}
        <div className="hidden lg:flex flex-col items-center text-foreground-faint group-hover:text-accent transition-colors duration-200">
          <span className="font-technical text-[9px] uppercase tracking-widest text-foreground-faint mb-1">
            [TRACE]
          </span>
          <ProjectTraceVisual slug={project.slug} />
        </div>

        {/* Metric Evidence */}
        <div className="flex flex-col items-end gap-1">
          {previewMetric && (
            <div className="hidden sm:block">
              <div className="font-technical text-lg text-accent font-medium tabular-nums group-hover:drop-shadow-[0_0_8px_rgba(52,226,122,0.3)] transition-all">
                {previewMetric.value}
              </div>
              <TechnicalLabel className="group-hover:text-foreground transition-colors">
                {previewMetric.label}
              </TechnicalLabel>
            </div>
          )}
          <span
            aria-hidden="true"
            className="font-technical text-foreground-faint transition-transform duration-150 group-hover:translate-x-1.5 group-hover:text-accent mt-1"
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
