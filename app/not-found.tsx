import Link from "next/link";

export default function NotFound() {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-32 text-center">
      <div className="font-mono text-[13px] text-muted">404 · route not found</div>
      <h1 className="text-[44px] font-semibold tracking-[-0.04em] mt-4">This page isn&apos;t in the pipeline.</h1>
      <Link href="/" className="btn btn-dark mt-8">Back home</Link>
    </section>
  );
}
