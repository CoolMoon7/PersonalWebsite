import type { Metadata } from "next";
import { PageHeader, ServiceGrid, ClosingCta } from "@/components/sections";
import { SectionHead } from "@/components/ui";
import ServiceMap from "@/components/ServiceMap";
import Tiers from "@/components/Tiers";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Services | AI for independent insurance agencies",
  description:
    "Every service in the AI department for independent insurance agencies: foundation, workflows and advanced. Based in Durham, NC.",
  path: "/services",
});

export default function Services() {
  return (
    <>
      <PageHeader eyebrow="Services" title="Pick one, or let the audit tell us which." lede="Each service names the problem and what I do about it. Ask about any of them and I'll quote it in writing." />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-14">
        <SectionHead index="01" kicker="The map" title="Where each service works.">Tap anything.</SectionHead>
        <ServiceMap />
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
        <SectionHead index="02" kicker="Levels" title="How far you take it." />
        <Tiers />
      </section>
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-20">
        <SectionHead index="03" kicker="Every service" title="The full list." />
        <ServiceGrid groupLevel={2} />
      </section>
      <ClosingCta title="Not on the list? If your workflow needs something custom, that's what I build." />
    </>
  );
}
