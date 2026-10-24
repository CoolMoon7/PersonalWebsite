import AgentSystem from "@/components/AgentSystem";
import { EYEBROW } from "@/components/sections";
import { week, system } from "@/data/insurance";

export function CoiPains() {
  return (
    <>
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
        {week.items.map((w) => (
          <li key={w.title} className="bg-white p-5 sm:p-6">
            <div className="font-mono text-[11px] text-accent">{w.when}</div>
            <h3 className="text-[16px] font-semibold tracking-[-0.01em] mt-2.5">{w.title}</h3>
            <p className="text-[14px] text-muted leading-relaxed mt-2">{w.body}</p>
          </li>
        ))}
      </ol>
      <div className="panel mt-4 p-6 sm:p-8">
        <div className={EYEBROW}>What it adds up to</div>
        <ul className="mt-4 space-y-3">
          {week.pain.map((p) => (
            <li key={p} className="flex gap-3 text-[15.5px] sm:text-[17px] text-ink-2 leading-relaxed">
              <span className="text-accent font-mono text-[13px] pt-1">—</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

/** The animated six-agent diagram with the approval-inbox mock. */
export function CoiWorkflow() {
  return (
    <>
      <div className="panel p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
        <p className="text-[15px] text-ink-2 leading-relaxed md:flex-1">{system.intro.what}</p>
        <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] shrink-0">
          <span className="chip !h-auto !whitespace-normal py-1">{system.intro.in}</span>
          <span className="text-accent">⟶</span>
          <span className="chip !h-auto !whitespace-normal py-1 !border-accent/40 text-accent">{system.intro.out}</span>
        </div>
      </div>
      <div className="panel mt-4 p-4 sm:p-8">
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {system.chips.map((c, i) => (
            <span key={c} className={i === 1 ? "chip !border-accent/40 text-accent" : "chip"}>{c}</span>
          ))}
          <span className="font-mono text-[11.5px] text-muted">The moving dots show which way a request flows.</span>
        </div>
        <AgentSystem agents={system.agents} example={system.example} />
      </div>
    </>
  );
}

export function CoiReport() {
  return (
    <div className="panel p-5 sm:p-8">
      <h3 className="text-[19px] sm:text-[22px] font-semibold tracking-[-0.025em]">{system.report.title}</h3>
      <p className="text-[14.5px] text-muted leading-relaxed mt-2.5 max-w-2xl">{system.report.body}</p>
      <div className="mt-6 rounded-xl border border-line-2 bg-surface/60 p-4 font-mono text-[12px] text-ink-2">
        <div className="flex flex-wrap items-center gap-2 text-muted mb-3">
          <span>{system.report.logTitle}</span>
          <span className="chip !h-5 !text-[10px]">example week</span>
        </div>
        <ul className="space-y-2.5 leading-relaxed">
          {system.report.log.map((v) => (
            <li key={v} className="flex gap-2">
              <span className="text-accent">+</span>
              <span className="min-w-0">{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
