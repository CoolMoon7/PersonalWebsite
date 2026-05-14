"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import type { ProjectMedia } from "@/data/projects";

export default function MediaGallery({ media }: { media: ProjectMedia[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  if (!media.length) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <h2 className="font-display font-bold text-2xl md:text-3xl text-foreground mb-2">
        Media
      </h2>
      <div className="w-10 h-px bg-border mb-5" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
        {media.map((item, i) => (
          <motion.div
            key={item.alt}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="bg-background group"
          >
            <div className="relative aspect-video">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border border-white/60 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className="px-3 py-2">
              <p className="text-xs text-muted truncate">{item.alt}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
