import type { Metadata } from "next";
import Link from "next/link";
import { SectionHead } from "@/components/ui";
import { ClosingCta, Faq } from "@/components/sections";
import Hero from "@/components/Hero";
import { MarkMarquee, SystemsStrip, CaseStudies } from "@/components/Marks";
import ServiceMap from "@/components/ServiceMap";
import Tiers from "@/components/Tiers";
import { EngagementFlow, QuoteFlow, ReportMock, Limits } from "@/components/visuals";
import { about, closing } from "@/data/home";
import { pageMeta, jsonLd } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Cole Bonawitz | Your agency's AI department",
  description:
    "AI operations for independent insurance agencies in the Triangle. I choose, connect, run and keep current every AI tool you use, with a report every Friday. Based in Durham, NC.",
  path: "/",
});

const SECTION = "scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
      <Hero />

      <section aria-label="Background" className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 sm:mt-16">
        <div className="eyebrow mb-4 text-center">Studied, built and worked at</div>
        <MarkMarquee />
      </section>

      <section id="map" className={SECTION}>
        <SectionHead index="01" kicker="What I do" title="Where I work in your agency.">Tap anything to see what I do.</SectionHead>
        <ServiceMap />
      </section>

      <section id="levels" className={SECTION}>
        <SectionHead index="02" kicker="Levels" title="How far you take it.">Start anywhere. Add a level when you&apos;re ready.</SectionHead>
        <Tiers />
      </section>

      <section id="systems" className={SECTION}>
        <SectionHead index="03" kicker="Your stack" title="I work around the system you run.">Tell me which one. I confirm access in the audit.</SectionHead>
        <SystemsStrip />
      </section>

      <section id="cases" className={SECTION}>
        <SectionHead index="04" kicker="Work" title="Systems I&apos;ve built.">Real projects, stated plainly.</SectionHead>
        <CaseStudies />
      </section>

      <section id="how" className={SECTION}>
        <SectionHead index="05" kicker="How it runs" title="Audit first. Then one fixed department.">No new software for your team to learn.</SectionHead>
        <EngagementFlow />
      </section>

      <section id="report" className={SECTION}>
        <SectionHead index="06" kicker="How you see the value" title="A report every Friday.">Plain language, from your own systems.</SectionHead>
        <ReportMock />
      </section>

      <section id="quote" className={SECTION}>
        <SectionHead index="07" kicker="How I quote" title="Pricing you can read before you sign.">No prices on this page. Every quote is written.</SectionHead>
        <QuoteFlow />
      </section>

      <section id="limits" className={SECTION}>
        <SectionHead index="08" kicker="Boundaries" title="What I won't do.">Licensed people approve everything.</SectionHead>
        <Limits />
      </section>

      <section id="about" className={SECTION}>
        <SectionHead index="09" kicker="Who" title="Cole Bonawitz.">
          <Link href="/about" className="underline underline-offset-4">More about me</Link>
        </SectionHead>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {about.stats.map((f) => (
            <div key={f.v} className="bg-white p-4 sm:p-5">
              <div className="text-[26px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-none">{f.v}</div>
              <div className="text-[13px] text-muted leading-relaxed mt-3">{f.d}</div>
            </div>
          ))}
        </div>
        <p className="text-[15px] text-muted mt-4 max-w-3xl">Duke CS student in Durham. Starting with Triangle agencies, and I&apos;ll tell you when something isn&apos;t a fit.</p>
      </section>

      <section id="faq" className={SECTION}>
        <SectionHead index="10" kicker="FAQ" title="Quick answers." />
        <Faq />
      </section>

      <ClosingCta title={closing.title} />
    </>
  );
}
