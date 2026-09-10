"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initMotionRuntime, destroyMotionRuntime, refreshScrollTrigger } from "@/lib/motion/runtime";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Initialize runtime on client mount
  useEffect(() => {
    initMotionRuntime();

    return () => {
      destroyMotionRuntime();
    };
  }, []);

  // Refresh ScrollTrigger calculations on route transition
  useEffect(() => {
    // Give DOM a frame to settle after route change
    const timer = setTimeout(() => {
      refreshScrollTrigger();
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
