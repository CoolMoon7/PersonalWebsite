"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden">
      {/* Subtle horizontal line accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-10 items-start mb-10">
          <div>
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
              className="text-lg md:text-xl text-muted leading-relaxed max-w-2xl mb-6"
            >
              {project.tagline}
            </motion.p>

            {/* External links */}
            {(project.websiteUrl || project.instagramUrl) && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className="flex flex-wrap gap-3"
              >
                {project.websiteUrl ? (
                  <a
                    href={project.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift px-5 py-2 border border-border text-foreground text-xs font-medium"
                  >
                    View Website
                  </a>
                ) : null}

                {project.instagramUrl ? (
                  <a
                    href={project.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-lift px-5 py-2 border border-border text-foreground text-xs font-medium"
                  >
                    Instagram
                  </a>
                ) : null}
              </motion.div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {project.websiteUrl ? (
              <a
                href={project.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-[4/3] border border-border overflow-hidden bg-surface block cursor-pointer group"
              >
                <Image
                  src={project.projectPageImage ?? project.thumbnail}
                  alt={`${project.name} project image`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 340px"
                />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-2 border border-white/30 bg-black/45 text-white text-[11px] font-medium tracking-[0.08em] uppercase backdrop-blur-sm inline-flex items-center gap-2">
                  <span>visit website</span>
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </a>
            ) : (
              <div className="relative aspect-[4/3] border border-border overflow-hidden bg-surface">
                <Image
                  src={project.projectPageImage ?? project.thumbnail}
                  alt={`${project.name} project image`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 340px"
                />
              </div>
            )}
          </motion.div>
        </div>

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
