import type { Metadata } from "next";
import { SectionHead } from "@/components/ui";
import { PageHeader, ClosingCta, Boundaries } from "@/components/sections";
import { CoiPains, CoiWorkflow, CoiReport } from "@/components/coi";
import { never } from "@/data/insurance";
import { cta } from "@/data/home";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "The COI desk | AI that drafts certificates of insurance",
  description:
    "Certificate of insurance requests set up around the tools your agency already has, drafted for a licensed person to approve. Nothing is issued until a person says so.",
  path: "/services/coi-desk",
});

const SECTION = "max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28";

export default function CoiDesk() {
  return (
    <>
      <PageHeader
        eyebrow="Service · certificates of insurance"
        title="Certificate requests, handled."
        lede="I set up certificate drafting around the tools your agency already has. If there's a gap, I build the missing piece. A licensed person approves every certificate."
      />

      <section className={SECTION}>
        <SectionHead index="01" kicker="The COI desk" title="Your certificate queue, in your words.">
          None of this is the insurance. It is the paper around the insurance, and it decides whether the payment releases and the account renews.
        </SectionHead>
        <CoiPains />
      </section>

      <section className={SECTION}>
        <SectionHead index="02" kicker="Example workflow" title="How a request could move through your desk.">An example. I confirm what your management system supports during the audit.</SectionHead>
        <CoiWorkflow />
        <div className="mt-4"><CoiReport /></div>
      </section>

      <section className={SECTION}>
        <SectionHead index="03" kicker="Boundaries" title="What it will not do." />
        <Boundaries items={never} />
      </section>

      <section className={SECTION}>
        <div className="panel p-6 sm:p-8">
          <h3 className="text-[20px] font-semibold tracking-[-0.02em]">Where it fits</h3>
          <p className="text-[15px] text-ink-2 leading-relaxed mt-3 max-w-3xl">
            It suits commercial agencies that issue certificates daily. I confirm access to your management system during the audit.
          </p>
        </div>
      </section>

      <ClosingCta title={`${cta.audit.label}, and we'll see whether certificates are where your hours go.`} />
    </>
  );
}
