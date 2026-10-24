"use client";

import Icon from "@/components/Icon";
import { services } from "@/content/services";
import { short } from "@/content/map";

/** Every service as a chip. Tapping one jumps to the map and opens it. */
export default function HeroChips() {
  const go = (slug: string) => {
    window.dispatchEvent(new CustomEvent("pick-service", { detail: slug }));
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("map")?.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "start" });
  };
  return (
    <ul className="flex flex-wrap gap-2">
      {services.map((s) => (
        <li key={s.slug}>
          <button
            type="button"
            onClick={() => go(s.slug)}
            className="inline-flex items-center gap-2 min-h-[44px] rounded-full border border-line-2 bg-white px-4 text-[14px] font-medium tracking-[-0.01em] hover:border-foreground transition-colors"
          >
            <Icon slug={s.slug} size={17} className="text-accent" />
            {short[s.slug]}
          </button>
        </li>
      ))}
    </ul>
  );
}
