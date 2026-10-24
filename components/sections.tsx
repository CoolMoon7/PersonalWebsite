import Link from "next/link";
import { Arrow } from "@/components/ui";
import { cta, verbs, cadence, timeline, faq, weeklyReport, partnership } from "@/data/home";
import { pricing, department } from "@/data/pricing";
import { services, serviceGroups } from "@/content/services";

export const EYEBROW = "font-mono text-[11px] tracking-[0.08em] uppercase text-muted";

/** The two buttons used everywhere, with consistent wording. */
export function CtaPair({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link href={cta.audit.href} className="btn btn-dark">
        {cta.audit.label} <Arrow />
      </Link>
      <Link href={cta.quote.href} className="btn btn-ghost">
        {cta.quote.label}
      </Link>
    </div>
  );
}

export function ClosingCta({ title }: { title: string }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
      <div className="panel px-6 py-12 sm:px-14 sm:py-16">
        <h2 className="text-[28px] sm:text-[40px] font-semibold tracking-[-0.04em] leading-[1.08] max-w-2xl">{title}</h2>
        <CtaPair className="mt-8" />
      </div>
    </section>
  );
}

export function Problem({ title, blocks, close }: { title: string; blocks: { title: string; body: string }[]; close: string }) {
  return (
    <>
      <h3 className="text-[22px] sm:text-[28px] font-semibold tracking-[-0.03em] leading-tight max-w-3xl mb-6">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
        {blocks.map((b) => (
          <div key={b.title} className="bg-white p-5 sm:p-6">
            <h4 className="text-[16px] font-semibold tracking-[-0.01em]">{b.title}</h4>
            <p className="text-[14px] text-muted leading-relaxed mt-2">{b.body}</p>
          </div>
        ))}
      </div>
      <p className="text-[17px] text-ink-2 mt-5">{close}</p>
    </>
  );
}

export function VerbCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {verbs.map((v) => (
        <div key={v.k} className="panel p-5 sm:p-6">
          <div className="font-mono text-[11px] text-accent">{v.k}</div>
          <h3 className="text-[20px] font-semibold tracking-[-0.02em] mt-2">{v.title}</h3>
          <p className="text-[14px] text-muted leading-relaxed mt-2">{v.body}</p>
        </div>
      ))}
    </div>
  );
}

export function CadenceStrip() {
  return (
    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden mt-4">
      {cadence.map((c) => (
        <li key={c.when} className="bg-white p-4 sm:p-5">
          <div className="eyebrow">{c.when}</div>
          <p className="text-[13.5px] text-ink-2 leading-relaxed mt-2">{c.what}</p>
        </li>
      ))}
    </ul>
  );
}

export function Timeline() {
  return (
    <ol className="grid grid-cols-1 md:grid-cols-4 gap-4 relative">
      {timeline.map((t, i) => (
        <li key={t.when} className="panel p-5 relative">
          <div className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")} · {t.when}</div>
          <p className="text-[16px] font-medium tracking-[-0.01em] mt-2">{t.what}</p>
        </li>
      ))}
    </ol>
  );
}

export function ServiceGrid({ compact = false, groupLevel = 3 }: { compact?: boolean; groupLevel?: 2 | 3 }) {
  const GroupH = (groupLevel === 2 ? "h2" : "h3") as "h2" | "h3";
  const CardH = (groupLevel === 2 ? "h3" : "h4") as "h3" | "h4";
  return (
    <div className="space-y-10">
      {serviceGroups.map((g) => (
        <div key={g.group}>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-4">
            <GroupH className="text-[18px] font-semibold tracking-[-0.02em]">{g.group}</GroupH>
            <p className="text-[13.5px] text-muted">{g.blurb}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services
              .filter((s) => s.group === g.group)
              .map((s) => (
                <div key={s.slug} className="panel p-5 sm:p-6 flex flex-col hover:border-[#d4d4d8] transition-colors">
                  <CardH className="text-[16px] font-semibold tracking-[-0.01em]">{s.name}</CardH>
                  <p className="text-[14px] text-ink-2 leading-relaxed mt-2">{s.problem}</p>
                  {!compact && <p className="text-[14px] text-muted leading-relaxed mt-2">{s.does}</p>}
                  <div className="mt-auto pt-4 flex flex-wrap gap-x-5 gap-y-1 text-[13.5px]">
                    <Link
                      href={`/contact?intent=quote&service=${s.slug}`}
                      className="text-accent underline underline-offset-4 min-h-[44px] inline-flex items-center"
                    >
                      Ask about this
                    </Link>
                    {s.href && (
                      <Link href={s.href} className="text-ink-2 underline underline-offset-4 min-h-[44px] inline-flex items-center">
                        Details
                      </Link>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DepartmentCard() {
  return (
    <div className="panel p-6 sm:p-8">
      <div className={EYEBROW}>{department.heading}</div>
      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
        {department.items.map((i) => (
          <li key={i} className="flex gap-3 text-[15px] text-ink-2 leading-relaxed">
            <span className="text-accent font-mono text-[13px] pt-0.5">+</span>
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function PricingCard() {
  return (
    <>
      <div className="panel p-6 sm:p-8">
        <h3 className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.03em]">{pricing.heading}</h3>
        <ol className="mt-6 space-y-5">
          {pricing.items.map((p, i) => (
            <li key={p.title} className="grid grid-cols-[28px_1fr] gap-2">
              <span className="font-mono text-[12px] text-accent pt-1">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <div className="text-[16px] font-medium tracking-[-0.01em]">{p.title}</div>
                <p className="text-[14.5px] text-muted leading-relaxed mt-1">
                  {p.body}
                  {p.price ? <span className="text-foreground"> {p.price}</span> : null}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-[14.5px] text-ink-2 leading-relaxed mt-6 pt-5 border-t border-line">{pricing.keep}</p>
      </div>
      <CtaPair className="mt-5" />
      <p className="font-mono text-[11.5px] text-muted mt-3">{pricing.quoteLine}</p>
    </>
  );
}

export function Partnership() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="panel p-6 sm:p-8">
        <h3 className="text-[22px] font-semibold tracking-[-0.03em]">{partnership.title}</h3>
        <p className="text-[15px] text-ink-2 leading-relaxed mt-3">{partnership.body}</p>
        <p className="text-[15px] text-ink-2 leading-relaxed mt-3">
          <strong className="text-foreground font-semibold">What stays yours.</strong> {partnership.keeps}
        </p>
        <CtaPair className="mt-6" />
      </div>
      <DepartmentCard />
    </div>
  );
}

export function Faq() {
  return (
    <div className="panel divide-y divide-line">
      {faq.map((f, i) => (
        <details key={f.q} className="group px-5 sm:px-6" open={i === 0}>
          <summary className="list-none cursor-pointer min-h-[56px] py-4 flex items-center justify-between gap-4 text-[16px] font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
            {f.q}
            <span className="text-faint font-mono group-open:rotate-45 transition-transform" aria-hidden>+</span>
          </summary>
          <p className="text-[14.5px] text-muted leading-relaxed pb-5 max-w-3xl">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function WeeklyReport() {
  return (
    <div className="panel p-5 sm:p-8">
      <h3 className="text-[19px] sm:text-[22px] font-semibold tracking-[-0.025em]">{weeklyReport.title}</h3>
      <p className="text-[14.5px] text-muted leading-relaxed mt-2.5 max-w-2xl">{weeklyReport.body}</p>
      <div className="mt-6 rounded-xl border border-line-2 bg-surface/60 p-4 font-mono text-[12px] text-ink-2">
        <div className="flex flex-wrap items-center gap-2 text-muted mb-3">
          <span>{weeklyReport.logTitle}</span>
          <span className="chip !h-5 !text-[10px]">example week</span>
        </div>
        <div className="space-y-4">
          {weeklyReport.sections.map((s) => (
            <div key={s.name}>
              <div className="text-foreground">{s.name}</div>
              <ul className="space-y-1.5 leading-relaxed mt-1">
                {s.lines.map((l) => (
                  <li key={l} className="flex gap-2">
                    <span className="text-accent">+</span>
                    <span className="min-w-0">{l}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="pt-3 border-t border-line-2 text-foreground flex gap-2">
            <span className="text-accent">?</span>
            <span>{weeklyReport.decision}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Boundaries({ items, level = 3 }: { items: { title: string; body: string }[]; level?: 2 | 3 }) {
  const H = (level === 2 ? "h2" : "h3") as "h2" | "h3";
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((n) => (
        <div key={n.title} className="panel p-5 sm:p-6">
          <H className="text-[15.5px] font-semibold tracking-[-0.01em]">{n.title}</H>
          <p className="text-[14px] text-muted leading-relaxed mt-2">{n.body}</p>
        </div>
      ))}
    </div>
  );
}

export function PageHeader({ eyebrow, title, lede, children }: { eyebrow: string; title: string; lede?: string; children?: React.ReactNode }) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
      <div className={`${EYEBROW} mb-4`}>{eyebrow}</div>
      <h1 className="rise text-[34px] leading-[1.05] sm:text-[52px] font-semibold tracking-[-0.04em] max-w-4xl">{title}</h1>
      {lede && <p className="rise mt-6 text-[17px] sm:text-[19px] text-ink-2 leading-relaxed max-w-2xl">{lede}</p>}
      {children}
    </section>
  );
}
