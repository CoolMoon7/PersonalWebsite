import Logo, { logoTitle } from "@/components/Logo";
import { agents, example, type Dir } from "@/data/pilot";

const SQ = 56; // tool square (px)
const PITCH = 82; // square + label + gap
const PAD = 22; // vertical padding of each row
const CARD_H = 156;
const GATE_H = 300;

const rowH = (a: (typeof agents)[number]) =>
  a.kind === "gate" ? GATE_H : Math.max(Math.max(a.ins.length, a.outs.length) * PITCH - 6, CARD_H);

/**
 * One wire per tool. Dots flow the way data actually moves: "in" toward the agent (sources and answers coming back), "out" away from it (things it sends or saves).
 */
function Wires({ keys, dirs, h, side, single = false }: { keys: string[]; dirs: Record<string, Dir>; h: number; side: "in" | "out"; single?: boolean }) {
  const n = keys.length;
  const top = (h - (n * PITCH - 6)) / 2;
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
          <g key={k}>
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

function Tile({ t }: { t: string }) {
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

function TileCol({ keys }: { keys: string[] }) {
  return (
    <div className="flex flex-col gap-[6px] shrink-0">
      {keys.map((t) => (
        <Tile key={t} t={t} />
      ))}
    </div>
  );
}

function ApprovalCard() {
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

export default function AgentSystem() {
  const last = agents.length - 1;
  return (
    <div className="relative">
      {/* One continuous spine from the first agent to the last, behind the cards */}
      <div
        className="spine hidden sm:block z-0"
        style={{ top: PAD + rowH(agents[0]) / 2, bottom: PAD + rowH(agents[last]) / 2 }}
        aria-hidden
      />
      {agents.map((a, i) => {
        const gate = a.kind === "gate";
        const h = rowH(a);
        return (
          <div key={a.k} className="relative" style={{ paddingTop: PAD, paddingBottom: PAD }}>
            <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_248px_minmax(0,1fr)] items-center gap-y-4">
              <div className="hidden sm:flex items-center" style={{ height: h }}>
                <TileCol keys={a.ins} />
                <Wires keys={a.ins} dirs={a.dirs} h={h} side="in" />
              </div>

              <div className={`relative z-10 panel px-4 py-4 ${gate ? "!border-accent/50" : "!border-line-2"}`} style={{ minHeight: CARD_H - 8 }}>
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[11px] ${gate ? "text-accent" : "text-muted"}`}>
                    {a.k} · {a.title}
                  </span>
                  {gate ? (
                    <span className="chip !h-5 !text-[10px] text-accent">human gate</span>
                  ) : (
                    <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                      <span className="live-dot !w-[6px] !h-[6px]" /> agent
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2.5 mt-3">
                  <span
                    className={`w-14 h-14 rounded-2xl grid place-items-center shrink-0 ${gate ? "bg-surface border border-line" : ""}`}
                    style={gate ? undefined : { background: `${BOT_COLORS[i]}1a` }}
                  >
                    {gate ? <Logo name="human" size={24} /> : <Bot size={42} />}
                  </span>
                  <div className="text-[17px] font-semibold tracking-[-0.02em]">{a.agent}</div>
                </div>
                <p className="text-[12.5px] text-muted leading-snug mt-2.5">{a.short}</p>
              </div>

              <div className={`hidden ${gate ? "lg:flex" : "sm:flex"} items-center`} style={{ height: h }}>
                {gate ? (
                  <>
                    <Wires keys={["approval"]} dirs={{ approval: "in" }} h={h} side="out" single />
                    <ApprovalCard />
                  </>
                ) : (
                  <>
                    <Wires keys={a.outs} dirs={a.dirs} h={h} side="out" />
                    <TileCol keys={a.outs} />
                  </>
                )}
              </div>

              {/* Phones: the same tools, listed under the card */}
              <div className="sm:hidden flex flex-wrap gap-x-3 gap-y-4">
                {[...a.ins, ...a.outs].map((t) => (
                  <Tile key={t} t={t} />
                ))}
              </div>
              {gate && (
                <div className="lg:hidden sm:col-span-3 sm:flex sm:justify-center">
                  <ApprovalCard />
                </div>
              )}
            </div>

            {i < last && a.handoff && (
              <span className="chip !h-6 !text-[10.5px] font-mono text-muted absolute left-1/2 -translate-x-1/2 bottom-0 translate-y-1/2 z-20 whitespace-nowrap">
                ↓ {a.handoff}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
