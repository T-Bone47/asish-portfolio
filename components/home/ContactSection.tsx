"use client";

import { useState } from "react";
import { siteIdentity } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { TechnicalLabel } from "@/components/ui/TechnicalLabel";

const AVAILABLE_FOR = [
  { domain: "ENGINEERING", desc: "Distributed Systems · Real-time Telemetry · High-performance Core" },
  { domain: "RESEARCH", desc: "Numerical Modeling · Optimization · Vehicle Dynamics" },
  { domain: "COLLABORATION", desc: "Open Engineering · Motorsport Systems · Applied AI" },
  { domain: "EXPERIMENTATION", desc: "Novel Architectures · Embedded Signal Processing" },
];

/**
 * Spec §16 & Phase 3 Signature Pass: Engineered Communication Terminal.
 * Minimal, high-precision technical contact resolution with instant copy feedback.
 */
export function ContactSection() {
  const { email, github, linkedin } = siteIdentity.social;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback to mailto
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <Container as="section" className="py-16 md:py-24">
      {/* Header telemetry index */}
      <div className="flex items-center gap-3">
        <TechnicalLabel className="text-accent">04 / CONTACT</TechnicalLabel>
        <span aria-hidden="true" className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
          [SYS.04 · OPEN CHANNEL · TERMINAL ACTIVE]
        </span>
      </div>

      <div className="mt-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-display-lg uppercase tracking-tight text-foreground">
            OPEN CHANNEL
          </h2>
          <p className="mt-2 font-technical text-xs uppercase tracking-[0.1em] text-foreground-faint">
            TERMINAL // ASISH OLIVER M {siteIdentity.location ? `· ${siteIdentity.location.toUpperCase()}` : ""}
          </p>
        </div>

        <div className="flex items-center gap-2 font-technical text-[11px] uppercase tracking-wider text-accent border border-accent/20 bg-accent/5 px-3 py-1.5 rounded-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          <span>STATUS: DISPATCH READY</span>
        </div>
      </div>

      {/* Available For Capabilities */}
      <div className="mt-12 border-t border-border-subtle pt-8">
        <div className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint mb-4">
          AVAILABLE FOR // DIRECT COLLABORATION & INQUIRY
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {AVAILABLE_FOR.map((item) => (
            <div
              key={item.domain}
              className="border border-border-subtle bg-surface/20 p-4 rounded-sm"
            >
              <div className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-accent" />
                <span className="font-display text-sm uppercase tracking-wider text-foreground">
                  {item.domain}
                </span>
              </div>
              <p className="mt-2 font-technical text-[10px] uppercase tracking-wide text-foreground-muted">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Dispatch Channels */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Email card with Copy & Direct Mailto */}
        <div className="group relative flex flex-col justify-between border border-border-subtle bg-surface/30 p-6 rounded-sm transition-all duration-200 hover:border-accent/50 hover:bg-surface/60">
          <span
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          />
          <div>
            <div className="flex items-center justify-between font-technical text-[10px] text-foreground-faint uppercase tracking-widest">
              <span>CH.01</span>
              <span className="text-accent">[DIRECT_DISPATCH]</span>
            </div>
            <div className="mt-4 font-display text-xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
              EMAIL
            </div>
            <div className="mt-2 font-technical text-xs text-foreground-muted break-all">
              {email}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-border-subtle/50 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="font-technical text-[10px] uppercase tracking-wider text-foreground hover:text-accent border border-border-subtle hover:border-accent/40 bg-surface/60 px-2.5 py-1 rounded-sm transition-all flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent cursor-pointer"
            >
              {copied ? (
                <>
                  <span className="text-accent">✓</span>
                  <span className="text-accent font-semibold">COPIED TO CLIPBOARD</span>
                </>
              ) : (
                <>
                  <span>[COPY]</span>
                  <span className="text-foreground-faint">CLIPBOARD</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${email}`}
              className="font-technical text-[10px] uppercase tracking-wider text-accent hover:underline flex items-center gap-1"
            >
              <span>SEND</span>
              <span>→</span>
            </a>
          </div>
        </div>

        {/* GitHub */}
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between border border-border-subtle bg-surface/30 p-6 rounded-sm transition-all duration-200 hover:border-accent/50 hover:bg-surface/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <div>
              <div className="flex items-center justify-between font-technical text-[10px] text-foreground-faint uppercase tracking-widest">
                <span>CH.02</span>
                <span className="group-hover:text-accent transition-colors">[VERSION_CONTROL]</span>
              </div>
              <div className="mt-4 font-display text-xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
                GITHUB
              </div>
              <div className="mt-2 font-technical text-xs text-foreground-muted">
                {github.replace("https://", "")}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle/50 flex items-center justify-between font-technical text-xs text-foreground-muted group-hover:text-foreground">
              <span className="text-[10px] uppercase tracking-wider text-foreground-faint group-hover:text-foreground-muted">
                REPOSITORY ARCHIVE
              </span>
              <span aria-hidden="true" className="text-foreground-faint transition-transform group-hover:translate-x-1 group-hover:text-accent">
                ↗
              </span>
            </div>
          </a>
        )}

        {/* LinkedIn */}
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between border border-border-subtle bg-surface/30 p-6 rounded-sm transition-all duration-200 hover:border-accent/50 hover:bg-surface/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
          >
            <span
              aria-hidden="true"
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
            <div>
              <div className="flex items-center justify-between font-technical text-[10px] text-foreground-faint uppercase tracking-widest">
                <span>CH.03</span>
                <span className="group-hover:text-accent transition-colors">[PROFESSIONAL_GRAPH]</span>
              </div>
              <div className="mt-4 font-display text-xl uppercase tracking-tight text-foreground group-hover:text-accent transition-colors">
                LINKEDIN
              </div>
              <div className="mt-2 font-technical text-xs text-foreground-muted truncate">
                {linkedin.replace("https://", "")}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border-subtle/50 flex items-center justify-between font-technical text-xs text-foreground-muted group-hover:text-foreground">
              <span className="text-[10px] uppercase tracking-wider text-foreground-faint group-hover:text-foreground-muted">
                PROFESSIONAL NETWORK
              </span>
              <span aria-hidden="true" className="text-foreground-faint transition-transform group-hover:translate-x-1 group-hover:text-accent">
                ↗
              </span>
            </div>
          </a>
        )}
      </div>
    </Container>
  );
}
