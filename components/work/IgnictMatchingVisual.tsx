"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Direction = "candidate-to-opportunity" | "opportunity-to-candidate";

interface MatchSignal {
  id: string;
  name: string;
  weight: string;
  score: number;
  status: "STRONG" | "SATISFIED" | "FLAGGED_GAP";
  evidence: string;
  breakdown: string;
}

const SIGNALS: MatchSignal[] = [
  {
    id: "skill",
    name: "SKILL MATCH",
    weight: "25%",
    score: 96,
    status: "STRONG",
    evidence: "Python, FastAPI, PostgreSQL, pgvector, Redis, React, TypeScript",
    breakdown: "Semantic alignment across 9 core competencies. High-confidence taxonomy match.",
  },
  {
    id: "experience",
    name: "EXPERIENCE FIT",
    weight: "20%",
    score: 91,
    status: "STRONG",
    evidence: "Applied data pipelines, high-throughput ingestion, and real-time intelligence systems",
    breakdown: "Role depth and trajectory match target senior engineering requirements.",
  },
  {
    id: "education",
    name: "EDUCATION FIT",
    weight: "10%",
    score: 90,
    status: "SATISFIED",
    evidence: "Computer Science & Engineering integrated degree foundation",
    breakdown: "Formal curriculum maps to algorithmic, database, and systems fundamentals.",
  },
  {
    id: "projects",
    name: "PROJECT RELEVANCE",
    weight: "15%",
    score: 98,
    status: "STRONG",
    evidence: "Event-driven telemetry systems, vector similarity retrieval, deterministic replay engines",
    breakdown: "Production architectural patterns closely match opportunity core problems.",
  },
  {
    id: "domain",
    name: "DOMAIN FIT",
    weight: "10%",
    score: 94,
    status: "STRONG",
    evidence: "High-throughput data streaming, numerical modeling, ranking systems",
    breakdown: "Proven execution in low-latency and deterministic ranking domains.",
  },
  {
    id: "preference",
    name: "PREFERENCE FIT",
    weight: "5%",
    score: 95,
    status: "SATISFIED",
    evidence: "Modality, working hours, and operational focus fully aligned",
    breakdown: "Zero friction in candidate preferences vs opportunity parameters.",
  },
  {
    id: "eligibility",
    name: "ELIGIBILITY",
    weight: "HARD_GATE",
    score: 100,
    status: "SATISFIED",
    evidence: "Deterministic pass: work authorization, requisite prerequisites verified",
    breakdown: "Hard constraint evaluated before ranking. Semantic similarity cannot bypass this gate.",
  },
  {
    id: "critical_gaps",
    name: "CRITICAL GAPS",
    weight: "AUDIT",
    score: 82,
    status: "FLAGGED_GAP",
    evidence: "Opportunity mentions distributed C++ microservices; candidate has Python/TS production history",
    breakdown: "Flagged as manageable gap with high adjacent language foundation. Non-blocking.",
  },
];

const HIGHLIGHTS = [
  {
    code: "01",
    title: "BIDIRECTIONAL MATCHING",
    desc: "Candidate → Opportunity and Opportunity → Candidate powered by the same underlying engine.",
  },
  {
    code: "02",
    title: "SEMANTIC RETRIEVAL",
    desc: "pgvector embedding retrieval discovers conceptually aligned matches beyond rigid keywords.",
  },
  {
    code: "03",
    title: "DETERMINISTIC RANKING",
    desc: "Versioned, reproducible scoring algorithms. LLMs assist explanations, not final scores.",
  },
  {
    code: "04",
    title: "HARD FILTERS",
    desc: "Non-negotiable eligibility constraints enforced before ranking algorithms execute.",
  },
  {
    code: "05",
    title: "EVIDENCE-BACKED EXPLANATIONS",
    desc: "Every component signal traces back to verifiable candidate and opportunity evidence.",
  },
  {
    code: "06",
    title: "PRODUCTION ARCHITECTURE",
    desc: "PostgreSQL · pgvector · Redis · FastAPI · React / Vite deployed in production.",
  },
  {
    code: "07",
    title: "EVALUATION",
    desc: "Continuous ranking benchmarks and hard-filter validation to eliminate hallucination.",
  },
  {
    code: "08",
    title: "SECURITY",
    desc: "Strict authentication, tenant isolation, and encrypted candidate data pipelines.",
  },
];

export function IgnictMatchingVisual() {
  const [direction, setDirection] = useState<Direction>("candidate-to-opportunity");
  const [activeSignalId, setActiveSignalId] = useState<string>("skill");

  const activeSignal = SIGNALS.find((s) => s.id === activeSignalId) || SIGNALS[0];

  return (
    <div className="my-16 border border-border-subtle bg-background p-6 md:p-8 rounded-sm">
      {/* Top telemetry readouts */}
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <span className="font-technical text-xs tracking-widest text-accent font-semibold">
            SYS.07 // INTELLIGENCE PLATFORM
          </span>
          <h3 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground md:text-3xl">
            IGNICT / BOTHWAYS
          </h3>
          <p className="font-technical text-xs uppercase tracking-wider text-foreground-faint">
            ONE MATCHING ENGINE. TWO DIRECTIONS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-technical text-xs text-foreground-faint">DIRECTION:</span>
          <div className="inline-flex rounded-sm border border-border-strong bg-surface p-1">
            <button
              type="button"
              onClick={() => setDirection("candidate-to-opportunity")}
              className={cn(
                "px-3 py-1 font-technical text-xs uppercase tracking-wider transition-all",
                direction === "candidate-to-opportunity"
                  ? "bg-accent text-neutral-950 font-semibold"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              Candidate → Opportunity
            </button>
            <button
              type="button"
              onClick={() => setDirection("opportunity-to-candidate")}
              className={cn(
                "px-3 py-1 font-technical text-xs uppercase tracking-wider transition-all",
                direction === "opportunity-to-candidate"
                  ? "bg-accent text-neutral-950 font-semibold"
                  : "text-foreground-muted hover:text-foreground"
              )}
            >
              Opportunity → Candidate
            </button>
          </div>
        </div>
      </div>

      {/* Direction Explanation Banner */}
      <div className="mt-4 border-l-2 border-accent bg-surface/50 p-4">
        <div className="font-technical text-xs uppercase tracking-widest text-accent">
          {direction === "candidate-to-opportunity"
            ? "ACTIVE MODE: CANDIDATE → OPPORTUNITY"
            : "ACTIVE MODE: OPPORTUNITY → CANDIDATE"}
        </div>
        <p className="mt-1 font-body text-sm text-foreground-muted">
          {direction === "candidate-to-opportunity"
            ? "Discovering and ranking opportunities based on candidate's skills, experience, education, projects, preferences, and verified eligibility."
            : "Ranking candidate pipeline against opportunity requirements using the exact same underlying deterministic matching engine."}
        </p>
      </div>

      {/* Matching Core Engine HUD */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Source Node */}
        <div className="rounded-sm border border-border-subtle bg-surface/40 p-4">
          <div className="flex items-center justify-between">
            <span className="font-technical text-[11px] text-foreground-faint">01 // INGRESS</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
          <div className="mt-2 font-display text-lg uppercase text-foreground">
            {direction === "candidate-to-opportunity" ? "Candidate Profile" : "Opportunity Spec"}
          </div>
          <ul className="mt-3 space-y-1.5 font-technical text-xs text-foreground-muted">
            <li className="flex justify-between border-b border-border-subtle/40 pb-1">
              <span>SKILLS & TAXONOMY</span>
              <span className="text-accent">9 VERIFIED</span>
            </li>
            <li className="flex justify-between border-b border-border-subtle/40 pb-1">
              <span>EXPERIENCE EVIDENCE</span>
              <span className="text-foreground">EXTRACTED</span>
            </li>
            <li className="flex justify-between border-b border-border-subtle/40 pb-1">
              <span>NORMALIZATION</span>
              <span className="text-foreground">CANONICAL</span>
            </li>
            <li className="flex justify-between">
              <span>VECTOR EMBEDDING</span>
              <span className="text-accent">1536-DIM</span>
            </li>
          </ul>
        </div>

        {/* Central Matching Engine */}
        <div className="relative rounded-sm border border-accent/40 bg-surface/80 p-5 shadow-[0_0_20px_rgba(52,226,122,0.06)]">
          <div className="flex items-center justify-between">
            <span className="font-technical text-[11px] text-accent">02 // CORE ENGINE</span>
            <span className="rounded-sm bg-accent/20 px-1.5 py-0.5 font-technical text-[10px] text-accent">
              DETERMINISTIC
            </span>
          </div>
          <div className="mt-2 font-display text-xl uppercase tracking-tight text-foreground">
            IGNICT Match Engine
          </div>

          <div className="mt-4 flex items-baseline justify-between border-y border-border-subtle py-3">
            <div>
              <div className="font-technical text-[10px] uppercase text-foreground-faint">
                COMPUTED SCORE
              </div>
              <div className="font-technical text-3xl font-bold text-accent">94.2</div>
            </div>
            <div className="text-right font-technical text-xs text-foreground-muted">
              <div>7 SIGNALS FOUND</div>
              <div className="text-amber-400">1 CRITICAL GAP</div>
            </div>
          </div>

          <div className="mt-3 font-technical text-[11px] text-foreground-faint">
            RETRIEVAL: <span className="text-foreground">VECTOR (pgvector)</span> · RANKING:{" "}
            <span className="text-foreground">DETERMINISTIC</span>
          </div>
        </div>

        {/* Target Node */}
        <div className="rounded-sm border border-border-subtle bg-surface/40 p-4">
          <div className="flex items-center justify-between">
            <span className="font-technical text-[11px] text-foreground-faint">03 // EGRESS</span>
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
          <div className="mt-2 font-display text-lg uppercase text-foreground">
            {direction === "candidate-to-opportunity" ? "Opportunity Target" : "Candidate Target"}
          </div>
          <ul className="mt-3 space-y-1.5 font-technical text-xs text-foreground-muted">
            <li className="flex justify-between border-b border-border-subtle/40 pb-1">
              <span>HARD ELIGIBILITY</span>
              <span className="text-accent">PASS (100%)</span>
            </li>
            <li className="flex justify-between border-b border-border-subtle/40 pb-1">
              <span>EVIDENCE QUALITY</span>
              <span className="text-accent">VERIFIED</span>
            </li>
            <li className="flex justify-between border-b border-border-subtle/40 pb-1">
              <span>SIGNAL CONFIDENCE</span>
              <span className="text-foreground">HIGH (P95)</span>
            </li>
            <li className="flex justify-between">
              <span>INSPECTABILITY</span>
              <span className="text-foreground">DECOMPOSED</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Match Intelligence Signal Decomposition */}
      <div className="mt-8">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <div>
            <span className="font-technical text-xs uppercase tracking-widest text-accent">
              MATCH INTELLIGENCE DECOMPOSITION
            </span>
            <h4 className="mt-0.5 font-display text-lg uppercase tracking-tight text-foreground">
              Inspectable Scoring Signals (Select to Audit Evidence)
            </h4>
          </div>
          <span className="font-technical text-xs text-foreground-faint">
            LLMs explain evidence; deterministic math computes score.
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {SIGNALS.map((sig) => {
            const isSelected = sig.id === activeSignalId;
            return (
              <button
                key={sig.id}
                type="button"
                onClick={() => setActiveSignalId(sig.id)}
                className={cn(
                  "flex flex-col justify-between rounded-sm border p-3 text-left transition-all",
                  isSelected
                    ? "border-accent bg-surface shadow-[0_0_12px_rgba(52,226,122,0.15)]"
                    : "border-border-subtle bg-surface/30 hover:border-border-strong hover:bg-surface/60",
                  "focus-visible:ring-1 focus-visible:ring-accent"
                )}
              >
                <span className="font-technical text-[10px] text-foreground-faint">
                  {sig.weight}
                </span>
                <span className="my-2 font-technical text-[11px] font-semibold text-foreground leading-tight">
                  {sig.name}
                </span>
                <div className="flex items-center justify-between font-technical text-xs">
                  <span
                    className={
                      sig.status === "STRONG"
                        ? "text-accent"
                        : sig.status === "FLAGGED_GAP"
                        ? "text-amber-400"
                        : "text-foreground"
                    }
                  >
                    {sig.score}
                  </span>
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      sig.status === "STRONG"
                        ? "bg-accent"
                        : sig.status === "FLAGGED_GAP"
                        ? "bg-amber-400"
                        : "bg-foreground-muted"
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Signal Inspection Card */}
        {activeSignal && (
          <div className="mt-4 rounded-sm border border-border-subtle bg-surface/80 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-subtle pb-3">
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "rounded-sm px-2 py-0.5 font-technical text-xs uppercase",
                    activeSignal.status === "STRONG"
                      ? "bg-accent/15 text-accent border border-accent/40"
                      : activeSignal.status === "FLAGGED_GAP"
                      ? "bg-amber-400/15 text-amber-400 border border-amber-400/40"
                      : "bg-foreground-muted/15 text-foreground border border-border-strong"
                  )}
                >
                  {activeSignal.status}
                </span>
                <h5 className="font-display text-lg uppercase tracking-tight text-foreground">
                  {activeSignal.name}
                </h5>
              </div>
              <div className="font-technical text-xs text-foreground-faint">
                WEIGHT: {activeSignal.weight} · COMPONENT SCORE:{" "}
                <span className="text-accent font-semibold">{activeSignal.score} / 100</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <span className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
                  Supporting Evidence Trail
                </span>
                <p className="mt-1 font-technical text-xs text-foreground leading-relaxed">
                  {activeSignal.evidence}
                </p>
              </div>
              <div>
                <span className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
                  Mathematical Decomposition Analysis
                </span>
                <p className="mt-1 font-body text-xs text-foreground-muted leading-relaxed">
                  {activeSignal.breakdown}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pipeline Flow Architecture Readout */}
      <div className="mt-10 border-t border-border-subtle pt-8">
        <div className="flex items-center justify-between">
          <span className="font-technical text-xs uppercase tracking-widest text-accent">
            MULTI-STAGE ENGINE PIPELINE
          </span>
          <span className="font-technical text-[10px] text-foreground-faint">
            REPRODUCIBLE EXECUTION
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          {[
            { step: "01", name: "PROFILE / SPEC", detail: "Multi-format ingestion" },
            { step: "02", name: "EXTRACTION", detail: "Structured entity graph" },
            { step: "03", name: "NORMALIZATION", detail: "Canonical taxonomy mapping" },
            { step: "04", name: "EMBEDDINGS", detail: "Dense vector generation" },
            { step: "05", name: "RETRIEVAL", detail: "pgvector cosine similarity" },
            { step: "06", name: "HARD FILTERS", detail: "Non-negotiable constraints" },
            { step: "07", name: "DETERMINISTIC", detail: "Versioned scoring logic" },
            { step: "08", name: "COMPONENT SCORES", detail: "8 measurable sub-scores" },
            { step: "09", name: "EVIDENCE GEN", detail: "Verifiable rationale trace" },
            { step: "10", name: "RANKED RESULT", detail: "Inspectable match output" },
          ].map((st) => (
            <div
              key={st.step}
              className="rounded-sm border border-border-subtle bg-surface/30 p-2.5 font-technical text-left"
            >
              <div className="flex items-center justify-between text-[10px] text-foreground-faint">
                <span>{st.step}</span>
                <span className="text-accent">→</span>
              </div>
              <div className="mt-1 text-xs font-semibold text-foreground uppercase">{st.name}</div>
              <div className="text-[10px] text-foreground-faint truncate">{st.detail}</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Architecture Console */}
      <div className="mt-8 rounded-sm border border-border-subtle bg-surface/50 p-5">
        <span className="font-technical text-xs uppercase tracking-widest text-accent">
          SYSTEM ARCHITECTURE
        </span>
        <pre className="mt-3 overflow-x-auto font-technical text-[11px] text-foreground-muted leading-relaxed select-all">
{`                    ┌─────────────────────┐
                    │     REACT CLIENT    │
                    │   TypeScript / Vite │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      FASTAPI        │
                    │    API / AUTH       │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │      SERVICES       │
                    │ Matching / Ranking  │
                    │ Ingestion / Profile │
                    └──────────┬──────────┘
                               │
             ┌─────────────────┼─────────────────┐
             ▼                 ▼                 ▼
       ┌──────────┐      ┌──────────┐     ┌──────────┐
       │PostgreSQL│      │ pgvector │     │  Redis   │
       │   DATA   │      │ EMBEDDING│     │  QUEUE   │
       └──────────┘      └──────────┘     └──────────┘
                               │
                               ▼
                       MATCHING ENGINE
                               │
                               ▼
                    EVIDENCE-BACKED RESULT`}
        </pre>
      </div>

      {/* 8 Compact Engineering Highlights */}
      <div className="mt-10 border-t border-border-subtle pt-8">
        <span className="font-technical text-xs uppercase tracking-widest text-accent">
          ENGINEERING HIGHLIGHTS // SYSTEM READOUTS
        </span>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h) => (
            <div
              key={h.code}
              className="rounded-sm border border-border-subtle bg-surface/40 p-4 transition-colors hover:border-border-strong hover:bg-surface/80"
            >
              <div className="font-technical text-xs text-accent font-semibold">{h.code}</div>
              <div className="mt-1 font-technical text-xs font-semibold uppercase text-foreground">
                {h.title}
              </div>
              <p className="mt-2 font-body text-xs text-foreground-muted leading-relaxed">
                {h.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
