import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="font-display font-bold text-7xl md:text-9xl text-foreground mb-4">
          404
        </h1>
        <div className="w-16 h-px bg-border mx-auto mb-6" />
        <p className="text-lg text-muted mb-8">
          This page doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="hover-lift px-6 py-3 border border-accent text-accent text-sm font-medium hover:bg-accent hover:text-white transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
