import Link from "next/link";
import type { Metadata } from "next";
import { getPosts, formatDate } from "@/lib/posts";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Writing",
  description: "Notes on modern outbound, Clay, AI agents and GTM engineering.",
  alternates: { canonical: "/writing" },
};

export default function Writing() {
  const posts = getPosts();
  return (
    <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20">
      <div className="eyebrow mb-4">Writing</div>
      <h1 className="text-[38px] sm:text-[52px] font-semibold tracking-[-0.045em] leading-[1.05]">
        Notes on modern outbound.
      </h1>
      <p className="text-[17px] text-muted mt-4 max-w-xl leading-relaxed">
        What I&apos;m learning building GTM systems: Clay, AI agents, data hygiene, testing. Shorter takes go
        out on{" "}
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="text-foreground underline underline-offset-4 decoration-line-2 hover:decoration-foreground">
          LinkedIn
        </a>
        .
      </p>
      <div className="mt-12 border-t border-line">
        {posts.map((p) => (
          <Link key={p.slug} href={`/writing/${p.slug}`} className="group block py-7 border-b border-line">
            <div className="flex items-center gap-3 font-mono text-[12px] text-muted">
              <span>{formatDate(p.date)}</span>
              <span className="text-faint">·</span>
              <span>{p.readingMinutes} min read</span>
            </div>
            <h2 className="text-[21px] font-semibold tracking-[-0.02em] mt-2 group-hover:text-accent transition-colors">{p.title}</h2>
            <p className="text-[15.5px] text-muted mt-2 leading-relaxed">{p.summary}</p>
            <div className="flex flex-wrap gap-1.5 mt-4">
              {p.tags.map((t) => <span key={t} className="chip !h-6 !text-[10.5px]">{t}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
