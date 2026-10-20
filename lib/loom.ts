import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sample from "@/data/loom/sample.json";

export type LoomSignal = "funding" | "launch" | "hiring" | "competitor" | "expansion" | "other";
export type LoomStage = "researched" | "enriched" | "draft ready" | "approved" | "sent" | "replied";

export type LoomAccount = {
  name: string;
  domain?: string;
  reason: string;
  signal: LoomSignal;
  source: string;
  date?: string;
};

export type LoomFlowStep = { step: string; title: string; body: string };
export type LoomStackItem = { name: string; role: string };
export type LoomSystemStep = {
  n: string;
  stage: string;
  kind: "agent" | "human";
  name: string;
  blurb: string;
  inputs: string[];
  output: string;
};
export type LoomExample = { prospect: string; signal: string; draft: string };
export type LoomSystem = {
  where: { source: string; detail: string }[];
  signal: string;
  chain: LoomFlowStep[];
  approval: string;
  steps?: LoomSystemStep[];
  example?: LoomExample;
};
export type LoomKpi = { label: string; value: string };
export type LoomRow = { company: string; stage: LoomStage; note?: string };

export type LoomContent = {
  schema_version: 1;
  slug: string;
  company: {
    name: string;
    domain?: string;
    hq?: string;
    stage?: string;
    one_liner: string;
    icp_line: string;
    hiring_signal?: string;
  };
  accounts: LoomAccount[];
  flow?: LoomFlowStep[];
  stack: LoomStackItem[];
  system: LoomSystem;
  outreach?: unknown;
  script?: unknown;
  dashboard?: { headline?: string; kpis?: LoomKpi[]; rows?: LoomRow[]; note?: string };
  ask: { line: string; email?: string; linkedin?: string };
  meta: { status: string; generated_at?: string; generator?: string; demo?: boolean };
};

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const SIGNALS: readonly string[] = ["funding", "launch", "hiring", "competitor", "expansion", "other"];
const STAGES: readonly string[] = ["researched", "enriched", "draft ready", "approved", "sent", "replied"];

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);
const isStr = (v: unknown): v is string => typeof v === "string" && v.trim().length > 0;
const optStr = (v: unknown) => v === undefined || typeof v === "string";
const isHttp = (v: unknown): v is string => isStr(v) && /^https?:\/\//.test(v);

function validAccount(a: unknown): a is LoomAccount {
  return (
    isObj(a) &&
    isStr(a.name) &&
    isStr(a.reason) &&
    typeof a.signal === "string" &&
    SIGNALS.includes(a.signal) &&
    isHttp(a.source) &&
    optStr(a.domain) &&
    optStr(a.date)
  );
}

function validFlow(f: unknown): boolean {
  return f === undefined || (Array.isArray(f) && f.every((s) => isObj(s) && isStr(s.step) && isStr(s.title) && isStr(s.body)));
}

function validStack(s: unknown): boolean {
  return Array.isArray(s) && s.length >= 4 && s.length <= 10 && s.every((t) => isObj(t) && isStr(t.name) && isStr(t.role));
}

function validSystem(s: unknown): boolean {
  if (!isObj(s) || !isStr(s.signal) || !isStr(s.approval)) return false;
  const whereOk =
    Array.isArray(s.where) &&
    s.where.length >= 1 &&
    s.where.length <= 4 &&
    s.where.every((w) => isObj(w) && isStr(w.source) && isStr(w.detail));
  const chainOk = Array.isArray(s.chain) && s.chain.length >= 3 && s.chain.length <= 6 && validFlow(s.chain);
  return whereOk && chainOk;
}

/** Steps and example are display extras: an invalid one is dropped (see systemStepsFor), never a reason to fail the page. */
function validStep(s: unknown): s is LoomSystemStep {
  return (
    isObj(s) &&
    isStr(s.n) &&
    isStr(s.stage) &&
    (s.kind === "agent" || s.kind === "human") &&
    isStr(s.name) &&
    isStr(s.blurb) &&
    Array.isArray(s.inputs) &&
    s.inputs.every((i) => typeof i === "string" && i.trim().length >= 1 && i.length <= 120) &&
    typeof s.output === "string"
  );
}

function validExample(e: unknown): e is LoomExample {
  return isObj(e) && isStr(e.prospect) && isStr(e.signal) && isStr(e.draft);
}

function validDashboard(d: unknown): boolean {
  if (d === undefined) return true;
  if (!isObj(d) || !optStr(d.headline) || !optStr(d.note)) return false;
  const kpisOk =
    d.kpis === undefined || (Array.isArray(d.kpis) && d.kpis.every((k) => isObj(k) && isStr(k.label) && isStr(k.value)));
  const rowsOk =
    d.rows === undefined ||
    (Array.isArray(d.rows) &&
      d.rows.every((r) => isObj(r) && isStr(r.company) && typeof r.stage === "string" && STAGES.includes(r.stage) && optStr(r.note)));
  return kpisOk && rowsOk;
}

export function isLoomContent(v: unknown): v is LoomContent {
  if (!isObj(v) || v.schema_version !== 1) return false;
  if (!isStr(v.slug) || !SLUG.test(v.slug)) return false;
  const c = v.company;
  if (!isObj(c) || !isStr(c.name) || !isStr(c.one_liner) || !isStr(c.icp_line)) return false;
  if (![c.domain, c.hq, c.stage, c.hiring_signal].every(optStr)) return false;
  if (!Array.isArray(v.accounts) || v.accounts.length < 10 || !v.accounts.every(validAccount)) return false;
  if (!validFlow(v.flow)) return false;
  if (!validStack(v.stack)) return false;
  if (!validSystem(v.system)) return false;
  if (!validDashboard(v.dashboard)) return false;
  if (!isObj(v.ask) || !isStr(v.ask.line) || !optStr(v.ask.email) || !optStr(v.ask.linkedin)) return false;
  if (!isObj(v.meta) || !isStr(v.meta.status)) return false;
  return true;
}

async function fromSupabase(slug: string): Promise<LoomContent | null> {
  const base = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!base || !key) return null;
  try {
    const url = `${base.replace(/\/+$/, "")}/rest/v1/loom_pages?slug=eq.${encodeURIComponent(slug)}&select=content,status&limit=1`;
    const res = await fetch(url, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(2500),
    });
    if (res.status !== 200) return null;
    const rows: unknown = await res.json();
    if (!Array.isArray(rows) || rows.length === 0 || !isObj(rows[0])) return null;
    const content = rows[0].content;
    return isLoomContent(content) && content.slug === slug ? content : null;
  } catch {
    return null;
  }
}

async function fromSample(slug: string): Promise<LoomContent | null> {
  return slug === "sample" && isLoomContent(sample) ? sample : null;
}

/** data/loom/<slug>.json, for pages the pipeline writes to disk. The file must carry the same slug it is named for. */
async function fromLocalFile(slug: string): Promise<LoomContent | null> {
  try {
    const raw = await readFile(path.join(process.cwd(), "data", "loom", `${slug}.json`), "utf8");
    const content: unknown = JSON.parse(raw);
    return isLoomContent(content) && content.slug === slug ? content : null;
  } catch {
    return null;
  }
}

/** Tried in order after Supabase; the first hit wins. Add a source by appending to this list. */
const FALLBACKS: ((slug: string) => Promise<LoomContent | null>)[] = [fromSample, fromLocalFile];

export async function getLoomPage(slug: string): Promise<LoomContent | null> {
  if (!SLUG.test(slug)) return null;
  const live = await fromSupabase(slug);
  if (live) return live;
  for (const fallback of FALLBACKS) {
    const found = await fallback(slug);
    if (found) return found;
  }
  return null;
}

/* ---------------- Agent graph input ---------------- */

const ROLES: [RegExp, string][] = [
  [/approv|review/i, "You"],
  [/collect|find/i, "Scout"],
  [/research|match|score/i, "Analyst"],
  [/enrich/i, "Enricher"],
  [/draft|write/i, "Writer"],
  [/send|deliver|repl/i, "Courier"],
];

const OUTPUTS: [RegExp, string][] = [
  [/approv|review/i, "approved only"],
  [/collect|find/i, "raw accounts"],
  [/research|match|score/i, "ranked, with a reason"],
  [/enrich/i, "verified contacts"],
  [/draft|write/i, "drafts to review"],
];

function roleFor(f: LoomFlowStep): string {
  // The step slug is the reliable signal; titles are free text ("Find the person" is enrichment).
  return ROLES.find(([re]) => re.test(f.step))?.[1] ?? ROLES.find(([re]) => re.test(f.title))?.[1] ?? f.title;
}

/** One card per chain entry, used when the page carries no valid `system.steps`. */
function stepsFromChain(c: LoomContent): LoomSystemStep[] {
  const sources = c.system.where.slice(0, 4).map((w) => w.source);
  const last = c.system.chain.length - 1;
  return c.system.chain.map((f, i) => ({
    n: String(i + 1).padStart(2, "0"),
    stage: f.title,
    kind: /approv|review/i.test(`${f.step} ${f.title}`) ? "human" : "agent",
    name: roleFor(f),
    blurb: f.body,
    inputs: i === 0 ? sources : [],
    output: i === last ? "" : (OUTPUTS.find(([re]) => re.test(f.step))?.[1] ?? "handed on"),
  }));
}

export function systemStepsFor(c: LoomContent): LoomSystemStep[] {
  const raw = c.system.steps;
  if (Array.isArray(raw)) {
    let seenHuman = false;
    const steps = raw.filter(validStep).filter((s) => {
      if (s.kind !== "human") return true;
      if (seenHuman) return false;
      seenHuman = true;
      return true;
    });
    if (steps.length >= 3 && steps.length <= 6) return steps;
  }
  return stepsFromChain(c);
}

export function exampleFor(c: LoomContent): LoomExample {
  if (validExample(c.system.example)) return c.system.example;
  const a = c.accounts[0];
  return {
    prospect: a.name,
    signal: a.reason,
    draft: `Hi, I saw ${a.name}: ${a.reason} I build a system that finds and researches accounts like this, so your team starts with a short list and a note on each. Open to a quick chat?`,
  };
}
