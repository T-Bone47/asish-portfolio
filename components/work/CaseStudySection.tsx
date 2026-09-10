import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/** Consistent eyebrow + heading + content wrapper for every case-study
 *  section — spec §13's sections "may be omitted when verified content
 *  does not exist," which callers handle by simply not rendering this. */
export function CaseStudySection({
  label,
  children,
  index,
}: {
  label: string;
  children: React.ReactNode;
  index?: string;
}) {
  return (
    <section className="border-t border-border-subtle py-12 first:border-t-0 first:pt-0">
      <div className="flex items-center gap-2.5">
        {index && (
          <span className="font-technical text-xs tracking-widest text-accent font-semibold">
            {index} {"//"}
          </span>
        )}
        <TechnicalLabel as="h2" className={index ? "text-foreground" : "text-accent"}>
          {label}
        </TechnicalLabel>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}
