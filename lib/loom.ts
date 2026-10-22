import "server-only";
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
export type LoomSystem = {
  where: { source: string; detail: string }[];
  signal: string;
  chain: LoomFlowStep[];
  approval: string;
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

export async function getLoomPage(slug: string): Promise<LoomContent | null> {
  if (!SLUG.test(slug)) return null;
  const live = await fromSupabase(slug);
  if (live) return live;
  if (slug === "sample" && isLoomContent(sample)) return sample;
  return null;
}
