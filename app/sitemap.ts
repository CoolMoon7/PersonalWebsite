import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { systems } from "@/data/systems";
import { getPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url },
    { url: `${site.url}/insurance` },
    { url: `${site.url}/writing` },
    ...systems.map((s) => ({ url: `${site.url}/systems/${s.slug}` })),
    ...getPosts().map((p) => ({ url: `${site.url}/writing/${p.slug}`, lastModified: p.date })),
  ];
}
