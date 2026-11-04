import Logo from "@/components/Logo";

/**
 * Hero visual: the tools Cole builds with, as app icons drifting past in three rows.
 * Rows move in alternating directions; each tile also bobs on its own rhythm.
 */
const rows: [string, string][][] = [
  [
    ["claude", "Claude Code"], ["codex", "Codex"], ["chatgpt", "ChatGPT"], ["grok", "Grok"], ["meta-ai", "Meta Muse"],
    ["gemini", "Gemini"], ["cursor", "Cursor"], ["perplexity", "Perplexity"], ["copilot", "Copilot"], ["mcp", "MCP"],
  ],
  [
    ["openclaw", "OpenClaw"], ["hermes", "Hermes"], ["obsidian", "Obsidian"], ["notion", "Notion"], ["n8n", "n8n"],
    ["zapier", "Zapier"], ["clay", "Clay"], ["apollo", "Apollo"], ["firecrawl", "Firecrawl"], ["instantly", "Instantly"], ["hubspot", "HubSpot"],
  ],
  [
    ["python", "Python"], ["supabase", "Supabase"], ["postgres", "Postgres"], ["fastapi", "FastAPI"], ["nextjs", "Next.js"],
    ["vercel", "Vercel"], ["github", "GitHub"], ["swift", "Swift"], ["firebase", "Firebase"], ["higgsfield", "Higgsfield"], ["meta", "Meta Ads"], ["shopify", "Shopify"],
  ],
];

function Tile({ k, label, i }: { k: string; label: string; i: number }) {
  return (
    <li className="flex flex-col items-center gap-2 w-[76px] sm:w-[88px] flex-none">
      <span
        className="icon-tile grid place-items-center w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-[22%] bg-white border border-black/[0.06]"
        style={{ "--fd": `${(i % 6) * -0.7}s`, "--fl": `${5 + (i % 3)}s` } as React.CSSProperties}
      >
        <Logo name={k} size={32} />
      </span>
      <span className="text-[11.5px] text-muted whitespace-nowrap">{label}</span>
    </li>
  );
}

export default function ToolField() {
  return (
    <div className="icon-wall relative" aria-label="Tools I build with">
      {rows.map((row, r) => (
        <div key={r} className="marquee overflow-hidden py-3">
          <div className={`marquee-track flex w-max ${r % 2 ? "marquee-rev" : ""}`} style={{ animationDuration: `${46 + r * 8}s` }}>
            {[0, 1].map((copy) => (
              <ul key={copy} className="marquee-copy flex gap-3 sm:gap-5 pr-3 sm:pr-5" aria-hidden={copy === 1 || undefined}>
                {row.map(([k, label], i) => (
                  <Tile key={k} k={k} label={label} i={i + r} />
                ))}
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
