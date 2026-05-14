export interface SkillGroup {
  title: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "Product & Design",
    icon: "✦",
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
    icon: "⚡",
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
    icon: "📈",
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
    icon: "🏭",
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
    icon: "🔬",
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
];
