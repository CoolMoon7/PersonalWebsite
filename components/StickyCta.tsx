"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { siteMode } from "@/data/site";
import { cta } from "@/data/home";
import { Arrow } from "@/components/ui";

/** Slim bottom bar on phones. Hides while the contact form is on screen. */
export default function StickyCta() {
  const path = usePathname();
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("contact-form");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setFormVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, [path]);

  if (siteMode(path) !== "insurance" || (path === "/contact" && formVisible)) return null;
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-white/90 backdrop-blur-xl px-4 py-3">
      <Link href={cta.audit.href} className="btn btn-dark w-full justify-center !h-11">
        {cta.audit.label} <Arrow />
      </Link>
    </div>
  );
}
