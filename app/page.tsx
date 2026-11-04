import fs from "node:fs";
import path from "node:path";
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
import { now, facts, skills, principles } from "@/data/home";
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
/** The shop photo shows up once public/images/rize-shop.jpg exists. */
const rizeShop = fs.existsSync(path.join(process.cwd(), "public/images/rize-shop.jpg")) ? "/images/rize-shop.jpg" : null;
const setup = [
  { k: "Find what's working", who: "Grok bots", icons: ["grok"], v: "Grok bots watch F1 news, race weekends and trending formats, and pitch ideas each day." },
  { k: "Write and design", who: "Meta Muse", icons: ["meta-ai"], v: "Meta Muse turns the best ideas into scripts, captions and image concepts using real product photos." },
  { k: "Make the video", who: "Higgsfield", icons: ["higgsfield"], v: "Image-to-video briefs become reels. They're built from real products, never invented ones." },
  { k: "Post and promote", who: "Instagram · Meta Ads", icons: ["instagram", "meta"], v: "Reels go out on Instagram and TikTok. Ads run on hard caps and pause above 2× target CPA." },
  { k: "Score and repeat", who: "Python", icons: ["python"], v: "Every reel is scored against the account's median, and the winners shape the next brief." },
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 items-center">
          <div>
            <div className="rise flex items-center gap-4">
              <Image
                src="/images/coletalking.png"
                alt="Cole Bonawitz"
                width={160}
                height={160}
                priority
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover object-top border border-line"
              />
              <div className="leading-tight">
                <div className="text-[16px] font-semibold tracking-[-0.01em]">Cole Bonawitz</div>
                <div className="text-[13.5px] text-muted mt-0.5">Duke CS &apos;28 · building Hyperflow</div>
                <span className="chip mt-2"><span className="live-dot" /> Shipping now</span>
              </div>
            </div>
            <h1
              className="rise mt-8 text-[36px] leading-[1.06] sm:text-[46px] lg:text-[52px] font-semibold tracking-[-0.04em] max-w-xl"
              style={{ "--rd": "0.05s" } as React.CSSProperties}
            >
              I build the agents that run the work.
            </h1>
            <p className="rise mt-5 text-[16px] text-ink-2 leading-relaxed max-w-lg" style={{ "--rd": "0.12s" } as React.CSSProperties}>
              Inbox agents, outbound engines, content bots and the memory layer they share, built with Claude Code,
              MCP and Python. The rules live in code, and a person approves anything that leaves.
            </p>
            <div className="rise mt-7 flex flex-wrap gap-2.5" style={{ "--rd": "0.18s" } as React.CSSProperties}>
              <a href="#hyperflow" className="btn btn-dark">
                See the work <Arrow />
              </a>
              <Socials />
            </div>
          </div>
          <div className="rise" style={{ "--rd": "0.22s" } as React.CSSProperties}>
            <ToolField />
          </div>
        </div>
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
              <h3 className="text-[21px] sm:text-[24px] font-semibold tracking-[-0.025em] leading-tight mt-5">{now.title}</h3>
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
          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto">
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

      {/* ---------------- RiZE Maps ---------------- */}
      <section className={SECTION}>
        <SectionHead id="rize" index="03" kicker="Founded" title="RiZE Maps.">
          3D Formula 1 track art. I started it in high school and run the whole thing: product, shop, content and ads.
        </SectionHead>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 rounded-[14px] p-6 sm:p-7 flex flex-col justify-between text-white" style={{ background: "#0a0a0a" }}>
            <span className="font-mono text-[11px] text-[#a1a1aa]">Revenue to date</span>
            <div className="mt-6">
              <div className="text-[48px] sm:text-[56px] font-semibold tracking-[-0.045em] leading-none tabular-nums">$135K</div>
              <div className="mt-3 text-[14px] text-[#a1a1aa] leading-relaxed">3M+ organic impressions · 7,900+ Instagram followers · 200+ reviews</div>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              <a href="https://www.rizemap.com" target="_blank" rel="noopener noreferrer" className="btn !bg-white !text-black">rizemap.com <Arrow /></a>
              <a href="https://www.instagram.com/rizemaps/reels/" target="_blank" rel="noopener noreferrer" className="btn border border-[#3f3f46] !text-white hover:border-[#71717a]">
                <Logo name="instagram" size={15} /> @rizemaps
              </a>
            </div>
          </div>
          <div className="lg:col-span-8">
            <BrowserShot href="https://www.rizemap.com" src="/images/rize-site.png" host="rizemap.com" alt="The rizemap.com homepage: framed 3D F1 track maps" />
          </div>
          {rizeShop && (
            <a href="https://www.rizemap.com" target="_blank" rel="noopener noreferrer" className="lg:col-span-7 shot group relative block rounded-xl overflow-hidden border border-line-2 min-h-[300px]">
              <Image src={rizeShop} alt="The RiZE Maps print farm: a wall of 3D printers and filament spools" fill sizes="(max-width: 1024px) 100vw, 660px" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <span className="absolute left-3 bottom-3 chip !bg-white/90 backdrop-blur">The print farm ↗</span>
            </a>
          )}
          <a href="https://www.instagram.com/rizemaps/reels/" target="_blank" rel="noopener noreferrer" className={`${rizeShop ? "lg:col-span-5" : "lg:col-span-12"} shot group panel p-5 sm:p-6 flex flex-col`}>
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-full bg-black grid place-items-center text-white font-bold text-[14px]">RM</span>
              <div>
                <div className="font-semibold text-[15px]">rizemaps</div>
                <div className="font-mono text-[11px] text-muted">7,956 followers · Authentic F1 art</div>
              </div>
              <span className="ml-auto flex items-center gap-2 text-[13px] text-muted">Watch the reels <Logo name="instagram" size={20} /></span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden">
              {[["7,956", "followers"], ["3M+", "organic impressions"], ["200+", "5-star reviews"]].map(([v, l]) => (
                <div key={l} className="bg-white p-3.5">
                  <div className="text-[20px] font-semibold tracking-[-0.03em] tabular-nums">{v}</div>
                  <div className="font-mono text-[10.5px] text-muted mt-1">{l}</div>
                </div>
              ))}
            </div>
          </a>
        </div>
      </section>

      {/* ---------------- Personal setup ---------------- */}
      <section className={SECTION}>
        <SectionHead id="setup" index="04" kicker="My setup" title="The bots that run RiZE's content.">
          RiZE&apos;s content runs on agents I set up myself. I review what they make and approve the spend.
        </SectionHead>
        <div className="panel p-5 sm:p-8">
          <ol className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
            {setup.map((st, i) => (
              <li key={st.k} className="reveal relative rounded-xl border border-line bg-surface/50 p-4 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  {st.icons.map((ic) => (
                    <span key={ic} className="icon-tile grid place-items-center w-10 h-10 rounded-[22%] bg-white border border-black/[0.06]" style={{ "--fd": `${i * -0.6}s` } as React.CSSProperties}>
                      <Logo name={ic} size={22} />
                    </span>
                  ))}
                </div>
                <div className="font-mono text-[10.5px] text-faint">{String(i + 1).padStart(2, "0")} · {st.who}</div>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{st.k}</h3>
                <p className="text-[13.5px] text-muted leading-relaxed">{st.v}</p>
                {i < setup.length - 1 && <span className="hidden md:block absolute -right-[11px] top-1/2 -translate-y-1/2 z-10 text-faint text-[14px]">→</span>}
              </li>
            ))}
          </ol>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-[11.5px] text-muted">
            <span>Behind it: Obsidian notes, Claude Code and Codex, and Cole OS keeping every agent in scope and on budget.</span>
            <Link href="/systems/rize-growth" className={LINK}>How the content engine works →</Link>
          </div>
        </div>
      </section>

      {/* ---------------- Agentic systems ---------------- */}
      <section className={SECTION}>
        <SectionHead id="agents" index="05" kicker="Agentic systems" title="How I build agents that can be trusted with real work.">
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
            <h2 className="text-[28px] sm:text-[38px] font-semibold tracking-[-0.035em] leading-[1.1] max-w-2xl mx-auto">
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
