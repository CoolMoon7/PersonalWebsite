import Image from "next/image";

/** A clickable screenshot in a browser frame that lifts and tilts toward you on hover. */
export default function BrowserShot({
  href, src, alt, host, dark = false, priority = false, className = "",
}: { href: string; src: string; alt: string; host: string; dark?: boolean; priority?: boolean; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`shot group block rounded-xl overflow-hidden border ${dark ? "border-[#27272a] bg-[#0a0a0a]" : "border-line-2 bg-white"} ${className}`}
      aria-label={`Open ${host}`}
    >
      <div className={`flex items-center gap-2 px-3 h-8 border-b ${dark ? "border-[#27272a]" : "border-line"}`}>
        <span className="flex gap-1.5">
          <i className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <i className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <i className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </span>
        <span className={`mx-auto font-mono text-[11px] px-3 rounded-md ${dark ? "bg-[#18181b] text-[#a1a1aa]" : "bg-surface text-muted"}`}>
          {host}
        </span>
        <span className={`font-mono text-[11px] opacity-0 group-hover:opacity-100 transition-opacity ${dark ? "text-white" : "text-accent"}`}>open ↗</span>
      </div>
      <div className="relative overflow-hidden">
        <Image src={src} alt={alt} width={1440} height={900} priority={priority} sizes="(max-width: 1024px) 100vw, 640px"
          className="w-full h-auto transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
      </div>
    </a>
  );
}
