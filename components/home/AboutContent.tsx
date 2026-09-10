import { education } from "@/data/education";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { FlowSteps } from "@/components/ui/FlowSteps";

/**
 * Full About content — spec §20/§21/§4. Self-contained: used by the
 * dedicated /about page, which needs to stand on its own for anyone
 * who lands there directly rather than scrolling from the homepage.
 *
 * Education is deliberately minimal per §21 — institution and program
 * only. No CGPA, marks, grades, or semester information exists here,
 * on purpose; don't add any.
 */
export function AboutContent() {
  return (
    <div>
      <FlowSteps
        steps={["Data", "Models", "Systems", "Simulation", "Intelligence", "Engineering Decisions"]}
      />
      <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-foreground-muted">
        Motorsport is the primary engineering domain. AI/ML, simulation, and
        software are the tools used to solve problems within it.
      </p>

      <div className="mt-12 border-t border-border-subtle pt-8">
        <TechnicalLabel>Education</TechnicalLabel>
        <h3 className="mt-3 font-display text-2xl uppercase tracking-tight">
          {education.institution}
        </h3>
        <p className="mt-1 font-body text-sm text-foreground-muted">{education.program}</p>
      </div>
    </div>
  );
}
