import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/contact";
import { intents } from "@/lib/contact-options";
import { services } from "@/content/services";
import { site } from "@/data/site";

const MIN_FILL_MS = 3000;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
/** In-memory, per server instance. Good enough to stop casual abuse; swap for a shared store if traffic grows. */
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const nameOf = (slug: string) => services.find((s) => s.slug === slug)?.name ?? "Not sure";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  if (limited(ip)) return NextResponse.json({ ok: false, error: "Too many requests. Please email me directly." }, { status: 429 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    const b = body as { website?: string };
    // A filled honeypot looks like success so bots learn nothing.
    if (b && typeof b.website === "string" && b.website.length > 0) return NextResponse.json({ ok: true });
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) errors[String(i.path[0])] ??= i.message;
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }
  const d = parsed.data;
  if (Date.now() - d.startedAt < MIN_FILL_MS) return NextResponse.json({ ok: true });

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !from) return NextResponse.json({ ok: false, fallback: true }, { status: 503 });

  const intent = intents.find((i) => i.value === d.intent)!;
  const lines = [
    `Intent: ${intent.label}`,
    `Name: ${d.name}`,
    `Agency: ${d.agency}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "-"}`,
    `Role: ${d.role ?? "-"}`,
    `Team size: ${d.teamSize ?? "-"}`,
    `Management system: ${d.ams ?? "-"}`,
    `Lines: ${d.lines.join(", ") || "-"}`,
    `Most time today: ${d.timeSinks.map(nameOf).join(", ") || "-"}`,
    `Interested in: ${d.interested.map(nameOf).join(", ") || "-"}`,
    "",
    d.message || "(no message)",
  ];
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_TO_EMAIL || site.email],
      reply_to: d.email,
      subject: `${intent.label}: ${d.agency}`,
      text: lines.join("\n"),
    }),
  });
  if (!res.ok) return NextResponse.json({ ok: false, fallback: true }, { status: 502 });
  return NextResponse.json({ ok: true });
}
