/** Blog body: Conversational Analytics (Chats) — 1000+ words, aligned with Conalytic-Chat. */
export const conversationalAnalyticsBody = `
Marketing teams drown in dashboards. Google Analytics 4, Google Search Console, Google Ads, Google Tag Manager, and Meta Ads each ship their own UI, their own vocabulary, and their own export paths. When a stakeholder asks a simple question—*“Which campaign drove the most conversions last month?”*—someone still opens three tabs, copies numbers into a spreadsheet, and replies hours later. **Conversational Analytics** in Conalytic (labeled **Chats** in the app) closes that gap: you connect your accounts once, scope a chat to the property or ad account you care about, and ask in plain English. Conalytic calls live APIs, streams an answer, and renders inline charts, tables, and KPI rows through its \`conalytic-viz\` layer—no SQL, no Looker workbook, no ticket to the data team.

This guide explains what Conversational Analytics is, how it works inside Conalytic-Chat, which integrations are supported today, and how marketing leaders can adopt it without sacrificing governance or accuracy.

## What is Conversational Analytics in Conalytic?

Conalytic’s tagline—*Casting Spells of Clarity on Your Data*—maps to a concrete product behavior: **natural-language questions over authorized marketing data**. In the app, you open **Chats** from the sidebar, start a **New chat**, and walk through three steps: **Platform**, **Connection**, and **Data**. You pick GA4, Search Console, Google Ads, GTM, Meta, or LinkedIn (connect only), choose the OAuth sign-in, then select the property, site, account, container, or ad account. Each conversation is **scoped** to that single connection and entity, so answers never bleed across clients or brands by accident.

You can also start a **general marketing chat** with **No data source**—useful for strategy, definitions, or copy—while data-backed threads always use the platforms you connected on the **Connections** page. That page copy is explicit: *“Link your marketing and analytics accounts so Conalytic can answer from your real data. Read-only OAuth—you stay in control.”*

## Integrations: what Chats can query live

Accuracy starts with knowing which APIs Conalytic actually calls:

| Platform | Live chat tools | Typical questions |
|----------|-----------------|-------------------|
| **Google Analytics 4** | Yes | Traffic, users, engagement, conversions, channels, pages, trends |
| **Google Search Console** | Yes | Queries, pages, CTR, ranking opportunities, non-branded filters |
| **Google Ads** | Yes | Campaigns, spend, conversions, devices, ROAS, trends |
| **Google Tag Manager** | Yes | Full container audit—tags, triggers, variables, consent, security |
| **Meta Ads** | Yes | Account, campaign, ad set, and ad insights (daily or aggregated) |
| **LinkedIn Ads** | Connect + scope only | OAuth works; live data tools are not implemented yet |

KPIs Tracker and Report Builder share some of the same OAuth connections but use different surfaces. Chats is the broadest for **interactive exploration** across GA4, GSC, Ads, GTM, and Meta.

## Core features marketers use every day

### Scoped conversations and saved history

Every chat thread is pinned, renamed, or deleted from the sidebar. **Pinned** chats stay at the top for weekly reviews; **recent** chats resume where you left off. Suggested prompts in the empty state nudge common workflows: *“Show me traffic trends this month,”* *“Compare ad spend vs conversions,”* *“Top performing keywords,”* *“Analyze bounce rate by channel,”* *“Campaign ROI breakdown,”* and *“Social media engagement summary.”*

### Inline visualizations (conalytic-viz)

Answers are not text walls. Conalytic returns **line and bar charts**, **tables**, and **KPI rows** inside the thread so you can screenshot or follow up in the same message. That matters for Slack updates and client calls—you show the viz, not a paraphrase.

### AI models and composer tools

Choose **GPT-5.4**, **Claude Opus 4.8**, or **Gemini 3.1 Pro** per conversation. Before sending, use **Improve** or **Make longer** in the composer to refine tone and depth (**Translate** is marked coming soon in the UI). Composer refine actions are billed separately from standard chat messages on Pro plans.

### Per-chat context files

Upload a optional **context file** per chat—brand voice, conversion definitions, client KPI notes. Context applies only to that thread, which is ideal when one workspace serves multiple accounts with different rules.

### Agentic retrieval

Behind the scenes, Conalytic uses **agentic API tools** to fetch live metrics for the scoped entity, then streams the narrative. You ask follow-ups in the same thread; the model retains conversation history (note: refreshing mid-reply cannot resume the same stream—start a new message instead).

## How Conversational Analytics differs from BI dashboards

Traditional BI rewards people who already know where metrics live. Conversational Analytics rewards people who know **what decision they need to make**. The comparison is not “replace GA4”—it is **stop re-implementing GA4 in slides every Monday**.

- **Dashboards** excel at monitoring fixed KPIs on a wallboard.
- **Chats** excel at ad hoc investigation: *“Why did bounce spike on Tuesday?”* *“Which landing page has the highest exit rate?”* *“Compare GA4 vs Meta ROAS for Q1.”*

Conalytic’s empty-state **Limitations** section is honest: the model may occasionally misread metrics—**always verify** critical numbers; coverage depends on connected platforms; data stays within authorized accounts; mid-stream refresh does not resume.

## Workflow: from connect to insight

1. **Connect** GA4, GSC, Google Ads, GTM, Meta, or LinkedIn on the Connections page (read-only OAuth).
2. **New chat** → choose platform, connection, and entity (auto-skips steps when only one option exists).
3. **Ask** in natural language; review inline charts and tables.
4. **Attach** optional context files; refine prompts before send.
5. **Pin** high-value threads for weekly standups or client Q&A.

For a deeper product tour, see the [Conversational Analytics product page](/products/conversational-analytics).

## Billing and tokens on Conalytic Pro

Chat usage is **token-metered** on Pro: prompt tokens plus completion tokens, priced at provider list cost with a **50% platform markup**. The **Billing and Usage** page tracks ledger types: **Chat**, **Composer refine**, **Report** (separate product), signup credit, top-ups, and admin grants. New accounts receive **signup credit** (documented as free tokens on signup); **PayPal top-ups** have a minimum **$20 USD**. Enterprise and Super Admin roles have unlimited assisted usage while tokens are still tracked.

KPI evaluation in KPIs Tracker is **not** token-metered; only Chats and AI-enabled Report insights consume LLM tokens.

## Who should use Conversational Analytics?

- **In-house marketers** who need GA4 and Ads answers without waiting on analytics.
- **Agencies** doing live client calls—scope one chat per client property.
- **Growth leads** comparing channels during budget cycles.
- **Technical marketers** auditing GTM containers through chat instead of manual exports.

If your team only needs goal status across GA4, GSC, and Ads without LLM calls, pair Chats with [KPIs Tracker](/products/kpis-tracker). If you need stakeholder decks, add [Report Builder](/products/report-builder).

## Best practices for trustworthy chat analytics

**Align on definitions first.** ROAS, conversions, and sessions mean different things across platforms. Put definitions in a per-chat context file.

**Scope narrowly.** One chat per client property reduces cross-talk and speeds responses.

**Verify outliers.** When an answer drives budget decisions, spot-check in the native platform or cross-ask in the same thread.

**Use suggested prompts as templates.** Customize them for your vertical (ecommerce, B2B, local).

**Govern OAuth.** Review connected accounts quarterly; remove stale LinkedIn or Meta connections you no longer need.

## Frequently asked questions

**Can I chat without connecting data?**  
Yes. Choose “No data source” for general marketing chat. Live metrics require a scoped OAuth connection.

**Does Conalytic write to my ad accounts?**  
No. Connections use read-only scopes where applicable.

**Which AI model should I pick?**  
Start with the default; switch if you need longer reasoning (Claude) or faster iteration (GPT). All three are supported in production.

**How is this different from ChatGPT alone?**  
Conalytic grounds answers in **your** GA4, GSC, Ads, GTM, and Meta data via live API tools—not training-data guesses.

## Get started with Conalytic Chats

Conversational Analytics is live in Conalytic today. [Create a free Pro account](https://chat.conalytic.com/signup), connect your marketing platforms, and open **Chats** from the sidebar. Ask your first question before your next dashboard export is due—your future self (and your stakeholders) will thank you.

For platform-wide context, explore [all Conalytic features](/features) or [book a demo](/contact) with our team.
`;
