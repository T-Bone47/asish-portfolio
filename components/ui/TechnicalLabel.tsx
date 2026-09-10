import { cn } from "@/lib/utils";

/**
 * Small uppercase monospace caption — the recurring "instrumentation"
 * label used for section eyebrows, categories, coordinates, and other
 * short technical metadata. Spec §6: technical type role is for
 * "telemetry, metrics, metadata, coordinates, system labels."
 */
export function TechnicalLabel({
  children,
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "span" | "p" | "h2" | "h3";
}) {
  return (
    <Tag
      className={cn(
        "font-technical text-xs uppercase tracking-[0.2em] text-foreground-faint",
        className
      )}
    >
      {children}
    </Tag>
  );
}
