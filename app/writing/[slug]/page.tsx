import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPosts, getPost, formatDate } from "@/lib/posts";
import { site } from "@/data/site";
import Logo from "@/components/Logo";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/writing/${p.slug}` },
    openGraph: { type: "article", title: p.title, description: p.summary, publishedTime: p.date },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  return (
    <article className="max-w-[680px] mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
      <Link href="/writing" className="font-mono text-[12px] text-muted hover:text-foreground">← writing</Link>
      <header className="mt-8 mb-10">
        <div className="flex items-center gap-3 font-mono text-[12px] text-muted">
          <span>{formatDate(p.date)}</span>
          <span className="text-faint">·</span>
          <span>{p.readingMinutes} min read</span>
        </div>
        <h1 className="text-[34px] sm:text-[44px] font-semibold tracking-[-0.04em] leading-[1.08] mt-4">{p.title}</h1>
        <p className="text-[18px] text-muted mt-4 leading-relaxed">{p.summary}</p>
      </header>
      <div className="prose-cb" dangerouslySetInnerHTML={{ __html: p.html }} />
      <footer className="mt-14 panel p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[15px] font-medium">Cole Bonawitz</div>
          <div className="text-[14px] text-muted">GTM engineer. I build outbound systems with Clay, Python and AI agents.</div>
        </div>
        <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-none">
          <Logo name="linkedin" size={15} /> Follow
        </a>
      </footer>
    </article>
  );
}
