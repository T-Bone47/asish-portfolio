import { cn } from "@/lib/utils";

/**
 * Spec §18/§20 & Phase 3 Signature Pass: Engineered System Flow Pipeline.
 * Renders numbered stage nodes: "01. DATA ──> 02. MODELS ──> ... 06. ENGINEERING DECISIONS".
 */
export function FlowSteps({ steps, className }: { steps: string[]; className?: string }) {
  return (
    <ol className={cn("grid grid-cols-2 gap-3 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center", className)}>
      {steps.map((step, i) => {
        const isFinal = i === steps.length - 1;
        const stepNum = String(i + 1).padStart(2, "0");
        return (
          <li key={step} className="group relative flex items-center gap-3">
            <div
              className={cn(
                "flex items-center gap-2.5 rounded-sm border px-3 py-2 transition-all duration-200",
                isFinal
                  ? "border-accent/60 bg-accent/5 text-accent"
                  : "border-border-subtle bg-surface/30 hover:border-border-strong hover:bg-surface/70"
              )}
            >
              <span
                className={cn(
                  "font-technical text-[10px] tabular-nums font-semibold",
                  isFinal ? "text-accent" : "text-foreground-faint group-hover:text-accent"
                )}
              >
                {stepNum}
              </span>
              <span
                className={cn(
                  "font-technical text-xs uppercase tracking-[0.15em]",
                  isFinal ? "text-accent font-medium" : "text-foreground-muted group-hover:text-foreground"
                )}
              >
                {step}
              </span>
              {isFinal && (
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"
                />
              )}
            </div>
            {!isFinal && (
              <span
                aria-hidden="true"
                className="hidden font-technical text-accent lg:inline select-none"
              >
                →
              </span>
            )}
          </li>
        );
      })}
    </ol>
  );
}
