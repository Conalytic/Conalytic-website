/** Blog body: KPIs Tracker — customer-facing guide. */
export const kpisTrackerBody = `
Most marketing teams set goals in slide decks and track them in spreadsheets. By mid-month, the spreadsheet is stale, Search Console data lives in one tab, Google Ads in another, and nobody agrees whether Q2 traffic is *on track* or *at risk*.

**KPIs Tracker** in Conalytic replaces that friction with one dashboard: connect Google Analytics 4, Google Search Console, and Google Ads, define your goals, and see clear status labels—**On track**, **At risk**, **Off track**, or **No data**—with months of history at a glance.

This guide explains what KPIs Tracker is, how it fits into Conalytic, how to set it up, and why marketing teams use it.

## What is Conalytic?

**Conalytic** is a marketing analytics platform built for teams who manage performance across Google and Meta properties. It brings together conversational analytics, goal tracking, and automated reporting in one workspace.

**KPIs Tracker** is Conalytic’s goal-monitoring product. While [Conversational Analytics](/products/conversational-analytics) is for asking ad hoc questions, KPIs Tracker is for **watching the metrics that matter every month**—without rebuilding the same spreadsheet.

## What is KPIs Tracker?

KPIs Tracker lets you define marketing goals across GA4, Search Console, and Google Ads, then see whether you are hitting them. Set a target (for example, *increase sessions by 10% month over month*), and Conalytic pulls live data and shows a clear status for each goal.

Status labels are **rules-based and consistent**—the same data always produces the same result. That matters when you are reporting to clients or leadership and need to explain *why* a metric is green, amber, or red.

## Supported platforms and metrics

KPIs Tracker focuses on the three platforms most teams use for core marketing KPIs:

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
- Conversions

Connect one property, site, or account per platform when you create a project. The setup wizard suggests **recommended goals** so you are not starting from scratch.

## Key benefits

### One place for goal health

See GA4, GSC, and Ads goals side by side instead of checking three tools every Monday.

### Clear status at a glance

**On track**, **At risk**, **Off track**, and **No data** labels remove ambiguity from standups and client calls.

### Repeatable, explainable scoring

Rules-based evaluation means you can defend every status label with the same logic every month.

### Historical context

Conalytic backfills history when you create a project and keeps monthly snapshots so you can see trends—not just this week’s number.

### Optional keyword tracking

For SEO-focused teams, track up to 300 Search Console keywords and set ranking goals (for example, share of keywords in the top 10).

## How to set up a KPI project

1. **Sign up** for Conalytic and connect GA4, GSC, and/or Google Ads on the Connections page.
2. Open **KPIs** and click **New project**.
3. **Name** your project and choose **Monthly** or **Yearly** tracking.
4. **Connect** your data sources for this project.
5. **Define goals**—pick metrics, set increase or decrease direction, and set target percentages.
6. **Add keyword rankings** (optional) if Search Console is connected.
7. **Review** your dashboard—status labels and history populate automatically.

## Reading your dashboard

Open any project to see:

- **Month** vs **Year to date** views
- Summary counts for each status type
- Per-goal cards with actuals, change percentages, and trend sparklines
- **History** for past monthly snapshots
- **Settings** to update goals, sources, or keywords

| Status | What it means |
|--------|---------------|
| **On track** | Performance meets or beats your target |
| **At risk** | Trending toward a miss—needs attention |
| **Off track** | Materially missing the goal |
| **No data** | Not enough data returned for the period—check your connection |

## Monthly vs year-to-date

**Monthly** projects compare month-on-month—ideal for weekly standups and client reviews.

**Yearly** projects compare year-to-date against the same period last year—better for board reviews and annual planning.

Choose the cadence when you create the project.

## KPIs Tracker vs Conversational Analytics

| | KPIs Tracker | Conversational Analytics |
|---|-------------|--------------------------|
| **Purpose** | Ongoing goal monitoring | Ad hoc questions and exploration |
| **Interaction** | Dashboard with status labels | Natural-language chat |
| **Platforms** | GA4, GSC, Google Ads | GA4, GSC, Ads, GTM, Meta |
| **Best for** | Monday health checks | *“Why is this KPI at risk?”* deep dives |

Many teams use **both**: KPIs Tracker for the weekly pulse; Conversational Analytics when something needs investigation.

## Tips for agencies

- **One project per client or brand** to keep data scoped cleanly.
- **Standardize a goal template** across similar clients (sessions, clicks, conversions, spend).
- **Review on the first of the month** when new evaluation cycles run.
- **Pair with Report Builder** for monthly client decks—KPIs supply the truth layer, reports supply the narrative.

## Tips for in-house teams

- **Executive dashboard:** five to eight KPIs max—sessions, conversions, organic clicks, spend.
- **Channel ownership:** paid team owns Ads goals; SEO owns GSC; web owns GA4 engagement.
- **Document thresholds** so everyone knows what triggers an “at risk” conversation.

## Common mistakes to avoid

- **Too many KPIs** — more than a dozen goals per project dilutes focus.
- **Unclear periods** — agree whether you are judging month-over-month or year-to-date before debating a red status.
- **Ignoring “No data”** — often a connection or property mapping issue, not a performance problem.
- **Expecting Meta or GTM here** — use Conversational Analytics or Report Builder for those platforms.

## Frequently asked questions

**Is KPI status AI-generated?**  
No. Status comes from comparing your live metrics to the targets you set.

**How far back does history go?**  
Conalytic backfills several months when you create a project, then adds monthly snapshots over time.

**Can I track ecommerce revenue?**  
Use GA4 conversions aligned to your key events in GA4 first, then track conversions as a KPI.

**Can teammates access the same project?**  
Yes—workspace members with access can view and manage projects you share.

## Get started

KPIs Tracker is available in Conalytic today. [Sign up free](https://chat.conalytic.com/signup), connect your platforms, and create your first project in minutes.

Learn more on the [KPIs Tracker product page](/products/kpis-tracker), explore [all features](/features), or [contact us](/contact) for enterprise rollouts.
`;
