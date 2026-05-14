"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skillGroups } from "@/data/skills";

function SkillIcon({ icon }: { icon: string }) {
  const common = "w-5 h-5 text-foreground";

  switch (icon) {
    case "product":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M12 3l2.6 5.4 6 .9-4.3 4.2 1 6-5.3-2.9-5.3 2.9 1-6-4.3-4.2 6-.9L12 3z" />
        </svg>
      );
    case "engineering":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M14.7 6.3a4 4 0 015 5L10 21l-5-5 9.7-9.7z" />
          <path d="M7 14l3 3" />
        </svg>
      );
    case "growth":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M4 18l6-6 4 4 6-8" />
          <path d="M16 8h4v4" />
        </svg>
      );
    case "operations":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M3 21h18" />
          <path d="M5 21V10l7-5 7 5v11" />
          <path d="M9 21v-5h6v5" />
        </svg>
      );
    case "analytics":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="11" cy="11" r="6" />
          <path d="M20 20l-4-4" />
        </svg>
      );
    case "sales":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <path d="M12 2l3 7h7l-5.5 4.1L18.5 21 12 16.8 5.5 21l2-7.9L2 9h7l3-7z" />
        </svg>
      );
    default:
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

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
        <span className="inline-flex items-center justify-center">
          <SkillIcon icon={group.icon} />
        </span>
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
