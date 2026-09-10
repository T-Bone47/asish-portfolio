import type { SkillGroup } from "@/types/skill";

/** Spec §40 — grouped technical arsenal, not a giant logo wall. */
export const skillGroups: SkillGroup[] = [
  {
    id: "programming",
    title: "Programming",
    items: ["Python", "C++", "C#", "Java", "MATLAB", "SQL", "TypeScript", "JavaScript"],
  },
  {
    id: "ai-ml",
    title: "AI / ML",
    items: [
      "XGBoost",
      "Scikit-learn",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Vosk",
      "LLM Integration",
      "Regression",
      "Feature Engineering",
    ],
  },
  {
    id: "motorsport-data",
    title: "Motorsport Data",
    items: ["FastF1", "OpenF1", "Jolpica", "F1 SignalR", "UDP Telemetry", "MoTeC i2 Pro"],
  },
  {
    id: "simulation",
    title: "Simulation",
    items: ["OptimumLap", "OpenLAP / OpenLapSim", "ChassisSim", "AVL VSM", "Unity"],
  },
  {
    id: "software",
    title: "Software",
    items: [
      "FastAPI",
      "PostgreSQL",
      "TimescaleDB",
      "SQLAlchemy",
      "Alembic",
      "WebSockets",
      "Docker",
      "Pytest",
      "Git/GitHub",
    ],
  },
  {
    id: "engineering-methods",
    title: "Engineering Methods",
    items: [
      "Lap Analysis",
      "Sector Analysis",
      "Pace Comparison",
      "Tyre Degradation",
      "Race Simulation",
      "Pit Windows",
      "Undercut / Overcut",
      "Fuel Modelling",
      "Data Validation",
      "Deterministic Replay",
      "Backtesting",
    ],
  },
];
