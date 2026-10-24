import type { Metadata } from "next";
import { PageHeader, ServiceGrid, ClosingCta } from "@/components/sections";
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
        <ServiceGrid groupLevel={2} />
      </section>
      <ClosingCta title="Not on the list? If your workflow needs something custom, that's what I build." />
    </>
  );
}
