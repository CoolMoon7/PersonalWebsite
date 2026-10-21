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
  chips: ["Commercial P&C · Durham and the Triangle", "One person, in Durham"],
  /** Printed under the hero buttons. Kept out of the chips so it never overflows a phone. */
  area: "Durham · Chapel Hill · Hillsborough · Morrisville · RTP",
  /** Two lines. The second is rendered faint, as on /pilot. */
  line1: "An AI employee",
  line2: "for your insurance agency.",
  lede:
    "It works the renewals, COIs and endorsements your service team never has time for, so the accounts that should have been remarketed get remarketed.",
  intro:
    "I'm Cole. I'm a Duke student in Durham and I build agent systems. I'm building these systems starting with independent agencies around the Triangle, on exactly this: the paperwork that decides whether an account renews. What follows is what I would build for your book, and what it would not do.",
};

export const summary = [
  {
    k: "The job",
    v: "An AI employee for your agency",
    d: "Configured to your carriers, your forms and your wording.",
  },
  {
    k: "What it covers",
    v: "COIs, renewals, endorsements",
    d: "Plus carrier chasing, loss runs and the dates nobody is watching.",
  },
  {
    k: "How you talk to it",
    v: "Email and SMS",
    d: "Its own address on your domain. A read-only dashboard. Nothing to install.",
  },
  {
    k: "The gate",
    v: "You approve everything",
    d: "No certificate, notice or email leaves without a person.",
  },
];

/** Section 02: their week, in their vocabulary. This section is the credibility test. */
export const week = {
  items: [
    {
      when: "7:40am",
      title: "A COI that cannot wait",
      body:
        "A GC's AP department will not release a payment until a certificate with the right additional insured is in their inbox. The client forwards the request to you with 'today please' on top.",
    },
    {
      when: "This month",
      title: "Fourteen renewals, ninety days out",
      body:
        "Each one is a re-shop across ten to thirty carriers, a requote, a comparison, and something presentable for the insured. The accounts nobody had time to remarket are the ones that leave.",
    },
    {
      when: "Any day",
      title: "An endorsement mid-term",
      body:
        "A new truck, a new location, an employee added. The client emails you, you email the carrier, the carrier comes back a week later wanting a signed form and a premium change re-explained.",
    },
    {
      when: "Always",
      title: "Chasing carriers",
      body:
        "Quotes come back from carriers that answer when they answer. Every day a submission sits, the client asks you for status, and the client is who you lose.",
    },
    {
      when: "March and September",
      title: "Loss runs and premium audits",
      body:
        "Audit forms, loss runs for a renewal, or for a competitor someone asked to quote. Rarely urgent, always due, and nobody's favourite afternoon.",
    },
    {
      when: "Silently",
      title: "Dates that pass",
      body:
        "Certificates expiring, filings and audit dates that nothing in the office flags. Invisible until they cost you the account.",
    },
  ],
  pain: [
    "By six, the service team has answered everyone who called and moved none of the renewals forward.",
    "The admin gets done at 9pm, because it cannot be done at 3pm.",
    "It is not a marketing problem. The book is there. It needs someone whose only job is to chase it.",
  ],
};

/** Section 03: the agent graph. Tool keys are Logo glyphs. */
export const system: {
  intro: { what: string; in: string; out: string };
  chips: string[];
  agents: Agent[];
  example: Example;
  report: { title: string; body: string; logTitle: string; log: string[] };
} = {
  intro: {
    what:
      "An agent for each kind of work your office does, one queue you approve from, and a report at the end of the week. The shape is the same as the pipelines I build for outbound; the tools are the ones an agency already runs.",
    in: "Inbox, AMS, policy dates",
    out: "Sent, logged, reported",
  },
  chips: ["5 agents", "1 human gate", "Tools you already use"],
  agents: [
    {
      k: "01",
      agent: "Watcher",
      title: "Watch",
      kind: "agent",
      short:
        "Reads the agency inbox, the policy dates in your AMS and the carrier mail, all day, so nothing sits in someone's head.",
      ins: ["mail", "dates", "carrier", "ams"],
      outs: ["queue"],
      dirs: { mail: "in", dates: "in", carrier: "in", ams: "in", queue: "out" },
      handoff: "everything that came in",
    },
    {
      k: "02",
      agent: "Sorter",
      title: "Triage",
      kind: "agent",
      short:
        "Decides what each item is, when it is due and what happens to the account if it slips, then ranks the day.",
      ins: ["queue", "ams"],
      outs: ["list"],
      dirs: { queue: "in", ams: "in", list: "out" },
      handoff: "the day, ranked",
    },
    {
      k: "03",
      agent: "Drafter",
      title: "Draft",
      kind: "agent",
      short:
        "Writes the certificate, the renewal notice or the endorsement acknowledgement, working from the policy in your AMS.",
      ins: ["coi", "ams", "mail"],
      outs: ["draft"],
      dirs: { coi: "in", ams: "in", mail: "in", draft: "out" },
      handoff: "drafts, with the source policy attached",
    },
    {
      k: "04",
      agent: "You",
      title: "You approve",
      kind: "gate",
      short:
        "Read it, fix a line if you want, send it. Nothing leaves the agency without a person.",
      ins: ["mail", "sms"],
      outs: [],
      dirs: { mail: "in", sms: "in" },
      handoff: "approved only",
    },
    {
      k: "05",
      agent: "Courier",
      title: "Send",
      kind: "agent",
      short:
        "Sends the certificate to the GC, the notice to the insured, the question to the underwriter. Chases what has not come back.",
      ins: ["mail", "sms"],
      outs: ["carrier", "ams"],
      dirs: { mail: "out", sms: "out", carrier: "out", ams: "out" },
      handoff: "sent, and followed up",
    },
    {
      k: "06",
      agent: "Ledger",
      title: "Log and report",
      kind: "agent",
      short:
        "Writes the activity back to the account, and on Friday tells you what was chased, what you approved and what is still open.",
      ins: ["ams", "mail"],
      outs: ["chart"],
      dirs: { ams: "in", mail: "in", chart: "out" },
      handoff: "",
    },
  ],
  /** Illustrative only. Shown in the approval card at the human gate. */
  example: {
    prospect: "Ridgeline Mechanical",
    signal: "COI due today · GC holding payment",
    draft:
      "Attached is the certificate for Ridgeline Mechanical on the general liability policy, effective 03/01. The additional insured wording the GC requested is on the endorsement page. Copying your service team.",
    tag: "COI · due today",
  },
  report: {
    title: "Friday, 8am: the week, in numbers.",
    body:
      "One email. What came in, what was drafted, what you approved, what went out, what is still waiting on a carrier. Per account, not per agent.",
    logTitle: "weekly report · example",
    log: [
      "9 certificates issued, 2 waiting on you",
      "3 renewals re-shopped, 1 quote outstanding",
      "4 endorsements acknowledged, 1 form from the carrier",
      "2 loss runs requested, both received",
      "1 policy expiring in 21 days with no renewal activity",
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
      "Every certificate, notice, acknowledgement and email stops in an approval queue with the source policy attached. You approve, edit or skip.",
  },
  {
    title: "Your AMS stays the system of record",
    body:
      "It reads and writes activity to the management system you already run. It does not become a second place where the truth lives.",
  },
  {
    title: "No client data in a model you do not control",
    body:
      "Policy and client detail stays inside the accounts and infrastructure I run for you. It is not used to train anything, and it is not shared.",
  },
  {
    title: "Everything is logged",
    body:
      "Each action is written back to the account with what came in, what was drafted and who approved it. Nothing happens off the record.",
  },
];

/** Section 05: how it is built and run. */
export const built = [
  {
    title: "Built for your book",
    body:
      "Your carriers, your policy forms, your account naming, your wording. Configured from a sample of real renewals and certificates, not from a generic template.",
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
