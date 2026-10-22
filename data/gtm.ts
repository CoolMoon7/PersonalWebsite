/** Copy for /gtm, the go-to-market engineering portfolio. */
export const gtm = {
  title: "Cole Bonawitz — GTM Engineer",
  description:
    "GTM engineer building outbound systems with Clay, Python and AI agents. 10,000+ records enriched, 5,000+ prospects sequenced, 15% cold reply rates. Duke CS.",
};

/** Aggregate outputs shown on the homepage. Every number traces to a system below. */
export const telemetry = [
  { value: "10,000+", label: "records enriched + deduped", source: "swoop-outbound" },
  { value: "5,000+", label: "prospects sequenced", source: "swoop-outbound" },
  { value: "15%", label: "cold reply rate", source: "swoop-outbound" },
  { value: "50", label: "meetings booked", source: "swoop-outbound" },
  { value: "$135K", label: "DTC revenue driven", source: "rize-growth" },
  { value: "3M+", label: "organic impressions", source: "rize-growth" },
];

/** The method, drawn as a pipeline on the homepage. */
export const method = [
  { k: "01", title: "Define the ICP", body: "Turn closed-won patterns and interviews into attributes a machine can score." },
  { k: "02", title: "Source + enrich", body: "Clay tables and waterfalls, then Python to dedupe and normalize." },
  { k: "03", title: "Score with agents", body: "LLM agents research and qualify each account against the ICP." },
  { k: "04", title: "Gate", body: "Compliance rules and human approval before anything sends." },
  { k: "05", title: "Sequence", body: "A/B-tested copy and timing, synced to the CRM." },
  { k: "06", title: "Measure + loop", body: "Reply and meeting data feed back into targeting every week." },
];
