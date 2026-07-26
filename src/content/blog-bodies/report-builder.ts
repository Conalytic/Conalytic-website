/** Blog body: Report Builder (Reports) — 1000+ words, aligned with Conalytic-Chat. */
export const reportBuilderBody = `
Client reporting is where great marketing work goes to die—in copy-paste hell. Analysts export GA4, pull Search Console queries into Sheets, screenshot Google Ads, paste into slides, write commentary, fix formatting, send a PDF, and repeat next month. **Report Builder** in Conalytic (labeled **Reports** in the app) automates the assembly: connect GA4, Google Search Console, Google Ads, and Google Tag Manager, configure date ranges and comparisons, optionally enable **AI insights**, and generate a **premium HTML presentation deck** you can view in-app or download for stakeholders.

This guide covers what Report Builder produces, how it differs from Conversational Analytics and KPIs Tracker, configuration options in Conalytic-Chat, and best practices for agencies shipping monthly client reports.

## What is Report Builder?

The Reports list page headline says it clearly: *“Premium HTML presentations from your connected marketing data.”* Output is not a static PDF factory—it is a **multi-slide HTML deck** with cover, table of contents, executive summary, health check, KPI snapshot, platform sections, cross-source findings, recommendations, methodology, action plan, and thank-you slides. Decks are **viewed inside Conalytic** (embedded viewer) or **downloaded as HTML** for email and archiving.

Meta and LinkedIn appear in the new-report data-source grid but are **disabled** in production—the active platforms are **GA4, GSC, Google Ads, and GTM** only.

## Active integrations and per-platform focus

When you configure a report, each connected platform exposes **focus options** tailored to how marketers actually review that channel:

### Google Analytics 4

- Traffic  
- Channels  
- Pages  
- Conversions  
- Devices  

### Google Search Console

- Queries  
- Pages  
- Page + query  
- Device  

### Google Ads

- Trend  
- Campaigns  
- Devices  

### Google Tag Manager

- Full container audit  
- Overview  
- Security  
- Consent  

Pick the lenses that match your client SOW—ecommerce teams lean on GA4 conversions and pages; SEO retainers emphasize GSC queries; paid media reviews need Ads campaigns and devices; technical retainers add GTM security/consent slides.

## Creating a report: step by step

1. Open **Reports** and click **New report**.  
2. Enter **title** and **client name** (surfaces on the cover and cards).  
3. Choose **date range**: Last 7/28/30 days, Last month, Last 90 days, or **Custom** (up to 366 days).  
4. Set **comparison**: No comparison, Previous period, Previous period same year, or Previous year.  
5. Add optional **scoped notes** (e.g., *“organic report”*) to limit narrative emphasis.  
6. Configure **data sources**—connection + property/site/account/container per platform. Auto-configure fills the form when only one connection exists.  
7. Toggle **AI insights** and select **GPT-5.4**, **Claude Opus 4.8**, or **Gemini 3.1 Pro** if enabled.  
8. Click **Generate report** and wait for status **ready** (or **failed** with retry).

When data refreshes, use **Regenerate** with frozen settings so slide structure stays consistent month to month—clients notice when layouts jump.

## What slides and narratives include

**Rule-based cross-source detectors** flag patterns across GA4, GSC, and Ads without LLM cost. When **AI insights** are on, slide copy, findings, and recommendations are **personalized** and token-metered on Pro plans.

Typical deck flow:

- **Cover** with client name, report title, and date range label  
- **Contents** for navigation inside the HTML viewer  
- **Executive summary** for leadership skimmers  
- **Health check** and **KPI snapshot** anchoring performance  
- **Platform sections** with charts and tables per focus area  
- **Cross-source findings** connecting organic, paid, and site behavior  
- **Methodology** documenting reporting window, properties in scope, GA4/GSC volumes, and organic gap notes  
- **Prioritized action plan** for next steps  
- **Thank you** closing slide  

Methodology slides matter for agencies proving rigor—especially when clients compare your numbers to their internal GA4 view.

## AI insights: when to enable them

| Scenario | AI insights |
|----------|-------------|
| Executive readout needing narrative | **On** |
| Data-only appendix for analysts | **Off** |
| Tight token budget mid-month | **Off** for drafts, **On** for final |
| Regulated client requiring exact wording | **Off**; edit HTML manually |

Report generation with AI enabled posts to the **Report** ledger type in Billing and Usage, separate from **Chat** and **Composer refine**.

## How Report Builder compares to other Conalytic tools

| Tool | Output | Best for |
|------|--------|----------|
| **Report Builder** | HTML presentation deck | Client deliverables, board packs |
| **Conversational Analytics** | Chat + inline viz | Live Q&A, investigations |
| **KPIs Tracker** | Status dashboard | Ongoing goal monitoring |

Workflow many agencies adopt: **KPIs Tracker** all month for health → **Chats** for anomaly deep dives → **Report Builder** for the monthly send.

## Date ranges and comparisons that work in real life

**Last 28 vs 30 days:** Align with Meta and Ads billing cycles where possible.

**Previous period same year:** Seasonal brands (retail, travel) avoid YoY noise from holiday shifts.

**Custom 366-day cap:** Annual reviews without leaving Conalytic.

**Scoped notes:** Use *“brand vs non-brand organic”* or *“paid search only”* hints when AI is enabled so narratives stay on brief.

## White-label and client experience

Agency positioning benefits from HTML decks clients can open in any browser—no PowerPoint license required. Download HTML, host on your portal, or walk through the in-app viewer on calls. For positioning alongside your brand, pair Report Builder output with your cover messaging in the **client name** and **title** fields each cycle.

## Quality assurance before send

1. **Spot-check methodology slide** against the SOW date range.  
2. **Verify each platform section** matches the connected property (common failure: wrong GA4 property selected).  
3. **Read AI recommendations** for hallucinated causality—swap with human edits in the HTML if needed.  
4. **Regenerate** once if a platform returned partial data due to API delay.  
5. **Archive** the downloaded HTML in your PM tool for audit trails.

## Token economics on Conalytic Pro

Reports with AI insights consume **prompt + completion tokens** under the same Pro markup model as chat. KPI dashboards do not. Planning three AI-enabled client decks and twenty investigative chats per month? Monitor **Billing and Usage** and top up via PayPal when balance runs low ($20 minimum). Signup includes promotional token credit for evaluation.

## Who benefits most?

- **Marketing agencies** shipping recurring GA4 + GSC + Ads recaps  
- **In-house growth teams** preparing monthly leadership decks  
- **Consultants** delivering GTM audit readouts with security/consent focus slides  
- **Freelance PPC managers** who need professional presentation without slide grunt work  

## Frequently asked questions

**Can I edit the deck after generation?**  
Download HTML and edit locally, or regenerate after fixing data sources.

**Does Report Builder email clients automatically?**  
Download and send through your ESP today; scheduling is a workflow outside the core generate/view/download loop.

**Are Meta Ads included?**  
Not in active report generation—UI shows Meta/LinkedIn as disabled future sources.

**How is this different from Looker Studio PDF exports?**  
Report Builder ships a **structured narrative deck** with executive summary and action plan—not just charts.

## Get started with Report Builder

Report Builder is live in Conalytic. [Create your account](https://chat.conalytic.com/signup), connect GA4, GSC, Google Ads, and/or GTM, then open **Reports → New report**. Your first deck can be ready before your next client call ends.

Dive deeper on the [Report Builder product page](/products/report-builder), see [all features](/features), or [book a demo](/contact) to walk through a sample HTML presentation with our team.
`;
