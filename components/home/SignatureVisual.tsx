"use client";

import { useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useGsapContext } from "@/lib/motion/useGsapContext";
import { isReducedMotion, gsap } from "@/lib/motion/runtime";

/**
 * Spec §10 & Phase 2G-C — Living Engineering Signature Visual.
 *
 * Base layer: Pure SVG/DOM instrument panel.
 * Transforms the static engineering trace into an active, living telemetry
 * visualization:
 * - Progressive spline draw on entry
 * - Traveling telemetry probe with pulse ring
 * - Sequential sector activation (01, 02, 03)
 * - Faint scanning radar line
 * - Real-time coordinate inspection HUD (abstract coordinate ticks, no fake telemetry values)
 * - Full reduced-motion fallback to pristine static SVG
 */
export function SignatureVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mainPathRef = useRef<SVGPathElement>(null);
  const secondaryPathRef = useRef<SVGPathElement>(null);
  const probeRef = useRef<SVGGElement>(null);
  const scanLineRef = useRef<SVGLineElement>(null);
  const coordTextRef = useRef<SVGTextElement>(null);
  const sector1Ref = useRef<SVGGElement>(null);
  const sector2Ref = useRef<SVGGElement>(null);
  const sector3Ref = useRef<SVGGElement>(null);

  const [activeCoords, setActiveCoords] = useState("LOC: 0540.00 / 0190.00");

  useGsapContext(() => {
    if (isReducedMotion()) return;

    const mainPath = mainPathRef.current;
    const secondaryPath = secondaryPathRef.current;
    const probe = probeRef.current;
    const scanLine = scanLineRef.current;

    if (!mainPath || !secondaryPath) return;

    const pathLength = mainPath.getTotalLength();
    const secondaryLength = secondaryPath.getTotalLength();

    // Prepare stroke dash arrays for progressive draw
    gsap.set(mainPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
      opacity: 0.8,
    });

    gsap.set(secondaryPath, {
      strokeDasharray: secondaryLength,
      strokeDashoffset: secondaryLength,
      opacity: 0.6,
    });

    if (probe) gsap.set(probe, { opacity: 0 });
    if (scanLine) gsap.set(scanLine, { opacity: 0 });

    const tl = gsap.timeline({
      delay: 0.3,
      defaults: { ease: "power2.out" },
    });

    // 1. Draw main telemetry trace
    tl.to(mainPath, {
      strokeDashoffset: 0,
      duration: 2.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (!probe || !mainPath) return;
        const progress = 1 - (gsap.getProperty(mainPath, "strokeDashoffset") as number) / pathLength;
        const pt = mainPath.getPointAtLength(progress * pathLength);
        probe.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
      },
    })
      // 2. Secondary trace draws in parallel offset
      .to(
        secondaryPath,
        {
          strokeDashoffset: 0,
          duration: 1.8,
        },
        "-=1.8"
      )
      // 3. Reveal probe and scanline
      .to(
        probe,
        {
          opacity: 1,
          duration: 0.4,
        },
        "-=2.2"
      )
      .to(
        scanLine,
        {
          opacity: 0.25,
          duration: 0.6,
        },
        "-=1.5"
      );

    // Continuous subtle sweep animation for scanline
    if (scanLine) {
      gsap.fromTo(
        scanLine,
        { attr: { x1: 60, x2: 60 } },
        {
          attr: { x1: 1140, x2: 1140 },
          duration: 7,
          repeat: -1,
          ease: "none",
        }
      );
    }

    // Continuous probe pulse loop along the path
    const probeTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    probeTimeline.to(
      {},
      {
        duration: 8,
        ease: "power1.inOut",
        onUpdate: function () {
          if (!probe || !mainPath) return;
          const p = this.progress();
          const pt = mainPath.getPointAtLength(p * pathLength);
          probe.setAttribute("transform", `translate(${pt.x}, ${pt.y})`);
        },
      }
    );

    // Sector marker pulse highlights when probe passes
    const sectors = [
      { ref: sector1Ref, pos: 320 / 1200 },
      { ref: sector2Ref, pos: 680 / 1200 },
      { ref: sector3Ref, pos: 1060 / 1200 },
    ];

    sectors.forEach((sec) => {
      if (sec.ref.current) {
        gsap.to(sec.ref.current, {
          opacity: 1,
          duration: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      }
    });
  }, containerRef);

  // Mouse move handler for interactive coordinate readout
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1200, ((e.clientX - rect.left) / rect.width) * 1200));
    const y = Math.max(0, Math.min(420, ((e.clientY - rect.top) / rect.height) * 420));
    const formatted = `LOC: ${String(Math.round(x)).padStart(4, "0")} / ${String(Math.round(y)).padStart(4, "0")}`;
    setActiveCoords(formatted);
  };

  const handleMouseLeave = () => {
    setActiveCoords("LOC: 0540.00 / 0190.00");
  };

  return (
    <div ref={containerRef} className="border-x border-b border-border-subtle py-12">
      <Container as="div">
        <svg
          ref={svgRef}
          viewBox="0 0 1200 420"
          className="w-full select-none"
          role="img"
          aria-label="Abstract engineering visualization: a sector-marked telemetry spline with active probe inspection on a coordinate grid"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <defs>
            <pattern id="sig-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-border-subtle)" strokeWidth="1" />
            </pattern>
            {/* Radial glow for probe marker */}
            <radialGradient id="probe-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background grid */}
          <rect width="1200" height="420" fill="url(#sig-grid)" />

          {/* Coordinate scan line */}
          <line
            ref={scanLineRef}
            x1="60"
            y1="20"
            x2="60"
            y2="400"
            stroke="var(--color-accent)"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="opacity-20"
          />

          {/* Corner marks */}
          <g stroke="var(--color-border-strong)" strokeWidth="1">
            <path d="M 20,20 L 20,44 M 20,20 L 44,20" fill="none" />
            <path d="M 1180,20 L 1180,44 M 1180,20 L 1156,20" fill="none" />
            <path d="M 20,400 L 20,376 M 20,400 L 44,400" fill="none" />
            <path d="M 1180,400 L 1180,376 M 1180,400 L 1156,400" fill="none" />
          </g>

          {/* Main abstract curve — original geometry, not a real circuit */}
          <path
            ref={mainPathRef}
            d="M 60,300 C 160,300 200,180 320,170 C 400,163 420,240 500,250 C 580,260 600,180 680,150 C 760,120 820,140 860,200 C 900,260 980,270 1060,220 C 1110,190 1130,160 1140,120"
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Traveling telemetry probe marker */}
          <g ref={probeRef} transform="translate(60, 300)">
            <circle cx="0" cy="0" r="14" fill="url(#probe-glow)" />
            <circle cx="0" cy="0" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--color-accent)" strokeWidth="1" opacity="0.6" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--color-accent)" strokeWidth="1" opacity="0.6" />
          </g>

          {/* Sector markers — sequential structural labels, not timed splits */}
          <g
            ref={sector1Ref}
            className="hidden md:inline"
            fontFamily="var(--font-technical)"
            fontSize="13"
            fill="var(--color-foreground-faint)"
          >
            <circle cx="320" cy="170" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <text x="320" y="150" textAnchor="middle" letterSpacing="1">
              01
            </text>
          </g>

          <g
            ref={sector2Ref}
            className="hidden md:inline"
            fontFamily="var(--font-technical)"
            fontSize="13"
            fill="var(--color-foreground-faint)"
          >
            <circle cx="680" cy="150" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <text x="680" y="130" textAnchor="middle" letterSpacing="1">
              02
            </text>
          </g>

          <g
            ref={sector3Ref}
            className="hidden md:inline"
            fontFamily="var(--font-technical)"
            fontSize="13"
            fill="var(--color-foreground-faint)"
          >
            <circle cx="1060" cy="220" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <text x="1060" y="250" textAnchor="middle" letterSpacing="1">
              03
            </text>
          </g>

          {/* Markers stay visible on mobile even with labels hidden */}
          <g className="md:hidden">
            <circle cx="320" cy="170" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <circle cx="680" cy="150" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
            <circle cx="1060" cy="220" r="4" fill="var(--color-background)" stroke="var(--color-accent)" strokeWidth="2" />
          </g>

          {/* Secondary abstract trace */}
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
              ref={secondaryPathRef}
              d="M 0,30 L 40,30 L 55,4 L 90,4 L 100,30 L 160,30 L 175,50 L 230,50 L 245,10 L 320,10"
              fill="none"
              stroke="var(--color-foreground-faint)"
              strokeWidth="1.5"
            />
          </g>

          {/* Atmospheric state labels + interactive coordinate readout */}
          <g
            className="hidden md:inline"
            fontFamily="var(--font-technical)"
            fontSize="11"
            letterSpacing="1.5"
            fill="var(--color-foreground-faint)"
            textAnchor="end"
          >
            <text ref={coordTextRef} x="1180" y="318" fill="var(--color-accent)">
              {activeCoords}
            </text>
            <text x="1180" y="335">
              MODE — ANALYSIS
            </text>
            <text x="1180" y="352">
              STATUS — ACTIVE
            </text>
          </g>
        </svg>
      </Container>
    </div>
  );
}
