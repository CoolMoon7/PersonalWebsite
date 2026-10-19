"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const clean = (s: string | null) => (s ?? "").replace(/[^\p{L}\p{N} &.'-]/gu, "").trim().slice(0, 40);

const cls = "font-mono text-[12px] text-muted hover:text-foreground";

function Inner() {
  const sp = useSearchParams();
  if (sp.get("from") !== "pilot") {
    return (
      <Link href="/#systems" className={cls}>
        ← all systems
      </Link>
    );
  }
  const back = new URLSearchParams();
  const co = clean(sp.get("co"));
  const n = clean(sp.get("n"));
  if (co) back.set("co", co);
  if (n) back.set("n", n);
  const q = back.toString();
  return (
    <Link href={`/pilot${q ? `?${q}` : ""}#proof`} className={cls}>
      ← back to the proposal
    </Link>
  );
}

/** Back link for system pages: returns to /pilot when the visitor came from it, otherwise to the systems list. */
export default function BackLink() {
  return (
    <Suspense
      fallback={
        <Link href="/#systems" className={cls}>
          ← all systems
        </Link>
      }
    >
      <Inner />
    </Suspense>
  );
}
