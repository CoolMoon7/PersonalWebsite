/**
 * Copy for the home, /how-it-works, /audit, /trust and /about pages. Edit here; the pages render from it.
 *
 * Rules (Cole's): no prices, no software vendor names, no client counts or testimonials, no certifications,
 * no claim that I'm licensed, no saved-time figures stated as fact. Illustrative numbers are labeled "example".
 */

export const cta = {
  audit: { label: "Book an AI audit", href: "/contact?intent=audit" },
  quote: { label: "Request a quote", href: "/contact?intent=quote" },
};

export const hero = {
  eyebrow: "AI operations for independent insurance agencies · Durham and the Triangle",
  line1: "Your agency's",
  line2: "AI department.",
  sub:
    "I find the right AI tools, set them up around your agency management system, train your team, and run it all. Every Friday you get a report with real numbers.",
  byline: "Cole Bonawitz · Duke CS '28 · Durham, NC",
  summary: [
    { k: "The job", v: "Choose, connect, run, keep current", d: "One person owns every AI tool your agency uses." },
    { k: "Built around", v: "The system you already run", d: "No new place for the truth to live." },
    { k: "How you hear from me", v: "A report every Friday", d: "Real numbers from your own systems." },
    { k: "The gate", v: "Your licensed staff approve", d: "Nothing goes out to a client without a person." },
  ],
};

export const problem = {
  title: "Everyone is selling you a tool. Nobody owns the result.",
  blocks: [
    { title: "Tools bought and abandoned", body: "Someone signs up, the trial ends, and the team goes back to doing it by hand." },
    { title: "AI you already pay for", body: "Your management system has AI features that nobody switched on." },
    { title: "Personal chatbot accounts", body: "Staff paste client details into accounts the agency doesn't control." },
    { title: "Nobody is watching", body: "Nobody tracks what's new, and nobody measures whether any of it works." },
  ],
  close: "That's the job I take on.",
};

export const verbs = [
  {
    k: "01",
    title: "Choose",
    body:
      "I audit the agency and recommend the right tool for each job, including the AI already inside your own software. I tell you when a tool isn't worth buying.",
  },
  {
    k: "02",
    title: "Connect",
    body:
      "I set each tool up around your management system, mailbox and rules, using read-only access you can revoke at any time.",
  },
  {
    k: "03",
    title: "Run",
    body: "I train your team, monitor every system, fix what breaks, and handle the vendors. There is one person to call.",
  },
  {
    k: "04",
    title: "Keep current",
    body: "I track what changes in insurance AI, tell you what it means, and implement what's worth having.",
  },
];

export const cadence = [
  { when: "Every Friday", what: "A plain-language report with real numbers from your own systems: what came in, what was handled, what needs a decision." },
  { when: "Every month", what: "A short briefing on what's new in insurance AI and what I'm doing about it." },
  { when: "Every quarter", what: "A review that ships one concrete improvement." },
  { when: "Any time", what: "On-call support when your staff get stuck." },
];

export const coiIntro =
  "The certificate desk is the first workflow I built end to end. It shows how everything else works: agents prepare, a person approves.";

export const timeline = [
  { when: "Week 1", what: "Audit and plan" },
  { when: "Weeks 1 to 2", what: "First quick win live" },
  { when: "Days 30 to 60", what: "Core systems connected and the Friday report running" },
  { when: "After that", what: "Run, report, improve" },
];

export const partnership = {
  title: "The 12-month partnership",
  body:
    "Everything starts with a fixed-fee audit. Agencies that continue move into a 12-month partnership: a fixed monthly fee that covers the cadence above, plus services you add one at a time.",
  keeps:
    "The written policy, the procedures and the library of prompts and workflows belong to you, even if we stop working together.",
};

export const why = [
  "Hands-on operation, not just training. I run the systems after I set them up.",
  "One accountable person, local to the Triangle, who will sit with your service team until it works.",
  "I build custom tools when nothing off the shelf fits, so you aren't limited to what vendors sell.",
  "Vendor-neutral. I recommend what fits, and I disclose in writing any referral fee I'm ever offered.",
  "Everything is written down: the policy, the procedures, the library of prompts and workflows. It belongs to you.",
];

export const closing = {
  title: "Twenty minutes, and I'll show you where your agency's AI hours are.",
};

export const faq = [
  {
    q: "What is an AI department?",
    a: "It's me, acting as the one person who owns AI for your agency. I choose the tools, connect them to your systems, run them, and keep them current. You get a report every Friday, so you can see what's working.",
  },
  {
    q: "Do I need to change my management system?",
    a: "No. I build around the system you already run, and it stays your system of record. I confirm access to it during the audit.",
  },
  {
    q: "What happens to my data, and who can see it?",
    a: "Your book lives in the accounts and storage I set up for you, and you can revoke access at any time. To write a draft, the text of that request goes to the model provider I use, under business API terms that exclude training on it. Nothing else leaves, and every request is logged.",
  },
  {
    q: "Will it send anything to my clients without us approving it?",
    a: "No. Everything that goes out stops in an approval queue for a person on your team to read first. You approve, edit or skip.",
  },
  {
    q: "What if we already tried a tool and it didn't work?",
    a: "That's common, and it's useful. In the audit I find out why it didn't stick: the wrong tool, the wrong setup, or nobody owning it. Then I tell you whether to fix it or drop it.",
  },
  {
    q: "Do you take referral fees from software vendors?",
    // TODO(Cole): confirm the referral-fee policy. This says any fee offered is disclosed in writing; change it if you'd rather say you take none.
    a: "I recommend what fits, whoever makes it. If a vendor ever offers me a referral fee, I disclose it to you in writing.",
  },
  {
    q: "What does the audit include, and what does it cost?",
    a: "The audit maps how work moves through your agency, inventories every AI tool and account in use, and ranks what to do first. You also get a draft AI use policy and a 90-day plan. It's a fixed fee, and I'll quote it in writing. If you continue, it's credited toward onboarding.",
  },
  {
    q: "How is the monthly fee different from the software subscriptions?",
    a: "The monthly fee pays for my work: the running, monitoring, reporting and support. The vendors bill you directly for their software, at their price. I don't mark it up.",
  },
  {
    q: "What if we want to stop?",
    a: "The partnership is 12 months, so that's the commitment you're making. If you stop after that, the written policy, procedures and prompt library stay with you.",
  },
  {
    q: "Are you licensed, and do you give insurance advice?",
    a: "No to both. Your licensed staff approve everything, and I do not advise on coverage.",
  },
];

/** /how-it-works */
export const steps = [
  {
    k: "01",
    title: "The audit",
    body: "A fixed-fee look at how your agency works today. You leave with a ranked list, a draft policy and a 90-day plan, whether or not we continue.",
  },
  {
    k: "02",
    title: "Onboarding and the AI department",
    body: "I put the written policy and approved-tool list in place and start the weekly report. The partnership begins.",
  },
  {
    k: "03",
    title: "Services added over time",
    body: "You add one service at a time, as it earns its place. Each gets a written quote before anything starts.",
  },
];

/** Example weekly report across several services. Illustrative only, labeled "example". */
export const weeklyReport = {
  title: "Friday, 8am: your AI department, in numbers.",
  body:
    "One email, in plain language. What came in, what was handled, what changed in the tools you use, and what needs a decision from you.",
  logTitle: "weekly report · example",
  sections: [
    { name: "Certificates", lines: ["23 requests received, 21 issued, 2 waiting on you", "4 holders changed address, 4 certificates reissued"] },
    { name: "Calls", lines: ["61 calls answered, 9 after hours, 7 handed to a person"] },
    { name: "Renewals", lines: ["6 policies renewing in 30 days, 5 reviews drafted for your team"] },
    { name: "Tool changes", lines: ["1 vendor update reviewed and switched on", "1 new feature held back until the team is trained"] },
  ],
  decision: "Needs a decision: whether to turn on after-hours text replies for service calls.",
};

/** /audit */
export const audit = {
  eyebrow: "The AI readiness audit",
  title: "Find out where your agency's AI hours are.",
  lede:
    "A fixed-fee look at how work actually moves through your agency, and which AI tools are worth having. You keep everything it produces.",
  delivers: [
    "A map of how work actually moves through your agency",
    "An inventory of every AI tool and account in use, including personal ones",
    "The AI already inside your management system that you aren't using",
    "A ranked list of recommended systems, with expected hours saved calculated from your own volumes",
    "A draft AI use policy",
    "A 90-day plan",
  ],
  fee:
    "The audit is a fixed fee, credited toward onboarding if you continue. I quote it in writing before we start.",
  forWho: [
    "Independent P&C agencies with roughly 5 to 30 staff, starting in the Triangle",
    "Principals and operations managers who want one person to own AI",
    "Agencies that tried a tool that didn't stick, and want to know why",
  ],
  ask: [
    { t: "How work arrives", d: "Where requests come from and who touches them." },
    { t: "Your systems", d: "Which management system, mailbox and carrier portals you use." },
    { t: "Your volumes", d: "How many certificates, calls, renewals and applications in a typical week." },
    { t: "Tools in use", d: "What you've bought, what staff use on their own, and what you've dropped." },
    { t: "Your rules", d: "What must be approved, and what data must stay put." },
    { t: "Your goals", d: "Where the team's time should go instead." },
  ],
};

/** /trust */
export const trust = {
  title: "Trust and boundaries.",
  lede: "Worth reading before anything else. These are the reasons a compliance officer says yes.",
  items: [
    { title: "No insurance advice", body: "I don't interpret coverage, recommend limits, bind anything, or tell an insured what they need. I move paper and set up tools. The judgement stays with your licensed staff." },
    { title: "Nothing sends without a person", body: "Every certificate, email and client message stops in an approval queue with the source attached. You approve, edit or skip." },
    { title: "Your management system stays the system of record", body: "The tools read from and write activity to the system you already run. They don't become a second place where the truth lives." },
    { title: "Read-only access you can revoke", body: "I connect with read-only access wherever I can, and you can revoke it at any time." },
    { title: "Where your data goes", body: "Your book lives in the accounts and storage I set up for you, and you can revoke access at any time. To write a draft, the text of that request goes to the model provider I use, under business API terms that exclude training on it. Nothing else leaves, and every request is logged." },
    { title: "No health data without a signed BAA", body: "Nothing touching medical or claims detail is processed until a business associate agreement is signed. Without one, it stays out of that conversation." },
    { title: "Never more than the policy says", body: "A certificate is a record of what the policy says. The tools won't add wording, limits or parties the policy doesn't carry. Anything beyond the policy stops for a producer." },
    { title: "Every request is logged", body: "You can see what was asked, what was drafted and who approved it." },
  ],
  close: "I'm happy to sign your data agreement and answer your security questions before we start.",
  // TODO(Cole): add a line about errors-and-omissions and cyber coverage here only after the policies and your business entity are in place.
};

/** /about, and the short version on the home page */
export const about = {
  title: "Who is building this.",
  kicker: "Engineer by training, operator by habit.",
  paragraphs: [
    "I'm Cole Bonawitz, a Computer Science student at Duke (minors in Statistical Science and Philosophy) who would rather ship a system than talk about one. I'm originally from Chattanooga, TN, and I live in Durham. I founded RiZE Maps, a DTC brand that reached $135K in revenue, co-founded Momnt, a hardware and iOS product, and built the first outbound engine for a four-person startup.",
    "Insurance is where I'm putting that work now. Agency service desks are full of repetitive, rule-bound work that AI is good at, as long as a licensed person stays in charge. My job is to make sure the tools you use are chosen well, set up properly and watched.",
  ],
  short:
    "I'm a Duke CS student in Durham who builds agent systems. I started with the certificate desk, and now I run the whole AI department for independent agencies in the Triangle. I'm a student, I'm starting local, and I'll tell you when something isn't a fit.",
  stats: [
    { v: "$135K", d: "revenue at RiZE Maps, the DTC brand I founded" },
    { v: "300+", d: "customer-discovery interviews at Momnt, where I'm co-founder and head of product" },
    { v: "15%", d: "cold reply rate at Swoop Tutors, where I was the GTM engineering intern" },
    { v: "1st of 100+", d: "teams at HackDuke" },
  ],
};
