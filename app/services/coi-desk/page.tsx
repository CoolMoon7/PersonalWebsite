import type { Metadata } from "next";
import { SectionHead } from "@/components/ui";
import { PageHeader, ClosingCta, Boundaries } from "@/components/sections";
import { CoiPains, CoiWorkflow, CoiReport } from "@/components/coi";
import { hero, never } from "@/data/insurance";
import { cta } from "@/data/home";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "The COI desk | AI that drafts certificates of insurance",
  description:
    "An AI agent that reads certificate requests, checks the policy and drafts the COI for your team to approve. Nothing is issued until a person says so.",
  path: "/services/coi-desk",
});

const SECTION = "max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28";

export default function CoiDesk() {
  return (
    <>
      <PageHeader eyebrow="Flagship service · certificates of insurance" title={`${hero.line1} ${hero.line2}`} lede={hero.lede} />

      <section className={SECTION}>
        <SectionHead index="01" kicker="The COI desk" title="Your certificate queue, in your words.">
          None of this is the insurance. It is the paper around the insurance, and it decides whether the payment releases and the account renews.
        </SectionHead>
        <CoiPains />
      </section>

      <section className={SECTION}>
        <SectionHead index="02" kicker="The agent workflow" title="From COI request to issued certificate." />
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

      <ClosingCta title={`${cta.audit.label}, and I'll show you the desk on your own certificates.`} />
    </>
  );
}
