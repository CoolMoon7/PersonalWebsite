/**
 * Copy and data for /fde, the forward deployed engineering portfolio linked from the résumé.
 * Every number here traces to that résumé (public/fde/Colemon_Bonawitz_Resume.pdf).
 */
import type { Workflow } from "./systems";

export const fde = {
  title: "Cole Bonawitz — Forward Deployed Engineer",
  description:
    "Forward deployed engineer: I sit with the people doing the work, scope the workflow, and ship agents, data pipelines and integrations into production behind guardrails and evals. Duke CS.",
  email: "cole.bonawitz@duke.edu",
  resume: "/fde/Colemon_Bonawitz_Resume.pdf",
};

/** Headline numbers. Each one points at the deployment it came from. */
export const telemetry = [
  { value: "10-tool", label: "MCP server in a live agent", source: "coi-agent" },
  { value: "43 + 7", label: "unit tests + golden evals", source: "coi-agent" },
  { value: "20", label: "agents on one memory layer", source: "cole-os" },
  { value: "98%", label: "accuracy, device deployed in 4 hospitals", source: "uganda" },
  { value: "10,000+", label: "records through a production pipeline", source: "swoop" },
  { value: "$135K", label: "revenue on a company I built", source: "rize" },
];

/** The flagship deployment, drawn as a live diagram in the hero. */
export const flagship: Workflow = {
  nodes: [
    { id: "mail", label: "Inbound email", sub: "COI requests", kind: "source", logo: "mail", col: 0, row: 0.5 },
    { id: "cls", label: "Classify", sub: "openclaw agent", kind: "agent", logo: "agent", col: 1, row: 0.5 },
    { id: "mcp", label: "Match policy", sub: "python mcp · 10 tools", kind: "tool", logo: "mcp", col: 2, row: 0 },
    { id: "risk", label: "Risk + injection", sub: "rules in code", kind: "gate", logo: "shield", col: 2, row: 1 },
    { id: "draft", label: "Draft certificate", sub: "acord · cover email", kind: "agent", logo: "coi", col: 3, row: 0.5 },
    { id: "gate", label: "Approval", sub: "fastapi dashboard", kind: "gate", logo: "human", col: 4, row: 0.5 },
    { id: "log", label: "Audit log", sub: "hash-chained", kind: "output", logo: "db", col: 5, row: 0.5 },
  ],
  edges: [
    { from: "mail", to: "cls" },
    { from: "cls", to: "mcp" },
    { from: "cls", to: "risk" },
    { from: "mcp", to: "draft" },
    { from: "risk", to: "draft" },
    { from: "draft", to: "gate" },
    { from: "gate", to: "log" },
    { from: "log", to: "cls", loop: true, label: "corrections → golden eval set" },
  ],
};

export type Deployment = {
  id: string;
  name: string;
  org: string;
  role: string;
  period: string;
  status: "Deploying" | "In production" | "Shipped" | "Running";
  oneLiner: string;
  /** Who I sat with and what they needed. The part of FDE work a résumé line hides. */
  customer: string;
  built: string[];
  stack: string[];
  metrics: { value: string; label: string }[];
  link?: { href: string; label: string };
};

export const deployments: Deployment[] = [
  {
    id: "coi-agent",
    name: "Certificate-of-insurance agent",
    org: "AI Agents for Insurance Agencies",
    role: "Founder & forward deployed engineer",
    period: "Oct 2026 — present",
    status: "Deploying",
    oneLiner:
      "An agent that reads inbound certificate requests, matches them to the right policy and drafts the certificate, so an agency's service team approves instead of retyping.",
    customer:
      "Scoped the certificate-of-insurance workflow with the VP of a multi-office independent agency: how requests arrive, which ones are risky, and what a person must always see before anything leaves.",
    built: [
      "An OpenClaw agent and a 10-tool Python MCP server that classifies inbound email, matches the policy and drafts the certificate.",
      "Draft-only by design: every certificate stops in a FastAPI approval dashboard, with risk rules and a prompt-injection check written in code, not in the prompt.",
      "A hash-chained audit log of what came in, what was drafted and who approved it, plus 43 unit tests and a 7-case golden eval set.",
    ],
    stack: ["mcp", "python", "fastapi", "pytest", "claude", "postgres"],
    metrics: [
      { value: "10", label: "MCP tools" },
      { value: "43", label: "unit tests" },
      { value: "7", label: "golden evals" },
      { value: "0", label: "sends without a human" },
    ],
    link: { href: "/", label: "See the product page" },
  },
  {
    id: "dignity",
    name: "Off-market deal sourcing agent",
    org: "Dignity Properties",
    role: "Builder",
    period: "Project",
    status: "Shipped",
    oneLiner:
      "An agentic system for a real estate firm that automates off-market deal sourcing and remembers every property, owner and past decision.",
    customer:
      "A real estate firm wanted off-market deal sourcing automated, with the context about each property and owner kept between runs instead of rediscovered every time.",
    built: [
      "Agents built with Claude Code and MCP that source and qualify off-market properties.",
      "A persistent memory layer in Supabase of properties, owners and past decisions, so each run starts from what the firm already knows.",
    ],
    stack: ["claude", "mcp", "supabase", "python"],
    metrics: [
      { value: "MCP", label: "tool layer" },
      { value: "Supabase", label: "persistent memory" },
    ],
  },
  {
    id: "cole-os",
    name: "Cole OS: personal agent operating system",
    org: "Personal infrastructure",
    role: "Builder",
    period: "2026 — present",
    status: "Running",
    oneLiner:
      "The memory layer for a 20-agent fleet: one git vault every agent reads, with scopes, budgets and guardrails enforced by code.",
    customer:
      "My own problem, run like a customer's: dozens of scheduled agents, no shared memory, and no way to see or cap what each one could touch or spend.",
    built: [
      "Tiered memory in a git vault, with per-agent scopes enforced by a pre-commit hook.",
      "Script-gated jobs with spend caps, so an agent cannot run or spend outside what it was given.",
    ],
    stack: ["python", "supabase", "github", "claude"],
    metrics: [
      { value: "20", label: "agents" },
      { value: "per-agent", label: "scopes in a hook" },
      { value: "capped", label: "spend per job" },
    ],
  },
  {
    id: "uganda",
    name: "Hospital sensor device and data pipeline",
    org: "DukeEngage Uganda",
    role: "Project manager",
    period: "Jun — Aug 2025",
    status: "Shipped",
    oneLiner:
      "Embedded in four hospitals in Kampala to find the problem worth solving, then built and deployed a $25 device that saves nurses 2+ hours a day.",
    customer:
      "Interviewed 20+ clinicians across 4 hospitals and scored 40 pain points before writing any code, so we built for the problem nurses actually had.",
    built: [
      "Benchmarked 3 sensor types and wrote the Arduino-to-Python ingestion pipeline.",
      "Built a 5,000-reading labeled dataset and deployed the device at 98% accuracy.",
    ],
    stack: ["arduino", "python", "pandas"],
    metrics: [
      { value: "4", label: "hospitals" },
      { value: "40", label: "pain points scored" },
      { value: "98%", label: "accuracy" },
      { value: "2+ hrs", label: "saved per nurse daily" },
    ],
  },
  {
    id: "swoop",
    name: "First data pipeline and custom CRM",
    org: "Swoop Tutors",
    role: "Go-to-market engineering intern · sole engineer",
    period: "Aug — Dec 2025",
    status: "In production",
    oneLiner:
      "The first data pipeline for a 4-person startup, from raw records to a custom CRM the team still runs on.",
    customer:
      "Reported to the CEO twice a week. The team was tracking replies by hand and did not know which customers converted.",
    built: [
      "Clay ingestion, SQL and pandas cleaning of 10,000+ records, ICP scoring that qualified 3,000 accounts, and HubSpot and Zapier sync.",
      "A Python + React reply-rate dashboard by segment that showed smaller consumer accounts converting best and changed who the team targeted.",
      "The relational schema and migration from HubSpot to a custom CRM that is still in use.",
    ],
    stack: ["python", "pandas", "postgres", "react", "hubspot", "zapier", "clay"],
    metrics: [
      { value: "10,000+", label: "records cleaned" },
      { value: "3,000", label: "accounts qualified" },
      { value: "15% / 40%", label: "cold / warm reply" },
      { value: "50", label: "calls booked" },
    ],
  },
  {
    id: "rize",
    name: "Content engine and outbound agent",
    org: "RiZE Maps",
    role: "Founder",
    period: "Jun 2023 — Aug 2026",
    status: "Shipped",
    oneLiner:
      "Built a DTC brand to $135K in revenue, then the systems that ran its growth: a content scoring engine and a draft-only B2B outbound agent.",
    customer:
      "Every system here had a real P&L behind it. I modeled landed COGS across 9 SKUs into a break-even ROAS rule per product line and lifted average order value from $55 to $90.",
    built: [
      "A Python + SQLite engine that scores 135 reels against the account's own baseline, classifies hooks and drafts weekly ad briefs under hard Meta spend caps.",
      "A draft-only outbound agent (Python, SQLite, Claude) for 118 hotels in F1 host cities that verifies contact routes and gates every draft through 14 compliance rules and human approval.",
    ],
    stack: ["python", "sqlite", "claude", "meta", "shopify"],
    metrics: [
      { value: "$135K", label: "lifetime revenue" },
      { value: "3,500+", label: "orders" },
      { value: "3M+", label: "organic impressions" },
      { value: "14", label: "compliance rules" },
    ],
  },
  {
    id: "momnt",
    name: "Usage instrumentation and retention loop",
    org: "Momnt",
    role: "Co-founder & head of product",
    period: "Oct 2025 — May 2026",
    status: "Shipped",
    oneLiner:
      "A digital-wellness NFC wearable and iOS app, taken from 300+ customer interviews to 300+ units sold.",
    customer:
      "Ran 300+ face-to-face discovery interviews to define the user, then converted a 200-user campus pilot into 300+ units and $9K+ in revenue. Pitched 5 VCs and won $7K across two competitions.",
    built: [
      "Per-session usage instrumentation in Firestore.",
      "Python that auto-surveys users inactive for 7+ days. Fixes tested on a 50-user cohort drove 85% two-month and 70% six-month retention.",
    ],
    stack: ["firebase", "python"],
    metrics: [
      { value: "300+", label: "interviews" },
      { value: "300+", label: "units sold" },
      { value: "85%", label: "2-month retention" },
      { value: "70%", label: "6-month retention" },
    ],
  },
  {
    id: "hackduke",
    name: "Equity crowdfunding marketplace",
    org: "HackDuke · Finance track",
    role: "1st place of 100+ teams",
    period: "24 hours",
    status: "Shipped",
    oneLiner: "Designed the Postgres schema and the LLM API data pipeline for an equity crowdfunding marketplace, shipped in under 24 hours.",
    customer: "A hackathon brief where the scope had to fit a single day, so the data model had to be right the first time.",
    built: ["The Postgres schema and the LLM API data pipeline behind the marketplace."],
    stack: ["postgres", "python", "react"],
    metrics: [
      { value: "1st", label: "of 100+ teams" },
      { value: "< 24h", label: "to ship" },
    ],
  },
];

/** How I run a deployment. */
export const method = [
  { k: "01", title: "Embed", body: "Sit with the people who do the work: the VP, the service desk, the nurses. Watch the workflow before touching code." },
  { k: "02", title: "Scope", body: "Turn what I saw into a written spec: inputs, decisions, failure cases, and what a person must always approve." },
  { k: "03", title: "Integrate", body: "Connect to the systems they already run through APIs and MCP tools, not a new app they have to learn." },
  { k: "04", title: "Guard", body: "Risk rules, injection checks and approval gates in code. Agents draft; people decide." },
  { k: "05", title: "Evaluate", body: "Unit tests, golden eval sets and audit logs, so every change is measured before it ships." },
  { k: "06", title: "Iterate", body: "Real corrections become new eval cases and the system improves weekly with the customer." },
];

export const skills = [
  { k: "Agents & LLMs", v: "Claude Code, MCP, OpenClaw, Hermes Agents, LLM APIs, evals, guardrails" },
  { k: "Engineering & data", v: "Python (pandas, FastAPI, pytest), SQL, Postgres, Supabase, React, TypeScript" },
  { k: "Infra & integrations", v: "Git, GitHub Actions, Docker, Vercel, REST APIs, Twilio, Clay, HubSpot, Zapier" },
];
