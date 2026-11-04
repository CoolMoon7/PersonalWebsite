"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

/**
 * Hero visual: the tools in Cole's actual systems drifting around a running agent,
 * with a log of real events from those systems ticking underneath.
 * Positions are % of the field; every tool here appears in data/systems.ts or data/fde.ts.
 */
const tools: { k: string; label: string; x: number; y: number }[] = [
  { k: "claude", label: "Claude Code", x: 50, y: 6 },
  { k: "mcp", label: "MCP", x: 74, y: 12 },
  { k: "openai", label: "OpenAI", x: 86, y: 30 },
  { k: "hermes", label: "Hermes agents", x: 85, y: 54 },
  { k: "openclaw", label: "OpenClaw", x: 82, y: 76 },
  { k: "supabase", label: "Supabase", x: 62, y: 90 },
  { k: "fastapi", label: "FastAPI", x: 38, y: 92 },
  { k: "postgres", label: "Postgres", x: 17, y: 80 },
  { k: "python", label: "Python", x: 11, y: 58 },
  { k: "clay", label: "Clay", x: 12, y: 33 },
  { k: "apollo", label: "Apollo", x: 25, y: 13 },
  { k: "firecrawl", label: "Firecrawl", x: 31, y: 33 },
  { k: "instantly", label: "Instantly", x: 70, y: 34 },
  { k: "hubspot", label: "HubSpot", x: 28, y: 66 },
  { k: "higgsfield", label: "Higgsfield", x: 72, y: 64 },
  { k: "zapier", label: "Zapier", x: 50, y: 76 },
];

const events: { sys: string; msg: string; tone?: "ok" | "block" | "wait" }[] = [
  { sys: "coi-agent", msg: "classified email → certificate request", tone: "ok" },
  { sys: "coi-agent", msg: "mcp.match_policy → GL policy found", tone: "ok" },
  { sys: "coi-agent", msg: "risk gate → blocked: insured not on policy", tone: "block" },
  { sys: "swoop-outbound", msg: "clay table scored → 3,000 accounts qualified", tone: "ok" },
  { sys: "rize-growth", msg: "reel scored 2.4× median → tagged winner", tone: "ok" },
  { sys: "rize-hospitality", msg: "118 properties → drafts waiting for approval", tone: "wait" },
  { sys: "cole-os", msg: "pre-commit scope check → 20 agents within budget", tone: "ok" },
  { sys: "dignity", msg: "off-market lead → owner recalled from memory", tone: "ok" },
  { sys: "founder-outreach", msg: "why-now line written → variant B queued", tone: "wait" },
  { sys: "rize-growth", msg: "meta ad above 2× target CPA → paused", tone: "block" },
  { sys: "coi-agent", msg: "correction saved → added to golden eval set", tone: "ok" },
];

const toneClass = { ok: "text-[#16a34a]", block: "text-[#dc2626]", wait: "text-[#d97706]" } as const;
const toneWord = { ok: "ok", block: "block", wait: "hold" } as const;

function stamp(offset: number) {
  const d = new Date(Date.UTC(2026, 10, 4, 14, 2, 0) + offset * 7000);
  return d.toISOString().slice(11, 19);
}

export default function ToolField() {
  const [tick, setTick] = useState(5);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), 1900);
    return () => clearInterval(id);
  }, []);

  const lines = Array.from({ length: 5 }, (_, i) => {
    const n = tick - 4 + i;
    return { n, ...events[((n % events.length) + events.length) % events.length] };
  });
  const active = lines[lines.length - 1];

  return (
    <div className="panel relative overflow-hidden">
      {/* Field */}
      <div className="relative h-[340px] sm:h-[420px] [background-image:radial-gradient(circle_at_1px_1px,#e4e4e7_1px,transparent_0)] [background-size:20px_20px]">
        <svg className="absolute inset-0 w-full h-full" aria-hidden preserveAspectRatio="none" viewBox="0 0 100 100">
          {tools.map((t) => (
            <line key={t.k} x1="50" y1="48" x2={t.x} y2={t.y} className="tf-wire" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>

        {tools.map((t, i) => (
          <div
            key={t.k}
            className="tf-float absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${t.x}%`, top: `${t.y}%`, "--fd": `${(i % 5) * -1.3}s`, "--fl": `${6 + (i % 4)}s` } as React.CSSProperties}
          >
            <span className="flex items-center gap-1.5 rounded-full border border-line bg-white/95 pl-1.5 pr-2.5 h-8 shadow-[0_6px_18px_-10px_rgba(24,24,40,0.35)] text-[12px] text-ink-2 whitespace-nowrap">
              <Logo name={t.k} size={16} />
              <span className={i % 3 === 2 ? "hidden sm:inline" : ""}>{t.label}</span>
            </span>
          </div>
        ))}

        {/* The agent in the middle */}
        <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[210px] sm:w-[250px]">
          <div className="relative rounded-xl border border-line-2 bg-white px-4 py-3 shadow-[0_18px_40px_-20px_rgba(24,24,40,0.45)]">
            <span className="wf-agent-ring" />
            <div className="flex items-center gap-2 font-mono text-[10.5px] text-muted">
              <span className="live-dot" /> agent · running
            </div>
            <div className="mt-1.5 text-[13.5px] font-medium tracking-[-0.01em] text-foreground truncate">{active.sys}</div>
            <div key={active.n} className="tf-in font-mono text-[11px] text-muted mt-0.5 truncate">{active.msg}</div>
          </div>
        </div>
      </div>

      {/* Log */}
      <div className="border-t border-line bg-[#0a0a0a] px-4 py-3 font-mono text-[11px] sm:text-[11.5px] leading-[1.7] text-[#a1a1aa]" aria-live="off">
        {lines.map((l) => (
          <div key={l.n} className="tf-in flex gap-3 whitespace-nowrap overflow-hidden">
            <span className="text-[#52525b] hidden sm:inline">{stamp(l.n)}</span>
            <span className={`${toneClass[l.tone ?? "ok"]} w-9 flex-none`}>{toneWord[l.tone ?? "ok"]}</span>
            <span className="text-[#e4e4e7] flex-none">{l.sys}</span>
            <span className="truncate">{l.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
