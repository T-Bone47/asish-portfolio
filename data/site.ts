import type { SiteIdentity } from "@/types/site";

/**
 * Spec §4 (brand positioning) + §42 (contact page) + §54 (SEO).
 * LinkedIn and location are now given directly (Phase 2 master build
 * prompt §25) and used verbatim. GitHub is still not stated anywhere
 * — left blank rather than guessed; do not reuse the Arif Portfolio
 * Showcase reference URLs from the original spec §6, those aren't
 * Asish's.
 */
export const siteIdentity: SiteIdentity = {
  name: "ASISH OLIVER M",
  primaryRole: ["MOTORSPORT SOFTWARE ENGINEER", "AI / ML ENGINEER"],
  supportingStatement:
    "Building software, simulation, telemetry and intelligent systems for engineering problems.",
  location: "Trichy, Tamil Nadu, India",
  social: {
    email: "dreamteamoliver@gmail.com",
    github: "https://github.com/T-Bone47",
    linkedin: "https://www.linkedin.com/in/asish-oliver-56b454324",
  },
};

export const seo = {
  title: "Asish Oliver M — Motorsport Software Engineer · AI/ML Engineer",
  description:
    "Motorsport software and AI/ML engineer building telemetry, simulation, race intelligence and intelligent engineering systems.",
};
