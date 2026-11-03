export const site = {
  name: "Cole Bonawitz",
  url: "https://colebonawitz.com",
  title: "Cole Bonawitz | GTM engineer for startups",
  description:
    "GTM engineer and Duke CS student. I build outbound and growth systems with Clay, Python and AI agents, and I'm building Hyperflow. Looking for a Summer 2027 GTM or growth internship.",
  email: "cole.bonawitz@duke.edu",
  linkedin: "https://www.linkedin.com/in/colebonawitz",
  github: "https://github.com/CoolMoon7",
  resume: "/Cole_Bonawitz_Resume.pdf",
};

export const hyperflow = {
  site: "https://www.gohyperflow.com",
  demo: "https://demo.gohyperflow.com",
};

/**
 * Two audiences that never link to each other: the personal GTM site (/, /systems, /writing)
 * and the FDE portfolio (/fde) linked from that résumé.
 */
export type SiteMode = "personal" | "fde";
export function siteMode(path: string | null): SiteMode {
  return /^\/fde(\/|$)/i.test(path ?? "") ? "fde" : "personal";
}
