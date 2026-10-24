import fs from "node:fs";
import path from "node:path";
import Logo, { logoTitle } from "@/components/Logo";
import { cases, builtWith, systems, worked, type Mark } from "@/content/credibility";

const EXTS = ["svg", "png", "webp"];

/** Finds public/logos/<file>.<ext> at build time. */
function find(m: Mark): string | null {
  if (m.src) return m.src;
  for (const e of EXTS) {
    if (fs.existsSync(path.join(process.cwd(), "public", "logos", `${m.file}.${e}`))) return `/logos/${m.file}.${e}`;
  }
  return null;
}

export function MarkItem({ m, h = m.h ?? 28 }: { m: Mark; h?: number }) {
  const src = find(m);
  return src ? (
    // Local logo files of unknown size; next/image adds nothing here.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={m.name} height={h} width={h * 4} style={{ height: h, width: "auto", maxWidth: 160 }} className="mix-blend-multiply object-contain" loading="lazy" />
  ) : (
    <span className="font-semibold tracking-[-0.03em] text-ink-2 whitespace-nowrap" style={{ fontSize: h * 0.62 }}>
      {m.name}
    </span>
  );
}

/** A slow-moving row of marks. Still and wrapped under reduced motion. */
export function MarkMarquee({ items = worked }: { items?: Mark[] }) {
  items = items.filter((m) => find(m));
  const row = (hidden: boolean) => (
    <ul className="marquee-copy flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16 shrink-0" aria-hidden={hidden || undefined}>
      {[...items, ...items].map((m, i) => (
        <li key={`${m.name}-${i}`} className="flex items-center h-16" aria-hidden={i >= items.length || undefined}>
          <MarkItem m={m} />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden" role="group" aria-label="Where I have studied, built and worked">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function SystemsStrip() {
  return (
    <div className="panel p-5 sm:p-7">
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-8 items-center border-b border-line pb-5">
        <div>
          <div className="text-[15px] font-semibold tracking-[-0.01em]">Management systems</div>
          <div className="font-mono text-[11px] text-muted">I work around yours</div>
        </div>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-4">
          {systems.filter((m) => find(m)).map((m) => (
            <li key={m.name}><MarkItem m={m} /></li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-4 lg:gap-8 items-center pt-5">
        <div>
          <div className="text-[15px] font-semibold tracking-[-0.01em]">Tools I build with</div>
          <div className="font-mono text-[11px] text-muted">From my own projects</div>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3">
          {builtWith.map((k) => (
            <li key={k} className="flex items-center gap-2 text-[14px] text-ink-2">
              <Logo name={k} size={18} /> {k === "mcp" ? "MCP" : logoTitle(k)}
            </li>
          ))}
        </ul>
      </div>
      <p className="font-mono text-[11px] text-muted mt-5 leading-relaxed">
        Names and logos belong to their owners. I&apos;m independent, with no affiliation or endorsement implied. I confirm access to your system during the audit.
      </p>
    </div>
  );
}

export function CaseStudies() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {cases.map((c) => (
        <article key={c.org} className="panel p-5 sm:p-7 flex flex-col">
          <header className="flex items-start justify-between gap-4 pb-4 border-b border-line">
            <div className="min-w-0">
              <h3 className="text-[20px] font-semibold tracking-[-0.025em]">{c.org}</h3>
              <p className="font-mono text-[11.5px] text-muted mt-1">{c.role} · {c.period}</p>
            </div>
            <div className="flex-none flex items-center"><MarkItem m={c.mark} h={Math.min((c.mark.h ?? 28) + 8, 64)} /></div>
          </header>

          <div className="eyebrow mt-5">The problem</div>
          <p className="text-[15px] font-medium tracking-[-0.01em] mt-1.5">{c.problem}</p>

          <div className="eyebrow mt-5">What I built</div>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 mt-2">
            {c.flow.map((f, i) => (
              <li key={f} className="flex items-center gap-2">
                <span className="rounded-full border border-line-2 bg-white px-3 py-1 text-[13px] font-medium">{f}</span>
                {i < c.flow.length - 1 && <span className="text-faint" aria-hidden>→</span>}
              </li>
            ))}
          </ol>

          <div className="eyebrow mt-5">The result</div>
          <dl className="mt-2 grid grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {c.stats.map((s) => (
              <div key={s.l} className="bg-white px-3.5 py-3">
                <dt className="sr-only">{s.l}</dt>
                <dd className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.04em] leading-none">{s.v}</dd>
                <div className="font-mono text-[10.5px] text-muted mt-1.5" aria-hidden>{s.l}</div>
              </div>
            ))}
          </dl>
          <p className="text-[14px] text-ink-2 leading-relaxed mt-3">{c.result}</p>

          <ul className="mt-auto pt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
            {c.tools.map((t) => (
              <li key={t}><Logo name={t} size={18} /></li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
