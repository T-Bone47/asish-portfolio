import { aiMlFlows } from "@/data/ai-ml-flows";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/**
 * Restructured from three thin stacked rows into a 3-column grid with
 * index numbers — the original layout looked sparse relative to the
 * space it had (verified via full-homepage screenshot); this matches
 * the visual weight of Engineering Domains' grid instead.
 */
export function AiMlSection() {
  return (
    <Container as="section" className="py-16 md:py-20">
      <TechnicalLabel className="text-accent">AI / ML Engineering</TechnicalLabel>

      <h2 className="mt-4 font-display text-display-md uppercase leading-tight tracking-tight">
        Models are tools.
        <br />
        Engineering is the objective.
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {aiMlFlows.map((flow, index) => (
          <div key={flow.id} className="border-t border-border-strong pt-5">
            <div className="font-technical text-xl text-accent">{String(index + 1).padStart(2, "0")}</div>
            <div className="mt-2 font-technical text-sm text-foreground">{flow.label}</div>
            <ul className="mt-4 space-y-2">
              {flow.steps.map((step, i) => (
                <li key={step} className="font-technical text-xs uppercase tracking-[0.1em] text-foreground-muted">
                  {i > 0 && <span className="text-accent">→ </span>}
                  {step}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
