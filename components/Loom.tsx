import AgentSystem from "@/components/AgentSystem";
import { Arrow, SectionHead } from "@/components/ui";
import { site } from "@/data/site";
import { exampleFor, systemStepsFor, type LoomContent, type LoomSignal, type LoomStage } from "@/lib/loom";

const section = "max-w-6xl mx-auto px-4 sm:px-6 mt-28";

function bareDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/* ---------------- Header and footer ---------------- */

export function LoomHeader({ name }: { name: string }) {
  return (
    <div className="border-b border-line bg-white/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-11 flex items-center justify-between gap-4 font-mono text-[11.5px] text-muted">
        <span className="truncate">A page for {name}</span>
        <a href={site.url} className="hover:text-foreground whitespace-nowrap">
          colebonawitz.com <span className="text-faint">↗</span>
        </a>
      </div>
    </div>
  );
}

export function LoomFooter() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
      <div className="border-t border-line pt-6 flex flex-col sm:flex-row gap-3 sm:items-center justify-between font-mono text-[12px] text-muted">
        <span>Cole Bonawitz · GTM engineer</span>
        <span className="flex flex-wrap gap-x-5 gap-y-2">
          <a href={`mailto:${site.email}`} className="hover:text-foreground">{site.email}</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">linkedin</a>
          <a href={site.url} className="hover:text-foreground">colebonawitz.com</a>
        </span>
      </div>
    </section>
  );
}

/* ---------------- 1. Them ---------------- */

export function ThemSection({ c }: { c: LoomContent }) {
  const { company, meta } = c;
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20">
      <div className="rise flex flex-wrap items-center gap-2 mb-8">
        <span className="chip"><span className="live-dot" /> Built for {company.name}</span>
        {company.hq && <span className="chip">{company.hq}</span>}
        {company.stage && <span className="chip">{company.stage}</span>}
        {meta.demo && <span className="chip !text-faint !border-dashed">sample page</span>}
      </div>
      <div className="rise flex items-start gap-5 sm:gap-7" style={{ "--rd": "0.05s" } as React.CSSProperties}>
        <div
          aria-hidden
          className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl border border-line bg-surface flex items-center justify-center text-[26px] sm:text-[36px] font-semibold tracking-[-0.03em] text-ink-2 flex-none"
        >
          {company.name.trim().charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <div className="eyebrow mb-3">01 · You</div>
          <h1 className="text-[40px] leading-[1.02] sm:text-[60px] lg:text-[72px] font-semibold tracking-[-0.045em] break-words">
            {company.name}
          </h1>
        </div>
      </div>
      <p className="rise mt-8 text-[18px] sm:text-[22px] text-ink-2 leading-snug tracking-[-0.01em] max-w-3xl" style={{ "--rd": "0.1s" } as React.CSSProperties}>
        {company.one_liner}
      </p>
      <div className="rise mt-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden" style={{ "--rd": "0.15s" } as React.CSSProperties}>
        <div className="bg-white p-5 sm:p-6">
          <div className="eyebrow mb-3">Who you sell to</div>
          <p className="text-[16px] text-ink-2 leading-relaxed">{company.icp_line}</p>
        </div>
        {company.hiring_signal && (
          <div className="bg-white p-5 sm:p-6">
            <div className="eyebrow mb-3">What I noticed</div>
            <p className="text-[16px] text-ink-2 leading-relaxed">{company.hiring_signal}</p>
          </div>
        )}
        {c.system?.signal && (
          <div className={`bg-white p-5 sm:p-6 ${company.hiring_signal ? "md:col-span-2" : ""}`}>
            <div className="eyebrow mb-3">What I watch for</div>
            <p className="text-[16px] text-ink-2 leading-relaxed">{c.system.signal}</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* ---------------- 2. Accounts ---------------- */

const signalStyle: Record<LoomSignal, string> = {
  funding: "text-accent",
  launch: "text-ink-2",
  hiring: "text-ink-2",
  competitor: "text-ink-2",
  expansion: "text-ink-2",
  other: "text-faint",
};

export function AccountsSection({ c }: { c: LoomContent }) {
  return (
    <section className={section}>
      <SectionHead id="accounts" index="02" kicker="Your target accounts" title="Accounts I would start with.">
        {c.accounts.length} named accounts, each with a reason and a source.
      </SectionHead>
      {c.system?.where && c.system.where.length > 0 && (
        <div className="-mt-4 mb-6">
          <p className="font-mono text-[11.5px] text-muted">
            Found through {c.system.where.map((w) => w.source).join(" · ")}
          </p>
          <ul className="mt-2 space-y-1">
            {c.system.where.map((w) => (
              <li key={w.source} className="text-[12.5px] text-faint leading-relaxed">
                <span className="text-muted">{w.source}:</span> {w.detail}
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="panel overflow-hidden">
        <div className="hidden md:grid grid-cols-[minmax(0,2fr)_minmax(0,5fr)_96px_80px_minmax(0,2fr)] gap-4 px-6 py-3 border-b border-line bg-surface/60 eyebrow">
          <span>Account</span>
          <span>Why now</span>
          <span>Signal</span>
          <span>Date</span>
          <span>Source</span>
        </div>
        <ul>
          {c.accounts.map((a) => (
            <li
              key={`${a.name}-${a.source}`}
              className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_minmax(0,5fr)_96px_80px_minmax(0,2fr)] gap-x-4 gap-y-2 px-5 sm:px-6 py-4 border-b border-line last:border-b-0 md:items-baseline"
            >
              <span className="text-[15px] font-semibold tracking-[-0.01em]">{a.name}</span>
              <span className="text-[14px] text-muted leading-relaxed">{a.reason}</span>
              <span className="flex md:block items-center gap-3">
                <span className={`chip !h-5 !text-[10.5px] ${signalStyle[a.signal]}`}>{a.signal}</span>
                <span className="md:hidden font-mono text-[11px] text-faint">{a.date}</span>
              </span>
              <span className="hidden md:block font-mono text-[11.5px] text-muted">{a.date}</span>
              <a
                href={a.source}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11.5px] text-accent hover:underline underline-offset-4 truncate"
              >
                {bareDomain(a.source)} <span aria-hidden>↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- 3. Flow ---------------- */

export function FlowSection({ c }: { c: LoomContent }) {
  const steps = systemStepsFor(c);
  return (
    <section className={section}>
      <SectionHead id="flow" index="03" kicker="The agent flow" title="From signal to reply.">
        Each step has one job. A person approves every draft.
      </SectionHead>
      <div className="panel p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="chip">{steps.filter((s) => s.kind === "agent").length} agents</span>
          <span className="chip !border-accent/40 text-accent">1 human gate</span>
          <span className="font-mono text-[11.5px] text-muted ml-1">Each agent has one job. The moving dots show which way data flows.</span>
        </div>
        <AgentSystem steps={steps} example={exampleFor(c)} compact />
      </div>
    </section>
  );
}

/* ---------------- 4. Stack ---------------- */

export function StackSection({ c }: { c: LoomContent }) {
  const stack = c.stack;
  if (!stack || stack.length === 0) return null;
  return (
    <section className={section}>
      <SectionHead id="stack" index="04" kicker="The stack" title="Tools I would use.">
        You own the accounts and the data.
      </SectionHead>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stack.map((t) => (
          <li key={t.name} className="bg-white border border-line rounded-xl p-5">
            <span className="chip">{t.name}</span>
            <p className="text-[12.5px] text-muted leading-relaxed mt-3">{t.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/* ---------------- 5. Dashboard ---------------- */

const stageStyle: Record<LoomStage, string> = {
  researched: "text-faint",
  enriched: "text-muted",
  "draft ready": "text-accent !border-accent/40",
  approved: "text-ink-2",
  sent: "text-ink-2",
  replied: "text-live !border-live/40",
};

export function DashboardSection({ c }: { c: LoomContent }) {
  const d = c.dashboard;
  if (!d) return null;
  return (
    <section className={section}>
      <SectionHead id="dashboard" index="05" kicker="Your dashboard" title="What you would see each morning." />
      <div className="panel overflow-hidden shadow-[0_8px_30px_-16px_rgba(0,0,0,0.15)]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface/60">
          <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
          <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
          <span className="w-2.5 h-2.5 rounded-full bg-line-2" />
          <span className="ml-3 flex-1 max-w-sm h-6 rounded-md bg-white border border-line flex items-center px-3 font-mono text-[11px] text-faint truncate">
            app.{c.company.domain ?? "yourcompany.com"}/pipeline
          </span>
        </div>
        <div className="p-5 sm:p-7">
          {d.headline && <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.025em]">{d.headline}</h3>}
          {d.kpis && d.kpis.length > 0 && (
            <div className="mt-5 grid grid-cols-2 lg:grid-cols-[repeat(var(--n),minmax(0,1fr))] gap-px bg-line border border-line rounded-xl overflow-hidden" style={{ "--n": d.kpis.length } as React.CSSProperties}>
              {d.kpis.map((k) => (
                <div key={k.label} className="bg-white p-4">
                  <div className="text-[28px] font-semibold tracking-[-0.04em] tabular-nums leading-none">{k.value}</div>
                  <div className="font-mono text-[10.5px] text-muted mt-2 leading-tight">{k.label}</div>
                </div>
              ))}
            </div>
          )}
          {d.rows && d.rows.length > 0 && (
            <ul className="mt-5 border border-line rounded-xl overflow-hidden">
              {d.rows.map((r) => (
                <li key={r.company} className="flex flex-wrap items-center gap-x-4 gap-y-1.5 px-4 py-3 border-b border-line last:border-b-0 bg-white">
                  <span className="text-[14px] font-medium min-w-[9rem]">{r.company}</span>
                  <span className={`chip !h-5 !text-[10.5px] ${stageStyle[r.stage]}`}>{r.stage}</span>
                  {r.note && <span className="text-[12.5px] text-muted sm:ml-auto">{r.note}</span>}
                </li>
              ))}
            </ul>
          )}
          {d.note && <p className="font-mono text-[11.5px] text-muted mt-4">{d.note}</p>}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. Ask ---------------- */

export function AskSection({ c }: { c: LoomContent }) {
  const email = c.ask.email || site.email;
  const linkedin = c.ask.linkedin || site.linkedin;
  const subject = encodeURIComponent(`30 minute call about ${c.company.name}`);
  return (
    <section className={section}>
      <div className="panel px-6 py-12 sm:px-14 sm:py-16">
        <div className="eyebrow mb-5 flex items-center gap-2">
          <span className="text-accent">06</span>
          <span className="w-6 h-px bg-line-2" />
          The ask
        </div>
        <h2 className="text-[28px] sm:text-[40px] font-semibold tracking-[-0.04em] leading-[1.1] max-w-3xl">{c.ask.line}</h2>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={`mailto:${email}?subject=${subject}`} className="btn btn-dark">
            Email Cole <Arrow />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            LinkedIn
          </a>
        </div>
        <p className="font-mono text-[11.5px] text-muted mt-4">Opens an email to {email}.</p>
      </div>
    </section>
  );
}
