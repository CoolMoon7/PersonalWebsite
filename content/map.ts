/**
 * How the services are drawn: where each sits in an agency's policy lifecycle, and which tier it belongs to.
 * Tiers are a way to see progression, not packages. Everything is still quoted one service at a time.
 */

export type Stage = { id: string; title: string; hint: string; slugs: string[] };

export const stages: Stage[] = [
  { id: "win", title: "Win", hint: "Leads and prospects", slugs: ["sales-follow-up"] },
  { id: "submit", title: "Submit", hint: "Apps and carrier data", slugs: ["application-intake", "loss-runs-extraction"] },
  { id: "service", title: "Service", hint: "The daily desk", slugs: ["coi-desk", "ai-receptionist"] },
  { id: "renew", title: "Renew", hint: "Retention", slugs: ["renewal-review"] },
  { id: "paid", title: "Get paid", hint: "Accounting", slugs: ["commission-reconciliation"] },
];

export const layers = [
  { id: "foundation", title: "Foundation", hint: "Rules, accounts and training under everything", slugs: ["ai-readiness-audit", "ai-use-policy", "team-assistant-rollout", "built-in-ams-ai"] },
  { id: "connect", title: "Connecting layer", hint: "Your tools share data and memory", slugs: ["integrations", "business-memory-layer", "custom-agents"] },
];

export type Tier = { n: 1 | 2 | 3 | 4; name: string; line: string; slugs: string[] };

export const tiers: Tier[] = [
  {
    n: 1,
    name: "Starter",
    line: "Know what you have, set the rules, train the team.",
    slugs: ["ai-readiness-audit", "ai-use-policy", "team-assistant-rollout", "built-in-ams-ai"],
  },
  {
    n: 2,
    name: "Connected",
    line: "Tools doing real jobs, set up around your management system.",
    slugs: ["coi-desk", "ai-receptionist", "renewal-review", "application-intake", "commission-reconciliation", "sales-follow-up", "loss-runs-extraction"],
  },
  {
    n: 3,
    name: "Integrated",
    line: "Your systems share data, and your agency shares one memory.",
    slugs: ["integrations", "business-memory-layer"],
  },
  {
    n: 4,
    name: "Agentic agency",
    line: "Agents work the desks. Your licensed people approve.",
    slugs: ["custom-agents"],
  },
];

/** Simple 24px stroke icons, one per service. */
export const icons: Record<string, string> = {
  "ai-readiness-audit": "M11 4a7 7 0 100 14 7 7 0 000-14zM21 21l-4.3-4.3",
  "ai-use-policy": "M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3zM8.5 12l2.5 2.5L15.5 10",
  "team-assistant-rollout": "M4 5h16v11H9l-5 4V5z",
  "built-in-ams-ai": "M7 8h10a4 4 0 010 8H7a4 4 0 010-8zM16 12h.01",
  "coi-desk": "M6 3h9l4 4v14H6V3zM14 3v5h5M9 13h7M9 17h5",
  "ai-receptionist": "M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z",
  "renewal-review": "M20 11a8 8 0 00-14-4L4 9M4 4v5h5M4 13a8 8 0 0014 4l2-2M20 20v-5h-5",
  "application-intake": "M12 3v11M8 10l4 4 4-4M4 15v4h16v-4",
  "commission-reconciliation": "M12 3a9 9 0 100 18 9 9 0 000-18zM14.5 9.5c-.5-1-3.5-1.5-4 0s1 2 2 2.5 2.5 1 2 2.5-3.5 1-4.5-.5M12 7v1.5M12 15.5V17",
  "sales-follow-up": "M3 5h18l-7 8v6l-4-2v-4L3 5z",
  "loss-runs-extraction": "M4 4h16v16H4zM4 10h16M4 15h16M10 4v16",
  "business-memory-layer": "M12 4c4.4 0 8 1.3 8 3s-3.6 3-8 3-8-1.3-8-3 3.6-3 8-3zM4 7v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
  "custom-agents": "M12 3a2 2 0 100 4 2 2 0 000-4zM5 17a2 2 0 100 4 2 2 0 000-4zM19 17a2 2 0 100 4 2 2 0 000-4zM12 7v4M12 11l-6 6M12 11l6 6",
  integrations: "M9 7H7a4 4 0 000 8h2M15 7h2a4 4 0 010 8h-2M8 11h8",
};

/** Short labels for tiles, where the full service name is too long. */
export const short: Record<string, string> = {
  "ai-readiness-audit": "AI audit",
  "ai-use-policy": "AI policy",
  "team-assistant-rollout": "Team assistant",
  "built-in-ams-ai": "Built-in AMS AI",
  "coi-desk": "COI desk",
  "ai-receptionist": "AI receptionist",
  "renewal-review": "Renewal review",
  "application-intake": "Application intake",
  "commission-reconciliation": "Commissions",
  "sales-follow-up": "Sales follow-up",
  "loss-runs-extraction": "Loss runs",
  "business-memory-layer": "Memory layer",
  "custom-agents": "Custom agents",
  integrations: "Integrations",
};
