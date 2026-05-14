"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Metric } from "@/data/metrics";

function useCounter(target: number, duration = 1800, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, shouldStart]);

  return count;
}

function formatNumber(n: number): string {
  if (n >= 1000) {
    return n.toLocaleString();
  }
  return n.toString();
}

export default function MetricCard({
  metric,
  index,
}: {
  metric: Metric;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const count = useCounter(metric.numericValue, 1800, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-background p-5"
    >
      <div className="font-display font-bold text-2xl md:text-3xl text-foreground">
        {metric.prefix || ""}
        {formatNumber(count)}
        {metric.suffix || ""}
      </div>
      <div className="mt-1 text-xs text-muted leading-snug uppercase tracking-wide">
        {metric.label}
      </div>
    </motion.div>
  );
}
