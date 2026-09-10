import { education } from "@/data/education";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { FlowSteps } from "@/components/ui/FlowSteps";

/**
 * Spec §20/§21 & Phase 3 Signature Pass: Engineering Concept Topology & System Map.
 * 
 * Includes:
 * - 6-stage engineering statement pipeline
 * - Compact conceptual engineering map: Motorsport -> [Software, Simulation, Telemetry, AI/ML] -> Decisions
 * - Verified education strictly at VIT-AP University (zero academic score inflation)
 */
export function AboutContent() {
  return (
    <div className="space-y-16">
      {/* 1. Core Engineering Pipeline */}
      <div>
        <TechnicalLabel className="text-accent mb-4 block">System Pipeline</TechnicalLabel>
        <FlowSteps
          steps={["Data", "Models", "Systems", "Simulation", "Intelligence", "Engineering Decisions"]}
        />
        <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-foreground-muted">
          Motorsport is the primary engineering domain. AI/ML, simulation, and
          software are the tools used to solve problems within it.
        </p>
      </div>

      {/* 2. Engineering Concept System Map (Spec §37) */}
      <div className="border border-border-subtle bg-surface/30 p-6 md:p-8 rounded-sm">
        <div className="flex items-center justify-between border-b border-border-subtle/70 pb-3">
          <TechnicalLabel className="text-accent">Domain Architecture</TechnicalLabel>
          <span className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
            [CONCEPT_TOPOLOGY]
          </span>
        </div>

        <div className="mt-6 font-technical text-xs uppercase tracking-wider">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            <span className="font-semibold text-foreground text-sm">MOTORSPORT (PRIMARY DOMAIN)</span>
          </div>

          <div className="ml-4 border-l border-border-strong pl-6 space-y-4 my-3 py-1">
            <div className="flex items-center gap-2.5 text-foreground-muted">
              <span className="text-accent">├──</span>
              <span>SOFTWARE ARCHITECTURE & SYSTEMS</span>
            </div>
            <div className="flex items-center gap-2.5 text-foreground-muted">
              <span className="text-accent">├──</span>
              <span>NUMERICAL SIMULATION (VEHICLE & LAP DYNAMICS)</span>
            </div>
            <div className="flex items-center gap-2.5 text-foreground-muted">
              <span className="text-accent">├──</span>
              <span>REAL-TIME TELEMETRY & DATA PIPELINES</span>
            </div>
            <div className="flex items-center gap-2.5 text-foreground-muted">
              <span className="text-accent">└──</span>
              <span>AI / ML INTELLIGENCE & OPTIMIZATION</span>
            </div>
          </div>

          <div className="ml-4 flex items-center gap-3 pt-2">
            <span className="text-accent font-bold">↓</span>
            <span className="rounded-sm border border-accent/40 bg-accent/10 px-3 py-1 text-accent font-semibold">
              ENGINEERING DECISIONS & STRATEGY EXECUTION
            </span>
          </div>
        </div>
      </div>

      {/* 3. Verified Education */}
      <div className="border-t border-border-subtle pt-8">
        <div className="flex items-center gap-3">
          <TechnicalLabel>Education</TechnicalLabel>
          <span className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
            [VERIFIED_CREDENTIAL]
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl uppercase tracking-tight">
          {education.institution}
        </h3>
        <p className="mt-1 font-body text-sm text-foreground-muted">{education.program}</p>
      </div>
    </div>
  );
}
