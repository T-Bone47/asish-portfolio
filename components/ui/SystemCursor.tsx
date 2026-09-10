"use client";

import { useEffect, useState, useRef, useSyncExternalStore } from "react";
import { isReducedMotion, isTouchDevice } from "@/lib/motion/runtime";

type CursorMode = "default" | "interactive" | "project" | "external";

const emptySubscribe = () => () => {};

/**
 * Spec §8 — Engineered System Cursor.
 * Minimal, hardware-accelerated precision indicator:
 * - Default: Tiny 4px dot with precision crosshair reticle
 * - Interactive: Subtle expansion & green signal ring
 * - Project: Interaction indicator ([OPEN])
 * - External Link: Directional cue (↗)
 * - Automatically disabled on touch / mobile devices & reduced-motion preferences
 */
export function SystemCursor() {
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const [mode, setMode] = useState<CursorMode>("default");
  const [visible, setVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (!isHydrated) return;
    if (isReducedMotion() || isTouchDevice() || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
    };

    const handleMouseLeave = () => {
      setVisible(false);
    };

    const handleMouseEnter = () => {
      setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest<HTMLElement>('a[href^="/work/"], [data-cursor="project"]');
      if (projectEl) {
        setMode("project");
        return;
      }

      const externalEl = target.closest<HTMLElement>('a[target="_blank"], [data-cursor="external"]');
      if (externalEl) {
        setMode("external");
        return;
      }

      const clickableEl = target.closest<HTMLElement>('a, button, [role="button"], input, select');
      if (clickableEl) {
        setMode("interactive");
        return;
      }

      setMode("default");
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleOver, { passive: true });

    // Smooth RAF interpolator for organic responsiveness without drag lag
    let animId: number;
    const render = () => {
      const pos = posRef.current;
      const target = targetPosRef.current;
      pos.x += (target.x - pos.x) * 0.45;
      pos.y += (target.y - pos.y) * 0.45;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(animId);
    };
  }, [isHydrated]);

  if (!isHydrated) return null;

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s ease-out",
      }}
      className="pointer-events-none fixed top-0 left-0 z-50 select-none will-change-transform -translate-x-1/2 -translate-y-1/2"
    >
      {/* Precision Core Indicator */}
      <div className="relative flex items-center justify-center">
        {mode === "default" && (
          <div className="relative flex items-center justify-center">
            <div className="h-1.5 w-1.5 rounded-full bg-accent" />
            <div className="absolute h-4 w-4 rounded-full border border-accent/25 animate-pulse" />
          </div>
        )}

        {mode === "interactive" && (
          <div className="relative flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-accent" />
            <div className="absolute h-6 w-6 rounded-full border border-accent/60 bg-accent/10 transition-all duration-150" />
          </div>
        )}

        {mode === "project" && (
          <div className="flex items-center gap-1.5 rounded-sm border border-accent/70 bg-background/90 px-2 py-0.5 font-technical text-[9px] uppercase tracking-wider text-accent shadow-sm backdrop-blur-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            <span>OPEN</span>
          </div>
        )}

        {mode === "external" && (
          <div className="flex h-5 w-5 items-center justify-center rounded-full border border-accent/80 bg-background/90 font-technical text-[10px] text-accent backdrop-blur-xs">
            ↗
          </div>
        )}
      </div>
    </div>
  );
}
