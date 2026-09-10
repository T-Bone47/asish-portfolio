"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/data/navigation";
import { siteIdentity } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";
import { cn } from "@/lib/utils";

/**
 * Spec §23 & Phase 3 Signature Pass: Engineered Control-Panel Header.
 * "ASISH / OLIVER" wordmark, indexed control navigation with active route tracking,
 * and an engineered "SYSTEM STATUS: ONLINE" indicator.
 */
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { github, linkedin } = siteIdentity.social;
  const utilityLinks = [
    github ? { label: "GITHUB", href: github } : null,
    linkedin ? { label: "LINKEDIN", href: linkedin } : null,
  ].filter((item): item is { label: string; href: string } => item !== null);

  // Close mobile menu on Escape key press
  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-sm focus:border focus:border-accent focus:bg-background focus:px-4 focus:py-2 focus:font-technical focus:text-xs focus:uppercase focus:tracking-widest focus:text-accent focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/90 backdrop-blur-sm">
        <Container as="div" className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group font-display text-lg uppercase tracking-tight rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            onClick={() => setMenuOpen(false)}
          >
            ASISH <span className="text-foreground-muted">/</span> OLIVER
            <span
              aria-hidden="true"
              className="ml-2 font-technical text-[10px] text-foreground-faint transition-colors group-hover:text-accent"
            >
              [ROOT]
            </span>
          </Link>

          {/* Desktop engineered control navigation */}
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
            {primaryNav.map((item, idx) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/work" && pathname.startsWith("/work"));
              const indexNum = String(idx + 1).padStart(2, "0");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "group relative flex items-baseline gap-1.5 py-1 font-technical text-xs uppercase tracking-[0.15em] transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                    isActive
                      ? "text-accent font-medium"
                      : "text-foreground-muted hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "tabular-nums text-[10px] transition-colors",
                      isActive ? "text-accent" : "text-foreground-faint group-hover:text-accent"
                    )}
                  >
                    {indexNum}
                  </span>
                  <span>{item.label}</span>
                  {item.href === "/work" && (
                    <span className="text-[9px] text-foreground-faint tabular-nums">
                      /07
                    </span>
                  )}
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    />
                  )}
                </Link>
              );
            })}
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
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40 duration-1000" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
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
            {primaryNav.map((item, idx) => {
              const isActive =
                pathname === item.href ||
                (item.href === "/work" && pathname.startsWith("/work"));
              const indexNum = String(idx + 1).padStart(2, "0");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-baseline justify-between py-3 border-b border-border-subtle/50",
                    isActive ? "text-accent" : "text-foreground"
                  )}
                >
                  <span className="font-display text-2xl uppercase tracking-tight">
                    {item.label}
                  </span>
                  <span className="font-technical text-xs tracking-widest text-foreground-muted">
                    SYS.{indexNum}
                  </span>
                </Link>
              );
            })}
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
    </>
  );
}
