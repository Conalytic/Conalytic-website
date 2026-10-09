/** Blog body: Weekly marketing standup analytics questions — good vs bad prompts for Chats. */
export const weeklyMarketingStandupQuestionsBody = `
**Quick answer:** A strong weekly marketing standup starts with five to seven scoped analytics questions: sessions and users week over week, channel mix shifts, conversion volume and rate, top landing page movers, and one paid or organic search sanity check. Ask each question with a date range, comparison period, and named metric in [Conversational Analytics](/products/conversational-analytics) so answers stay fast and auditable. Vague prompts like "how did we do?" waste the first ten minutes of standup.

Weekly marketing standup analytics questions should fit in fifteen minutes, including discussion. The goal is not a full performance review. You want enough signal to decide what deserves deep work this week: a landing page test, a budget shift, a tracking fix, or a content refresh. When teams open GA4, Search Console, and Ads in separate tabs, standup often turns into silent spreadsheet hunting. Scoped chats fix that if you bring question templates that match how your stack actually reports.

This guide separates good from bad prompts for standup, gives copy-paste examples for GA4, Search Console, and Google Ads, and shows how to pair [Chats](/products/conversational-analytics) with [KPIs Tracker](/products/kpis-tracker) so you start with exceptions instead of reading every metric aloud.

## Why weekly standup analytics questions fail in the first place

Most standup failures are prompt failures, not data failures. Someone asks "is traffic okay?" and gets a subjective answer. Someone asks "what changed?" without a comparison window and gets a story that cannot be verified. Someone mixes calendar weeks with rolling seven-day windows and argues about numbers that are both "correct."

Bad standup questions share traits:

- No time boundary (last 7 days, last complete week, month to date)
- No comparison (prior period, same week last year, forecast)
- No metric definition (sessions vs users vs engaged sessions)
- No scope (whole site vs one country vs one product line)
- No owner for follow-up (SEO vs paid vs dev vs analytics)

Good weekly marketing standup analytics questions are boring on purpose. They repeat every Monday with the same structure so the team builds a shared rhythm. Variation belongs in the follow-up thread after standup, not in the opening prompt.

For a deeper GA4-only library, see [what to ask GA4 data](/resources/blogs/what-to-ask-ga4-data). For cross-tool incident style questions, bookmark [GA4 traffic drop and Search Console](/resources/blogs/ga4-traffic-drop-search-console).

## The standup question stack (seven prompts that scale)

Use this stack as your default. Adjust event names and channel labels to match your property.

### 1. Headline traffic and users

**Good:** "Total sessions and total users, last 7 complete days vs prior 7 complete days, percent change for each."

**Bad:** "Traffic update."

**Why it works:** Everyone hears the same baseline. Percent change sets the tone for the rest of standup. If your reporting timezone cuts off partial days, say so in the chat context file.

### 2. Channel mix movers

**Good:** "Sessions by default channel group, last 7 days vs prior 7 days, sorted by largest absolute session change, show top five channels only."

**Bad:** "Which channel was best?"

**Why it works:** Standup needs movers, not vanity leaders. Organic might be flat while paid social spikes; the sort order surfaces that without a twenty-row table.

### 3. Primary conversion health

**Good:** "Count of key event purchase (replace with your primary conversion), last 7 days vs prior 7 days, plus conversion rate per session."

**Bad:** "Conversions look fine."

**Why it works:** Volume and rate decouple problems. A traffic dip with stable rate differs from stable traffic with collapsing rate. Align the event name with [marketing KPI targets and goal setting](/resources/blogs/marketing-kpi-targets-goal-setting) so standup matches executive dashboards.

### 4. Organic landing page deltas

**Good:** "Top 15 landing pages by session change, organic search only, last 7 days vs prior 7 days, minimum 50 sessions in current period."

**Bad:** "Any SEO issues?"

**Why it works:** SEO standup should name pages. Content and technical owners can claim items before the meeting ends.

### 5. Paid efficiency snapshot

**Good:** "Google Ads: cost, clicks, conversions, and cost per conversion, last 7 days vs prior 7 days, account total."

**Bad:** "How is Ads?"

**Why it works:** One row answers whether spend or efficiency moved. Campaign-level detail stays in the parking lot unless this row is red.

### 6. Search visibility pulse (optional but high value)

**Good:** "Search Console: total clicks and average position, last 7 days vs prior 7 days, same property as GA4."

**Bad:** "Rankings dropped."

**Why it works:** Clicks and position together reduce panic over impression noise. Pair with GA4 organic sessions to see click vs session gaps.

### 7. One "human context" item from KPIs

**Good:** Open [KPIs Tracker](/products/kpis-tracker) and read only goals marked Off track or At risk for the current week.

**Bad:** Re-read every KPI definition in standup.

**Why it works:** KPIs encode decisions you already made. Standup confirms reality against those decisions instead of renegotiating targets every Monday.

Pin these seven in one GA4-scoped chat, one Search Console-scoped chat, and one Ads-scoped chat if you manage multiple clients. Never blend properties in a single thread during client-facing standups.

## Good vs bad phrasing patterns in Conversational Analytics

Conversational Analytics rewards specificity. Think of each prompt as a mini brief.

| Pattern | Weak standup prompt | Strong standup prompt |
|--------|---------------------|------------------------|
| Time | "Recently" | "Last 7 complete days vs prior 7" |
| Metric | "Engagement" | "Engaged sessions and engagement rate per session" |
| Filter | "Blog" | "Landing page path contains /blog/, organic only" |
| Output | "Thoughts?" | "Table with delta and percent change" |
| Threshold | "Anomalies" | "Show rows where absolute session change exceeds 100" |

**Bad:** "Summarize marketing performance for standup."

That prompt forces the model to guess priorities, events, and channels. You will get fluent text that may not match your KPI definitions.

**Good:** "Standup brief: sessions, users, top channel deltas, primary conversion count and rate, top five organic landing page changes, last 7 vs prior 7 days. Use tables. Flag any metric with absolute percent change over 15%."

Attach a context file that lists primary conversion event names, excluded internal traffic notes, and major launches this week. Context files turn generic answers into client-safe answers. More on that in [Conversational Analytics marketing chat guide](/resources/blogs/conversational-analytics-marketing-chat-guide) when you roll standup templates across accounts.

## Roles: who asks which weekly marketing standup analytics questions

Split prompts by owner so standup stays parallel before the meeting.

**Marketing lead:** channels, conversion rate, KPI exceptions.

**SEO:** Search Console clicks, queries with largest click loss, organic landing pages.

**Paid:** spend, CPA, conversion volume, budget pacing.

**Lifecycle or CRM:** email and referral channels in GA4 if tagged cleanly.

**Analytics or ops:** one line on data freshness ("GA4 through yesterday", "Ads lag two hours").

If your team is small, one person runs the chat stack but still reads answers by role. That prevents one generic paragraph from replacing accountable updates.

## After standup: when to leave the chat thread

Standup questions should not become forensic investigations. If channel sessions fall more than your threshold, open a dedicated investigation thread with narrower prompts. Use the cross-tool checks in [GA4 traffic drop and Search Console](/resources/blogs/ga4-traffic-drop-search-console) rather than extending standup to forty-five minutes.

Capture decisions in the chat thread ("pause Campaign X", "assign LP fix to dev"). Those notes feed [Report Builder](/products/report-builder) when you compile the weekly client update. Structure client narratives using [client marketing report structure](/resources/blogs/client-marketing-report-structure) so standup insights land in the right slide sections.

## Building a reusable standup library in Conalytic

1. Create one chat per data source per brand.
2. Paste the seven prompts as the first message each Monday (or save them in a team doc linked from context files).
3. Mirror the same metrics in KPIs Tracker with weekly evaluation windows.
4. Export charts from the thread directly into weekly reports.

For workflow across Chats, KPIs, and reports, read [Report Builder HTML marketing reports guide](/resources/blogs/report-builder-html-marketing-reports-guide) and [KPIs Tracker marketing goals guide](/resources/blogs/kpis-tracker-marketing-goals-guide). For agency governance, lean on scoped chats as described in [Conversational Analytics marketing chat guide](/resources/blogs/conversational-analytics-marketing-chat-guide).

## Frequently asked questions

### How many analytics questions fit in a fifteen-minute standup?

Plan five to seven pre-run questions with answers ready before the meeting. Discussion time shrinks when numbers are already in the thread. If you routinely exceed seven metrics, move detail to KPIs Tracker exceptions only.

### Should standup use calendar weeks or rolling seven days?

Pick one convention and document it in your context file. Rolling seven days is easier for automation; calendar weeks match how some clients think about billing periods. Mixing both in one standup causes needless debate.

### Can one chat cover GA4, Search Console, and Google Ads together?

For internal quick checks, a general marketing chat helps for strategy. For standup numbers, use scoped chats per connection so property and account IDs cannot drift. Cross-channel summaries belong in [cross-channel reporting with GSC, GA4, and Ads](/resources/blogs/cross-channel-reporting-gsc-ga4-ads) workflows after standup.

### What if GA4 and Search Console disagree on organic performance?

That is normal when definitions differ. Standup should report each tool on its own metric (GA4 sessions vs GSC clicks) and note the comparison window alignment. Investigate large gaps outside standup.

### How do I stop AI from inventing metrics in standup?

Scope the chat to a connected property, name exact events and dimensions, and attach a context file with official definitions. Avoid open-ended "analyze everything" prompts.

### When should standup questions change?

Refresh templates when you change primary conversions, restructure campaigns, launch a new market, or after a major site migration. Otherwise keep prompts stable so week-over-week standups stay comparable.

---

Ready to run standup from scoped chats with charts in thread? Start with [Conversational Analytics](https://chat.conalytic.com/signup) and connect GA4, Search Console, and Google Ads read-only.
`;
