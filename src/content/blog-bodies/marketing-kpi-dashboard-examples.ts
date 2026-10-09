/** Blog body: Marketing KPI Dashboard: 25 KPIs for GA4, Search Console & Ads */
export const marketing_kpi_dashboard_examplesBody = `
**Quick answer:** A good marketing KPI dashboard tracks 6–10 KPIs that tie directly to business outcomes, each with a target, a direction (increase or decrease) and a clear status. Start with these 8: sessions, key events, conversion rate, organic clicks, non-branded clicks, ad spend, cost per conversion and ROAS. Add the rest from the 25 below only when a stakeholder will act on them.

Most dashboards fail for one of two reasons. Either they show every metric available, so nobody knows what matters, or they show numbers without targets, so nobody knows whether a number is good. This guide gives you 25 marketing KPI examples across GA4, Google Search Console and Google Ads, with formulas and data sources. It explains how to set targets clients won't dispute and how to lay out a marketing KPI dashboard people actually check.

## What makes a marketing KPI dashboard useful

A metric becomes a KPI when it has three things:

1. **A target** — a number to hit by a date.
2. **A direction** — some KPIs should go up (conversions), others down (cost per conversion, bounce rate).
3. **A status** — On track, At risk, Off track or No data, scored the same way every month.

Without these, a marketing KPI dashboard is just a report. With them, it becomes a decision tool.

## The 8 KPIs most clients need

| KPI | Source | Direction | Why it matters |
| --- | --- | --- | --- |
| Sessions | GA4 | Increase | Overall reach to the site |
| Key events | GA4 | Increase | The actions that create revenue |
| Conversion rate | GA4 | Increase | Efficiency of traffic |
| Organic clicks | Search Console | Increase | SEO demand captured |
| Non-branded clicks | Search Console | Increase | SEO growth beyond existing brand demand |
| Ad spend | Google Ads | Within budget | Pacing control |
| Cost per conversion | Google Ads | Decrease | Paid efficiency |
| ROAS | Google Ads | Increase | Paid return |

## GA4 KPIs (8)

| # | KPI | Formula / definition |
| --- | --- | --- |
| 1 | Sessions | Count of sessions started in the period |
| 2 | Users / active users | Distinct users; GA4 "active users" is the default user metric in most reports |
| 3 | Engagement rate | Engaged sessions ÷ sessions |
| 4 | Bounce rate | 1 − engagement rate (in GA4, the inverse of engagement rate) |
| 5 | Key events | Count of events marked as key events (GA4's term for conversions) |
| 6 | Session key event rate | Sessions with a key event ÷ sessions |
| 7 | Revenue | Purchase revenue (ecommerce) or assigned value of key events |
| 8 | Revenue per session | Revenue ÷ sessions |

GA4 KPIs tell you what happened on the site. They don't tell you why demand changed — that is where Search Console comes in.

## Search Console KPIs — SEO KPIs (7)

| # | KPI | Formula / definition |
| --- | --- | --- |
| 9 | Organic clicks | Clicks from Google Search |
| 10 | Impressions | Times your pages appeared in results |
| 11 | CTR | Clicks ÷ impressions |
| 12 | Average position | Mean ranking position across impressions |
| 13 | Non-branded clicks | Clicks from queries that don't contain the brand name |
| 14 | Keywords in top 10 | Count of tracked queries with average position ≤ 10 |
| 15 | Indexed pages | Pages reported as indexed in the Page indexing report |

These SEO KPIs now need careful reading. AI Overviews can push impressions up while clicks fall. If you see that pattern, read [impressions up, clicks down: how to explain AI Overviews to clients](/resources/blogs/impressions-up-clicks-down-ai-overviews).

## Google Ads KPIs — PPC KPIs (7)

| # | KPI | Formula / definition |
| --- | --- | --- |
| 16 | Ad spend | Total cost in the period |
| 17 | Paid clicks | Clicks on ads |
| 18 | CPC | Cost ÷ clicks |
| 19 | Ads CTR | Clicks ÷ impressions |
| 20 | Ads conversions | Conversions recorded in Google Ads |
| 21 | Cost per conversion (CPA) | Cost ÷ conversions |
| 22 | ROAS | Conversion value ÷ cost |

Google Ads and GA4 often report different conversion numbers. Pick one source of truth per KPI and say which on the dashboard. Our post on [why Google Ads and GA4 disagree on conversions](/resources/blogs/google-ads-ga4-conversion-discrepancy) explains why.

## New KPIs for AI search (3)

Search is changing, and a modern marketing KPI dashboard should reflect it:

| # | KPI | How to measure |
| --- | --- | --- |
| 23 | AI assistant referral sessions | GA4 custom channel group for chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai |
| 24 | AI assistant key events | Key events from that channel group |
| 25 | AI Overview citations | Manual or tool-based checks of whether your pages are cited for priority queries |

Set these up using our guide to [tracking AI assistant traffic in GA4](/resources/blogs/tracking-ai-assistant-traffic-ga4).

## How to set marketing KPI targets

Targets cause more client arguments than results do. Use these rules:

1. **Start from your own baseline.** Use the last 6–12 months, not industry averages. Generic "good CTR" benchmarks vary too much by query type and industry to be fair targets.
2. **Adjust for seasonality.** Compare to the same period last year, not just last month.
3. **Set a direction and a threshold.** For example, "Increase organic clicks by 10% vs the same month last year."
4. **Define At risk.** Decide in advance — for example, within 10% of the target counts as At risk rather than Off track.
5. **Agree the rules before the month starts.** Status should be calculated, not argued.

Our full method is in [setting KPI targets clients won't dispute](/resources/blogs/marketing-kpi-targets-goal-setting).

### Rules-based vs AI-scored status

Some tools let AI decide whether a KPI is "healthy." That's convenient but inconsistent: the same numbers can get different labels on different days. Rules-based scoring gives the same status for the same inputs every time, which clients trust more. We compare the two in [rules-based vs AI-scored KPI status](/resources/blogs/rules-based-vs-ai-kpi-status).

## Marketing KPI dashboard layout

Use one screen, top to bottom:

1. **Status summary row** — counts of On track / At risk / Off track.
2. **Outcome KPIs** — key events, revenue, ROAS.
3. **Channel KPIs** — organic (GSC), paid (Ads), site (GA4), one column each.
4. **Trend panel** — six months of history for each KPI so you can spot slow slides early.
5. **Notes** — one line per Off track KPI explaining the cause and the fix.

Keep it to 6–10 KPIs per client. If a KPI doesn't change a decision, remove it.

## KPI dashboard template

Copy this structure into a spreadsheet or your reporting tool:

| KPI | Source | Direction | Target | This month | Status | Note |
| --- | --- | --- | --- | --- | --- | --- |
| Key events | GA4 | Increase | +10% YoY | | | |
| Session key event rate | GA4 | Increase | ≥ last-year rate | | | |
| Organic clicks | GSC | Increase | +8% YoY | | | |
| Non-branded clicks | GSC | Increase | +12% YoY | | | |
| Keywords in top 10 | GSC | Increase | 40 of 100 tracked | | | |
| Ad spend | Ads | Within budget | ±5% of plan | | | |
| Cost per conversion | Ads | Decrease | −10% vs last quarter | | | |
| ROAS | Ads | Increase | ≥ 4.0× | | | |

The targets shown are examples only. Set yours from each client's own baseline.

## Automate your marketing KPI dashboard

Updating a spreadsheet every month is error-prone. [Conalytic KPIs Tracker](/products/kpis-tracker) connects GA4, Search Console and Google Ads with read-only OAuth. You set increase or decrease targets with percentage thresholds, and every KPI shows On track, At risk, Off track or No data. Scoring is rules-based, not AI-generated. New projects backfill six months of history, evaluation runs on the 1st of each month, and you can track up to 300 Search Console keyword ranking goals per project. KPIs Tracker doesn't consume AI tokens.

## Frequently asked questions
### What are the most important marketing KPIs?

For most businesses: key events (conversions), conversion rate, organic clicks, non-branded clicks, cost per conversion and ROAS. These connect directly to revenue.

### How many KPIs should a marketing KPI dashboard have?

Six to ten per client or stakeholder. More than that and the important signals get lost.

### What's a good CTR or conversion rate?

It depends heavily on industry, query type and offer. Use the client's own 6–12-month baseline as the benchmark rather than a generic average.

### What's the difference between a metric and a KPI?

A metric is any number you can measure. A KPI is a metric with a target, a direction and an owner, chosen because it reflects a business goal.

### How often should KPIs be reviewed?

Monthly for most client work, with weekly checks on spend and pacing for paid campaigns.

## Track these KPIs automatically

Set up a rules-based marketing KPI dashboard for GA4, Search Console and Google Ads in minutes, with six months of history on day one.

**[Start tracking KPIs free →](https://chat.conalytic.com/signup)** · [See KPIs Tracker](/products/kpis-tracker)
`;
