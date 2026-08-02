/** Blog body: KPI status tracking — rules-based vs AI scoring. */
export const kpiStatusTrackingBody = `
KPI status tracking labels each marketing goal on track, at risk, off track, or no data by comparing live metrics to defined targets. The same inputs must always produce the same label—rules-based scoring, not AI. This guide covers threshold design, the four states, and where AI helps explain slips without assigning scores.

## What is KPI status tracking?

**KPI status tracking** is the practice of evaluating marketing goals on a fixed cadence and labeling each goal with a health status. It answers one question per metric: *given our target and the latest data, are we where we need to be?*

Status tracking is not the same as reporting. Reporting describes what happened. Status tracking judges whether what happened is acceptable relative to a pre-agreed goal.

A mature KPI status tracking workflow has four components:

1. **Defined targets** with direction, threshold, and comparison window (see [marketing KPI targets guide](/resources/blogs/marketing-kpi-targets-goal-setting))
2. **Live data** from connected platforms (GA4, Search Console, Google Ads)
3. **Rules-based evaluation** that maps actual performance to a status label
4. **Documented thresholds** for the boundary between at risk and off track

Without component four, teams debate whether amber means "watch it" or "panic." Without component three, the same dashboard shows different colors on different days for the same data—a credibility problem in client and leadership reviews.

Conalytic's [KPIs Tracker](/products/kpis-tracker) implements all four states. Status labels are computed from your configured target percentage, comparison window (monthly or yearly), and live GA4, GSC, or Google Ads data—**deterministic rules, not an LLM**.

## Why must KPI status labels be reproducible?

Reproducibility means: **same inputs, same status label, every time.**

If organic clicks are 12,400 this month, your target is 10% MoM growth, and last month was 11,500, the status calculation should return the same result whether you check on Tuesday or Friday, whether your CEO or your intern opens the dashboard, and whether you are in a calm month or a crisis month.

### Why reproducibility matters

**Client trust.** Agencies lose retainers when clients discover that "at risk" last week became "on track" this week with no data change—only a different interpretation.

**Internal alignment.** Paid, SEO, and analytics leads should not need a meeting to agree on whether conversions are red. The rule decides.

**Auditability.** When leadership asks "why is this off track?", you point to the formula: actual change vs target threshold, evaluated against the agreed comparison window.

**Historical consistency.** Month-over-month snapshots only matter if the scoring logic was stable when those snapshots were taken.

### What breaks reproducibility

- **Manual color-coding in spreadsheets** where whoever updates the sheet applies judgment
- **AI-generated status labels** where temperature, prompt wording, or model version can change the output
- **Undocumented at-risk bands** where "close enough" is subjective
- **Retroactive target changes** without re-evaluating prior periods

**Rule for your team:** if two people cannot independently arrive at the same status label from the same spreadsheet row, your KPI status tracking is not reproducible yet.

## What are the four KPI status states?

Conalytic uses four states. Each has a precise meaning. None should be treated as decoration.

### On track

Performance meets or exceeds the target threshold for the current evaluation period.

**Example:** Target is 8% MoM session growth. Actual growth is 9.2%. Status: **on track**.

On track does not mean "perfect." It means the agreed minimum was achieved. Teams that only celebrate record months and treat 8.1% against an 8% target as "meh" train people to ignore thresholds.

### At risk

Performance is below the target but within a defined buffer zone—close enough that recovery is plausible before the period ends, or the miss is material enough to warrant attention but not yet a crisis.

**Example:** Target is 8% MoM session growth. Actual growth is 4.1%. Status: **at risk** (assuming a documented buffer of roughly 40–60% of target).

At risk exists to trigger **early action**, not late panic. It is the status that should produce a Slack message, a budget review, or a client heads-up—not a full postmortem.

### Off track

Performance has missed the target by a margin defined in your threshold documentation. Recovery within the current period is unlikely without intervention, or the miss is large enough to require escalation.

**Example:** Target is 8% MoM session growth. Actual growth is −2%. Status: **off track**.

Off track is not a moral judgment. It is a signal that the current strategy, budget, or execution is not producing the agreed outcome. The response is diagnosis and correction, not blame.

### No data

The platform returned insufficient or no data for the evaluation period.

**Example:** GA4 connection expired, property ID changed, or the evaluation ran before the month's data was fully processed. Status: **no data**.

No data is an **honest** state. It is preferable to guessing green or red from stale numbers. Treating no data as "probably fine" is how teams ship client reports with wrong figures.

**Defending no data to clients:** "We are not showing a performance status because we do not have reliable data for this period. Here is what we are doing to restore the connection." That sentence builds more trust than a fabricated amber label.

| Status | Typical trigger | Recommended response |
|--------|-----------------|----------------------|
| On track | Actual ≥ target threshold | Maintain course; note learnings |
| At risk | Actual between buffer floor and target | Investigate; adjust tactics |
| Off track | Actual below buffer floor | Escalate; revise plan or target |
| No data | Missing or incomplete data | Fix connection; do not infer performance |

## How do you design the at-risk vs off-track boundary?

The boundary between at risk and off track is the most under-documented part of marketing KPI monitoring. Teams set an on-track threshold (the target) but leave the amber-to-red line implicit.

### Set the boundary once

Decide the rule **when you create the goal**, not when a metric turns red.

Common approaches:

**Percentage-of-target buffer.** If the target is 10% growth, at risk might be 5–9.9% and off track below 5%. The buffer is 50% of target.

**Fixed point buffer.** For decrease metrics like CPC, at risk might be "within 15% of target" and off track "more than 15% above target."

**Tiered by metric volatility.** High-variance metrics (low-volume conversions) get wider buffers. Stable metrics (large-site sessions) get tighter buffers.

**Example documentation for a single goal:**

> **Metric:** Organic clicks (GSC)  
> **Target:** 8% YoY increase  
> **On track:** ≥ 8% YoY  
> **At risk:** 4% to 7.9% YoY  
> **Off track:** < 4% YoY  
> **No data:** GSC returned zero rows or connection failed  

Write this in your project settings doc, client appendix, or internal wiki. [KPIs Tracker](/products/kpis-tracker) applies consistent **rules-based** scoring from the targets you configure in the wizard; document your at-risk buffer policy alongside those targets so client conversations match the labels in the app.

### Do not move the boundary mid-cycle

Changing the off-track line from 4% to 2% because a goal is red converts status tracking into storytelling. If the target was wrong, **revise the target** with a dated note and re-evaluate forward—not retroactively.

### Align buffers across similar clients

Agencies benefit from a **standard buffer policy** (e.g., at risk = 50–99% of target achieved, off track = below 50%) applied across comparable retainers. Custom buffers per client are fine when documented; invisible custom buffers per account manager are not.

## How does rules-based KPI scoring work?

Rules-based KPI scoring follows a deterministic pipeline:

1. Pull actual value for the metric and period
2. Pull comparison value from the baseline period (prior month or prior year)
3. Calculate percent change (respecting increase vs decrease direction)
4. Compare result to target threshold and buffer rules
5. Assign status label

Every step is inspectable. A stakeholder can replicate the math in a spreadsheet and arrive at the same label.

Conalytic's [KPIs Tracker](/products/kpis-tracker) uses this pipeline for GA4, Search Console, and Google Ads goals. The same data produces the same label on every page load.

This is the opposite of prompting an AI: *"Is our SEO doing well?"* and accepting whatever adjective it returns.

For setting the targets that feed this pipeline, see the [marketing KPI targets guide](/resources/blogs/marketing-kpi-targets-goal-setting).

## Where does AI help in KPI status tracking?

AI is valuable for **narration, explanation, and pattern detection**. It is not a substitute for **scoring**.

### Where AI helps

**Explaining a slip.** When organic clicks flip from on track to at risk, open a **GSC-scoped** or **GA4-scoped** [Conversational Analytics](/products/conversational-analytics) thread: *"Which query clusters lost the most clicks month over month?"* or *"Did branded vs non-branded mix change?"* AI accelerates diagnosis; it does not decide the status label.

**Drafting commentary.** [Report Builder](/products/report-builder) can generate slide narratives summarizing why metrics moved—useful for client decks after the status labels are already set by rules.

**Pattern spotting across many metrics.** AI can surface correlations humans miss: *"CPC rose in the same weeks bounce rate spiked on paid landing pages."* That is insight, not a score.

**Natural-language access.** Teams that do not live in GA4 every day can ask questions in plain English and get charts—without changing the underlying status logic.

### Where AI should not score

**Assigning on track / at risk / off track.** LLM outputs vary with phrasing, context window, and model version. They are not auditable to two decimal places.

**Replacing documented thresholds.** "The AI thinks you are doing fine" is not a client deliverable.

**Filling in no data.** AI should not invent a performance narrative when the connection is broken. No data stays no data.

**Grant AI narration. Deny AI scoring.** Use AI to explain the label [KPIs Tracker](/products/kpis-tracker) already computed. Do not use AI to compute the label.

## What should a goal tracking dashboard include?

A goal tracking dashboard—like the project view in [KPIs Tracker](/products/kpis-tracker)—should make status scannable without hiding the math.

**Essential elements:**

- Status label per goal (on track, at risk, off track, no data)
- Actual value and percent change for the period
- Target threshold stated explicitly
- Comparison window label (MoM or YoY)
- Trend sparkline or history for context
- Summary counts (e.g., 4 on track, 1 at risk, 1 off track)

**What to avoid:**

- Status colors with no hover or drill-down to the underlying numbers
- Goals without direction indicated (increase vs decrease)
- Mixing monthly and yearly goals in one view without clear labels
- Hiding no data behind a gray "neutral" that looks like on track

The dashboard is for **monitoring cadence**—Monday standups, month-start client calls, weekly leadership email. It is not a replacement for deep analysis; pair it with [Conversational Analytics](/products/conversational-analytics) when a status changes.

## How is KPI status tracking different from KPI tracking software features?

Many tools claim "KPI tracking." Evaluate them on whether they meet the reproducibility standard.

| Capability | Required for trustworthy status tracking |
|------------|------------------------------------------|
| Rules-based status labels | Yes |
| Documented target + direction + window | Yes |
| Four-state model including no data | Yes |
| Historical snapshots with stable logic | Yes |
| AI-generated red/green without formula | No |
| Manual-only spreadsheet updates | Fragile |

Conalytic focuses on marketing data sources teams already use:

- **[KPIs Tracker](/products/kpis-tracker):** GA4, Search Console, and Google Ads goals only—rules-based status, six months of history, monthly evaluation on the 1st.
- **[Conversational Analytics](/products/conversational-analytics):** GA4, GSC, Google Ads, and GTM in scoped threads (Meta Ads and LinkedIn Ads coming soon)—read-only OAuth, tokens on Pro.
- **[Report Builder](/products/report-builder):** HTML decks from GA4, GSC, Google Ads, and GTM—optional AI narratives, download and send manually.

If you are comparing KPI tracking software options, ask vendors: *"Show me the exact rule that assigns at risk vs off track. Can I replicate it in Excel?"* If the answer is vague, the status labels will not survive a skeptical client.

## What does a weekly KPI status review look like?

A 20-minute marketing KPI monitoring ritual keeps status labels actionable:

1. **Open the project** in [KPIs Tracker](/products/kpis-tracker). Note summary counts.
2. **Address no data first.** Fix connections before debating performance.
3. **Review off track.** Assign an owner and a diagnostic question for [Conversational Analytics](/products/conversational-analytics).
4. **Review at risk.** Decide one tactical adjustment per goal (budget shift, landing page test, content refresh).
5. **Acknowledge on track.** Brief note on what is working—useful for [Report Builder](/products/report-builder) narratives later.
6. **Log decisions.** One sentence per status change in your project notes or client channel.

Do not renegotiate targets in this meeting. Target changes are a separate conversation with documentation.

## How do agencies use status tracking in client communication?

Agencies face asymmetric information: clients see outputs (ads, content, reports) but not daily platform data. Status labels compress performance into a shared vocabulary.

**Client email template (after labels are set):**

> This month's goal health: 5 on track, 1 at risk (organic clicks), 0 off track. Organic clicks grew 5.2% YoY against an 8% target—at risk per our agreed buffer. We are investigating query-level drops in [category] and will include findings in the monthly report.

The status came from rules. The investigation may use AI. The email uses human judgment on tone.

Pair status summaries with [Report Builder](/products/report-builder) decks for clients who want charts and narrative, not just labels.

## Frequently asked questions

**Is KPI status in Conalytic AI-generated?**  
No. Status labels are rules-based. AI in [Conversational Analytics](/products/conversational-analytics) and [Report Builder](/products/report-builder) helps explain and narrate; it does not assign on track, at risk, or off track.

**Why show no data instead of hiding the goal?**  
Hiding broken goals creates false confidence. No data signals a data pipeline problem that must be fixed before performance can be judged.

**Can we customize the at-risk buffer?**  
Define your buffer policy in documentation when you set targets. [KPIs Tracker](/products/kpis-tracker) evaluates against the targets you configure; align your documented buffers with those settings and client agreements.

**What is the difference between KPI scoring and KPI status tracking?**  
KPI scoring is the act of assigning a label or grade. KPI status tracking is the ongoing process—data pull, evaluation, review, action—built around those labels. Scoring must be reproducible for tracking to be trustworthy.

**Should we use AI to write client commentary on red goals?**  
Yes, as a draft. Human review is still required. The status label itself should come from rules, not from the draft.

**How does this relate to marketing goal tracking?**  
Goal tracking is the full lifecycle: set targets, monitor status, investigate misses, report results. Status tracking is the monitor step. Start with [marketing KPI targets](/resources/blogs/marketing-kpi-targets-goal-setting), then implement monitoring in [KPIs Tracker](/products/kpis-tracker).

**What should I read next?**  
Product setup: [KPIs Tracker guide](/resources/blogs/kpis-tracker-marketing-goals-guide). Investigation workflows: [Conversational Analytics guide](/resources/blogs/conversational-analytics-marketing-chat-guide). Client deliverables: [Report Builder guide](/resources/blogs/report-builder-html-marketing-reports-guide).
`;
