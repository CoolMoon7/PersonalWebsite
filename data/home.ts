/**
 * Copy for the homepage: Cole's portfolio of what he has built.
 * Every number traces to the GTM résumé (public/Cole_Bonawitz_Resume.pdf) or to a system in data/systems.ts.
 */

/** Headline numbers. Each links to the system it came from. */
export const proof = [
  { value: "5,000+", label: "prospects sequenced", source: "swoop-outbound" },
  { value: "15% / 40%", label: "cold / warm reply rate", source: "swoop-outbound" },
  { value: "50", label: "sales calls booked", source: "swoop-outbound" },
  { value: "$135K", label: "revenue on a brand I built", source: "rize-growth" },
  { value: "3M+", label: "organic impressions", source: "rize-growth" },
  { value: "300+", label: "customer interviews", source: "momnt-retention" },
];

export const now = {
  name: "Hyperflow",
  title: "The AI service desk for independent insurance agencies.",
  body:
    "Independent agencies run on paperwork: certificates, policy changes, renewals and late payments, all done by hand. Hyperflow reads each request, checks it against the policy and drafts the work, and a licensed person approves it before anything goes out.",
  product: [
    "Reads every request in the agency inbox and matches it to the right client and policy",
    "Drafts certificates and policy changes, and blocks anything the policy does not support",
    "Runs renewal outreach and payment reminders, and flags the accounts that need a phone call",
  ],
  gtm: [
    "Built the target list of independent agencies across North Carolina and verified every email before sending",
    "Cold outreach and discovery calls with agency owners",
    "Used what owners said on those calls to change what the product leads with",
  ],
};

export const facts = [
  ["Education", "Duke CS · 3.95 GPA"],
  ["HackDuke", "1st of 100+ teams"],
  ["Founded", "RiZE Maps · $135K"],
  ["Co-founded", "Momnt · 300+ units"],
];

export const skills = [
  { k: "GTM systems", v: "Clay, Apollo, Firecrawl, HubSpot, Zapier, Supabase CRM, lead qualification, A/B testing" },
  { k: "Agents & AI", v: "Claude Code, Hermes agents, Cursor, LLM APIs" },
  { k: "Engineering & data", v: "Python (pandas), SQL, Postgres, Firestore, React, JavaScript" },
];

/** The range of work handed to systems. Each links to where it is written up. */
export const automations = [
  { k: "Outbound and sequencing", where: "Swoop Tutors", what: "Clay to HubSpot to A/B-tested sequences. 5,000+ prospects, a 15% cold reply rate and 50 booked calls.", stack: ["clay", "hubspot", "zapier", "gmail"], href: "/systems/swoop-outbound" },
  { k: "Enrichment and scoring", where: "Swoop Tutors", what: "10,000+ companies cleaned in pandas and SQL and scored against the ICP, leaving 3,000 worth contacting.", stack: ["clay", "python", "pandas", "postgres"], href: "/systems/swoop-outbound" },
  { k: "Inbox and document agents", where: "Hyperflow", what: "Reads agency email, matches the policy through a 10-tool MCP server and drafts the certificate for approval.", stack: ["claude", "mcp", "fastapi", "pytest"], href: "#agents" },
  { k: "Research and personalization", where: "Founder outreach", what: "A Claude Code agent reads each startup's site and signals, scores fit and writes one why-now line.", stack: ["claude", "apollo", "instantly", "clay"], href: "/systems/founder-outreach" },
  { k: "Content engine", where: "RiZE Maps", what: "Every reel scored against the account's median, hooks classified, and winners turned into the next week's briefs.", stack: ["instagram", "python", "sqlite", "higgsfield"], href: "/systems/rize-growth" },
  { k: "Paid ads with guardrails", where: "RiZE Maps", what: "Meta spend capped and stepped up by rule, paused above 2× target CPA, tied to break-even ROAS per SKU.", stack: ["meta", "shopify", "python"], href: "/systems/rize-growth" },
  { k: "Deal sourcing with memory", where: "Dignity Properties", what: "Agents that source off-market properties and remember every owner and past decision in Supabase.", stack: ["claude", "mcp", "supabase"], href: "#projects" },
  { k: "Agent infrastructure", where: "Cole OS", what: "One git memory vault for 20 scheduled agents, with scopes and spend caps enforced by a pre-commit hook.", stack: ["python", "github", "claude"], href: "#projects" },
  { k: "Product and sensor data", where: "Momnt · DukeEngage", what: "Usage instrumentation for a retention loop, and a sensor pipeline at 98% accuracy in four hospitals.", stack: ["firebase", "arduino", "pandas"], href: "#projects" },
];

/** How the agents are built. Each line points at where it is actually done. */
export const principles = [
  { k: "Tools, not long prompts", v: "The agent calls typed tools for policy lookups instead of guessing from context.", proof: "10-tool MCP server" },
  { k: "Rules live in code", v: "Coverage checks and prompt-injection screens run as code the model can't talk its way past.", proof: "risk + injection gate" },
  { k: "A person approves", v: "Nothing leaves without a licensed human clicking approve. Drafting is the agent's whole job.", proof: "FastAPI approval queue" },
  { k: "Corrections become evals", v: "Every fix a reviewer makes is saved and replayed against the next version.", proof: "43 tests + 7 golden evals" },
  { k: "Memory that persists", v: "Agents start from what the business already knows, scoped to what each one may touch.", proof: "Supabase · git vault" },
];
