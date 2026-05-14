"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillGroups } from "@/data/skills";

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
            Skills &amp; Tools
          </h2>
          <div className="w-16 h-px bg-accent mt-4 mb-4" />
          <p className="text-muted text-lg max-w-2xl">
            The stack I use to build, grow, and operate — from code to content to
            supply chain.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {skillGroups.map((group, i) => (
            <SkillCard key={group.title} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({
  group,
  index,
}: {
  group: (typeof skillGroups)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-background p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xl">{group.icon}</span>
        <h3 className="font-display font-semibold text-foreground text-sm">
          {group.title}
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-[11px] font-medium text-muted border border-border hover:text-foreground hover:border-border-dark transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
