"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { ProjectMetric } from "@/data/projects";

export default function ResultsGrid({ results }: { results: ProjectMetric[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
      {results.map((result, i) => (
        <motion.div
          key={result.label}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="bg-background p-5"
        >
          <div className="font-display font-bold text-2xl text-foreground mb-1">
            {result.value}
          </div>
          <div className="text-sm text-muted mb-2">{result.label}</div>
          {result.proof && (
            <div className="text-xs text-accent italic">{result.proof}</div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
