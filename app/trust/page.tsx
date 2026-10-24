import type { Metadata } from "next";
import { PageHeader, Boundaries, ClosingCta } from "@/components/sections";
import { trust, closing } from "@/data/home";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Trust and boundaries | Cole Bonawitz",
  description:
    "What I won't do, where your data goes, and how access works when I run AI tools for your independent insurance agency.",
  path: "/trust",
});

export default function Trust() {
  return (
    <>
      <PageHeader eyebrow="Trust" title={trust.title} lede={trust.lede} />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-14">
        <Boundaries items={trust.items} />
        <p className="panel border-dashed p-5 sm:p-7 mt-4 text-[15px] text-ink-2 leading-relaxed max-w-3xl">{trust.close}</p>
      </section>
      <ClosingCta title={closing.title} />
    </>
  );
}
