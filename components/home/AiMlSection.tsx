import { aiMlFlows } from "@/data/ai-ml-flows";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/**
 * Spec §18 & Phase 3 Signature Pass: Engineered AI/ML Computational Pipelines.
 * Features 3 parallel domain pipelines with vertical progression stages:
 * Motorsport (Telemetry -> State -> Strategy -> Decision),
 * EA FC (Data -> Features -> Player Intelligence -> Recommendation),
 * VyaparPulse (Voice -> Speech -> Transaction Intelligence -> Forecast).
 */
export function AiMlSection() {
  return (
    <Container as="section" className="py-16 md:py-24 border-t border-border-subtle">
      <div className="flex items-center gap-3">
        <TechnicalLabel className="text-accent">AI / ML Engineering</TechnicalLabel>
        <span aria-hidden="true" className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
          [COMPUTATIONAL_PIPELINES]
        </span>
      </div>

      <h2 className="mt-4 font-display text-display-md uppercase leading-tight tracking-tight">
        Models are tools.
        <br />
        Engineering is the objective.
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {aiMlFlows.map((flow, index) => {
          const domainNum = String(index + 1).padStart(2, "0");
          return (
            <div
              key={flow.id}
              className="group relative rounded-sm border border-border-subtle bg-surface/30 p-6 transition-all duration-200 hover:border-accent/40 hover:bg-surface/60"
            >
              <div className="flex items-baseline justify-between border-b border-border-subtle/70 pb-4">
                <span className="font-technical text-sm text-foreground uppercase tracking-wider font-medium">
                  {flow.label}
                </span>
                <span className="font-technical text-xs text-accent font-semibold tabular-nums">
                  SYS.{domainNum}
                </span>
              </div>

              {/* Vertical computational pipeline */}
              <ol className="mt-6 space-y-2">
                {flow.steps.map((step, i) => {
                  const isFinal = i === flow.steps.length - 1;
                  return (
                    <li key={step} className="flex flex-col items-start">
                      <div className="flex items-center gap-2.5 w-full">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-sm border font-technical text-[10px] tabular-nums ${
                            isFinal
                              ? "border-accent bg-accent/10 text-accent font-semibold"
                              : "border-border-subtle bg-background text-foreground-faint group-hover:border-border-strong"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={`font-technical text-xs uppercase tracking-[0.12em] ${
                            isFinal
                              ? "text-accent font-medium"
                              : "text-foreground-muted group-hover:text-foreground"
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                      {!isFinal && (
                        <span
                          aria-hidden="true"
                          className="ml-2.5 my-0.5 h-3 w-px bg-border-strong/70 text-transparent select-none"
                        >
                          |
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
