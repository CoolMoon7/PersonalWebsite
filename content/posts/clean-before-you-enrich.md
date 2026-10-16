---
title: Clean before you enrich: the boring step that made our outbound work
summary: 10,000 Clay records became 3,000 qualified accounts. Most of the lift came from pandas, not prompts.
date: 2026-10-14
tags: Clay, Data, Outbound
---

When I started building outbound for Swoop Tutors, the instinct was to go straight to the fun part: enrichment waterfalls, AI-personalized first lines, sequences. The part that actually moved the numbers came before all of that.

## The problem with raw lists

We sourced a little over 10,000 company records in Clay. On paper that's a big top of funnel. In practice it was:

- the same company listed under three name variants,
- domains with and without `www.`, with trailing paths, sometimes just a LinkedIn URL,
- industries that were technically correct and useless for targeting.

If you enrich that list as-is, you pay for duplicate lookups, you email the same person twice from two different rows, and your reply-rate dashboard lies to you because the denominator is inflated.

## What the cleaning step looked like

Nothing fancy. A pandas script and a few SQL queries:

```python
df["domain"] = (df["website"].str.lower()
                .str.replace(r"^https?://(www\.)?", "", regex=True)
                .str.split("/").str[0])
df = df.sort_values("employee_count", ascending=False).drop_duplicates("domain")
```

Then the part that matters: **engineering ICP attributes** that a human would use to decide "is this worth an email?" Size bands instead of raw headcount. Consumer vs. B2B instead of a 40-value industry field. Signals we could actually explain to the founder.

That turned 10,000 rows into **3,000 qualified accounts**. Smaller list, much better list.

## Why it paid off later

Two things happened downstream that I didn't fully expect:

1. **Enrichment got cheaper.** Fewer rows going into the waterfall means fewer credits burned on duplicates and junk.
2. **The dashboard became trustworthy.** Because every account had clean segment attributes, the reply-rate dashboard could break results down by segment. That's how we found smaller consumer-industry accounts converting best, and that changed who we targeted.

We ended up at 15% cold and 40% warm reply rates across 5,000+ prospects. I'd love to credit clever copy. A lot of it was just not emailing the wrong people.

## The takeaway

If your Clay table is the first place your data gets cleaned, it's too late. Put a boring, versioned cleaning step in front of it. Your enrichment budget, your sender reputation and your future self reading the dashboard will all thank you.
