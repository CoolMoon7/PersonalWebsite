import Link from "next/link";
import { site } from "@/data/site";

const links = [
  { label: "Systems", href: "/#systems" },
  { label: "Method", href: "/#method" },
  { label: "Writing", href: "/writing" },
  { label: "About", href: "/#about" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/75 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="w-7 h-7 rounded-lg bg-foreground text-white font-mono text-[11px] font-semibold flex items-center justify-center">
            cb
          </span>
          <span className="text-[14px] font-medium tracking-tight">Cole Bonawitz</span>
          <span className="hidden sm:inline font-mono text-[11px] text-faint">/ gtm engineer</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-md text-[13.5px] text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md text-[13.5px] text-muted hover:text-foreground hover:bg-surface transition-colors">
            LinkedIn
          </a>
          <a href="/#contact" className="btn btn-dark ml-2 !h-8 !px-3 !text-[13px]">
            Get in touch
          </a>
        </div>

        {/* Mobile menu: <details> keeps this JavaScript-free */}
        <details className="md:hidden group relative">
          <summary className="list-none cursor-pointer w-9 h-9 -mr-2 flex items-center justify-center rounded-md hover:bg-surface [&::-webkit-details-marker]:hidden" aria-label="Menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
              <path d="M6 6l12 12M18 6L6 18" className="hidden group-open:block" />
            </svg>
          </summary>
          <div className="absolute right-0 top-11 w-56 panel p-2 shadow-lg">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="block px-3 py-2 rounded-md text-[14px] hover:bg-surface">
                {l.label}
              </Link>
            ))}
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-[14px] hover:bg-surface">
              LinkedIn
            </a>
            <a href="/#contact" className="btn btn-dark w-full justify-center mt-1">Get in touch</a>
          </div>
        </details>
      </nav>
    </header>
  );
}
