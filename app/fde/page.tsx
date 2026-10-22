import type { Metadata } from "next";
import Image from "next/image";
import Workflow from "@/components/Workflow";
import Logo, { logoTitle } from "@/components/Logo";
import { SectionHead, StackRow, Arrow } from "@/components/ui";
import { site } from "@/data/site";
import { fde, telemetry, flagship, deployments, method, skills, type Deployment } from "@/data/fde";

export const metadata: Metadata = {
  title: { absolute: fde.title },
  description: fde.description,
  alternates: { canonical: "/fde" },
  openGraph: { title: fde.title, description: fde.description, url: "/fde", type: "website" },
};

const rail = [
  "claude", "mcp", "python", "fastapi", "pytest", "postgres", "supabase", "sqlite", "react",
  "typescript", "docker", "actions", "vercel", "github", "firebase", "arduino", "hubspot", "zapier",
];

const statusStyle: Record<Deployment["status"], string> = {
  Deploying: "text-accent",
  "In production": "text-live",
  Running: "text-live",
  Shipped: "text-ink-2",
};

function DeploymentCard({ d, i, wide = false }: { d: Deployment; i: number; wide?: boolean }) {
  return (
    <article id={d.id} className={`scroll-mt-24 panel p-5 sm:p-7 flex flex-col gap-5 ${wide ? "lg:col-span-2" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] text-muted">
          <span className="text-faint">{String(i + 1).padStart(2, "0")}</span>
          <span>{d.org}</span>
          <span className="text-faint">·</span>
          <span>{d.period}</span>
        </div>
        <span className={`flex items-center gap-1.5 font-mono text-[11px] shrink-0 ${statusStyle[d.status]}`}>
          {d.status !== "Shipped" && <span className="live-dot !w-[6px] !h-[6px]" />}
          {d.status}
        </span>
      </div>

      <div>
        <h3 className="text-[20px] sm:text-[22px] font-semibold tracking-[-0.02em]">{d.name}</h3>
        <div className="font-mono text-[11.5px] text-muted mt-1">{d.role}</div>
        <p className="text-[15px] text-ink-2 leading-relaxed mt-3">{d.oneLiner}</p>
      </div>

      <div className={`grid grid-cols-1 ${wide ? "lg:grid-cols-2" : ""} gap-4`}>
        <div className="rounded-xl border border-line bg-surface/60 p-4">
          <div className="eyebrow mb-2">The customer</div>
          <p className="text-[14px] text-muted leading-relaxed">{d.customer}</p>
        </div>
        <div className="rounded-xl border border-line bg-surface/60 p-4">
          <div className="eyebrow mb-2">What I built</div>
          <ul className="space-y-2">
            {d.built.map((b) => (
              <li key={b} className="flex gap-2.5 text-[14px] text-ink-2 leading-relaxed">
                <span className="text-accent font-mono text-[12px] pt-0.5">+</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`grid grid-cols-2 ${d.metrics.length > 2 ? "sm:grid-cols-4" : ""} gap-px bg-line rounded-xl overflow-hidden border border-line mt-auto`}
      >
        {d.metrics.map((m) => (
          <div key={m.label} className="bg-white px-3 py-3">
            <div className="text-[18px] font-semibold tracking-[-0.02em] tabular-nums">{m.value}</div>
            <div className="font-mono text-[10.5px] text-muted mt-0.5 leading-tight">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <StackRow stack={d.stack} />
        {d.link && (
          <a href={d.link.href} className="font-mono text-[12px] text-foreground underline underline-offset-4 decoration-line-2 hover:decoration-foreground">
            {d.link.label} →
          </a>
        )}
      </div>
    </article>
  );
}

export default function FdePage() {
  const [lead, ...rest] = deployments;

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <div className="rise flex flex-wrap items-center gap-3 mb-8">
          <span className="chip">
            <span className="live-dot" /> Open to forward deployed engineering roles
          </span>
          <span className="chip hidden sm:inline-flex">Duke CS · &apos;28 · 3.95 GPA</span>
        </div>

        <h1
          className="rise text-[42px] leading-[1.02] sm:text-[64px] lg:text-[76px] font-semibold tracking-[-0.045em] max-w-4xl"
          style={{ "--rd": "0.05s" } as React.CSSProperties}
        >
          I sit with the customer,
          <br />
          <span className="text-faint">then ship what they run on.</span>
        </h1>

        <div
          className="rise mt-7 flex flex-col sm:flex-row sm:items-center gap-5"
          style={{ "--rd": "0.12s" } as React.CSSProperties}
        >
          <Image
            src="/images/coletalking.png"
            alt="Cole Bonawitz"
            width={112}
            height={112}
            priority
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover object-top border border-line flex-none"
          />
          <p className="text-[17px] sm:text-[18px] text-ink-2 leading-relaxed max-w-2xl">
            I&apos;m Cole, a forward deployed engineer. I scope workflows with the people who do them, then build the{" "}
            <strong className="font-medium text-foreground">agents</strong>,{" "}
            <strong className="font-medium text-foreground">data pipelines</strong> and{" "}
            <strong className="font-medium text-foreground">integrations</strong> that take them over, with guardrails,
            evals and a human in the loop from day one.
          </p>
        </div>

        <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--rd": "0.18s" } as React.CSSProperties}>
          <a href="#deployments" className="btn btn-dark">
            See what I&apos;ve shipped <Arrow />
          </a>
          <a href={fde.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Résumé
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Logo name="github" size={15} /> GitHub
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Logo name="linkedin" size={15} /> LinkedIn
          </a>
        </div>

        {/* Flagship deployment, running */}
        <div className="rise mt-14 sm:mt-16" style={{ "--rd": "0.26s" } as React.CSSProperties}>
          <Workflow wf={flagship} title="~/deployments/coi-agent — multi-office insurance agency" />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11.5px] text-muted px-1">
            <span>
              Live diagram of the certificate-of-insurance agent I&apos;m deploying now.{" "}
              <a href="#coi-agent" className="text-foreground underline underline-offset-4 decoration-line-2 hover:decoration-foreground">
                Read the deployment →
              </a>
            </span>
            <span className="flex gap-4">
              <span><span className="text-foreground">10</span> MCP tools</span>
              <span><span className="text-foreground">43</span> tests</span>
              <span><span className="text-foreground">draft-only</span></span>
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- Stack rail ---------------- */}
      <section className="mt-20 border-y border-line bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row md:items-center gap-4">
          <span className="eyebrow flex-none md:w-40">Stack in production</span>
          <div className="marquee overflow-hidden flex-1">
            <div className="marquee-track flex w-max gap-8">
              {[...rail, ...rail].map((k, i) => (
                <span key={i} className="flex items-center gap-2 text-[13px] text-muted hover:text-foreground transition-colors" aria-hidden={i >= rail.length}>
                  <Logo name={k} size={18} mono />
                  {logoTitle(k)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Telemetry ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-24">
        <SectionHead index="01" kicker="Output" title="What the work produced.">
          Every number comes from a deployment on this page. Click one to read it.
        </SectionHead>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {telemetry.map((t) => (
            <a key={t.label} href={`#${t.source}`} className="group bg-white p-5 sm:p-7 hover:bg-surface transition-colors">
              <div className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.04em] tabular-nums leading-none">{t.value}</div>
              <div className="text-[14px] text-ink-2 mt-3">{t.label}</div>
              <div className="font-mono text-[11px] text-faint mt-2 group-hover:text-accent transition-colors">↳ {t.source}</div>
            </a>
          ))}
        </div>
      </section>

      {/* ---------------- Deployments ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead
          id="deployments"
          index="02"
          kicker={`Deployments · ${String(deployments.length).padStart(2, "0")}`}
          title="Everything I've built and shipped."
        >
          Each one starts with who I sat with and what they needed, then what I built and what it did.
        </SectionHead>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <DeploymentCard d={lead} i={0} wide />
          {rest.map((d, i) => (
            <DeploymentCard key={d.id} d={d} i={i + 1} />
          ))}
        </div>
      </section>

      {/* ---------------- Method ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="method" index="03" kicker="How I work" title="Every deployment runs the same loop.">
          Embed with the customer, ship behind guardrails, and let real corrections make it better.
        </SectionHead>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {method.map((m, i) => (
            <li key={m.k} className="relative bg-white p-5">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[11px] text-accent">{m.k}</span>
                {i < method.length - 1 && <span className="hidden lg:block font-mono text-faint text-[12px]">→</span>}
                {i === method.length - 1 && <span className="hidden lg:block font-mono text-faint text-[12px]">↺</span>}
              </div>
              <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{m.title}</h3>
              <p className="text-[13.5px] text-muted leading-relaxed mt-2">{m.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------------- About ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="about" index="04" kicker="About" title="Engineer by training, founder by habit." />
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6">
          <div className="panel overflow-hidden relative aspect-[4/5] md:aspect-auto md:min-h-[480px]">
            <Image
              src="/images/coletalking.png"
              alt="Cole Bonawitz speaking at an event"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
            />
            <span className="absolute left-3 bottom-3 chip !bg-white/90 backdrop-blur">Chattanooga, TN → Durham, NC</span>
          </div>
          <div className="panel p-6 sm:p-8 flex flex-col">
            <div className="space-y-4 text-[16px] text-ink-2 leading-relaxed">
              <p>
                I&apos;m a Computer Science student at Duke (minors in Statistical Science and Philosophy), studying
                abroad at UNSW Sydney this fall. Coursework in machine learning, data structures and algorithms,
                computer networks and probability.
              </p>
              <p>
                The common thread in everything above: I go to where the work happens. Hospital wards in Kampala, a
                startup&apos;s sales floor, an insurance agency&apos;s service desk. I learn the workflow from the people
                in it, then build the system that takes the repetitive part off their hands, and I stay until it works.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden mt-8">
              {[
                ["Education", "Duke CS · 3.95 GPA"],
                ["Honors", "Dean's List with Distinction"],
                ["HackDuke", "1st of 100+ teams"],
                ["Founded", "RiZE Maps · $135K"],
              ].map(([k, v]) => (
                <div key={k} className="bg-white p-4">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">{k}</dt>
                  <dd className="text-[14.5px] font-medium mt-1">{v}</dd>
                </div>
              ))}
            </dl>
            <dl className="mt-6 space-y-3">
              {skills.map((s) => (
                <div key={s.k} className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-1 sm:gap-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted pt-0.5">{s.k}</dt>
                  <dd className="text-[14px] text-ink-2 leading-relaxed">{s.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              <a href={fde.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Résumé (PDF)</a>
              <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Logo name="github" size={15} /> GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Logo name="linkedin" size={15} /> LinkedIn
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
              Hiring forward deployed engineers?
              <br />
              <span className="text-faint">Let&apos;s talk.</span>
            </h2>
            <p className="text-[16px] text-muted mt-5 max-w-lg mx-auto">
              I want to be in the room with your customers, turning what they need into systems that ship. My résumé
              and the deployments above are the best summary of how I work.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${fde.email}?subject=Forward%20deployed%20engineering`} className="btn btn-dark">
                {fde.email} <Arrow />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Logo name="linkedin" size={15} /> LinkedIn
              </a>
              <a href={fde.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Résumé (PDF)</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
