/**
 * How pricing is explained. No dollar amounts are shown anywhere on the site.
 * If Cole decides to publish prices later, set `price` on the relevant item below and the
 * pricing card will render it. Nothing else needs to change.
 */

export type PricingItem = { title: string; body: string; price?: string };

export const pricing = {
  heading: "Pricing you can read before you sign.",
  items: [
    {
      title: "The audit is a fixed fee.",
      body: "It's credited toward onboarding if you continue.",
    },
    {
      title: "The AI department is one fixed monthly fee, set by the size of your team.",
      body: "It doesn't change when you add services.",
    },
    {
      title: "Each service you add has two parts.",
      body: "A one-time setup fee and a flat monthly management fee. I quote both in writing before anything starts.",
    },
    {
      title: "Software subscriptions are billed to you directly by the vendors, at their price.",
      body: "I don't mark them up, and I don't take referral fees without telling you in writing.",
    },
    {
      title: "The partnership runs 12 months.",
      // TODO(Cole): confirm that setup fees are reduced for the 12-month partnership before shipping.
      body: "Agencies that choose it get reduced setup fees. The audit is the low-commitment first step.",
    },
  ] as PricingItem[],
  keep: "What you keep. The policy, the procedures and the prompt and workflow library are yours, even if we stop.",
  // TODO(Cole): confirm the two-business-day quote promise before shipping, or delete this line.
  quoteLine: "I'll send a written quote within two business days.",
};

/** What the monthly fee covers. Featured on the home page and /how-it-works, not in the services grid. */
export const department = {
  heading: "What the monthly fee covers",
  items: [
    "The written AI policy and approved-tool list",
    "A weekly results report",
    "A monthly “what's new” briefing",
    "A quarterly improvement",
    "Management of your vendor accounts",
    "On-call support",
    "A refresher for new hires",
  ],
};
