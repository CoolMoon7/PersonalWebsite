import {
  siHubspot, siZapier, siPython, siClaude, siMeta, siTiktok, siShopify, siPostgresql,
  siReact, siN8n, siPandas, siGooglesheets, siInstagram, siFirebase, siGmail, siEtsy,
  siSqlite, siGithub, siGoogleads, siTypescript, siNextdotjs, siVercel, siAirtable,
  siX, siGooglemaps, siPerplexity, siNotion, siCalendly, siCrunchbase, siGoogledocs,
} from "simple-icons";

type SimpleIcon = { title: string; hex: string; path: string };

const si: Record<string, SimpleIcon> = {
  hubspot: siHubspot, zapier: siZapier, python: siPython, claude: siClaude, meta: siMeta,
  tiktok: siTiktok, shopify: siShopify, postgres: siPostgresql, react: siReact, n8n: siN8n,
  pandas: siPandas, sheets: siGooglesheets, instagram: siInstagram, firebase: siFirebase,
  gmail: siGmail, etsy: siEtsy, sqlite: siSqlite, github: siGithub, googleads: siGoogleads,
  typescript: siTypescript, nextjs: siNextdotjs, vercel: siVercel, airtable: siAirtable,
  x: siX, maps: siGooglemaps, perplexity: siPerplexity, notion: siNotion, calendly: siCalendly,
  crunchbase: siCrunchbase, docs: siGoogledocs,
};

/** Services without a bundled mark: a lettered tile in the brand colour, always labelled in text. */
const tiles: Record<string, { title: string; letter: string; color: string }> = {
  firecrawl: { title: "Firecrawl", letter: "F", color: "#f97316" },
  hunter: { title: "Hunter", letter: "H", color: "#f2541b" },
  zerobounce: { title: "ZeroBounce", letter: "Z", color: "#1f6feb" },
  neverbounce: { title: "NeverBounce", letter: "N", color: "#16a34a" },
  slack: { title: "Slack", letter: "S", color: "#611f69" },
}

const img: Record<string, string> = {
  clay: "Clay", apollo: "Apollo", openai: "OpenAI", linkedin: "LinkedIn",
  higgsfield: "Higgsfield", instantly: "Instantly",
};

/** Generic glyphs for steps that aren't a vendor (agents, CSVs, people, gates...). */
const glyphs: Record<string, { title: string; d: string }> = {
  agent: { title: "AI agent", d: "M12 2l1.9 5.6L19.5 9.5l-5.6 1.9L12 17l-1.9-5.6L4.5 9.5l5.6-1.9L12 2zm7 11l.9 2.6 2.6.9-2.6.9L19 20l-.9-2.6-2.6-.9 2.6-.9L19 13z" },
  csv: { title: "Dataset", d: "M4 4h16v16H4V4zm2 2v3h5V6H6zm7 0v3h5V6h-5zM6 11v3h5v-3H6zm7 0v3h5v-3h-5zM6 16v2h5v-2H6zm7 0v2h5v-2h-5z" },
  human: { title: "Human review", d: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 8a7 7 0 0114 0v1H5v-1z" },
  shield: { title: "Guardrails", d: "M12 2l8 3v6c0 5-3.4 9.4-8 11-4.6-1.6-8-6-8-11V5l8-3zm-1.2 13.6l5.7-5.7-1.4-1.4-4.3 4.3-2-2-1.4 1.4 3.4 3.4z" },
  calendar: { title: "Calendar trigger", d: "M7 2h2v2h6V2h2v2h3v18H4V4h3V2zm-1 8v10h12V10H6zm2 2h3v3H8v-3z" },
  chart: { title: "Dashboard", d: "M4 20V4h2v14h14v2H4zm4-4v-5h3v5H8zm5 0V7h3v9h-3zm5 0v-7h3v7h-3z" },
  mail: { title: "Email", d: "M3 5h18v14H3V5zm2 2v.5l7 4.5 7-4.5V7H5zm14 2.8l-7 4.5-7-4.5V17h14V9.8z" },
  web: { title: "Web", d: "M12 2a10 10 0 110 20 10 10 0 010-20zm-1.5 2.2A8 8 0 004.1 11h3.4c.1-2.6.9-5 3-6.8zM13.5 4.2c2.1 1.8 2.9 4.2 3 6.8h3.4a8 8 0 00-6.4-6.8zM9.5 11h5c-.1-2.4-1-4.4-2.5-5.9C10.5 6.6 9.6 8.6 9.5 11zm0 2c.1 2.4 1 4.4 2.5 5.9 1.5-1.5 2.4-3.5 2.5-5.9h-5zm-5.4 0a8 8 0 006.4 6.8c-2.1-1.8-2.9-4.2-3-6.8H4.1zm12.4 0c-.1 2.6-.9 5-3 6.8a8 8 0 006.4-6.8h-3.4z" },
  db: { title: "Database", d: "M12 2c4.4 0 8 1.3 8 3v14c0 1.7-3.6 3-8 3s-8-1.3-8-3V5c0-1.7 3.6-3 8-3zm6 5.3C16.6 8 14.4 8.5 12 8.5S7.4 8 6 7.3V10c0 .6 2.4 1.5 6 1.5s6-.9 6-1.5V7.3zm0 5C16.6 13 14.4 13.5 12 13.5S7.4 13 6 12.3V15c0 .6 2.4 1.5 6 1.5s6-.9 6-1.5v-2.7z" },
  video: { title: "Video", d: "M3 5h13v14H3V5zm15 4l4-2v10l-4-2V9z" },
  doc: { title: "Voice doc", d: "M6 2h9l5 5v15H6V2zm8 1.5V8h4.5L14 3.5zM8 12h8v1.6H8V12zm0 3.4h8V17H8v-1.6zM8 8.6h4v1.6H8V8.6z" },
  loop: { title: "Feedback loop", d: "M12 4a8 8 0 017.7 6H22l-3.5 4-3.5-4h2.6A6 6 0 006.3 9.4L4.6 8.3A8 8 0 0112 4zm-6.6 6L9 14H6.4a6 6 0 0011.3.6l1.7 1.1A8 8 0 014.3 14H2l3.4-4z" },
};

/** Muted, fixed palette for monogram tiles of names we have no mark for. */
const MONO_COLORS = ["#64748b", "#78716c", "#0f766e", "#4d7c0f", "#7c6f3a", "#6b5b95"];

/**
 * Keyword fallback for names that are not a known key, matched by whole word, first rule wins.
 * Brands come before the generic nouns so "Gmail inbox" is Gmail, not a generic mail glyph.
 */
const keywordRules: [string[], string][] = [
  [["x", "twitter"], "x"],
  [["linkedin"], "linkedin"],
  [["gmail"], "gmail"],
  [["slack"], "slack"],
  [["firecrawl"], "firecrawl"],
  [["hunter"], "hunter"],
  [["apollo"], "apollo"],
  [["email", "inbox", "outlook"], "mail"],
  [["directory", "site", "website", "web", "page", "scrape", "listing", "job", "board", "hiring", "careers"], "web"],
  [["conference", "event", "attendee", "calendar", "session", "agenda"], "calendar"],
  [["sheet"], "sheets"],
  [["database", "supabase", "postgres", "crm"], "db"],
  [["doc", "notion", "news", "press", "filing"], "doc"],
  [["claude", "openai", "model", "llm"], "agent"],
];

const isKnown = (k: string) => !!(si[k] || img[k] || tiles[k] || glyphs[k]);

/** The key whose mark represents this name, or null when only a monogram fits. */
function resolveKey(name: string): string | null {
  if (isKnown(name)) return name;
  const lower = name.trim().toLowerCase();
  if (isKnown(lower)) return lower;
  const words = new Set(lower.split(/[^a-z0-9]+/).filter(Boolean));
  for (const [keywords, key] of keywordRules) {
    if (keywords.some((k) => words.has(k))) return key;
  }
  return null;
}

/** One initial, or two when the name is two short words ("Job board"). */
function monogram(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const take = words.length === 2 && words.every((w) => w.length <= 5) ? 2 : 1;
  const letters = words.slice(0, take).map((w) => Array.from(w)[0]).join("").toUpperCase();
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.codePointAt(0)!) >>> 0;
  return { letters: letters || "?", color: MONO_COLORS[h % MONO_COLORS.length] };
}

export function logoTitle(key: string) {
  return si[key]?.title ?? img[key] ?? tiles[key]?.title ?? glyphs[key]?.title ?? key;
}

export default function Logo({
  name: raw,
  size = 18,
  mono = false,
  className = "",
}: {
  name: string;
  size?: number;
  mono?: boolean;
  className?: string;
}) {
  const resolved = resolveKey(raw);
  const name = resolved ?? raw;
  // Keep the data's own name as the accessible label when a keyword picked the glyph.
  const label = (fallback: string) => (resolved && resolved !== raw ? raw : fallback);
  const s = si[name];
  if (s) {
    return (
      <svg
        role="img"
        aria-label={label(s.title)}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={`${mono ? "logo-mono" : ""} ${className}`}
        fill={`#${s.hex === "FFFFFF" ? "0a0a0a" : s.hex}`}
      >
        <path d={s.path} />
      </svg>
    );
  }
  if (img[name]) {
    return (
      // Tiny local favicons; next/image adds nothing at this size.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/logos/${name}.png`}
        alt={label(img[name])}
        width={size}
        height={size}
        loading="lazy"
        className={`rounded-[4px] ${mono ? "logo-mono" : ""} ${className}`}
      />
    );
  }
  const t = tiles[name];
  if (t) {
    return (
      <span
        role="img"
        aria-label={label(t.title)}
        className={`inline-grid place-items-center rounded-[4px] text-white font-semibold leading-none ${className}`}
        style={{ width: size, height: size, background: t.color, fontSize: size * 0.62 }}
      >
        {t.letter}
      </span>
    );
  }
  const g = glyphs[name];
  if (!g) {
    const m = monogram(name);
    return (
      <span
        role="img"
        aria-label={name}
        title={name}
        className={`inline-grid place-items-center rounded-lg text-white font-semibold leading-none ${className}`}
        style={{ width: size, height: size, background: m.color, fontSize: size * 0.46 }}
      >
        {m.letters}
      </span>
    );
  }
  return (
    <svg
      role="img"
      aria-label={label(g.title)}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill={name === "agent" ? "#6d4aff" : "#52525b"}
    >
      <path d={g.d} />
    </svg>
  );
}
