import Logo from "./Logo";
import type { Workflow as WF, WFNode } from "@/data/systems";

const MAX_W = 1060; // fits the 6xl container without horizontal scroll
const ROW_H = 100;
const NODE_H = 60;
let COL_W = 196;
let NODE_W = 172;
const STEP = 0.55; // seconds between columns lighting up

const kindLabel: Record<WFNode["kind"], string> = {
  source: "source",
  tool: "tool",
  agent: "agent",
  gate: "gate",
  output: "output",
};

function pos(n: WFNode) {
  return {
    x: n.col * COL_W + (COL_W - NODE_W) / 2,
    y: n.row * ROW_H + (ROW_H - NODE_H) / 2,
  };
}

function edgePath(a: WFNode, b: WFNode, loop?: boolean, height?: number) {
  const pa = pos(a);
  const pb = pos(b);
  if (loop) {
    // feedback edge: leave from the bottom of `a`, run under the graph, enter the bottom of `b`
    const x1 = pa.x + NODE_W / 2;
    const y1 = pa.y + NODE_H;
    const x2 = pb.x + NODE_W / 2;
    const y2 = pb.y + NODE_H;
    const yb = (height ?? 0) - 10;
    return `M${x1},${y1} C${x1},${yb} ${x2},${yb} ${x2},${y2}`;
  }
  const x1 = pa.x + NODE_W;
  const y1 = pa.y + NODE_H / 2;
  const x2 = pb.x;
  const y2 = pb.y + NODE_H / 2;
  const dx = Math.max(24, (x2 - x1) / 2);
  return `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`;
}

/**
 * Server-rendered, zero-JS workflow diagram. Nodes light up column by column like a live run,
 * packets travel the edges, agent nodes get a spinning gradient ring.
 */
export default function Workflow({
  wf,
  title,
  compact = false,
}: {
  wf: WF;
  title?: string;
  compact?: boolean;
}) {
  const byId = Object.fromEntries(wf.nodes.map((n) => [n.id, n]));
  const cols = Math.max(...wf.nodes.map((n) => n.col)) + 1;
  COL_W = Math.min(196, Math.floor(MAX_W / cols));
  NODE_W = COL_W - 18;
  const rows = Math.max(...wf.nodes.map((n) => n.row)) + 1;
  const hasLoop = wf.edges.some((e) => e.loop);
  const W = cols * COL_W;
  const H = rows * ROW_H + (hasLoop ? 44 : 0);
  const cycle = `${cols * STEP + 2.4}s`;

  return (
    <div className="panel overflow-hidden">
      {title && (
        <div className="flex items-center justify-between gap-3 px-4 h-11 border-b border-line bg-surface/60">
          <div className="flex items-center gap-2">
            <span className="flex gap-1.5">
              <i className="w-2.5 h-2.5 rounded-full bg-[#e4e4e7]" />
              <i className="w-2.5 h-2.5 rounded-full bg-[#e4e4e7]" />
              <i className="w-2.5 h-2.5 rounded-full bg-[#e4e4e7]" />
            </span>
            <span className="font-mono text-[12px] text-muted ml-2 truncate">{title}</span>
          </div>
          <span className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="live-dot" /> running
          </span>
        </div>
      )}

      {/* Desktop / tablet: canvas */}
      <div className={`hidden md:block overflow-x-auto ${compact ? "px-3 py-4" : "px-4 py-6"}`}>
        <div className="relative mx-auto" style={{ width: W, height: H }}>
          <svg className="absolute inset-0" width={W} height={H} aria-hidden>
            {wf.edges.map((e, i) => {
              const a = byId[e.from];
              const b = byId[e.to];
              const d = edgePath(a, b, e.loop, H);
              const begin = `${(a.col * STEP).toFixed(2)}s`;
              return (
                <g key={i}>
                  <path d={d} fill="none" stroke="#e4e4e7" strokeWidth={1.25} />
                  <path
                    d={d}
                    fill="none"
                    stroke={e.loop ? "#a1a1aa" : "#c4c4cc"}
                    strokeWidth={1.25}
                    className="wf-edge"
                  />
                  <circle r={3} fill={e.loop ? "#a1a1aa" : "#2f5bff"} opacity={0}>
                    <set attributeName="opacity" to="1" begin={begin} />
                    <animateMotion
                      dur={e.loop ? "3.2s" : "1.6s"}
                      begin={begin}
                      repeatCount="indefinite"
                      path={d}
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="spline"
                      keySplines="0.4 0 0.2 1"
                    />
                  </circle>
                  {e.label && (() => {
                    const pa = pos(a);
                    const pb = pos(b);
                    const lx = e.loop ? (pa.x + pb.x + NODE_W) / 2 : (pa.x + NODE_W + pb.x) / 2;
                    const ly = e.loop ? H - 14 : (pa.y + pb.y + NODE_H) / 2 - 8;
                    return (
                      <text
                        x={lx}
                        y={ly}
                        textAnchor="middle"
                        className="font-mono"
                        fontSize={10}
                        fill="#a1a1aa"
                      >
                        {e.label}
                      </text>
                    );
                  })()}
                </g>
              );
            })}
          </svg>

          {wf.nodes.map((n) => {
            const p = pos(n);
            return (
              <div
                key={n.id}
                data-kind={n.kind}
                className="wf-node absolute rounded-xl border bg-white px-2.5 flex items-center gap-2"
                style={
                  {
                    left: p.x,
                    top: p.y,
                    width: NODE_W,
                    height: NODE_H,
                    "--d": `${(n.col * STEP).toFixed(2)}s`,
                    "--cycle": cycle,
                  } as React.CSSProperties
                }
              >
                {n.kind === "agent" && <span className="wf-agent-ring" />}
                <span className="w-7 h-7 rounded-lg border border-line bg-surface flex items-center justify-center flex-none">
                  <Logo name={n.logo} size={15} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[13px] font-medium leading-tight truncate">{n.label}</span>
                  <span className="block font-mono text-[10.5px] text-muted leading-tight mt-1 truncate">
                    {n.sub}
                  </span>
                </span>
                <span className="absolute -top-2 left-3 px-1.5 bg-white font-mono text-[9px] uppercase tracking-[0.08em] text-faint">
                  {kindLabel[n.kind]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: vertical step list */}
      <ol className="md:hidden px-4 py-5">
        {[...wf.nodes]
          .sort((a, b) => a.col - b.col || a.row - b.row)
          .map((n, i, arr) => (
            <li key={n.id} className="relative flex gap-3 pb-4 last:pb-0">
              {i < arr.length - 1 && (
                <span className="absolute left-[15px] top-9 bottom-0 w-px bg-line-2" />
              )}
              <span
                data-kind={n.kind}
                className="wf-node relative w-8 h-8 rounded-lg border bg-white flex items-center justify-center flex-none"
                style={{ "--d": `${(i * 0.35).toFixed(2)}s`, "--cycle": `${arr.length * 0.35 + 2}s` } as React.CSSProperties}
              >
                {n.kind === "agent" && <span className="wf-agent-ring" />}
                <Logo name={n.logo} size={15} />
              </span>
              <span className="pt-1 min-w-0">
                <span className="text-[14px] font-medium">{n.label}</span>
                <span className="font-mono text-[11px] text-muted ml-2">{n.sub}</span>
              </span>
            </li>
          ))}
      </ol>
    </div>
  );
}
