/** Blog body: Report Builder — customer-facing guide. */
export const reportBuilderBody = `
Client reporting is where great marketing work often gets buried—in copy-paste hell. Analysts export GA4, pull Search Console into spreadsheets, screenshot Google Ads, paste into slides, write commentary, fix formatting, and repeat next month.

**Report Builder** in Conalytic automates that workflow. Connect your marketing platforms, choose date ranges and focus areas, optionally add AI-written insights, and generate a **polished HTML presentation** your clients can open in any browser.

This guide explains what Report Builder is, how it works in Conalytic, and how agencies and in-house teams ship better reports with less manual work.

## What is Conalytic?

**Conalytic** helps marketing teams understand and communicate performance across Google Analytics 4, Google Search Console, Google Ads, Google Tag Manager, and more—from one workspace.

Three products work together:

- **[Conversational Analytics](/products/conversational-analytics)** — ask questions and explore data in chat
- **[KPIs Tracker](/products/kpis-tracker)** — monitor goals with on-track / at-risk status
- **Report Builder** — deliver presentation-ready HTML decks for clients and leadership

Report Builder is for the moment you need a **finished deliverable**, not just an answer.

## What is Report Builder?

Report Builder turns your connected marketing data into a **multi-slide HTML presentation**. Each deck includes a cover, table of contents, executive summary, platform sections, cross-channel findings, methodology, and an action plan—viewable inside Conalytic or downloadable as HTML.

Active platforms today: **Google Analytics 4**, **Google Search Console**, **Google Ads**, and **Google Tag Manager**.

## What goes into a report?

A typical deck includes:

- **Cover** with client name, report title, and date range
- **Executive summary** for leadership
- **Health check** and **KPI snapshot**
- **Platform sections** with charts and tables per channel
- **Cross-source findings** connecting organic, paid, and site behavior
- **Methodology** documenting the reporting window and data in scope
- **Prioritized action plan** for next steps

Methodology slides help agencies show rigor—especially when clients compare your numbers to their internal GA4 view.

## Platform focus areas

When you configure a report, choose what to emphasize per platform:

### Google Analytics 4
Traffic, channels, pages, conversions, devices

### Google Search Console
Queries, pages, page + query combinations, device breakdowns

### Google Ads
Trends, campaigns, devices

### Google Tag Manager
Full container audit, overview, security, consent

Ecommerce teams lean on GA4 conversions; SEO retainers emphasize GSC queries; paid media reviews need Ads campaigns; technical retainers add GTM security and consent slides.

## Key benefits

### Save hours every reporting cycle

Generate a structured deck in minutes instead of rebuilding slides from scratch.

### Professional output clients can open anywhere

HTML decks work in any browser—no PowerPoint license required. Download and send, or walk through the in-app viewer on a call.

### Consistent structure month to month

Regenerate with the same settings so layouts stay familiar—clients notice when formats jump around.

### Optional AI narratives

Turn on **AI insights** when you want personalized slide copy, findings, and recommendations. Turn them off when you need a data-only deck you will edit yourself.

### Cross-channel story in one place

See how organic, paid, and site behavior connect—without manually stitching screenshots from four tools.

## How to create a report

1. Open **Reports** and click **New report**.
2. Enter a **title** and **client name** (shown on the cover).
3. Choose a **date range**: last 7, 28, 30, or 90 days; last month; or a custom range.
4. Set a **comparison**: previous period, same period last year, or none.
5. Add optional **scoped notes** (for example, *“organic focus only”*) to guide the narrative.
6. Configure **data sources**—select the connection and property, site, account, or container for each platform.
7. Toggle **AI insights** on or off and pick your preferred model if enabled.
8. Click **Generate report** and review when status shows ready.

Use **Regenerate** with the same settings when data refreshes—keeps slide structure consistent across months.

## When to enable AI insights

| Scenario | Recommendation |
|----------|----------------|
| Executive readout needing narrative | **On** |
| Data-only appendix for analysts | **Off** |
| Regulated client requiring exact wording | **Off**—edit HTML manually |
| First draft before your team adds commentary | **On**, then refine |

AI insights personalize slide copy and recommendations. Data-only reports rely on charts and tables without generated narrative.

## Report Builder vs other Conalytic tools

| Tool | Output | Best for |
|------|--------|----------|
| **Report Builder** | HTML presentation deck | Client deliverables, board packs |
| **Conversational Analytics** | Chat answers with inline charts | Live Q&A, investigations |
| **KPIs Tracker** | Goal status dashboard | Ongoing monitoring |

A common agency workflow: **KPIs Tracker** all month for health → **Conversational Analytics** for anomaly deep dives → **Report Builder** for the monthly send.

## Tips for better reports

**Spot-check the methodology slide** against your statement of work date range.

**Verify each platform section** uses the correct property or account—wrong GA4 property selection is the most common mistake.

**Read AI recommendations** before sending—edit the downloaded HTML if any wording needs adjustment.

**Regenerate once** if a platform returned partial data due to a temporary API delay.

**Archive the HTML** in your project management tool for audit trails.

## Who benefits most?

- **Marketing agencies** shipping recurring GA4 + GSC + Ads recaps
- **In-house growth teams** preparing monthly leadership decks
- **Consultants** delivering GTM audit readouts
- **Freelance PPC managers** who want professional presentations without slide grunt work

## Frequently asked questions

**Can I edit the deck after generation?**  
Yes. Download the HTML and edit locally, or regenerate after fixing data sources.

**Does Report Builder email clients automatically?**  
Download and send through your own email or client portal today.

**Are Meta Ads included?**  
Report Builder currently focuses on GA4, GSC, Google Ads, and GTM. Use Conversational Analytics for Meta exploration.

**How is this different from Looker Studio?**  
Report Builder delivers a **structured narrative deck** with executive summary and action plan—not just a dashboard export.

## Get started

Report Builder is available in Conalytic today. [Create your account](https://chat.conalytic.com/signup), connect your platforms, and open **Reports → New report**.

Your first deck can be ready before your next client call ends.

Explore the [Report Builder product page](/products/report-builder), see [all features](/features), or [contact us](/contact) to walk through a sample presentation with our team.
`;
