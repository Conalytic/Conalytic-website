/** Blog body: Investigate a traffic or conversion drop in 30 minutes — GA4, GSC, Ads playbook. */
export const investigateTrafficDrop30MinBody = `
**Quick answer:** When traffic or conversions drop suddenly, run a 30-minute investigation playbook: confirm the drop in GA4 with session and conversion comparisons, check Search Console for click and query losses, review Google Ads spend and delivery, then rule out tracking or tag issues before you change campaigns. Use scoped [Conversational Analytics](/products/conversational-analytics) threads so each answer cites the same date range and property.

A traffic conversion drop investigation is not a full audit. You have one job in the first half hour: decide whether the problem is demand, visibility, spend, onsite experience, or bad data. Most teams panic at the channel level and pause ads before they learn organic clicks are flat and GA4 lost a key event. This playbook orders checks so you spend minutes where signal is highest.

If you already document standup prompts, adapt them from [what to ask GA4 data](/resources/blogs/what-to-ask-ga4-data). For organic-specific triage, pair this guide with [GA4 traffic drop and Search Console](/resources/blogs/ga4-traffic-drop-search-console).

## Minute 0–5: Define the incident

Write four lines before you query anything:

1. **Symptom:** sessions down, conversions down, or both
2. **Window:** when the drop started (include timezone)
3. **Scope:** whole site, one country, one product line
4. **Baseline:** compare to prior period of equal length, not "last year" unless seasonality is obvious

**Good chat prompt (GA4 scoped):** "Total sessions, total users, and primary purchase key event count for yesterday vs same weekday prior week, and for last 3 days vs prior 3 days. Show percent change."

**Bad prompt:** "Why is traffic down?"

If both comparisons show a drop, continue. If only yesterday is odd, check partial-day reporting and public holidays before deeper dives.

Log whether conversion rate fell with sessions or held steady. Rate collapse with stable sessions points to site, checkout, or tracking, not media.

## Minute 5–12: GA4 channel and landing page split

**Good prompt:** "Sessions and key event count by default channel group, last 3 days vs prior 3 days, sorted by largest session loss."

Ask:

- Does one channel explain more than half the session loss?
- Did direct or referral spike then fall (tracking or email artifact)?
- Did paid search fall while Google Ads still shows clicks?

**Landing page prompt:** "Top 20 landing pages by session decrease, all channels, last 3 days vs prior 3 days, min 30 sessions in current period."

One URL with a large share of the loss often means deployment, redirect, or indexation, not budget.

Device split catches mobile-only breakage:

**Good prompt:** "Sessions and conversion rate by device category, last 3 days vs prior 3 days."

Geo split catches CDN or consent banner rollouts:

**Good prompt:** "Session change by country, last 3 days vs prior 3 days, show countries with absolute loss over 200 sessions."

Mirror critical thresholds in [KPIs Tracker](/products/kpis-tracker) so the next drop pings you before standup.

## Minute 12–18: Search Console visibility check

Open a Search Console-scoped chat for the same site.

**Good prompt:** "Total clicks, total impressions, and average CTR, last 3 days vs prior 3 days."

**Query prompt:** "Queries with largest click loss, last 7 days vs prior 7 days, minimum 20 clicks in prior period."

**Page prompt:** "Pages with largest click loss, same comparison."

Interpretation shortcuts:

- Clicks down, impressions flat: CTR or SERP feature pressure, title or snippet issue, or AI overview displacement on head terms.
- Clicks and impressions down: ranking or crawl/index loss, coordinate with SEO, not paid media.
- Clicks up in GSC but GA4 organic sessions down: UTM hygiene, cross-domain tracking, or filter differences.

Cross-channel framing helps executives; see [cross-channel reporting with GSC, GA4, and Ads](/resources/blogs/cross-channel-reporting-gsc-ga4-ads) after you stabilize the incident.

## Minute 18–24: Google Ads delivery and conversion sanity

Ads-scoped chat:

**Good prompt:** "Account-level cost, clicks, impressions, conversions, and cost per conversion, last 3 days vs prior 3 days."

**Campaign prompt:** "Campaigns sorted by largest conversion decrease, same window, min 10 conversions in prior period."

Before pausing campaigns, check:

- Did spend fall because budgets capped or learning reset?
- Did clicks fall while impressions stayed high (rank or quality)?
- Do Ads conversions move with GA4 key events?

When platforms disagree, use [Google Ads and GA4 conversion discrepancy](/resources/blogs/google-ads-ga4-conversion-discrepancy) as your reconciliation checklist, not as an excuse to ignore one side.

## Minute 24–28: Tracking and GTM quick rules

Data incidents look like marketing incidents. Ask in a GTM-scoped chat or with your analytics owner:

- Any container publish in the incident window?
- Did consent mode or CMP change?
- Did the primary GA4 event rename or lose a trigger?
- Are thank-you page URLs still firing?

**Good GA4 prompt:** "Daily count of primary conversion key event for last 14 days, line trend."

A cliff on one day with flat sessions screams instrumentation. Fix tags before you rewrite media plans.

Marketers who skip this step often "recover" conversions by reverting a tag, not by increasing bids.

## Minute 28–30: Decision and comms

Pick one primary cause label:

| Label | Typical evidence | First action |
|-------|------------------|--------------|
| Demand | All channels soft | Message leadership; hold spend changes |
| SEO visibility | GSC clicks down on money pages | Technical and content task, not bid cuts |
| Paid delivery | Ads clicks or spend down | Budget, targeting, or policy review |
| Onsite | Rate down, sessions stable | CRO or dev hotfix |
| Tracking | Event cliff, other metrics stable | GTM rollback or event repair |

Document the label and evidence in the chat thread. Pull one chart per source for leadership.

Client-facing teams should align narrative structure with [client marketing report structure](/resources/blogs/client-marketing-report-structure). Let AI draft words only after numbers are fixed, see [should AI write client reports](/resources/blogs/should-ai-write-client-reports).

## Using Conversational Analytics for repeat incidents

Save this playbook as the first message in an "Incidents" chat per property. Attach a context file with:

- Primary conversion event names
- Staging vs production quirks
- Major campaign and release calendar

Scoped chats prevent comparing Client A traffic to Client B baselines during a stressful hour.

When the incident resolves, move monitoring to [KPIs Tracker](/products/kpis-tracker) with thresholds tied to the same events you used in the playbook. Weekly reporting can flow to [Report Builder](/products/report-builder) using [Report Builder HTML marketing reports guide](/resources/blogs/report-builder-html-marketing-reports-guide).

Deepen everyday questioning habits via [Conversational Analytics marketing chat guide](/resources/blogs/conversational-analytics-marketing-chat-guide) and [KPIs Tracker marketing goals guide](/resources/blogs/kpis-tracker-marketing-goals-guide).

## Variations by symptom (still within 30 minutes)

**Sessions down, conversions flat.** Treat as traffic problem first. Expand channel and GSC page prompts. Hold bid changes until you confirm paid click volume.

**Sessions flat, conversions down.** Prioritize rate, checkout, form, and event tagging sections. Run device and landing page rate splits immediately in GA4.

**Both down together.** Work channel split first. If one channel dominates, follow that tool branch (GSC for organic, Ads for paid). If all channels move together, suspect brand demand, seasonality, or tracking before media refactors.

**Spike then crash.** Check for email sends, viral posts, or bot traffic in referral and direct rows. Compare engaged sessions per user, not raw sessions alone.

## Stakeholder script after the half hour

Use plain language tied to evidence:

"We compared three equal-length periods in GA4. Sessions fell X% with largest loss on [channel/page]. Search Console clicks moved [direction] on [pages]. Ads spend and conversions moved [direction]. Current working theory is [label]. Next checkpoint is [date] after [action]."

Avoid promising full recovery timelines on the call. Share the thread link or screenshots so finance and leadership see the same tables you used.

## What not to do in the first 30 minutes

- Rebuild entire attribution models
- Change twelve campaigns at once
- Announce a Google update without query-level GSC evidence
- Email the client "tracking is broken" before one live conversion test
- Merge Client A and Client B data in one chat because it is faster

Speed comes from ordered prompts, not from skipping GTM or consent checks when rate and event counts diverge.

## Frequently asked questions

### How do I know if a traffic drop is real or reporting delay?

Compare equal-length periods that exclude today if your timezone still ingests partial data. Check if Search Console and Ads show the same directional move. If only GA4 moves, suspect filters, internal traffic, or tagging.

### Should I pause Google Ads during a conversion drop?

Not until you split volume vs rate and check Ads-native conversions. Pausing during a tracking outage destroys learning and does not fix GA4 event counts.

### What date range works best for a 30-minute investigation?

Three-day vs prior three-day for urgency, plus seven-day vs prior seven-day for stability. Align GSC and Ads to the same calendar dates where APIs allow.

### When does GA4 alone suffice for the first pass?

When you need fast channel and landing page splits and you trust recent tagging. Add GSC when organic is implicated; add Ads when paid is implicated. Goal setting context lives in [marketing KPI targets and goal setting](/resources/blogs/marketing-kpi-targets-goal-setting).

### Can I run this playbook for conversion spikes?

Yes. Replace "loss" sorts with "gain" sorts and still verify tracking before celebrating. Spikes from duplicate events are common after GTM changes.

### How do I hand off after thirty minutes?

Leave the thread with labeled cause, charts, owners, and next checkpoint. Escalate to full audits only if multiple causes compete or the drop exceeds KPI thresholds for three consecutive days.

---

Run incident playbooks in scoped chats with inline charts: [Conversational Analytics](https://chat.conalytic.com/signup).
`;
