import Link from "next/link";
import Image from "next/image";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/images/logo.png" alt="" width={20} height={20} className="w-5 h-5" />
          <span className="font-mono text-[12px] text-muted">© {new Date().getFullYear()} Cole Bonawitz · colebonawitz.com</span>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] text-muted">
          <Link href="/#work" className="hover:text-foreground">what it does</Link>
          <Link href="/#about" className="hover:text-foreground">background</Link>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">linkedin</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">github</a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">resume</a>
          <a href={`mailto:${site.email}`} className="hover:text-foreground">email</a>
        </div>
      </div>
    </footer>
  );
}
