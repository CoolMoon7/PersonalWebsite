"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type VideoCard = {
  title: string;
  platform: string;
  views: string;
  thumbnail: string;
  link: string;
};

type ProjectRow = {
  id: string;
  label: string;
  stat: string;
  accentColor: string;
  borderColor: string;
  cards: VideoCard[];
};

const rows: ProjectRow[] = [
  {
    id: "rizemaps",
    label: "RizeMaps",
    stat: "5M+ views",
    accentColor: "#10b981",
    borderColor: "#10b98130",
    cards: [
      {
        title: "Viral Product Showcase",
        platform: "TikTok",
        views: "1M+ views",
        thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "F1 Track Art — BTS",
        platform: "TikTok",
        views: "500K+ views",
        thumbnail: "https://images.unsplash.com/photo-1561650071-3cb4f0427a67?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "3D Printing Process",
        platform: "TikTok",
        views: "800K+ views",
        thumbnail: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "Customer Unboxing UGC",
        platform: "Instagram",
        views: "600K+ views",
        thumbnail: "https://images.unsplash.com/photo-1586880244406-556ebe35f282?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "New Drop Announcement",
        platform: "Instagram Reels",
        views: "300K+ views",
        thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "Circuit Timelapse",
        platform: "TikTok",
        views: "900K+ views",
        thumbnail: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
    ],
  },
  {
    id: "momnt",
    label: "Momnt",
    stat: "1M+ views",
    accentColor: "#f59e0b",
    borderColor: "#f59e0b30",
    cards: [
      {
        title: "Founder-Led UGC",
        platform: "Instagram Reels",
        views: "200K+ views",
        thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "NFC Tap Demo",
        platform: "TikTok",
        views: "150K+ views",
        thumbnail: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "Screen Time Hook",
        platform: "TikTok",
        views: "400K+ views",
        thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "Wristband Unboxing",
        platform: "Instagram Reels",
        views: "250K+ views",
        thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "Daily Habit Loop",
        platform: "TikTok",
        views: "180K+ views",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
    ],
  },
  {
    id: "meta-ads",
    label: "Meta Ads",
    stat: "High ROAS",
    accentColor: "#3b82f6",
    borderColor: "#3b82f630",
    cards: [
      {
        title: "RizeMaps Product Ad",
        platform: "Meta Ads",
        views: "3.2x ROAS",
        thumbnail: "https://images.unsplash.com/photo-1561650071-3cb4f0427a67?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "Momnt Problem/Solution",
        platform: "Meta Ads",
        views: "2.8x ROAS",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f2?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "UGC-Style Creative",
        platform: "Meta Ads",
        views: "4.1x ROAS",
        thumbnail: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "Retargeting Creative",
        platform: "Meta Ads",
        views: "5.6x ROAS",
        thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
      {
        title: "Carousel Ad",
        platform: "Meta Ads",
        views: "3.9x ROAS",
        thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80",
        link: "https://instagram.com",
      },
    ],
  },
];

export default function ContentSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="content" className="section-padding bg-[#111] text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-3">
            I don&apos;t just build —{" "}
            <span className="italic text-white/50">I create distribution.</span>
          </h2>
          <div className="w-16 h-px bg-white/20 mt-4 mb-4" />
          <p className="text-white/50 text-lg max-w-2xl">
            5M+ organic views across TikTok and Instagram, plus high-ROAS paid creative across Meta Ads.
          </p>
        </motion.div>

        {/* Project rows */}
        <div className="space-y-14">
          {rows.map((row, rowIndex) => (
            <ProjectRow key={row.id} row={row} rowIndex={rowIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({ row, rowIndex }: { row: ProjectRow; rowIndex: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: rowIndex * 0.1 }}
    >
      {/* Row header */}
      <div className="flex items-baseline gap-4 mb-5">
        <h3 className="font-display font-bold text-xl text-white">{row.label}</h3>
        <div className="h-px flex-1 bg-white/10" />
        <span
          className="text-xs font-semibold px-2.5 py-1 border"
          style={{ color: row.accentColor, borderColor: row.borderColor }}
        >
          {row.stat}
        </span>
      </div>

      {/* Cards — horizontal scroll */}
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 hide-scrollbar snap-x snap-mandatory">
        {row.cards.map((card, i) => (
          <Thumb key={card.title} card={card} index={i} accentColor={row.accentColor} />
        ))}
      </div>
    </motion.div>
  );
}

function Thumb({
  card,
  index,
  accentColor,
}: {
  card: VideoCard;
  index: number;
  accentColor: string;
}) {
  return (
    <motion.a
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="snap-start flex-shrink-0 w-[150px] sm:w-[165px] group block"
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "9/16" }}>
        {/* Thumbnail */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.thumbnail}
          alt={card.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

        {/* Play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div
            className="w-10 h-10 border border-white/40 flex items-center justify-center backdrop-blur-sm"
            style={{ backgroundColor: accentColor + "25" }}
          >
            <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-2.5">
          <p className="text-white text-[11px] font-medium leading-snug mb-1">{card.title}</p>
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10px] text-white/45 truncate">{card.platform}</span>
            <span className="text-[10px] font-semibold flex-shrink-0" style={{ color: accentColor }}>
              {card.views}
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
