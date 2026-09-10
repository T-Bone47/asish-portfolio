/** Spec §17 — capabilities organized around engineering problems, not
 *  a technology list (that's Technical Arsenal, data/skills.ts, §40).
 *  Groups and items are transcribed verbatim from the spec. */
export interface EngineeringDomain {
  id: string;
  title: string;
  items: string[];
}

export const engineeringDomains: EngineeringDomain[] = [
  {
    id: "motorsport-software",
    title: "Motorsport Software",
    items: ["Telemetry", "Race Strategy", "Timing Systems", "Data Pipelines", "Decision Support"],
  },
  {
    id: "simulation",
    title: "Simulation",
    items: ["Vehicle Modelling", "Numerical Solvers", "Lap Simulation", "Performance Analysis"],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    items: ["Feature Engineering", "Forecasting", "Recommendation Systems", "Intelligent Systems"],
  },
  {
    id: "systems",
    title: "Systems",
    items: ["Python", "FastAPI", "PostgreSQL", "WebSockets", "Docker", "APIs"],
  },
  {
    id: "application-engineering",
    title: "Application Engineering",
    items: ["React", "TypeScript", "Next.js", "Unity", "C#"],
  },
];
