"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@/data/projects";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/projects/${project.slug}`} className="group block h-full">
        <div className="hover-lift border border-border h-full flex flex-col">
          {/* Thumbnail */}
          <div className="relative h-64 md:h-72 overflow-hidden bg-surface flex-shrink-0">
            <Image
              src={project.thumbnail}
              alt={project.name}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <h3 className="font-display font-bold text-xl text-white">
                {project.name}
              </h3>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 md:p-6 flex flex-col flex-1">
            <p className="text-sm text-muted leading-relaxed mb-4">
              {project.tagline}
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
              {project.metrics.slice(0, 3).map((m) => (
                <span key={m.label} className="text-xs">
                  <span className="font-semibold text-foreground">{m.value}</span>{" "}
                  <span className="text-muted">{m.label.toLowerCase()}</span>
                </span>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-[11px] font-medium text-muted border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA — pinned to bottom */}
            <div className="mt-auto flex items-center gap-2 text-sm font-medium text-accent group-hover:text-accent-light transition-colors">
              <span>View case study</span>
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
        </div>
      </Link>
    </motion.div>
  );
}
