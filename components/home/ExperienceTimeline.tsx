import { experience } from "@/data/experience";

/**
 * Spec §19/§26 & Phase 3 Signature Pass: Technical Career Progression Trace.
 * Renders an engineered career vector line with chronological milestone nodes.
 */
export function ExperienceTimeline() {
  return (
    <div className="relative border-l-2 border-border-subtle pl-6 md:pl-10 space-y-12 py-4">
      {experience.map((entry, idx) => {
        const isLatest = idx === 0;
        return (
          <div key={entry.id} className="group relative">
            {/* Milestone node marker */}
            <div
              aria-hidden="true"
              className={`absolute -left-[31px] md:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 bg-background transition-all duration-200 ${
                isLatest
                  ? "border-accent shadow-[0_0_8px_rgba(52,226,122,0.4)]"
                  : "border-border-strong group-hover:border-accent"
              }`}
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${
                  isLatest ? "bg-accent" : "bg-foreground-faint group-hover:bg-accent"
                }`}
              />
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border-subtle/50 pb-2">
              <div className="flex items-center gap-3">
                <h3 className="font-display text-2xl uppercase tracking-tight group-hover:text-accent transition-colors">
                  {entry.organization}
                </h3>
                {isLatest && (
                  <span className="font-technical text-[9px] uppercase tracking-widest text-accent border border-accent/40 bg-accent/5 px-2 py-0.5 rounded-sm">
                    CURRENT_OPERATIONAL
                  </span>
                )}
              </div>
              <span className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-faint tabular-nums">
                {entry.period}
              </span>
            </div>

            <p className="mt-2 font-technical text-xs uppercase tracking-wider text-accent font-medium">
              {"//"} ROLE: {entry.role}
            </p>

            <ul className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
              {entry.focus.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 font-body text-sm text-foreground-muted group-hover:text-foreground transition-colors"
                >
                  <span className="font-technical text-accent text-xs select-none mt-0.5" aria-hidden="true">
                    ›
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
