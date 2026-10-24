import Image from "next/image";
import { CtaPair } from "@/components/sections";
import HeroChips from "@/components/HeroChips";

const C = 170;
const R = 128;
const NODES = [
  { label: "Build", angle: -90 },
  { label: "Run", angle: 30 },
  { label: "Keep current", angle: 150 },
];
const pt = (deg: number) => [C + R * Math.cos((deg * Math.PI) / 180), C + R * Math.sin((deg * Math.PI) / 180)];

/** One person, one loop: build it, run it, keep it current. */
function Loop() {
  const arcs = NODES.map((n, i) => {
    const next = NODES[(i + 1) % NODES.length];
    const from = pt(n.angle + 24);
    const to = pt(next.angle - 24);
    return `M${from[0]},${from[1]} A${R},${R} 0 0 1 ${to[0]},${to[1]}`;
  });
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] mx-auto lg:mx-0 flex-none" role="img" aria-label="Build, run, keep current, in a loop">
      <svg viewBox="0 0 340 340" className="absolute inset-0 w-full h-full" aria-hidden>
        <defs>
          <marker id="arr" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1 1l6 3-6 3" fill="none" stroke="#2f5bff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        {arcs.map((d) => (
          <path key={d} d={d} fill="none" stroke="#2f5bff" strokeWidth="1.6" strokeDasharray="2 5" strokeLinecap="round" markerEnd="url(#arr)" className="wf-edge" />
        ))}
      </svg>
      <Image
        src="/images/coletalking.png"
        alt="Cole Bonawitz"
        width={160}
        height={160}
        priority
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[132px] h-[132px] rounded-full object-cover object-top border border-line-2"
      />
      {NODES.map((n) => {
        const [x, y] = pt(n.angle);
        return (
          <span
            key={n.label}
            className="absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground text-white px-4 h-9 flex items-center text-[14px] font-medium tracking-[-0.01em]"
            style={{ left: `${(x / 340) * 100}%`, top: `${(y / 340) * 100}%` }}
          >
            {n.label}
          </span>
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-16 items-center">
        <div>
          <div className="rise eyebrow mb-6">For independent insurance agencies · Durham and the Triangle</div>
          <h1 className="rise text-[40px] leading-[1.02] sm:text-[60px] lg:text-[72px] font-semibold tracking-[-0.05em]">
            Your agency&apos;s
            <br />
            <span className="text-faint">AI department.</span>
          </h1>
          <p className="rise mt-6 text-[22px] sm:text-[28px] font-medium tracking-[-0.03em] leading-tight">
            I build it. I run it.
            <br />
            I keep it current.
          </p>
          <div className="rise mt-8">
            <CtaPair />
            <p className="font-mono text-[11.5px] text-muted mt-3">Cole Bonawitz · Duke CS &apos;28 · Durham, NC</p>
          </div>
        </div>
        <div className="rise"><Loop /></div>
      </div>

      <div className="rise mt-14">
        <div className="eyebrow mb-3">Pick what you need</div>
        <HeroChips />
      </div>
    </section>
  );
}
