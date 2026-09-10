import type { PipelineStage } from "@/types/project";

/**
 * Renders a project's real pipeline stages as a simple vertical flow.
 * Deliberately plain (numbered steps + a connecting rule + a chip row
 * for any stage that fans out) rather than the bespoke ASCII-style
 * diagram sketched in the spec — that's a signature-visual-level
 * refinement worth doing once this can be seen rendered in a browser,
 * not guessed at blind.
 */
export function ArchitecturePipeline({ stages }: { stages: PipelineStage[] }) {
  return (
    <ol className="max-w-2xl">
      {stages.map((stage, i) => (
        <li key={stage.label}>
          <div className="flex items-center gap-4">
            <span className="font-technical text-xs text-foreground-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-technical text-sm uppercase tracking-wide text-foreground">
              {stage.label}
            </span>
          </div>
          {stage.children && stage.children.length > 0 && (
            <ul className="ml-9 mt-3 flex flex-wrap gap-2">
              {stage.children.map((child) => (
                <li
                  key={child}
                  className="rounded-sm border border-border-subtle px-2 py-1 font-technical text-[11px] uppercase tracking-wide text-foreground-muted"
                >
                  {child}
                </li>
              ))}
            </ul>
          )}
          {i < stages.length - 1 && (
            <div className="ml-[7px] my-3 h-5 w-px bg-border-strong" aria-hidden="true" />
          )}
        </li>
      ))}
    </ol>
  );
}
