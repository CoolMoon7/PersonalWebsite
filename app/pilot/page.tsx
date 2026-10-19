import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Workflow from "@/components/Workflow";
import Logo from "@/components/Logo";
import { SectionHead, Arrow } from "@/components/ui";
import { systems } from "@/data/systems";
import { site, telemetry } from "@/data/site";
import { pilot, goodFit, notFit, phases, safeguards, faq, requestPrompts } from "@/data/pilot";

export const metadata: Metadata = {
  title: "Custom lead pipeline pilot",
  description:
    "A custom lead pipeline for your business, built in two weeks. You pay only if it works. Request a fit call.",
  alternates: { canonical: "/pilot" },
  // Written for people who received a message from me, not for search.
  robots: { index: false, follow: true },
};

const mailBody = requestPrompts.map((p) => `${p}:\n`).join("\n");
const mailto = `mailto:${pilot.email}?subject=${encodeURIComponent("Fit call request")}&body=${encodeURIComponent(mailBody)}`;

export default function PilotPage() {
  const flagship = systems[0];
  const proof = telemetry.filter((t) => t.source === "swoop-outbound");

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <div className="rise flex flex-wrap items-center gap-3 mb-8">
          <span className="chip">
            <span className="live-dot" /> Taking on a few pilot projects
          </span>
          <span className="chip hidden sm:inline-flex">2-week build · paid only if it works</span>
        </div>

        <h1
          className="rise text-[42px] leading-[1.02] sm:text-[64px] lg:text-[76px] font-semibold tracking-[-0.045em] max-w-4xl"
          style={{ "--rd": "0.05s" } as React.CSSProperties}
        >
          A lead pipeline
          <br />
          <span className="text-faint">built around your business.</span>
        </h1>

        <div className="rise mt-7 flex flex-col sm:flex-row sm:items-center gap-5" style={{ "--rd": "0.12s" } as React.CSSProperties}>
          <Image
            src="/images/coletalking.png"
            alt="Cole Bonawitz"
            width={56}
            height={56}
            priority
            className="w-14 h-14 rounded-full object-cover object-top border border-line flex-none"
          />
          <p className="text-[17px] sm:text-[18px] text-ink-2 leading-relaxed max-w-2xl">
            I&apos;m Cole. I build the system that finds, researches and queues your ideal customers, so your team
            stops doing it by hand. Before we start I want to check it is worth it for both of us, so
            there is a short <strong className="font-medium text-foreground">fit check</strong> first.
          </p>
        </div>

        <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--rd": "0.18s" } as React.CSSProperties}>
          <a href="#request" className="btn btn-dark">
            Request a fit call <Arrow />
          </a>
          <a href="#proof" className="btn btn-ghost">See what I&apos;ve built</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-3" aria-label="LinkedIn">
            <Logo name="linkedin" size={16} />
          </a>
        </div>
      </section>

      {/* ---------------- Fit ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="fit" index="01" kicker="Fit check" title="I work with a specific kind of business.">
          I take on a small number of pilots at a time, so I choose carefully. Read this before you reach out.
        </SectionHead>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="panel p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <span className="live-dot" />
              <h3 className="text-[17px] font-semibold tracking-[-0.01em]">Likely a good fit</h3>
            </div>
            <ul className="space-y-3.5">
              {goodFit.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-ink-2 leading-relaxed">
                  <span className="text-live font-mono text-[13px] pt-0.5">+</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="panel border-dashed p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-[7px] h-[7px] rounded-full bg-faint" />
              <h3 className="text-[17px] font-semibold tracking-[-0.01em]">Probably not a fit</h3>
            </div>
            <ul className="space-y-3.5">
              {notFit.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] text-muted leading-relaxed">
                  <span className="text-faint font-mono text-[13px] pt-0.5">–</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------------- Proof ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="proof" index="02" kicker="Proof" title="Built and measured, not promised.">
          The engine I built for Swoop Tutors, a 4-person startup. Every number traces to the system behind it.
        </SectionHead>
        <Workflow wf={flagship.workflow} title={`~/systems/${flagship.slug} — ${flagship.client.toLowerCase()}`} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden mt-4">
          {proof.map((t) => (
            <Link key={t.label} href={`/systems/${t.source}`} className="group bg-white p-5 sm:p-6 hover:bg-surface transition-colors">
              <div className="text-[30px] sm:text-[38px] font-semibold tracking-[-0.04em] tabular-nums leading-none">{t.value}</div>
              <div className="text-[14px] text-ink-2 mt-3">{t.label}</div>
              <div className="font-mono text-[11px] text-faint mt-2 group-hover:text-accent transition-colors">↳ {t.source}</div>
            </Link>
          ))}
        </div>
        <p className="font-mono text-[11.5px] text-muted mt-3 px-1">
          More systems, with the architecture and run logs, on the{" "}
          <Link href="/#systems" className="text-foreground underline underline-offset-4 decoration-line-2 hover:decoration-foreground">
            homepage
          </Link>
          .
        </p>
      </section>

      {/* ---------------- Pilot ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="pilot" index="03" kicker="The pilot" title="Fourteen days, start to decision.">
          A fixed scope with a checkpoint at the end. You are never committed past it.
        </SectionHead>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {phases.map((p, i) => (
            <li key={p.when} className="bg-white p-5 sm:p-6 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] text-accent">{p.when}</span>
                {i < phases.length - 1 && <span className="hidden lg:block font-mono text-faint text-[12px]">→</span>}
              </div>
              <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{p.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed mt-2">{p.body}</p>
              <div className="mt-auto pt-5 font-mono text-[11px] text-ink-2">
                <span className="text-faint">out · </span>
                {p.out}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- Safeguards ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead index="04" kicker="Guardrails" title="Built so you can trust it." />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {safeguards.map((s) => (
            <div key={s.title} className="panel p-6">
              <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="text-[14.5px] text-muted leading-relaxed mt-2">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Terms ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead index="05" kicker="Terms" title="Plain terms, in writing before we start." />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          <div className="bg-white p-6 sm:p-7">
            <div className="eyebrow mb-4">The pilot</div>
            <p className="text-[15px] text-ink-2 leading-relaxed">
              A fixed setup fee, agreed in writing before I start. If it does not meet the numbers we agreed on
              day zero, you owe nothing.
            </p>
          </div>
          <div className="bg-white p-6 sm:p-7">
            <div className="eyebrow mb-4">After the pilot</div>
            <p className="text-[15px] text-ink-2 leading-relaxed">
              If it works and you want me to keep it running, the monthly fee is typically{" "}
              <strong className="font-medium text-foreground">{pilot.monthly}</strong>, depending on scope. It covers
              running, maintenance, tuning and the weekly report.
            </p>
          </div>
          <div className="bg-white p-6 sm:p-7">
            <div className="eyebrow mb-4">Your side</div>
            <p className="text-[15px] text-ink-2 leading-relaxed">
              Cancel any time. You keep the system either way. No long contract and no lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead index="06" kicker="Questions" title="Things people ask first." />
        <div className="border-t border-line">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-line py-5">
              <summary className="list-none cursor-pointer flex items-center justify-between gap-6 text-[17px] font-medium tracking-[-0.01em] [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="font-mono text-faint group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="text-[15.5px] text-muted leading-relaxed mt-3 max-w-3xl">
                {f.a.replace("{monthly}", pilot.monthly)}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ---------------- Request ---------------- */}
      <section id="request" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <div className="relative panel overflow-hidden px-6 py-14 sm:px-14 sm:py-20">
          <div className="absolute inset-0 -z-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,#d4d4d8_1px,transparent_0)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
          <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-10 items-start">
            <div>
              <span className="chip mb-6"><span className="live-dot" /> I read every request myself</span>
              <h2 className="text-[32px] sm:text-[46px] font-semibold tracking-[-0.04em] leading-[1.05]">
                Request a fit call.
                <br />
                <span className="text-faint">Tell me about your business.</span>
              </h2>
              <p className="text-[16px] text-muted mt-5 max-w-lg leading-relaxed">
                Answer four short questions by email. I review each one, and I reply within 24 hours. If I do not
                think I can help, I will say so and point you somewhere useful.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={mailto} className="btn btn-dark">
                  Request a fit call <Arrow />
                </a>
                {pilot.booking && (
                  <a href={pilot.booking} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    Book a time directly
                  </a>
                )}
              </div>
              <p className="font-mono text-[11.5px] text-muted mt-4">Opens an email to {pilot.email} with the questions filled in.</p>
            </div>

            <ol className="panel bg-white/80 p-6 space-y-4">
              {requestPrompts.map((q, i) => (
                <li key={q} className="flex gap-4 items-baseline">
                  <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[15.5px] text-ink-2">{q}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </>
  );
}
