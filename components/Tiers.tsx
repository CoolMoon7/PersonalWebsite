"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { tiers, short } from "@/content/map";

const HEIGHTS = ["h-20", "h-28", "h-36", "h-44"];

/** Four steps from first tools to an agentic agency. Pick a step to see what it adds. */
export default function Tiers() {
  const [n, setN] = useState(1);
  const sel = tiers.find((t) => t.n === n)!;
  const included = tiers.filter((t) => t.n <= n);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6 lg:gap-10 items-end">
      <div role="tablist" aria-label="Levels" className="flex items-end gap-2 sm:gap-3">
        {tiers.map((t, i) => (
          <button
            key={t.n}
            role="tab"
            id={`tier-${t.n}`}
            aria-selected={n === t.n}
            aria-controls="tier-panel"
            onClick={() => setN(t.n)}
            className={`flex-1 ${HEIGHTS[i]} rounded-t-[12px] border px-2 sm:px-3 pb-3 flex flex-col justify-end text-left transition-colors ${
              n === t.n ? "bg-foreground text-white border-foreground" : t.n < n ? "bg-surface border-line-2 text-ink-2" : "bg-white border-line-2 hover:border-foreground"
            }`}
          >
            <span className="font-mono text-[11px] opacity-70">Level {t.n}</span>
            <span className="text-[14px] sm:text-[16px] font-semibold tracking-[-0.02em] leading-tight">{t.name}</span>
          </button>
        ))}
      </div>

      <div id="tier-panel" role="tabpanel" aria-labelledby={`tier-${n}`} className="min-w-0">
        <h3 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.03em]">{sel.name}</h3>
        <p className="text-[15.5px] text-ink-2 mt-1.5">{sel.line}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {included.flatMap((t) =>
            t.slugs.map((slug) => (
              <Link
                key={slug}
                href={`/contact?intent=quote&service=${slug}`}
                className={`inline-flex items-center gap-2 min-h-[40px] rounded-full border px-3.5 text-[13.5px] ${
                  t.n === n ? "border-foreground bg-white font-medium" : "border-line text-muted"
                }`}
              >
                <Icon slug={slug} size={16} className={t.n === n ? "text-accent" : ""} />
                {short[slug]}
              </Link>
            )),
          )}
        </div>
        <p className="font-mono text-[11.5px] text-muted mt-3">
          {n === 1 ? "Start anywhere; the audit shows where." : "Includes every level below it."} Each service is quoted separately.
        </p>
      </div>
    </div>
  );
}
