"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/data/projects";

export default function NextProject({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="border-t border-border bg-surface"
    >
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
          Next Project
        </p>
        <Link
          href={`/projects/${project.slug}`}
          className="group flex flex-col sm:flex-row items-start gap-6"
        >
          <div className="hover-lift relative w-full sm:w-48 h-32 overflow-hidden flex-shrink-0 border border-border">
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="192px"
            />
          </div>
          <div>
            <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-accent transition-colors mb-2">
              {project.name}
            </h3>
            <p className="text-muted leading-relaxed">{project.tagline}</p>
            <div className="flex items-center gap-2 mt-3 text-sm font-medium text-accent group-hover:text-accent-light transition-colors">
              <span>View project</span>
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
}
