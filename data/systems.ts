/**
 * Every project on the site is a "system". Add one object here and the card, the detail page
 * and the workflow diagram are generated from it.
 */

export type WFNode = {
  id: string;
  label: string;
  sub: string;
  kind: "source" | "tool" | "agent" | "gate" | "output";
  logo: string;
  col: number;
  row: number;
};

export type Workflow = {
  nodes: WFNode[];
  edges: { from: string; to: string; loop?: boolean; label?: string }[];
};

export type System = {
  slug: string;
  name: string;
  client: string;
  category: "Outbound" | "Content + Paid" | "Lifecycle";
  status: "Live" | "Shipped" | "Building";
  period: string;
  role: string;
  oneLiner: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  funnel?: { label: string; value: number; display?: string }[];
  workflow: Workflow;
  problem: string;
  architecture: { title: string; body: string }[];
  decisions: string[];
  results: string;
  next: string[];
  log: string[];
};

export const systems: System[] = [
  {
    slug: "swoop-outbound",
    name: "Outbound engine",
    client: "Swoop Tutors",
    category: "Outbound",
    status: "Shipped",
    period: "Aug – Dec 2025",
    role: "GTM Engineering Intern · sole builder",
    oneLiner:
      "The first outbound engine for a 4-person startup: Clay enrichment, Python cleaning, ICP scoring, HubSpot and Zapier sequencing, and a dashboard that told us who actually converts.",
    stack: ["clay", "python", "pandas", "postgres", "hubspot", "zapier", "gmail", "react"],
    metrics: [
      { value: "10,000+", label: "records cleaned" },
      { value: "15%", label: "cold reply rate" },
      { value: "40%", label: "warm reply rate" },
      { value: "50", label: "calls booked" },
    ],
    funnel: [
      { label: "Company records sourced in Clay", value: 10000, display: "10,000+" },
      { label: "Accounts qualified against ICP", value: 3000, display: "3,000" },
      { label: "Prospects sequenced", value: 5000, display: "5,000+" },
      { label: "Cold replies (15%)", value: 750, display: "~750" },
      { label: "Calls booked", value: 50 },
      { label: "Qualified demos", value: 3 },
    ],
    workflow: {
      nodes: [
        { id: "src", label: "Clay tables", sub: "source · 10k cos", kind: "source", logo: "clay", col: 0, row: 0.5 },
        { id: "clean", label: "Clean + dedupe", sub: "python · pandas", kind: "tool", logo: "pandas", col: 1, row: 0.5 },
        { id: "icp", label: "ICP scoring", sub: "attrs → tier", kind: "agent", logo: "agent", col: 2, row: 0.5 },
        { id: "enrich", label: "Enrich contacts", sub: "clay · waterfall", kind: "tool", logo: "clay", col: 3, row: 0 },
        { id: "crm", label: "HubSpot sync", sub: "crm · lifecycle", kind: "tool", logo: "hubspot", col: 3, row: 1 },
        { id: "seq", label: "A/B sequences", sub: "zapier · 100/var", kind: "tool", logo: "zapier", col: 4, row: 0.5 },
        { id: "dash", label: "Reply dashboard", sub: "react · segment", kind: "output", logo: "chart", col: 5, row: 0.5 },
      ],
      edges: [
        { from: "src", to: "clean" },
        { from: "clean", to: "icp" },
        { from: "icp", to: "enrich" },
        { from: "icp", to: "crm" },
        { from: "enrich", to: "seq" },
        { from: "crm", to: "seq" },
        { from: "seq", to: "dash" },
        { from: "dash", to: "icp", loop: true, label: "best segment → re-weight ICP" },
      ],
    },
    problem:
      "Swoop had no outbound motion. Leads lived in spreadsheets, nobody knew which segments replied, and every send was manual. They needed a pipeline that went from raw company data to booked meetings, and data that showed where to focus.",
    architecture: [
      { title: "Source", body: "Built Clay tables of 10,000+ companies across target industries and geographies." },
      { title: "Clean", body: "Python (pandas) and SQL deduplicated and normalized the records, then engineered ICP attributes like size band, vertical, and consumer vs. B2B." },
      { title: "Qualify", body: "Scored every account against the ICP, which qualified 3,000 accounts into the first outbound pipeline." },
      { title: "Enrich + sync", body: "Clay contact enrichment for decision-makers, pushed into HubSpot with lifecycle stages so the team had one source of truth." },
      { title: "Sequence", body: "Zapier triggered sequences with sequential A/B tests on subject lines and send timing, 100 sends per variant per week." },
      { title: "Measure", body: "A Python + React reply-rate dashboard by segment replaced manual tracking, then I designed the SQL schema and migration to a custom CRM that is still in use." },
    ],
    decisions: [
      "Sequential A/B tests instead of a big multivariate test. At 100 sends per variant per week, one variable at a time is the only way to get a readable signal.",
      "Cleaned the data before enriching it. Deduping first cut enrichment credits and kept duplicate prospects from getting double-sent.",
      "Built the dashboard around segments, not totals. That's how smaller consumer-industry accounts showed up as the best-converting segment.",
    ],
    results:
      "15% cold and 40% warm reply rates across 5,000+ prospects, 50 booked calls and 3 qualified demos. The dashboard's segment finding changed who the team targeted, and the CRM I designed is still in use today.",
    next: [
      "Add intent signals (hiring, funding, tech installs) as Clay triggers instead of static lists.",
      "Replace rules-based ICP tiers with an LLM research agent that writes a one-line 'why now' per account.",
    ],
    log: [
      "$ clay export --table companies_q3 → 10,412 rows",
      "$ python clean.py --dedupe domain,name → 10,412 → 8,960 unique",
      "$ python score_icp.py → tier A 1,140 · tier B 1,860 · culled 5,960",
      "$ clay enrich --waterfall email,title → 5,214 contacts",
      "$ hubspot sync --lifecycle lead → 5,214 upserted",
      "$ zapier run seq_v3 --variant subj_B --batch 100",
      "✓ replies 15.2% cold · 40.1% warm · meetings +3 this week",
    ],
  },
  {
    slug: "rize-hospitality",
    name: "Hotel outbound agent",
    client: "RiZE Maps",
    category: "Outbound",
    status: "Live",
    period: "2026 — present",
    role: "Founder · designed + built",
    oneLiner:
      "Race-timed B2B outbound to hotels and resorts in F1 host cities: researched targets, verified contact routes, AI-drafted first touches, compliance gates and a human approval queue. It drafts and never sends on its own.",
    stack: ["python", "sqlite", "claude", "sheets", "gmail"],
    metrics: [
      { value: "118", label: "target properties" },
      { value: "3", label: "US race markets" },
      { value: "14", label: "compliance rules" },
      { value: "0", label: "unapproved sends" },
    ],
    funnel: [
      { label: "Target properties researched", value: 118 },
      { label: "Email strategies mapped", value: 92 },
      { label: "Verified contact routes", value: 26 },
      { label: "First pilot batch", value: 14 },
    ],
    workflow: {
      nodes: [
        { id: "targets", label: "Target hotels", sub: "csv · 118 rows", kind: "source", logo: "csv", col: 0, row: 0 },
        { id: "race", label: "Race calendar", sub: "LV · ATX · MIA", kind: "source", logo: "calendar", col: 0, row: 1 },
        { id: "verify", label: "Verify routes", sub: "dept · confidence", kind: "tool", logo: "web", col: 1, row: 0.5 },
        { id: "draft", label: "Draft agent", sub: "claude · concept", kind: "agent", logo: "claude", col: 2, row: 0.5 },
        { id: "guard", label: "Guardrails", sub: "dnc · prior · opt-out", kind: "gate", logo: "shield", col: 3, row: 0.5 },
        { id: "human", label: "Approval queue", sub: "human · approve", kind: "gate", logo: "human", col: 4, row: 0.5 },
        { id: "ready", label: "Send-ready", sub: "+ follow-ups", kind: "output", logo: "mail", col: 5, row: 0.5 },
      ],
      edges: [
        { from: "targets", to: "verify" },
        { from: "race", to: "verify" },
        { from: "verify", to: "draft" },
        { from: "draft", to: "guard" },
        { from: "guard", to: "human" },
        { from: "human", to: "ready" },
      ],
    },
    problem:
      "Hotels near F1 races are a natural buyer for premium track art (suite gifting, VIP player development, guest experiences), but the buyer is hard to find, the window around each race is short, and a careless cold email to a resort group you already have a relationship with burns it.",
    architecture: [
      { title: "Research", body: "118 properties across Las Vegas, Austin and Miami, each with parent group, buyer team to find, recommended product and why it fits." },
      { title: "Timing", body: "A race calendar drives when each market enters the queue, so outreach lands in the window when hotels plan race-week gifting." },
      { title: "Verify", body: "Contact routes are verified by department and confidence before a target becomes draftable." },
      { title: "Draft", body: "An LLM drafts first touches in a single CONCEPT format, with property-specific detail and no fake relevance." },
      { title: "Gate", body: "Hard rules block do-not-contact, groups with an existing relationship, international markets pending legal review, and anything missing sender identity or an opt-out." },
      { title: "Approve", body: "Every draft waits in a human approval queue. The system is draft-only by design and covered by tests." },
    ],
    decisions: [
      "Draft-only, human-approved. Small, high-value B2B lists punish mistakes far more than they reward speed.",
      "Warm relationships route around the cold engine. Prior-org matching stops the system from cold-pitching a resort that already inquired.",
      "Experiments sized honestly: 8–12 prospects per strategy, judged on real buyer dialogue, not statistical claims a sample this small can't support.",
    ],
    results:
      "118 researched targets, 26 verified routes and a 14-property first pilot ready for approval ahead of the Las Vegas Grand Prix, with zero sends that skipped a human.",
    next: [
      "Log replies back into the target sheet to auto-score which strategy (CONCEPT vs. PROPERTY) earns buyer conversations.",
      "Expand to international race markets once legal review clears.",
    ],
    log: [
      "$ python engine.py ob-import → 118 targets · 26 verified routes",
      "$ python engine.py ob-draft --market 'Las Vegas' --limit 10",
      "  ✗ RM-001 blocked: prior relationship (warm route)",
      "  ✓ RM-014 drafted · CONCEPT · Signature Frame",
      "$ python engine.py ob-queue → 9 awaiting approval",
      "$ python engine.py ob-approve 14 --user cole",
      "✓ 1 send-ready · 0 sent without approval",
    ],
  },
  {
    slug: "rize-growth",
    name: "Content + paid growth engine",
    client: "RiZE Maps",
    category: "Content + Paid",
    status: "Live",
    period: "2023 — present",
    role: "Founder · built the engine",
    oneLiner:
      "Ingests every Instagram reel, scores it against the account's own baseline, classifies the hook, writes a weekly brief, and turns winners into Higgsfield video briefs and Meta ads with hard spend guardrails.",
    stack: ["instagram", "python", "sqlite", "claude", "higgsfield", "meta", "tiktok", "shopify"],
    metrics: [
      { value: "$135K", label: "lifetime revenue" },
      { value: "3M+", label: "organic impressions" },
      { value: "$55→$90", label: "average order value" },
      { value: "135", label: "reels scored" },
    ],
    funnel: [
      { label: "Organic impressions", value: 3000000, display: "3M+" },
      { label: "Followers", value: 13000, display: "13K+" },
      { label: "Orders shipped", value: 3500, display: "3,500+" },
      { label: "Five-star reviews", value: 1000, display: "1,000+" },
    ],
    workflow: {
      nodes: [
        { id: "ig", label: "Reel ingest", sub: "ig · 135 reels", kind: "source", logo: "instagram", col: 0, row: 0.5 },
        { id: "score", label: "Baseline score", sub: "vs median · 2×", kind: "tool", logo: "python", col: 1, row: 0.5 },
        { id: "hook", label: "Hook classifier", sub: "12 hook types", kind: "agent", logo: "agent", col: 2, row: 0.5 },
        { id: "brief", label: "Weekly brief", sub: "claude · spec", kind: "agent", logo: "claude", col: 3, row: 0 },
        { id: "gen", label: "Video gen", sub: "higgsfield · i2v", kind: "tool", logo: "higgsfield", col: 3, row: 1 },
        { id: "ads", label: "Meta ads", sub: "$5/day · capped", kind: "gate", logo: "meta", col: 4, row: 0.5 },
        { id: "shop", label: "Shopify orders", sub: "ROAS by SKU", kind: "output", logo: "shopify", col: 5, row: 0.5 },
      ],
      edges: [
        { from: "ig", to: "score" },
        { from: "score", to: "hook" },
        { from: "hook", to: "brief" },
        { from: "hook", to: "gen" },
        { from: "brief", to: "ads" },
        { from: "gen", to: "ads" },
        { from: "ads", to: "shop" },
        { from: "shop", to: "score", loop: true, label: "winners re-tier weekly" },
      ],
    },
    problem:
      "Content was the cheapest acquisition channel, but reach was wildly uneven. The same caption reposted ~9 times got anywhere from 3.5K to 932K views. Without a system, every post was a guess and ad spend chased the wrong creative.",
    architecture: [
      { title: "Ingest", body: "Pulls every reel with views, likes, comments, shares and saves into a SQLite store." },
      { title: "Score", body: "Each post is scored against the account's own median, then tiered winner (≥2×), live, or culled (≤0.5×) after 72 hours." },
      { title: "Classify", body: "A hook classifier labels each reel (identity call-out, forbidden-fruit, process reveal…), so winners become patterns, not luck." },
      { title: "Brief + generate", body: "A weekly brief turns winning traits into a format spec and Higgsfield image-to-video briefs that use real product photos as reference, never invented products." },
      { title: "Paid", body: "Meta ads start at $5/day, cap at $20/day account-wide, step up at most 20% a day, pause above 2× target CPA, and need human approval for new ads." },
      { title: "Unit economics", body: "Landed COGS across 9 SKUs became a break-even ROAS per product line, turning daily ad data into a scale-or-kill rule." },
    ],
    decisions: [
      "Score against the account's own baseline, not industry benchmarks, because the only comparison that matters is your last 30 posts.",
      "The on-screen text is the hook, not the caption. The data showed captions didn't drive reach, so the briefs optimize the first 2 seconds of the video.",
      "AI-generated video is disclosed, and products must be depicted accurately. Brand trust is the asset.",
    ],
    results:
      "$135K lifetime revenue across 3,500+ orders and 1,000+ reviews on Shopify, Etsy and eBay; 3M+ impressions and 13K+ followers from organic; cart upsells found through checkout drop-off analysis lifted AOV from $55 to $90.",
    next: [
      "Auto-generate 3 Higgsfield variants per winning format and A/B them as Meta creatives.",
      "Close the loop from Shopify orders back to the creative that drove them.",
    ],
    log: [
      "$ python engine.py ingest data/instagram_reels.json → 135 records",
      "$ python engine.py score",
      "  winner   18.40  DV1DDqXDdqp  (932K)",
      "  winner    8.31  DUclOGYjfcw  (562K)",
      "  culled    0.21  ...",
      "$ python engine.py brief --week 42 → hooks: identity call-out, forbidden-fruit",
      "✓ 3 Higgsfield briefs queued · ads awaiting approval",
    ],
  },
  {
    slug: "founder-outreach",
    name: "Founder outreach engine",
    client: "Personal / agency",
    category: "Outbound",
    status: "Building",
    period: "2026 — present",
    role: "Builder",
    oneLiner:
      "A Claude Code + Clay + Python system that scores startups against an ICP, enriches founder contacts, and runs A/B-tested sequences tracked all the way to booked meetings.",
    stack: ["claude", "clay", "python", "apollo", "instantly", "hubspot"],
    metrics: [
      { value: "ICP", label: "agent-scored accounts" },
      { value: "A/B", label: "tested sequences" },
      { value: "→ mtg", label: "tracked to meetings" },
      { value: "Live", label: "in build" },
    ],
    workflow: {
      nodes: [
        { id: "list", label: "Startup list", sub: "funding · hiring", kind: "source", logo: "apollo", col: 0, row: 0.5 },
        { id: "research", label: "Research agent", sub: "claude · ICP fit", kind: "agent", logo: "claude", col: 1, row: 0.5 },
        { id: "enrich", label: "Founder enrich", sub: "clay · waterfall", kind: "tool", logo: "clay", col: 2, row: 0.5 },
        { id: "write", label: "Personalize", sub: "why-now line", kind: "agent", logo: "agent", col: 3, row: 0.5 },
        { id: "send", label: "Sequences", sub: "instantly · A/B", kind: "tool", logo: "instantly", col: 4, row: 0.5 },
        { id: "mtg", label: "Meetings", sub: "crm · booked", kind: "output", logo: "hubspot", col: 5, row: 0.5 },
      ],
      edges: [
        { from: "list", to: "research" },
        { from: "research", to: "enrich" },
        { from: "enrich", to: "write" },
        { from: "write", to: "send" },
        { from: "send", to: "mtg" },
        { from: "mtg", to: "research", loop: true, label: "reply data → ICP weights" },
      ],
    },
    problem:
      "Generic founder outreach gets ignored. The goal is outbound where every email has a researched reason to exist, and where the system learns which reasons work.",
    architecture: [
      { title: "Source", body: "Startups filtered by stage, funding and hiring signals." },
      { title: "Research", body: "A Claude Code agent reads each company's site and signals and scores fit against an explicit ICP rubric." },
      { title: "Enrich", body: "Clay waterfall for founder emails and roles." },
      { title: "Personalize", body: "An agent writes one specific why-now line per founder; the rest of the email stays tested and fixed." },
      { title: "Sequence + track", body: "A/B-tested sequences, with every reply and meeting tied back to the variant and ICP score that produced it." },
    ],
    decisions: [
      "Personalize one line, not the whole email, so A/B tests still measure something.",
      "The ICP rubric is written down and versioned, so the agent's scoring can be audited.",
    ],
    results: "In active development. Results will be published here as the first batches complete.",
    next: ["First 200-founder batch", "Publish reply-rate breakdown by ICP score band"],
    log: [
      "$ claude 'score these 50 startups against icp.md'",
      "  ✓ 18 strong fit · 21 partial · 11 skip",
      "$ clay enrich founders --waterfall → 36/39 found",
      "$ python personalize.py --line why_now → 36 drafts",
      "… building",
    ],
  },
  {
    slug: "momnt-retention",
    name: "Retention + discovery loop",
    client: "Momnt",
    category: "Lifecycle",
    status: "Live",
    period: "Oct 2025 — present",
    role: "Co-founder · Head of Product",
    oneLiner:
      "300+ discovery interviews defined the ICP; per-session usage in Firestore plus automated win-back surveys turned a hardware + app product into 85% two-month retention.",
    stack: ["firebase", "python", "react", "meta"],
    metrics: [
      { value: "300+", label: "discovery interviews" },
      { value: "300+", label: "units sold" },
      { value: "85%", label: "2-month retention" },
      { value: "70%", label: "6-month retention" },
    ],
    funnel: [
      { label: "Discovery interviews", value: 300, display: "300+" },
      { label: "Units sold", value: 300, display: "300+" },
      { label: "Campus pilot users", value: 200 },
      { label: "Feature-test cohort", value: 50 },
    ],
    workflow: {
      nodes: [
        { id: "use", label: "Session logs", sub: "firestore · per use", kind: "source", logo: "firebase", col: 0, row: 0.5 },
        { id: "detect", label: "Inactivity", sub: "python · 7+ days", kind: "tool", logo: "python", col: 1, row: 0.5 },
        { id: "survey", label: "Auto-survey", sub: "win-back · why", kind: "tool", logo: "mail", col: 2, row: 0.5 },
        { id: "test", label: "Feature tests", sub: "50-user cohort", kind: "gate", logo: "human", col: 3, row: 0.5 },
        { id: "ret", label: "Retention", sub: "85% at 2 mo", kind: "output", logo: "chart", col: 4, row: 0.5 },
      ],
      edges: [
        { from: "use", to: "detect" },
        { from: "detect", to: "survey" },
        { from: "survey", to: "test" },
        { from: "test", to: "ret" },
        { from: "ret", to: "detect", loop: true, label: "ship → re-measure" },
      ],
    },
    problem:
      "Behavior-change products die on retention. We needed to know why people stopped, and we needed to know fast enough to fix it.",
    architecture: [
      { title: "Discover", body: "300+ face-to-face interviews isolated weak physical enforcement and poor retention as the gaps competitors missed." },
      { title: "Instrument", body: "Per-session usage logged to Firestore." },
      { title: "Detect + ask", body: "Python scripts flagged users inactive 7+ days and automatically surveyed them." },
      { title: "Test", body: "Fixes shipped to a 50-user subset first, then rolled out." },
    ],
    decisions: [
      "Ask churned users why, automatically, at the moment they churn, not in a quarterly survey.",
    ],
    results:
      "200-user campus pilot, 300+ units sold ($9K+ revenue), 85% two-month and 70% six-month retention; pitched 5 VCs and won $7K across two startup competitions.",
    next: [],
    log: [
      "$ python inactive.py --days 7 → 23 users",
      "$ python survey.py --template winback → 23 sent",
      "✓ top reason: 'forgot to wear it' → ship reminder test to cohort B",
    ],
  },
];

export const getSystem = (slug: string) => systems.find((s) => s.slug === slug);
