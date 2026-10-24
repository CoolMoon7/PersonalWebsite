import type { Metadata } from "next";
import { PageHeader } from "@/components/sections";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Book an audit or request a quote",
  description:
    "Book an AI audit, request a quote, or just talk. Cole Bonawitz runs the AI department for independent insurance agencies in the Triangle.",
  path: "/contact",
});

export default async function Contact({ searchParams }: { searchParams: Promise<{ intent?: string; service?: string }> }) {
  const { intent, service } = await searchParams;
  const booking = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <>
      <PageHeader eyebrow="Contact" title="Book an audit, request a quote, or just talk." />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] gap-6 items-start">
        <ContactForm intent={intent} service={service} />
        <aside className="panel p-6 text-[15px] text-ink-2 leading-relaxed">
          <div className="eyebrow mb-3">Or write to me</div>
          <a className="text-accent underline underline-offset-4 break-all" href={`mailto:${site.email}`}>{site.email}</a>
          <p className="mt-4 text-[14px] text-muted">Durham, NC</p>
          {booking && (
            <a href={booking} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-5">Pick a time</a>
          )}
        </aside>
      </section>
    </>
  );
}
