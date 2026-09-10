import type { Metric } from "@/types/project";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/** Spec §14: "Metrics should have strong visual treatment." Only ever
 *  rendered with real, verified values — see data/projects.ts. */
export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label}>
          <div className="font-technical text-3xl tabular-nums text-accent md:text-4xl">
            {metric.value}
          </div>
          <TechnicalLabel className="mt-2">{metric.label}</TechnicalLabel>
          {metric.note && (
            <p className="mt-1 font-body text-xs text-foreground-faint">{metric.note}</p>
          )}
        </div>
      ))}
    </div>
  );
}
