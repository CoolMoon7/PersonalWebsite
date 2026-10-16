# colebonawitz.com — rebuild plan

**Who it's for:** founders who click the link in a cold email and give it about 20 seconds.
**What they should conclude:** "He builds real GTM systems, he measures them, and he's current."

## Positioning
- Title: **GTM Engineer — outbound systems, enrichment, and AI agents.**
- Every project is presented as a **system**: inputs → pipeline → outputs. The numbers are framed as what the system produced, not as personal brag stats.
- Proof order: Swoop Tutors outbound engine (the flagship), then RiZE Maps hospitality outbound, the RiZE Maps growth engine, the Founder Outreach Engine and Momnt retention. Space is reserved for audits and client engagements.

## Visual system
- White, minimal and technical, closer to Linear, Vercel or Resend than a startup pitch deck.
- Type: Geist Sans for prose and headlines, Geist Mono for labels, data, logs and metadata.
- Color: near-black ink on white, zinc grays, a single accent (signal blue `#2F5BFF`) for flow and focus, and a green dot for "live" status. No gradients except on agent nodes.
- Background: a faint dot grid drifting slowly, masked with a radial fade. It is pure CSS and switches off when the visitor prefers reduced motion.
- Hairline borders (`#ececec`), 12px radius, no heavy shadows.
- Tool logos: monochrome at rest; full color on hover.

## Signature component: `<Workflow>`
One data-driven DAG renderer shared by every project, so the whole site speaks one visual language.
- **Node kinds:** `source`, `tool`, `agent`, `gate` (human or compliance), `output`.
  - Each node shows a logo, a label and a mono subtitle (e.g. `enrich · waterfall`).
  - Agent nodes get an animated gradient ring.
  - Gate nodes get a dashed border.
- **Edges:** SVG curves with packets traveling along them (`<animateMotion>`). Nodes light up in sequence like a live run.
- Pure SVG/CSS, server-rendered, **zero JavaScript**. On mobile it becomes a vertical step list.
- Each system page pairs the canvas with a **run summary funnel** (stage counts) and a **run log** in a terminal style.

## Information architecture
- `/`
  - hero with a live flagship workflow
  - tool-logo rail
  - system telemetry (aggregate outputs)
  - systems grid with mini workflows
  - how I build (method as a pipeline)
  - writing
  - about (photo)
  - contact CTA
- `/systems/[slug]`
  - header, status and stack
  - workflow canvas
  - run summary funnel
  - problem, architecture, decisions, results, next
  - run log
  - next system
- `/writing` and `/writing/[slug]`: Markdown posts in `content/posts`, rendered at build time.
- The photo is a small avatar in the hero next to the name, plus the full image in About.

## Speed
- Fully static (SSG), server components only. The only client JS is the mobile nav toggle.
- framer-motion removed. Animation is CSS/SVG only.
- `next/font` (Geist) with no layout shift; `next/image` for the photo.
- Logos are inline SVG (simple-icons, tree-shaken at build) or tiny local PNGs.

## Domain
- Set `metadataBase` to `https://colebonawitz.com`.
- Add `colebonawitz.com` and `www` in the Vercel project.
- In Cloudflare DNS:
  - `A @ → 76.76.21.21`
  - `CNAME www → cname.vercel-dns.com`
  - proxy set to **DNS only** (grey cloud)

## Adding new work later
- New system: add one object to `data/systems.ts` (nodes, edges, funnel and metrics). The page, card and diagram generate themselves.
- New post: add one `.md` file to `content/posts`.
