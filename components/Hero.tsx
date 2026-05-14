"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import MetricCard from "./MetricCard";
import { heroMetrics } from "@/data/metrics";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 w-full pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left: Photo with extending grid lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Extending lines — horizontal */}
            <div className="absolute top-0 -left-12 -right-12 h-px bg-border" />
            <div className="absolute bottom-0 -left-12 -right-12 h-px bg-border" />
            {/* Extending lines — vertical */}
            <div className="absolute -top-8 left-0 w-px h-[calc(100%+4rem)] bg-border" />
            <div className="absolute -top-8 right-0 w-px h-[calc(100%+4rem)] bg-border" />

            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/coletalking.png"
                alt="Cole Bonawitz speaking"
                fill
                className="object-cover object-center"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </motion.div>

          {/* Right: Header + metrics */}
          <div className="flex flex-col justify-center">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-[3.2rem] leading-[1.08] tracking-tight text-foreground mb-5">
                I build, launch,
                <br />
                and grow{" "}
                <span className="italic">startups.</span>
              </h1>

              <p className="text-base text-muted leading-relaxed max-w-md mb-6">
                — Cole Bonawitz. Duke CS student and startup operator.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
                >
                  Explore Work
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            </motion.div>

            {/* Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted mb-3">
                Selected Metrics
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-border">
                {heroMetrics.slice(0, 6).map((metric, i) => (
                  <MetricCard key={metric.label} metric={metric} index={i} />
                ))}
              </div>
            </motion.div>

            {/* Bottom buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="hidden sm:flex items-center gap-3 mt-8"
            >
              <a
                href="#contact"
                className="hover-lift px-5 py-2 border border-border text-foreground text-xs font-medium"
              >
                Contact
              </a>
              <a
                href="/Cole_Bonawitz_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift px-5 py-2 border border-border text-muted text-xs font-medium"
              >
                Resume
              </a>
              <a
                href="https://linkedin.com/in/colebonawitz"
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift px-5 py-2 border border-border text-muted text-xs font-medium"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex items-center gap-3 mt-12"
        >
          <span className="text-[11px] uppercase tracking-[0.15em] text-muted">
            Scroll Down
          </span>
          <span className="text-muted text-sm">&#8595;</span>
        </motion.div>
      </div>

      {/* Mobile: bottom bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border px-6 py-3 flex gap-2 z-40">
        <a href="#contact" className="flex-1 py-2 border border-border text-foreground text-xs font-medium text-center">
          Contact
        </a>
        <a href="/Cole_Bonawitz_Resume.pdf" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 border border-border text-muted text-xs font-medium text-center">
          Resume
        </a>
      </div>
    </section>
  );
}
