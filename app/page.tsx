import Image from "next/image";
import Link from "next/link";
import Workflow from "@/components/Workflow";
import Logo, { logoTitle } from "@/components/Logo";
import { MarkMarquee } from "@/components/Marks";
import { SectionHead, SystemCard, StackRow, Arrow } from "@/components/ui";
import { systems } from "@/data/systems";
import { site, hyperflow } from "@/data/site";
import { proof, now, facts, skills } from "@/data/home";
import { deployments } from "@/data/fde";
import { getPosts, formatDate } from "@/lib/posts";

const rail = [
  "clay", "apollo", "firecrawl", "hubspot", "zapier", "supabase", "claude", "hermes", "openai", "python",
  "pandas", "postgres", "instantly", "meta", "tiktok", "shopify", "react", "github",
];

/** Projects that are not growth systems; the growth ones have their own pages under /systems. */
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
  const flagship = systems[0];
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <div className="rise flex flex-wrap items-center gap-3 mb-8">
          <span className="chip">
            <span className="live-dot" /> Portfolio · GTM engineering, growth and AI agents
          </span>
          <span className="chip hidden sm:inline-flex">Duke CS · &apos;28</span>
        </div>

        <h1
          className="rise text-[42px] leading-[1.02] sm:text-[64px] lg:text-[76px] font-semibold tracking-[-0.045em] max-w-4xl"
          style={{ "--rd": "0.05s" } as React.CSSProperties}
        >
          Things I&apos;ve built
          <br />
          <span className="text-faint">to grow companies.</span>
        </h1>

        <div className="rise mt-7 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7" style={{ "--rd": "0.12s" } as React.CSSProperties}>
          <Image
            src="/images/coletalking.png"
            alt="Cole Bonawitz"
            width={160}
            height={160}
            priority
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover object-top border border-line flex-none"
          />
          <p className="text-[17px] sm:text-[18px] text-ink-2 leading-relaxed max-w-2xl">
            I&apos;m Cole, a GTM engineer and Duke CS student. I wire{" "}
            <strong className="font-medium text-foreground">Clay</strong>,{" "}
            <strong className="font-medium text-foreground">Python</strong> and{" "}
            <strong className="font-medium text-foreground">AI agents</strong>{" "}
            into outbound and growth systems that find the right buyers, reach them at the right moment and measure what turns into meetings. I&apos;ve run them for a
            4-person startup, my own DTC brand, and now{" "}
            <a href="#hyperflow" className={LINK}>Hyperflow</a>, the company I&apos;m building.
          </p>
        </div>

        <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--rd": "0.18s" } as React.CSSProperties}>
          <a href="#hyperflow" className="btn btn-dark">
            See the work <Arrow />
          </a>
          <Socials />
        </div>

        {/* Flagship system, running */}
        <div className="rise mt-14 sm:mt-16" style={{ "--rd": "0.26s" } as React.CSSProperties}>
          <Workflow wf={flagship.workflow} title={`~/systems/${flagship.slug} — ${flagship.client.toLowerCase()}`} />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11.5px] text-muted px-1">
            <span>
              Live diagram of the outbound engine I built at Swoop Tutors.{" "}
              <Link href={`/systems/${flagship.slug}`} className={LINK}>
                Open the system →
              </Link>
            </span>
            <span className="flex gap-4">
              <span><span className="text-foreground">10k</span> in</span>
              <span><span className="text-foreground">3k</span> qualified</span>
              <span><span className="text-foreground">50</span> meetings</span>
            </span>
          </div>
        </div>
      </section>

      {/* ---------------- Where ---------------- */}
      <section aria-label="Background" className="max-w-6xl mx-auto px-4 sm:px-6 mt-16">
        <div className="eyebrow mb-4 text-center">Studied, built and worked at</div>
        <MarkMarquee />
      </section>

      {/* ---------------- Proof ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
        <SectionHead index="01" kicker="Results" title="What the systems produced.">
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

      {/* ---------------- Hyperflow ---------------- */}
      <section className={SECTION}>
        <SectionHead id="hyperflow" index="02" kicker="Now building" title="Hyperflow.">
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
          <a
            href={hyperflow.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-t border-line bg-surface/60 px-4 pt-4 sm:px-8 sm:pt-8"
            aria-label="Open the Hyperflow demo"
          >
            <Image
              src="/images/hyperflow-demo.png"
              alt="The Hyperflow service desk: an inbox of agency requests and a drafted certificate with its policy checks"
              width={1440}
              height={900}
              sizes="(max-width: 1152px) 100vw, 1088px"
              className="w-full h-auto rounded-t-xl border border-b-0 border-line-2 shadow-[0_18px_50px_-24px_rgba(24,24,40,0.35)]"
            />
          </a>
        </div>
      </section>

      {/* ---------------- Systems ---------------- */}
      <section className={SECTION}>
        <SectionHead id="systems" index="03" kicker={`Systems · ${String(systems.length).padStart(2, "0")}`} title="Growth systems I've built and run.">
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
        <SectionHead id="projects" index="04" kicker="More projects" title="Agents, data and hardware.">
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

      {/* ---------------- Stack rail ---------------- */}
      <section className="mt-24 border-y border-line bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row md:items-center gap-4">
          <span className="eyebrow flex-none md:w-40">Tools I build with</span>
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

      {/* ---------------- About ---------------- */}
      <section className={SECTION}>
        <SectionHead id="about" index="05" kicker="About" title="Engineer by training, founder by habit." />
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
          <SectionHead index="06" kicker="Writing" title="Notes on modern outbound.">
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
