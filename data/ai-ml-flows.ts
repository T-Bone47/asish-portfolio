/** Spec §18 — three concrete applications, transcribed verbatim, to
 *  make the point that "AI/ML is one of the engineering tools used to
 *  solve different classes of problems," not the headline itself. */
export interface AiMlFlow {
  id: string;
  label: string;
  steps: string[];
}

export const aiMlFlows: AiMlFlow[] = [
  { id: "motorsport", label: "Motorsport", steps: ["Telemetry", "State", "Strategy", "Decision"] },
  { id: "ea-fc", label: "EA FC", steps: ["Data", "Features", "Player Intelligence", "Recommendation"] },
  {
    id: "vyaparpulse",
    label: "VyaparPulse",
    steps: ["Voice", "Speech", "Transaction Intelligence", "Forecast"],
  },
];
