/** Blog body: Marketing report structure — client deck guide. */
export const marketingReportStructureBody = `
A strong **marketing report structure** leads with decisions, not data dumps. The best monthly marketing reports open with a 40-to-60-word executive summary, a health check against agreed KPIs, then platform evidence ordered by what the client must decide this month—not by whether the slide came from GA4, Search Console, or Google Ads. Close with methodology and a prioritized action plan.

This guide defines a **12-slide client reporting template** agencies and in-house teams can reuse every month. It explains why slide order matters, how to build an agency report format that survives scrutiny, and where [Report Builder](/products/report-builder) automates the structure without sacrificing rigor.

## What is the best marketing report structure for client decks?

The best structure answers four questions in order: **What happened?** **Are we on track?** **Why?** **What do we do next?** Data-source sections (GA4, GSC, Ads) belong in the middle as evidence—not as the opening act. Clients hire you for judgment; the deck should reflect that.

A proven **monthly marketing report** flow:

1. Cover
2. Contents
3. Executive summary
4. Health check
5. KPI snapshot
6. Platform sections (as needed)
7. Cross-source findings
8. Methodology
9. Action plan

Conalytic's [Report Builder](/products/report-builder) ships this as a default 12-slide HTML deck. You can trim platform slides when a channel was inactive, but the decision-first spine stays intact.

## Why should you order slides by decision, not by data source?

Ordering by data source—"here is GA4, here is GSC, here is Ads"—forces clients to synthesize the story themselves. That is analyst work, not client work.

**Decision-first ordering** means:

- **Executive summary** states the month's headline and the one decision required (continue, pivot, investigate, or escalate).
- **Health check** shows whether agreed goals are on track before anyone debates chart granularity.
- **KPI snapshot** quantifies the gap: target vs actual, with a clear threshold (for example, within 5% of target = on track; 5–15% = at risk; beyond 15% = off track).
- **Platform sections** provide proof for claims already made upstream.
- **Cross-source findings** connect channels (organic vs paid overlap, landing-page conversion gaps, query-level CTR shifts).
- **Action plan** converts insight into owners, deadlines, and success metrics.

Use this rule: if removing a slide would not change what the client decides this month, cut it or move it to an appendix.

## What belongs on each slide of a 12-slide marketing report?

Below is a **client reporting template** mapped slide by slide. Adjust depth per retainer scope; keep the sequence.

### Slide 1: Cover

Client name, report title, reporting period (for example, 1–30 June 2026), prepared by, and date generated. No metrics on the cover—only orientation.

### Slide 2: Contents

List every section with slide numbers. Clients forward decks; contents help recipients find the executive summary and action plan without scrolling blindly.

### Slide 3: Executive summary

Three to five bullets, maximum 120 words total:

- **Headline result** (one sentence with the primary KPI movement).
- **On-track status** (reference goals from the health check slide).
- **Top driver** (the single largest contributor to change).
- **Top risk** (one issue that could reverse progress next month).
- **Decision ask** (approve budget shift, sign off on test, or acknowledge seasonal dip).

If you cannot state the decision ask, the report is not ready to send.

### Slide 4: Health check

Traffic-light or status-label view of contracted KPIs. Align thresholds with your [KPIs Tracker](/products/kpis-tracker) project if you use Conalytic for ongoing monitoring—same On track / At risk / Off track / No data labels, same rules-based logic, every month.

**Supported KPIs Tracker metrics:** GA4 sessions, conversions, users, bounce rate; GSC clicks, impressions, CTR, and up to 300 keyword rankings; Google Ads spend, clicks, CPC, and conversions. Revenue or CRM-based leads belong on this slide only if tracked as GA4 key events or documented separately.

Recommended default thresholds for month-over-month goals:

| Status | Rule of thumb |
|--------|----------------|
| On track | Within 5% of target or trending to recover within one period |
| At risk | 5–15% off target with no clear recovery trend |
| Off track | More than 15% off target, or two consecutive at-risk months |
| No data | Source disconnected, tracking broken, or goal not yet measurable |

Document any threshold overrides in the methodology slide.

### Slide 5: KPI snapshot

Table or chart showing target, actual, delta, and prior-period comparison. Include at least:

- One **volume** metric (sessions, clicks, impressions).
- One **efficiency** metric (CPC, CTR, conversion rate).
- One **outcome** metric (conversions, revenue, qualified leads).

Limit to six KPIs on the snapshot slide. Additional metrics belong in platform sections or an appendix.

### Slides 6–8: Platform sections

One slide per active platform is typical: **GA4**, **Search Console**, **Google Ads**. Inactive channels get omitted—not empty placeholders.

Each platform slide should follow the same micro-structure:

1. **Period headline** (up, down, flat—with percentage).
2. **One chart** that supports the executive summary claim.
3. **One table** with the top five rows (pages, queries, campaigns—whatever drove the change).
4. **One sentence** tying the platform result to the cross-channel story.

Do not open platform slides with vanity metrics. Lead with the metric tied to the retainer objective.

### Slide 9: Cross-source findings

This slide separates a **monthly marketing report** from three disconnected exports. Examples:

- Paid brand terms capturing clicks that organic would have won anyway.
- High-impression GSC queries with CTR below 2% on positions 4–10.
- GA4 landing pages with strong traffic but conversion rate below site average by more than 30%.
- Google Ads conversion totals diverging from GA4 by more than 20% for the same conversion event.

Cross-source analysis is where [Conversational Analytics](/products/conversational-analytics) helps during investigation—open scoped GA4, GSC, or Ads threads to explore anomalies—but the client deck should present **verified findings** from [Report Builder](/products/report-builder) rule-based detectors, not raw chat logs. See our guide on [cross-channel reporting](/resources/blogs/cross-channel-reporting-gsc-ga4-ads) for named patterns and detection rules.

### Slide 10: Methodology

The methodology slide is not boilerplate—it is your defense when a client compares your numbers to their internal view.

Include:

- **Reporting window** (exact dates, timezone, comparison period).
- **Properties in scope** (GA4 property ID, GSC site URL, Ads account, GTM container if audited).
- **Metrics definitions** (which conversion events count, attribution model if relevant).
- **Known limitations** (consent mode impact, data processing delays, brand campaigns excluded).
- **Data freshness** (when APIs were last pulled).

Agencies that skip methodology invite "your GA4 doesn't match mine" threads that consume the entire client call. A two-minute methodology slide prevents twenty minutes of reconciliation.

### Slide 11: Action plan

Prioritized table with columns: **Action**, **Owner**, **Due date**, **Success metric**, **Priority (P1–P3)**.

Rules for a credible action plan:

- **Maximum five items** on the primary slide; overflow goes to appendix.
- Every P1 action must link to a finding from slides 4–9—not a generic "optimize SEO."
- Each action needs a measurable success metric (for example, "raise CTR on target queries from 1.8% to 2.5%").
- If no P1 actions exist, state why (seasonal hold, awaiting client asset, test in flight).

### Slide 12: Appendix or next steps (optional)

Use for detailed tables, keyword lists, or campaign-level exports. Some teams merge this with the action plan to stay at exactly twelve slides; others add a closing "questions" slide for live readouts.

## How does an agency report format differ from an internal monthly marketing report?

**Client-facing decks** emphasize decisions, plain language, and defensible methodology. **Internal reports** can include raw exports, experiment logs, and unfinished hypotheses.

| Element | Client deck | Internal report |
|---------|-------------|-----------------|
| Executive summary | Required, non-technical | Optional |
| Methodology | Full slide | Link or footnote |
| Platform detail | Top five rows only | Full exports |
| Cross-source findings | Verified, sourced | Exploratory notes OK |
| Action plan | Named owners and dates | Backlog items OK |

The structure stays the same; depth changes. Never send internal exploratory notes to clients without verification.

## When should you use a client reporting template vs custom structure?

Use the **12-slide template** when:

- You report monthly or quarterly on a recurring retainer.
- Multiple team members produce decks and need consistency.
- Clients compare your reports month over month.

Customize when:

- The engagement is a one-off audit (swap platform slides for audit findings).
- The client contract specifies a different KPI framework—map their goals to slides 4–5, keep the decision order.
- A single channel dominates (a paid-only retainer might use one platform slide and expand cross-source findings).

[Report Builder](/products/report-builder) regenerates the same template each period so clients see familiar navigation even when metrics shift dramatically.

## How do you connect report structure to ongoing monitoring?

Structure works best when slides 4–5 pull from systems that already track goal health. A common workflow:

1. **KPIs Tracker** all month for status labels and trend context.
2. **Natural language analytics** for anomaly investigation when a KPI flips to at-risk.
3. **Report Builder** for the monthly client deck using the 12-slide structure.

This prevents the monthly scramble where someone rebuilds goal logic in a spreadsheet forty-eight hours before the client call. If your health check slide disagrees with your monitoring dashboard, fix the definitions—not the slide order.

Read the full [KPIs Tracker guide](/resources/blogs/kpis-tracker-marketing-goals-guide) for goal setup and threshold configuration.

## What mistakes break marketing report sections?

**Leading with platform dumps.** Clients lose the thread before slide 3.

**Mixing comparison periods.** June vs May on one slide, June vs June last year on another—without labeling—erodes trust.

**Unbounded KPI lists.** More than six KPIs on the snapshot slide means none of them matter.

**Missing methodology.** Invites number debates instead of strategy discussions.

**Generic action plans.** "Improve content" without owner, date, or metric is not an action.

**Inconsistent month-to-month structure.** Clients should know where to find the executive summary and action plan every time.

## Frequently asked questions

**How many slides should a monthly marketing report have?**  
Twelve slides is a practical default: cover, contents, executive summary, health check, KPI snapshot, up to three platform sections, cross-source findings, methodology, and action plan. Trim inactive platform slides; do not trim decision slides.

**What marketing report sections do clients read first?**  
Executive summary, health check, and action plan—in that order. Platform sections are reference material unless the client questions a specific claim.

**Should platform sections follow a fixed order?**  
Order platform sections by **relevance to this month's story**, not alphabetically. If paid drove the month's result, put Google Ads before Search Console.

**Do I need a methodology slide for small retainers?**  
Yes. Even a five-hour-per-month engagement benefits from documented date ranges and property IDs. It takes one minute to generate and saves one call of reconciliation.

**Can Report Builder enforce this structure automatically?**  
Yes. [Report Builder](/products/report-builder) generates the 12-slide HTML deck with executive summary, health check, KPI snapshot, platform sections, cross-source findings, methodology, and action plan. Regenerate monthly with the same settings for consistent structure.

**How does this relate to PDF or live dashboard reporting?**  
Structure is format-agnostic. The same slide sequence works in HTML, PDF, or a live dashboard walkthrough. See [HTML vs PDF vs live dashboard reports](/resources/blogs/html-vs-pdf-live-dashboard-reports) for format trade-offs.

**Should AI write the executive summary?**  
AI can draft narrative copy, but findings must come from verified data and deterministic checks—not generated causation. Read [should AI write client reports](/resources/blogs/should-ai-write-client-reports) before enabling AI narratives on client decks.

## Get started

A repeatable **marketing report structure** turns monthly reporting from a formatting exercise into a decision conversation. Start with the 12-slide spine, align health check thresholds with your monitoring tools, and order evidence by what the client must decide—not by which platform you opened first.

[Create your account](https://chat.conalytic.com/signup), connect GA4, Search Console, and Google Ads, and generate your first structured deck in [Report Builder](/products/report-builder). For cross-channel patterns to populate slide 9, see [cross-channel reporting](/resources/blogs/cross-channel-reporting-gsc-ga4-ads).
`;
