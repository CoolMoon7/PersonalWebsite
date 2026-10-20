import Logo, { logoTitle } from "@/components/Logo";
import { example as pilotExample, systemSteps } from "@/data/pilot";

export type SystemStepKind = "agent" | "human";
export type SystemStep = {
  n: string;
  stage: string;
  kind: SystemStepKind;
  name: string;
  blurb: string;
  inputs: string[];
  /** Data label on the down arrow; "" on the last step. */
  output: string;
  /** Right-hand chips; pilot only. */
  outputs?: string[];
  /** Pilot wire directions; default "in". */
  dirs?: Record<string, "in" | "out">;
};
export type SystemExample = { prospect: string; signal: string; draft: string };

type Dir = "in" | "out";

/** Sizes in px. The normal set is the /pilot layout; compact is the loom page. */
type Dims = { SQ: number; PITCH: number; GAP: number; PAD: number; CARD_H: number; GATE_H: number };
const NORMAL: Dims = { SQ: 56, PITCH: 82, GAP: 6, PAD: 22, CARD_H: 156, GATE_H: 300 };
const COMPACT: Dims = { SQ: 44, PITCH: 70, GAP: 3, PAD: 14, CARD_H: 120, GATE_H: 224 };

const rowH = (a: SystemStep, d: Dims) => {
  const outs = a.outputs ?? [];
  const chips = Math.max(a.inputs.length, outs.length) * d.PITCH - d.GAP;
  if (a.kind === "human") return d === COMPACT ? Math.max(d.GATE_H, chips) : d.GATE_H;
  return Math.max(chips, d.CARD_H);
};

/**
 * One wire per tool. Dots flow the way data actually moves: "in" toward the agent (sources and answers coming back), "out" away from it (things it sends or saves).
 */
function Wires({ keys, dirs, h, side, d, single = false }: { keys: string[]; dirs: Record<string, Dir>; h: number; side: "in" | "out"; d: Dims; single?: boolean }) {
  const { PITCH, SQ, GAP } = d;
  const n = keys.length;
  const top = (h - (n * PITCH - GAP)) / 2;
  return (
    <svg className="flex-1 min-w-0 w-full" style={{ height: h }} viewBox={`0 0 100 ${h}`} preserveAspectRatio="none" aria-hidden>
      {keys.map((k, i) => {
        const y = single ? h / 2 : top + i * PITCH + SQ / 2;
        const m = h / 2;
        // The side only sets the geometry; flow direction comes from the data.
        const toAgent = side === "in" ? `M0 ${y} C 55 ${y}, 45 ${m}, 100 ${m}` : `M100 ${y} C 45 ${y}, 55 ${m}, 0 ${m}`;
        const fromAgent = side === "in" ? `M100 ${m} C 45 ${m}, 55 ${y}, 0 ${y}` : `M0 ${m} C 55 ${m}, 45 ${y}, 100 ${y}`;
        const dir = dirs[k] ?? "in";
        return (
          <g key={`${k}-${i}`}>
            <path d={toAgent} className="wire" vectorEffect="non-scaling-stroke" />
            {dir === "in" && <path d={toAgent} className="wire-flow" vectorEffect="non-scaling-stroke" />}
            {dir === "out" && <path d={fromAgent} className="wire-flow" vectorEffect="non-scaling-stroke" />}
          </g>
        );
      })}
    </svg>
  );
}

const BOT_COLORS = ["#0d9488", "#2563eb", "#7c3aed", "#db2777", "#16a34a", "#ea580c"];

/** Solid robot head: stub antenna, square head, two round eyes, side ears. */
function Bot({ size = 24 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden fill="#0a0a0a">
      <g transform="translate(0 0.6)">
        <rect x="14.75" y="3.5" width="1.8" height="4.6" rx="0.9" />
        <rect x="5.9" y="7.9" width="19.5" height="16.6" rx="4.4" fill="none" stroke="#0a0a0a" strokeWidth="1.8" />
        <rect x="1.6" y="12.8" width="1.8" height="6.8" rx="0.9" />
        <rect x="27.9" y="12.8" width="1.8" height="6.8" rx="0.9" />
        <circle cx="11.4" cy="16.2" r="2" />
        <circle cx="19.9" cy="16.2" r="2" />
      </g>
    </svg>
  );
}

function Tile({ t, compact }: { t: string; compact: boolean }) {
  if (compact) {
    return (
      <div className="flex flex-col items-center gap-[3px] w-[84px] shrink-0">
        <span
          className="rounded-xl border border-line-2 bg-white grid place-items-center shadow-[0_6px_16px_-10px_rgba(24,24,40,0.3)] w-11 h-11"
          title={logoTitle(t)}
        >
          <Logo name={t} size={22} />
        </span>
        <span
          className="block w-full h-[20px] overflow-hidden text-[10px] text-ink-2 leading-[10px] text-center break-words line-clamp-2"
          title={logoTitle(t)}
        >
          {logoTitle(t)}
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-1.5 w-[56px] shrink-0">
      <span
        className="rounded-2xl border border-line-2 bg-white grid place-items-center shadow-[0_6px_16px_-10px_rgba(24,24,40,0.3)] w-14 h-14"
        title={logoTitle(t)}
      >
        <Logo name={t} size={26} />
      </span>
      <span className="text-[11px] text-ink-2 leading-[14px] text-center whitespace-nowrap -mx-6">{logoTitle(t)}</span>
    </div>
  );
}

function TileCol({ keys, compact }: { keys: string[]; compact: boolean }) {
  return (
    <div className={`flex flex-col ${compact ? "gap-[3px]" : "gap-[6px]"} shrink-0`}>
      {keys.map((t, i) => (
        <Tile key={`${t}-${i}`} t={t} compact={compact} />
      ))}
    </div>
  );
}

function ApprovalCard({ example, compact }: { example: SystemExample; compact: boolean }) {
  if (compact) {
    return (
      <div className="rounded-xl border border-line-2 bg-white shadow-[0_18px_50px_-24px_rgba(24,24,40,0.35)] overflow-hidden w-full sm:w-[240px] shrink-0">
        <div className="flex items-center gap-1.5 px-3 py-2 border-b border-line bg-surface/70">
          <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
          <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
          <span className="w-2 h-2 rounded-full bg-[#28c840]" />
          <span className="ml-2 font-mono text-[10px] text-muted">Approval inbox · example</span>
        </div>
        <div className="p-3">
          <div className="text-[13px] font-semibold tracking-[-0.01em]">{example.prospect}</div>
          <div className="font-mono text-[10px] text-muted mt-0.5">{example.signal}</div>
          <p className="mt-2 text-[11px] leading-relaxed text-ink-2 rounded-lg bg-surface border border-line p-2">{example.draft}</p>
          <div className="mt-2.5 flex items-center gap-2">
            <span className="btn btn-dark !h-7 !px-3 !text-[11.5px] pointer-events-none">Approve</span>
            <span className="btn btn-ghost !h-7 !px-3 !text-[11.5px] pointer-events-none">Edit</span>
            <span className="btn btn-ghost !h-7 !px-3 !text-[11.5px] pointer-events-none text-muted">Skip</span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-line-2 bg-white shadow-[0_18px_50px_-24px_rgba(24,24,40,0.35)] overflow-hidden w-full sm:w-[280px] shrink-0">
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-line bg-surface/70">
        <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
        <span className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 font-mono text-[10.5px] text-muted">Approval inbox · 12 waiting</span>
      </div>
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[13.5px] font-semibold tracking-[-0.01em]">{example.prospect}</div>
            <div className="font-mono text-[10px] text-muted mt-0.5">{example.signal}</div>
          </div>
          <span className="chip !h-5 !text-[10px] text-accent shrink-0">fit 92</span>
        </div>
        <p className="mt-2.5 text-[11.5px] leading-relaxed text-ink-2 rounded-lg bg-surface border border-line p-2.5">{example.draft}</p>
        <div className="mt-3 flex items-center gap-2">
          <span className="btn btn-dark !h-8 !px-3.5 !text-[12px] pointer-events-none">Approve</span>
          <span className="btn btn-ghost !h-8 !px-3.5 !text-[12px] pointer-events-none">Edit</span>
          <span className="btn btn-ghost !h-8 !px-3.5 !text-[12px] pointer-events-none text-muted">Skip</span>
        </div>
      </div>
    </div>
  );
}

type Props = { steps?: SystemStep[]; example?: SystemExample; compact?: boolean };

export default function AgentSystem({ steps = systemSteps, example = pilotExample, compact = false }: Props) {
  const d = compact ? COMPACT : NORMAL;
  const { PAD, CARD_H } = d;
  const last = steps.length - 1;
  return (
    <div className="relative">
      {/* One continuous spine from the first agent to the last, behind the cards */}
      <div
        className="spine hidden sm:block z-0"
        style={{ top: PAD + rowH(steps[0], d) / 2, bottom: PAD + rowH(steps[last], d) / 2 }}
        aria-hidden
      />
      {steps.map((a, i) => {
        const gate = a.kind === "human";
        const h = rowH(a, d);
        const outs = a.outputs ?? [];
        const dirs = a.dirs ?? {};
        return (
          <div key={a.n} className="relative" style={{ paddingTop: PAD, paddingBottom: PAD }}>
            <div
              className={`grid grid-cols-1 ${compact ? "sm:grid-cols-[minmax(0,1fr)_216px_minmax(0,1fr)]" : "sm:grid-cols-[minmax(0,1fr)_248px_minmax(0,1fr)]"} items-center gap-y-4`}
            >
              <div className="hidden sm:flex items-center" style={{ height: h }}>
                <TileCol keys={a.inputs} compact={compact} />
                <Wires keys={a.inputs} dirs={dirs} h={h} side="in" d={d} />
              </div>

              <div
                className={`relative z-10 panel ${compact ? "px-3.5 py-3" : "px-4 py-4"} ${gate ? "!border-accent/50" : "!border-line-2"}`}
                style={{ minHeight: CARD_H - 8 }}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono ${compact ? "text-[10.5px]" : "text-[11px]"} ${gate ? "text-accent" : "text-muted"}`}>
                    {a.n} · {a.stage}
                  </span>
                  {gate ? (
                    <span className="chip !h-5 !text-[10px] text-accent">human gate</span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                      <span className="live-dot !w-[6px] !h-[6px]" /> agent
                    </span>
                  )}
                </div>
                <div className={`flex items-center gap-2.5 ${compact ? "mt-2.5" : "mt-3"}`}>
                  <span
                    className={`${compact ? "w-11 h-11 rounded-xl" : "w-14 h-14 rounded-2xl"} grid place-items-center shrink-0 ${gate ? "bg-surface border border-line" : ""}`}
                    style={gate ? undefined : { background: `${BOT_COLORS[i % BOT_COLORS.length]}1a` }}
                  >
                    {gate ? <Logo name="human" size={compact ? 20 : 24} /> : <Bot size={compact ? 32 : 42} />}
                  </span>
                  <div className={`${compact ? "text-[15px]" : "text-[17px]"} font-semibold tracking-[-0.02em]`}>{a.name}</div>
                </div>
                <p className={`${compact ? "text-[11.5px]" : "text-[12.5px]"} text-muted leading-snug ${compact ? "mt-2" : "mt-2.5"}`}>{a.blurb}</p>
                {compact && gate && (
                  <p className="font-mono text-[10.5px] text-accent leading-snug mt-2">You approve, nothing sends without you</p>
                )}
              </div>

              <div className={`hidden ${gate ? "lg:flex" : "sm:flex"} items-center`} style={{ height: h }}>
                {gate ? (
                  <>
                    <Wires keys={["approval"]} dirs={{ approval: "in" }} h={h} side="out" d={d} single />
                    <ApprovalCard example={example} compact={compact} />
                  </>
                ) : (
                  <>
                    <Wires keys={outs} dirs={dirs} h={h} side="out" d={d} />
                    <TileCol keys={outs} compact={compact} />
                  </>
                )}
              </div>

              {/* Phones: the same tools, listed under the card */}
              <div className={`sm:hidden flex flex-wrap ${compact ? "gap-x-2 gap-y-3" : "gap-x-3 gap-y-4"}`}>
                {[...a.inputs, ...outs].map((t, j) => (
                  <Tile key={`${t}-${j}`} t={t} compact={compact} />
                ))}
              </div>
              {gate && (
                <div className="lg:hidden sm:col-span-3 sm:flex sm:justify-center">
                  <ApprovalCard example={example} compact={compact} />
                </div>
              )}
            </div>

            {i < last && a.output && (
              <span className="chip !h-6 !text-[10.5px] font-mono text-muted absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-20 whitespace-nowrap">
                ↓ {a.output}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
