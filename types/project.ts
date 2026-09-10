/**
 * Project data model — spec §29 (schema given verbatim), extended with
 * the supporting shapes the spec references but doesn't fully define
 * (Metric, ArchitectureSection, Decision, ProjectLinks, ProjectMedia).
 * Kept intentionally simple per §73 ("prefer the simpler architecture").
 */

export type ProjectStatus =
  | "completed"
  | "active"
  | "near-completion"
  | "in-development"
  | "experimental";

export type ProjectCategory =
  | "motorsport"
  | "ai-ml"
  | "simulation-game";

/** A single verified, measured value — spec §30. Never populate this
 *  with an estimated or invented number; omit the metric instead. */
export interface Metric {
  value: string;
  label: string;
  /** Optional short context, e.g. "measured on the owner's dataset" */
  note?: string;
}

/** One stage of a project's system/data pipeline, for the ASCII-style
 *  flow diagrams the spec sketches throughout (§31–36). `children`
 *  allows a stage to fan out (e.g. CANONICAL EVENT MODEL → its
 *  sub-systems in §31). */
export interface PipelineStage {
  label: string;
  children?: string[];
}

export interface ArchitectureSection {
  summary: string;
  pipeline?: PipelineStage[];
  stack?: string[];
}

/** One engineering trade-off worth calling out explicitly — spec's
 *  "Engineering Decisions" case-study section (§28, §63 "WHY?"). */
export interface Decision {
  title: string;
  rationale: string;
}

export interface ProjectLinks {
  repository?: string;
  demo?: string;
  documentation?: string;
}

export type ProjectMediaKind =
  | "screenshot"
  | "diagram"
  | "chart"
  | "telemetry-visual"
  | "simulation-output"
  | "video"
  | "gif"
  | "code-excerpt";

export interface ProjectMediaItem {
  kind: ProjectMediaKind;
  src: string;
  alt: string;
  caption?: string;
  /** True for generated/abstract visual explanations rather than an
   *  actual product screenshot — spec §47 requires this distinction
   *  to stay visible to the reader. */
  isIllustrative?: boolean;
}

export interface ProjectMedia {
  items: ProjectMediaItem[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  status: ProjectStatus;
  year: string;
  featured: boolean;

  tagline: string;
  description: string;

  technologies: string[];

  metrics?: Metric[];

  problem?: string;
  architecture?: ArchitectureSection;
  implementation?: string;
  algorithms?: string;
  validation?: string;
  results?: string;
  engineeringDecisions?: Decision[];
  limitations?: string;
  currentState?: string;

  links: ProjectLinks;
  media?: ProjectMedia;
}
