/** Blog body: KPIs Tracker — 1000+ words, aligned with Conalytic-Chat. */
export const kpisTrackerBody = `
Most marketing teams set goals in slide decks and track them in spreadsheets. By mid-month, the spreadsheet is stale, Search Console data lives in one tab, Google Ads in another, and nobody agrees whether Q2 traffic is *on track* or *at risk*. **KPIs Tracker** in Conalytic (labeled **KPIs** in the app) replaces that friction with a single dashboard: connect GA4, Google Search Console, and Google Ads via OAuth, define goals with direction and target percentages, and see **On track**, **At risk**, **Off track**, or **No data** labels—with six months of history and optional GSC keyword ranking goals.

This article explains how KPIs Tracker works inside Conalytic-Chat, which metrics you can monitor, how scoring is calculated (rules-based, not AI), and how to roll it out across clients or business units.

## What is KPIs Tracker?

The in-app list page describes it plainly: *“Define goals across GA4, Search Console, and Google Ads—then track on-track status against your targets.”* Unlike Conversational Analytics, KPIs Tracker does **not** call an LLM to judge performance. Status labels come from **deterministic rules**: compare current period performance to your target direction (increase or decrease) and threshold percentage, then classify health.

That design choice matters for finance-adjacent KPIs. Stakeholders want repeatable math, not a model’s opinion. Conalytic delivers that while still pulling **live API data** from Google’s marketing platforms.

## Supported integrations and metrics

KPIs Tracker supports **three platforms only**—not GTM, Meta, or LinkedIn:

### Google Analytics 4

- Sessions  
- Conversions  
- Users  
- Bounce rate  

### Google Search Console

- Organic clicks  
- Impressions  
- CTR  
- Keyword rankings (dedicated goal type)  

### Google Ads

- Ad spend  
- Paid clicks  
- CPC  
- Ads conversions  

When you create a project, you connect **one entity per platform** (GA4 property, GSC site, Ads account). The wizard suggests one-click **recommended goals** per platform so you are not building from a blank slate.

## Creating a KPI project: the wizard flow

Click **New project** (or **Create your first KPI project** on an empty list). The wizard has four steps:

1. **Project basics** — Name your reporting period and choose **Monthly** or **Yearly** tracking.  
2. **Data sources** — Connect GA4, GSC, and/or Google Ads for this project.  
3. **KPI goals** — Select metrics, set **increase** or **decrease** direction, target **%**, and enable or disable individual goals.  
4. **Keyword rankings** (if GSC is connected) — Track up to **300 keywords**; paste from a spreadsheet; set goals like “All keywords top 10.”

On creation, Conalytic backfills **six months of history** with a loading state: *“Fetching the last 6 months of KPI data…”* Scheduled evaluation runs on the **1st of each month** so dashboards stay current without manual exports.

## Reading the dashboard

Open a project to see:

- **Month** vs **Year to date** toggles  
- Summary counts: **On track**, **At risk**, **Off track**, **No data**  
- Per-goal cards with actuals, % change, sparklines, and status pills  
- **History** panel for monthly snapshots (achieved / partial / missed / no data) on monthly projects  
- **Settings** to edit name, sources, goals, and keywords  
- **Refresh** (superadmin) when you need to force a re-pull  

Status semantics are fixed across projects:

| Status | Meaning |
|--------|---------|
| **On track** | Performance meets or beats the configured target direction |
| **At risk** | Trending toward miss; needs attention |
| **Off track** | Materially missing the goal |
| **No data** | Platform returned insufficient data for the period |

Because scoring is **rules-based**, the same inputs always produce the same label—ideal for client reporting where you must explain *why* a KPI is amber.

## Monthly vs year-to-date views

**Monthly** projects compare month-on-month performance—perfect for standups and client WBRs. **Yearly** projects compare year-to-date against the same period last year—better for board reviews and annual planning. Pick the cadence when you create the project; both views share the same goal definitions but different comparison windows.

## GSC keyword ranking goals

Search-driven brands often care about positions, not just clicks. When Search Console is connected, enable keyword tracking and import up to **300 queries**. Goals can target aggregate outcomes (e.g., share of keywords in top 10). This complements click and impression KPIs without exporting GSC to Sheets every Monday.

## How KPIs Tracker differs from Conversational Analytics

| Capability | KPIs Tracker | Conversational Analytics (Chats) |
|------------|--------------|--------------------------------|
| Primary interaction | Dashboard + status pills | Natural-language chat |
| Platforms | GA4, GSC, Google Ads | GA4, GSC, Ads, GTM, Meta (+ LinkedIn connect) |
| LLM usage | None for scoring | Token-metered chat |
| Best for | Ongoing goal monitoring | Ad hoc investigation |
| History | Six-month backfill + monthly snapshots | Chat thread history |

Many teams use **both**: KPIs Tracker for the Monday health check; Chats for *“Why is this KPI at risk?”* deep dives.

## Billing and operations

KPI evaluation uses backend API calls and scheduled jobs—not LLM tokens. On Conalytic Pro you still need an account and connected OAuth sources, but you are not charged per KPI calculation the way you are for chat messages or AI report narratives. That makes KPIs Tracker economical for high-frequency monitoring across many client projects.

## Implementation playbook for agencies

**One project per client or brand.** Keep GA4 properties and Ads accounts scoped cleanly.

**Standardize a goal template.** Example retail client: GA4 sessions (+10% MoM), GSC clicks (+8%), Ads ROAS (decrease CPA equivalent via conversions/spend). Copy settings via the wizard on new projects.

**Review on the 1st.** Align internal standups with Conalytic’s monthly evaluation schedule.

**Pair with Report Builder.** Export narrative context in monthly HTML decks while KPIs Tracker supplies the truth layer. See [Report Builder](/products/report-builder) for deck automation.

**Document thresholds in client SOWs.** When “At risk” triggers a call, write it into your SLA.

## Implementation playbook for in-house teams

**Executive dashboard project.** Five to eight KPIs max—sessions, conversions, organic clicks, spend, CPC.

**Channel owner projects.** Paid team owns Ads KPIs; SEO owns GSC; web owns GA4 engagement.

**YTD for leadership; monthly for operators.** Duplicate projects only when cadences truly differ to avoid goal sprawl.

## Common pitfalls to avoid

**Too many KPIs.** More than a dozen goals per project dilutes attention. Prefer eight focused metrics.

**Mismatched periods.** Ensure everyone knows whether you are judging MoM or YTD before debating a red pill.

**Ignoring No data.** Often a connection or property mapping issue—fix OAuth before blaming performance.

**Expecting Meta or GTM here.** Use Chats or Reports for those platforms.

## Frequently asked questions

**Is KPI status AI-generated?**  
No. Rules compare live metrics to your targets.

**Can I track ecommerce revenue in GA4?**  
Use the GA4 metrics available in the catalog (sessions, conversions, users, bounce rate). Map “conversions” to your key events in GA4 first.

**How far back does history go?**  
Six months on project creation, then monthly snapshots thereafter.

**Can clients log in?**  
Use Conalytic workspace access models; each project is visible to authorized workspace users.

## Get started with KPIs Tracker

KPIs Tracker is available now in Conalytic. [Sign up free](https://chat.conalytic.com/signup), open **Connections**, link GA4, GSC, and/or Google Ads, then click **KPIs → New project**. Within minutes you will see whether this month is on track—without another spreadsheet.

Learn more on the [KPIs Tracker product page](/products/kpis-tracker), explore [Conalytic features](/features), or [contact us](/contact) for enterprise rollouts.
`;
