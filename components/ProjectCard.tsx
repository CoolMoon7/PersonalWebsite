"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const projectHref = `/projects/${project.slug}`;
  const navigateToProject = () => {
    router.push(projectHref, { scroll: false });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="h-full"
    >
      <div
        className="hover-lift border border-border h-full flex flex-col group cursor-pointer"
        onClick={navigateToProject}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            navigateToProject();
          }
        }}
        role="link"
        tabIndex={0}
      >
        {/* Thumbnail */}
        <div className="relative h-64 md:h-72 overflow-hidden bg-surface flex-shrink-0">
          <Image
            src={project.thumbnail}
            alt={project.name}
            fill
            className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute top-4 left-4">
            <h3 className="font-display font-bold text-base md:text-lg text-foreground bg-background border border-border px-3 py-1.5">
              {project.name}
            </h3>
          </div>
        </div>

        {/* Website button — directly below image */}
        {project.websiteUrl ? (
          <div className="border-t border-border px-4 py-3">
            <a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              className="inline-flex px-4 py-2 border border-border text-foreground text-xs font-medium hover-lift"
            >
              View Website
            </a>
          </div>
        ) : null}

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

          {/* Link row */}
          <div className="mt-auto flex items-center justify-between gap-4">
            {project.instagramUrl ? (
              <a
                href={project.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} Instagram`}
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="text-muted hover:text-accent transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37a4 4 0 1 1-7.75 1.26 4 4 0 0 1 7.75-1.26z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            ) : (
              <span />
            )}

            <Link
              href={projectHref}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigateToProject();
              }}
              className="flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              <span>View project</span>
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
