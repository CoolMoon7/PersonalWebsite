"use client";

import { useEffect, useState } from "react";
import Logo from "@/components/Logo";

/**
 * Hero visual: one agent in the middle, the tools around it as floating app icons.
 * It cycles through agents Cole built; lines connect to the tools each one uses.
 */
const tools: { k: string; label: string; x: number; y: number }[] = [
  { k: "claude", label: "Claude Code", x: 50, y: 9 },
  { k: "codex", label: "Codex", x: 77, y: 14 },
  { k: "grok", label: "Grok bots", x: 91, y: 37 },
  { k: "meta-ai", label: "Meta Muse", x: 91, y: 63 },
  { k: "higgsfield", label: "Higgsfield", x: 77, y: 86 },
  { k: "instagram", label: "Instagram", x: 50, y: 91 },
  { k: "supabase", label: "Supabase", x: 23, y: 86 },
  { k: "python", label: "Python", x: 9, y: 63 },
  { k: "clay", label: "Clay", x: 9, y: 37 },
  { k: "apollo", label: "Apollo", x: 23, y: 14 },
  { k: "mcp", label: "MCP", x: 33, y: 24 },
  { k: "obsidian", label: "Obsidian", x: 67, y: 24 },
  { k: "hubspot", label: "HubSpot", x: 33, y: 76 },
  { k: "fastapi", label: "FastAPI", x: 67, y: 76 },
];

const agents: { name: string; org: string; task: string; uses: string[] }[] = [
  { name: "Certificate agent", org: "Hyperflow", task: "Reads the request, matches the policy, drafts the COI", uses: ["claude", "mcp", "fastapi", "python"] },
  { name: "Content engine", org: "RiZE Maps", task: "Finds trends, writes scripts, makes and scores reels", uses: ["grok", "meta-ai", "higgsfield", "instagram"] },
  { name: "Outbound engine", org: "Swoop Tutors", task: "Scores 10k companies, enriches, syncs, sequences", uses: ["clay", "python", "hubspot"] },
  { name: "Deal sourcing agent", org: "Dignity Properties", task: "Sources off-market deals, remembers every owner", uses: ["claude", "mcp", "supabase"] },
  { name: "Founder outreach", org: "Personal", task: "Researches each startup, writes one why-now line", uses: ["claude", "apollo", "clay", "hubspot"] },
  { name: "Cole OS", org: "20 agents", task: "One memory vault, scopes and spend caps for each agent", uses: ["codex", "claude", "obsidian", "supabase"] },
];

export default function ToolField() {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((n) => (n + 1) % agents.length), 3200);
    return () => clearInterval(id);
  }, []);

  const a = agents[i];

  return (
    <div className="relative aspect-square w-full max-w-[480px] mx-auto">
      <div className="absolute inset-[9%] rounded-full border border-dashed border-line-2" aria-hidden />
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" aria-hidden>
        {tools.map((t) => (
          <line key={t.k} x1={50} y1={50} x2={t.x} y2={t.y} vectorEffect="non-scaling-stroke"
            className={a.uses.includes(t.k) ? "tf-wire-on" : "tf-wire-off"} />
        ))}
      </svg>

      {tools.map((t, n) => {
        const on = a.uses.includes(t.k);
        return (
          <div key={t.k} className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5"
            style={{ left: `${t.x}%`, top: `${t.y}%` }}>
            <span
              className={`icon-tile grid place-items-center w-10 h-10 sm:w-12 sm:h-12 rounded-[22%] bg-white border transition-[opacity,border-color,box-shadow] duration-500 ${
                on ? "border-accent/40 opacity-100 tf-glow" : "border-black/[0.06] opacity-50"
              }`}
              style={{ "--fd": `${(n % 6) * -0.8}s`, "--fl": `${5 + (n % 3)}s` } as React.CSSProperties}
            >
              <Logo name={t.k} size={22} />
            </span>
            <span className={`hidden sm:block text-[10.5px] whitespace-nowrap transition-colors duration-500 ${on ? "text-foreground" : "text-faint"}`}>{t.label}</span>
          </div>
        );
      })}

      {/* The agent */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[44%] min-w-[160px]">
        <div className="relative rounded-2xl border border-line-2 bg-white p-3.5 shadow-[0_24px_50px_-24px_rgba(24,24,40,0.45)]">
          <span className="wf-agent-ring" />
          <div className="flex items-center justify-between font-mono text-[10px] text-muted">
            <span className="flex items-center gap-1.5"><span className="live-dot" /> running</span>
            <span>{i + 1}/{agents.length}</span>
          </div>
          <div key={i} className="tf-in">
            <div className="mt-2 text-[14px] font-semibold tracking-[-0.015em] leading-tight">{a.name}</div>
            <div className="font-mono text-[10.5px] text-accent mt-0.5">{a.org}</div>
            <div className="text-[11.5px] text-muted leading-snug mt-1.5">{a.task}</div>
          </div>
          <div className="mt-3 flex gap-1">
            {agents.map((_, n) => (
              <span key={n} className={`h-[3px] flex-1 rounded-full transition-colors duration-500 ${n === i ? "bg-accent" : "bg-line"}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
