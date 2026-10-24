"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site, siteMode } from "@/data/site";
import { fde } from "@/data/fde";

/** Each audience gets its own links, résumé and contact, so the three sites never cross-link. */
const modes = {
  insurance: {
    home: "/",
    resume: site.resume,
    tag: "/ ai for insurance agencies",
    contact: "/contact?intent=audit",
    cta: "Book an AI audit",
    socials: false,
    links: [
      { label: "Services", href: "/services" },
      { label: "How it works", href: "/how-it-works" },
      { label: "The COI desk", href: "/services/coi-desk" },
      { label: "Trust", href: "/trust" },
      { label: "About", href: "/about" },
    ],
  },
  gtm: {
    home: "/gtm",
    resume: site.resume,
    tag: "/ gtm engineer",
    contact: "/gtm#contact",
    cta: "Get in touch",
    socials: true,
    links: [
      { label: "Systems", href: "/gtm#systems" },
      { label: "About", href: "/gtm#about" },
      { label: "Method", href: "/gtm#method" },
      { label: "Writing", href: "/writing" },
    ],
  },
  fde: {
    home: "/fde",
    resume: fde.resume,
    tag: "/ forward deployed engineer",
    contact: "/fde#contact",
    cta: "Get in touch",
    socials: true,
    links: [
      { label: "Deployments", href: "/fde#deployments" },
      { label: "How I work", href: "/fde#method" },
      { label: "About", href: "/fde#about" },
    ],
  },
};

export default function Nav() {
  const m = modes[siteMode(usePathname())];
  const links = m.links;
  return (
    <header id="site-nav" className="sticky top-0 z-50 border-b border-line/80 bg-white/75 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <Link href={m.home} className="flex items-center gap-2.5 group">
          <Image src="/images/logo.png" alt="" width={26} height={26} priority className="w-[26px] h-[26px]" />
          <span className="text-[15px] font-semibold tracking-tight">Cole Bonawitz</span>
          <span className="hidden xl:inline font-mono text-[11px] text-faint">{m.tag}</span>
        </Link>

        <div className="hidden md:flex items-center gap-1 whitespace-nowrap">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="px-3 py-1.5 rounded-md text-[13.5px] text-muted hover:text-foreground hover:bg-surface transition-colors"
            >
              {l.label}
            </Link>
          ))}
          {m.socials && (
            <>
          <a href={m.resume} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md text-[13.5px] text-muted hover:text-foreground hover:bg-surface transition-colors">
            Résumé
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md text-[13.5px] text-muted hover:text-foreground hover:bg-surface transition-colors">
            LinkedIn
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-md text-[13.5px] text-muted hover:text-foreground hover:bg-surface transition-colors">
            GitHub
          </a>
            </>
          )}
          <a href={m.contact} className="btn btn-dark ml-2 !h-8 !px-3 !text-[13px]">
            {m.cta}
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
            {m.socials && (
              <>
            <a href={m.resume} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-[14px] hover:bg-surface">Résumé</a>
            <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-[14px] hover:bg-surface">LinkedIn</a>
            <a href={site.github} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 rounded-md text-[14px] hover:bg-surface">GitHub</a>
              </>
            )}
            <a href={m.contact} className="btn btn-dark w-full justify-center mt-1">{m.cta}</a>
          </div>
        </details>
      </nav>
    </header>
  );
}
