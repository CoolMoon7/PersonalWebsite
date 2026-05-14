"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CaseStudySection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`mb-16 ${className}`}
    >
      <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
        {title}
      </h2>
      <div className="w-10 h-px bg-border mb-5" />
      {children}
    </motion.div>
  );
}
