import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/ui";
import {
  CtaPair, ClosingCta, Problem, VerbCards, CadenceStrip, Timeline, ServiceGrid, Partnership, Faq, Boundaries,
} from "@/components/sections";
import { CoiWorkflow } from "@/components/coi";
import { hero, problem, coiIntro, about, closing, trust } from "@/data/home";
import { pageMeta } from "@/lib/meta";

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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
        <div className="rise eyebrow mb-7">{hero.eyebrow}</div>
        <h1 className="rise text-[38px] leading-[1.03] sm:text-[56px] lg:text-[68px] font-semibold tracking-[-0.045em] max-w-4xl">
          {hero.line1}
          <br />
          <span className="text-faint">{hero.line2}</span>
        </h1>
        <p className="rise mt-6 text-[17px] sm:text-[19px] text-ink-2 leading-relaxed max-w-2xl">{hero.sub}</p>
        <div className="rise mt-8 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
          <Image
            src="/images/coletalking.png"
            alt="Cole Bonawitz"
            width={160}
            height={160}
            priority
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover object-top border border-line flex-none"
          />
          <div>
            <CtaPair />
            <p className="font-mono text-[11.5px] text-muted mt-4">{hero.byline}</p>
          </div>
        </div>
        <div className="rise mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {hero.summary.map((s) => (
            <div key={s.k} className="bg-white p-5">
              <div className="eyebrow mb-3">{s.k}</div>
              <div className="text-[17px] sm:text-[20px] font-semibold tracking-[-0.03em] leading-tight">{s.v}</div>
              <div className="text-[13px] text-muted leading-relaxed mt-2">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="problem" className={SECTION}>
        <SectionHead index="01" kicker="The problem" title="Why this job exists." />
        <Problem {...problem} />
      </section>

      <section id="department" className={SECTION}>
        <SectionHead index="02" kicker="What an AI department does" title="Choose. Connect. Run. Keep current." />
        <VerbCards />
        <CadenceStrip />
      </section>

      <section id="services" className={SECTION}>
        <SectionHead index="03" kicker="Services at a glance" title="Pick one, or let the audit tell us which.">
          <Link href="/services" className="underline underline-offset-4">See every service</Link>
        </SectionHead>
        <ServiceGrid compact />
        <CtaPair className="mt-8" />
      </section>

      <section id="coi" className={SECTION}>
        <SectionHead index="04" kicker="The flagship: the COI desk" title="From COI request to issued certificate.">
          {coiIntro}
        </SectionHead>
        <CoiWorkflow />
        <Link href="/services/coi-desk" className="btn btn-ghost mt-5">More on the COI desk</Link>
      </section>

      <section id="sixty" className={SECTION}>
        <SectionHead index="05" kicker="Your first 60 days" title="What the first two months look like." />
        <Timeline />
      </section>

      <section id="limits" className={SECTION}>
        <SectionHead index="06" kicker="Boundaries" title="What I won't do.">
          <Link href="/trust" className="underline underline-offset-4">Read the full page</Link>
        </SectionHead>
        <Boundaries items={trust.items.slice(0, 6)} />
      </section>

      <section id="partnership" className={SECTION}>
        <SectionHead index="07" kicker="The 12-month partnership" title="One fixed monthly fee, and you keep the work." />
        <Partnership />
      </section>

      <section id="about" className={SECTION}>
        <SectionHead index="08" kicker="Who is building this" title={about.title}>
          <Link href="/about" className="underline underline-offset-4">More about me</Link>
        </SectionHead>
        <div className="panel p-6 sm:p-8">
          <p className="text-[16px] text-ink-2 leading-relaxed max-w-3xl">{about.short}</p>
          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden">
            {about.stats.map((f) => (
              <div key={f.v} className="bg-white p-4 sm:p-5">
                <div className="text-[24px] sm:text-[30px] font-semibold tracking-[-0.04em] leading-none">{f.v}</div>
                <div className="text-[13px] text-muted leading-relaxed mt-3">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className={SECTION}>
        <SectionHead index="09" kicker="FAQ" title="Questions I get asked." />
        <Faq />
      </section>

      <ClosingCta title={closing.title} />
    </>
  );
}
