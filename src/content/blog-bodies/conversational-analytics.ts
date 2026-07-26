/** Blog body: Conversational Analytics — customer-facing guide. */
export const conversationalAnalyticsBody = `
Marketing teams drown in dashboards. Google Analytics 4, Google Search Console, Google Ads, Google Tag Manager, and Meta Ads each ship their own UI, their own vocabulary, and their own export paths. When a stakeholder asks a simple question—*“Which campaign drove the most conversions last month?”*—someone still opens three tabs, copies numbers into a spreadsheet, and replies hours later.

**Conversational Analytics** in Conalytic solves that. Connect your accounts once, ask questions in plain English, and get answers backed by your real marketing data—with inline charts, tables, and KPI summaries. No SQL, no manual exports, no waiting on the data team.

This guide explains what Conversational Analytics is, what Conalytic does, how to get started, and the benefits for marketing teams.

## What is Conalytic?

**Conalytic** is a marketing analytics platform that helps teams understand performance across Google Analytics 4, Google Search Console, Google Ads, Google Tag Manager, and Meta Ads—without jumping between tools.

Instead of rebuilding the same reports every week, you connect your accounts through secure read-only access and work from one workspace. Conalytic offers three core products:

- **Conversational Analytics (Chats)** — ask questions in natural language and get live answers with visualizations
- **KPIs Tracker** — monitor goals and see whether performance is on track, at risk, or off track
- **Report Builder** — generate polished HTML presentation decks for clients and stakeholders

Conversational Analytics is the fastest way to go from question to insight.

## What is Conversational Analytics?

Conversational Analytics lets you **talk to your marketing data** the way you would talk to a colleague. Open **Chats** in Conalytic, choose the platform and account you want to analyze, and type your question. Conalytic pulls live metrics from your connected sources and responds with a clear answer—often including charts and tables you can share in meetings or Slack.

Each conversation is **scoped** to a single connection (one GA4 property, one Ads account, one Search Console site, and so on). That keeps client and brand data separate and makes answers trustworthy.

You can also start a **general marketing chat** without connecting a data source—useful for strategy, definitions, or campaign ideas. For numbers from your accounts, connect your platforms on the **Connections** page first.

## Which platforms can you query?

| Platform | What you can explore |
|----------|----------------------|
| **Google Analytics 4** | Traffic, users, engagement, conversions, channels, pages, trends |
| **Google Search Console** | Queries, pages, CTR, ranking opportunities |
| **Google Ads** | Campaigns, spend, conversions, devices, ROAS |
| **Google Tag Manager** | Container audits—tags, triggers, variables, consent |
| **Meta Ads** | Account, campaign, ad set, and ad performance |

Connect only the platforms you need. Conalytic uses read-only OAuth—you stay in control of what you authorize.

## Key benefits for marketing teams

### Get answers in minutes, not hours

Stop exporting CSVs and stitching slides together. Ask *“How did paid search perform last month?”* or *“Which landing pages have the highest exit rate?”* and get a direct answer while the meeting is still happening.

### See data, not just text

Responses include **line and bar charts**, **tables**, and **KPI summaries** inside the chat thread. Screenshot them for standups or follow up with another question in the same conversation.

### Work the way your team thinks

Marketing leaders ask business questions; they should not need to memorize where every metric lives in GA4. Conversational Analytics bridges that gap.

### Stay scoped and governed

One chat per client, brand, or property reduces mix-ups. Optional **context files** let you attach brand voice, conversion definitions, or client notes to a specific thread.

### Choose the AI model that fits

Select from leading models (such as GPT, Claude, or Gemini) per conversation. Refine your question before sending with built-in composer tools.

## How to use Conversational Analytics

1. **Sign up** for Conalytic and open the app.
2. **Connect** your marketing platforms on the Connections page (read-only OAuth).
3. **Open Chats** and click **New chat**.
4. **Select** your platform, connection, and property or account.
5. **Ask** your question in plain English.
6. **Review** the answer and any inline charts or tables.
7. **Follow up** in the same thread—or pin important chats for weekly reviews.

Suggested prompts to get started:

- *“Show me traffic trends this month”*
- *“Compare ad spend vs conversions”*
- *“Top performing keywords in Search Console”*
- *“Which campaigns drove the most conversions last week?”*

## Conversational Analytics vs traditional dashboards

| | Dashboards | Conversational Analytics |
|---|-----------|--------------------------|
| **Best for** | Fixed KPIs on a wallboard | Ad hoc questions and investigations |
| **Learning curve** | High—must know where metrics live | Low—ask in plain English |
| **Flexibility** | Pre-built views | Any question, any time |
| **Speed to insight** | Build a report first | Ask and get an answer |

Conversational Analytics does not replace GA4 or Google Ads. It helps you **use them faster**—especially when stakeholders ask questions you have not dashboarded yet.

## Best practices

**Define terms upfront.** ROAS, conversions, and sessions mean different things across platforms. Add a context file with your definitions.

**Scope one chat per client or brand.** Keeps answers accurate and conversations easy to find.

**Verify important numbers.** When a answer drives budget decisions, spot-check in the native platform or ask a follow-up question.

**Pin recurring reviews.** Weekly standup questions? Pin those chats at the top of your sidebar.

**Review connections quarterly.** Remove OAuth access for accounts you no longer manage.

## Who should use Conversational Analytics?

- **In-house marketers** who need GA4 and Ads answers without a dedicated analyst
- **Agencies** running live client calls—one scoped chat per client property
- **Growth leads** comparing channels during budget planning
- **Technical marketers** auditing GTM containers through conversation instead of manual exports

Pair with [KPIs Tracker](/products/kpis-tracker) for ongoing goal monitoring, or [Report Builder](/products/report-builder) when you need a polished deck for stakeholders.

## Frequently asked questions

**Can I chat without connecting data?**  
Yes. Choose a general marketing chat for strategy and definitions. Live metrics require a connected account.

**Does Conalytic change my ad accounts or tags?**  
No. Connections use read-only access where applicable.

**How is this different from a general AI chatbot?**  
Conalytic grounds answers in **your** connected marketing data via live APIs—not guesses from training data.

**Which AI model should I use?**  
Start with the default. Switch models if you prefer longer reasoning or faster responses.

## Get started

Conversational Analytics is available in Conalytic today. [Create a free account](https://chat.conalytic.com/signup), connect your marketing platforms, and open **Chats** from the sidebar.

Ask your first question before your next dashboard export is due—your stakeholders will notice the difference.

Explore the [Conversational Analytics product page](/products/conversational-analytics), see [all Conalytic features](/features), or [contact us](/contact) to book a walkthrough with our team.
`;
