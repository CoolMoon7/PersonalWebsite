"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const insights = [
  {
    title: "What I learned scaling RizeMaps",
    body: "Distribution and operations matter as much as the product. The biggest wins came from SEO, creative testing, and pruning unprofitable SKUs — not from building more features.",
    tag: "E-commerce",
  },
  {
    title: "What I learned building Momnt",
    body: "Behavior-change products live or die on friction. The hardest part was not the app — it was creating a habit loop strong enough to make people wear the product daily.",
    tag: "Consumer",
  },
  {
    title: "What I believe about AI monetization",
    body: "AI products need pricing that matches variable compute cost. Subscriptions leave casual users out, while usage-based credits create a cleaner path for both users and builders.",
    tag: "AI / Fintech",
  },
];

export default function InsightCards() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="section-padding bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
            How I Think
          </h2>
          <div className="w-16 h-px bg-accent mt-4 mb-4" />
          <p className="text-muted text-lg max-w-2xl">
            Short reflections on what I&apos;ve learned building, selling, and growing
            products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
          {insights.map((insight, i) => (
            <InsightCard key={insight.title} insight={insight} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function InsightCard({
  insight,
  index,
}: {
  insight: (typeof insights)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="hover-lift bg-background border border-border p-6 flex flex-col"
    >
      <span className="inline-block px-2.5 py-1 text-[11px] font-medium text-accent border border-accent/30 w-fit mb-4">
        {insight.tag}
      </span>
      <h3 className="font-display font-semibold text-foreground text-base mb-3">
        {insight.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed flex-1">{insight.body}</p>
    </motion.div>
  );
}
