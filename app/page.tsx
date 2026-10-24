import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/ui";
import { CtaPair, ClosingCta, Faq } from "@/components/sections";
import ServiceMap from "@/components/ServiceMap";
import Tiers from "@/components/Tiers";
import { VerbLine, ProblemStrip, EngagementFlow, QuoteFlow, ReportMock, Limits } from "@/components/visuals";
import { system } from "@/data/insurance";
import { hero, about, closing } from "@/data/home";
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
        <div className="rise eyebrow mb-6">{hero.eyebrow}</div>
        <h1 className="rise text-[40px] leading-[1.02] sm:text-[60px] lg:text-[76px] font-semibold tracking-[-0.05em] max-w-4xl">
          {hero.line1}
          <br />
          <span className="text-faint">{hero.line2}</span>
        </h1>
        <p className="rise mt-6 text-[18px] sm:text-[21px] text-ink-2 leading-snug max-w-2xl">
          I run every AI tool your agency uses. You get a report every Friday.
        </p>
        <div className="rise mt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
          <Image
            src="/images/coletalking.png"
            alt="Cole Bonawitz"
            width={160}
            height={160}
            priority
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top border border-line flex-none"
          />
          <div>
            <CtaPair />
            <p className="font-mono text-[11.5px] text-muted mt-3">{hero.byline}</p>
          </div>
        </div>
        <div className="rise mt-12">
          <VerbLine />
        </div>
      </section>

      <section id="problem" className={`${SECTION} !mt-14`}>
        <div className="eyebrow mb-3">Why agencies call me</div>
        <ProblemStrip />
        <p className="text-[17px] sm:text-[19px] font-medium tracking-[-0.02em] mt-5">Everyone is selling you a tool. Nobody owns the result. That&apos;s the job I take on.</p>
      </section>

      <section id="map" className={SECTION}>
        <SectionHead index="01" kicker="What I do" title="Where I work in your agency.">Tap anything to see what I do.</SectionHead>
        <ServiceMap />
      </section>

      <section id="levels" className={SECTION}>
        <SectionHead index="02" kicker="Levels" title="How far you take it.">Start anywhere. Add a level when you&apos;re ready.</SectionHead>
        <Tiers />
      </section>

      <section id="how" className={SECTION}>
        <SectionHead index="03" kicker="How it runs" title="Audit first. Then one fixed department.">No new software for your team to learn.</SectionHead>
        <EngagementFlow />
      </section>

      <section id="report" className={SECTION}>
        <SectionHead index="04" kicker="How you see the value" title="A report every Friday.">Plain language, from your own systems.</SectionHead>
        <ReportMock />
      </section>

      <section id="quote" className={SECTION}>
        <SectionHead index="05" kicker="How I quote" title="Pricing you can read before you sign.">No prices on this page. Every quote is written.</SectionHead>
        <QuoteFlow />
      </section>

      <section id="limits" className={SECTION}>
        <SectionHead index="06" kicker="Boundaries" title="What I won't do.">Licensed people approve everything.</SectionHead>
        <Limits />
      </section>

      <section id="coi" className={SECTION}>
        <SectionHead index="07" kicker="Flagship" title="The COI desk, end to end.">The first workflow I built.</SectionHead>
        <div className="panel p-5 sm:p-7">
          <ol className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {system.agents.map((a) => (
              <li key={a.k} className={`rounded-[10px] border px-3 py-3 ${a.kind === "gate" ? "border-accent/50 border-dashed" : "border-line-2"}`}>
                <div className="font-mono text-[10.5px] text-muted">{a.k}</div>
                <div className="text-[15px] font-semibold tracking-[-0.02em] mt-1">{a.title}</div>
                {a.kind === "gate" && <div className="font-mono text-[10.5px] text-accent mt-1">a person</div>}
              </li>
            ))}
          </ol>
          <Link href="/services/coi-desk" className="btn btn-ghost mt-5">Watch it work</Link>
        </div>
      </section>

      <section id="about" className={SECTION}>
        <SectionHead index="08" kicker="Who" title="Cole Bonawitz.">
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
        <SectionHead index="09" kicker="FAQ" title="Quick answers." />
        <Faq />
      </section>

      <ClosingCta title={closing.title} />
    </>
  );
}
