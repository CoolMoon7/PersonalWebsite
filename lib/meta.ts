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

/** Person and ProfessionalService structured data. No prices, ratings, reviews or street address. */
export function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#cole`,
        name: "Cole Bonawitz",
        url: site.url,
        email: site.email,
        jobTitle: "Founder, AI operations for independent insurance agencies",
        homeLocation: { "@type": "Place", name: "Durham, North Carolina" },
        alumniOf: { "@type": "CollegeOrUniversity", name: "Duke University" },
        sameAs: [site.linkedin, site.github],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#service`,
        name: "Cole Bonawitz: AI department for independent insurance agencies",
        url: site.url,
        description:
          "AI operations for independent insurance agencies: choosing, connecting, running and keeping current the AI tools an agency uses.",
        provider: { "@id": `${site.url}/#cole` },
        areaServed: [
          { "@type": "City", name: "Durham, North Carolina" },
          { "@type": "City", name: "Chapel Hill, North Carolina" },
          { "@type": "AdministrativeArea", name: "The Triangle, North Carolina" },
        ],
        serviceType: [
          "AI readiness audit",
          "AI use policy and approved tools",
          "Team assistant rollout",
          "Certificate of insurance automation",
          "AI receptionist and phones",
          "Renewal review and client email",
          "Commission reconciliation",
          "Custom agents",
          "Integrations and data connections",
        ],
      },
    ],
  };
}
