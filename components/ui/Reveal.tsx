"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Section-reveal-on-scroll, deliberately not GSAP+ScrollTrigger.
 *
 * That stack can't be installed or tested in the sandbox this was
 * built in (no network — see the "content: fill gaps" and diagnostic
 * commits), but the underlying ask — "section reveals" — doesn't
 * actually need a 70kb animation library: IntersectionObserver +
 * a CSS transition does the same job in ~30 lines with zero new
 * dependencies. Spec §35 (dependency discipline) asks "does this
 * materially improve the experience?" before adding a dependency —
 * for this specific effect, it doesn't.
 *
 * If GSAP's timeline/stagger control is wanted later for the richer
 * effects (telemetry trace drawing, architecture-flow animation),
 * that's a real reason to add it — this component isn't a stand-in
 * for those, just for plain reveal-on-scroll.
 *
 * Respects prefers-reduced-motion via the transition-duration rule
 * already in globals.css (Phase 1) — reduced-motion users see the
 * final state immediately, no observer logic needed for that part.
 */
export function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        className
      )}
      style={{ transitionDelay: visible ? `${delayMs}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
