import type { Metadata } from "next";
import { SectionHead } from "@/components/ui";
import { PageHeader, VerbCards, CadenceStrip, WeeklyReport, PricingCard, Partnership, ClosingCta } from "@/components/sections";
import { steps, closing } from "@/data/home";
import { built } from "@/data/insurance";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "How it works | Cole Bonawitz",
  description:
    "How the AI department works: the audit, the weekly report, the monthly briefing, the quarterly improvement and how pricing is explained.",
  path: "/how-it-works",
});

const SECTION = "max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28";

export default function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title="One person who owns AI for your agency."
        lede="I choose, connect, run and keep current every AI tool you use, and I report on it every Friday."
      />
      <section className={SECTION}>
        <SectionHead index="01" kicker="The four verbs" title="Choose. Connect. Run. Keep current." />
        <VerbCards />
      </section>

      <section className={SECTION}>
        <SectionHead index="02" kicker="The engagement" title="Three steps." />
        <ol className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((s) => (
            <li key={s.k} className="panel p-5 sm:p-6">
              <div className="font-mono text-[11px] text-accent">{s.k}</div>
              <h3 className="text-[18px] font-semibold tracking-[-0.02em] mt-2">{s.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed mt-2">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={SECTION}>
        <SectionHead index="03" kicker="The weekly report" title="What you read on Friday." />
        <WeeklyReport />
      </section>

      <section className={SECTION}>
        <SectionHead index="04" kicker="The cadence" title="What you can count on." />
        <CadenceStrip />
      </section>

      <section className={SECTION}>
        <SectionHead index="05" kicker="How it's run" title="One person, your systems, no new software." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {built.map((b) => (
            <div key={b.title} className="bg-white p-5 sm:p-6">
              <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">{b.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed mt-2">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={SECTION}>
        <SectionHead index="06" kicker="How pricing works" title="Pricing you can read before you sign." />
        <PricingCard />
      </section>

      <section className={SECTION}>
        <SectionHead index="07" kicker="The 12-month partnership" title="What's included, and what stays yours." />
        <Partnership />
      </section>

      <ClosingCta title={closing.title} />
    </>
  );
}
