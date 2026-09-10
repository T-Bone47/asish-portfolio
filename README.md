# Asish Oliver M — Portfolio

Two source documents drive this repo:
- `Portfolio Architecture & Development Specification` (v1.0, 82 sections) — Phase 1.
- `Phase 2 Execution Prompt` — visual/UX build, tracked below by its own
  sub-phase labels (2A–2H).

## Phase 1 — foundation (done)

Next.js 16 + TypeScript 6 scaffold, three-layer design tokens, typed
data models, verified project/experience/education/skills data. Full
detail in git history (`git log`) and `docs/design-tokens.md`.

## Phase 2 progress

- [x] **2A — Foundation visual system.** Nav, footer, buttons, badges,
      technical labels, container, responsive shell.
- [x] **2C — Project index ("Selected Systems").** `/work` — all six
      projects, flagship rows with more visual weight.
- [x] **2D/2E — Case-study page system.** `/work/[slug]` — one reusable
      template covering all six projects; sections render only where
      real content exists.
- [x] **2B — System Boot, Hero, Signature Engineering Visual** (SVG
      version — WebGL enhancement layer still not attempted, see
      below). Built and visually verified in a real Chromium browser
      (via Playwright) before being ported to React — caught 3 real
      bugs this way that reading the code wouldn't have. Full detail
      in the "feat: implement telemetry hero" commit.
- [x] **2F — Engineering Domains, AI/ML section, Experience, Currently
      Building, Technical Arsenal, About, Contact.** Completes the
      homepage (spec §7's full section order) and adds the dedicated
      `/experience`, `/about`, `/contact` pages the nav already linked
      to. New data transcribed verbatim from the spec, not invented:
      `data/engineering-domains.ts`, `data/ai-ml-flows.ts`. Verified
      the highest-layout-risk new patterns (the responsive domains
      grid, experience row wrapping) against real Chromium screenshots
      at desktop/tablet/mobile — lighter-touch than 2B's pass since
      these are plain grid/flexbox layouts, not bespoke composition.
- [ ] **WebGL enhancement layer** (spec §11). Not attempted — no way
      to test WebGL/Three.js rendering at all in this sandbox (no
      network to load a renderer, nothing to screenshot against). The
      SVG signature visual isn't a placeholder for this — spec §11
      requires a non-WebGL fallback regardless, so this already
      satisfies that; WebGL would be a later enhancement layered on
      top, built somewhere it can actually be tested.
- [ ] **2G — Motion system** (GSAP/Lenis/ScrollTrigger, cursor, page
      transitions). Not started.
- [ ] **2H — Hardening** (real test suite, accessibility/perf audits,
      an actual build). Can't be done in this environment at all — see
      below.

The homepage (`app/page.tsx`) is now fully assembled per spec §7's
order. `/work`, `/work/[slug]`, `/experience`, `/about`, `/contact` all
exist and are reachable from the nav.

## Why WebGL and motion aren't attempted here

Everything shipped so far is either verifiable by hand (nav, buttons,
data-driven lists) or was actually screenshotted in a real browser
before being trusted (the boot sequence, the signature visual, the new
grid layouts). WebGL and a full GSAP/ScrollTrigger motion system are a
different category: they need a real dev server and a way to interact
with the page over time, not just a static screenshot. That's a
genuine capability gap in this sandbox, not a scope decision — worth
doing in an environment that actually has it (Claude Code, or your own
`npm run dev`).

## Verification note

No network here, so nothing has run against real Next.js/React types
or `next/font`'s actual webfonts — `npm install && npm run build` is
still the first real test. What *has* been verified for real:

- A real Chromium binary (via Playwright, already present in this
  sandbox) rendered the boot sequence, hero, and signature visual as a
  static HTML/CSS/SVG prototype, screenshotted at multiple timepoints
  and viewports, actually reviewed — not assumed correct from reading
  the source. Caught and fixed: a `:nth-of-type` selector bug that
  silently reordered the boot sequence, a hardcoded desktop padding
  value that broke mobile layout, and SVG text that shrank to
  illegible size on mobile instead of adapting. The reduced-motion
  path was tested too, including combined with Phase 1's existing
  global reduced-motion rule (not assumed compatible).
- The Tailwind `hidden`/`md:inline` utility approach on SVG elements
  was checked by hand-writing the equivalent CSS Tailwind v4 would
  generate and testing that exact mechanism, since Tailwind itself
  isn't installed here.
- Next.js 16 requires `params` to be awaited as a `Promise` on every
  page/layout/`generateMetadata` — verified via search rather than
  assumed, since it postdates most models' training data (this one
  included). `/work/[slug]/page.tsx` uses the correct async form.
- Every `@/` import across the whole repo was cross-checked against a
  real export in its target file (not just that the file exists).
- A nested `<footer>`-in-`<footer>` semantic-HTML bug and a CSS
  variable collision between `next/font` and the token system were
  both caught by hand review before committing.

## Running it

```bash
npm install
npm run dev       # http://localhost:3000
npm run typecheck
npm run lint
npm run build
```

## What's still needed from the owner

Reconciled against the current source, not copied from Phase 1 (a few
of these have since been filled in — LinkedIn and location came in via
the master build prompt, RaceMind-AI's tech stack too):

- GitHub URL — still nowhere in any source document. LinkedIn is now
  live (`data/site.ts`); GitHub is the one social link still missing.
- Repo/demo/documentation links for all six projects.
- `technologies` for F1 Lap-Time Simulator and EA FC Intelligence
  (RaceMind-AI's is now filled in; these two are still empty).
- `year` + status for EA FC Intelligence/VyaparPulse.
- Real media, and deeper case-study prose beyond Live F1
  Intelligence's measured metrics.

See `data/projects.ts`'s header comment for the full list with reasons.

## Repository structure (current)

```
app/
  layout.tsx, page.tsx, error.tsx, not-found.tsx, globals.css
  work/page.tsx, work/[slug]/page.tsx
  experience/page.tsx, about/page.tsx, contact/page.tsx
components/
  ui/        Button, Badge, TechnicalLabel, Container, FlowSteps
  layout/    Header, Footer
  work/      ProjectIndex, ProjectIndexRow, ArchitecturePipeline,
             MetricGrid, CaseStudySection
  home/      SystemBoot, Hero, SignatureVisual, EngineeringStatement,
             SelectedSystemsPreview, EngineeringDomains, AiMlSection,
             ExperienceTimeline, CurrentlyBuilding, TechnicalArsenal,
             AboutContent, AboutPreview, ContactSection
lib/         utils.ts (cn helper)
types/       Project, Experience, Education, Skill, Site
data/        site.ts, navigation.ts, projects.ts, experience.ts,
             education.ts, skills.ts, engineering-domains.ts,
             ai-ml-flows.ts
docs/        design-tokens.md
```

`lib/motion/`, `public/`, and `tests/` don't exist yet — 2G and 2H.
