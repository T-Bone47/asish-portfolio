"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface RadioScenario {
  id: string;
  driverQuery: string;
  contextVectors: string[];
  engineerResponse: string;
  telemetryAction: string;
}

const RADIO_SCENARIOS: RadioScenario[] = [
  {
    id: "strategy-pit",
    driverQuery: "“Box this lap to undercut car ahead, or extend 2 laps?”",
    contextVectors: [
      "Gap to Car Ahead: 1.24s (DRS Window)",
      "Pit Window: Open (Laps 18–21, Current: Lap 19)",
      "Pit Delta: 21.8s (Rejoin in clean air, P6 ahead of traffic)",
      "Tyre Deg: Front-Right Core Temp 106°C (+4°C over threshold)",
    ],
    engineerResponse:
      "“Box, box. Rejoin will be in clean air with 4.2s margin over the Haas. Front right temp is spiking on turn 8 exit. Take hard compound, push out-lap.”",
    telemetryAction: "CONFIRMED PIT ENTRY — HARD COMPOUND ALLOCATED",
  },
  {
    id: "tyre-thermal",
    driverQuery: "“Rear tyres are getting nervous in high-speed sector 2.”",
    contextVectors: [
      "Tyre Slip Ratio: Rear slip ratio +12% vs lap 12 baseline",
      "Surface vs Core: Core 108°C / Surface 114°C (Overheating)",
      "Pace Delta: Losing 0.18s in Turns 6–7",
      "Remaining Tyre Life: 34% (Predicted degradation gradient: -0.08s/lap)",
    ],
    engineerResponse:
      "“Affirm. Surface temp is 114°C on rears. You have 0.4 laps fuel delta in hand. Back off entry to Turn 7 by half a meter and short-shift out of 8 to stabilize surface temps.”",
    telemetryAction: "RECOMMEND DIFF ADJUSTMENT + SHORT-SHIFTING",
  },
  {
    id: "fuel-lift-coast",
    driverQuery: "“Confirm fuel target. Can we run full engine mode until the stop?”",
    contextVectors: [
      "Fuel Remaining: 14.8 kg",
      "Lap Consumption: 1.82 kg/lap (Limit: 1.78 kg/lap)",
      "Delta vs Target: -0.15 laps deficit",
      "Safety Car Probability: Low (0 incidents in S1/S2)",
    ],
    engineerResponse:
      "“Negative. We are negative 0.15 laps on target. Lift and coast 50 meters before Turn 1 and Turn 11. That gets us on target within two laps without conceding DRS.”",
    telemetryAction: "ENGAGE LIFT & COAST PROTOCOL (50M DELTA)",
  },
];

const DEFAULT_SCENARIO = RADIO_SCENARIOS[0] as RadioScenario;

export function RaceMindSessionVisual() {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("strategy-pit");
  const scenario: RadioScenario =
    RADIO_SCENARIOS.find((s) => s.id === activeScenarioId) ?? DEFAULT_SCENARIO;

  return (
    <div className="my-10 w-full overflow-hidden rounded-sm border border-border-subtle bg-surface-subtle/70 p-6 md:p-8">
      {/* Header telemetry HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <span className="font-technical text-xs uppercase tracking-widest text-accent">
            Architecture Simulation & AI Interface
          </span>
          <h3 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground">
            RaceMind-AI Telemetry & Race Engineering Architecture
          </h3>
        </div>
        <div className="flex items-center gap-3 font-technical text-xs">
          <span className="rounded-sm border border-border-subtle px-2.5 py-1 text-foreground-muted">
            SPECIFICATION: 60Hz UDP INGESTION
          </span>
          <span className="rounded-sm border border-accent/40 bg-accent/10 px-2.5 py-1 text-accent">
            DEMO SESSION STATE
          </span>
        </div>
      </div>

      {/* Verified Status & Simulation Notice Banner */}
      <div className="mt-4 space-y-2">
        <div className="rounded-sm border border-border-subtle bg-surface/50 px-4 py-2.5 font-technical text-xs text-foreground-muted">
          <span className="text-accent font-semibold mr-2">[VERIFIED STATUS]</span>
          FastAPI backend and session abstraction fully tested. Codemasters F1 telemetry stream
          validated. Frontend desktop console in progress.
        </div>
        <div className="rounded-sm border border-border-subtle/80 bg-surface-subtle/40 px-4 py-2 font-technical text-[11px] text-foreground-faint">
          <span className="text-foreground-muted font-semibold mr-2">[ILLUSTRATIVE DEMO SESSION]</span>
          The session telemetry values below (tyre wear %, temps, fuel delta) represent an
          illustrative simulation state demonstrating how normalized session state vectors feed the
          AI engineer reasoning pipeline — not captured live hardware logs.
        </div>
      </div>

      {/* Live Session State Bus Matrix */}
      <div className="mt-6">
        <div className="mb-2 font-technical text-xs uppercase tracking-widest text-foreground-faint">
          Illustrative Normalized Session State Bus (Architecture Simulation)
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-sm border border-border-subtle bg-surface/80 p-3">
            <div className="font-technical text-[10px] uppercase text-foreground-faint">
              SIMULATED TYRE WEAR & TEMP
            </div>
            <div className="mt-1 font-technical text-sm font-semibold text-foreground">FR: 74% / 106°C</div>
            <div className="font-technical text-[10px] text-accent/80">Compound: Hard (C2)</div>
          </div>
          <div className="rounded-sm border border-border-subtle bg-surface/80 p-3">
            <div className="font-technical text-[10px] uppercase text-foreground-faint">
              SIMULATED FUEL DELTA
            </div>
            <div className="mt-1 font-technical text-sm font-semibold text-foreground">+0.42 Laps</div>
            <div className="font-technical text-[10px] text-accent/80">Flow: 98.4 kg/h peak</div>
          </div>
          <div className="rounded-sm border border-border-subtle bg-surface/80 p-3">
            <div className="font-technical text-[10px] uppercase text-foreground-faint">
              SIMULATED GAP AHEAD (DRS)
            </div>
            <div className="mt-1 font-technical text-sm font-semibold text-foreground">-1.24 s</div>
            <div className="font-technical text-[10px] text-accent/80">Delta closing: -0.15s/L</div>
          </div>
          <div className="rounded-sm border border-border-subtle bg-surface/80 p-3">
            <div className="font-technical text-[10px] uppercase text-foreground-faint">
              SIMULATED PIT WINDOW
            </div>
            <div className="mt-1 font-technical text-sm font-semibold text-accent">OPEN (L18–21)</div>
            <div className="font-technical text-[10px] text-foreground-muted">Est. Rejoin: P6 (Clean Air)</div>
          </div>
        </div>
      </div>

      {/* Contextual Radio Query Engine Demo */}
      <div className="mt-6 rounded-sm border border-border-subtle bg-surface/90 p-5">
        <div className="flex items-center justify-between border-b border-border-subtle pb-3">
          <span className="font-technical text-xs uppercase tracking-widest text-foreground-faint">
            Interactive Driver Radio Simulation (Select Scenario)
          </span>
          <span className="font-technical text-xs text-accent">Sub-second Context Injection</span>
        </div>

        {/* Radio query scenario buttons */}
        <div className="mt-4 flex flex-wrap gap-2">
          {RADIO_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => setActiveScenarioId(sc.id)}
              className={cn(
                "rounded-sm border px-3 py-1.5 font-technical text-xs transition-all duration-150 outline-none",
                sc.id === activeScenarioId
                  ? "border-accent bg-accent/10 text-foreground font-semibold"
                  : "border-border-subtle bg-surface-subtle text-foreground-muted hover:border-border-strong hover:text-foreground",
                "focus-visible:ring-1 focus-visible:ring-accent"
              )}
            >
              {sc.id === "strategy-pit" && "Pit Strategy Call"}
              {sc.id === "tyre-thermal" && "Tyre Thermal Warning"}
              {sc.id === "fuel-lift-coast" && "Fuel Conservation Target"}
            </button>
          ))}
        </div>

        {/* Driver Query Box */}
        <div className="mt-4 rounded-sm border border-border-subtle bg-surface-subtle p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
              Driver Radio Ingress [AUDIO TRANSCRIPTION / TEXT]
            </span>
            <span className="font-technical text-[10px] text-accent">CH 01 PIT-TO-CAR</span>
          </div>
          <div className="mt-1.5 font-technical text-sm text-foreground italic">
            {scenario.driverQuery}
          </div>
        </div>

        {/* Context Injection Vector Trace */}
        <div className="mt-4">
          <div className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
            Injected Session Context Vectors (Supplied to LLM Prompt Buffer)
          </div>
          <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {scenario.contextVectors.map((vector) => (
              <li
                key={vector}
                className="flex items-center gap-2 rounded-sm border border-border-subtle/80 bg-surface px-2.5 py-1 font-technical text-xs text-foreground-muted"
              >
                <span className="text-accent font-mono">›</span>
                {vector}
              </li>
            ))}
          </ul>
        </div>

        {/* AI Race Engineer Radio Response */}
        <div className="mt-4 rounded-sm border border-accent/40 bg-accent/5 p-3.5">
          <div className="flex items-center justify-between">
            <span className="font-technical text-[10px] uppercase tracking-widest text-accent">
              RaceMind-AI Engineer Response [SYNTHESIZED PIT RADIO]
            </span>
            <span className="font-technical text-[10px] text-foreground-faint">MODE: ASYNC STREAMING</span>
          </div>
          <div className="mt-1.5 font-technical text-sm text-foreground">
            {scenario.engineerResponse}
          </div>
          <div className="mt-2 border-t border-accent/20 pt-2 font-technical text-[11px] text-accent font-semibold">
            STATUS: {scenario.telemetryAction}
          </div>
        </div>
      </div>
    </div>
  );
}
