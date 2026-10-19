"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * The /pilot page can be sent as /pilot?co=Acme&n=Jane so it reads as written for one business.
 * Values come from the URL, so they are reduced to a short, plain-text name and never trusted as markup.
 */
const clean = (s: string | null) => (s ?? "").replace(/[^\p{L}\p{N} &.'-]/gu, "").trim().slice(0, 40);

function useWho() {
  const sp = useSearchParams();
  return { co: clean(sp.get("co")), n: clean(sp.get("n")) };
}

function CoInner({ fallback }: { fallback: string }) {
  return <>{useWho().co || fallback}</>;
}

/** The company name from the link, or `fallback`. */
export function Co({ fallback }: { fallback: string }) {
  return (
    <Suspense fallback={fallback}>
      <CoInner fallback={fallback} />
    </Suspense>
  );
}

function GreetingInner() {
  const { n } = useWho();
  return <>{n ? `Hi ${n}, ` : ""}</>;
}

/** "Hi Jane, " when the link has a name, nothing otherwise. */
export function Greeting() {
  return (
    <Suspense fallback={null}>
      <GreetingInner />
    </Suspense>
  );
}

function carry(sp: URLSearchParams) {
  const out = new URLSearchParams({ from: "pilot" });
  const co = clean(sp.get("co"));
  const n = clean(sp.get("n"));
  if (co) out.set("co", co);
  if (n) out.set("n", n);
  return out.toString();
}

function PilotLinkInner({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const sp = useSearchParams();
  return (
    <Link href={`${href}?${carry(sp)}`} className={className}>
      {children}
    </Link>
  );
}

/** A link to another page on the site that remembers this is the pilot page, so "back" returns here. */
export function PilotLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <Link href={`${href}?from=pilot`} className={className}>
          {children}
        </Link>
      }
    >
      <PilotLinkInner href={href} className={className}>
        {children}
      </PilotLinkInner>
    </Suspense>
  );
}

function RequestInner({ email, subject, body, className, children }: RequestProps) {
  const { co } = useWho();
  const s = co ? `${subject}: ${co}` : subject;
  return (
    <a href={`mailto:${email}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(body)}`} className={className}>
      {children}
    </a>
  );
}

type RequestProps = { email: string; subject: string; body: string; className?: string; children: React.ReactNode };

/** A mailto button whose subject carries the company name when the link has one. */
export function RequestLink(props: RequestProps) {
  return (
    <Suspense
      fallback={
        <a href={`mailto:${props.email}?subject=${encodeURIComponent(props.subject)}&body=${encodeURIComponent(props.body)}`} className={props.className}>
          {props.children}
        </a>
      }
    >
      <RequestInner {...props} />
    </Suspense>
  );
}
