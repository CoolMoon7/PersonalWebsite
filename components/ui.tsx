import Link from "next/link";
import Logo, { logoTitle } from "./Logo";
import type { System } from "@/data/systems";

export function SectionHead({
  id,
  index,
  title,
  kicker,
  children,
}: {
  id?: string;
  index: string;
  title: string;
  kicker?: string;
  children?: React.ReactNode;
}) {
  return (
    <div id={id} className="reveal scroll-mt-24 flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <div className="eyebrow mb-3 flex items-center gap-2">
          <span className="text-accent">{index}</span>
          <span className="w-6 h-px bg-line-2" />
          {kicker}
        </div>
        <h2 className="text-[28px] sm:text-[34px] font-semibold tracking-[-0.03em] leading-[1.1]">{title}</h2>
      </div>
      {children && <div className="text-[15px] text-muted max-w-md md:text-right">{children}</div>}
    </div>
  );
}

const statusStyle: Record<System["status"], string> = {
  Live: "text-live",
  Shipped: "text-ink-2",
  Building: "text-accent",
};

export function Status({ s }: { s: System["status"] }) {
  return (
    <span className={`chip ${statusStyle[s]}`}>
      {s === "Live" ? <span className="live-dot" /> : s === "Building" ? <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> : <span className="w-1.5 h-1.5 rounded-full bg-ink-2" />}
      {s === "Live" ? "live · autopilot" : s.toLowerCase()}
    </span>
  );
}

export function StackRow({ stack, size = 16 }: { stack: string[]; size?: number }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {stack.map((k) => (
        <span key={k} className="chip !h-7 !px-2" title={logoTitle(k)}>
          <Logo name={k} size={size - 2} />
          <span className="text-[11px]">{logoTitle(k)}</span>
        </span>
      ))}
    </div>
  );
}

/** A compact one-line rendering of a workflow: logos joined by an animated line. */
export function NodeStrip({ sys }: { sys: System }) {
  const cols = new Map<number, typeof sys.workflow.nodes>();
  for (const n of sys.workflow.nodes) cols.set(n.col, [...(cols.get(n.col) ?? []), n]);
  const ordered = [...cols.entries()].sort((a, b) => a[0] - b[0]);
  return (
    <div className="relative flex items-center justify-between">
      <span className="absolute left-4 right-4 top-1/2 h-px bg-line-2" />
      <span className="absolute left-4 right-4 top-1/2 h-px wf-edge-css" />
      {ordered.map(([c, nodes]) => (
        <span key={c} className="relative flex flex-col gap-1">
          {nodes.map((n) => (
            <span
              key={n.id}
              title={`${n.label} · ${n.sub}`}
              data-kind={n.kind}
              className="wf-node relative w-8 h-8 rounded-lg border bg-white flex items-center justify-center"
              style={{ "--d": `${(c * 0.4).toFixed(2)}s`, "--cycle": `${ordered.length * 0.4 + 2.2}s` } as React.CSSProperties}
            >
              {n.kind === "agent" && <span className="wf-agent-ring" />}
              <Logo name={n.logo} size={15} />
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

export function SystemCard({ sys, i }: { sys: System; i: number }) {
  return (
    <Link
      href={`/systems/${sys.slug}`}
      className="group panel p-5 sm:p-6 flex flex-col gap-5 hover:border-[#d4d4d8] hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] transition-all"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-mono text-[11.5px] text-muted">
          <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
          <span>{sys.client}</span>
          <span className="text-faint">·</span>
          <span>{sys.category}</span>
        </div>
        <Status s={sys.status} />
      </div>

      <div>
        <h3 className="text-[20px] font-semibold tracking-[-0.02em] flex items-center gap-2">
          {sys.name}
          <span className="text-faint group-hover:text-foreground group-hover:translate-x-0.5 transition-all">→</span>
        </h3>
        <p className="text-[14.5px] text-muted leading-relaxed mt-2 line-clamp-3">{sys.oneLiner}</p>
      </div>

      <div className="rounded-xl border border-line bg-surface/60 px-3 py-4">
        <NodeStrip sys={sys} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-line rounded-xl overflow-hidden border border-line mt-auto">
        {sys.metrics.map((m) => (
          <div key={m.label} className="bg-white px-3 py-3">
            <div className="text-[18px] font-semibold tracking-[-0.02em] tabular-nums">{m.value}</div>
            <div className="font-mono text-[10.5px] text-muted mt-0.5 leading-tight">{m.label}</div>
          </div>
        ))}
      </div>
    </Link>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
