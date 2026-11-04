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
