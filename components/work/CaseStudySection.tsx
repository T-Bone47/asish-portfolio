import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

/** Consistent eyebrow + heading + content wrapper for every case-study
 *  section — spec §13's sections "may be omitted when verified content
 *  does not exist," which callers handle by simply not rendering this. */
export function CaseStudySection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border-subtle py-12 first:border-t-0 first:pt-0">
      <TechnicalLabel as="h2" className="text-accent">
        {label}
      </TechnicalLabel>
      <div className="mt-6">{children}</div>
    </section>
  );
}
