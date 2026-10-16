import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row gap-6 sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-md bg-foreground text-white font-mono text-[10px] font-semibold flex items-center justify-center">cb</span>
          <span className="font-mono text-[12px] text-muted">© {new Date().getFullYear()} Cole Bonawitz · colebonawitz.com</span>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[12px] text-muted">
          <Link href="/#systems" className="hover:text-foreground">systems</Link>
          <Link href="/writing" className="hover:text-foreground">writing</Link>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">linkedin</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">github</a>
          <a href={site.resume} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">resume</a>
          <a href={`mailto:${site.email}`} className="hover:text-foreground">email</a>
        </div>
      </div>
    </footer>
  );
}
