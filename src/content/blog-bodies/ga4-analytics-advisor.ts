/** Blog body: GA4 Analytics Advisor: What It Can (and Can't) Do in 2026 */
export const ga4_analytics_advisorBody = `
**Quick answer:** GA4 Analytics Advisor is a free, Gemini-powered chat assistant built into Google Analytics 4. You ask a question in plain English, and it reads your GA4 property, explains what changed, and draws simple charts. It is a strong first step for GA4-only questions. It cannot see Search Console, Google Ads spend, Tag Manager or any non-Google data, and it is available only in English-language GA4 accounts.

If you manage analytics for clients or for your own brand, the GA4 Analytics Advisor deserves a place in your workflow. But it is not the whole workflow. This guide explains how the Google Analytics Advisor works, how to switch it on, which questions it answers well, where its limitations show up, and when a cross-platform tool is the better choice.

## What is GA4 Analytics Advisor?

GA4 Analytics Advisor is Google's conversational AI assistant for Google Analytics 4. Google announced it in November 2025 alongside a sister product, Ads Advisor for Google Ads, and began rolling both out to English-language accounts globally from early December 2025. It is available on standard (free) GA4 properties as well as GA4 360.

Unlike a help-centre chatbot, the GA4 AI assistant reads the data inside the property you have open. It can:

- **Answer performance questions** such as "Why did sessions drop last week?" using what Google calls key driver analysis.
- **Generate quick charts** for a metric or comparison you name.
- **Explain configuration** — for example, how to set up a key event or a custom dimension.
- **Suggest next steps**, such as building an audience or running an experiment.

In short, the GA4 Analytics Advisor turns GA4 from a menu-heavy reporting tool into something closer to a conversation.

## How to turn on Google Analytics Advisor

Most English-language properties now show the assistant by default. If you do not see it:

1. **Check your GA4 language.** The Google Analytics Advisor currently appears only when the interface language is English. Go to your Google account language settings, switch to English, and reload GA4.
2. **Look in the top-right corner.** An Advisor icon appears next to the search bar.
3. **Or use search.** Type "Ask Analytics Advisor" into the GA4 search bar.
4. **Confirm your access level.** You need at least Viewer access to the property for the GA4 AI assistant to read its data.

Once it opens, the panel keeps the context of your conversation, so you can ask follow-up questions without repeating yourself.

## What to ask GA4 Analytics Advisor

The assistant works best with specific, single-property questions. Here are prompts that suit its strengths:

| Goal | Example prompt |
| --- | --- |
| Diagnose a change | "Why did conversions fall between 1 and 15 September compared with the previous 15 days?" |
| Channel comparison | "Compare engagement rate for Organic Search and Paid Search this month." |
| Landing pages | "Which landing pages had the biggest drop in sessions last week?" |
| Device split | "Show key events by device category for the last 28 days as a chart." |
| Setup help | "How do I mark the generate_lead event as a key event?" |
| Learning | "What is the difference between users and active users in GA4?" |

For more ideas on framing analytics questions, read our guide on [what to actually ask your GA4 data](/resources/blogs/what-to-ask-ga4-data).

## Analytics Advisor limitations you should know

Every AI assistant has boundaries. These are the analytics advisor limitations that matter most for agencies and in-house marketers.

### 1. It only sees GA4

This is the biggest limitation. The GA4 Analytics Advisor cannot read Google Search Console impressions, Google Ads cost and ROAS, Tag Manager containers, Meta Ads or your CRM. Many real questions span these sources. "Did organic traffic fall because rankings dropped or because AI Overviews took the clicks?" needs Search Console. "Is paid search still profitable?" needs Ads cost data.

For a deeper look at why the sources disagree, see [why GA4 traffic dropped but Search Console didn't](/resources/blogs/ga4-traffic-drop-search-console) and [why Google Ads and GA4 disagree on conversions](/resources/blogs/google-ads-ga4-conversion-discrepancy).

### 2. English only (for now)

At launch, Google limited the assistant to English-language accounts. Teams in India, Europe or Latin America who work in a local-language interface must switch languages to use it.

### 3. Interface accuracy is still maturing

Early testers have reported the GA4 Gemini assistant naming buttons that don't match the interface. One tester was told to use a filter type that GA4 doesn't support ([Summit](https://www.summit.co.uk/?p=27741)). Treat step-by-step setup instructions as a guide, and double-check them in the interface.

### 4. It can't fix broken tracking

Like any AI layer, the GA4 AI assistant reports whatever your property collected. Missing key events, duplicate tags or misconfigured channel groups produce confident but wrong answers. Audit tracking before you trust the analysis.

### 5. One property at a time

Agencies with dozens of clients cannot ask a cross-client question such as "Which clients lost the most organic traffic this month?" Each conversation is tied to the property you have open.

### 6. No deliverable at the end

The Google Analytics Advisor gives you an answer, not a client report. You still need to copy figures into slides or a dashboard, write the commentary, and send it.

## GA4 Analytics Advisor vs Conalytic Conversational Analytics

If those limitations block your work, a cross-source tool fills the gap. Here is how the GA4 Analytics Advisor compares with [Conalytic Conversational Analytics](/products/conversational-analytics):

| Capability | GA4 Analytics Advisor | Conalytic Conversational Analytics |
| --- | --- | --- |
| Price | Free with GA4 | Free to start with 325,203 signup tokens ([pricing](/platform/pricing)) |
| GA4 data | Yes | Yes |
| Search Console data | No | Yes |
| Google Ads data | Separate Ads Advisor | Yes, in the same tool |
| Google Tag Manager audits | No | Yes — tags, triggers, consent, security |
| AI model | Gemini | Choose GPT-5.4, Claude Opus 4.8 or Gemini 3.1 Pro per chat |
| Inline charts and tables | Simple charts | Charts, tables and KPI rows in every answer |
| Per-chat context files | No | Yes — upload brand rules or conversion definitions |
| Client-ready output | No | Turn findings into an HTML deck with [Report Builder](/products/report-builder) |
| Interface language | English only | English |

The two tools are not rivals so much as layers. Use the GA4 Analytics Advisor for quick in-product checks. Use a cross-platform assistant when the question crosses data sources, or when the answer has to become a client deliverable.

## When the GA4 Analytics Advisor is enough

You probably don't need anything else if:

- You manage one or two GA4 properties.
- Your questions are about on-site behaviour only (traffic, engagement, key events).
- You don't report Search Console or Ads performance in the same story.
- You don't produce client-facing reports every month.

## When you need a GA4 Analytics Advisor alternative

Look for a GA4 analytics advisor alternative when:

- **You report across sources.** SEO stories need Search Console; paid stories need Ads cost.
- **You audit tracking.** GTM audits catch the problems that make AI answers wrong.
- **You manage many clients.** You need scoped conversations per client so data never bleeds between brands.
- **You deliver reports.** You need the analysis to become a deck, not a chat transcript.
- **You want model choice.** Some teams prefer Claude for long explanations or GPT for multi-metric reasoning.

For a side-by-side of every option, read our pillar guide to the [best AI tools for Google Analytics 4](/resources/blogs/best-ai-tools-google-analytics-4). If you want to use ChatGPT or Claude directly, our walkthrough on [how to use ChatGPT and Claude with GA4](/resources/blogs/chatgpt-claude-google-analytics-4) compares four methods.

## How to get reliable answers from any GA4 AI assistant

Whichever tool you choose, these habits improve accuracy:

1. **State the date range and comparison.** "Last 28 days vs previous 28 days" beats "recently".
2. **Name the metric exactly.** Say "key events" or "sessions", not "results".
3. **Ask for the breakdown you need.** Channel, device, landing page or country.
4. **Ask "why", then verify.** Treat the explanation as a hypothesis and check it in the standard reports.
5. **Check tracking health first.** A broken tag ruins every downstream answer.
6. **Record your definitions.** Keep a short note of what counts as a conversion for each client.

## Frequently asked questions
### Is GA4 Analytics Advisor free?

Yes. The GA4 Analytics Advisor is included at no extra cost in standard and 360 GA4 properties where it has rolled out.

### Why can't I see Analytics Advisor in my GA4 account?

The most common reason is language. The assistant appears only when your GA4 interface is in English. Switch your Google account language to English and reload. Also confirm you have at least Viewer access to the property.

### Can Google Analytics Advisor read Search Console or Google Ads data?

No. The Google Analytics Advisor reads only the GA4 property you have open. Google Ads has its own separate Ads Advisor. To analyse GA4, Search Console and Google Ads together, use a cross-platform tool such as [Conalytic Conversational Analytics](/products/conversational-analytics).

### Which AI model powers the GA4 AI assistant?

It runs on Google's Gemini models.

### Is GA4 Analytics Advisor accurate?

It is useful for spotting drivers of change, but early testers have reported errors in setup instructions. Always verify key numbers and any configuration steps in the standard GA4 reports.

## Ask one question across GA4, Search Console and Google Ads

The GA4 Analytics Advisor is a welcome upgrade, but most marketing questions don't stop at GA4. Conalytic lets you chat with GA4, Search Console, Google Ads and Tag Manager in scoped conversations. You can pick your AI model and turn the answers into client-ready reports.

**[Start free with 325,203 tokens →](https://chat.conalytic.com/signup)** or [explore Conversational Analytics](/products/conversational-analytics).
`;
