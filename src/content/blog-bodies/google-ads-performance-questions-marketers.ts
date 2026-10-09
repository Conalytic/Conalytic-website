/** Blog body: Google Ads performance questions marketers should ask — review prompts. */
export const googleAdsPerformanceQuestionsBody = `
**Quick answer:** Eight Google Ads performance review questions every marketer should ask cover spend pacing, click and impression volume, conversion count and cost per conversion, campaign-level movers, device split, search term waste, impression share where available, and GA4 alignment on tagged traffic. Run them in an Ads-scoped [Conversational Analytics](/products/conversational-analytics) chat with last 7 vs prior 7 days or month to date vs prior month.

Google Ads performance questions belong in every weekly media review, not only when CPA spikes. The platform changes daily: budgets cap, creatives fatigue, queries broaden, and tracking glitches mimic "bad audiences." Marketers who ask the same eight questions in plain English catch issues before finance does.

This article gives copy-paste prompts, explains good vs bad phrasing, and tells you when Ads alone is enough versus when you need GA4 or Search Console. Reconcile platform gaps with [Google Ads and GA4 conversion discrepancy](/resources/blogs/google-ads-ga4-conversion-discrepancy). Place Ads in the full stack via [cross-channel reporting with GSC, GA4, and Ads](/resources/blogs/cross-channel-reporting-gsc-ga4-ads).

## What Google Ads answers that GA4 does not

Google Ads owns **spend, bids, auctions, quality, and delivery**. GA4 owns **onsite behavior after the click** when tagging works. Marketers should ask Google Ads performance questions when decisions involve:

- Budget pacing and month-end projection
- Creative or ad group tests inside the ad account
- Keyword and search term hygiene
- Official Ads conversion columns used for bidding

Open GA4 when **rate**, **landing experience**, or **non-Ads channels** explain the story. Open Search Console when **organic** search moves independently of paid.

## Eight Google Ads performance review questions

### 1. Are we pacing to plan this month?

**Ask:** "Cost month to date, same days prior month, and percent change. Include average daily spend each period."

**Why:** Finance speaks spend before CPA. Catch underspend early if campaigns were paused accidentally.

### 2. Did efficiency change week over week?

**Ask:** "Conversions, cost per conversion, and conversion rate from clicks, last 7 days vs prior 7 days, account total."

**Why:** Separates volume shocks from efficiency shocks.

### 3. Which campaigns moved spend or CPA the most?

**Ask:** "Campaigns sorted by largest cost change, last 7 vs prior 7, show cost, clicks, conversions, CPA."

**Why:** Account totals hide one runaway campaign or one paused winner.

### 4. Are clicks and impressions telling the same story?

**Ask:** "Clicks, impressions, CTR, last 7 vs prior 7, account level."

**Why:** Impressions up with clicks down hints auction or ad relevance issues.

### 5. Did mobile or desktop efficiency diverge?

**Ask:** "Cost, conversions, CPA by device, last 7 vs prior 7."

**Why:** Mobile site bugs show up as device CPA gaps before account-level CPA moves.

### 6. Where is query spend leaking?

**Ask:** "Search terms with cost above [threshold], zero conversions, last 28 days, sorted by cost."

**Why:** Negative keyword work is still a marketer superpower. Adjust threshold to account size.

### 7. Are we losing visibility on priority campaigns?

**Ask:** "Campaigns with impression share or budget lost impression share columns if available, last 28 days trend."

**Why:** Cheap CPA sometimes means you are not scaling because budget caps, not because magic targeting.

### 8. Does GA4 agree directionally on paid traffic?

**Ask in GA4 scoped chat:** "Paid search sessions and primary key event, last 7 vs prior 7." Compare direction to Ads conversions, not exact counts.

**Why:** Prevents double panic when one platform lags. Use the discrepancy guide above when gaps persist.

Log exceptions in [KPIs Tracker](/products/kpis-tracker) with CPA and spend targets from [marketing KPI targets and goal setting](/resources/blogs/marketing-kpi-targets-goal-setting).

## Good vs bad Google Ads prompts in Chats

**Bad:** "Optimize my account."

**Good:** "Table: campaigns, cost, conversions, CPA, last 7 vs prior 7, sorted by CPA increase."

**Bad:** "Best ads?"

**Good:** "Ad groups with at least 50 clicks, sorted by conversion rate, last 28 days."

**Bad:** "ROAS?" without defining value

**Good:** "Conversion value and ROAS if value tracking exists, last 28 vs prior 28; note if value is incomplete."

Attach a context file with conversion action names used for bidding, brand campaign naming rules, and fiscal month boundaries.

## Weekly vs monthly rhythm

**Weekly standup:** Questions 2, 3, and 8, efficiency, campaign movers, GA4 sanity.

**Monthly client review:** All eight plus narrative in [Report Builder](/products/report-builder).

**Post-change audits:** After bid strategy swaps or broad match expansions, run questions 6 and 7 daily for two weeks.

Structure client slides using [client marketing report structure](/resources/blogs/client-marketing-report-structure). Draft prose carefully, [should AI write client reports](/resources/blogs/should-ai-write-client-reports).

Deepen chat mechanics via [Conversational Analytics marketing chat guide](/resources/blogs/conversational-analytics-marketing-chat-guide) and export recurring views with [report Builder HTML marketing reports guide](/resources/blogs/report-builder-html-marketing-reports-guide). Operationalize targets in [KPIs Tracker marketing goals guide](/resources/blogs/kpis-tracker-marketing-goals-guide).

## When organic search questions belong elsewhere

If leadership asks why **total** leads fell, run Google Ads performance questions first for paid, then GA4 for channel mix via [what to ask GA4 data](/resources/blogs/what-to-ask-ga4-data), then GSC if organic is implicated via [GA4 traffic drop and Search Console](/resources/blogs/ga4-traffic-drop-search-console).

Ads questions alone cannot explain organic click loss. They prevent paid from being blamed unfairly, or from hiding behind organic excuses.

## Governance for agencies

One Ads account per scoped chat. Never compare Client A CPA to Client B in one thread. Context files should list who may see draft answers before client sends.

Charts from chat threads screenshot cleanly into weekly updates. Keep a single thread per client per month so history stays searchable.

## Mapping the eight questions to account types

**Lead gen accounts:** Weight questions 2, 3, 6, and 8. Query waste and CPA by campaign matter more than ROAS storytelling.

**Ecommerce accounts:** Add value and ROAS follow-ups when merchant center and cart tagging are trustworthy. If value is incomplete, say so before quoting ROAS on a client call.

**Low-spend brand campaigns:** Run questions 1 and 2 monthly; weekly may be noise. Still run question 8 after any site or tracking change.

**High-spend performance accounts:** Run the full eight weekly and archive thread PDFs for finance reconciliation notes.

Adjust thresholds in prompts ("search terms with cost above X") per account spend so tables stay readable.

## When Google Ads performance questions expose process issues

Repeated CPA spikes with clean GA4 rates often mean:

- Conversion action set changed in Ads
- Auto-apply recommendations enabled without review
- Broad match expansion without search term monitoring
- Landing page tests that broke mobile forms

Use chat output as tickets for the owner (paid lead vs dev vs analytics). The eight questions are diagnostic, not autonomous optimization.

## Connecting reviews to KPIs and reports

After each monthly review, confirm KPI thresholds still match account strategy. If strategy shifted from volume to efficiency, update KPI labels before the next [Report Builder](/products/report-builder) export.

Cross-channel summaries still require GA4 and sometimes GSC, see [cross-channel reporting with GSC, GA4, and Ads](/resources/blogs/cross-channel-reporting-gsc-ga4-ads). Ads questions alone never close an executive narrative about total business outcomes.

## Budget and forecast questions (still within marketer scope)

Performance reviews often slide into finance language. These Ads-scoped prompts stay marketer-owned without pretending to be accounting:

**Remaining monthly budget headroom:** "Cost month to date, daily average, days remaining in calendar month, simple linear spend projection."

**Conversion volume needed to hit target:** "Conversions month to date vs monthly target stated in context file, days remaining, required daily run rate."

**Day-of-week spend pattern:** "Cost by day of week, last 56 days, to spot weekday pause mistakes."

Attach monthly targets in context files so the chat does not invent goals. Mirror the same targets in [KPIs Tracker](/products/kpis-tracker) for automated status labels.

When projection prompts disagree with Google Ads built-in forecasts, cite the chat table you used and move on, perfect forecasts are not the goal; directional pacing is.

## Creative and landing page hooks (after the core eight)

Once account health is clear, optional follow-ups help strategists:

"Campaigns with largest CTR decrease, last 14 vs prior 14, min 1,000 impressions."

"Final URL paths with rising cost and falling conversion rate, last 28 days."

Then jump to GA4 scoped chats for on-site rate on those URLs via [what to ask GA4 data](/resources/blogs/what-to-ask-ga4-data). Ads tells you where money went; GA4 tells you if the landing experience broke.

## Frequently asked questions

### Should I trust Ads conversions or GA4 key events?

Trust Ads for bidding and billing pacing. Trust GA4 for onsite funnels and cross-channel views. Investigate persistent gaps instead of picking a favorite forever.

### How often should marketers run these eight questions?

Weekly for active spend accounts, monthly for low-spend or always-on brand campaigns.

### Can Conversational Analytics change bids?

Conalytic uses read-only OAuth for analysis. You change bids in Google Ads after reviewing chat output.

### What if conversion tracking recently changed?

Run question 8 daily and pause bid strategy changes until Ads and GA4 trends realign. Document the change date in context files.

### Do I need every campaign type in one prompt?

Start account-level for standup, then drill campaigns flagged with CPA or spend thresholds.

### Where do search term questions fit brand campaigns?

Raise the cost threshold or exclude brand campaigns in follow-up prompts so brand query lists do not drown reviews.

---

Review Google Ads performance in plain English with charts: [Conversational Analytics](https://chat.conalytic.com/signup).
`;
