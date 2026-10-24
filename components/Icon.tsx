import { icons } from "@/content/map";

export default function Icon({ slug, size = 22, className = "" }: { slug: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d={icons[slug] ?? ""} />
    </svg>
  );
}
