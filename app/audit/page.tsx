import type { Metadata } from "next";
import Link from "next/link";
import { SectionHead } from "@/components/ui";
import { PageHeader, EYEBROW } from "@/components/sections";
import { audit, cta } from "@/data/home";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "AI readiness audit for insurance agencies",
  description:
    "A fixed-fee audit of how work moves through your independent insurance agency: every AI tool in use, the AI you aren't using, a ranked plan and a draft AI policy.",
  path: "/audit",
});

const SECTION = "max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24";

export default function Audit() {
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <>
      <PageHeader eyebrow={audit.eyebrow} title={audit.title} lede={audit.lede} />

      <section className={SECTION}>
        <SectionHead index="01" kicker="What you get" title="What the audit delivers." />
        <ol className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {audit.delivers.map((d, i) => (
            <li key={d} className="bg-white p-5 sm:p-6 flex gap-4">
              <span className="font-mono text-[11px] text-accent pt-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[15px] text-ink-2 leading-relaxed">{d}</span>
            </li>
          ))}
        </ol>
        <p className="panel mt-4 p-5 sm:p-6 text-[15px] text-ink-2 leading-relaxed">{audit.fee}</p>
      </section>

      <section className={SECTION}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="panel p-6 sm:p-8">
            <div className={EYEBROW}>Who it&apos;s for</div>
            <ul className="mt-4 space-y-3">
              {audit.forWho.map((w) => (
                <li key={w} className="flex gap-3 text-[15px] text-ink-2 leading-relaxed">
                  <span className="text-accent font-mono text-[13px] pt-0.5">—</span>{w}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel p-6 sm:p-8">
            <div className={EYEBROW}>What I&apos;ll ask you</div>
            <ul className="mt-4 space-y-3">
              {audit.ask.map((a) => (
                <li key={a.t} className="text-[15px] text-ink-2 leading-relaxed">
                  <span className="font-medium text-foreground">{a.t}.</span> {a.d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={SECTION}>
        <SectionHead index="02" kicker="Book" title="Book your audit." />
        <div className="panel p-6 sm:p-8">
          <div className="flex flex-wrap gap-3">
            <Link href={cta.audit.href} className="btn btn-dark">{cta.audit.label}</Link>
            {booking && (
              <a href={booking} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Pick a time</a>
            )}
          </div>
          <p className="font-mono text-[11.5px] text-muted mt-4">I&apos;ll read your website before we talk. If it isn&apos;t a fit, I&apos;ll say so.</p>
        </div>
      </section>
    </>
  );
}
