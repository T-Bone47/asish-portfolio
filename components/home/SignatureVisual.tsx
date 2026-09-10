import { Container } from "@/components/ui/Container";

/**
 * Spec §10 — "the most important visual component." Original abstract
 * geometry (not a real circuit, not a stock track image), combined
 * with grid/sector-marker/trace styling to read as an abstracted
 * race-engineering analysis environment.
 *
 * Deliberately has NO fabricated numeric readouts (no fake lap time,
 * delta, speed, tyre, fuel values like the spec's own conceptual
 * sketch shows) — spec §37 rules out fake telemetry numbers, and the
 * sketch is explicitly "conceptual." The telemetry *language* comes
 * from structure and line work: a sector-marked curve, a secondary
 * trace shape, a coordinate grid, corner marks. "MODE — ANALYSIS" /
 * "STATUS — ACTIVE" are atmospheric state labels (same idea as the
 * nav's "SYSTEM STATUS: ONLINE"), not measured values.
 *
 * No top border — this continues directly from Hero's border-x/border-t
 * as one instrument panel, not two blocks split by a divider (verified
 * together via screenshot). The "Systems Overview" caption that used to
 * sit here was dropped once the two were joined — Hero's own eyebrow
 * now opens the whole panel, and the SVG's aria-label still carries
 * the accessible description.
 */
export function SignatureVisual() {
  return (
    <div className="border-x border-b border-border-subtle py-12">
      <Container as="div">
        <svg
          viewBox="0 0 1200 420"
          className="w-full"
          role="img"
          aria-label="Abstract engineering visualization: a sector-marked curve with a secondary telemetry-style trace, on a technical grid"
        >
          <defs>
            <pattern id="sig-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border-subtle)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect width="1200" height="420" fill="url(#sig-grid)" />

          {/* corner marks */}
          <g stroke="var(--color-border-strong)" strokeWidth="1">
            <path d="M 20,20 L 20,44 M 20,20 L 44,20" fill="none" />
            <path d="M 1180,20 L 1180,44 M 1180,20 L 1156,20" fill="none" />
            <path d="M 20,400 L 20,376 M 20,400 L 44,400" fill="none" />
            <path d="M 1180,400 L 1180,376 M 1180,400 L 1156,400" fill="none" />
          </g>

          {/* main abstract curve — original geometry, not a real circuit */}
          <path
            d="M 60,300 C 160,300 200,180 320,170 C 400,163 420,240 500,250 C 580,260 600,180 680,150 C 760,120 820,140 860,200 C 900,260 980,270 1060,220 C 1110,190 1130,160 1140,120"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* sector markers — sequential structural labels, not timed splits */}
          <g className="hidden md:inline" fontFamily="var(--font-technical)" fontSize="13" fill="var(--color-foreground-faint)">
            <circle cx="320" cy="170" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <text x="320" y="150" textAnchor="middle" letterSpacing="1">01</text>

            <circle cx="680" cy="150" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <text x="680" y="130" textAnchor="middle" letterSpacing="1">02</text>

            <circle cx="1060" cy="220" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <text x="1060" y="250" textAnchor="middle" letterSpacing="1">03</text>
          </g>
          {/* Markers stay visible on mobile even with labels hidden below —
              same circles, unlabeled, rendered unconditionally: */}
          <g className="md:hidden">
            <circle cx="320" cy="170" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <circle cx="680" cy="150" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <circle cx="1060" cy="220" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
          </g>

          {/* secondary abstract trace */}
          <g transform="translate(60,330)">
            <text
              x="0"
              y="-8"
              className="hidden md:inline"
              fontFamily="var(--font-technical)"
              fontSize="11"
              letterSpacing="2"
              fill="var(--color-foreground-faint)"
            >
              TRACE
            </text>
            <path
              d="M 0,30 L 40,30 L 55,4 L 90,4 L 100,30 L 160,30 L 175,50 L 230,50 L 245,10 L 320,10"
              fill="none"
              stroke="var(--color-foreground-faint)"
              strokeWidth="1.5"
            />
          </g>

          {/* atmospheric state labels — same idea as the nav's system-status
              indicator, not measured project data */}
          <g
            className="hidden md:inline"
            fontFamily="var(--font-technical)"
            fontSize="11"
            letterSpacing="1.5"
            fill="var(--color-foreground-faint)"
            textAnchor="end"
          >
            <text x="1180" y="335">MODE — ANALYSIS</text>
            <text x="1180" y="352">STATUS — ACTIVE</text>
          </g>
        </svg>
      </Container>
    </div>
  );
}
