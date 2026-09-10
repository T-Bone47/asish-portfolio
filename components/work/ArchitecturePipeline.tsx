"use client";

import { useState } from "react";
import type { PipelineStage } from "@/types/project";
import { cn } from "@/lib/utils";

/**
 * Spec §12 & Phase 2G-E — High-precision Telemetry Architecture Pipeline.
 *
 * Renders a project's real engineering pipeline stages as an interactive
 * technical signal flow:
 * - Active telemetry node indicators with signal line connectivity
 * - Data bus fan-out chips for multi-provider or multi-model stages
 * - Stage inspection highlight on hover/focus
 * - Semantic ol/li hierarchy with full keyboard and screen reader accessibility
 */
export function ArchitecturePipeline({ stages }: { stages: PipelineStage[] }) {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <div className="w-full max-w-3xl rounded-sm border border-border-subtle bg-surface-subtle/50 p-6 md:p-8">
      <div className="mb-6 flex items-center justify-between border-b border-border-subtle pb-3">
        <span className="font-technical text-xs uppercase tracking-widest text-foreground-faint">
          System Architecture Pipeline
        </span>
        <span className="font-technical text-xs text-accent">
          {String(stages.length).padStart(2, "0")} Stages Verified
        </span>
      </div>

      <ol className="relative space-y-6" aria-label="System architecture pipeline stages">
        {stages.map((stage, i) => {
          const isSelected = activeStage === i;
          const isPreceding = activeStage !== null && i < activeStage;
          const stageNumber = String(i + 1).padStart(2, "0");

          return (
            <li
              key={stage.label}
              onMouseEnter={() => setActiveStage(i)}
              onMouseLeave={() => setActiveStage(null)}
              onFocus={() => setActiveStage(i)}
              onBlur={() => setActiveStage(null)}
              tabIndex={0}
              className={cn(
                "group relative rounded-sm border p-4 transition-all duration-200 outline-none",
                isSelected
                  ? "border-accent/60 bg-surface/90 shadow-[0_0_15px_rgba(52,226,122,0.06)]"
                  : isPreceding
                  ? "border-accent/30 bg-surface/50"
                  : "border-border-subtle bg-surface/30 hover:border-border-strong hover:bg-surface/60",
                "focus-visible:ring-1 focus-visible:ring-accent"
              )}
            >
              {/* Connector line to next node */}
              {i < stages.length - 1 && (
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-6 left-7 h-6 w-px transition-colors duration-200",
                    isPreceding || isSelected ? "bg-accent/50" : "bg-border-subtle"
                  )}
                />
              )}

              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex h-6 w-6 items-center justify-center rounded-sm font-technical text-xs transition-colors duration-200",
                      isSelected
                        ? "bg-accent text-background font-medium"
                        : isPreceding
                        ? "border border-accent/40 text-accent"
                        : "border border-border-strong text-foreground-faint group-hover:border-foreground-muted group-hover:text-foreground"
                    )}
                  >
                    {stageNumber}
                  </span>
                  <h4 className="font-technical text-sm uppercase tracking-wider text-foreground">
                    {stage.label}
                  </h4>
                </div>

                <span
                  aria-hidden="true"
                  className={cn(
                    "font-technical text-[10px] uppercase tracking-widest transition-opacity duration-200",
                    isSelected ? "text-accent opacity-100" : "text-foreground-faint opacity-0 group-hover:opacity-100"
                  )}
                >
                  Stage {stageNumber} Active
                </span>
              </div>

              {/* Sub-system bus fan-out */}
              {stage.children && stage.children.length > 0 && (
                <div className="mt-3.5 border-t border-border-subtle/80 pt-3">
                  <div className="mb-2 font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
                    Parallel Sub-systems / Modules ({stage.children.length})
                  </div>
                  <ul className="flex flex-wrap gap-1.5" aria-label={`${stage.label} sub-systems`}>
                    {stage.children.map((child) => (
                      <li
                        key={child}
                        className={cn(
                          "rounded-sm border px-2.5 py-1 font-technical text-[11px] uppercase tracking-wide transition-colors duration-150",
                          isSelected
                            ? "border-accent/40 bg-accent/5 text-foreground"
                            : "border-border-subtle bg-surface-subtle text-foreground-muted hover:border-border-strong hover:text-foreground"
                        )}
                      >
                        <span className="text-accent/60 mr-1.5 font-mono">›</span>
                        {child}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
