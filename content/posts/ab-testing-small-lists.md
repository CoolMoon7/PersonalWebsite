---
title: A/B testing cold email when your list is small
summary: 100 sends per variant per week won't give you statistical significance. Here's how to still learn something.
date: 2026-10-07
tags: Testing, Outbound, Sequencing
---

Most A/B testing advice for cold email assumes you're sending tens of thousands of emails a month. Early-stage startups aren't. At Swoop we were sending about **100 emails per variant per week**. Here's how I ran tests at that volume without fooling myself.

## Test one thing at a time, in sequence

With small samples, a multivariate test (subject × opener × CTA × send time) splits your volume into cells too small to say anything. So we ran **sequential** tests:

1. Subject line A vs. B for a week.
2. Keep the winner, then test send timing.
3. Keep that winner, then test the opener.

It's slower, but each result is readable, and the improvements stack.

## Measure replies, not opens

Open tracking is noisy (privacy proxies, image blocking) and it was never the goal anyway. We judged every variant on **reply rate**, and separately on **positive** reply rate, because a subject line that provokes "unsubscribe me" isn't a win.

## Be honest about what small samples can and can't tell you

At 100 sends a variant, a 3% vs. 5% difference is noise. A 6% vs. 15% difference probably isn't. My rule of thumb:

| Difference between variants | What I did |
|---|---|
| Small (< ~2× ) | Keep running it, or call it a tie and test something bigger |
| Large and consistent across 2 weeks | Adopt the winner, move on |
| Large in one week only | Re-run before believing it |

Same thinking in the RiZE Maps hotel outreach: experiments there are 8–12 prospects per strategy, and the success condition is "at least one real buyer conversation," not a percentage. At that size, being honest about the limits *is* the methodology.

## Segment beats copy

The biggest lift didn't come from any copy test. It came from the dashboard showing which **segment** replied. Testing copy on the wrong audience optimizes the wrong thing, so get the targeting right first and then tune the words.

Where we landed: 15% cold reply, 40% warm, 50 booked calls. None of those tests would pass a stats class. They did make the pipeline better every week.
