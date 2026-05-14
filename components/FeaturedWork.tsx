"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function FeaturedWork() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-3">
            Featured Work
          </h2>
          <div className="w-16 h-px bg-accent mt-4 mb-4" />
          <p className="text-muted text-lg max-w-2xl">
            Products, growth systems, and content engines I&apos;ve built — from
            AI billing infrastructure to e-commerce brands generating six figures
            in revenue.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
