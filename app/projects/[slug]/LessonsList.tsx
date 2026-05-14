"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function LessonsList({ lessons }: { lessons: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-4">
      {lessons.map((lesson, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -15 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.08 }}
          className="flex gap-4 items-start"
        >
          <div className="mt-2 w-2 h-2 bg-accent flex-shrink-0" />
          <p className="text-muted leading-relaxed">{lesson}</p>
        </motion.div>
      ))}
    </div>
  );
}
