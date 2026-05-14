export interface SkillGroup {
  title: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Product & Design",
    icon: "product",
    skills: [
      "Figma",
      "Framer",
      "Product Flows",
      "Landing Pages",
      "UX Writing",
      "Wireframing",
    ],
  },
  {
    title: "Engineering",
    icon: "engineering",
    skills: [
      "Python",
      "JavaScript / TypeScript",
      "React",
      "React Native",
      "Firebase",
      "Next.js",
      "Vercel",
      "APIs",
      "Claude Code / Cursor",
    ],
  },
  {
    title: "E-commerce & Growth",
    icon: "growth",
    skills: [
      "Shopify",
      "Etsy",
      "eBay",
      "Meta Ads",
      "Google Ads",
      "TikTok",
      "Instagram",
      "LinkedIn",
      "SEO",
      "UGC",
      "Email Outreach",
    ],
  },
  {
    title: "Operations & Manufacturing",
    icon: "operations",
    skills: [
      "3D Printing",
      "CAD / 3D Modeling",
      "Supplier Coordination",
      "Fulfillment",
      "SKU Testing",
      "Inventory Workflows",
    ],
  },
  {
    title: "Analytics & Automation",
    icon: "analytics",
    skills: [
      "Firebase Analytics",
      "Meta Pixel",
      "Shopify Analytics",
      "Excel / Sheets",
      "Clay",
      "CRM Building",
      "AI Workflows",
    ],
  },
  {
    title: "Sales & GTM",
    icon: "sales",
    skills: [
      "Customer Discovery",
      "Founder-Led Sales",
      "Cold Outreach",
      "Lead Generation",
      "CRM Systems",
      "User Interviews",
      "GTM Strategy",
      "Partnerships",
      "Sales Calls",
      "Clay",
    ],
  },
];
