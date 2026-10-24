"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { site, siteMode } from "@/data/site";
import { fde } from "@/data/fde";

export default function Footer() {
  const mode = siteMode(usePathname());
  const resume = mode === "fde" ? fde.resume : site.resume;
  const email = mode === "fde" ? fde.email : site.email;
  return (
    <footer id="site-footer" className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="" width={20} height={20} className="w-5 h-5" />
          <span className="font-mono text-[12px] text-muted">© {new Date().getFullYear()} Cole Bonawitz · {mode === "insurance" ? "AI for independent insurance agencies · Durham, NC" : "colebonawitz.com"}</span>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] text-muted">
          {mode === "fde" ? (
            <>
              <Link href="/fde#deployments" className="hover:text-foreground">deployments</Link>
              <Link href="/fde#about" className="hover:text-foreground">about</Link>
            </>
          ) : mode === "gtm" ? (
            <>
              <Link href="/gtm#systems" className="hover:text-foreground">systems</Link>
              <Link href="/writing" className="hover:text-foreground">writing</Link>
            </>
          ) : (
            <>
              <Link href="/services" className="hover:text-foreground">services</Link>
              <Link href="/how-it-works" className="hover:text-foreground">how it works</Link>
              <Link href="/services/coi-desk" className="hover:text-foreground">the COI desk</Link>
              <Link href="/audit" className="hover:text-foreground">audit</Link>
              <Link href="/trust" className="hover:text-foreground">trust</Link>
              <Link href="/about" className="hover:text-foreground">about</Link>
              <Link href="/contact" className="hover:text-foreground">contact</Link>
            </>
          )}
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">linkedin</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">github</a>
          <a href={resume} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">resume</a>
          <a href={`mailto:${email}`} className="hover:text-foreground">email</a>
        </div>
      </div>
    </footer>
  );
}
