import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

let lenisInstance: Lenis | null = null;
let tickerFn: ((time: number) => void) | null = null;
let isInitialized = false;

/**
 * Checks whether user prefers reduced motion.
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Checks whether the current device is primarily touch-based or mobile.
 */
export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
}

/**
 * Single coherent motion runtime integrating GSAP, ScrollTrigger, and Lenis.
 * Driven strictly by GSAP ticker — zero competing RAF loops.
 */
export function initMotionRuntime(): { lenis: Lenis | null; gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger } {
  if (typeof window === "undefined") {
    return { lenis: null, gsap, ScrollTrigger };
  }

  if (isInitialized) {
    return { lenis: lenisInstance, gsap, ScrollTrigger };
  }

  // Register GSAP plugins
  gsap.registerPlugin(ScrollTrigger);

  // If reduced motion or touch device: do NOT hijack native scroll with smooth scrolling.
  // Respect native momentum, gesture physics, and accessibility preferences.
  const prefersReduced = isReducedMotion();
  const touch = isTouchDevice();

  if (!prefersReduced && !touch) {
    try {
      lenisInstance = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
      });

      // Synchronize Lenis scroll updates with ScrollTrigger
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Single synchronized animation loop: GSAP ticker drives Lenis
      tickerFn = (time: number) => {
        lenisInstance?.raf(time * 1000);
      };

      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0);
    } catch (err) {
      console.warn("[MotionRuntime] Lenis initialization skipped:", err);
      lenisInstance = null;
    }
  }

  isInitialized = true;
  return { lenis: lenisInstance, gsap, ScrollTrigger };
}

/**
 * Refreshes ScrollTrigger calculations (call after dynamic DOM changes or route transitions).
 */
export function refreshScrollTrigger() {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}

/**
 * Full teardown of motion runtime, removing RAF ticker listener,
 * destroying Lenis, and killing ScrollTriggers to prevent resource leaks.
 */
export function destroyMotionRuntime() {
  if (typeof window === "undefined") return;

  if (tickerFn) {
    gsap.ticker.remove(tickerFn);
    tickerFn = null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }

  ScrollTrigger.getAll().forEach((st) => st.kill());
  isInitialized = false;
}

export { gsap, ScrollTrigger, Lenis };
