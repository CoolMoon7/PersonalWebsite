import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

export type Post = {
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags: string[];
  readingMinutes: number;
  html: string;
};

const DIR = path.join(process.cwd(), "content/posts");

/** Minimal front matter: `key: value` lines between `---` fences; tags are comma-separated. */
function parse(raw: string) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  const meta: Record<string, string> = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
    }
  }
  return { meta, body: m ? m[2] : raw };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { meta, body } = parse(fs.readFileSync(path.join(DIR, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: meta.title ?? f,
        summary: meta.summary ?? "",
        date: meta.date ?? "",
        tags: (meta.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
        readingMinutes: Math.max(1, Math.round(body.split(/\s+/).length / 230)),
        html: marked.parse(body, { async: false }) as string,
      };
    })
    .filter((p) => p.date && !p.date.startsWith("draft"))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export const getPost = (slug: string) => getPosts().find((p) => p.slug === slug);

export function formatDate(d: string) {
  return new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
