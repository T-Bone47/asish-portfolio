import type { Project } from "@/types/project";

/**
 * PROJECT DATA — sourced entirely from the spec document (§24, §29–36).
 * No metric, link, date, or status below is invented — see spec §60
 * ("Content Truth Policy") and §74 ("do not invent project metrics /
 * achievements / employers"). Every gap is a `// TODO(owner)` comment,
 * never a placeholder string, so nothing fabricated can accidentally
 * render on the live site.
 *
 * `problem`, `engineeringDecisions`, and `media` are left undefined
 * across every project: the spec gives positioning, architecture, and
 * "what to emphasize" guidance, but no problem-statement prose,
 * specific trade-off writeups, or actual screenshots/diagrams to draw
 * from. Per spec §28, not every subsection needs equal (or any) length
 * — the case-study template already expects some sections to be thin
 * or absent depending on real project depth.
 *
 * Outstanding before this file is launch-ready:
 *   1. Repository / demo / documentation URLs for all six projects.
 *   2. `technologies` for F1 Lap-Time Simulator and EA FC Intelligence
 *      — no explicit tech list was given for these two (RaceMind-AI's
 *      is now filled in, via the master build prompt).
 *   3. `year` for EA FC Intelligence and VyaparPulse — the other four
 *      projects' years come from the §38 engineering-journey timeline,
 *      but that timeline doesn't mention these two.
 *   4. Status for EA FC Intelligence and VyaparPulse — set to "active"
 *      as the most conservative default (not claiming completion per
 *      §61); please confirm or correct.
 *   5. Real media (screenshots, diagrams, charts) — none exist yet.
 */

export const projects: Project[] = [
  {
    id: "live-f1-intelligence",
    slug: "live-f1-intelligence",
    title: "Live F1 Intelligence",
    shortTitle: "Live F1 Intelligence",
    category: "motorsport",
    // Sourced from §39 "Currently Building": "Extending analysis and AI capabilities."
    status: "active",
    year: "2026", // from §38 engineering-journey timeline
    featured: true, // Tier 1 — spec §66

    tagline: "Real-time F1 telemetry & race intelligence",
    description:
      "A provider-independent pipeline that ingests F1 telemetry from OpenF1, FastF1, Jolpica and F1 SignalR, validates and normalises it into a canonical event model, then derives timing, pace, tyre degradation, battle detection and strategy intelligence in real time.",

    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "TimescaleDB",
      "WebSockets",
      "Docker",
      "Pandas",
      "NumPy",
      "FastF1",
      "OpenF1",
      "Jolpica",
      "F1 SignalR",
    ],

    metrics: [
      { value: "1,067,193", label: "Canonical events" },
      { value: "0", label: "Malformed records" },
      { value: "~2,650", label: "Events / sec" },
      { value: "~0.10 ms", label: "P50 / event" },
      { value: "99 MB", label: "Peak memory" },
    ],

    architecture: {
      summary:
        "Four providers feed ingestion and normalisation into one canonical event model. Every event carries provenance and the run is deterministically replayable, which is what the analysis modules and the API/WebSocket layer downstream are validated against.",
      // Expanded per the master build prompt's §2G-E — the earlier
      // version stopped at the canonical model and folded provenance/
      // replay into prose instead of the diagram. Validation is still
      // real (see the `validation` field below) but isn't its own box
      // here anymore, to match the given 9-stage sequence exactly.
      pipeline: [
        { label: "Data Providers", children: ["OpenF1", "FastF1", "Jolpica", "F1 SignalR"] },
        { label: "Ingestion" },
        { label: "Normalisation" },
        { label: "Canonical Events" },
        { label: "Provenance" },
        { label: "Replay" },
        {
          label: "Analysis",
          children: [
            "Timing",
            "Sector Analysis",
            "Pace",
            "Tyre Degradation",
            "Battle Detection",
            "Race Control",
            "Strategy",
            "Qualifying Intelligence",
            "Practice Intelligence",
          ],
        },
        { label: "API / WebSocket" },
        { label: "Decision Support" },
      ],
      stack: ["Python", "FastAPI", "PostgreSQL", "TimescaleDB", "WebSockets", "Docker"],
    },

    // Given directly (master build prompt §2/§4): validation
    // methodology, not just the mechanism (architecture summary above
    // covers what provenance/replay are; this covers how they're used).
    validation:
      "The 1,067,193-event / 0-malformed-records figures above come from deterministic replay against real captured session data, not a one-off measurement — the same replay can be re-run and checked again.",

    currentState: "Active — extending analysis and AI capabilities.",

    // TODO(owner): repository / demo / documentation links
    links: {},
  },

  {
    id: "f1-lap-time-simulator",
    slug: "f1-lap-time-simulator",
    title: "F1 Lap-Time Simulator",
    shortTitle: "Lap-Time Simulator",
    category: "motorsport",
    // Sourced from §39 "Currently Building": "Finalising the engineering implementation."
    status: "near-completion",
    year: "2025", // from §38 engineering-journey timeline ("Lap Simulation")
    featured: true, // Tier 1 — spec §66

    tagline: "Vehicle performance & numerical modelling",
    description:
      "A numerical vehicle-performance model — tyre grip, aerodynamics, power and the friction circle solved lap by lap to produce corner speeds and a sector-by-sector performance decomposition.",

    // IMPORTANT (spec §32): this is NOT a machine-learning project.
    // Its primary identity is numerical vehicle/lap-performance
    // engineering — keep any future copy consistent with that.

    // TODO(owner): no explicit technology list was given for this
    // project in the spec (unlike Live F1 Intelligence / F1 Race
    // Manager / VyaparPulse) — left empty rather than guessed.
    technologies: [],

    architecture: {
      summary:
        "A sequential numerical pipeline: track and vehicle models feed tyre grip and aerodynamic effects into a power-limited friction-circle solver, producing corner speeds and a full lap-performance decomposition.",
      pipeline: [
        { label: "Track" },
        { label: "Vehicle Model" },
        { label: "Tyre Grip" },
        { label: "Aerodynamics" },
        { label: "Power" },
        { label: "Friction Circle" },
        { label: "Corner Speed" },
        { label: "Lap Solver" },
        { label: "Performance Decomposition" },
      ],
    },

    currentState: "Finalising the engineering implementation.",

    // TODO(owner): repository / demo / documentation links
    links: {},
  },

  {
    id: "racemind-ai",
    slug: "racemind-ai",
    title: "RaceMind-AI",
    shortTitle: "RaceMind-AI",
    category: "motorsport",
    // Sourced from §39 "Currently Building": "Expanding AI-assisted race engineering."
    status: "active",
    year: "2026", // from §38 engineering-journey timeline
    featured: true, // Tier 1 — spec §66

    tagline: "AI race engineer for sim racing",
    description:
      "A game-agnostic telemetry abstraction turns raw UDP telemetry into session state — strategy, tyre, fuel, weather, traffic and coaching models — that a contextual AI race engineer can be queried against during a session.",

    // Now given directly (Phase 2 master build prompt §4) — previously
    // left empty since no explicit list existed yet.
    technologies: ["FastAPI", "SQLAlchemy", "PostgreSQL", "WebSockets", "JWT", "Pytest", "Docker", "Claude API"],

    architecture: {
      summary:
        "UDP telemetry is abstracted into a game-agnostic session state, which several models (strategy, tyre, fuel, weather, traffic, coaching) feed into an AI engineer capable of contextual race Q&A.",
      pipeline: [
        { label: "UDP Telemetry" },
        { label: "Game-Agnostic Telemetry Abstraction" },
        {
          label: "Session State",
          children: ["Strategy Engine", "Tyre Model", "Fuel Model", "Weather", "Traffic", "Driver Coaching"],
        },
        { label: "AI Engineer" },
        { label: "Contextual Race Q&A" },
      ],
    },

    // Spec §33 status note, transcribed precisely — do not upgrade
    // "backend implemented/tested" into "product complete."
    currentState:
      "Backend implemented and tested. The frontend/desktop application is in progress and should not be represented as complete until it actually is. Codemasters F1 telemetry is implemented; support for other simulation titles should be confirmed against actual current status before publishing.",

    // TODO(owner): repository / demo / documentation links
    links: {},
  },

  {
    id: "f1-race-manager",
    slug: "f1-race-manager",
    title: "F1 Race Manager",
    shortTitle: "F1 Race Manager",
    category: "simulation-game",
    status: "in-development", // stated explicitly — spec §34
    year: "2026", // from §38 engineering-journey timeline
    featured: false, // Tier 2 — spec §66

    tagline: "F1 team management & strategy simulation game",
    description:
      "An F1 team-management and strategy simulation game built in Unity — car development, staff and finance sit alongside race-weekend strategy calls across tyres, weather, safety cars and reliability.",

    // IMPORTANT (spec §25, §34, §74): this is a GAME. Never classify
    // it as the vehicle-performance simulator — that is the separate
    // F1 Lap-Time Simulator project above.

    technologies: ["Unity", "C#", "Python"],

    architecture: {
      summary:
        "A team-management layer (drivers, staff, finance, facilities, car development) drives into race-weekend systems covering strategy, tyres, weather, safety cars and reliability.",
      pipeline: [
        {
          label: "Team Management",
          children: ["Drivers", "Staff", "Finance", "Facilities", "Car Development"],
        },
        {
          label: "Race Weekend",
          children: ["Strategy", "Tyres", "Weather", "Safety Car / VSC", "Reliability", "Traffic"],
        },
      ],
      stack: ["Unity", "C#", "Python"],
    },

    currentState: "In development — Unity team-management simulation.",

    // TODO(owner): repository / demo / documentation links
    links: {},
  },

  {
    id: "ea-fc-intelligence",
    slug: "ea-fc-intelligence",
    title: "EA FC Intelligence",
    shortTitle: "EA FC Intelligence",
    category: "ai-ml",
    // TODO(owner): no status was stated for this project anywhere in
    // the spec (and it's absent from the §39 "Currently Building"
    // list). "active" is used as the most conservative non-claim —
    // please confirm the real status.
    status: "active",
    // TODO(owner): no year was given for this project — absent from
    // the §38 engineering-journey timeline.
    year: "TBD",
    featured: false, // Tier 2 — spec §66

    tagline: "Player data & intelligence system",
    description:
      "A data/AI pipeline that cleans player data, engineers features, builds a player representation, and scores it into intelligence and recommendations — evidence that the same systems thinking behind the motorsport work applies outside it.",

    // TODO(owner): no explicit technology list was given for this
    // project — left empty rather than guessed.
    technologies: [],

    architecture: {
      summary: "A standard data-to-intelligence pipeline: cleaning and feature engineering build a player representation that is scored into recommendations.",
      pipeline: [
        { label: "Data" },
        { label: "Cleaning" },
        { label: "Feature Engineering" },
        { label: "Player Representation" },
        { label: "Scoring / Intelligence" },
        { label: "Recommendation" },
      ],
    },

    // TODO(owner): repository / demo / documentation links
    links: {},
  },

  {
    id: "vyaparpulse",
    slug: "vyaparpulse",
    title: "VyaparPulse",
    shortTitle: "VyaparPulse",
    category: "ai-ml",
    // TODO(owner): no status was stated for this project anywhere in
    // the spec (and it's absent from the §39 "Currently Building"
    // list). "active" is used as the most conservative non-claim —
    // please confirm the real status.
    status: "active",
    // TODO(owner): no year was given for this project — absent from
    // the §38 engineering-journey timeline.
    year: "TBD",
    featured: false, // Tier 2 — spec §66

    tagline: "AI-powered financial intelligence platform",
    description:
      "Spoken transaction entries are transcribed with Vosk and structured by an LLM into canonical transaction data, reconciled through a FastAPI ledger, then forecast with an XGBoost model into business insights. Originated at Smart India Hackathon — positioned here as an AI/ML systems showcase rather than a hackathon artifact.",

    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "TailwindCSS",
      "Framer Motion",
      "Capacitor",
      "Python",
      "FastAPI",
      "SQLite",
      "SQLAlchemy",
      "Vosk",
      "XGBoost",
      "Pandas",
    ],

    architecture: {
      summary:
        "Voice input is transcribed and LLM-extracted into canonical transaction data, served by a FastAPI backend that handles ledger and reconciliation, then forecast by an XGBoost model into business insights.",
      pipeline: [
        { label: "Voice Input" },
        { label: "Vosk Speech-to-Text" },
        { label: "LLM Extraction" },
        { label: "Canonical Transaction Data" },
        { label: "FastAPI Backend", children: ["Ledger", "Reconciliation"] },
        { label: "XGBoost ML Engine" },
        { label: "Revenue Forecast" },
        { label: "Business Insights" },
      ],
      stack: ["React", "TypeScript", "Vite", "TailwindCSS", "Python", "FastAPI", "SQLite", "Vosk", "XGBoost"],
    },

    // TODO(owner): repository / demo / documentation links
    links: {},
  },

  {
    id: "ignict",
    slug: "ignict",
    title: "IGNICT",
    shortTitle: "IGNICT",
    category: "intelligence-platform",
    status: "production-ready",
    year: "2026",
    featured: false,

    tagline: "Bidirectional applicant ↔ opportunity intelligence engine",
    description:
      "A bidirectional intelligence platform that matches candidates to opportunities and opportunities to candidates using semantic retrieval, deterministic ranking, hard eligibility filters, and evidence-backed explanations.",

    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "NLP",
      "Embeddings",
      "React",
      "TypeScript",
    ],

    metrics: [
      { value: "94.2", label: "Match score", note: "Decomposed into 8 inspectable signals" },
      { value: "7 / 8", label: "Strong signals", note: "Evidence-backed requirements" },
      { value: "1", label: "Critical gap", note: "Deterministic eligibility filter" },
      { value: "100%", label: "Deterministic ranking", note: "Zero opaque LLM scoring" },
    ],

    problem:
      "Most applicant systems reduce a profile to keywords. IGNICT treats the problem as an intelligence and ranking system: answering why a candidate is a good fit for an opportunity — and how strong the evidence is — rather than computing superficial string similarity.",

    architecture: {
      summary:
        "A multi-stage bidirectional intelligence pipeline. LLMs assist with structured extraction, normalisation, and explanations, while final scoring is computed by a versioned deterministic ranking engine with hard eligibility filters.",
      pipeline: [
        { label: "Profile / Resume & Opportunity Spec" },
        { label: "Structured Extraction", children: ["LLM-assisted"] },
        { label: "Normalization" },
        { label: "Embedding Generation" },
        { label: "Vector Retrieval", children: ["pgvector"] },
        { label: "Hard Eligibility Filters" },
        { label: "Deterministic Matching" },
        { label: "Component Scoring", children: ["8 Signals"] },
        { label: "Evidence Generation" },
        { label: "Ranked Match", children: ["Bidirectional"] },
      ],
      stack: [
        "Python",
        "FastAPI",
        "PostgreSQL",
        "pgvector",
        "Redis",
        "React",
        "TypeScript",
        "Vite",
      ],
    },

    algorithms:
      "Embedding-based semantic discovery with pgvector combined with deterministic component scoring across skill match, experience fit, education fit, project relevance, domain fit, preference fit, eligibility, and critical gaps.",

    validation:
      "Ranking benchmarks and hard-filter validation to ensure semantic similarity never bypasses non-negotiable eligibility constraints.",

    results:
      "Inspectable ranking breakdown replacing opaque match percentages with evidence quality, matched requirements, strong signals, and flagged gaps.",

    engineeringDecisions: [
      {
        title: "Deterministic Ranking Over LLM Scoring",
        rationale:
          "LLMs assist with extraction, normalization, and explanation, while the final ranking score is computed by a versioned deterministic system. This ensures rankings are inspectable, reproducible, and immune to model hallucination or drift.",
      },
      {
        title: "Hard Filters Enforced Before Ranking",
        rationale:
          "Hard eligibility constraints (e.g. work authorization, prerequisites) are strictly evaluated before semantic scoring. A semantically similar profile cannot be incorrectly ranked as eligible if hard constraints are violated.",
      },
      {
        title: "Bidirectional Symmetric Engine",
        rationale:
          "The same underlying matching pipeline powers both Candidate → Opportunity discovery and Opportunity → Candidate ranking, guaranteeing consistent evaluation logic in both directions.",
      },
    ],

    // TODO(owner): repository / demo / documentation links
    links: {},
  },
];

/** Convenience lookups mirroring the route structure in spec §11. */
export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const featuredProjects = (): Project[] => projects.filter((project) => project.featured);
