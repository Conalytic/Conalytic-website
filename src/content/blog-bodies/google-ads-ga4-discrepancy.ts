/** Blog body: Google Ads vs GA4 conversion discrepancy — elimination guide. */
export const googleAdsGa4DiscrepancyBody = `
A Google Ads vs GA4 conversion discrepancy under 15–20% is often normal—different attribution models, click vs session windows, and conversion counting settings explain most gaps. When Google Ads conversions and GA4 key events diverge beyond 20–25% for the same action and date range, run an elimination sequence before changing bids or client strategy.

Paid media managers live between two dashboards that rarely agree. Google Ads conversions optimize campaigns in real time; GA4 conversion data feeds funnels, LTV, and executive summaries. A conversion tracking mismatch feels urgent because both platforms claim authority. This guide applies a four-stage elimination framework (like traffic drop analysis), concrete magnitude thresholds, a decision tree for which number belongs in the client deck, and links to report methodology so stakeholders understand why one slide says 412 and another says 538.

## What causes Google Ads and GA4 conversion numbers to disagree?

Root causes cluster into five buckets. Most accounts exhibit two or three simultaneously.

| Bucket | Google Ads behavior | GA4 behavior | Typical gap contribution |
|--------|--------------------|--------------|---------------------------|
| Attribution model | Data-driven, click-based, view-through options | Data-driven, session/user paths | 10–30% |
| Conversion window | 30-day click default (configurable) | 30-day click + engaged-view rules | 5–15% |
| Counting method | One per click vs every conversion | One per event vs every event | 5–40% |
| Tag / import setup | Ads tag or GAds import | GA4 event + marked key event | 20–100% if broken |
| Consent / modeling | Consent Mode in Ads tags | GA4 modeling, thresholding | 10–25% in EEA |

**Fair competitor context:** **Triple Whale**, **Northbeam**, and **Rockerbox** attempt multi-touch reconciliation outside Google—but they add cost and still depend on tag quality. For Google-only stacks, disciplined elimination beats buying a third number without fixing imports.

## What is the elimination sequence for conversion discrepancies?

Work stages in order. Do not tune bids on Stage 1 noise.

### Stage 1: Align definitions and date boundaries

**Pass criteria:** Same conversion action name, same timezone, same date range (calendar midnight boundaries), same property linked to Ads.

Checklist:

- GA4 **key event** matches the event imported or mirrored in Google Ads
- Google Ads conversion action includes **website** + **imported GA4** only if intentionally blended—never mix lead forms from Ads UI with GA4 purchase events
- Ads account timezone matches GA4 property reporting timezone
- Compare **conversion date** in Ads vs **event date** in GA4—or align both to click date for paid-only views

**Threshold:** After alignment, remaining gap **under 15%** → document as expected variance; monitor monthly.

**Fail:** Gap **above 20%** with verified alignment → Stage 2.

### Stage 2: Is the gap global or campaign-specific?

Segment Google Ads conversions and GA4 key events by **campaign** (and **device** if mobile-heavy).

| Pattern | Interpretation | Next step |
|---------|----------------|-----------|
| Gap uniform across campaigns | Tag, import, or property-level issue | Stage 3 global checks |
| Gap isolated to 1–2 campaigns | Landing page, redirect, or audience mismatch | Inspect URLs, UTMs, mobile LP |
| GA4 higher everywhere | Organic/assisted credit in GA4 paths | Stage 4 attribution narrative |
| Ads higher everywhere | Ads counting all conversions, GA4 one-per-session | Counting settings |

**Rule:** If **>70% of absolute gap** sits in one campaign, fix that campaign before global tag rewiring.

Use a **GA4-scoped** [Conversational Analytics](/products/conversational-analytics) thread: *"Google Ads conversions by campaign last 28 days"* in one chat, then a **GA4-scoped** thread: *"GA4 key event purchase by session campaign, paid search only, same period."* For side-by-side methodology in a client deck, use [Report Builder](/products/report-builder).

### Stage 3: Measurement integrity—tags, imports, and duplicates

**Google Tag Manager audit triggers:**

- Duplicate GA4 config tags firing twice (inflates GA4)
- Google Ads conversion tag missing consent triggers in EEA
- Conversion linker not on all domains in cross-domain setup
- \`gclid\` stripped by redirect—Ads clicks, GA4 attributes Organic

**GA4 import health:**

- Linked Google Ads account shows **Import status: Active**
- Auto-tagging enabled in Ads
- No conflicting **Google Ads** conversion actions for the same URL + event

**Duplicate counting test:** One test conversion on a staging URL excluded from production filters. Record whether Ads logs 1, GA4 logs 1. Multiple GA4 events per purchase (purchase + thank_you_page) with both marked key events can double GA4 vs Ads if Ads imports only one.

**Threshold:** Tag failure often produces **>50% gaps** or **zero** on one side—not gentle 18% drift. Zero GA4 with healthy Ads → GA4 event not firing or not marked key event. Zero Ads with healthy GA4 → tag or import break.

Cross-check site behavior during traffic anomalies with [GA4 traffic drop vs Search Console](/resources/blogs/ga4-traffic-drop-search-console)—sudden session loss can depress GA4 conversions while Ads still records click-era conversions.

### Stage 4: Attribution and reporting philosophy—which number for which decision?

After Stages 1–3, residual gaps often reflect **attribution discrepancy**, not broken tags.

| Decision use | Prefer | Why |
|--------------|--------|-----|
| Bid optimization in Google Ads | Google Ads conversions | Platform native; Smart Bidding expects Ads counting |
| Cohort LTV and funnel analysis | GA4 key events | Cross-channel paths, retention |
| Client executive slide (paid ROI) | Ads conversions with GA4 footnote | Matches spend platform; add GA4 for assisted view |
| Board-level marketing contribution | GA4 data-driven + modeled where disclosed | Full digital picture |
| Invoice / commission on conversions | Contract-defined source | Often CRM, not either Google product |

Document the **residual gap percentage** after alignment. **10–20%** residual with healthy tags is a normal google ads ga4 discrepancy band for prospecting campaigns with view-through influence.

## What magnitude thresholds should trigger investigation?

Use these default agency thresholds; tune per client vertical.

| Gap (Ads vs GA4, same definition) | Status | Action |
|-----------------------------------|--------|--------|
| 0–15% | Expected | Note in methodology footnote |
| 15–20% | Watch | Review monthly; check new campaigns |
| 20–35% | Investigate | Run Stages 2–3 within 5 business days |
| 35–50% | Urgent | Pause bid scaling until tag/import verified |
| >50% or one side zero | Critical | Incident response; GTM + import ticket |

Apply thresholds on **volume-qualified** data: minimum **30 conversions** per side per period. Below 30, percentage gaps swing wildly—a 5 vs 8 event week is 60% mathematically but not operationally significant.

**Week-over-week spike rule:** If gap **widens more than 10 percentage points** week over week with stable spend, treat as incident even if absolute gap remains under 20%.

## Which number should go in the client deck?

Use this decision tree:

\`\`\`
Start: Same event, aligned dates, 30+ conversions each side
│
├─ Gap ≤15% → Client slide: Google Ads conversions
│              Footnote: "GA4 key event [name]: [X], within normal variance"
│
├─ Gap 15–20% → Client slide: Google Ads conversions (primary)
│                 Secondary bullet: GA4 figure + one-line attribution note
│
├─ Gap 20–35% after Stage 3 pass → Client slide: Both numbers side by side
│                 Narrative: "Platforms count differently; tags verified [date]"
│                 Do NOT average without CRM validation
│
├─ Gap >35% OR Stage 3 fail → Client slide: "Under measurement review"
│                 Show last known good week; withhold ROI claims
│
└─ CRM is source of truth contractually → Client slide: CRM conversions
                  Ads + GA4 in appendix only
\`\`\`

**Never** present the higher number because it flatters performance. **Never** hide the lower number in appendix-only fine print if the deck headline cites ROI.

[Report Builder](/products/report-builder) methodology slides should state: conversion action name, counting method (one per click/session), attribution model, date basis, and residual gap band. That pattern matches the report methodology sibling guide—clients who read [Report Builder HTML marketing reports](/resources/blogs/report-builder-html-marketing-reports-guide) expect explicit definitions on every conversion chart.

Pair ongoing monitoring with [KPIs Tracker](/products/kpis-tracker): set paired goals for Ads conversions and GA4 key events; **Off track** on both confirms systemic issue; **Off track** on one only points to attribution or import skew.

## How do Google Ads conversions and GA4 key events count differently?

| Setting | Google Ads | GA4 |
|---------|------------|-----|
| Primary counting | One conversion per click (default) | Event count configurable |
| View-through | Optional (display) | Engaged-view rules for video |
| Cross-device | Google signed-in users | Google signals when enabled |
| Offline imports | Store sales, CRM if configured | BigQuery export for joins |
| New vs returning | Audience reports | User dimensions |

Example: **Every** purchase counted in GA4 but Ads imports **one per click** → GA4 routinely **15–40% higher** on high-repeat purchase sites. Not a bug if documented.

Example: View-through display conversions enabled in Ads, GA4 key event web-only → Ads **higher** with gap **20–50%** on display-heavy accounts.

## What questions should you ask during a discrepancy review?

Borrow from the [GA4 question library](/resources/blogs/what-to-ask-ga4-data):

- *"GA4 key event [name] by session google ads campaign, last 28 days"*
- *"Google Ads conversions by campaign, same period"*
- *"Sessions with gclid parameter present vs key event rate, paid search"*
- *"Landing page for Ads campaigns with >20% session drop and conversion drop"*

For AI-influenced branded search lifting Ads conversions while GA4 attributes Organic, see [tracking AI assistant traffic in GA4](/resources/blogs/tracking-ai-assistant-traffic-ga4).

## How often should you reconcile Ads and GA4?

| Client tier | Reconciliation cadence | Threshold action |
|-------------|------------------------|-------------------|
| High-spend paid accounts | Weekly | >15% triggers ticket |
| Mid-market | Biweekly | >20% triggers ticket |
| Small business | Monthly | >25% triggers ticket |

Log each reconciliation: date, gap %, stage reached, resolution. Auditors and future you will need the paper trail.

## Frequently asked questions

**Is a 10% Google Ads vs GA4 gap worth fixing?**  
Usually no if definitions align and volume is sufficient. Document as healthy variance.

**Why does Google Ads show more conversions than GA4?**  
Common: view-through, multiple conversion actions aggregated in Ads UI, or GA4 consent gaps. Run Stage 3 before assuming GA4 is wrong.

**Why does GA4 show more key events than Ads?**  
Common: organic-assisted conversions in GA4 paths, counting every event, or duplicate GA4 events. Check marking and import mapping.

**Should I use GA4 imported conversions in Google Ads bidding?**  
Many accounts successfully bid on GA4 imports for funnel alignment. Ensure import is stable 30+ days before Smart Bidding major changes.

**Does enhanced conversions fix discrepancies?**  
Improves match rates for logged-in users; does not unify attribution math. Expect modest gap narrowing, not elimination.

**Can I trust Google Analytics Intelligence for reconciliation?**  
Native GA4 AI answers lack Ads side-by-side context. Use marketing data chat with both platforms connected or manual exports.

**What if CRM disagrees with both Google platforms?**  
CRM wins for revenue reporting when sales cycle lags. Google platforms measure digital signal, not closed-won finance.

**How does Conalytic help?**  
[Conversational Analytics](/products/conversational-analytics) lets you query Google Ads and GA4 in **separate scoped threads** (one account or property per chat) for campaign-level compares. [Report Builder](/products/report-builder) combines GA4, GSC, and Ads in one HTML deck with methodology slides. [KPIs Tracker](/products/kpis-tracker) flags when paired conversion goals diverge across platforms.

Explore [Conversational Analytics](/products/conversational-analytics), [Report Builder](/products/report-builder), and [KPIs Tracker](/products/kpis-tracker). Related playbooks: [GA4 traffic drop analysis](/resources/blogs/ga4-traffic-drop-search-console), [what to ask GA4](/resources/blogs/what-to-ask-ga4-data), [AI referral tracking](/resources/blogs/tracking-ai-assistant-traffic-ga4), and the [Report Builder guide](/resources/blogs/report-builder-html-marketing-reports-guide) for deck methodology standards.
`;
