import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-accent text-background hover:bg-accent-strong",
  secondary:
    "border border-border-strong text-foreground hover:border-accent hover:text-accent",
};

const baseStyles =
  "inline-flex items-center gap-2 px-5 py-2.5 font-technical text-xs uppercase tracking-[0.15em] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2";

interface ButtonProps {
  children: React.ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  /** External links (GitHub, LinkedIn, etc.) open in a new tab. */
  external?: boolean;
}

export function Button({ children, href, variant = "primary", className, external = false }: ButtonProps) {
  const styles = cn(baseStyles, VARIANT_STYLES[variant], className);

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={styles}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={styles}>
      {children}
    </Link>
  );
}
