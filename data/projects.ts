export interface ProjectMetric {
  value: string;
  label: string;
  proof?: string;
}

export interface ProjectMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  metrics: ProjectMetric[];
  thumbnail: string;
  color: string;
  sections: {
    problem: string;
    built: string;
    role: string;
    growth: string;
    results: ProjectMetric[];
    lessons: string[];
  };
  media: ProjectMedia[];
}

export const projects: Project[] = [
  {
    slug: "momnt",
    name: "Momnt",
    tagline:
      "Consumer app + NFC wearable for intentional screen-time behavior change.",
    description:
      "Momnt is a screen-time reduction product combining a physical NFC wristband with a companion mobile app. When users feel the urge to mindlessly scroll, they tap the band to log the moment and redirect their attention. Built to create a habit loop strong enough to change daily phone behavior.",
    tags: ["React Native", "NFC", "Hardware", "Consumer", "Meta Ads", "Behavior Design"],
    metrics: [
      { value: "600", label: "Wristbands manufactured" },
      { value: "$15K+", label: "Duke grants raised" },
      { value: "100+", label: "Daily active testers" },
      { value: "1+ hr", label: "Avg. screen time reduced" },
    ],
    thumbnail: "/images/momntangledblueblackdouble%20copy.png",
    color: "from-orange-500/20 to-amber-500/20",
    sections: {
      problem:
        "Average adults spend 4+ hours per day on their phones, much of it unintentional scrolling. Existing screen-time tools are purely software-based — they rely on willpower against the same device causing the problem. There's no physical intervention, no friction at the moment of temptation, and no habit-forming feedback loop.",
      built:
        "A two-part product: (1) an NFC-enabled silicone wristband that serves as a physical reminder and interaction point, and (2) a React Native companion app that logs taps, tracks progress, sends nudges, and gamifies intentional phone use. The NFC tap creates a micro-moment of awareness — a physical friction point that interrupts the scroll impulse before it starts.",
      role:
        "Co-founder. Led product design and app development (React Native + Firebase). Managed hardware sourcing and manufacturing of 600 wristband units. Designed the onboarding flow, notification strategy, and habit-loop mechanics. Ran Meta ad campaigns for user acquisition testing. Applied for and received $15K+ in Duke innovation grants.",
      growth:
        "Tested multiple acquisition channels: Meta ads targeting college students, campus ambassador programs, Instagram/TikTok UGC content, and direct outreach. Landing page A/B tests improved conversion by 2x. Founder-led video content on TikTok drove the most efficient CAC. Email onboarding sequences increased 7-day retention.",
      results: [
        { value: "600", label: "Bands manufactured", proof: "Hardware execution and supplier management" },
        { value: "$15K+", label: "Grants raised", proof: "Institutional validation" },
        { value: "100+", label: "Daily active testers", proof: "Product-market signal" },
        { value: "1+ hr/day", label: "Screen time reduced", proof: "Behavior change outcome" },
        { value: "2x", label: "Landing page conversion lift", proof: "Growth experimentation" },
      ],
      lessons: [
        "Behavior-change products live or die on friction. The hardest part was not the app — it was creating a habit loop strong enough to make people wear the product daily.",
        "Hardware adds credibility but also complexity. Manufacturing 600 units taught me supplier negotiation, QC processes, and inventory management.",
        "Physical + digital products create stronger retention than either alone. The band makes the app sticky; the app makes the band useful.",
        "College campuses are incredible test markets. Dense social networks mean word-of-mouth spreads fast if the product creates visible social proof.",
      ],
    },
    media: [
      { type: "image", src: "/images/momntangledblueblackdouble%20copy.png", alt: "Momnt NFC wristband" },
      { type: "image", src: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=800&q=80", alt: "NFC wristband" },
      { type: "image", src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80", alt: "Onboarding flow" },
      { type: "image", src: "https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=800&q=80", alt: "Meta ad creative" },
    ],
  },
  {
    slug: "wind",
    name: "Wind",
    tagline:
      "Usage-based credit billing infrastructure for AI apps.",
    description:
      "AI products have variable compute costs, and subscriptions are a bad fit for casual users. Wind is a prepaid usage-based credit system that gives developers a clean way to monetize AI features — add credits to your app in one day.",
    tags: ["Product Strategy", "AI", "Developer Tools", "Monetization", "Fintech"],
    metrics: [
      { value: "Usage-Based", label: "AI monetization model" },
      { value: "Prepaid", label: "Credit billing system" },
      { value: "1-Day", label: "Developer integration target" },
      { value: "Accelerator", label: "Funding target" },
    ],
    thumbnail: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80",
    color: "from-blue-500/20 to-violet-500/20",
    sections: {
      problem:
        "AI apps face a unique pricing challenge: compute costs are variable and unpredictable. Flat subscriptions leave casual users overpaying and power users underserved. Pay-per-use billing is complex to build and maintain, creating friction for developers who want to focus on their product, not their payment infrastructure.",
      built:
        "Wind is a developer-facing billing layer that lets any AI app offer prepaid usage-based credits. Users buy credit packs, spend them as they use AI features, and top up when they run low. Developers integrate with a simple API — no complex metering infrastructure needed. The system handles credit allocation, usage tracking, low-balance alerts, and automatic top-ups.",
      role:
        "Led market research across 40+ AI apps to map pricing models and identify the credit billing gap. Defined the product strategy, designed the developer experience, created the landing page, and developed accelerator applications. Directed the prototype architecture and API design.",
      growth:
        "Positioning Wind as a developer-first billing wedge with a clear GTM: target indie AI developers and small teams building on OpenAI/Anthropic APIs. Content strategy focused on the 'AI pricing problem' through blog posts and developer community engagement. Long-term vision: become the universal credit layer for AI tools.",
      results: [
        { value: "40+", label: "AI apps researched", proof: "Deep market understanding" },
        { value: "Usage-Based", label: "Credit model designed", proof: "Aligned cost to value" },
        { value: "1-Day", label: "Integration target", proof: "Developer-first simplicity" },
        { value: "Universal", label: "Credit layer vision", proof: "Platform potential" },
      ],
      lessons: [
        "AI pricing is broken — subscriptions penalize casual users and leave money on the table for power users.",
        "Developer tools win by reducing integration friction to near-zero. If it takes more than a day, most indie devs won't bother.",
        "The credit model creates natural expansion revenue: as users build habits, they spend more without needing a sales conversation.",
        "Positioning matters as much as product. 'Usage-based credits' is a feature; 'the Stripe for AI billing' is a company.",
      ],
    },
    media: [
      { type: "image", src: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80", alt: "Wind dashboard concept" },
      { type: "image", src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80", alt: "API flow diagram" },
      { type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", alt: "Pricing model" },
    ],
  },
  {
    slug: "rizemaps",
    name: "RizeMaps",
    tagline:
      "Built and scaled a 3D-printed Formula 1 wall art brand across Shopify, Etsy, and social.",
    description:
      "RizeMaps is a 3D-printed F1 circuit wall art brand I built from zero to $135K+ in revenue. I handled everything: product design, 3D modeling, operating a 12-printer production system, marketplace SEO, Meta ads, TikTok/Instagram content creation, and fulfillment for 3,500+ orders.",
    tags: ["Shopify", "3D Printing", "SEO", "Meta Ads", "TikTok", "UGC", "Operations"],
    metrics: [
      { value: "$135K+", label: "Revenue generated" },
      { value: "3,500+", label: "Orders shipped" },
      { value: "1,000+", label: "Five-star reviews" },
      { value: "12", label: "3D printers in production" },
    ],
    thumbnail: "/images/RizeMaps1%20copy.png",
    color: "from-emerald-500/20 to-teal-500/20",
    sections: {
      problem:
        "Formula 1 fans are passionate about their favorite circuits but had limited options for high-quality, unique wall art. Existing products were generic prints with no tactile dimension. I saw an opportunity to create something physical and premium using 3D printing — and to build a real direct-to-consumer brand around it.",
      built:
        "Designed 35+ F1 circuit track layouts in CAD and optimized them for 3D printing. Built a 12-printer production system capable of consistent output. Created Shopify and Etsy storefronts with optimized product listings, SEO-driven descriptions, and professional product photography. Developed the full supply chain from raw materials through packaging and fulfillment.",
      role:
        "Solo founder and operator. I designed every product, managed the printer farm, built and optimized both storefronts, created all marketing content (TikTok, Instagram, UGC), ran Meta and Google ad campaigns, handled customer service, and managed fulfillment for 3,500+ orders across multiple platforms.",
      growth:
        "Multi-channel growth strategy: Etsy SEO drove organic discovery, TikTok/Instagram Reels generated viral awareness (contributing to 5M+ total views), Meta ads provided predictable paid acquisition, and email re-engagement recovered abandoned carts. Key insight: marketplace SEO and creative content testing drove more efficient growth than paid ads alone. Pruned 15+ unprofitable SKUs after data analysis to focus on best performers.",
      results: [
        { value: "$135K+", label: "Total revenue", proof: "People paid for the product" },
        { value: "3,500+", label: "Orders fulfilled", proof: "Operational execution at scale" },
        { value: "1,000+", label: "Five-star reviews", proof: "Customer satisfaction and retention" },
        { value: "35+", label: "SKUs launched", proof: "Rapid product iteration" },
        { value: "12", label: "Printers operated", proof: "Manufacturing capability" },
        { value: "5M+", label: "Content views", proof: "Distribution and content creation" },
      ],
      lessons: [
        "Distribution and operations matter as much as the product. The biggest wins came from SEO, creative testing, and pruning unprofitable SKUs.",
        "3D printing at scale is a manufacturing challenge, not a tech novelty. Consistency, maintenance schedules, and quality control define your margins.",
        "Content is the growth engine for DTC. One viral TikTok can equal a month of ad spend in acquisition value.",
        "Marketplace SEO compounds. Early investment in Etsy listing optimization created a flywheel that drove organic growth for months.",
        "Kill your underperformers fast. Cutting 15 SKUs freed up production capacity for the products that actually drove revenue.",
      ],
    },
    media: [
      { type: "image", src: "/images/RizeMaps1%20copy.png", alt: "RizeMaps product showcase" },
      { type: "image", src: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=800&q=80", alt: "3D printer farm" },
      { type: "image", src: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80", alt: "Shopify store" },
      { type: "image", src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80", alt: "Product reviews" },
      { type: "image", src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80", alt: "Social media content" },
      { type: "image", src: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=800&q=80", alt: "Packaging and fulfillment" },
    ],
  },
  {
    slug: "swoop-tutors",
    name: "Swoop Tutors",
    tagline:
      "AI-assisted CRM and outreach system leveraging the Duke network for tutoring growth.",
    description:
      "Built an automated outreach and CRM system to scale a tutoring business within the Duke student network. Combined AI-assisted message generation with systematic LinkedIn and email workflows to create a repeatable GTM engine.",
    tags: ["CRM", "AI", "Outreach", "Automation", "LinkedIn", "Growth"],
    metrics: [
      { value: "5,000+", label: "Outreach messages sent" },
      { value: "Custom", label: "CRM system built" },
      { value: "AI-Assisted", label: "Message automation" },
      { value: "Team", label: "Workflow system" },
    ],
    thumbnail: "/images/SWOOPTUTORS.png",
    color: "from-cyan-500/20 to-blue-500/20",
    sections: {
      problem:
        "Scaling a tutoring service on a college campus requires reaching hundreds of potential customers quickly, but manual outreach is slow and inconsistent. Existing CRM tools are built for enterprise sales, not student-run businesses. We needed a system that could automate personalized outreach at scale while maintaining the personal touch that drives trust in a peer-to-peer service.",
      built:
        "A custom CRM and outreach automation system. Built lead lists from the Duke student directory, created AI-assisted message templates that personalized based on major, year, and course history. Automated LinkedIn connection requests and follow-up sequences. Designed a team workflow so multiple operators could run outreach without overlap or inconsistency.",
      role:
        "Built the CRM from scratch and designed the outreach funnel. Wrote AI prompts for message personalization, set up email and LinkedIn automation workflows, managed the lead database, and created SOPs for the team. Analyzed response rates and iterated on messaging templates to optimize conversion.",
      growth:
        "Growth was entirely outbound-driven. Tested message variants (formal vs. casual, problem-led vs. offer-led) and tracked open/response rates. LinkedIn outreach converted 3x better than cold email. AI-personalized messages outperformed templates by 40%+ in response rate. Built referral incentives that created organic word-of-mouth after initial conversion.",
      results: [
        { value: "5,000+", label: "Messages sent", proof: "Systematic GTM execution" },
        { value: "Custom", label: "CRM built", proof: "Systems thinking and automation" },
        { value: "3x", label: "LinkedIn vs. email conversion", proof: "Channel optimization" },
        { value: "40%+", label: "AI personalization lift", proof: "AI-augmented growth" },
      ],
      lessons: [
        "Outbound at scale requires systems, not hustle. The CRM turned a manual process into a repeatable machine.",
        "AI-assisted personalization isn't about tricking people — it's about making relevant outreach efficient at scale.",
        "LinkedIn beats email for peer-to-peer services because the social proof is built into the platform.",
        "The best GTM for student services is a referral loop seeded by high-volume outbound. Outreach gets the first users; those users bring their friends.",
      ],
    },
    media: [
      { type: "image", src: "/images/SWOOPTUTORS.png", alt: "Swoop Tutors" },
      { type: "image", src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80", alt: "CRM dashboard" },
      { type: "image", src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80", alt: "Outreach workflow" },
    ],
  },
  {
    slug: "web-dev",
    name: "Web Development & AI Builds",
    tagline:
      "Websites, mobile apps, prototypes, and AI-assisted builds across multiple frameworks.",
    description:
      "A collection of web and mobile projects built with modern frameworks. From client websites to AI-powered prototypes, these builds showcase technical range across the full stack — including projects built with Claude and Cursor as AI coding partners.",
    tags: ["Next.js", "React Native", "Firebase", "Vercel", "Python", "AI Coding"],
    metrics: [
      { value: "Next.js", label: "Primary framework" },
      { value: "React Native", label: "Mobile development" },
      { value: "Firebase", label: "Backend services" },
      { value: "AI-Assisted", label: "Claude/Cursor workflows" },
    ],
    thumbnail: "/images/TenantFlowAIWebProject.png",
    color: "from-indigo-500/20 to-purple-500/20",
    sections: {
      problem:
        "Each project in this collection addressed a different need: client businesses needing web presence, startup ideas requiring rapid prototyping, or tools I built to solve my own problems. The common thread is using modern frameworks and AI-assisted coding to ship faster.",
      built:
        "A range of projects including: client websites for local businesses (Shopify customization, multi-page static sites), the Wind landing page (Next.js + Vercel), the Momnt companion app (React Native + Firebase), Python automation scripts, and various prototypes built with Claude Code and Cursor as AI coding assistants. Each project pushed different parts of the stack.",
      role:
        "Full-stack developer on all projects. Handled design, frontend, backend, deployment, and client communication. Increasingly leveraged AI coding tools (Claude, Cursor) to accelerate development velocity — treating them as pair-programming partners rather than code generators.",
      growth:
        "These projects served different growth goals: client websites drove local business visibility, the Momnt app supported user acquisition, and the AI-built prototypes validated product ideas in hours instead of weeks. The meta-skill was learning to ship faster with each iteration.",
      results: [
        { value: "Multiple", label: "Client sites launched", proof: "Delivery and client management" },
        { value: "Full-Stack", label: "Technical range", proof: "Frontend, backend, mobile, AI" },
        { value: "AI-Paired", label: "Development workflow", proof: "Modern tooling adoption" },
        { value: "Rapid", label: "Prototype velocity", proof: "Idea to deployed in hours" },
      ],
      lessons: [
        "AI coding tools are a multiplier, not a replacement. The best results come from knowing what to ask for and how to evaluate the output.",
        "Shipping client work teaches you more about real-world constraints than any personal project. Deadlines, feedback, and scope management are the real skills.",
        "Framework choice matters less than shipping speed. Pick what you know, build fast, and optimize later.",
        "Every project is a learning budget. Even small builds teach patterns that compound across future work.",
      ],
    },
    media: [
      { type: "image", src: "/images/TenantFlowAIWebProject.png", alt: "TenantFlow AI web project" },
      { type: "image", src: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80", alt: "Web development" },
      { type: "image", src: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80", alt: "Mobile app" },
      { type: "image", src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80", alt: "AI coding tools" },
    ],
  },
  {
    slug: "dukeengage",
    name: "DukeEngage / Makerere",
    tagline:
      "Low-cost medical device innovation for neonatal care in Uganda.",
    description:
      "Through the DukeEngage program at Makerere University in Kampala, Uganda, I worked on designing a low-cost medical device to reduce the burden of manual neonatal monitoring in resource-constrained hospitals. The project won first place at the Makerere innovation competition.",
    tags: ["Medical Device", "Social Impact", "Hardware", "Design", "Research"],
    metrics: [
      { value: "8 Weeks", label: "Intensive program" },
      { value: "1st Place", label: "Makerere innovation competition" },
      { value: "~75%", label: "Monitoring time reduction" },
      { value: "Neonatal", label: "Care focus area" },
    ],
    thumbnail: "/images/DukeEngageUganda.png",
    color: "from-rose-500/20 to-pink-500/20",
    sections: {
      problem:
        "In many Ugandan hospitals, neonatal monitoring is done manually by nurses who are responsible for multiple patients simultaneously. This leads to delayed response to critical changes in infant vital signs. Existing monitoring equipment is prohibitively expensive for resource-constrained settings, and many hospitals rely entirely on periodic manual checks.",
      built:
        "A low-cost monitoring device prototype designed for neonatal wards in resource-constrained hospitals. The device automates basic vital sign monitoring and alerts nurses when readings fall outside safe ranges, reducing the need for constant manual checks. Designed for manufacturability with locally-available components and minimal maintenance requirements.",
      role:
        "Led device design and prototyping within a multidisciplinary team. Conducted interviews with nurses and doctors at Mulago National Referral Hospital to understand workflow constraints. Iterated on designs based on clinical feedback. Presented the final prototype at the Makerere University innovation competition, winning first place.",
      growth:
        "This wasn't a growth project in the traditional sense — it was about impact. The device was designed to reduce manual monitoring time by approximately 75%, freeing nurses to attend to more patients. User research with healthcare workers ensured the design fit actual clinical workflows rather than theoretical use cases.",
      results: [
        { value: "1st Place", label: "Innovation competition", proof: "Validated by experts" },
        { value: "~75%", label: "Monitoring time saved", proof: "Clinical workflow improvement" },
        { value: "8 Weeks", label: "Design to prototype", proof: "Rapid execution under constraints" },
        { value: "Low-Cost", label: "Design target", proof: "Resource-constrained design thinking" },
      ],
      lessons: [
        "Designing for constraints forces better solutions. Limited resources meant every component had to justify its existence.",
        "User research in unfamiliar contexts requires deep humility. What works in a Duke engineering lab doesn't translate to a Kampala hospital ward.",
        "Medical device design is fundamentally about workflow, not technology. The nurses needed less monitoring burden, not a fancier sensor.",
        "Cross-cultural collaboration requires listening before building. The best insights came from hours of observation, not assumptions.",
      ],
    },
    media: [
      { type: "image", src: "/images/DukeEngageUganda.png", alt: "DukeEngage Uganda fieldwork" },
      { type: "image", src: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80", alt: "Uganda fieldwork" },
      { type: "image", src: "https://images.unsplash.com/photo-1582719471384-894fbb16f461?auto=format&fit=crop&w=800&q=80", alt: "Innovation competition" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
