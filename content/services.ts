/**
 * The one list of services. The /services page, the home grid and the quote-form checkboxes all read from here.
 * Rules: no prices, no software vendor names. Describe tools by category.
 */

export type ServiceGroup = "Foundation" | "Workflows" | "Advanced";

export type Service = {
  slug: string;
  group: ServiceGroup;
  name: string;
  /** The problem, one line, in the agency's words. */
  problem: string;
  /** What I do about it. */
  does: string;
  /** Optional detail page. */
  href?: string;
};

export const serviceGroups: { group: ServiceGroup; blurb: string }[] = [
  { group: "Foundation", blurb: "Start here. These make every later tool safer and easier to run." },
  { group: "Workflows", blurb: "One job at a time, set up around the system you already use." },
  { group: "Advanced", blurb: "For when the standard tools stop short." },
];

export const services: Service[] = [
  {
    slug: "ai-readiness-audit",
    group: "Foundation",
    name: "AI readiness audit",
    problem: "You don't know what you already own, what staff are using, or where the hours go.",
    does:
      "I map how work moves through your agency, inventory every tool and account, and find the AI already inside your management system that you aren't using. I rank the opportunities with expected hours saved, worked out from your own numbers. Then I draft your AI policy and hand you a 90-day plan.",
  },
  {
    slug: "ai-use-policy",
    group: "Foundation",
    name: "AI use policy and approved tools",
    problem: "Staff paste client data into personal chatbot accounts, and nothing is written down.",
    does:
      "I write the policy, the approved-tool list and the data rules. I set up company accounts, onboard new hires, and keep all of it current.",
  },
  {
    slug: "team-assistant-rollout",
    group: "Foundation",
    name: "Team assistant rollout",
    problem: "Everyone uses AI differently, if at all.",
    does:
      "I choose one platform and set up company accounts. I build role-based prompt libraries for service, producers and accounting, then train the team.",
  },
  {
    slug: "built-in-ams-ai",
    group: "Foundation",
    name: "Switch on your management system's built-in AI",
    problem: "You pay for AI features nobody turned on.",
    does:
      "I find what your package already includes, turn it on, train your staff, and track new releases.",
  },
  {
    slug: "coi-desk",
    group: "Workflows",
    name: "The COI desk",
    problem: "Certificate requests eat the service team's day.",
    does:
      "I draft every certificate from the policy for a licensed person to approve, chase missing information, reissue on renewal, and file everything.",
    href: "/services/coi-desk",
  },
  {
    slug: "ai-receptionist",
    group: "Workflows",
    name: "AI receptionist and phones",
    problem: "Missed and after-hours calls, and routine service calls tying up staff.",
    does:
      "I choose and set up an AI phone line that logs calls to your management system and hands off what needs a person.",
  },
  {
    slug: "renewal-review",
    group: "Workflows",
    name: "Renewal review and client email",
    problem: "Renewals don't all get a full review, and client emails get written at 9pm.",
    does: "I set up policy checking and drafted renewal emails that your team reviews before they go.",
  },
  {
    slug: "application-intake",
    group: "Workflows",
    name: "Application and submission intake",
    problem: "The same risk data is retyped into carrier portals.",
    does: "I set up digital applications and intake so the data is entered once.",
  },
  {
    slug: "commission-reconciliation",
    group: "Workflows",
    name: "Commission reconciliation",
    problem: "Carrier statements are matched by hand and commissions go missing.",
    does: "I set up statement matching against your policies, and I monitor it.",
  },
  {
    slug: "sales-follow-up",
    group: "Workflows",
    name: "Sales follow-up and CRM automation",
    problem: "Leads and renewals leak through the cracks.",
    does: "I build the follow-up sequences, tasks and reminders your sales process needs.",
  },
  {
    slug: "loss-runs-extraction",
    group: "Workflows",
    name: "Loss runs and document extraction",
    problem: "Loss runs and policy documents are read and summarized by hand.",
    does: "I extract the data into a standard format and check it against your system.",
  },
  {
    slug: "business-memory-layer",
    group: "Advanced",
    name: "Business memory layer",
    problem: "What the agency knows lives in inboxes and people's heads.",
    does:
      "I build a shared knowledge base across email, files and notes, so your tools and your team work from the same facts. This requires a signed data agreement.",
  },
  {
    slug: "custom-agents",
    group: "Advanced",
    name: "Custom agents",
    problem: "Nothing off the shelf fits your workflow.",
    does:
      "I design, build, host and maintain an agent for it, with a licensed person approving anything that goes out.",
  },
  {
    slug: "integrations",
    group: "Advanced",
    name: "Integrations and data connections",
    problem: "Your tools don't talk to each other.",
    does:
      "I set up read-only access to your management system and mailbox, and write results back so there is an audit trail.",
  },
];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
