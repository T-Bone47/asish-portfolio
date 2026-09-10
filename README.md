# Asish Oliver M — Portfolio

Two source documents drive this repository:
- `Portfolio Architecture & Development Specification` (v1.0, 82 sections) — Phase 1.
- `Phase 2 Execution Prompt` — visual/UX build, motion architecture, WebGL, and hardening.

---

## Status Classification

### COMPLETED
- [x] **Scaffolding & Architecture**: Next.js 16 + React 19 + TypeScript + Tailwind CSS v4.
- [x] **Design Tokens**: Three-layer token architecture (`docs/design-tokens.md`, `app/globals.css`) with telemetry green accent (`#34e27a`), near-black background (`#0a0b0d`), and functional typography roles (Barlow Condensed display, Inter body, JetBrains Mono technical).
- [x] **Information Architecture**: Full section sequence on `/` per spec: SystemBoot → Hero → SignatureVisual → EngineeringStatement → SelectedSystems → EngineeringDomains → AiMlSection → Experience → CurrentlyBuilding → TechnicalArsenal → About → Contact.
- [x] **All Routes Implemented**:
  - `/` (Homepage)
  - `/work` (Project index with 6 systems, flagship weight)
  - `/work/live-f1-intelligence` (Flagship real-time telemetry pipeline case study)
  - `/work/f1-lap-time-simulator` (Numerical vehicle-performance engineering case study)
  - `/work/racemind-ai` (AI race engineer sim-racing platform case study)
  - `/work/f1-race-manager` (Game simulation case study)
  - `/work/ea-fc-intelligence` (AI/ML player intelligence case study)
  - `/work/vyaparpulse` (SIH AI financial platform case study)
  - `/experience` (Dedicated experience page)
  - `/about` (Dedicated about and philosophy page)
  - `/contact` (Verified contact details)
- [x] **Typecheck Verification**: `npm run typecheck` (`tsc --noEmit`) passes with zero errors under strict mode (`noUncheckedIndexedAccess`).
- [x] **Linter Verification**: `npm run lint` (`eslint .`) passes with zero warnings/errors on native ESLint 9 Flat Config.
- [x] **Build Verification**: `npm run build` (`next build`) passes with Turbopack, generating all 13 static SSG/prerendered routes cleanly.
- [x] **Browser QA Matrix**: Verified via automated headless Google Chrome across 5 mandatory viewports:
  - Desktop: `1440 × 900`
  - Laptop: `1280 × 800`
  - Tablet Landscape: `1024 × 768`
  - Tablet Portrait: `768 × 1024`
  - Mobile: `390 × 844` (including mobile navigation panel open/close state)
  - Result: **0 console errors across all routes and viewports**.

- [x] **Unified Motion Architecture (Phase 2G-B)**: Centralized GSAP + ScrollTrigger + Lenis runtime in `lib/motion/runtime.ts` driven strictly by a single synchronized GSAP ticker RAF, with clean lifecycle disposal and strict `prefers-reduced-motion` compliance.
- [x] **Living Signature Visual (Phase 2G-C)**: Responsive telemetry instrument panel with coordinate resolution, progressive spline drawing, sector node pulses, scanning radar line, and live mouse HUD (`LOC: XXXX / YYYY`).
- [x] **WebGL Abstract Enhancement (Phase 2G-D)**: Three.js abstract 3D coordinate spline with 50 telemetry data particles, mouse camera parallax, low draw calls (<2), capped DPR (1.5 max), visibility-based RAF pause (`IntersectionObserver`), and GPU disposal on unmount.
- [x] **Case-Study Engineering Visualizations (Phase 2G-E)**:
  - High-precision telemetry architecture pipeline (`components/work/ArchitecturePipeline.tsx`).
  - Interactive multi-provider event processing flow visualizer for `live-f1-intelligence` (`components/work/TelemetryFlowVisual.tsx`).
  - G-G friction circle envelope and analytical solver breakdown for `f1-lap-time-simulator` (`components/work/NumericalDecomposition.tsx`).
  - Real-time telemetry abstraction & contextual AI pit-wall interface for `racemind-ai` (`components/work/RaceMindSessionVisual.tsx`).
  - High-precision project index rows with active telemetry readout and left indicator pulse (`components/work/ProjectIndexRow.tsx`).
- [x] **Accessibility Hardening (Phase 2H-A)**:
  - Skip-to-content accessible link (`#main-content`) with keyboard focus ring.
  - Mobile menu drawer `Escape` key listener.
  - WCAG 2.1 AA compliant contrast ratios across all semantic tokens (telemetry green `#34e27a` at 11.2:1 against `#0a0b0d`).
- [x] **Regression & Content Integrity Automation (Phase 2H-C)**: `npm run test:integrity` verifying zero academic inflation, strictly verified education (VIT-AP University), exact 6 project records, and all required visualization components.

### ACTIVE / NEXT STEPS
- [ ] Final production verification and deployment configuration.

### NOT IMPLEMENTED
- Custom desktop-only coordinate crosshair cursor (desktop only, optional enhancement).
- Page transition visual dissolve.
- Real hardware UDP live feed demo (out of scope for static portfolio).

### NOT VERIFIED
- Live user interaction on physical iOS Safari devices (emulated mobile Chrome tested; physical Safari pending device availability).

### OWNER INPUT REQUIRED
- **GitHub URL**: Missing from source data (`data/site.ts`).
- **Project Repositories & Demo URLs**: Gaps in `data/projects.ts` links map for all six projects.
- **Technologies for F1 Lap-Time Simulator and EA FC Intelligence**: Left empty rather than fabricated.
- **Year & Status for EA FC Intelligence and VyaparPulse**: Left as `TBD` / `active` conservative placeholder rather than fabricated.
- **Real project media**: Screenshots and architecture schematics when ready.

---

## Running the Application

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # TypeScript strict check
npm run lint       # ESLint flat config
npm run build      # Next.js Turbopack production build
npm run start      # Run production server
```

## Browser QA Automation

To run the full automated Chrome browser inspection suite:
```bash
node scripts/browser-qa.mjs
```
Artifacts and screenshots are recorded in the brain artifacts directory (`qa_screenshots/`).

