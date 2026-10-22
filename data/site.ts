export const site = {
  name: "Cole Bonawitz",
  url: "https://colebonawitz.com",
  title: "Cole Bonawitz — AI that writes COIs for insurance agencies",
  description:
    "An AI agent that reads certificate requests, checks the policy and drafts the COI for your team to approve. Built for independent commercial P&C agencies by Cole Bonawitz, Duke CS.",
  email: "cole@colebonawitz.com",
  linkedin: "https://www.linkedin.com/in/colebonawitz",
  github: "https://github.com/CoolMoon7",
  resume: "/Cole_Bonawitz_Resume.pdf",
};

/** Pages that belong to the GTM engineering portfolio rather than the insurance homepage. */
export const isGtmPath = (p: string | null) => /^\/(gtm|systems|writing)(\/|$)/.test(p ?? "");

export const facts = [
  { v: "Insurance", d: "An AI agent that drafts COIs for independent commercial P&C agencies in the Triangle" },
  { v: "10,000+", d: "records cleaned and enriched in a prior production outbound engine" },
  { v: "$135K", d: "revenue driven at RiZE Maps, the DTC brand I founded" },
  { v: "1st of 100+", d: "teams at HackDuke" },
];

export const experience = [
  {
    when: "2026 — present",
    role: "Builder",
    org: "AI agents for insurance agencies",
    body: "Building an AI agent that drafts certificates of insurance for independent commercial P&C agencies, with a licensed person approving every one.",
  },
  {
    when: "Oct 2025 — present",
    role: "Co-founder & Head of Product",
    org: "Momnt",
    body: "Digital-wellness NFC wearable and iOS app. 300+ customer-discovery interviews, 300+ units, 85% two-month retention.",
  },
  {
    when: "Aug – Dec 2025",
    role: "GTM Engineering Intern",
    org: "Swoop Tutors",
    body: "Sole builder of the first outbound engine for a 4-person startup: 10,000+ records enriched, 15% cold reply rate, 50 calls booked.",
  },
  {
    when: "2023 — present",
    role: "Founder",
    org: "RiZE Maps",
    body: "DTC brand of 3D-printed Formula 1 art. $135K in revenue and 3M+ organic impressions from a content and paid growth engine I built.",
  },
  {
    when: "Aug 2024 — May 2028",
    role: "B.S. Computer Science",
    org: "Duke University",
    body: "Minors in Statistical Science and Philosophy. 3.95 GPA.",
  },
];
