This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# PersonalWebsite


## Loom pages: `/loom/[slug]`

A personalised 60 second demo page for one company, rendered on the server with no client JavaScript. The page is not indexed (`noindex, follow`) and revalidates every 60 seconds.

**Content.** One Supabase row per company in table `loom_pages`: `slug`, `content` (jsonb), `status`, `loom_url`, `sent_at`, `replied_at`, `account_count`. `content` follows `schema_version` 1 (company, at least 10 sourced accounts, required `stack`, required `system`, optional dashboard, ask, meta). `stack` is 4 to 10 objects `{name, role}`; plain strings are rejected. `system` is `{where, signal, chain, approval}`: `where` (1 to 4 `{source, detail}`) is shown under the Accounts heading, `signal` appears as "What I watch for", and `chain` (3 to 6 `{step, title, body}`) drives the flow section. `flow` is only a legacy override: when present it wins over `system.chain`, so already-stored rows keep rendering, but it is not required. `outreach` and `script` are optional generator output that the page ignores. `lib/loom.ts` fetches the row over the Supabase REST API with plain `fetch` and checks its shape. A missing, malformed or unreachable row is treated as no content.

**Fallback.** `/loom/sample` always renders the bundled `data/loom/sample.json`, so it works with no environment variables. Any other slug without a valid row returns 404.

**Env vars** (see `.env.local.example`, set the same two in Vercel):

- `SUPABASE_URL`: project URL.
- `SUPABASE_SECRET_KEY`: server-only secret. Never use a `NEXT_PUBLIC_` prefix.
