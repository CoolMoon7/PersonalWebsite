"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { serviceBySlug } from "@/content/services";
import { stages, layers, short } from "@/content/map";

function Tile({ slug, active, onPick }: { slug: string; active: boolean; onPick: (s: string) => void }) {
  return (
    <button
      type="button"
      onClick={() => onPick(slug)}
      aria-pressed={active}
      className={`group w-full min-h-[48px] flex items-center gap-2.5 rounded-[10px] border px-3 py-2 text-left text-[14px] font-medium tracking-[-0.01em] transition-colors ${
        active ? "bg-foreground text-white border-foreground" : "bg-white border-line-2 hover:border-foreground"
      }`}
    >
      <Icon slug={slug} size={20} className={active ? "text-white" : "text-accent"} />
      {short[slug]}
    </button>
  );
}

/** The agency's policy lifecycle with every service pinned where it works. Tap one to see what I do. */
export default function ServiceMap({ initial = "coi-desk" }: { initial?: string }) {
  const [slug, setSlug] = useState(initial);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Hero chips ask the map to open a service.
    const on = (e: Event) => setSlug((e as CustomEvent<string>).detail);
    window.addEventListener("pick-service", on);
    return () => window.removeEventListener("pick-service", on);
  }, []);
  const pick = (x: string) => {
    setSlug(x);
    // On phones the detail sits far below the tiles, so bring it into view.
    if (window.innerWidth < 768) {
      const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      requestAnimationFrame(() => panel.current?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" }));
    }
  };
  const s = serviceBySlug(slug)!;
  return (
    <div>
      {/* Lifecycle */}
      <div className="relative">
        <div className="hidden md:block absolute left-0 right-0 top-[11px] h-px bg-line-2" aria-hidden />
        <ol className="grid grid-cols-1 md:grid-cols-5 gap-x-4 gap-y-6 relative">
          {stages.map((st, i) => (
            <li key={st.id} className="relative pl-7 md:pl-0 border-l md:border-l-0 border-line-2 ml-1 md:ml-0">
              <span className="absolute -left-[5px] md:left-0 top-1 md:top-[6px] w-[11px] h-[11px] rounded-full bg-white border-2 border-accent" aria-hidden />
              <div className="md:pt-7">
                <div className="flex items-baseline gap-2">
                  <span className="text-[17px] font-semibold tracking-[-0.02em]">{st.title}</span>
                  <span className="font-mono text-[11px] text-muted">{st.hint}</span>
                </div>
                <div className="mt-3 space-y-2">
                  {st.slugs.map((x) => (
                    <Tile key={x} slug={x} active={x === slug} onPick={pick} />
                  ))}
                </div>
              </div>
              <span className="sr-only">Stage {i + 1} of {stages.length}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Layers under the lifecycle */}
      <div className="mt-8 space-y-3">
        {layers.map((l) => (
          <div key={l.id} className="rounded-[14px] border border-line bg-surface/70 p-3 sm:p-4 grid grid-cols-1 md:grid-cols-[170px_1fr] gap-3 items-center">
            <div>
              <div className="text-[15px] font-semibold tracking-[-0.01em]">{l.title}</div>
              <div className="font-mono text-[11px] text-muted leading-snug">{l.hint}</div>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {l.slugs.map((x) => (
                <Tile key={x} slug={x} active={x === slug} onPick={pick} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* What I do: appears on tap */}
      <div ref={panel} className="mt-6 panel p-5 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 sm:items-start scroll-mt-20" aria-live="polite">
        <span className="w-11 h-11 rounded-full bg-foreground text-white flex items-center justify-center flex-none">
          <Icon slug={slug} size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[19px] font-semibold tracking-[-0.02em]">{s.name}</h3>
          <p className="text-[15px] text-ink-2 mt-1.5">{s.problem}</p>
          <p className="text-[14.5px] text-muted leading-relaxed mt-2 max-w-3xl">{s.does}</p>
        </div>
        <div className="flex sm:flex-col gap-3 sm:items-end flex-none">
          <Link href={`/contact?intent=quote&service=${s.slug}`} className="btn btn-dark whitespace-nowrap">Ask about this</Link>
          {s.href && <Link href={s.href} className="btn btn-ghost whitespace-nowrap">See the details</Link>}
        </div>
      </div>
    </div>
  );
}
