import { experience } from "@/data/experience";

/** Spec §19/§26 — a restrained technical timeline, reused by the
 *  homepage section and the dedicated /experience page. */
export function ExperienceTimeline() {
  return (
    <div className="divide-y divide-border-subtle border-t border-border-subtle">
      {experience.map((entry) => (
        <div key={entry.id} className="py-8">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="font-display text-2xl uppercase tracking-tight">{entry.organization}</h3>
            <span className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-faint">
              {entry.period}
            </span>
          </div>
          <p className="mt-1 font-body text-sm text-foreground-muted">{entry.role}</p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1.5">
            {entry.focus.map((item) => (
              <li key={item} className="flex items-center gap-2 font-body text-sm text-foreground-muted">
                <span className="text-accent" aria-hidden="true">
                  —
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
