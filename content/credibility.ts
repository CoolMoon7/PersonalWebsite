/**
 * Logos and case studies. Marks render from public/logos/<file>.(svg|png|webp) when the file exists
 * and fall back to a plain wordmark when it doesn't, so a missing file never breaks the page.
 *
 * Only list a system under `systems` if it can really be supported. Logos are trademarks of their owners.
 */

export type Mark = { name: string; file: string; /** Display height in px, to balance wide and stacked logos. */ h?: number; /** Use this path instead of public/logos/<file>. */ src?: string };

/** Where I've studied, built and worked. */
export const worked: Mark[] = [
  { name: "Duke University", file: "duke", h: 40 },
  { name: "Duke Innovation & Entrepreneurship", file: "duke-ie", h: 36 },
  { name: "DukeEngage", file: "dukeengage", h: 28 },
  { name: "Innovation Collab", file: "innovation-collab", h: 40 },
  { name: "Swoop Tutors", file: "swoop-tutors", h: 32 },
  { name: "Dignity Properties", file: "dignity-properties", h: 74 },
];

/** Management systems I work around. Named because the agency has to tell me which one it runs. */
export const systems: Mark[] = [
  { name: "AMS360", file: "ams360", h: 38 },
  { name: "Applied Epic", file: "applied-epic", h: 28 },
  { name: "HawkSoft", file: "hawksoft", h: 34 },
  { name: "EZLynx", file: "ezlynx", h: 50 },
  { name: "Momentum AMP", file: "momentum-amp", h: 34 },
  { name: "QQCatalyst", file: "qqcatalyst", h: 34 },
];

/** Tools I have actually built with, by Logo key. */
export const builtWith = ["claude", "mcp", "python", "supabase", "postgres", "hubspot", "zapier", "gmail", "react", "clay"];

export type Case = {
  org: string;
  mark: Mark;
  role: string;
  period: string;
  problem: string;
  flow: string[];
  stats: { v: string; l: string }[];
  result: string;
  tools: string[];
};

export const cases: Case[] = [
  {
    org: "Swoop Tutors",
    mark: worked[4],
    role: "GTM engineering intern · sole engineer",
    period: "Aug – Dec 2025",
    problem: "No outbound motion. Leads in spreadsheets, replies tracked by hand.",
    flow: ["Clay", "Clean", "Score", "HubSpot + Zapier", "Dashboard", "Custom CRM"],
    stats: [
      { v: "10,000+", l: "records cleaned" },
      { v: "5,000+", l: "prospects sequenced" },
      { v: "15%", l: "cold reply rate" },
      { v: "50", l: "calls booked" },
    ],
    result: "The reply dashboard changed who the team targeted. The custom CRM is still in use.",
    tools: ["clay", "python", "pandas", "hubspot", "zapier", "react", "postgres"],
  },
  {
    org: "Dignity Properties",
    mark: worked[5],
    role: "Builder",
    period: "Project",
    problem: "Off-market deals sourced by hand, with context lost between runs.",
    flow: ["Source", "Qualify", "Remember"],
    stats: [
      { v: "MCP", l: "tool layer" },
      { v: "Supabase", l: "persistent memory" },
    ],
    result: "Agents source and qualify properties. Every run starts from the properties, owners and decisions the firm already has.",
    tools: ["claude", "mcp", "supabase", "python"],
  },
];
