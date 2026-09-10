"use client";

import { useLayoutEffect, useEffect } from "react";
import { gsap } from "@/lib/motion/runtime";

// Use useLayoutEffect on client to prevent visual flash, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Custom React hook for safely creating scoped GSAP animations with automatic lifecycle cleanup.
 *
 * @param effect Callback receiving gsap.Context
 * @param scope Ref to the root container element
 * @param deps Dependency array
 */
export function useGsapContext(
  effect: (ctx: gsap.Context) => void,
  scope: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  useIsomorphicLayoutEffect(() => {
    if (!scope.current) return;

    const ctx = gsap.context((context) => {
      effect(context);
    }, scope.current);

    return () => {
      ctx.revert();
    };
  }, [scope, ...deps]);
}
