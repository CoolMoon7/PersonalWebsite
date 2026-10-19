/** Copy and settings for /pilot. Edit here; the page renders from it. */

export const pilot = {
  /** Where fit-call requests go. */
  email: "cole@colebonawitz.com",
  /** Optional booking link shown beside the email button. Leave empty to hide it. */
  booking: "",
  /** Monthly range shown in the terms. Change when pricing is settled. */
  monthly: "$500 to $1,000",
};

export const goodFit = [
  "You sell to other businesses, or each customer is worth thousands of dollars to you.",
  "Finding and researching prospects is done by hand today, or not done at all.",
  "You can spare about 30 minutes on a call and a few minutes a week to approve outreach.",
  "You want a system you own and can talk to, not another tool to log into.",
];

export const notFit = [
  "Each customer is worth very little, so a lead is hard to pay back.",
  "You want thousands of emails blasted out with no human review.",
  "You want results with no input from you or your team.",
  "You are shopping for a software subscription. I build custom systems and hand them over.",
];

export const phases = [
  {
    when: "Day 0",
    title: "Fit call",
    body: "30 minutes on how you find customers today. We agree what \"working\" means, in numbers, and I tell you honestly if I am not the right person.",
    out: "A written success definition",
  },
  {
    when: "Days 1 to 7",
    title: "Map and build",
    body: "I build the pipeline around your process: who to target, where to find them, how each prospect is researched and scored.",
    out: "A working prospect finder",
  },
  {
    when: "Days 8 to 14",
    title: "Run and tune",
    body: "The system produces researched prospects and drafted messages. You approve every one. I adjust from your feedback and the first replies.",
    out: "Researched prospects and drafts",
  },
  {
    when: "Day 14",
    title: "You decide",
    body: "We check the results against the numbers we agreed. If it missed, you owe nothing. If it hit, you keep the system and decide if you want me to run it.",
    out: "Keep it or walk away",
  },
];

export const safeguards = [
  { title: "Nothing sends without you", body: "Every message is drafted for your approval. There is a human gate before anything leaves." },
  { title: "Public sources only", body: "Prospects come from public data and verified lookups. No scraped inboxes, no purchased lists." },
  { title: "You own the system", body: "The workflows, prompts and data are yours. No lock-in, no required retainer." },
  { title: "A weekly report", body: "What I changed, prospects found, messages approved, replies and meetings booked. In numbers." },
];

export const faq = [
  {
    q: "What if it does not work?",
    a: "You owe nothing for the pilot. We agree on day zero what working means (for example, researched qualified prospects per week and replies), and we check it on day 14.",
  },
  {
    q: "Who sends the emails?",
    a: "You approve every draft. Depending on what you prefer, you send them or I send them from your account after your approval. Either way a person decides.",
  },
  {
    q: "Is this AI spam?",
    a: "No. The point is fewer, better-researched messages to people who fit. Each prospect gets a short research note explaining why they were chosen.",
  },
  {
    q: "What do you need from me?",
    a: "One 30-minute call, access to wherever your customers or contacts live today, and a few minutes a week to approve drafts.",
  },
  {
    q: "What does it cost?",
    a: "The pilot has a fixed setup fee agreed in writing before I start. If you keep me on to run it, the monthly fee is typically {monthly}, depending on scope. You can cancel any time.",
  },
  {
    q: "Why should I trust you with this?",
    a: "I built the first outbound engine for a 4-person startup, ran a 15% cold reply rate across 5,000+ prospects, and I run my own outreach on the same kind of system. It is all on this site, with the numbers behind it.",
  },
];

export const requestPrompts = [
  "Company and website",
  "Who you sell to",
  "How you find customers today",
  "What takes the most time",
];

/** "In 30 seconds": the whole offer as four tiles. */
export const summary = [
  { k: "What", v: "A custom lead pipeline", d: "Finds, researches and queues your ideal customers." },
  { k: "How long", v: "14 days", d: "From first call to a working system." },
  { k: "Risk", v: "None", d: "If it misses the numbers we agree, you owe nothing." },
  { k: "Next step", v: "One email", d: "Four short answers. I reply within 24 hours." },
];

/** What I would build, in the order a prospect moves through it. */
export const flow = [
  { k: "01", title: "Find", body: "Companies and people that match your ideal customer, from public data and verified lookups." },
  { k: "02", title: "Research", body: "A short note on each one: who they are, what changed recently, why they fit." },
  { k: "03", title: "Draft", body: "A personal message in your voice, based on that note. Not a template." },
  { k: "04", title: "You approve", body: "You review and approve every message. Nothing sends until you say so." },
  { k: "05", title: "Report", body: "Each week: prospects found, messages approved, replies and meetings booked." },
];

/** Illustrative only. Shown with a label saying so. */
export const example = {
  prospect: "Northwind Staffing",
  meta: "42 people · Chattanooga, TN",
  signal: "Hiring 3 account executives",
  why: "Growing sales team, no visible outbound process, matches the ideal customer profile.",
  draft:
    "Hi Dana, I saw Northwind is hiring three account executives. A new rep usually spends their first month finding who to call. I build a system that does that research for them, so they start with a short list and a note on each company. Open to a quick 15-minute chat?",
  status: "Awaiting your approval",
};

export const nextSteps = [
  { when: "Within 24 hours", what: "I reply to your request, personally." },
  { when: "30-minute call", what: "We talk through how you find customers today. I tell you honestly if I can help." },
  { when: "Written scope", what: "If it is a fit, you get the scope, the success numbers and the fixed setup fee in writing. You decide." },
];
