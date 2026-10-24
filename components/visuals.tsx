"use client";

import { useState } from "react";
import Link from "next/link";
import { weeklyReport, trust, cta } from "@/data/home";
import { Arrow } from "@/components/ui";

/** Choose → Connect → Run → Keep current, as one line. */
export function VerbLine() {
  const v = ["Choose", "Connect", "Run", "Keep current"];
  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="What I do">
      {v.map((x, i) => (
        <li key={x} className="flex items-center gap-3">
          <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
          <span className="text-[17px] sm:text-[20px] font-semibold tracking-[-0.03em]">{x}</span>
          {i < v.length - 1 && <span className="text-faint" aria-hidden>→</span>}
        </li>
      ))}
    </ol>
  );
}

/** The four things that go wrong, as headlines only. */
export function ProblemStrip() {
  const p = ["Tools bought, then abandoned", "AI in your AMS nobody switched on", "Client data in personal chatbots", "No one measuring what works"];
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 border-y border-line-2 divide-x divide-y lg:divide-y-0 divide-line-2">
      {p.map((x) => (
        <li key={x} className="px-4 py-5 text-[15px] sm:text-[16px] font-medium tracking-[-0.01em] leading-snug">{x}</li>
      ))}
    </ul>
  );
}

/** Audit → Department → Add services, with the cadence underneath. */
export function EngagementFlow() {
  const steps = [
    { n: "1", t: "AI audit", when: "Week 1", tag: "Fixed fee" },
    { n: "2", t: "Your AI department", when: "First win by week 2 · systems connected by day 60", tag: "Monthly" },
    { n: "3", t: "Add services", when: "One at a time, as each earns its place", tag: "Setup + monthly" },
  ];
  const cadence = [
    ["Friday", "Report"],
    ["Monthly", "What's new"],
    ["Quarterly", "One improvement"],
    ["Any time", "On call"],
  ];
  return (
    <div>
      <ol className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-0">
        {steps.map((s, i) => (
          <li key={s.n} className="relative md:pr-8">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-foreground text-white flex items-center justify-center font-mono text-[13px] flex-none">{s.n}</span>
              <span className="hidden md:block flex-1 h-px bg-line-2" aria-hidden={i === steps.length - 1} style={{ visibility: i === steps.length - 1 ? "hidden" : "visible" }} />
            </div>
            <h3 className="text-[20px] font-semibold tracking-[-0.025em] mt-3">{s.t}</h3>
            <p className="font-mono text-[11.5px] text-muted mt-1 leading-snug max-w-[260px]">{s.when}</p>
            <span className="chip mt-3">{s.tag}</span>
          </li>
        ))}
      </ol>
      <div className="mt-8 rounded-[14px] border border-line bg-surface/70 p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {cadence.map(([a, b]) => (
          <div key={a}>
            <div className="eyebrow">{a}</div>
            <div className="text-[16px] font-semibold tracking-[-0.02em] mt-1">{b}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** How a quote is built, with no numbers. */
export function QuoteFlow() {
  const rows = [
    { t: "The audit", tag: "One fixed fee", note: "Credited if you continue" },
    { t: "The AI department", tag: "One monthly fee", note: "Set by team size" },
    { t: "Each service you add", tag: "Setup once + monthly", note: "Quoted in writing first" },
    { t: "Software", tag: "Vendor bills you", note: "No markup from me" },
  ];
  return (
    <div className="panel overflow-hidden">
      <ul className="divide-y divide-line">
        {rows.map((r, i) => (
          <li key={r.t} className="grid grid-cols-[28px_1fr] sm:grid-cols-[28px_1fr_190px_190px] gap-x-4 gap-y-1 items-center px-4 sm:px-6 py-4">
            <span className="font-mono text-[12px] text-accent">0{i + 1}</span>
            <span className="text-[16px] sm:text-[17px] font-semibold tracking-[-0.02em]">{r.t}</span>
            <span className="chip col-start-2 sm:col-start-auto justify-self-start">{r.tag}</span>
            <span className="text-[13px] text-muted col-start-2 sm:col-start-auto sm:w-44 sm:text-right">{r.note}</span>
          </li>
        ))}
      </ul>
      <div className="px-4 sm:px-6 py-3 bg-surface/70 border-t border-line flex flex-wrap items-center justify-between gap-3 text-[13.5px]">
        <span><strong className="font-semibold">12-month partnership:</strong> reduced setup fees. You keep the policy, procedures and prompt library.</span>
        <Link href={cta.quote.href} className="text-accent underline underline-offset-4 min-h-[44px] inline-flex items-center">Request a quote <Arrow /></Link>
      </div>
    </div>
  );
}

function Bars({ values }: { values: number[] }) {
  const max = Math.max(...values);
  return (
    <svg viewBox="0 0 70 28" preserveAspectRatio="none" className="w-full h-9" aria-hidden>
      {values.map((v, i) => (
        <rect key={i} x={i * 10 + 1.5} y={28 - (v / max) * 26} width="7" height={(v / max) * 26} rx="1.5" className={i === values.length - 1 ? "fill-[#2f5bff]" : "fill-[#d4d4d8]"} />
      ))}
    </svg>
  );
}

/** A glanceable version of the Friday report. All numbers are examples. */
export function ReportMock() {
  const k = [
    { l: "Certificates issued", v: "21", s: [12, 15, 14, 18, 17, 19, 21] },
    { l: "Calls answered", v: "61", s: [44, 52, 49, 58, 55, 60, 61] },
    { l: "Renewals reviewed", v: "5", s: [2, 3, 3, 4, 4, 5, 5] },
    { l: "Tool updates handled", v: "1", s: [0, 1, 0, 2, 1, 1, 1] },
  ];
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-line bg-surface/70">
        <span className="font-mono text-[12px] text-muted">Friday, 8am · your report</span>
        <span className="chip !h-6 !text-[10.5px]">example numbers</span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-line">
        {k.map((x) => (
          <div key={x.l} className="p-4 sm:p-5">
            <div className="text-[34px] sm:text-[42px] font-semibold tracking-[-0.05em] leading-none tabular-nums">{x.v}</div>
            <div className="text-[13px] text-muted mt-2 mb-3">{x.l}</div>
            <Bars values={x.s} />
          </div>
        ))}
      </div>
      <div className="px-4 sm:px-6 py-3.5 border-t border-line flex items-start gap-3 text-[14.5px]">
        <span className="mt-0.5 w-5 h-5 rounded-full bg-accent text-white text-[12px] flex items-center justify-center flex-none" aria-hidden>?</span>
        <span>{weeklyReport.decision}</span>
      </div>
    </div>
  );
}

/** What I won't do: titles up front, the detail on tap. */
export function Limits({ items = trust.items }: { items?: { title: string; body: string }[] }) {
  const [i, setI] = useState(0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
        {items.map((x, n) => (
          <li key={x.title}>
            <button
              type="button"
              onClick={() => setI(n)}
              aria-pressed={i === n}
              className={`w-full min-h-[48px] rounded-[10px] border px-4 py-2.5 text-left text-[14.5px] font-medium tracking-[-0.01em] flex items-center gap-3 transition-colors ${
                i === n ? "bg-foreground text-white border-foreground" : "bg-white border-line-2 hover:border-foreground"
              }`}
            >
              <span className={`font-mono text-[11px] ${i === n ? "text-white/70" : "text-accent"}`}>✕</span>
              {x.title}
            </button>
          </li>
        ))}
      </ul>
      <div className="panel p-5 sm:p-7 lg:sticky lg:top-24 self-start" aria-live="polite">
        <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{items[i].title}</h3>
        <p className="text-[15px] text-ink-2 leading-relaxed mt-3">{items[i].body}</p>
        <Link href="/trust" className="inline-flex items-center min-h-[44px] mt-3 text-[14px] text-accent underline underline-offset-4">Read the full page</Link>
      </div>
    </div>
  );
}
