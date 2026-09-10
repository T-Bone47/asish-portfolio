"use client";

import { useEffect, useState, useRef } from "react";
import { siteIdentity } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { isReducedMotion, isTouchDevice } from "@/lib/motion/runtime";

/**
 * Spec §9 & Phase 3 Signature Pass: Engineered Workspace Hero.
 * 
 * Features:
 * - Subtle system initialization sequence (SYSTEM READY -> WORKSPACE ACTIVE)
 * - Restrained desktop pointer targeting geometry (subtle 0-4px displacement)
 * - Clean reduced-motion & touch fallback
 * - No fake telemetry; pure structural metadata
 */
export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [targetOffset, setTargetOffset] = useState({ x: 0, y: 0 });
  const [coordReadout, setCoordReadout] = useState("0540.0 / 0190.0");

  useEffect(() => {
    if (isReducedMotion() || isTouchDevice()) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      
      // Extremely restrained displacement (max 4px)
      setTargetOffset({
        x: Math.round(relX * 8),
        y: Math.round(relY * 6),
      });

      const normalizedX = Math.round(Math.max(0, Math.min(1000, ((e.clientX - rect.left) / rect.width) * 1000)));
      const normalizedY = Math.round(Math.max(0, Math.min(400, ((e.clientY - rect.top) / rect.height) * 400)));
      setCoordReadout(`${String(normalizedX).padStart(4, "0")}.0 / ${String(normalizedY).padStart(4, "0")}.0`);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef}>
      <Container
        as="section"
        className="relative overflow-hidden border-x border-t border-border-subtle pb-16 pt-28 md:pt-32"
      >
        {/* Abstract targeting geometry background */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 400"
          style={{
            transform: `translate3d(${targetOffset.x * 0.8}px, ${targetOffset.y * 0.8}px, 0)`,
            transition: "transform 0.2s ease-out",
          }}
          className="pointer-events-none absolute -right-24 -top-20 h-[400px] w-[400px] opacity-[0.05] md:h-[500px] md:w-[500px]"
        >
          <circle cx="200" cy="200" r="180" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <circle cx="200" cy="200" r="120" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <circle cx="200" cy="200" r="60" fill="none" stroke="var(--color-accent)" strokeWidth="1" />
          <line x1="200" y1="0" x2="200" y2="400" stroke="var(--color-accent)" strokeWidth="1" />
          <line x1="0" y1="200" x2="400" y2="200" stroke="var(--color-accent)" strokeWidth="1" />
        </svg>

        {/* System Boot Readiness & Coordinate Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-y-2 border-b border-border-subtle/60 pb-4 mb-6">
          <div className="flex items-center gap-3 font-technical text-xs uppercase tracking-[0.25em] text-accent">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-30 duration-1000" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span>SYSTEM READY // WORKSPACE ACTIVE</span>
          </div>
          <div
            aria-hidden="true"
            className="hidden font-technical text-[10px] uppercase tracking-widest text-foreground-faint sm:block tabular-nums"
          >
            HUD_REF: {coordReadout}
          </div>
        </div>

        <h1 className="font-display text-display-xl uppercase leading-[0.92] tracking-tight">
          {siteIdentity.name}
        </h1>

        <p className="mt-3 font-display text-display-md uppercase leading-tight text-foreground-muted">
          {siteIdentity.primaryRole.map((role, i) => (
            <span key={role}>
              {role}
              {i < siteIdentity.primaryRole.length - 1 && <br />}
            </span>
          ))}
        </p>

        {/* Engineering Philosophy Micro-progression */}
        <div
          aria-hidden="true"
          className="mt-6 flex flex-wrap items-center gap-x-2.5 font-technical text-[11px] uppercase tracking-widest text-foreground-faint"
        >
          <span className="text-accent">DATA</span>
          <span>→</span>
          <span>MODELS</span>
          <span>→</span>
          <span>SYSTEMS</span>
          <span>→</span>
          <span>SIMULATION</span>
          <span>→</span>
          <span className="text-foreground-muted">INTELLIGENCE</span>
        </div>

        <p className="mt-6 max-w-xl font-body text-lg leading-relaxed text-foreground-muted">
          {siteIdentity.supportingStatement}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/work" variant="primary">
            View Systems
          </Button>
          {siteIdentity.social.github && (
            <Button href={siteIdentity.social.github} variant="secondary" external>
              GitHub
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}
