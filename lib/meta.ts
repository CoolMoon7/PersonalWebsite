import type { Metadata } from "next";
import { site } from "@/data/site";

/** Per-page metadata: unique title and description, canonical URL, Open Graph and Twitter tags. */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url, siteName: site.name, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}
