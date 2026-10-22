---
title: Human-in-the-loop by default: how I gate AI-drafted outbound
summary: The agent drafts and a person approves. Here are the guardrails I put between an LLM and a prospect's inbox.
date: 2026-10-16
tags: AI Agents, Guardrails, Outbound
---

It's never been easier to build an agent that researches a prospect, writes an email and sends it. For high-value B2B lists it's also never been easier to burn a relationship at machine speed.

For RiZE Maps' hotel outreach (selling F1 track art to hotels in race cities like Las Vegas and Austin), I built the system **draft-only**. The AI does the research-heavy writing and a human approves every send. Here's the structure.

## 1. Hard rules run before the model

Some decisions shouldn't be up to an LLM at all, so they're plain code that runs first:

- **Do-not-contact** flags are absolute.
- **Prior relationships.** If a resort group already reached out to us (say, a gifting inquiry), the cold engine skips it and routes it to a warm follow-up instead.
- **Market scope.** International markets are blocked until legal review clears them.
- **Required config.** No sender identity, postal address or opt-out line means no draft.

## 2. One tested format, not free-form generation

The model writes inside a fixed structure, the "CONCEPT" first touch, with property-specific detail filled in. That keeps quality consistent, and it means A/B tests between strategies measure the strategy, not random variation in what the model felt like writing.

The rule I care most about is **no fake relevance**. If the system can't find something true and specific about the property, it doesn't invent a reason.

## 3. A queue, not a send button

Drafts land in an approval queue. Approving one is an explicit command tied to a named person:

```bash
python engine.py ob-queue
python engine.py ob-approve 14 --user cole
```

The test suite checks the property I care about most: **nothing reaches send-ready without an approval.**

## 4. Timing as a trigger

The race calendar decides when each market enters the queue, so outreach lands when hotels are actually planning race-week guest experiences. Good timing beats more volume.

## When to remove the human

Not never, just not first. Once a strategy has a track record (reply quality, zero complaints, a meaningful sample), it can earn auto-send for the lowest-risk segment. Autonomy is something a workflow earns with data. It shouldn't be the default.
