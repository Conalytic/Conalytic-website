/** Blog body: Impressions Up, Clicks Down? How to Explain AI Overviews to Clients */
export const impressions_up_clicks_down_ai_overviewsBody = `
**Quick answer:** When Search Console shows impressions up and clicks down while average position holds steady, your rankings usually haven't fallen. Something on the results page — most often a Google AI Overview — is answering the query before people click. Confirm it by comparing impressions, clicks, CTR and position query by query. Rule out GA4 tracking issues. Measure AI referral traffic. Then report visibility and conversions to the client, not just sessions.

If you run SEO for clients, you've had this meeting. The client opens their dashboard, sees organic sessions down 20% or 30%, and asks what went wrong. You open Search Console and find impressions up, clicks down, and average position roughly where it was. Nothing broke. The search results page changed.

This guide explains why the impressions-up-clicks-down pattern happens, how to diagnose it in about 30 minutes with Search Console and GA4, and how to explain it to clients so you keep the retainer.

## Why impressions go up while clicks go down

Three changes in 2026 explain most cases.

### 1. AI Overviews answer the question on the results page

Google AI Overviews summarise an answer above the organic results. The searcher often gets what they need without clicking. Industry studies report CTR drops of roughly 58–61% on queries where AI Overviews appear ([W3era](https://www.w3era.com/blog/seo/google-ai-overview-traffic-drop-fix/)). One analysis of 21.7 million Search Console impressions found sites with heavy AI Overview exposure lost about 34.5% of organic clicks year on year ([Visionary Marketing](https://visionary-marketing.co.uk/blog/ai-overviews-traffic-impact-2026)). The exact figures vary by industry and query type, but the direction is consistent.

### 2. Impressions are being counted more generously

Pages that appear inside or alongside an AI Overview can register additional impressions. That can inflate the impression line even while clicks fall, which widens the gap.

### 3. Some searches never reach Google at all

People now ask ChatGPT, Perplexity, Gemini or Claude directly. Those questions don't appear in Search Console at all, so they show up as missing demand rather than lower CTR.

Not every case of impressions up, clicks down is AI Overviews. Rich results, ads, local packs and shopping modules can also push organic listings down the page.

## The 4 patterns: read impressions, clicks and position together

Before you blame an AI Overviews traffic drop, place the client in the right pattern:

| Pattern | Impressions | Clicks | Avg. position | Most likely cause |
| --- | --- | --- | --- | --- |
| A | Up or flat | Down | Stable | SERP features (AI Overviews, ads, snippets) taking clicks |
| B | Down | Down | Worse | Ranking loss — algorithm update, competitor, technical issue |
| C | Down | Down | Stable | Demand fell — seasonality or fewer searches (check Google Trends) |
| D | Flat | Flat in GSC, but GA4 organic down | Stable | Measurement problem in GA4, not an SEO problem |

Pattern A is the classic impressions-up-clicks-down case. Pattern D surprises many teams: Search Console clicks are fine, but GA4 shows organic down.

## Step 1: Diagnose impressions up, clicks down in Search Console

1. Open **Performance → Search results**. Compare the last 3 months with the same period last year to remove seasonality.
2. Turn on all four metrics: clicks, impressions, CTR, average position.
3. Switch to the **Queries** tab. Sort by impressions, then look for queries where impressions rose but CTR fell sharply at a steady position.
4. Search those queries yourself (logged out, in the client's country). Note whether an AI Overview appears and whether the client is cited in it.
5. Repeat on the **Pages** tab to find which URLs are losing clicks.

**A note on AI Overview filters:** sources disagree on whether Search Console can isolate AI Overview impressions. Some guides describe a Search Appearance filter. Others report that, as of March 2026, AI Overview clicks were counted in organic totals without a separate breakdown. Check what your client's property shows rather than promising a filter.

## Step 2: Make sure GA4 isn't misreporting organic

Some of the decline in GA4 may not be real. Consent mode, redirects, broken tags and channel grouping rules can move organic visits into Direct, Referral or Unassigned. One agency reported that correcting attribution lifted reported organic revenue by 42% in a quarter ([Wolfgang Digital via AdWorld](https://www.adworld.ie/?p=53438)).

Check:

- Did organic fall while Direct rose by a similar amount at the same time?
- Did anything change in consent mode, tags or the CMP around the drop date?
- Do Search Console clicks and GA4 organic sessions move together? If GSC clicks are steady but GA4 organic fell, it's a tracking problem.

We walk through this in detail in [why GA4 traffic dropped but Search Console didn't](/resources/blogs/ga4-traffic-drop-search-console).

## Step 3: Measure what AI search is sending

Clicks lost to AI Overviews aren't the whole story. AI assistants also send referral traffic, and it often converts well — one widely cited Semrush figure puts AI-referred visitors at about 4.4 times the conversion rate of standard organic. In GA4:

1. Create a custom channel group for AI assistants (referrers such as chatgpt.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, claude.ai).
2. Place it above Referral so those sessions are classified correctly.
3. Report AI-referred sessions and key events next to organic.

Our guide on [tracking AI assistant traffic in GA4](/resources/blogs/tracking-ai-assistant-traffic-ga4) has the regex and setup steps.

## Step 4: Tell the client — what to say

When a client sees impressions up, clicks down, they don't want an SEO lecture. They want to know whether the work is still working. Use this structure:

**One-line summary:** "Your visibility on Google grew this quarter, but more searchers now get their answer directly on Google's page, so fewer of them click. Your rankings held steady."

**The evidence (one slide):**

| Metric | This quarter vs last year |
| --- | --- |
| Search impressions | Up |
| Average position | Stable |
| Organic clicks | Down |
| AI assistant referrals | New / growing |
| Organic + AI key events | Report the actual change |

**What we're doing about it:**
- Restructuring top pages so AI Overviews quote and cite them.
- Targeting more commercial queries, where clicks still happen.
- Tracking AI referrals and brand searches as new success measures.

**Email script you can adapt:**

> Hi [Name], a quick note before our review. Organic clicks are down X% this quarter, but this isn't a ranking loss — your average position held and impressions rose Y%. Google now shows AI-generated answers on many of your topics, so more people get their answer without clicking. We're adapting by [two actions], and from this month we'll also report AI-assistant referrals and leads so you see the full picture.

A presentation deck makes this conversation easier than a dashboard because it tells the story in order. [Report Builder](/products/report-builder) builds a GSC + GA4 deck with a methodology slide that explains exactly these caveats.

## New KPIs to report alongside sessions

When clicks fall but visibility grows, sessions alone tell the wrong story. Add:

1. **Impressions and average position** — proof of visibility.
2. **Branded search clicks** — brand demand that AI Overviews rarely intercept.
3. **AI assistant referral sessions and key events.**
4. **AI Overview citations** for your top queries (manual checks or a tracking tool).
5. **Conversions per organic session** — quality often rises as casual clicks disappear.

Set realistic targets for each, using our guide to [setting KPI targets clients won't dispute](/resources/blogs/marketing-kpi-targets-goal-setting). Our [marketing KPI dashboard guide](/resources/blogs/marketing-kpi-dashboard-examples) lists 25 KPIs with formulas.

## How to win back clicks and citations

- **Answer first.** Put a 40–60-word direct answer under each H1. AI Overviews tend to quote clear, self-contained passages.
- **Add structure.** Comparison tables, definitions and FAQ sections are easier to cite.
- **Go after commercial intent.** Queries like "best X for Y" and "X pricing" still drive clicks.
- **Strengthen entity signals.** Consistent brand, author and organisation details across the web.
- **Review AI crawler access.** Make sure robots.txt doesn't block the AI search bots you want to be cited by.

Conalytic's [Generative Engine Optimization service](/services/generative-engine-optimization) handles these for clients who want hands-on help.

## Frequently asked questions
### Why are my impressions up but clicks down?

Impressions up, clicks down with a stable average position usually means your rankings are intact, but something on the results page — most often an AI Overview, ads or a featured snippet — is answering the query before people click.

### Are AI Overview clicks counted in Search Console?

Yes, clicks from AI Overviews are included in Search Console's organic totals. Whether you can filter them separately depends on what your property shows; reports differ, so check your own account.

### Is organic traffic down across the board in 2026?

Many sites report organic traffic down in 2026, especially informational content. Commercial and branded queries have generally held up better.

### How do I explain a traffic drop to a client?

Show impressions, position and clicks together so the client sees visibility held. Explain the AI Overviews change in one sentence, then show what you're doing and the new KPIs you'll report.

### Will the traffic come back?

Clicks lost to AI answers are unlikely to fully return. Visibility, citations, branded demand and AI referrals can grow, and those often convert better.

## Diagnose it in one conversation

Instead of switching between Search Console and GA4 tabs, ask Conalytic: "Which queries gained impressions but lost clicks this quarter, and did GA4 organic sessions follow?" Then turn the answer into a client deck.

**[Start free →](https://chat.conalytic.com/signup)** · [Conversational Analytics](/products/conversational-analytics) · [Report Builder](/products/report-builder)
`;
