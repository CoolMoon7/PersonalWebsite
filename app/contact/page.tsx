import type { Metadata } from "next";
import { PageHeader } from "@/components/sections";
import { site } from "@/data/site";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Book an audit or request a quote",
  description:
    "Book an AI audit, request a quote, or just talk. Cole Bonawitz runs the AI department for independent insurance agencies in the Triangle.",
  path: "/contact",
});

export default function Contact() {
  return (
    <>
      <PageHeader eyebrow="Contact" title="Book an audit, request a quote, or just talk." />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mt-10">
        {/* TODO(Cole): stage 3 replaces this with the form. Until then, email is the path. */}
        <div className="panel p-6 sm:p-8 max-w-xl">
          <p className="text-[15px] text-ink-2 leading-relaxed">
            Write to me directly at{" "}
            <a className="text-accent underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
