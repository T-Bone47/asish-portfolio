"use client";

import { useState } from "react";
import Link from "next/link";
import { primaryNav } from "@/data/navigation";
import { siteIdentity } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { cn } from "@/lib/utils";

/**
 * Spec §23: "ASISH / OLIVER" wordmark, primary nav, and a
 * "SYSTEM STATUS: ONLINE" indicator on desktop. GitHub/LinkedIn are
 * genuine utility links — rendered only when a real URL exists in
 * data/site.ts (spec §9: "do not invent links").
 *
 * This is a client component because the mobile menu needs open/close
 * state — spec §29 allows client components for interaction.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { github, linkedin } = siteIdentity.social;
  const utilityLinks = [
    github ? { label: "GITHUB", href: github } : null,
    linkedin ? { label: "LINKEDIN", href: linkedin } : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/90 backdrop-blur-sm">
      <Container as="div" className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg uppercase tracking-tight"
          onClick={() => setMenuOpen(false)}
        >
          ASISH <span className="text-foreground-muted">/</span> OLIVER
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          {utilityLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-2 border-l border-border-subtle pl-6">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            <TechnicalLabel>System Status: Online</TechnicalLabel>
          </div>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-5" aria-hidden="true">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-full bg-foreground transition-transform",
                menuOpen && "translate-y-[7px] rotate-45"
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-foreground transition-opacity",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px w-full bg-foreground transition-transform",
                menuOpen && "-translate-y-[7px] -rotate-45"
              )}
            />
          </span>
        </button>
      </Container>

      {/* Mobile nav panel */}
      <nav
        id="mobile-nav"
        aria-label="Primary"
        className={cn(
          "border-t border-border-subtle bg-background md:hidden",
          menuOpen ? "block" : "hidden"
        )}
      >
        <Container as="div" className="flex flex-col gap-1 py-4">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-3 font-display text-2xl uppercase tracking-tight"
            >
              {item.label}
            </Link>
          ))}
          {utilityLinks.length > 0 && (
            <div className="mt-4 flex gap-6 border-t border-border-subtle pt-4">
              {utilityLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-technical text-xs uppercase tracking-[0.15em] text-foreground-muted"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </Container>
      </nav>
    </header>
  );
}
