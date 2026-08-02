/** Blog body: HTML vs PDF vs live dashboard — client report format comparison. */
export const htmlPdfDashboardBody = `
An **HTML marketing report** is the best default client deliverable when you need shareable structure, readable charts, and optional interactivity without locking clients into a live login. PDF works for archival and print. Live dashboards work for ongoing monitoring—not monthly narrative. Choose format by how the client will use the file in the next 30 days, not by habit.

This guide compares PDF, HTML, and live dashboard formats honestly—including forwarding, printing, mobile, offline access, and white-label expectations—so agencies pick the right **client report format** for each engagement.

## What is the best client report format for marketing agencies?

The best format depends on three questions:

1. **Will the client forward this to leadership?** HTML and PDF travel well; live dashboard links require permissions and often break when recipients lack access.
2. **Will they print it?** PDF wins; HTML prints adequately but pagination varies by browser.
3. **Is this a one-time readout or ongoing monitoring?** Dashboards for monitoring; HTML or PDF for monthly narrative.

| Format | Best for | Weak for |
|--------|----------|----------|
| **HTML** | Monthly client decks, forwardable narratives, in-browser review on calls | Offline without download, pixel-perfect print |
| **PDF** | Archives, legal records, print-first stakeholders | Interactive exploration, easy regeneration |
| **Live dashboard** | Daily/weekly KPI monitoring, internal teams | Client narrative, forwarding to non-users |

Conalytic [Report Builder](/products/report-builder) generates **HTML marketing reports** by default—multi-slide decks clients open in any browser and download as a single file. [KPIs Tracker](/products/kpis-tracker) covers ongoing goal monitoring (On track / At risk / Off track)—not a full BI explorer. PDF is only via browser print-to-PDF, not a native export.

## How does an HTML marketing report compare to PDF?

### HTML strengths

- **Opens anywhere** with a browser—no PowerPoint or Adobe license required.
- **Regenerates quickly** when data refreshes; same structure, updated numbers.
- **Responsive layout** scales on tablets and phones better than fixed PDF pages.
- **Smaller file sizes** than image-heavy PDFs for equivalent chart density.
- **Editable** after download if your team needs to adjust copy before sending.

### HTML limitations (addressed honestly)

**Forwarding.** HTML files forward as attachments or hosted links. Some corporate mail filters strip HTML attachments; hosting on a client portal or sending a zip file avoids this. Conalytic decks download as a single HTML file clients can save locally—no login required to view.

**Printing.** Browser print works for executive summaries and KPI tables. Complex chart slides may paginate awkwardly. If a client mandates print-ready board packs, export to PDF from the browser print dialog or use a dedicated PDF pipeline for that audience only.

**Mobile.** HTML reports reflow on mobile screens. PDF on phone requires pinch-zoom on fixed pages—usable but inferior for on-the-go review.

**Offline.** Downloaded HTML works offline once saved. Live dashboard links do not. PDF works offline by default.

### PDF strengths

- **Fixed layout** for print and formal archives.
- **Universal acceptance** in procurement and compliance workflows.
- **No rendering variance** across browsers.

### PDF weaknesses

- **Stale the moment you export**—regeneration means manual re-export.
- **Poor interactivity**—no hover tooltips, no collapsible sections.
- **Heavy files** when charts are rasterized at high resolution.

**Decision rule:** If the client reads on screen and forwards internally, default to HTML. If the client files paper copies or requires immutable snapshots, add PDF. Do not default to PDF for every client out of habit.

## When should you use a live dashboard instead of a static marketing report export?

Live dashboards excel when:

- Metrics update on a fixed cadence and stakeholders check them independently.
- The audience is internal (marketing ops, leadership) with platform access.
- The goal is **goal-status monitoring**, not monthly narrative.

[KPIs Tracker](/products/kpis-tracker) evaluates GA4, GSC, and Google Ads goals on a monthly schedule (with mid-month refresh available). It is not a drag-and-drop dashboard builder—it shows rules-based status labels against targets you configure.

Live dashboards fail as client deliverables when:

- Recipients lack logins or forget passwords.
- The story requires curated interpretation, not raw exploration.
- Clients need a **shareable marketing report** they can attach to an email thread.

Use both layers:

- **[KPIs Tracker](/products/kpis-tracker)** for ongoing on-track / at-risk monitoring.
- **[Report Builder](/products/report-builder)** for the monthly HTML deck that explains *why* KPIs moved.

A dashboard answers "what is the number today?" A report answers "what happened this month and what do we do next?" See [marketing report structure](/resources/blogs/client-marketing-report-structure) for the slide sequence that makes narrative reports work.

## What makes a shareable marketing report actually shareable?

Shareability is not file format alone. It is permissions, portability, and narrative completeness.

**Checklist for shareable deliverables:**

1. **No login wall** for the primary recipient (HTML download or PDF attachment).
2. **Self-contained context**—executive summary readable without opening GA4.
3. **Methodology slide** documenting date range and properties (prevents "your numbers are wrong" forwards).
4. **Named file convention** (for example, ClientName_MarketingReport_2026-06.html).
5. **Under 15 MB** if email attachment limits apply; host larger files on a portal.

HTML marketing reports from Conalytic download as a single file with embedded styles—recipients double-click and read. No account required for the client CEO who only opens two attachments per month.

## How do HTML, PDF, and dashboards differ for client calls?

| Scenario | Recommended format |
|----------|-------------------|
| Monthly client call walkthrough | **HTML** in browser—scroll slide by slide |
| Async send before the call | **HTML** attachment or link |
| Board member who will not attend | **PDF** plus one-page executive summary |
| Client asks "what is traffic today?" mid-month | **Live dashboard** ([KPIs Tracker](/products/kpis-tracker)) |
| Deep-dive on a single anomaly during the call | **Natural language analytics** ([Conversational Analytics](/products/conversational-analytics))—not the monthly deck |

Do not screen-share a live dashboard for a structured monthly readout unless the client explicitly prefers exploration over narrative. Dashboards invite tangents; decks keep decisions on track.

## What about white-label client report formats?

Agencies often ask whether client-facing reports can carry their brand, not the platform's.

**Honest answer for Conalytic:**

- **Pro plan:** Reports do not include white-label branding. Decks show Conalytic styling with your client name and report title on the cover.
- **Enterprise plan:** White-label options are available—custom branding, domain, and presentation settings depending on contract.

White-label affects **presentation identity**, not report substance. Whether the footer says your agency or the platform, the methodology slide, KPI thresholds, and cross-source findings still determine credibility. Do not choose PDF over HTML solely because you assume PDF looks more "agency-branded"—branding is a configuration question, not a format question.

## How do you export a marketing report to PDF if HTML is the source?

If you generate HTML in [Report Builder](/products/report-builder) and a stakeholder requires PDF:

1. Open the downloaded HTML in Chrome or Edge.
2. Print → **Save as PDF**.
3. Select **Background graphics** so chart colors render.
4. Spot-check pagination on slides 5 (KPI snapshot) and 9 (cross-source findings)—tables may split across pages.

For board packs, some agencies produce PDF only for slides 1–5 (cover through KPI snapshot) and send full HTML as the analytical appendix. That hybrid respects print constraints without sacrificing interactive depth for analysts.

**Threshold:** If more than 30% of slides paginate poorly in print, the source deck has too much table density for PDF—trim tables or split appendix content.

## What are common objections to HTML marketing reports—and valid responses?

**"Our client wants PowerPoint."**  
Export charts as images or paste HTML screenshots into slides—but maintain the HTML as the source of truth for regeneration. Rebuilding from PowerPoint each month loses the automation benefit.

**"HTML feels less professional."**  
Professionalism comes from structure, accuracy, and decision clarity—not file extension. A well-structured HTML deck with methodology and action plan outperforms a 40-slide PDF of raw GA4 exports.

**"We need version control."**  
Archive each month's HTML with a dated filename in your project management tool. PDF offers the same archival property once exported.

**"Clients won't open HTML attachments."**  
Send a zip file, host on a client portal, or walk through the file live on the first call. After one successful open, adoption is high—especially compared to dashboard login links.

## How does format choice interact with cross-channel reporting?

Cross-source findings (organic cannibalization, conversion divergence, CTR erosion) need space for tables and callouts. HTML handles multi-section layouts without fixed page breaks. PDF can truncate wide tables. Dashboards scatter the same metrics across widgets without narrative glue.

For cross-channel stories, HTML is the strongest **marketing report export** format. See [cross-channel reporting](/resources/blogs/cross-channel-reporting-gsc-ga4-ads) for the patterns those slides should contain.

## Should AI-generated insights change your format choice?

AI narratives appear in HTML decks when enabled in Report Builder. Format does not change the verification requirement: read AI copy before sending regardless of HTML or PDF.

AI explains findings; it does not determine them. A PDF export of unverified AI text is as risky as HTML. Follow the human verification checklist in [should AI write client reports](/resources/blogs/should-ai-write-client-reports).

## Three-way comparison summary

| Criterion | HTML | PDF | Live dashboard |
|-----------|------|-----|----------------|
| Forwarding to non-users | Strong (attachment) | Strong | Weak (login) |
| Print quality | Good | Excellent | N/A |
| Mobile reading | Strong | Fair | Strong (if responsive) |
| Offline access | Strong (downloaded) | Strong | Weak |
| Regeneration speed | Fast | Manual re-export | Automatic (data only) |
| Narrative structure | Strong (slide deck) | Strong (fixed) | Weak |
| Real-time data | At generation time | Stale at export | Continuous |
| White-label (Conalytic) | Enterprise option | Same | Enterprise option |

**Default recommendation:** HTML monthly deck + live KPI monitoring + PDF only when a stakeholder requires it.

## Frequently asked questions

**Is an HTML marketing report secure to send to clients?**  
Downloaded HTML contains aggregated report data—not live API credentials. Treat it like any client deliverable: send through secure channels your agency already uses.

**Can clients edit the HTML report?**  
Yes. The file is standard HTML. Most clients read only; agencies with technical clients sometimes annotate locally.

**Does Report Builder support native PDF export?**  
Primary output is HTML. Use browser print-to-PDF for PDF copies. Native PDF export may be added later; HTML remains the regenerable source.

**Why not send a Looker Studio link instead?**  
Dashboard links work for analysts but lack executive summary, methodology, and action plan structure. They complement reports; they do not replace them.

**Which format works best for multi-location clients?**  
HTML decks scale to multiple property sections with consistent slide order. PDF works if each location gets a printed appendix. Dashboards require per-property access configuration.

**Does Pro include white-label reports?**  
No. Pro uses Conalytic presentation styling. Enterprise includes white-label options—contact sales for scope.

**How often should we regenerate vs re-send the same HTML?**  
Regenerate when source data refreshes (typically monthly) or when corrections are needed. Do not re-send stale HTML with a new cover date—that erodes trust faster than any format choice.

## Get started

Pick format by client behavior: **HTML** for narrative and forwarding, **PDF** for print and archive, **live dashboards** for monitoring between readouts. Conalytic [Report Builder](/products/report-builder) gives you structured HTML decks; [KPIs Tracker](/products/kpis-tracker) covers the live layer.

[Create your account](https://chat.conalytic.com/signup), generate your first HTML marketing report, and archive a PDF copy only if your client requires it. For slide structure, see [marketing report structure](/resources/blogs/client-marketing-report-structure).
`;