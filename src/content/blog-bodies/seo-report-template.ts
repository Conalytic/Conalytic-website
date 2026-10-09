/** Blog body: Monthly SEO Report Template for Clients (12-Slide Structure) */
export const seo_report_templateBody = `
**Quick answer:** A good monthly SEO report answers three questions in order: what happened, why, and what we'll do next. Use a 12-slide SEO report template: cover, contents, executive summary, health check, KPI snapshot, organic traffic (GA4), search performance (Search Console), keywords and pages, AI search visibility, findings, action plan, and methodology. Lead with the decision, not the data source.

Most SEO reports are ordered by tool: a GA4 section, a Search Console section, a rank-tracker section. Clients read the first page and skip the rest. This SEO report template is ordered by decision instead. It starts with what the client needs to know and ends with what happens next, with the evidence in between. Below you'll find each slide, what to put on it, commentary examples, and the AI search metrics most older templates miss.

## What a client SEO report must answer

Every monthly SEO report should answer:

1. **Did organic search grow this month?** In clicks, visibility and conversions.
2. **Why did it change?** Rankings, demand, seasonality, AI Overviews or tracking.
3. **Is the work on track?** Against the targets agreed at the start.
4. **What happens next?** Specific actions, owners and dates.

If a slide doesn't help answer one of these, cut it.

## The 12-slide SEO report template

| # | Slide | What goes on it |
| --- | --- | --- |
| 1 | Cover | Client name, report title, date range, comparison period |
| 2 | Contents | The sections below, so stakeholders can jump |
| 3 | Executive summary | 3–5 bullets: headline result, cause, next priority |
| 4 | Health check | Indexing, Core Web Vitals, crawl errors — green/amber/red |
| 5 | KPI snapshot | 6–8 KPIs with target, actual and status |
| 6 | Organic traffic (GA4) | Organic sessions, key events, conversion rate, top landing pages |
| 7 | Search performance (GSC) | Clicks, impressions, CTR, average position — month and year over year |
| 8 | Keywords and pages | Movers up and down, quick wins in positions 8–20 |
| 9 | AI search visibility | AI Overview citations, AI assistant referrals, branded demand |
| 10 | Findings | 3 cross-source insights that connect GSC, GA4 and content |
| 11 | Action plan | Prioritised next steps with owner and due date |
| 12 | Methodology | Date range, properties in scope, definitions, data caveats |

It follows the same decision-first approach as the default deck in Conalytic's [Report Builder](/products/report-builder). We explain the reasoning in [the structure of a client report that gets read](/resources/blogs/client-marketing-report-structure).

## Slide-by-slide guidance

### Slide 3: Executive summary

Write it last, and keep it under 80 words. Example:

> Organic key events rose 14% year on year, driven by three service pages now ranking in the top 5. Clicks fell 6% while impressions rose 22%, as AI Overviews answered more informational queries. Next month we're rewriting the five highest-impression guides for citability and launching two commercial pages.

### Slide 4: Health check

Show only what changed or needs action: indexing issues, Core Web Vitals status, new crawl errors, sitemap warnings. If everything is green, say so in one line.

### Slide 5: KPI snapshot

Show 6–8 KPIs with target, actual, and a status label: On track, At risk, Off track or No data. Use the same rules every month so status is never debated. See our [marketing KPI dashboard guide](/resources/blogs/marketing-kpi-dashboard-examples) for 25 KPI definitions.

### Slides 6–7: GA4 and Search Console

Show GA4 and Search Console side by side, not in separate chapters. When they disagree, explain why — for example, GSC clicks steady but GA4 organic down usually points to a tracking or channel-grouping issue. Read [why GA4 traffic dropped but Search Console didn't](/resources/blogs/ga4-traffic-drop-search-console) and [reading GSC, GA4 and Google Ads together](/resources/blogs/cross-channel-reporting-gsc-ga4-ads).

### Slide 8: Keywords and pages

Include:
- Top 5 queries gained and lost (clicks change).
- Quick wins: queries in positions 8–20 with high impressions.
- Pages with high impressions but CTR under 1% — title and description rewrites.

### Slide 9: AI search visibility (new for 2026)

This is the slide most SEO report templates are missing. Include:
- **AI Overview citations** — are the client's pages cited for priority queries?
- **AI assistant referrals** — sessions and key events from ChatGPT, Perplexity, Gemini, Copilot and Claude ([setup guide](/resources/blogs/tracking-ai-assistant-traffic-ga4)).
- **Branded search clicks** — brand demand that AI answers rarely intercept.

If the client is seeing impressions rise while clicks fall, this slide explains it. Our guide on [impressions up, clicks down](/resources/blogs/impressions-up-clicks-down-ai-overviews) includes a client script.

### Slide 10: Findings

Three insights that connect sources. For example: "The 4 pages that lost the most clicks also lost 60% of their key events, so the CTR drop is costing leads, not just traffic."

### Slide 11: Action plan

| Action | Why | Owner | Due |
| --- | --- | --- | --- |
| Rewrite titles on 6 high-impression, low-CTR pages | CTR under 1% at positions 3–6 | Agency | 15th |
| Add FAQ sections to top 5 guides | Improve AI Overview citations | Agency | 30th |
| Approve 2 new service pages | Capture commercial queries | Client | 10th |

### Slide 12: Methodology

State the date range, comparison period, GA4 property and Search Console site, and definitions (for example, "non-branded excludes queries containing [brand]"). Note caveats such as GA4 consent-mode gaps. This slide prevents most "your numbers are wrong" emails.

## SEO report example: a filled-in KPI snapshot

Here is what slide 5 of this SEO report template looks like with sample numbers for a B2B services client:

| KPI | Target | Actual | Status |
| --- | --- | --- | --- |
| Organic key events | +10% YoY | +14% | On track |
| Organic clicks | +8% YoY | −6% | Off track |
| Impressions | +5% YoY | +22% | On track |
| Non-branded clicks | +12% YoY | +3% | At risk |
| Keywords in top 10 | 40 of 100 | 37 | At risk |
| Organic conversion rate | ≥ 2.0% | 2.6% | On track |

Read together, the story is clear: visibility and conversions grew, while clicks fell. That pattern points to AI Overviews taking informational clicks, not a ranking problem. That one table drives the executive summary, the AI search slide and the action plan.

## Common SEO reporting mistakes

1. **Ordering by tool instead of by decision.** Clients don't care which tool a number came from.
2. **Reporting traffic without conversions.** Clicks alone can't show business value.
3. **No targets.** Without targets, every number is just "up" or "down".
4. **Ignoring AI search.** In 2026, a monthly SEO report without AI Overview and AI referral data tells half the story.
5. **Unexplained discrepancies.** If GA4 and Search Console disagree, say why before the client asks.
6. **No owner on actions.** An action plan without owners and dates rarely gets done.

## Writing the commentary

- **Lead with the change and its cause.** "Clicks fell 6% because…", not "Here are the clicks."
- **Use one number per sentence.** Readers lose track otherwise.
- **Separate fact from interpretation.** "Impressions rose 22% (fact). This suggests AI Overviews are showing our pages (interpretation)."
- **Always end with an action.**

AI can draft this commentary, but a human should edit it. Our view is in [should AI write your client reports?](/resources/blogs/should-ai-write-client-reports).

## PDF, dashboard or deck?

A monthly SEO report reads best as a short deck: it tells the story in order and gets presented, not just emailed. Live dashboards are better for between-meeting checks. HTML decks open in any browser without a PowerPoint licence. Compare formats in [HTML vs PDF vs live dashboard](/resources/blogs/html-vs-pdf-live-dashboard-reports).

## SEO report checklist

- [ ] Date range and comparison period stated on the cover
- [ ] Executive summary under 80 words, written last
- [ ] KPI statuses calculated by rules agreed in advance
- [ ] GA4 and Search Console shown together, discrepancies explained
- [ ] AI search visibility slide included
- [ ] Every finding ends in an action
- [ ] Action plan has owners and due dates
- [ ] Methodology slide included

## Frequently asked questions
### What should a monthly SEO report include?

An executive summary, a health check, KPI status, GA4 organic traffic and conversions, Search Console clicks and impressions, keyword and page movers, AI search visibility, key findings, an action plan and a methodology note.

### How long should an SEO report be?

About 10–12 slides or 2–4 pages. Put detail in an appendix rather than the main story.

### What's the difference between a monthly SEO report and an SEO audit?

A monthly SEO report tracks progress against targets. An audit is a one-off deep review of technical, content and authority issues.

### Which tools generate SEO reports automatically?

Agency reporting platforms such as AgencyAnalytics, Whatagraph and Databox build SEO dashboards and reports. [Conalytic Report Builder](/products/report-builder) generates this 12-slide structure as an HTML deck from GA4 and Search Console. Compare options in [best AI reporting tools for agencies](/resources/blogs/best-ai-client-reporting-tools).

### Should SEO reports include AI Overviews data?

Yes. AI Overviews now affect clicks on many queries. Without them, clients may read a visibility gain as a performance loss.

## Generate this SEO report template from your own data

Conalytic Report Builder builds this 12-slide deck from your GA4 and Search Console data, with optional AI-written commentary. Download it as HTML and present it in any browser.

**[Generate your first SEO report free →](https://chat.conalytic.com/signup)** · [See Report Builder](/products/report-builder)
`;
