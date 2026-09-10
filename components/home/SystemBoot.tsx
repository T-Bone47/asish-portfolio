/**
 * Spec §8 — a short instrumentation-powering-up sequence, not a hacker
 * terminal. Pure CSS (see the boot-sequence keyframes in globals.css),
 * so this stays a Server Component — no timers, no client JS.
 *
 * Verified in a real Chromium browser before being written as JSX:
 * the row stagger, the reduced-motion skip, and the fade-out-to-hero
 * handoff were all screenshotted and visually checked, not assumed.
 * One real bug was caught doing that — see the git commit for this
 * component.
 */
const BOOT_ROWS = [
  { label: "Telemetry", delay: "0.5s", fillDelay: "0.55s" },
  { label: "Simulation", delay: "0.9s", fillDelay: "0.95s" },
  { label: "AI / ML", delay: "1.3s", fillDelay: "1.35s" },
] as const;

export function SystemBoot() {
  return (
    <div
      aria-hidden="true"
      className="animate-boot-sequence fixed inset-0 z-[60] flex items-center justify-center bg-background"
    >
      <div className="w-80 font-technical">
        <div
          className="animate-boot-fade-in text-xs uppercase tracking-[0.25em] text-foreground-faint opacity-0"
          style={{ animationDelay: "0.1s" }}
        >
          System Initialising
        </div>

        {BOOT_ROWS.map((row) => (
          <div
            key={row.label}
            className="animate-boot-fade-in mt-4 flex items-center gap-3 opacity-0"
            style={{ animationDelay: row.delay }}
          >
            <span className="w-24 shrink-0 text-xs tracking-[0.1em] text-foreground-muted">
              {row.label}
            </span>
            <span className="relative h-px flex-1 bg-border-strong">
              <span
                className="animate-boot-fill-bar absolute inset-0 bg-accent"
                style={{ animationDelay: row.fillDelay }}
              />
            </span>
          </div>
        ))}

        <div
          className="animate-boot-fade-in mt-6 text-xs uppercase tracking-[0.25em] text-accent opacity-0"
          style={{ animationDelay: "1.9s" }}
        >
          System Ready
        </div>
      </div>
    </div>
  );
}
