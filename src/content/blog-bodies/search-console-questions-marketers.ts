/** Blog body: Search Console questions marketers should ask — plain-English GSC prompts. */
export const searchConsoleQuestionsMarketersBody = `
**Quick answer:** The best Search Console questions for marketers focus on clicks, impressions, average position, top queries, and top pages, with the same date range compared to the prior period. Search Console answers search visibility, not onsite conversion rate. Use a GSC-scoped [Conversational Analytics](/products/conversational-analytics) chat and pair results with GA4 when you need sessions or key events on landing pages.

Search Console questions marketers ask should sound like business English, not SEO jargon soup. You do not need to name API dimensions in standup. You need ten reliable prompts that tell you whether Google Search is sending fewer clicks, whether specific money pages lost visibility, and whether new content earned impressions before traffic arrives in GA4.

This guide lists ten plain-English Search Console questions, good and bad phrasing, and when to stop at GSC versus opening GA4 or Ads. For organic incidents, read [GA4 traffic drop and Search Console](/resources/blogs/ga4-traffic-drop-search-console). For full-funnel reporting, see [cross-channel reporting with GSC, GA4, and Ads](/resources/blogs/cross-channel-reporting-gsc-ga4-ads).

## What Search Console does and does not tell marketers

Search Console reports Google Search performance: queries, pages, countries, devices, and indexing signals. It does **not** replace GA4 for:

- Session counts or engagement rate
- Paid search or social traffic
- Key events and revenue on site
- Cross-channel budget decisions

Marketers win when they treat GSC as the **search demand and visibility** layer. GA4 remains the **behavior and conversion** layer. Ask Search Console questions first when the stakeholder says rankings, SEO, or "Google search traffic feels soft."

Connect GSC in Conalytic with the same URL property you use in leadership decks. Scope one site per chat so www and subdomain data never mix on a client call.

## Ten Search Console questions in plain English

### 1. Are search clicks down or up versus last month?

**Ask:** "Total clicks and total impressions, last 28 days vs prior 28 days, percent change for each."

**Use when:** Opening any SEO section of a weekly or monthly review.

### 2. Did we lose clicks on our most important pages?

**Ask:** "Pages sorted by largest click decrease, last 28 days vs prior 28 days, show top 15 pages with at least 50 clicks in the prior period."

**Use when:** A product, pricing, or category URL drives revenue.

### 3. Which search queries lost the most clicks?

**Ask:** "Queries with largest click loss, same comparison, minimum 20 clicks in prior period."

**Use when:** Diagnosing branded vs non-branded softness or SERP feature pressure.

### 4. Where are we visible but not earning clicks?

**Ask:** "Queries with impressions above 1,000, CTR below 2%, last 28 days, sorted by impressions descending."

**Use when:** Prioritizing title and meta tests, not new content alone.

### 5. Is average position moving for the site overall?

**Ask:** "Average position, last 28 days vs prior 28 days, site level."

**Use when:** Leadership asks "are rankings worse?", with the caveat that position is query-weighted.

### 6. How does mobile search compare to desktop?

**Ask:** "Clicks and CTR by device, last 28 days vs prior 28 days."

**Use when:** Mobile redesign, Core Web Vitals projects, or mobile-only SERP changes.

### 7. Are we gaining impressions on new content paths?

**Ask:** "Pages where URL contains [folder], impressions and clicks, last 28 days vs prior 28 days."

**Use when:** Measuring content program reach before GA4 sessions accumulate.

### 8. Which countries lost search clicks?

**Ask:** "Countries sorted by click decrease, last 28 days vs prior 28 days, top 10."

**Use when:** International markets or hreflang changes are in flight.

### 9. Do branded queries still dominate click share?

**Ask:** "Queries containing our brand name, clicks and impressions, last 28 days vs prior 28 days."

**Use when:** Separating brand health from non-brand SEO work.

### 10. Any indexing or coverage surprises worth escalating?

**Ask:** "Summarize coverage status changes if available, and list example URLs excluded or not indexed in the last 14 days."

**Use when:** Launches, migrations, or sudden organic cliffs, escalate to technical SEO with examples.

These Search Console questions marketers repeat monthly beat ad-hoc digging in the performance report UI.

## Good vs bad Search Console prompts in Chats

**Bad:** "How is SEO?"

**Good:** "Clicks, impressions, CTR, and average position, last 28 vs prior 28 days, table with percent change."

**Bad:** "Keyword rankings for everything."

**Good:** "Top 25 queries by click change, last 28 vs prior 28 days, exclude queries under 10 clicks in prior period."

**Bad:** "Why did GA4 organic drop?"

**Good (GSC scoped):** "Click change by landing page for organic search, last 7 vs prior 7 days." Then open GA4 for sessions on the same URLs.

Attach a context file noting brand spellings, staging domains to ignore, and priority page lists. Context keeps AI from treating support pages as money pages.

## When to pair GSC answers with GA4 or Ads

Open **GA4** when:

- Clicks improved but **conversions** did not
- You need **landing page engagement** or **funnel steps**
- **Campaign tagging** explains referral anomalies

Start from [what to ask GA4 data](/resources/blogs/what-to-ask-ga4-data) for templates.

Open **Google Ads** when:

- Paid search spend changed and you need **auction-level** detail
- GA4 shows paid sessions down but you do not know if **budget or delivery** caused it

Reconcile paid conversion differences with [Google Ads and GA4 conversion discrepancy](/resources/blogs/google-ads-ga4-conversion-discrepancy).

Stay in **Search Console** when the conversation is strictly **organic search visibility** and click trends.

## Reporting Search Console insights to clients

Clients understand clicks and top queries more than average position debates. Lead with click change, money page movers, and three queries that explain the story. Put technical indexing notes in an appendix.

Use [Report Builder](/products/report-builder) for polished HTML decks. Structure narratives using [client marketing report structure](/resources/blogs/client-marketing-report-structure). Let AI draft slide titles only after numbers are fixed, see [should AI write client reports](/resources/blogs/should-ai-write-client-reports).

Track search click targets in [KPIs Tracker](/products/kpis-tracker) aligned with [marketing KPI targets and goal setting](/resources/blogs/marketing-kpi-targets-goal-setting) and [KPIs Tracker marketing goals guide](/resources/blogs/kpis-tracker-marketing-goals-guide).

## Operational rhythm for marketing teams

**Weekly:** Question 1 plus one page or query drill-down if GA4 organic sessions flagged an exception.

**Monthly:** Full ten-question pass exported to report templates via [report Builder HTML marketing reports guide](/resources/blogs/report-builder-html-marketing-reports-guide).

**Incidents:** Questions 2 and 3 daily until clicks stabilize; log thread links for accountability.

Learn chat habits in [Conversational Analytics marketing chat guide](/resources/blogs/conversational-analytics-marketing-chat-guide).

## Translating GSC tables for leadership

Executives rarely want 50 queries. They want three sentences:

1. Total search clicks vs last period
2. One money page winner and one money page loser
3. One query theme (brand, category, or problem-aware) that explains most click change

Search Console questions marketers ask internally can be wide. Slides should be narrow. Pull full tables into appendix pages in [Report Builder](/products/report-builder) if detail-oriented clients request them.

## Edge cases that confuse marketers

**Property type:** Domain property vs URL-prefix property changes totals. Stick to one property per client story.

**Anonymized queries:** Large "other" buckets mean you cannot explain every click loss at query level. Shift to page-level questions.

**Seasonality:** Retail and B2B cycles move GSC clicks without any ranking disaster. Compare year-over-year when you have enough history, and say so aloud.

**SERP features:** Impressions rise while clicks fall on head terms when AI overviews or rich results absorb clicks. Pair CTR questions with content strategy, not only title tag tweaks.

## Building a shared GSC question doc

Copy the ten prompts into your team wiki. For each client, add:

- Priority URL prefixes
- Brand query spellings
- Markets that roll up to one stakeholder

Update the doc when site migrations complete. Stale path filters waste chat turns on 404 paths that no longer matter.

When organic incidents escalate, reuse the same prompts daily with shorter windows until clicks stabilize, then return to weekly Question 1 in standup.

## Pairing each GSC question with one GA4 follow-up

Marketers stay efficient when every Search Console question has a default GA4 companion in a separate scoped chat:

| GSC focus | GA4 follow-up |
|-----------|----------------|
| Click change sitewide | Organic sessions and key events, same dates |
| Page click loss | Landing page sessions and conversion rate on that path |
| Query click loss | Landing page for that query theme (if known) plus organic sessions |
| Low CTR high impressions | Engagement rate and key events on the ranking URL |
| Country click loss | GA4 sessions and key events geo-filtered to that country |

You do not merge the tools in one prompt. You run two prompts with identical calendars and paste both charts into [Report Builder](/products/report-builder). Clients trust the story when they see GSC visibility and GA4 outcomes side by side with labels.

## Frequently asked questions

### Why do Search Console clicks not match GA4 organic sessions?

Different metrics, filters, and delays. Compare trends, not absolute equality. Align date ranges and property URLs.

### Should marketers use queries or pages first?

Pages tie to business owners. Queries explain why a page moved. Start pages for standup, queries for diagnosis.

### How fresh is Search Console data?

Often delayed two to three days. Say that on client calls before comparing to yesterday's GA4.

### Can I ask Search Console about conversions?

No. Use GA4 key events for conversion questions. GSC stops at click.

### Do AI chats hallucinate GSC data?

Scoped connections pull live data. Still name date ranges and metrics explicitly. Avoid unscoped "estimate my traffic" prompts.

### When should I ignore average position?

When impression mix shifts toward long-tail queries. Pair position with clicks and CTR so the story stays grounded.

---

Run plain-English Search Console questions in scoped chats: [Conversational Analytics](https://chat.conalytic.com/signup).
`;
