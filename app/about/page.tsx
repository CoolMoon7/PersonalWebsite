import type { Metadata } from "next";
import Image from "next/image";
import { SectionHead, Arrow } from "@/components/ui";
import { PageHeader, EYEBROW, ClosingCta } from "@/components/sections";
import { about, closing } from "@/data/home";
import { site, experience } from "@/data/site";
import { proof } from "@/data/insurance";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "About | Cole Bonawitz",
  description:
    "Cole Bonawitz is a Duke computer science student in Durham, NC, running the AI department for independent insurance agencies in the Triangle.",
  path: "/about",
});

const SECTION = "max-w-6xl mx-auto px-4 sm:px-6 mt-16 sm:mt-24";

export default function About() {
  return (
    <>
      <PageHeader eyebrow="About" title={about.title} lede={about.kicker} />

      <section className={SECTION}>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-4 mb-4">
          <div className="panel overflow-hidden relative aspect-[4/5] md:aspect-auto md:min-h-[420px]">
            <Image src="/images/coletalking.png" alt="Cole Bonawitz speaking at an event" fill sizes="(max-width: 768px) 100vw, 40vw" className="object-cover object-top" />
            <span className="absolute left-3 bottom-3 chip !bg-white/90 backdrop-blur">Chattanooga, TN → Durham, NC</span>
          </div>
          <div className="panel p-6 sm:p-8 flex flex-col">
            <div className="space-y-4 text-[16px] text-ink-2 leading-relaxed">
              {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            </div>
            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Résumé (PDF)</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">LinkedIn</a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">GitHub</a>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {about.stats.map((f) => (
            <div key={f.v} className="bg-white p-5 sm:p-6">
              <div className="text-[24px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-none">{f.v}</div>
              <div className="text-[13.5px] text-muted leading-relaxed mt-3">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className={SECTION}>
        <SectionHead index="01" kicker="Proof" title="What I have actually done.">
          Two things, stated plainly. No logos, no client names, no numbers I cannot point at.
        </SectionHead>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {proof.items.map((p) => (
            <div key={p.title} className="panel p-5 sm:p-7 flex flex-col">
              <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{p.title}</h3>
              {p.figures.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
                  {p.figures.map((f) => (
                    <div key={f.l} className="bg-white px-3 py-3">
                      <div className="text-[22px] sm:text-[26px] font-semibold tracking-[-0.04em] tabular-nums leading-none">{f.v}</div>
                      <div className="font-mono text-[10.5px] text-muted mt-2 leading-tight">{f.l}</div>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-[14.5px] text-ink-2 leading-relaxed mt-4">{p.body}</p>
            </div>
          ))}
        </div>
        <p className="panel border-dashed p-5 sm:p-7 mt-4 text-[14.5px] text-muted leading-relaxed max-w-3xl">{proof.note}</p>
      </section>

      <section className={SECTION}>
        <div className="panel p-6 sm:p-8">
          <div className={EYEBROW}>Experience</div>
          <ol className="space-y-7 mt-6">
            {experience.map((e) => (
              <li key={e.role + e.org} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-1 sm:gap-6">
                <span className="font-mono text-[11.5px] text-muted pt-1">{e.when}</span>
                <div>
                  <div className="text-[16px] font-medium tracking-[-0.01em]">{e.role} <span className="text-muted font-normal">· {e.org}</span></div>
                  <p className="text-[14.5px] text-muted leading-relaxed mt-1.5">{e.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-8">Open résumé (PDF) <Arrow /></a>
        </div>
      </section>

      <ClosingCta title={closing.title} />
    </>
  );
}
