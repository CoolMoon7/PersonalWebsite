export const site = {
  name: "Cole Bonawitz",
  url: "https://colebonawitz.com",
  title: "Cole Bonawitz | Your agency's AI department",
  description:
    "AI operations for independent insurance agencies in the Triangle. I choose, connect, run and keep current every AI tool you use, with a report every Friday. Based in Durham, NC.",
  email: "cole@colebonawitz.com",
  linkedin: "https://www.linkedin.com/in/colebonawitz",
  github: "https://github.com/CoolMoon7",
  resume: "/Cole_Bonawitz_Resume.pdf",
};

/**
 * The site serves three audiences that never link to each other: the insurance homepage,
 * the GTM portfolio (/gtm, /systems, /writing) and the FDE portfolio (/fde).
 */
export type SiteMode = "insurance" | "gtm" | "fde";
export function siteMode(path: string | null): SiteMode {
  const p = path ?? "";
  if (/^\/fde(\/|$)/i.test(p)) return "fde";
  if (/^\/(gtm|systems|writing)(\/|$)/.test(p)) return "gtm";
  return "insurance";
}

export const facts = [
  { v: "Insurance", d: "The AI department for independent agencies in the Triangle: I choose, connect, run and keep current every tool" },
  { v: "10,000+", d: "records cleaned and enriched in a prior production outbound engine" },
  { v: "$135K", d: "revenue driven at RiZE Maps, the DTC brand I founded" },
  { v: "1st of 100+", d: "teams at HackDuke" },
];

export const experience = [
  {
    when: "2026 — present",
    role: "Founder",
    org: "AI operations for insurance agencies",
    body: "Running the AI department for independent insurance agencies: choosing, connecting, running and updating their AI tools, with licensed staff approving what goes out.",
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
