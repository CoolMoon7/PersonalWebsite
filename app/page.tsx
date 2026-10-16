import Image from "next/image";
import Link from "next/link";
import Workflow from "@/components/Workflow";
import Logo, { logoTitle } from "@/components/Logo";
import { SectionHead, SystemCard, Arrow } from "@/components/ui";
import { systems } from "@/data/systems";
import { site, telemetry, method } from "@/data/site";
import { getPosts, formatDate } from "@/lib/posts";

const rail = [
  "clay", "apollo", "hubspot", "zapier", "n8n", "claude", "openai", "python", "pandas",
  "postgres", "instantly", "higgsfield", "meta", "tiktok", "linkedin", "shopify", "sheets", "react",
];

export default function Home() {
  const flagship = systems[0];
  const posts = getPosts().slice(0, 3);

  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <div className="rise flex flex-wrap items-center gap-3 mb-8">
          <span className="chip">
            <span className="live-dot" /> Open to GTM engineering roles + projects
          </span>
          <span className="chip hidden sm:inline-flex">Duke CS · &apos;28</span>
        </div>

        <h1
          className="rise text-[42px] leading-[1.02] sm:text-[64px] lg:text-[76px] font-semibold tracking-[-0.045em] max-w-4xl"
          style={{ "--rd": "0.05s" } as React.CSSProperties}
        >
          I engineer the systems
          <br />
          <span className="text-faint">that fill pipelines.</span>
        </h1>

        <div
          className="rise mt-7 flex flex-col sm:flex-row sm:items-center gap-5"
          style={{ "--rd": "0.12s" } as React.CSSProperties}
        >
          <Image
            src="/images/coletalking.png"
            alt="Cole Bonawitz"
            width={56}
            height={56}
            priority
            className="w-14 h-14 rounded-full object-cover object-top border border-line flex-none"
          />
          <p className="text-[17px] sm:text-[18px] text-ink-2 leading-relaxed max-w-2xl">
            I&apos;m Cole, a GTM engineer. I wire <strong className="font-medium text-foreground">Clay</strong>,{" "}
            <strong className="font-medium text-foreground">Python</strong> and{" "}
            <strong className="font-medium text-foreground">AI agents</strong> into outbound that books
            meetings, and I measure every step so the system gets better each week.
          </p>
        </div>

        <div className="rise mt-8 flex flex-wrap gap-3" style={{ "--rd": "0.18s" } as React.CSSProperties}>
          <Link href="#systems" className="btn btn-dark">
            See the systems <Arrow />
          </Link>
          <a href="#contact" className="btn btn-ghost">
            Get a free outbound teardown
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !px-3" aria-label="LinkedIn">
            <Logo name="linkedin" size={16} />
          </a>
        </div>

        {/* Flagship system, running */}
        <div className="rise mt-14 sm:mt-16" style={{ "--rd": "0.26s" } as React.CSSProperties}>
          <Workflow wf={flagship.workflow} title={`~/systems/${flagship.slug} — ${flagship.client.toLowerCase()}`} />
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 font-mono text-[11.5px] text-muted px-1">
            <span>
              Live diagram of the Swoop Tutors outbound engine.{" "}
              <Link href={`/systems/${flagship.slug}`} className="text-foreground underline underline-offset-4 decoration-line-2 hover:decoration-foreground">
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

      {/* ---------------- Stack rail ---------------- */}
      <section className="mt-20 border-y border-line bg-white/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row md:items-center gap-4">
          <span className="eyebrow flex-none md:w-40">Stack in production</span>
          <div className="marquee overflow-hidden flex-1">
            <div className="marquee-track flex w-max gap-8">
              {[...rail, ...rail].map((k, i) => (
                <span key={i} className="group flex items-center gap-2 text-[13px] text-muted hover:text-foreground transition-colors" aria-hidden={i >= rail.length}>
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
        <SectionHead index="01" kicker="System output" title="What the systems produced.">
          Every number here comes from a system on this page. Click one to see the pipeline behind it.
        </SectionHead>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-px bg-line border border-line rounded-2xl overflow-hidden">
          {telemetry.map((t) => (
            <Link key={t.label} href={`/systems/${t.source}`} className="group bg-white p-5 sm:p-7 hover:bg-surface transition-colors">
              <div className="text-[32px] sm:text-[44px] font-semibold tracking-[-0.04em] tabular-nums leading-none">{t.value}</div>
              <div className="text-[14px] text-ink-2 mt-3">{t.label}</div>
              <div className="font-mono text-[11px] text-faint mt-2 group-hover:text-accent transition-colors">↳ {t.source}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------------- Systems ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="systems" index="02" kicker={`Systems · ${String(systems.length).padStart(2, "0")}`} title="Systems I've built and run.">
          Outbound, enrichment, content and lifecycle, across edtech, DTC, hospitality and consumer hardware.
        </SectionHead>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {systems.map((s, i) => (
            <SystemCard key={s.slug} sys={s} i={i} />
          ))}
          <a href="#contact" className="panel border-dashed p-6 flex flex-col justify-center items-start gap-3 hover:border-[#a1a1aa] transition-colors min-h-[260px]">
            <span className="eyebrow">Open slot · GTM audit</span>
            <h3 className="text-[20px] font-semibold tracking-[-0.02em]">Your company could be next.</h3>
            <p className="text-[14.5px] text-muted leading-relaxed max-w-md">
              I&apos;ll map your current outbound (data, tooling, sequences, reply rates) and send back the
              system I&apos;d build. It&apos;s free and takes 30 minutes.
            </p>
            <span className="btn btn-ghost mt-1">Request a teardown <Arrow /></span>
          </a>
        </div>
      </section>

      {/* ---------------- About ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="about" index="03" kicker="About" title="Engineer by training, operator by habit." />
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-6">
          <div className="panel overflow-hidden relative aspect-[4/5] md:aspect-auto md:min-h-[460px]">
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
                I&apos;m a Computer Science student at Duke (minors in Statistics and Philosophy) who&apos;d rather
                ship a pipeline than talk about one. I founded RiZE Maps, a DTC brand that did $135K in revenue, and
                I&apos;ve spent the years since building the machinery behind growth: enrichment, scoring,
                sequencing, content engines and the dashboards that keep them honest.
              </p>
              <p>
                I work best with early-stage founders who need outbound that runs without them, built by someone
                who can write the Python, design the Clay table <em>and</em> get on the sales call.
              </p>
            </div>
            <dl className="grid grid-cols-2 gap-px bg-line border border-line rounded-xl overflow-hidden mt-8">
              {[
                ["Education", "Duke CS · 3.95 GPA"],
                ["HackDuke", "1st of 100+ teams"],
                ["Founded", "RiZE Maps · $135K"],
                ["Co-founded", "Momnt · 300+ units"],
              ].map(([k, v]) => (
                <div key={k} className="bg-white p-4">
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.08em] text-muted">{k}</dt>
                  <dd className="text-[14.5px] font-medium mt-1">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-8 flex flex-wrap gap-3">
              <a href={site.resume} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Resume (PDF)</a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Logo name="linkedin" size={15} /> Follow on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Method ---------------- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <SectionHead id="method" index="04" kicker="Method" title="Every system runs the same loop.">
          ICP in, meetings out, with data flowing back into targeting.
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

      {/* ---------------- Writing ---------------- */}
      {posts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-28">
          <SectionHead index="05" kicker="Writing" title="Notes on modern outbound.">
            <Link href="/writing" className="text-foreground underline underline-offset-4 decoration-line-2 hover:decoration-foreground">
              All writing →
            </Link>
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
      <section id="contact" className="scroll-mt-24 max-w-6xl mx-auto px-4 sm:px-6 mt-28">
        <div className="relative panel overflow-hidden px-6 py-14 sm:px-14 sm:py-20 text-center">
          <div className="absolute inset-0 -z-0 opacity-60 [background-image:radial-gradient(circle_at_1px_1px,#d4d4d8_1px,transparent_0)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_70%)]" />
          <div className="relative">
            <span className="chip mb-6"><span className="live-dot" /> Replies within 24h</span>
            <h2 className="text-[32px] sm:text-[48px] font-semibold tracking-[-0.04em] leading-[1.05] max-w-2xl mx-auto">
              Have a pipeline problem?
              <br />
              <span className="text-faint">Let&apos;s build the system.</span>
            </h2>
            <p className="text-[16px] text-muted mt-5 max-w-lg mx-auto">
              Tell me your ICP and what you&apos;ve tried. I&apos;ll come back with the workflow I&apos;d build and
              how I&apos;d measure it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${site.email}?subject=Outbound%20teardown`} className="btn btn-dark">
                {site.email} <Arrow />
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Logo name="linkedin" size={15} /> Message on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
