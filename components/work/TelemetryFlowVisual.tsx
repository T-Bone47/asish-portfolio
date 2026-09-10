"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface PipelineNode {
  id: string;
  title: string;
  category: "ingestion" | "core" | "replay" | "analytics" | "egress";
  details: string;
  metrics: { label: string; value: string }[];
  sources?: string[];
}

const NODES: PipelineNode[] = [
  {
    id: "providers",
    title: "Multi-Provider Ingestion",
    category: "ingestion",
    details:
      "Provider-agnostic ingress layer absorbing live telemetry feeds from disparate external APIs and socket connections with failover recovery.",
    metrics: [
      { label: "Data Providers", value: "4 Sources" },
      { label: "Throughput", value: "~2,650 evt/s" },
    ],
    sources: ["OpenF1", "FastF1", "Jolpica", "F1 SignalR"],
  },
  {
    id: "normalisation",
    title: "Schema Normalisation",
    category: "core",
    details:
      "Transforms vendor-specific telemetry payloads into a unified, strictly typed canonical event structure. Zero malformed records allowed past this boundary.",
    metrics: [
      { label: "Malformed Records", value: "0" },
      { label: "Validation P50", value: "~0.10 ms" },
    ],
  },
  {
    id: "canonical",
    title: "Canonical Event Bus",
    category: "core",
    details:
      "Central message backbone holding verified immutable race events. Every event carries cryptographic provenance for auditability.",
    metrics: [
      { label: "Verified Events", value: "1,067,193" },
      { label: "Peak Memory", value: "99 MB" },
    ],
  },
  {
    id: "replay",
    title: "Deterministic Replay",
    category: "replay",
    details:
      "Exact-order session replay engine used for rigorous regression testing and offline strategy algorithm validation against historical race data.",
    metrics: [
      { label: "Replay Accuracy", value: "100% Deterministic" },
      { label: "Storage Engine", value: "TimescaleDB" },
    ],
  },
  {
    id: "analytics",
    title: "Telemetry Intelligence",
    category: "analytics",
    details:
      "Real-time analytical pipelines computing timing deltas, sector splits, tyre thermal degradation curves, battle detection, and strategy windows.",
    metrics: [
      { label: "Active Engines", value: "9 Modules" },
      { label: "Compute Target", value: "< 10ms" },
    ],
    sources: ["Timing", "Sector Analysis", "Pace", "Tyre Degradation", "Battle Detection", "Strategy"],
  },
  {
    id: "egress",
    title: "WebSockets & API",
    category: "egress",
    details:
      "Low-latency streaming endpoints built on FastAPI broadcasting live telemetry packets and strategy decision support to client consoles.",
    metrics: [
      { label: "Protocol", value: "WebSockets / REST" },
      { label: "Framework", value: "FastAPI + Docker" },
    ],
  },
];

const DEFAULT_NODE = NODES[2] as PipelineNode;

export function TelemetryFlowVisual() {
  const [activeNodeId, setActiveNodeId] = useState<string>("canonical");
  const activeNode: PipelineNode =
    NODES.find((n) => n.id === activeNodeId) ?? DEFAULT_NODE;

  return (
    <div className="my-10 w-full overflow-hidden rounded-sm border border-border-subtle bg-surface-subtle/70 p-6 md:p-8">
      {/* Header telemetry HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border-subtle pb-4">
        <div>
          <span className="font-technical text-xs uppercase tracking-widest text-accent">
            Telemetry Pipeline Visualizer
          </span>
          <h3 className="mt-1 font-display text-2xl uppercase tracking-tight text-foreground">
            Multi-Provider Event Processing Flow
          </h3>
        </div>
        <div className="flex items-center gap-4 font-technical text-xs text-foreground-faint">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-accent" />
            VERIFIED REPLAY BENCHMARK
          </span>
          <span>SYSTEM: LFI-2026-CORE</span>
        </div>
      </div>

      {/* Verified metrics ticker bar */}
      <div className="my-6 grid grid-cols-2 gap-3 border-y border-border-subtle/60 py-3 sm:grid-cols-5">
        <div>
          <div className="font-technical text-xs text-foreground-faint">EVENTS PROCESSED</div>
          <div className="font-technical text-lg font-semibold text-foreground">1,067,193</div>
        </div>
        <div>
          <div className="font-technical text-xs text-foreground-faint">MALFORMED RECORDS</div>
          <div className="font-technical text-lg font-semibold text-accent">0</div>
        </div>
        <div>
          <div className="font-technical text-xs text-foreground-faint">THROUGHPUT</div>
          <div className="font-technical text-lg font-semibold text-foreground">~2,650 evt/s</div>
        </div>
        <div>
          <div className="font-technical text-xs text-foreground-faint">P50 LATENCY</div>
          <div className="font-technical text-lg font-semibold text-foreground">~0.10 ms</div>
        </div>
        <div>
          <div className="font-technical text-xs text-foreground-faint">PEAK MEMORY</div>
          <div className="font-technical text-lg font-semibold text-foreground">99 MB</div>
        </div>
      </div>

      {/* Interactive pipeline flow diagram */}
      <div className="mt-6">
        <div className="mb-3 font-technical text-xs uppercase tracking-widest text-foreground-faint">
          Interactive Pipeline Stages (Select stage to inspect)
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {NODES.map((node, index) => {
            const isSelected = node.id === activeNodeId;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeId(node.id)}
                className={cn(
                  "group flex flex-col justify-between rounded-sm border p-3 text-left transition-all duration-150 outline-none",
                  isSelected
                    ? "border-accent bg-surface shadow-[0_0_12px_rgba(52,226,122,0.12)]"
                    : "border-border-subtle bg-surface/40 hover:border-border-strong hover:bg-surface/80",
                  "focus-visible:ring-1 focus-visible:ring-accent"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-technical text-[11px] text-foreground-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      isSelected ? "bg-accent" : "bg-border-strong group-hover:bg-foreground-faint"
                    )}
                  />
                </div>
                <div className="mt-3 font-technical text-xs font-semibold uppercase tracking-wide text-foreground">
                  {node.title}
                </div>
                <div className="mt-1 font-technical text-[10px] text-accent/80">
                  {node.metrics[0]?.value}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail telemetry pane for active stage */}
      {activeNode && (
        <div className="mt-6 rounded-sm border border-border-subtle bg-surface/80 p-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border-subtle pb-3">
            <div className="flex items-center gap-3">
              <span className="rounded-sm border border-accent/40 bg-accent/10 px-2 py-0.5 font-technical text-xs uppercase text-accent">
                {activeNode.category}
              </span>
              <h4 className="font-display text-lg uppercase tracking-tight text-foreground">
                {activeNode.title}
              </h4>
            </div>
            <div className="font-technical text-xs text-foreground-faint">
              NODE ID: {activeNode.id.toUpperCase()}
            </div>
          </div>

          <p className="mt-3 max-w-3xl font-body text-sm text-foreground-muted">
            {activeNode.details}
          </p>

          <div className="mt-4 grid grid-cols-1 gap-4 border-t border-border-subtle/80 pt-4 sm:grid-cols-2">
            <div>
              <span className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
                Stage Performance Benchmarks
              </span>
              <div className="mt-2 space-y-1.5">
                {activeNode.metrics.map((m) => (
                  <div key={m.label} className="flex items-center justify-between font-technical text-xs">
                    <span className="text-foreground-muted">{m.label}:</span>
                    <span className="font-medium text-foreground">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {activeNode.sources && (
              <div>
                <span className="font-technical text-[10px] uppercase tracking-widest text-foreground-faint">
                  Active Modules / Sources
                </span>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {activeNode.sources.map((src) => (
                    <span
                      key={src}
                      className="rounded-sm border border-border-subtle bg-surface-subtle px-2 py-0.5 font-technical text-[11px] text-foreground"
                    >
                      {src}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
