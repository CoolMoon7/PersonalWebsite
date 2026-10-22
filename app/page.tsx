import type { Metadata } from "next";
import Image from "next/image";
import Logo from "@/components/Logo";
import AgentSystem from "@/components/AgentSystem";
import { SectionHead, Arrow } from "@/components/ui";
import { site, facts, experience } from "@/data/site";
import {
  contact, hero, summary, week, system, never, built, proof, cta,
} from "@/data/insurance";

export const metadata: Metadata = {
  title: { absolute: "Cole Bonawitz — AI employees for insurance agencies" },
  description:
    "An AI employee for independent commercial P&C agencies: it drafts COIs, renewal notices and endorsements from the policies in your AMS, and nothing sends without your approval. Built by Cole Bonawitz, Duke CS.",
  alternates: { canonical: "/" },
};

const EYEBROW = "font-mono text-[11px] tracking-[0.08em] uppercase text-muted";

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
        <div className="rise flex flex-wrap items-center gap-2 mb-7">
          <span className="chip"><span className="live-dot" /> {hero.chips[0]}</span>
          <span className="chip !h-auto !whitespace-normal py-1 text-left">{hero.chips[1]}</span>
        </div>

        <h1 className="rise text-[38px] leading-[1.03] sm:text-[56px] lg:text-[68px] font-semibold tracking-[-0.045em] max-w-4xl">
          {hero.line1}
          <br />
          <span className="text-faint">{hero.line2}</span>
        </h1>

        <p className="rise mt-6 text-[17px] sm:text-[19px] text-ink-2 leading-relaxed max-w-2xl">
          {hero.lede}
        </p>
        <p className="rise mt-4 text-[15px] text-muted leading-relaxed max-w-2xl">
          {hero.intro}
        </p>

        <div className="rise mt-8 flex items-center gap-4">
          <Image
            src="/images/coletalking.png"
            alt="Cole Bonawitz"
            width={96}
            height={96}
            priority
            className="w-14 h-14 rounded-full object-cover object-top border border-line flex-none"
          />
          <p className="text-[14px] text-muted leading-snug">
            Cole Bonawitz
            <br />
            Duke CS &apos;28 · Durham, NC
          </p>
        </div>

        <div className="rise mt-6 flex flex-wrap gap-3">
          <a href={contact.mailto} className="btn btn-dark">
            {cta.button} <Arrow />
          </a>
          <a href="#week" className="btn btn-ghost">See your week, described</a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Résumé</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Logo name="linkedin" size={15} /> LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">GitHub</a>
        </div>
        <p className="rise font-mono text-[11.5px] text-muted mt-4">{hero.area}</p>

        {/* The whole offer at a glance */}
        <div className="rise mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {summary.map((s) => (
            <div key={s.k} className="bg-white p-5">
              <div className="eyebrow mb-3">{s.k}</div>
              <div className="text-[17px] sm:text-[20px] font-semibold tracking-[-0.03em] leading-tight">{s.v}</div>
              <div className="text-[13px] text-muted leading-relaxed mt-2">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Their week ---------------- */}
      <section id="week" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <SectionHead id="week" index="01" kicker="Their week" title="Your Tuesday, in your words.">
          None of this is the insurance. It is the paper around the insurance, and it is what decides whether the account renews.
        </SectionHead>

        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {week.items.map((w) => (
            <li key={w.title} className="bg-white p-5 sm:p-6">
              <div className="font-mono text-[11px] text-accent">{w.when}</div>
              <h3 className="text-[16px] font-semibold tracking-[-0.01em] mt-2.5">{w.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed mt-2">{w.body}</p>
            </li>
          ))}
        </ol>

        <div className="panel mt-4 p-6 sm:p-8">
          <div className={EYEBROW}>What it adds up to</div>
          <ul className="mt-4 space-y-3">
            {week.pain.map((p) => (
              <li key={p} className="flex gap-3 text-[15.5px] sm:text-[17px] text-ink-2 leading-relaxed">
                <span className="text-accent font-mono text-[13px] pt-1">—</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- The system ---------------- */}
      <section id="system" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <SectionHead id="system" index="02" kicker="The system" title="Six steps, one human gate.">
          The shape is the same as the pipelines I build for outbound. The tools are the ones an agency already runs.
        </SectionHead>

        <div className="panel p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <p className="text-[15px] text-ink-2 leading-relaxed md:flex-1">{system.intro.what}</p>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[12px] shrink-0">
            <span className="chip !h-auto !whitespace-normal py-1">{system.intro.in}</span>
            <span className="text-accent">⟶</span>
            <span className="chip !h-auto !whitespace-normal py-1 !border-accent/40 text-accent">{system.intro.out}</span>
          </div>
        </div>

        <div className="panel mt-4 p-4 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {system.chips.map((c, i) => (
              <span key={c} className={i === 1 ? "chip !border-accent/40 text-accent" : "chip"}>{c}</span>
            ))}
            <span className="font-mono text-[11.5px] text-muted">The moving dots show which way data flows.</span>
          </div>
          <AgentSystem agents={system.agents} example={system.example} />
        </div>

        <div className="panel mt-4 p-5 sm:p-8">
          <h3 className="text-[19px] sm:text-[22px] font-semibold tracking-[-0.025em]">{system.report.title}</h3>
          <p className="text-[14.5px] text-muted leading-relaxed mt-2.5 max-w-2xl">{system.report.body}</p>
          <div className="mt-6 rounded-xl border border-line-2 bg-surface/60 p-4 font-mono text-[12px] text-ink-2">
            <div className="flex flex-wrap items-center gap-2 text-muted mb-3">
              <span>{system.report.logTitle}</span>
              <span className="chip !h-5 !text-[10px]">example week</span>
            </div>
            <ul className="space-y-2.5 leading-relaxed">
              {system.report.log.map((v) => (
                <li key={v} className="flex gap-2">
                  <span className="text-accent">+</span>
                  <span className="min-w-0">{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- What it will not do ---------------- */}
      <section id="limits" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <SectionHead id="limits" index="03" kicker="Boundaries" title="What it will not do.">
          Worth reading before anything else on this page. These are the reasons a compliance officer says yes.
        </SectionHead>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {never.map((n) => (
            <div key={n.title} className="panel p-5 sm:p-6">
              <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">{n.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed mt-2">{n.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- How it is built and run ---------------- */}
      <section id="built" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <SectionHead id="built" index="04" kicker="Built and run" title="One person, your book, no new software.">
          Built around your book and carriers, run by me, talked to by email. There is nothing for your office to install.
        </SectionHead>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {built.map((b) => (
            <div key={b.title} className="bg-white p-5 sm:p-6">
              <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">{b.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed mt-2">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Proof ---------------- */}
      <section id="proof" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <SectionHead id="proof" index="05" kicker="Proof" title="What I have actually done.">
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
        <p className="panel border-dashed p-5 sm:p-7 mt-4 text-[14.5px] text-muted leading-relaxed max-w-3xl">
          {proof.note}
        </p>
      </section>

      {/* ---------------- Background ---------------- */}
      <section id="about" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28">
        <SectionHead id="about" index="06" kicker="Background" title="Who is building this.">
          Engineer by training, operator by habit.
        </SectionHead>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {facts.map((f) => (
            <div key={f.v} className="bg-white p-5 sm:p-6">
              <div className="text-[24px] sm:text-[32px] font-semibold tracking-[-0.04em] leading-none">{f.v}</div>
              <div className="text-[13.5px] text-muted leading-relaxed mt-3">{f.d}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-4 mt-4">
          <div className="panel p-6 sm:p-8">
            <div className={EYEBROW}>Experience</div>
            <ol className="space-y-7 mt-6">
              {experience.map((e) => (
                <li key={e.role + e.org} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-1 sm:gap-6">
                  <span className="font-mono text-[11.5px] text-muted pt-1">{e.when}</span>
                  <div>
                    <div className="text-[16px] font-medium tracking-[-0.01em]">
                      {e.role} <span className="text-muted font-normal">· {e.org}</span>
                    </div>
                    <p className="text-[14.5px] text-muted leading-relaxed mt-1.5">{e.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="panel overflow-hidden flex flex-col">
            <div className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-line bg-surface/70">
              <span className={EYEBROW}>Résumé</span>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="font-mono text-[11.5px] text-foreground underline underline-offset-4 decoration-line-2 hover:decoration-foreground">
                Open PDF →
              </a>
            </div>
            <object data={`${site.resume}#toolbar=0&navpanes=0`} type="application/pdf" className="hidden lg:block w-full flex-1 min-h-[520px]">
              <span />
            </object>
            <div className="lg:hidden p-6">
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                Open résumé (PDF) <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section id="contact" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-28 ">
        <div className="relative panel overflow-hidden px-6 py-12 sm:px-14 sm:py-16">
          <div className="absolute inset-0 -z-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,#d4d4d8_1px,transparent_0)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
          <div className="relative">
            <span className="chip mb-6"><span className="live-dot" /> Twenty minutes · by email or on a call</span>
            <h2 className="text-[28px] sm:text-[40px] font-semibold tracking-[-0.04em] leading-[1.08] max-w-2xl">
              {cta.heading}
            </h2>
            <p className="text-[15.5px] sm:text-[16.5px] text-muted mt-5 max-w-lg leading-relaxed">{cta.body}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={contact.mailto} className="btn btn-dark">
                {cta.button} <Arrow />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Logo name="linkedin" size={15} /> LinkedIn
              </a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">GitHub</a>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Résumé</a>
            </div>
            <p className="font-mono text-[11.5px] text-muted mt-4 break-words">{cta.note}</p>
          </div>
        </div>

      </section>

      {/* Mobile: the one action, always in reach */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-white/90 backdrop-blur-xl px-4 py-3">
        <a href={contact.mailto} className="btn btn-dark w-full justify-center">
          {cta.button} <Arrow />
        </a>
      </div>
    </>
  );
}
