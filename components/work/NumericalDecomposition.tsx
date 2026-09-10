"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface SectorCondition {
  id: string;
  name: string;
  type: string;
  speed: string;
  ay: string;
  ax: string;
  governingConstraint: string;
  formula: string;
  description: string;
}

const SECTOR_CONDITIONS: SectorCondition[] = [
  {
    id: "high-speed",
    name: "Turn 03: High-Speed Sweeper",
    type: "Aero-Dominated Corner",
    speed: "248 km/h",
    ay: "4.8 g",
    ax: "-0.2 g",
    governingConstraint: "Aerodynamic Downforce & Tyre Load Sensitivity",
    formula: "v_apex = sqrt( (mu * m * g + 0.5 * rho * ClA * v^2) / (m * kappa) )",
    description:
      "At 240+ km/h, aerodynamic downforce increases vertical tyre normal load Fz by over 250%, enabling extreme lateral accelerations approaching 5.0g without tyre saturation.",
  },
  {
    id: "heavy-braking",
    name: "Turn 01: End of Straight Braking",
    type: "Longitudinal Deceleration",
    speed: "335 -> 82 km/h",
    ay: "0.1 g",
    ax: "-5.4 g",
    governingConstraint: "Peak Friction Limit & Downforce Decay",
    formula: "F_brake = mu_x * (m * g + 0.5 * rho * ClA * v^2) <= F_tyre_limit",
    description:
      "Peak braking force exceeds 5g at initial pedal application when aero downforce is maximal, progressively tapering as vehicle speed and aerodynamic load bleed off.",
  },
  {
    id: "hairpin-apex",
    name: "Turn 07: Low-Speed Hairpin",
    type: "Mechanical Grip Corner",
    speed: "68 km/h",
    ay: "2.1 g",
    ax: "0.0 g",
    governingConstraint: "Pure Mechanical Grip & Roll Stiffness Distribution",
    formula: "a_y = v^2 / R = mu_mech * g",
    description:
      "Minimal aerodynamic contribution. Lateral grip is dictated entirely by tyre compound friction coefficient, static weight distribution, and suspension roll stiffness.",
  },
  {
    id: "traction-exit",
    name: "Turn 08: Corner Exit Acceleration",
    type: "Combined Longitudinal / Lateral",
    speed: "110 -> 220 km/h",
    ay: "1.8 g",
    ax: "1.4 g",
    governingConstraint: "Friction Circle Envelope (g-g Diagram Boundary)",
    formula: "(a_x / a_x,max)^2 + (a_y / a_y,max)^2 <= 1.0",
    description:
      "Simultaneous acceleration and corner unwinding. Longitudinal throttle application is strictly constrained by remaining grip on the ellipse after lateral demand.",
  },
];

const DEFAULT_CONDITION = SECTOR_CONDITIONS[0] as SectorCondition;

export function NumericalDecomposition() {
  const [activeConditionId, setActiveConditionId] = useState<string>("high-speed");
  const condition: SectorCondition =
    SECTOR_CONDITIONS.find((c) => c.id === activeConditionId) ?? DEFAULT_CONDITION;

  return (
    <div className="my-10 w-full overflow-hidden rounded-sm border border-border-subtle bg-surface-subtle/70 p-6 md:p-8">
      {/* Header telemetry HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <span className="font-technical text-xs uppercase tracking-widest text-accent">
            Vehicle Dynamics Model
          </span>
          <h3 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground">
            Numerical Lap & Friction Circle Decomposition
          </h3>
        </div>
        <div className="rounded-sm border border-border-subtle px-3 py-1 font-technical text-xs text-foreground-muted">
          MODEL: 2-DOF QUASI-STEADY STATE
        </div>
      </div>

      {/* Engineering note banner */}
      <div className="mt-4 space-y-2">
        <div className="rounded-sm border border-accent/30 bg-accent/5 px-4 py-2.5 font-technical text-xs text-foreground-muted">
          <span className="font-semibold text-accent mr-2">[DETERMINISTIC PHYSICS]</span>
          Solved lap by lap via numerical forward/backward integration of power, aero, and tyre grip
          differential equations — zero statistical or machine-learning approximations.
        </div>
        <div className="rounded-sm border border-border-subtle/80 bg-surface-subtle/40 px-4 py-2 font-technical text-[11px] text-foreground-faint">
          <span className="text-foreground-muted font-semibold mr-2">[ILLUSTRATIVE MODEL REGIMES]</span>
          The cornering regimes below represent illustrative numerical solver states demonstrating
          friction circle boundary limits — not track telemetry recordings.
        </div>
      </div>

      {/* Interactive condition selector tabs */}
      <div className="mt-6">
        <div className="mb-2 font-technical text-xs uppercase tracking-widest text-foreground-faint">
          Select Illustrative Regime (2-DOF Model Verification):
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {SECTOR_CONDITIONS.map((item) => {
            const isSelected = item.id === activeConditionId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveConditionId(item.id)}
                className={cn(
                  "flex flex-col justify-between rounded-sm border p-3 text-left transition-all duration-150 outline-none",
                  isSelected
                    ? "border-accent bg-surface shadow-[0_0_12px_rgba(52,226,122,0.1)]"
                    : "border-border-subtle bg-surface/40 hover:border-border-strong hover:bg-surface/80",
                  "focus-visible:ring-1 focus-visible:ring-accent"
                )}
              >
                <div className="font-technical text-xs uppercase text-foreground">{item.name}</div>
                <div className="mt-2 flex items-baseline justify-between font-technical">
                  <span className="text-[11px] text-foreground-faint">{item.type}</span>
                  <span className="text-xs font-semibold text-accent">{item.ay}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main visualization split: G-G Diagram + Physics Formula Breakdown */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Interactive G-G Diagram (SVG) */}
        <div className="rounded-sm border border-border-subtle bg-surface/90 p-5 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="font-technical text-xs uppercase tracking-widest text-foreground-faint">
              G-G Friction Circle Envelope
            </span>
            <span className="font-technical text-xs text-accent">Boundary Limit: 1.0</span>
          </div>

          <div className="relative mt-4 flex items-center justify-center">
            <svg
              viewBox="-6 -6 12 12"
              className="h-64 w-64 select-none"
              aria-label="Friction circle g-g diagram"
            >
              {/* Grid circles (1g, 2g, 3g, 4g, 5g) */}
              {[1, 2, 3, 4, 5].map((g) => (
                <circle
                  key={g}
                  cx="0"
                  cy="0"
                  r={g}
                  fill="none"
                  stroke="#26282b"
                  strokeWidth="0.06"
                  strokeDasharray={g === 5 ? "none" : "0.2 0.2"}
                />
              ))}

              {/* Major Axes */}
              <line x1="-5.5" y1="0" x2="5.5" y2="0" stroke="#3b3f46" strokeWidth="0.08" />
              <line x1="0" y1="-5.5" x2="0" y2="5.5" stroke="#3b3f46" strokeWidth="0.08" />

              {/* Axis labels */}
              <text x="4.8" y="-0.3" fill="#6b7280" fontSize="0.4" fontFamily="monospace" textAnchor="end">
                +ay (lat)
              </text>
              <text x="-4.8" y="-0.3" fill="#6b7280" fontSize="0.4" fontFamily="monospace" textAnchor="start">
                -ay
              </text>
              <text x="0.3" y="-4.8" fill="#6b7280" fontSize="0.4" fontFamily="monospace">
                +ax (accel)
              </text>
              <text x="0.3" y="4.8" fill="#6b7280" fontSize="0.4" fontFamily="monospace">
                -ax (brake)
              </text>

              {/* Operating Point marker based on active condition */}
              {(() => {
                const ayVal = parseFloat(condition.ay.replace(" g", ""));
                const axVal = parseFloat(condition.ax.replace(" g", ""));
                // In SVG coords: Y is downward, so positive accel is negative Y, braking is positive Y
                const svgX = ayVal;
                const svgY = -axVal;

                return (
                  <g>
                    {/* Pulsing ring */}
                    <circle
                      cx={svgX}
                      cy={svgY}
                      r="0.5"
                      fill="none"
                      stroke="#34e27a"
                      strokeWidth="0.08"
                      className="animate-ping opacity-75"
                    />
                    {/* Center point */}
                    <circle cx={svgX} cy={svgY} r="0.25" fill="#34e27a" />
                    {/* Vector line from origin */}
                    <line
                      x1="0"
                      y1="0"
                      x2={svgX}
                      y2={svgY}
                      stroke="#34e27a"
                      strokeWidth="0.08"
                      strokeDasharray="0.3 0.15"
                    />
                  </g>
                );
              })()}
            </svg>
          </div>

          <div className="mt-2 flex justify-between border-t border-border-subtle/80 pt-3 font-technical text-xs">
            <div>
              <span className="text-foreground-faint">LATERAL ACCEL:</span>{" "}
              <span className="text-foreground font-semibold">{condition.ay}</span>
            </div>
            <div>
              <span className="text-foreground-faint">LONG ACCEL:</span>{" "}
              <span className="text-foreground font-semibold">{condition.ax}</span>
            </div>
          </div>
        </div>

        {/* Right: Physics Formula & Governing Constraint Breakdown */}
        <div className="flex flex-col justify-between rounded-sm border border-border-subtle bg-surface/90 p-5 lg:col-span-7">
          <div>
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <span className="font-technical text-xs uppercase tracking-widest text-accent">
                Analytical Solver State
              </span>
              <span className="font-technical text-xs text-foreground-faint">
                SPEED: {condition.speed}
              </span>
            </div>

            <h4 className="mt-4 font-display text-xl uppercase tracking-tight text-foreground">
              {condition.name}
            </h4>
            <div className="mt-1 font-technical text-xs text-accent">
              Governing Constraint: {condition.governingConstraint}
            </div>

            <div className="mt-4 rounded-sm border border-border-subtle bg-surface-subtle p-3.5">
              <div className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
                Governing Formulation
              </div>
              <div className="mt-1.5 overflow-x-auto font-technical text-xs text-accent">
                <code>{condition.formula}</code>
              </div>
            </div>

            <p className="mt-4 font-body text-sm text-foreground-muted">
              {condition.description}
            </p>
          </div>

          {/* Sequential pipeline stages for this calculation */}
          <div className="mt-6 border-t border-border-subtle/80 pt-4">
            <span className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
              Solver Execution Sequence
            </span>
            <div className="mt-2 flex flex-wrap gap-2 font-technical text-[11px]">
              {["Track Curvature", "Vehicle Mass & Inertia", "Aero ClA / CdA", "Friction Circle Solver", "Sector Decomposition"].map((step, idx) => (
                <span
                  key={step}
                  className="rounded-sm border border-border-subtle bg-surface px-2.5 py-1 text-foreground-muted"
                >
                  <span className="text-foreground-faint mr-1">{idx + 1}.</span> {step}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
