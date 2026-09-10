import type { ProjectStatus } from "@/types/project";
import { cn } from "@/lib/utils";

/**
 * Status display text — spec's own labels, not reworded.
 * Order matches types/project.ts's ProjectStatus union.
 */
const STATUS_LABEL: Record<ProjectStatus, string> = {
  completed: "COMPLETED",
  active: "ACTIVE",
  "near-completion": "NEAR COMPLETION",
  "in-development": "IN DEVELOPMENT",
  experimental: "EXPERIMENTAL",
  "production-ready": "PRODUCTION-READY",
};

/**
 * Spec §3 Semantic Color Enforcement:
 * - Green (text-accent): active, production-ready
 * - Amber (text-amber): in-development, near-completion, experimental
 * - Muted (text-foreground-muted): completed
 */
export function StatusBadge({ status, className }: { status: ProjectStatus; className?: string }) {
  const isLive = status === "active" || status === "production-ready";
  const isPending =
    status === "in-development" ||
    status === "near-completion" ||
    status === "experimental";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-technical text-xs uppercase tracking-[0.15em]",
        isLive && "text-accent",
        isPending && "text-amber",
        !isLive && !isPending && "text-foreground-muted",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isLive && "bg-accent animate-pulse",
          isPending && "bg-amber",
          !isLive && !isPending && "bg-foreground-faint"
        )}
        aria-hidden="true"
      />
      {STATUS_LABEL[status]}
    </span>
  );
}
