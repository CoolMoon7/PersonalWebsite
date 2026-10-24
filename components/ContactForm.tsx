"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { services } from "@/content/services";
import { site } from "@/data/site";
import {
  amsOptions, contactSchema, intents, lines, NOT_SURE, roles, teamSizes, type Intent,
} from "@/lib/contact";

type Errors = Record<string, string>;
type Status = "idle" | "sending" | "done" | "fallback";

const FIELD = "w-full min-h-[44px] rounded-[10px] border border-line-2 bg-white px-3 text-[15px] focus:border-accent";
const LABEL = "block text-[14px] font-medium mb-1.5";

function Checks({ name, legend, options, value, onChange }: {
  name: string; legend: string; options: { value: string; label: string }[]; value: string[]; onChange: (v: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className={LABEL}>{legend}</legend>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
        {options.map((o) => (
          <label key={o.value} className="flex items-start gap-3 min-h-[44px] py-2 text-[14.5px] cursor-pointer">
            <input
              type="checkbox"
              name={name}
              className="mt-1 w-4 h-4 accent-[#2f5bff]"
              checked={value.includes(o.value)}
              onChange={(e) => onChange(e.target.checked ? [...value, o.value] : value.filter((v) => v !== o.value))}
            />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function ContactForm() {
  const params = useSearchParams();
  const initialIntent = (intents.find((i) => i.value === params.get("intent"))?.value ?? "audit") as Intent;
  const preService = params.get("service");

  const [intent, setIntent] = useState<Intent>(initialIntent);
  const [form, setForm] = useState({
    name: "", agency: "", email: "", phone: "", role: "", teamSize: "", ams: "", message: "", website: "",
  });
  const [lineSel, setLineSel] = useState<string[]>([]);
  const [timeSinks, setTimeSinks] = useState<string[]>([]);
  const [interested, setInterested] = useState<string[]>(
    preService && services.some((s) => s.slug === preService) ? [preService] : [],
  );
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(0);
  const summary = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const serviceOptions = useMemo(
    () => [...services.map((s) => ({ value: s.slug, label: s.name })), { value: NOT_SURE, label: "Not sure" }],
    [],
  );
  const submitLabel = intents.find((i) => i.value === intent)!.submit;
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const mailto = () => {
    const body = `Name: ${form.name}\nAgency: ${form.agency}\nEmail: ${form.email}\n\n${form.message}`;
    return `mailto:${site.email}?subject=${encodeURIComponent(`${intents.find((i) => i.value === intent)!.label}: ${form.agency}`)}&body=${encodeURIComponent(body)}`;
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      intent,
      ...form,
      role: form.role || undefined,
      teamSize: form.teamSize || undefined,
      ams: form.ams || undefined,
      lines: lineSel,
      timeSinks,
      interested: intent === "quote" ? interested : [],
      startedAt: startedAt.current,
    };
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const next: Errors = {};
      for (const i of parsed.error.issues) next[String(i.path[0])] ??= i.message;
      setErrors(next);
      requestAnimationFrame(() => summary.current?.focus());
      return;
    }
    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) setStatus("done");
      else if (data.errors) { setErrors(data.errors); setStatus("idle"); }
      else if (res.status === 429) { setErrors({ form: data.error }); setStatus("idle"); }
      else setStatus("fallback");
    } catch {
      setStatus("fallback");
    }
  }

  if (status === "done") {
    return (
      <div className="panel p-6 sm:p-8" role="status">
        <h2 className="text-[24px] font-semibold tracking-[-0.03em]">Thanks.</h2>
        {/* TODO(Cole): confirm the next-business-day reply promise before shipping, or reword it. */}
        <p className="text-[15.5px] text-ink-2 leading-relaxed mt-3 max-w-xl">
          I&apos;ll reply by the next business day. Before we talk I&apos;ll read your website and think about your carriers.
        </p>
        <p className="text-[14.5px] text-muted mt-4">
          Prefer to write directly? <a className="text-accent underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    );
  }

  if (status === "fallback") {
    return (
      <div className="panel p-6 sm:p-8" role="alert">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em]">The form couldn&apos;t send right now.</h2>
        <p className="text-[15px] text-ink-2 leading-relaxed mt-3 max-w-xl">Your message isn&apos;t lost. Open it as an email instead:</p>
        <a href={mailto()} className="btn btn-dark mt-5">Email {site.email}</a>
      </div>
    );
  }

  const errorKeys = Object.keys(errors);
  const err = (k: string) => (errors[k] ? <p id={`${k}-err`} className="text-[13px] text-red-700 mt-1.5">{errors[k]}</p> : null);
  const inv = (k: string) => ({ "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `${k}-err` : undefined });

  return (
    <form id="contact-form" onSubmit={onSubmit} noValidate className="panel p-5 sm:p-8 space-y-6" onFocus={() => {
    }}>
      <div ref={summary} tabIndex={-1} role="alert" aria-live="assertive" className="outline-none">
        {errorKeys.length > 0 && (
          <p className="text-[14px] text-red-700 border border-red-200 bg-red-50 rounded-[10px] px-3 py-2.5">
            {errors.form ?? `Please fix ${errorKeys.length === 1 ? "1 field" : `${errorKeys.length} fields`} below.`}
          </p>
        )}
      </div>

      <fieldset>
        <legend className={LABEL}>What would you like to do?</legend>
        <div className="flex flex-wrap gap-2">
          {intents.map((i) => (
            <label key={i.value} className={`chip !h-11 !px-4 cursor-pointer !text-[13px] has-[:checked]:!border-accent has-[:checked]:text-accent has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-accent`}>
              <input type="radio" name="intent" className="sr-only" checked={intent === i.value} onChange={() => setIntent(i.value)} />
              {i.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={LABEL}>Name</label>
          <input id="name" className={FIELD} autoComplete="name" required value={form.name} onChange={set("name")} {...inv("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="agency" className={LABEL}>Agency name</label>
          <input id="agency" className={FIELD} autoComplete="organization" required value={form.agency} onChange={set("agency")} {...inv("agency")} />
          {err("agency")}
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>Work email</label>
          <input id="email" type="email" className={FIELD} autoComplete="email" required value={form.email} onChange={set("email")} {...inv("email")} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="phone" className={LABEL}>Phone <span className="text-muted font-normal">(optional)</span></label>
          <input id="phone" type="tel" className={FIELD} autoComplete="tel" value={form.phone} onChange={set("phone")} />
        </div>
        <div>
          <label htmlFor="role" className={LABEL}>Your role</label>
          <select id="role" className={FIELD} value={form.role} onChange={set("role")}>
            <option value="">Select</option>
            {roles.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="teamSize" className={LABEL}>Team size</label>
          <select id="teamSize" className={FIELD} value={form.teamSize} onChange={set("teamSize")}>
            <option value="">Select</option>
            {teamSizes.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="ams" className={LABEL}>Management system</label>
          <select id="ams" className={FIELD} value={form.ams} onChange={set("ams")}>
            <option value="">Select</option>
            {amsOptions.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <Checks name="lines" legend="Lines you write" options={lines.map((l) => ({ value: l, label: l }))} value={lineSel} onChange={setLineSel} />
      <Checks name="timeSinks" legend="What takes the most time today" options={serviceOptions} value={timeSinks} onChange={setTimeSinks} />
      {intent === "quote" && (
        <Checks name="interested" legend="Services you're interested in" options={serviceOptions} value={interested} onChange={setInterested} />
      )}

      <div>
        <label htmlFor="message" className={LABEL}>Anything else <span className="text-muted font-normal">(optional)</span></label>
        <textarea id="message" rows={5} maxLength={1000} className={`${FIELD} py-2.5`} value={form.message} onChange={set("message")} {...inv("message")} />
        <p className="text-[13px] text-muted mt-1.5">Please don&apos;t include client names, policy numbers or other client data.</p>
        {err("message")}
      </div>

      {/* Honeypot: hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} /></label>
      </div>

      <div>
        <button type="submit" disabled={status === "sending"} className="btn btn-dark !h-11 disabled:opacity-60">
          {status === "sending" ? "Sending…" : submitLabel}
        </button>
        <p className="font-mono text-[11.5px] text-muted mt-3">I&apos;ll read your website before we talk. If it isn&apos;t a fit, I&apos;ll say so.</p>
      </div>
    </form>
  );
}
