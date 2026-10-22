import Image from "next/image";
import Logo from "@/components/Logo";
import { SectionHead, Arrow } from "@/components/ui";
import { site, jobs, steps, principles, facts, experience } from "@/data/site";

const inbox = [
  { t: "8:02", from: "web form", what: "Quote request · commercial auto, 6 vehicles", state: "Intake complete, 2 items requested", tone: "done" },
  { t: "8:14", from: "email", what: "COI request · general contractor, new project", state: "Matched to policy, ready to approve", tone: "gate" },
  { t: "8:31", from: "voicemail", what: "Add a teen driver to homeowner's auto policy", state: "Change drafted for producer", tone: "gate" },
  { t: "9:05", from: "renewal calendar", what: "41 policies renewing in 60 days", state: "Outreach drafted, 3 at-risk flagged", tone: "done" },
  { t: "9:40", from: "lead", what: "Old quote from March, no reply", state: "Follow-up #2 sent after approval", tone: "done" },
];

function Social({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label={label}>
      {children}
    </a>
  );
}

function GitHubMark() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <div className="rise flex flex-wrap items-center gap-3 mb-8">
          <span className="chip">
            <span className="live-dot" /> Live with my first insurance agency client
          </span>
          <span className="chip hidden sm:inline-flex">Duke CS · &apos;28</span>
        </div>

        <h1
          className="rise text-[42px] leading-[1.02] sm:text-[64px] lg:text-[76px] font-semibold tracking-[-0.045em] max-w-4xl"
          style={{ "--rd": "0.05s" } as React.CSSProperties}
        >
          An AI employee
          <br />
          <span className="text-faint">for insurance agencies.</span>
        </h1>

        <div className="rise mt-7 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7" style={{ "--rd": "0.12s" } as React.CSSProperties}>
          <Image
            src="/images/coletalking.png"
            alt="Cole Bonawitz"
            width={160}
            height={160}
            priority
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover object-top border border-line flex-none"
          />
          <p className="text-[17px] sm:text-[18px] text-ink-2 leading-relaxed max-w-2xl">
            I&apos;m Cole Bonawitz, a computer science student at Duke. I build automated systems that handle the
            repetitive work of an independent agency, from quote intake to certificates to renewals, so producers
            and account managers spend their time on clients. A licensed person approves everything that matters.
          </p>
        </div>

        <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--rd": "0.18s" } as React.CSSProperties}>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
            View résumé <Arrow />
          </a>
          <Social href={site.linkedin} label="LinkedIn">
            <Logo name="linkedin" size={15} /> LinkedIn
          </Social>
          <Social href={site.github} label="GitHub">
            <GitHubMark /> GitHub
          </Social>
          <a href="#contact" className="btn btn-ghost">Talk to me</a>
        </div>

        {/* A morning at the agency, handled */}
        <div className="rise mt-14 sm:mt-16" style={{ "--rd": "0.26s" } as React.CSSProperties}>
          <div className="panel overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-surface/70 font-mono text-[11.5px] text-muted">
              <span className="live-dot" />
              agency-ai · morning queue
              <span className="ml-auto hidden sm:inline">illustrative example</span>
            </div>
            <ul className="divide-y divide-line">
              {inbox.map((r) => (
                <li key={r.what} className="grid grid-cols-[48px_1fr] sm:grid-cols-[56px_110px_1fr_auto] gap-x-4 gap-y-1 items-center px-4 py-3.5">
                  <span className="font-mono text-[11.5px] text-faint">{r.t}</span>
                  <span className="hidden sm:block font-mono text-[11.5px] text-muted">{r.from}</span>
                  <span className="text-[14.5px] text-foreground">{r.what}</span>
                  <span
                    className={`col-start-2 sm:col-start-auto font-mono text-[11.5px] ${r.tone === "gate" ? "text-accent" : "text-live"}`}
                  >
                    {r.tone === "gate" ? "◆ " : "✓ "}
                    {r.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <p className="font-mono text-[11.5px] text-muted mt-3 px-1">
            <span className="text-live">✓</span> handled automatically · <span className="text-accent">◆</span> waiting
            for a licensed person to approve
          </p>
        </div>
      </section>

      {/* ---------------- Jobs ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="work" index="01" kicker="What it does" title="The work it takes off your desk.">
          Six jobs that eat an agency&apos;s week, handled in the background.
        </SectionHead>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {jobs.map((j) => (
            <div key={j.title} className="bg-white p-6 sm:p-7">
              <div className="eyebrow mb-5 text-accent">{j.k}</div>
              <h3 className="text-[17px] font-semibold tracking-[-0.015em]">{j.title}</h3>
              <p className="text-[14.5px] text-muted leading-relaxed mt-2.5">{j.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- How ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="how" index="02" kicker="How it works" title="Built with you, run for you.">
          Fixed steps, a human in the loop, and a retainer that keeps it improving.
        </SectionHead>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {steps.map((s, i) => (
            <li key={s.k} className="bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] text-accent">{s.k}</span>
                {i < steps.length - 1 && <span className="hidden lg:block font-mono text-faint text-[12px]">→</span>}
                {i === steps.length - 1 && <span className="hidden lg:block font-mono text-faint text-[12px]">↺</span>}
              </div>
              <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{s.title}</h3>
              <p className="text-[14px] text-muted leading-relaxed mt-2">{s.body}</p>
            </li>
          ))}
        </ol>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {principles.map((p) => (
            <div key={p.title} className="panel p-6">
              <h3 className="text-[16px] font-semibold tracking-[-0.01em]">{p.title}</h3>
              <p className="text-[14.5px] text-muted leading-relaxed mt-2">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Background ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="about" index="03" kicker="Background" title="Who is building this.">
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
            <div className="eyebrow mb-6">Experience</div>
            <ol className="space-y-7">
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
              <span className="eyebrow">Résumé</span>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="font-mono text-[11.5px] text-foreground underline underline-offset-4 decoration-line-2 hover:decoration-foreground">
                Open PDF →
              </a>
            </div>
            <object data={`${site.resume}#toolbar=0&navpanes=0`} type="application/pdf" className="hidden lg:block w-full flex-1 min-h-[520px]">
              <span />
            </object>
            <div className="lg:hidden p-6 text-[14.5px] text-muted">
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                Open résumé (PDF) <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Contact ---------------- */}
      <section id="contact" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <div className="relative panel overflow-hidden px-6 py-14 sm:px-14 sm:py-20 text-center">
          <div className="absolute inset-0 -z-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,#d4d4d8_1px,transparent_0)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
          <div className="relative">
            <span className="chip mb-6"><span className="live-dot" /> Replies within 24h</span>
            <h2 className="text-[32px] sm:text-[48px] font-semibold tracking-[-0.04em] leading-[1.05] max-w-2xl mx-auto">
              Run an agency?
              <br />
              <span className="text-faint">Let&apos;s give it an employee.</span>
            </h2>
            <p className="text-[16px] text-muted mt-5 max-w-lg mx-auto">
              Tell me where your team&apos;s week goes. I&apos;ll come back with what I would automate first and how
              we would measure it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${site.email}?subject=AI%20for%20my%20agency`} className="btn btn-dark">
                {site.email} <Arrow />
              </a>
              <Social href={site.linkedin} label="LinkedIn">
                <Logo name="linkedin" size={15} /> LinkedIn
              </Social>
              <Social href={site.github} label="GitHub">
                <GitHubMark /> GitHub
              </Social>
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Résumé (PDF)</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
