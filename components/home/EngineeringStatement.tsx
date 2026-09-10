import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { FlowSteps } from "@/components/ui/FlowSteps";

/** Spec §7 (homepage order) + §20's content — no separate copy was
 *  given specifically for "Engineering Statement" apart from what §20
 *  (About) provides, so this section and the About page share the same
 *  given pipeline/statement rather than inventing separate wording. */
const IDENTITY_FRAGMENTS = [
  {
    role: "ENGINEER",
    summary: "Builds distributed systems, event streams, and real-time telemetry pipelines.",
  },
  {
    role: "RESEARCHER",
    summary: "Investigates numerical modeling, vehicle dynamics, and deterministic ranking algorithms.",
  },
  {
    role: "DESIGNER",
    summary: "Cares about mechanical sympathy, high-contrast typography, and precision interfaces.",
  },
  {
    role: "BUILDER",
    summary: "Turns mathematical formulations and raw sensors into verified production software.",
  },
];

export function EngineeringStatement() {
  return (
    <Container as="section" className="py-16 md:py-24 border-t border-border-subtle">
      <div className="flex items-center gap-3">
        <TechnicalLabel className="text-accent">Engineering Statement</TechnicalLabel>
        <span aria-hidden="true" className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
          [IDENTITY_TOPOLOGY]
        </span>
      </div>

      <h2 className="mt-4 font-display text-display-md uppercase tracking-tight text-foreground">
        Motorsport is the primary engineering domain.
        <br />
        <span className="text-foreground-muted">
          AI/ML, simulation, and software are the tools used to solve problems within it.
        </span>
      </h2>

      {/* Editorial Identity Fragments */}
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {IDENTITY_FRAGMENTS.map((frag, idx) => (
          <div
            key={frag.role}
            className="group rounded-sm border border-border-subtle bg-surface/30 p-5 transition-colors hover:border-accent/40 hover:bg-surface/60"
          >
            <div className="flex items-center justify-between font-technical text-[10px] text-foreground-faint">
              <span>0{idx + 1} {"//"} IDENTITY</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
            </div>
            <div className="mt-2 font-display text-xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
              {frag.role}
            </div>
            <p className="mt-2 font-body text-xs leading-relaxed text-foreground-muted">
              {frag.summary}
            </p>
          </div>
        ))}
      </div>

      {/* Pipeline Progression */}
      <div className="mt-12 pt-8 border-t border-border-subtle/60">
        <div className="flex items-center justify-between font-technical text-[10px] uppercase tracking-widest text-foreground-faint mb-3">
          <span>COMPUTATIONAL SYSTEM PIPELINE</span>
          <span className="text-accent">6 STAGES VERIFIED</span>
        </div>
        <FlowSteps
          steps={["Data", "Models", "Systems", "Simulation", "Intelligence", "Engineering Decisions"]}
        />
      </div>
    </Container>
  );
}
