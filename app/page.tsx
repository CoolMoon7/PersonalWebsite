import Image from "next/image";
import Link from "next/link";
import Workflow from "@/components/Workflow";
import Logo from "@/components/Logo";
import ToolField from "@/components/ToolField";
import BrowserShot from "@/components/BrowserShot";
import { MarkMarquee } from "@/components/Marks";
import { SectionHead, SystemCard, StackRow, Arrow } from "@/components/ui";
import { systems } from "@/data/systems";
import { site, hyperflow } from "@/data/site";
import { proof, now, facts, skills, automations, principles } from "@/data/home";
import { deployments, flagship } from "@/data/fde";
import { getPosts, formatDate } from "@/lib/posts";


/** Projects that are not growth systems; the growth ones have their own pages under /systems. */
const momnt = deployments.find((d) => d.id === "momnt")!;
const appStore = "https://apps.apple.com/us/app/momnt/id6752358840";
const momntBuild = [
  { k: "band", v: "Designed the wristband around a single NFC tag, so starting a focus session is one tap with no pairing or battery." },
  { k: "ios app", v: "Built the iOS app on Apple's Screen Time APIs: pick the distracting apps once, and they stay blocked while Momnt Mode runs." },
  { k: "data", v: "Logged every session to Firestore, and Python surveyed anyone inactive for 7+ days. Fixes tested on a 50-user cohort drove 85% two-month retention." },
  { k: "launch", v: "300+ face-to-face interviews, a 200-user campus pilot, then 300+ units sold and $9K+ in revenue." },
];
const more = deployments.filter((d) => ["cole-os", "dignity", "uganda", "hackduke"].includes(d.id));

const SECTION = "scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-28";
const LINK = "text-foreground underline underline-offset-4 decoration-line-2 hover:decoration-foreground";

function Socials() {
  return (
    <>
      <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
        Résumé
      </a>
      <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
        <Logo name="linkedin" size={15} /> LinkedIn
      </a>
      <a href={site.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
        <Logo name="github" size={15} /> GitHub
      </a>
    </>
  );
}

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20">
        <div>
          <div className="max-w-3xl mx-auto text-center">
            <div className="rise flex flex-wrap items-center justify-center gap-3 mb-7">
              <span className="chip">
                <span className="live-dot" /> Shipping now · Hyperflow, Cole OS
              </span>
            </div>
            <h1
              className="rise text-[40px] leading-[1.03] sm:text-[56px] lg:text-[72px] font-semibold tracking-[-0.045em]"
              style={{ "--rd": "0.05s" } as React.CSSProperties}
            >
              Agents and automations,
              <br />
              <span className="text-faint">built and running.</span>
            </h1>
            <p className="rise mt-6 text-[16.5px] sm:text-[17.5px] text-ink-2 leading-relaxed max-w-xl mx-auto" style={{ "--rd": "0.12s" } as React.CSSProperties}>
              Outbound engines, enrichment pipelines, a content engine, inbox agents and a 20-agent operating system.
              I build them with Claude Code, MCP, Clay and Python, put the rules in code and a person at the approval
              step, and most of them are still running.
            </p>
            <div className="rise mt-6 flex items-center justify-center gap-3 text-left" style={{ "--rd": "0.16s" } as React.CSSProperties}>
              <Image
                src="/images/coletalking.png"
                alt="Cole Bonawitz"
                width={80}
                height={80}
                priority
                className="w-11 h-11 rounded-full object-cover object-top border border-line flex-none"
              />
              <div className="text-[13.5px] leading-tight">
                <div className="font-medium">Cole Bonawitz</div>
                <div className="text-muted">Duke CS &apos;28 · building <a href="#hyperflow" className={LINK}>Hyperflow</a></div>
              </div>
            </div>
            <div className="rise mt-8 flex flex-wrap justify-center gap-3" style={{ "--rd": "0.2s" } as React.CSSProperties}>
              <a href="#hyperflow" className="btn btn-dark">
                See the work <Arrow />
              </a>
              <Socials />
            </div>
          </div>
        </div>
      </section>
      <section aria-label="Tools I build with" className="rise mt-12 sm:mt-14" style={{ "--rd": "0.24s" } as React.CSSProperties}>
        <div className="eyebrow text-center mb-3">What I build with, this year</div>
        <ToolField />
      </section>

      {/* ---------------- Where ---------------- */}
      <section aria-label="Background" className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <div className="eyebrow mb-4 text-center">Studied, built and worked at</div>
        <MarkMarquee />
      </section>

      {/* ---------------- Hyperflow ---------------- */}
      <section className={SECTION}>
        <SectionHead id="hyperflow" index="01" kicker="Now building" title="Hyperflow.">
          A company I&apos;m building and selling myself, from the product to the first customer calls.
        </SectionHead>
        <div className="panel overflow-hidden">
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8">
            <div className="flex flex-col">
              <span className="chip self-start"><span className="live-dot" /> Live demo · sample data</span>
              <h3 className="text-[24px] sm:text-[28px] font-semibold tracking-[-0.03em] leading-tight mt-5">{now.title}</h3>
              <p className="text-[15.5px] text-muted leading-relaxed mt-3">{now.body}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={hyperflow.demo} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
                  Try the demo <Arrow />
                </a>
                <a href={hyperflow.site} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  gohyperflow.com
                </a>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
              {[
                { k: "What I built", items: now.product },
                { k: "How I'm selling it", items: now.gtm },
              ].map((col) => (
                <div key={col.k} className="rounded-xl border border-line bg-surface/60 p-4">
                  <div className="eyebrow mb-3">{col.k}</div>
                  <ul className="space-y-2.5">
                    {col.items.map((t) => (
                      <li key={t} className="flex gap-2.5 text-[14px] text-ink-2 leading-relaxed">
                        <span className="text-accent font-mono text-[12px] pt-0.5">+</span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-line bg-surface/60 p-4 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            <BrowserShot href={hyperflow.site} src="/images/hyperflow-site.png" host="gohyperflow.com" alt="The gohyperflow.com homepage" dark />
            <BrowserShot href={hyperflow.demo} src="/images/hyperflow-demo.png" host="demo.gohyperflow.com" alt="The Hyperflow service desk demo: an inbox of agency requests and a drafted certificate" />
          </div>
        </div>
      </section>

      {/* ---------------- Momnt ---------------- */}
      <section className={SECTION}>
        <SectionHead id="momnt" index="02" kicker="Co-founded" title="Momnt.">
          A wristband and iOS app that cut screen time. I co-founded it, built the app and the band, and sold the first 300 units.
        </SectionHead>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-6 items-start">
          <BrowserShot href="https://www.getmomnt.com" src="/images/momnt-site.png" host="getmomnt.com" alt="The getmomnt.com homepage: Reclaim Your Time, the wristband that reduces screen time" />
          <div className="reveal">
            <p className="text-[15.5px] text-ink-2 leading-relaxed">
              Momnt is two products that only work together. The band carries an NFC tag; tapping it to your phone starts
              Momnt Mode, and the iOS app blocks the apps you picked until the timer ends or you tap again.
            </p>
            <ul className="mt-5 space-y-3">
              {momntBuild.map((t) => (
                <li key={t.k} className="flex gap-3 text-[14px] text-ink-2 leading-relaxed">
                  <span className="font-mono text-[11px] text-accent pt-1 w-14 flex-none">{t.k}</span>
                  <span>{t.v}</span>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-4 gap-px bg-line border border-line rounded-xl overflow-hidden mt-6">
              {momnt.metrics.map((m) => (
                <div key={m.label} className="bg-white p-3">
                  <div className="text-[19px] font-semibold tracking-[-0.03em] tabular-nums leading-none">{m.value}</div>
                  <div className="font-mono text-[10px] text-muted mt-1.5 leading-tight">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* App Store listing */}
        <a href={appStore} target="_blank" rel="noopener noreferrer" className="shot group mt-6 block panel p-5 sm:p-7">
          <div className="flex items-center gap-4">
            <Image src="/images/momnt-icon.jpg" alt="Momnt app icon" width={128} height={128} className="w-16 h-16 sm:w-20 sm:h-20 rounded-[22%] border border-line" />
            <div className="min-w-0">
              <div className="text-[20px] sm:text-[24px] font-semibold tracking-[-0.02em]">momnt.</div>
              <div className="text-[14px] text-muted">Live in the Moment</div>
              <div className="font-mono text-[11px] text-faint mt-1">★★★★★ 13 · Health &amp; Fitness · Cole Bonawitz</div>
            </div>
            <span className="ml-auto flex-none rounded-full bg-surface border border-line px-4 h-9 inline-flex items-center text-[14px] font-semibold text-accent group-hover:bg-accent group-hover:text-white transition-colors">
              App Store ↗
            </span>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5 max-w-3xl mx-auto">
            {[1, 2, 3].map((n, i) => (
              <Image
                key={n}
                src={`/images/momnt-app-${n}.jpg`}
                alt={["Take control of your time", "Screen time in a band: Momnt Mode timer", "Block distractions: pick the apps to block"][i]}
                width={600}
                height={1299}
                sizes="(max-width: 768px) 33vw, 340px"
                className="w-full h-auto rounded-2xl border border-line transition-transform duration-500 group-hover:-translate-y-1"
                style={{ transitionDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </a>
      </section>

      {/* ---------------- Automation range ---------------- */}
      <section className={SECTION}>
        <SectionHead id="automations" index="03" kicker="What I've automated" title="Nine kinds of work, handed to systems.">
          Each one ran inside a real business. Click through for how it was built.
        </SectionHead>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {automations.map((a) => {
            const external = a.href.startsWith("http");
            return (
              <a
                key={a.k}
                href={a.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="reveal group bg-white p-5 sm:p-6 flex flex-col gap-3 hover:bg-surface transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-faint">{a.where}</span>
                  <span className="font-mono text-[11px] text-faint group-hover:text-accent transition-colors">→</span>
                </div>
                <h3 className="text-[16.5px] font-semibold tracking-[-0.02em]">{a.k}</h3>
                <p className="text-[14px] text-muted leading-relaxed">{a.what}</p>
                <div className="mt-auto pt-1">
                  <StackRow stack={a.stack} />
                </div>
              </a>
            );
          })}
        </div>
      </section>

      {/* ---------------- Agentic systems ---------------- */}
      <section className={SECTION}>
        <SectionHead id="agents" index="04" kicker="Agentic systems" title="How I build agents that can be trusted with real work.">
          The certificate agent inside Hyperflow, running. The same patterns show up in every agent I&apos;ve shipped.
        </SectionHead>
        <div className="reveal">
          <Workflow wf={flagship} title="~/hyperflow/coi-agent — independent insurance agency" />
        </div>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4">
          {principles.map((p, i) => (
            <div key={p.k} className="reveal panel p-5 flex flex-col gap-2">
              <span className="font-mono text-[11px] text-faint">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] leading-snug">{p.k}</h3>
              <p className="text-[13.5px] text-muted leading-relaxed">{p.v}</p>
              <span className="mt-auto pt-2 font-mono text-[11px] text-accent">{p.proof}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Proof ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
        <SectionHead index="05" kicker="Results" title="What the systems produced.">
          Every number comes from a system on this page. Click one to see how it was built.
        </SectionHead>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {proof.map((t) => (
            <Link key={t.label} href={`/systems/${t.source}`} className="group bg-white p-5 sm:p-7 hover:bg-surface transition-colors">
              <div className="text-[30px] sm:text-[44px] font-semibold tracking-[-0.04em] tabular-nums leading-none">{t.value}</div>
              <div className="text-[14px] text-ink-2 mt-3">{t.label}</div>
              <div className="font-mono text-[11px] text-faint mt-2 group-hover:text-accent transition-colors">↳ {t.source}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Systems ---------------- */}
      <section className={SECTION}>
        <SectionHead id="systems" index="06" kicker={`Systems · ${String(systems.length).padStart(2, "0")}`} title="Growth systems I've built and run.">
          Outbound, enrichment, content and retention, across edtech, DTC, hospitality and consumer hardware.
        </SectionHead>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {systems.map((s, i) => (
            <SystemCard key={s.slug} sys={s} i={i} />
          ))}
        </div>
      </section>

      {/* ---------------- More projects ---------------- */}
      <section className={SECTION}>
        <SectionHead id="projects" index="07" kicker="More projects" title="Agents, data and hardware.">
          Everything else I&apos;ve shipped, from a 20-agent operating system to a device in four hospitals.
        </SectionHead>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {more.map((d) => (
            <article key={d.id} className="panel p-5 sm:p-6 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] text-muted">
                <span>{d.org}</span>
                <span className="text-faint">·</span>
                <span>{d.period}</span>
              </div>
              <div>
                <h3 className="text-[18px] font-semibold tracking-[-0.02em]">{d.name}</h3>
                <p className="text-[14.5px] text-muted leading-relaxed mt-2">{d.oneLiner}</p>
              </div>
              <div className="grid grid-cols-2 gap-px bg-line rounded-xl overflow-hidden border border-line mt-auto">
                {d.metrics.slice(0, 2).map((m) => (
                  <div key={m.label} className="bg-white px-3 py-3">
                    <div className="text-[17px] font-semibold tracking-[-0.02em] tabular-nums">{m.value}</div>
                    <div className="font-mono text-[10.5px] text-muted mt-0.5 leading-tight">{m.label}</div>
                  </div>
                ))}
              </div>
              <StackRow stack={d.stack} />
            </article>
          ))}
        </div>
      </section>

      {/* ---------------- About ---------------- */}
      <section className={SECTION}>
        <SectionHead id="about" index="08" kicker="About" title="Engineer by training, founder by habit." />
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
                I&apos;m a Computer Science student at Duke (minors in Statistical Science and Philosophy), studying abroad
                at UNSW Sydney this fall. I started RiZE Maps in high school and grew it to $135K in revenue, and I&apos;ve
                been building the machinery behind growth ever since: enrichment, scoring, sequencing, content engines and
                the dashboards that keep them honest.
              </p>
              <p>
                I do my best work at early-stage startups, where one person can own the pipeline end to end: write the
                Python, build the Clay table and get on the sales call. That&apos;s the work I like most.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden mt-8">
              {facts.map(([k, v]) => (
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
              <Socials />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Writing ---------------- */}
      {posts.length > 0 && (
        <section className={SECTION}>
          <SectionHead index="09" kicker="Writing" title="Notes on modern outbound.">
            <Link href="/writing" className={LINK}>All writing →</Link>
          </SectionHead>
          <div className="border-t border-line">
            {posts.map((p) => (
              <Link key={p.slug} href={`/writing/${p.slug}`} className="group grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-2 md:gap-8 py-6 border-b border-line">
                <span className="font-mono text-[12px] text-muted pt-1">{formatDate(p.date)}</span>
                <span>
                  <span className="block text-[18px] font-medium tracking-[-0.01em] group-hover:text-accent transition-colors">{p.title}</span>
                  <span className="block text-[14.5px] text-muted mt-1.5 leading-relaxed">{p.summary}</span>
                </span>
                <span className="hidden md:block font-mono text-[12px] text-faint pt-1">{p.readingMinutes} min</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------- Contact ---------------- */}
      <section id="contact" className={SECTION}>
        <div className="relative panel overflow-hidden px-6 py-14 sm:px-14 sm:py-20 text-center">
          <div className="absolute inset-0 -z-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,#d4d4d8_1px,transparent_0)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
          <div className="relative">
            <span className="chip mb-6"><span className="live-dot" /> Replies within 24h</span>
            <h2 className="text-[32px] sm:text-[48px] font-semibold tracking-[-0.04em] leading-[1.05] max-w-2xl mx-auto">
              Want the details on any of this?
              <br />
              <span className="text-faint">Ask me how it works.</span>
            </h2>
            <p className="text-[16px] text-muted mt-5 max-w-lg mx-auto leading-relaxed">
              I&apos;m happy to walk through how any of these systems were built, what worked and what didn&apos;t. I&apos;m
              also open to Summer 2027 GTM engineering and growth internships.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${site.email}?subject=Hello%20from%20colebonawitz.com`} className="btn btn-dark">
                {site.email} <Arrow />
              </a>
              <Socials />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
