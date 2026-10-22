/**
 * Copy and data for /insurance. Edit here; the page renders from it.
 *
 * Hard rules this file must keep (Cole decided):
 * - No price anywhere. The only action is a 20-minute call.
 * - No named client, case study, testimonial, logo wall or "trusted by".
 * - No hours-saved or dollars-recovered claim, and no invented statistic.
 * - Every number here traces to me/resume.md (Swoop Tutors, Aug to Dec 2025).
 */

import type { Agent, Example } from "./pilot";

export const contact = {
  email: "cole@colebonawitz.com",
  /** Exactly the subject line Cole wanted in the signature link. */
  subject: "Insurance agents for [Agency]",
  mailto:
    "mailto:cole@colebonawitz.com?subject=Insurance%20agents%20for%20%5BAgency%5D",
};

export const hero = {
  chips: ["Certificates of insurance · commercial P&C", "Durham and the Triangle"],
  /** Printed under the hero buttons. Kept out of the chips so it never overflows a phone. */
  area: "Durham · Chapel Hill · Hillsborough · Morrisville · RTP",
  /** Two lines. The second is rendered faint. */
  line1: "An AI employee that",
  line2: "writes your COIs.",
  lede:
    "Every certificate request that lands in your inbox is read, checked against the policy, and drafted as a finished ACORD certificate for your service team to approve. Nothing is issued until a person says so.",
  intro:
    "I'm Cole, a Duke student in Durham who builds agent systems. I'm starting with independent agencies around the Triangle on the one task that hits every service desk daily: the certificate of insurance. Below is exactly how the agent works, step by step, and what it will never do.",
};

export const summary = [
  {
    k: "The job",
    v: "Certificates of insurance",
    d: "New certificates, reissues, holder changes and additional-insured requests.",
  },
  {
    k: "Built from",
    v: "The policy in your AMS",
    d: "Limits, dates and endorsements are read from the policy, never typed from memory.",
  },
  {
    k: "How you use it",
    v: "Email in, approval out",
    d: "Staff forward requests as they do today. Drafts come back for one-click approval.",
  },
  {
    k: "The gate",
    v: "You approve every certificate",
    d: "No COI leaves the agency without a person reading it first.",
  },
];

/** Section 01: the COI desk, in their vocabulary. This section is the credibility test. */
export const week = {
  items: [
    {
      when: "7:40am",
      title: "The certificate that cannot wait",
      body:
        "A GC's accounts payable will not release a payment until a certificate with the right additional insured is in their inbox. The client forwards the request with 'today please' on top.",
    },
    {
      when: "All day",
      title: "The same request, forty ways",
      body:
        "Property managers, lenders, general contractors and project owners each word it differently. Someone has to read it, work out what is really being asked and find the right policy.",
    },
    {
      when: "Every request",
      title: "Retyping the policy",
      body:
        "Insured, holder, policy numbers, limits, effective dates, description of operations. All of it already exists in the AMS, and all of it gets keyed in again.",
    },
    {
      when: "The risky ones",
      title: "Wording the policy may not support",
      body:
        "Additional insured, waiver of subrogation, primary and non-contributory. A request that asks for more than the policy gives is the one that needs a person, and it is easy to miss when it is the fortieth that day.",
    },
    {
      when: "Weeks later",
      title: "The reissue",
      body:
        "The policy renews, a holder changes address, a project adds a party. Every certificate that was issued now has to be redone, and nobody has a list of them.",
    },
    {
      when: "Silently",
      title: "Expired certificates",
      body:
        "A certificate sitting with a GC on a policy that has since lapsed or renewed. Invisible until somebody asks, or until a loss.",
    },
  ],
  pain: [
    "By six, the service team has turned around every certificate and moved nothing else forward.",
    "The renewals and the remarketing get done at 9pm, because the COIs ate the afternoon.",
    "It is not a hard task. It is a constant one, and it belongs to whoever has the least time.",
  ],
};

/** Section 02: the COI agent graph. Tool keys are Logo glyphs. */
export const system: {
  intro: { what: string; in: string; out: string };
  chips: string[];
  agents: Agent[];
  example: Example;
  report: { title: string; body: string; logTitle: string; log: string[] };
} = {
  intro: {
    what:
      "A certificate request comes in as an email. Five agents and one person turn it into an issued, filed and followed-up certificate. The agents prepare; the person approves.",
    in: "A COI request, by email",
    out: "An issued, logged certificate",
  },
  chips: ["5 agents", "1 human gate", "Reads the policy in your AMS", "Built for COIs"],
  agents: [
    {
      k: "01",
      agent: "Watcher",
      title: "Watch",
      kind: "agent",
      short:
        "Watches the certificate inbox and the forwards your team sends it. Picks out the COI requests from the rest of the mail and keeps the attachments, contract language and holder details.",
      ins: ["mail", "sms"],
      outs: ["queue"],
      dirs: { mail: "in", sms: "in", queue: "out" },
      handoff: "every COI request, collected",
    },
    {
      k: "02",
      agent: "Sorter",
      title: "Sort",
      kind: "agent",
      short:
        "Works out what is being asked: new certificate, reissue, holder change or additional insured. Finds the insured and the exact policy in your AMS, checks what is missing and ranks the day by deadline.",
      ins: ["queue", "ams"],
      outs: ["list"],
      dirs: { queue: "in", ams: "in", list: "out" },
      handoff: "classified, matched to a policy, ranked",
    },
    {
      k: "03",
      agent: "Drafter",
      title: "Draft",
      kind: "agent",
      short:
        "Fills the ACORD certificate from the policy: insured, holder, limits, dates and description of operations. Adds additional-insured or waiver wording only where the policy has the endorsement, and flags anything it does not.",
      ins: ["ams", "coi", "mail"],
      outs: ["draft"],
      dirs: { ams: "in", coi: "in", mail: "in", draft: "out" },
      handoff: "certificate and cover email, with checks",
    },
    {
      k: "04",
      agent: "You",
      title: "You approve",
      kind: "gate",
      short:
        "Read the certificate and the checklist, fix a line if you want, approve it. Requests the policy cannot support stop here for a person to decide.",
      ins: ["mail", "sms"],
      outs: [],
      dirs: { mail: "in", sms: "in" },
      handoff: "approved only",
    },
    {
      k: "05",
      agent: "Courier",
      title: "Send and chase",
      kind: "agent",
      short:
        "Sends the approved certificate to the holder, copies your service team, and follows up if the holder says it is wrong or does not acknowledge it.",
      ins: ["mail", "sms"],
      outs: ["mail", "ams"],
      dirs: { mail: "out", sms: "out", ams: "out" },
      handoff: "sent, and followed up",
    },
    {
      k: "06",
      agent: "Ledger",
      title: "File and track",
      kind: "agent",
      short:
        "Files the certificate and the approval on the account. Remembers every holder and every expiry, so when a policy renews it tells you which certificates need reissuing before anyone asks.",
      ins: ["ams", "dates"],
      outs: ["chart"],
      dirs: { ams: "in", dates: "in", chart: "out" },
      handoff: "",
    },
  ],
  /** Illustrative only. Shown in the approval card at the human gate. */
  example: {
    prospect: "Ridgeline Mechanical",
    signal: "COI request · GC holding payment · due today",
    draft:
      "Certificate for Ridgeline Mechanical, general liability, holder Carolina Build Group. Checks: additional insured endorsement on policy ✓ · waiver of subrogation ✓ · primary and non-contributory ✗ not on the policy, flagged for you. Cover email drafted.",
    tag: "COI · due today",
  },
  report: {
    title: "Friday, 8am: the COI desk, in numbers.",
    body:
      "One email. Certificates drafted, approved and sent, which requests the policy could not support, and which issued certificates need redoing because a policy renewed.",
    logTitle: "weekly report · example",
    log: [
      "23 certificate requests received, 21 issued, 2 waiting on you",
      "3 requests asked for wording the policy does not carry, sent to a producer",
      "4 holders changed address, 4 certificates reissued",
      "6 policies renewing in 30 days, 11 certificates will need reissuing",
      "Oldest open request: 3 hours, waiting on a holder's contract language",
    ],
  },
};

/** Section 04: what it will not do. Answers the compliance instinct before it is asked. */
export const never = [
  {
    title: "It does not give insurance advice",
    body:
      "It does not interpret coverage, recommend limits, bind anything, or tell an insured what they need. It moves paper and drafts what you approve. The judgement stays with your producers.",
  },
  {
    title: "No employee health data without a BAA",
    body:
      "Nothing touching medical or claims detail is processed until a business associate agreement is signed. Without one, it stays out of that conversation entirely.",
  },
  {
    title: "Nothing sends without a person",
    body:
      "Every certificate and email stops in an approval queue with the source policy attached. You approve, edit or skip.",
  },
  {
    title: "Your AMS stays the system of record",
    body:
      "It reads and writes activity to the management system you already run. It does not become a second place where the truth lives.",
  },
  {
    title: "Your data, and exactly where it goes",
    body:
      "Your book lives in the accounts and storage I set up for you, and you can revoke access at any time. To write a draft, the text of that request goes to the model provider I use, under business API terms that exclude training on it. Nothing else leaves, and every request is logged.",
  },
  {
    title: "It never promises more than the policy",
    body:
      "A certificate is a record of what the policy says. The agent will not add wording, limits or parties the policy does not carry. Anything beyond the policy stops for a producer, with the gap spelled out.",
  },
];

/** Section 05: how it is built and run. */
export const built = [
  {
    title: "Built for your book",
    body:
      "Your certificate holders, your policy forms, your account naming, your wording. Configured from a sample of your real certificates, not from a generic template.",
  },
  {
    title: "Email first, nothing to install",
    body:
      "It has its own address on your domain. Your staff replies to it the way they reply to a colleague. SMS for one-liners when someone is out of the office.",
  },
  {
    title: "A read-only dashboard",
    body:
      "The approval queue and the weekly report on one page. Read-only on purpose: it is for seeing what happened, not another place to do admin.",
  },
  {
    title: "Runs on my infrastructure",
    body:
      "I host and run it. There is no software for your office to buy, and nothing for your IT to maintain.",
  },
  {
    title: "No usage caps, no seat fees",
    body:
      "Agents are added as your book needs them, usage is not metered, and support is included. There is no per-seat or per-email price to think about while you are deciding whether this is worth it.",
  },
  {
    title: "A report every Friday",
    body:
      "What came in, what was drafted, what you approved, what is still open. In numbers, per account. If a renewal is going nowhere, it says so.",
  },
  {
    title: "Same-day fixes",
    body:
      "A carrier changes a form, a template reads wrong, a date is off: you tell me and it is fixed that day, not at the next release.",
  },
];

/** Section 06: proof. Only what is true and checkable. */
export const proof = {
  items: [
    {
      title: "Swoop Tutors, an outbound engine",
      figures: [
        { v: "5,000+", l: "prospects sequenced" },
        { v: "15%", l: "cold reply rate" },
        { v: "50", l: "calls booked" },
      ],
      body:
        "I built the first outbound system for a four-person tutoring startup in Durham: enrichment, sequencing, A/B tests at 100 sends per variant per week, and the dashboard the team ran on. That is an outbound system at scale, run for a company. It was not run for an insurer, and I am not going to pretend it was.",
    },
    {
      title: "My own system, running now",
      figures: [],
      body:
        "I run an agent system on my own outbound every day. It watches, sorts what came in, drafts a reply and waits for me to approve it before anything sends. That is the same shape as what I would build for your office, and I can show it to you on the call. It is a working demonstration, not a client.",
    },
  ],
  note:
    "One more thing, said plainly: I am a Duke student, and I am starting with independent agencies around the Triangle. If you want someone who has run a service team for twenty years, that is not me yet. If you want someone who will build this around your book, sit with your service team until it is right, and answer the phone when a carrier portal changes, that is me.",
};

/** Section 07: the only action on the page. No price, always a call. */
export const cta = {
  heading: "Twenty minutes, and I will show you what it would do for your book.",
  body:
    "Send the email with your agency name in the subject line. I will come to the call having read your website and thought about your carriers. If it is not a fit, I will say so on the call.",
  button: "Email me about my agency",
  note: "Opens an email to cole@colebonawitz.com. Or reply to the message that sent you here.",
};
