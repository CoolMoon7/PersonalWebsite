"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { Project } from "@/data/projects";

export default function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      {/* Subtle horizontal line accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to all projects
          </Link>
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-5"
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium text-muted border border-border"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="font-display font-bold text-5xl md:text-6xl lg:text-7xl text-foreground mb-4 tracking-tight"
        >
          {project.name}
        </motion.h1>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-16 h-px bg-accent origin-left mb-6"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mb-10"
        >
          {project.tagline}
        </motion.p>

        {/* Metric strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border"
        >
          {project.metrics.map((m) => (
            <div key={m.label} className="bg-background p-4">
              <div className="font-display font-bold text-xl md:text-2xl text-foreground">
                {m.value}
              </div>
              <div className="text-xs text-muted mt-1 uppercase tracking-wide">{m.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
