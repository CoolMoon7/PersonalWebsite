"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-6">
            About
          </h2>
          <div className="w-16 h-px bg-accent mb-8" />

          <div className="space-y-5 text-muted leading-relaxed text-lg">
            <p>
              I&apos;m a Duke University student studying Computer Science with
              interests across startups, product design, growth, AI, and
              consumer behavior. I like working close to the messy parts of
              building: figuring out what users want, launching fast, creating
              content, running experiments, and turning rough ideas into
              products people actually use.
            </p>
            <p>
              I&apos;m especially interested in early-stage startups where I can
              work across product, growth, content, and technical execution.
            </p>
          </div>

          {/* How I Work cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border mt-10">
            {[
              {
                title: "Build fast",
                desc: "Ship MVPs in days, not months. Use AI tools and modern frameworks to move at startup speed.",
              },
              {
                title: "Test distribution early",
                desc: "Content and growth aren't afterthoughts. I start creating distribution before the product is finished.",
              },
              {
                title: "Use data to iterate",
                desc: "Every experiment generates signal. Track what matters, cut what doesn't, and double down on what works.",
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="hover-lift bg-background p-5 border border-border"
              >
                <h3 className="font-display font-semibold text-foreground text-sm mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
