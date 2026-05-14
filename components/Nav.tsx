"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Content", href: "/#content" },
  { label: "Skills", href: "/#skills" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isHome && href.startsWith("/#")) {
      e.preventDefault();
      const el = document.querySelector(href.replace("/", ""));
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setMobileOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? "bg-background border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display font-bold text-2xl tracking-tight text-foreground hover:text-accent transition-colors"
        >
          <span className="inline-flex items-center justify-center w-12 h-12 bg-background">
            <Image
              src="/images/cblogo.png"
              alt="CB logo"
              width={40}
              height={40}
              className="w-10 h-10 object-contain"
              priority
            />
          </span>
          <span>Cole Bonawitz</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="px-4 py-2 text-sm font-medium text-muted hover:text-foreground transition-colors relative after:absolute after:bottom-1 after:left-4 after:right-4 after:h-px after:bg-foreground after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/Cole_Bonawitz_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift ml-3 px-4 py-2 text-sm font-medium text-accent border border-accent hover:bg-[#3a3a3a] hover:border-[#3a3a3a] hover:text-white transition-colors"
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
              mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-[1.5px] bg-foreground transition-all duration-300 ${
              mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-[72px] left-0 right-0 bg-background border-b border-border px-6 py-6"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-3 text-base font-medium text-muted hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="/Cole_Bonawitz_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-4 py-3 text-base font-medium text-accent border border-accent text-center hover:bg-[#3a3a3a] hover:border-[#3a3a3a] hover:text-white transition-colors"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
