import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Workflow from "@/components/Workflow";
import { Status, StackRow, Arrow } from "@/components/ui";
import { systems, getSystem } from "@/data/systems";
import { site } from "@/data/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return systems.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const sys = getSystem((await params).slug);
  if (!sys) return {};
  return {
    title: `${sys.client}: ${sys.name}`,
    description: sys.oneLiner,
    alternates: { canonical: `/systems/${sys.slug}` },
  };
}

function Funnel({ steps }: { steps: NonNullable<ReturnType<typeof getSystem>>["funnel"] }) {
  if (!steps?.length) return null;
  // log scale so a 10,000 → 3 funnel stays readable
  const max = Math.log10(Math.max(...steps.map((s) => s.value)) + 1);
  return (
    <div className="panel p-5 sm:p-6">
      <div className="eyebrow mb-5">Run summary</div>
      <ol className="space-y-3">
        {steps.map((s, i) => {
          const w = Math.max(6, (Math.log10(s.value + 1) / max) * 100);
          return (
            <li key={s.label} className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 items-baseline">
              <span className="text-[13.5px] text-ink-2">{s.label}</span>
              <span className="font-mono text-[13px] tabular-nums font-medium">{s.display ?? s.value.toLocaleString()}</span>
              <span className="col-span-2 h-2 rounded-full bg-surface border border-line overflow-hidden">
                <span
                  className="block h-full rounded-full rise"
                  style={{
                    width: `${w}%`,
                    background: i === steps.length - 1 ? "#2f5bff" : "#0a0a0a",
                    opacity: 1 - i * 0.1,
                    "--rd": `${0.1 + i * 0.08}s`,
                  } as React.CSSProperties}
                />
              </span>
            </li>
          );
        })}
      </ol>
      <p className="font-mono text-[10.5px] text-faint mt-5">bar length on a log scale</p>
    </div>
  );
}

export default async function SystemPage({ params }: { params: Promise<{ slug: string }> }) {
  const sys = getSystem((await params).slug);
  if (!sys) notFound();
  const idx = systems.indexOf(sys);
  const next = systems[(idx + 1) % systems.length];

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
      <Link href="/gtm#systems" className="font-mono text-[12px] text-muted hover:text-foreground">
        ← all systems
      </Link>

      <header className="mt-6 rise">
        <div className="flex flex-wrap items-center gap-2">
          <Status s={sys.status} />
          <span className="chip">{sys.client}</span>
          <span className="chip">{sys.category}</span>
          <span className="chip">{sys.period}</span>
        </div>
        <h1 className="mt-6 text-[38px] sm:text-[56px] font-semibold tracking-[-0.045em] leading-[1.03] max-w-3xl">
          {sys.name}
        </h1>
        <p className="mt-5 text-[17px] sm:text-[19px] text-ink-2 leading-relaxed max-w-3xl">{sys.oneLiner}</p>
        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
          <span className="font-mono text-[12px] text-muted flex-none">{sys.role}</span>
          <StackRow stack={sys.stack} />
        </div>
      </header>

      <div className="mt-10 rise" style={{ "--rd": "0.1s" } as React.CSSProperties}>
        <Workflow wf={sys.workflow} title={`~/systems/${sys.slug}`} />
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-muted px-1">
          <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded border border-line-2 bg-white" /> tool</span>
          <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded bg-gradient-to-br from-accent via-purple-500 to-orange-500" /> agent</span>
          <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded border border-dashed border-ink-2 bg-white" /> gate / human</span>
          <span className="flex items-center gap-1.5"><i className="w-2.5 h-2.5 rounded-full bg-accent" /> record in flight</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
        {sys.metrics.map((m) => (
          <div key={m.label} className="bg-white p-5 sm:p-6">
            <div className="text-[28px] sm:text-[36px] font-semibold tracking-[-0.04em] tabular-nums leading-none">{m.value}</div>
            <div className="font-mono text-[11px] text-muted mt-2">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-14">
        <div className="space-y-14">
          <section>
            <div className="eyebrow mb-3">Problem</div>
            <p className="text-[17px] leading-relaxed text-ink-2">{sys.problem}</p>
          </section>

          <section>
            <div className="eyebrow mb-5">Architecture</div>
            <ol className="relative border-l border-line-2 ml-2 space-y-7">
              {sys.architecture.map((a, i) => (
                <li key={a.title} className="pl-6 relative">
                  <span className="absolute -left-[5px] top-1.5 w-[9px] h-[9px] rounded-full bg-white border-2 border-foreground" />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{a.title}</h3>
                  </div>
                  <p className="text-[15.5px] text-muted leading-relaxed mt-1.5">{a.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section>
            <div className="eyebrow mb-5">Design decisions</div>
            <ul className="space-y-3">
              {sys.decisions.map((d) => (
                <li key={d} className="panel p-4 sm:p-5 text-[15.5px] leading-relaxed text-ink-2 flex gap-3">
                  <span className="font-mono text-accent flex-none">→</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <div className="eyebrow mb-3">Results</div>
            <p className="text-[17px] leading-relaxed text-foreground">{sys.results}</p>
            {sys.next.length > 0 && (
              <>
                <div className="eyebrow mt-10 mb-3">What I&apos;d build next</div>
                <ul className="space-y-2 text-[15.5px] text-muted">
                  {sys.next.map((n) => (
                    <li key={n} className="flex gap-3"><span className="font-mono text-faint">+</span>{n}</li>
                  ))}
                </ul>
              </>
            )}
          </section>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-20 self-start">
          <Funnel steps={sys.funnel} />
          <div className="rounded-[14px] bg-[#0a0a0a] text-[#d4d4d8] overflow-hidden">
            <div className="flex items-center justify-between px-4 h-10 border-b border-white/10">
              <span className="font-mono text-[11px] text-[#a1a1aa]">run.log</span>
              <span className="font-mono text-[10px] text-[#71717a]">representative run</span>
            </div>
            <pre className="font-mono text-[11.5px] leading-[1.8] p-4 overflow-x-auto">
              {sys.log.map((l, i) => (
                <div
                  key={i}
                  className={`rise ${l.startsWith("✓") ? "text-[#4ade80]" : l.trim().startsWith("✗") ? "text-[#f87171]" : l.startsWith("$") ? "text-white" : ""}`}
                  style={{ "--rd": `${0.3 + i * 0.12}s` } as React.CSSProperties}
                >
                  {l}
                </div>
              ))}
            </pre>
          </div>
          <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Re: ${sys.name}`)}`} className="btn btn-ghost w-full justify-center">
            Want this for your team? <Arrow />
          </a>
        </aside>
      </div>

      <Link href={`/systems/${next.slug}`} className="group mt-24 panel p-6 sm:p-8 flex items-center justify-between gap-6 hover:border-[#d4d4d8] transition-colors">
        <div>
          <div className="eyebrow">Next system</div>
          <div className="text-[22px] sm:text-[28px] font-semibold tracking-[-0.03em] mt-2">
            {next.client}: {next.name}
          </div>
        </div>
        <span className="text-[24px] text-faint group-hover:text-foreground group-hover:translate-x-1 transition-all">→</span>
      </Link>
    </article>
  );
}
