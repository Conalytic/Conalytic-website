/** Blog body: AI marketing reports — skeptical guide for client deliverables. */
export const aiMarketingReportsBody = `
**AI marketing reports** work best when AI explains findings humans already verified—not when AI decides what happened. Use deterministic detection for patterns and thresholds; use generative models for slide copy, executive summaries, and client-appropriate phrasing. Every AI-generated client deck needs a human verification checklist before send.

This guide takes a skeptical, practical position on **AI report generators**, **automated report insights**, and **AI analytics insights** for agency and in-house teams using Conalytic [Report Builder](/products/report-builder).

## Should AI write client marketing reports?

AI should **draft**, not **determine**. The client report is a accountability document. Findings must be traceable to data and repeatable rules; narrative can be assisted.

**Appropriate AI use:**

- Executive summary wording after KPIs are confirmed.
- Plain-language explanation of a verified cross-source pattern.
- Action plan bullets templated from prioritized findings.
- Tone adjustment for technical vs non-technical audiences.

**Inappropriate AI use:**

- Discovering anomalies without rule-based detection.
- Inferring causation ("competitors caused the drop") from correlation.
- Replacing methodology documentation.
- Sending first-draft output without human review on regulated or high-stakes accounts.

If your workflow is "generate and forward," you will eventually forward a hallucination. The fix is process, not a better model.

## What is the difference between detection and narration in AI analytics insights?

Think of the report pipeline as two layers:

| Layer | Mechanism | Output |
|-------|-----------|--------|
| **Detection** | Rules, thresholds, API queries | Flags: at-risk KPI, CTR erosion, Ads/GA4 divergence |
| **Narration** | LLM | Sentences: what the flag means for the client |

**Detection is deterministic.** Branded GSC clicks down 12% with brand Ads spend up 8% triggers cannibalization review—every time, same data, same result.

**Narration is generative.** The model chooses phrasing: "Brand paid search may be capturing clicks you would otherwise earn organically" vs a sharper directive.

Conalytic optional **AI insights** in [Report Builder](/products/report-builder) operate on the **narration layer only** and consume tokens on Pro plans. [KPIs Tracker](/products/kpis-tracker) status labels are **rules-based**—not AI-scored. Cross-source pattern checks in [Report Builder](/products/report-builder) use **deterministic detectors** (see [cross-channel reporting](/resources/blogs/cross-channel-reporting-gsc-ga4-ads)). [Conversational Analytics](/products/conversational-analytics) is for investigation in scoped threads—one platform per chat—not a substitute for verified deck copy.

Never skip detection because the model "sounded confident."

## What are the main failure modes of AI report writing?

### Failure mode 1: Hallucinated causation

The model attributes a metric change to a competitor campaign, algorithm update, or seasonality without evidence in the connected data.

**Example:** "CTR fell because Google rolled out a new SERP layout in your industry." GSC shows CTR down 18% on three queries—no SERP feature diagnostic in scope.

**Mitigation:** Ban causation verbs unless tied to a cited finding. Prefer "CTR fell 18% on queries X, Y, Z—review titles and SERP features for those URLs."

### Failure mode 2: Restating the chart

AI repeats numbers visible in the table without insight—wasting executive summary space.

**Example:** "Sessions were 45,230 compared to 41,100 last period." The chart already shows this.

**Mitigation:** Require each narrative bullet to answer **so what** or **now what**. If it only restates, delete it.

### Failure mode 3: Untethered recommendations

Generic advice disconnected from the month's data: "invest in content marketing" on a deck where the issue is Ads/GA4 conversion tagging.

**Mitigation:** Link every recommendation to a finding ID from the cross-source slide or a KPI status from the health check. No orphan actions.

### Failure mode 4: Inconsistent re-runs

Regenerating the same report produces different conclusions—acceptable for brainstorming, unacceptable for client delivery.

**Mitigation:** Lock detection rules and date ranges first. Use AI for phrasing variants only after findings are frozen. If conclusions change between runs without data changing, turn AI off for that section.

### Failure mode 5: Overstating confidence

Models use authoritative tone by default. Clients interpret it as analyst certainty.

**Mitigation:** Human editor adjusts hedging where appropriate: "may," "suggests," "worth testing"—especially for cross-source patterns below P1 thresholds.

## What is a human verification checklist before sending an AI-assisted client deck?

Complete this checklist for every **AI marketing report** before download or forward. Budget **15–25 minutes** for a standard monthly deck.

### Data integrity (5 minutes)

- [ ] Date range on methodology slide matches statement of work.
- [ ] GA4 property, GSC site, and Ads account IDs are correct.
- [ ] Comparison period is consistent across slides.
- [ ] KPI snapshot numbers match [KPIs Tracker](/products/kpis-tracker) or source UI spot checks (minimum: top 3 KPIs).

### Detection review (5 minutes)

- [ ] Every cross-source finding maps to a named pattern with threshold cited.
- [ ] P1 findings verified in platform UI—not only in generated text.
- [ ] No finding appears that contradicts chart data on the same slide.

### AI narrative review (10 minutes)

- [ ] Executive summary does not claim causation without evidence.
- [ ] No bullet merely restates a chart title or table total.
- [ ] Action plan items link to specific findings; each has owner, date, metric.
- [ ] Recommendations are within client scope (no "replatform the website" on a media retainer).
- [ ] Tone matches client preference (technical vs plain language).
- [ ] Regenerate test: if you regenerate once, detection flags stay identical; only wording may vary.

### Compliance and brand (5 minutes)

- [ ] No guarantees of future performance ("will increase conversions 20%").
- [ ] AI limitations acknowledged internally; methodology slide accurate.
- [ ] White-label expectations met (Pro uses Conalytic styling; Enterprise white-label per contract—see [HTML vs PDF guide](/resources/blogs/html-vs-pdf-live-dashboard-reports)).

If any box fails, fix data or edit HTML manually—do not "hope the client won't notice."

## When should you enable AI insights in Report Builder?

| Scenario | AI insights |
|----------|-------------|
| First draft before strategist edit | **On** |
| Executive summary for non-technical client | **On**, then verify |
| Regulated industry (finance, health) requiring exact wording | **Off**—human write |
| Data-only appendix for analyst client | **Off** |
| Recurring monthly deck, same client, frozen findings | **On** for phrasing only |
| Discrepancy investigation still in progress | **Off** until resolved |

Toggle AI off when any P1 finding is unverified. Narrating uncertain data is worse than sparse copy.

## How do AI report generators compare to manual report writing?

**AI report generators** (including automated slides from connected data) save structuring time—they do not remove analyst judgment.

| Task | Manual | AI-assisted |
|------|--------|-------------|
| Slide structure | Slow | Fast ([12-slide template](/resources/blogs/client-marketing-report-structure)) |
| Chart population | Slow | Fast (API-driven) |
| Pattern detection | Slow, inconsistent | Fast if rule-based |
| Executive summary | Medium | Fast draft, needs edit |
| Accountability | Clear | Muddied if unreviewed |

The bottleneck moves from copy-paste to **verification**. Teams that skip verification gain speed and lose credibility.

## Can automated report insights replace analysts?

No—for three reasons:

1. **Scope judgment:** Which campaigns, queries, and pages matter this month is contractual and contextual, not statistical.
2. **Client politics:** How to phrase a miss, when to escalate, what to defer—requires relationship knowledge.
3. **Data quality:** Tagging breaks, consent mode, property misselection—models rarely catch configuration errors; humans must.

AI compresses draft time. It does not compress responsibility. The sender owns every sentence.

## How should agencies talk to clients about AI-assisted reports?

Transparency builds trust. Suggested language:

> "We use automated data pulls and assisted drafting to keep your report consistent and timely. Every finding is reviewed by [name/team] before delivery; the numbers come from your connected Google properties."

Do not claim "AI-powered insights" without "human-verified." Do not hide AI use if the client contract requires disclosure.

## How does AI-assisted reporting fit the monthly workflow?

1. **Monitor** goals in [KPIs Tracker](/products/kpis-tracker) all month.
2. **Investigate** anomalies in scoped [Conversational Analytics](/products/conversational-analytics) threads (one platform per chat)—exploratory, not client-facing.
3. **Freeze** findings and thresholds before generation.
4. **Generate** deck in [Report Builder](/products/report-builder) with AI insights on or off per section needs.
5. **Verify** using the checklist above.
6. **Deliver** HTML (or PDF if required—see [format comparison](/resources/blogs/html-vs-pdf-live-dashboard-reports)).

Skipping step 3 is the most common failure: generating too early, then treating AI narrative as final because the client call is in two hours.

## What metrics prove AI-assisted reporting is working?

Track internal quality signals—not vanity time savings:

- **Client revision requests** per deck (target: down over time as structure stabilizes).
- **Factual corrections** from clients (target: zero per quarter).
- **Time to verification** (not time to first draft)—should decrease with stable templates.
- **P1 findings acted on** within 30 days (outcome metric).

Avoid framing success as "hours saved per week." Frame it as **fewer errors, faster verification, consistent structure**.

## What should in-house teams do differently?

In-house teams often skip the "client polish" step—that is a mistake when leadership forwards decks externally.

- Use the same detection rules as agencies.
- Keep AI off for board/regulatory packs unless legal approves workflow.
- Maintain a single [marketing report structure](/resources/blogs/client-marketing-report-structure) so month-over-month comparison stays easy.

## Frequently asked questions

**Is AI report writing accurate?**  
AI phrasing can be accurate when grounded in verified data. AI discovery is not reliable. Separate detection from narration.

**Does Conalytic send AI reports directly to clients?**  
No. You generate the HTML deck in [Report Builder](/products/report-builder), review it, download it, and send through your own email or client portal. There is no auto-email or scheduled send in the product today.

**Can I use AI for only some slides?**  
Report Builder toggles AI insights for the generation run. Edit individual sections in downloaded HTML if needed.

**What model should we use?**  
Pick the model offered in your plan settings; verification matters more than model choice. A verified draft from any model beats an unverified frontier model.

**Will AI replace the methodology slide?**  
No. Methodology must document properties, dates, and definitions—deterministic facts, not generated prose.

**How do we prevent hallucinated competitor mentions?**  
Ban competitor names unless in client-provided context notes. Spot-check executive summary for external claims.

**Should we disclose AI use in the report footer?**  
Optional but recommended for transparency. Enterprise white-label may customize footer text.

**What if AI and analyst disagree?**  
Trust the analyst after data verification. Disable AI for that section and write manually.

## Get started

**AI marketing reports** are a drafting accelerator, not an analyst replacement. Detect with rules, narrate with models, verify with humans—then send.

Enable AI insights in [Report Builder](/products/report-builder) when you have time to run the checklist. Keep detection aligned with [cross-channel reporting](/resources/blogs/cross-channel-reporting-gsc-ga4-ads) patterns and [KPIs Tracker](/products/kpis-tracker) status labels.

[Create your account](https://chat.conalytic.com/signup), generate a draft deck, and complete the verification checklist before your next client send. For structure, see [marketing report structure](/resources/blogs/client-marketing-report-structure).
`;