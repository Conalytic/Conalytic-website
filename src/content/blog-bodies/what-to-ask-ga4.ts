/** Blog body: What to ask GA4 — natural language analytics question library. */
export const whatToAskGa4Body = `
The fastest way to chat with GA4 data is to ask scoped, time-bound questions with a defined metric—*"organic sessions by landing page, last 28 days vs prior 28 days"*—not open prompts like *"how is the site doing?"* Good GA4 questions name the dimension, metric, period, and comparison. Bad questions force the tool to guess and produce confident wrong answers.

Marketing leaders want to chat with GA4 the way they chat with colleagues, but GA4's interface was built for analysts who already know where sessions hide versus engaged sessions. Natural language analytics bridges that gap when questions are structured. This guide organizes GA4 questions by job-to-be-done—weekly standup, client call, budget defense, incident response—and shows good versus bad answer patterns, where marketing data chat fails, and how to build a reusable question library.

## What should I ask GA4 before a weekly marketing standup?

Standup questions must be fast, comparable, and channel-aware. Limit to five core questions so the team does not drown in metrics.

### Question 1: Did traffic change meaningfully week over week?

**Good question:** *"Total sessions and total users for last 7 days vs prior 7 days, with percent change."*

**Good answer pattern:** States both periods' numbers, percent change, and whether the shift exceeds a 10% variance threshold. Notes reporting delay if partial days included.

**Bad answer pattern:** *"Traffic is down."* No baseline, no magnitude, no date range—unusable for standup.

### Question 2: Which channel moved the needle?

**Good question:** *"Sessions by default channel group, last 7 days vs prior 7 days, sorted by largest absolute change."*

**Good answer:** Table with channel, current, prior, delta, percent change. Highlights if one channel explains more than 50% of total session change.

**Bad answer:** Lists all channels without comparison or ranks by volume instead of change.

### Question 3: Are conversions tracking with traffic?

**Good question:** *"Key event count for purchase (or your primary conversion) last 7 days vs prior 7 days, with conversion rate per session."*

**Good answer:** Separates volume change from rate change. If sessions fell 5% but conversions fell 20%, flags a landing page or funnel issue—not just traffic.

**Bad answer:** Reports conversion count without session context, or uses the wrong event name from a stale dashboard.

### Question 4: What landing pages gained or lost?

**Good question:** *"Top 20 landing pages by session change, organic search only, last 7 days vs prior 7 days."*

**Good answer:** Page path, session delta, percent change. Flags new entries or pages that dropped off the top 20.

**Bad answer:** Top pages by total sessions with no period comparison—static leaderboard, not a trend.

### Question 5: Any device or geo anomalies?

**Good question:** *"Session change by device category and country, last 7 days vs prior 7 days, show only rows with absolute change greater than 100 sessions."*

**Good answer:** Filtered short list. Connects mobile-only drops to known consent or site releases if context file mentions them.

**Bad answer:** Full world map with no threshold—noise.

Pin these five in a **GA4-scoped** [Conversational Analytics](/products/conversational-analytics) thread—one property per chat. [KPIs Tracker](/products/kpis-tracker) can mirror the same goals with On track / Off track labels so standup starts with exceptions, not full table reads.

## What should I ask GA4 on a live client call?

Client calls demand defensible numbers and instant follow-ups. Prepare property scope before the call—wrong property is the leading cause of embarrassing reversals.

### Question: How did organic search perform this month vs last month?

**Good question:** *"Organic search sessions, engaged sessions, and key events for calendar month to date vs same days prior month, with percent change."*

**Good answer:** Matches how clients think about "this month." Defines organic as default channel group. Mentions if month-to-date is unfair due to day-count mismatch.

**Bad answer:** Uses last 30 rolling days without saying so—client compares to their calendar-month spreadsheet and loses trust.

### Question: Which campaigns drove the most quality traffic?

**Good question:** *"Sessions and engagement rate by session campaign, paid and organic channels, last 30 days, minimum 50 sessions per campaign."*

**Good answer:** Quality metric included (engagement rate or engaged sessions per user). Filters low-volume noise.

**Bad answer:** Campaign list sorted by sessions alone—includes one-click bot campaigns.

### Question: What is our top content for the client's priority country?

**Good question:** *"Top 10 landing pages by sessions in United States, organic search, last 28 days."*

**Good answer:** Geo filter explicit. Offers follow-up: *"same list for conversions."*

**Bad answer:** Global top pages when client only cares about one market.

### Question: Did the site speed or engagement change after the redesign?

**Good question:** *"Average engagement time per session and engagement rate, site-wide and for redesigned URL path /blog/, compare 14 days before launch date X to 14 days after."*

**Good answer:** Before/after windows anchored to deploy date. Segments redesigned section.

**Bad answer:** Vague *"engagement after redesign"* with no launch date in scope.

When clients challenge SEO narratives, cross-check with Search Console in a **separate GSC-scoped** [Conversational Analytics](/products/conversational-analytics) thread—or use our [GA4 traffic drop vs Search Console](/resources/blogs/ga4-traffic-drop-search-console) playbook. Stable GSC clicks with falling GA4 sessions point to measurement, not rankings.

## What should I ask GA4 to defend marketing budget?

Budget defense needs year-over-year context, efficiency metrics, and channel incrementality hints—not vanity totals.

### Question: Is paid search efficiency improving YoY?

**Good question:** *"Google Ads sessions (paid search channel), cost per session if Ads linked, key event count, and key event rate, same calendar month YoY."*

**Good answer:** YoY table with absolute and percent deltas. Separates traffic growth from conversion rate improvement.

**Bad answer:** Only sessions YoY without conversion efficiency—CFO hears spend justification, not ROI.

### Question: Which channels grew share of conversions?

**Good question:** *"Share of total key events by default channel group, this quarter vs same quarter last year."*

**Good answer:** Share percentages, not just raw counts—shows mix shift.

**Bad answer:** Raw conversion counts without share—misleading when overall volume changed.

### Question: Are we retaining returning users?

**Good question:** *"Returning user sessions and key event rate for returning users, last 90 days vs prior 90 days."*

**Good answer:** Retention-oriented. Notes if new user acquisition masked returning user decline.

**Bad answer:** Blended new+returning totals only.

### Question: What is the funnel drop-off on our primary conversion path?

**Good question:** *"Funnel or path: sessions on /pricing to key event signup, last 30 days, step conversion rates."*

**Good answer:** Step counts and step-to-step rates. Identifies largest drop step.

**Bad answer:** Single page metric without path context.

Export answers into [Report Builder](/products/report-builder) decks for budget committees—methodology slides document date ranges so finance can reconcile.

## What should I ask GA4 during a traffic or conversion incident?

Incident questions are sequential: confirm scope, isolate segment, check tagging, compare external sources.

| Step | Question template | Decision threshold |
|------|-------------------|-------------------|
| 1 | Sessions last 24h vs same weekday prior week | >20% drop → escalate |
| 2 | Channel breakdown for drop period | One channel >60% of loss → focus there |
| 3 | Landing pages with >30% session drop | Any page >5% of site sessions → inspect |
| 4 | Realtime active users now vs typical | Realtime normal + reports down → delay not incident |
| 5 | Key events for same window | Events down with sessions → funnel or tag |

**Good incident question:** *"Hourly sessions yesterday vs same weekday last week, organic search only, highlight hours with greater than 40% drop."*

**Bad incident question:** *"Why did traffic crash?"*—no time grain, no channel, invites hallucination in generic AI tools.

For Google Ads conversion mismatches during incidents, see [Google Ads vs GA4 discrepancy](/resources/blogs/google-ads-ga4-conversion-discrepancy). For AI referral spikes polluting channel reports, see [tracking AI assistant traffic](/resources/blogs/tracking-ai-assistant-traffic-ga4).

## Where does natural language analytics fail with GA4?

Marketing data chat is powerful but not omniscient. Know failure modes before you stake client credibility on an answer.

### Sampling and cardinality limits

GA4 explorations and some API paths apply thresholds. High-cardinality dimensions—page path plus query string, custom event parameters—may return (other) rows or sampled subsets. **Rule:** if the answer includes "thresholding applied" or row counts look capped at 50,000, drill down in native GA4 or narrow the date range.

**Fails when:** You ask for *"every URL with session count"* on a 10M-session property.

**Works when:** You ask for *"top 50 landing pages by sessions, last 7 days."*

### Attribution windows and identity

GA4 conversion paths depend on attribution settings (data-driven default, lookback windows). A chat tool reading default reports may not match Google Ads UI attribution for the same conversion.

**Fails when:** You ask *"which campaign drove conversions?"* without specifying attribution model or lookback.

**Works when:** You ask *"key events by session campaign, last-click session scope, last 28 days."*

### Definitions drift across properties

\`session\`, \`engaged session\`, \`key event\`, and \`conversion\` mean whatever this property configured. GA4 questions that assume purchase events without verifying event name fail silently.

**Fails when:** Unscoped *"conversion rate"* on a property with twelve marked events.

**Works when:** *"Key event rate for event name purchase, last 30 days."*

### Lag and intraday partial data

Standard GA4 reports lag 24–48 hours. Asking *"sessions today"* in standard reports undercounts.

**Fails when:** Incident diagnosis uses only completed daily reports at 9 AM.

**Works when:** Realtime plus completed days, with explicit note of partial day.

### Competitor tool boundaries

**Google Analytics Intelligence** (native) answers simple questions inside GA4 but lacks cross-platform scope. **Looker Studio** requires pre-built models. **Conalytic** [Conversational Analytics](/products/conversational-analytics) grounds answers in live GA4 APIs with inline charts—one OAuth property per thread. For GSC or Ads, start a separate scoped chat; for unified monthly decks, use [Report Builder](/products/report-builder). Conalytic still inherits GA4 API limits above.

Document these limits in your team's question library header so new users do not over-trust fluent paragraphs.

## How do you build a downloadable GA4 question library?

A question library is a living doc—not a one-time PDF—organized by JTBD with placeholders.

**Template row:**

| JTBD | Question | Metric / dimension | Period | Comparison | Notes |
|------|----------|-------------------|--------|------------|-------|
| Standup | Channel session change | sessions, channel | 7d vs 7d | prior | flag >10% |
| Client | Organic performance | organic sessions, key events | MTD vs prior MTD | calendar | |
| Budget | YoY efficiency | key event rate, paid | month | YoY | |
| Incident | Hourly organic | sessions | yesterday | same weekday | >40% hour |

Store versions per client property in your wiki or attach as context files in [Conversational Analytics](/products/conversational-analytics). Export CSV monthly; that becomes your downloadable question library for freelancers and new hires.

**Quality gates for library entries:**

1. Every question names **metric**, **dimension**, **date range**, and **comparison**.
2. Every answer example shows **bad vs good** so reviewers know what to reject.
3. Thresholds (10%, 15%, 20%) match your agency SLAs.
4. Cross-links to GSC, Ads, and incident playbooks when GA4 alone is insufficient.

## What makes a good GA4 AI assistant prompt structure?

Use a four-line prompt skeleton:

1. **Scope:** property or site section  
2. **Metric(s):** sessions, key events, engagement rate  
3. **Breakdown:** channel, page, device  
4. **Time + comparison:** last 28 days vs prior 28 days  

Example: *"For blog paths only: sessions and key events by landing page, last 28 days vs prior 28 days, top 15 by session change."*

Avoid pronouns (*"it"*, *"that campaign"*) across turns unless your tool keeps thread context scoped to one property.

## Frequently asked questions

**Can I ask GA4 questions without learning the GA4 UI?**  
Yes, with structured questions and a connected read-only integration. You still need metric definitions and date discipline—the UI knowledge becomes "what to ask," not "where to click."

**Is chatting with GA4 the same as ChatGPT?**  
Generic ChatGPT does not see your property. Natural language analytics in Conalytic grounds answers in live GA4 APIs. Always prefer grounded tools for client numbers.

**How many questions should a weekly review include?**  
Five to seven core questions plus follow-ups. More than ten dilutes action items.

**Should I use explorations or chat for complex funnels?**  
Funnels with five-plus steps or path exploration may still need native explorations. Chat excels at comparisons, rankings, and threshold filters.

**What read-only permissions does Conalytic need?**  
OAuth read access to GA4—no write or config changes. Revoke quarterly for departed clients.

**Can I share chat answers directly to clients?**  
Screenshot tables and charts; add methodology footnotes (date range, definitions). For polished delivery, pipe insights into [Report Builder](/products/report-builder).

**Where do I start if my team never used natural language analytics?**  
Copy the standup five questions into a pinned chat, run them once, calibrate thresholds against last month's manual report. Expand the library one JTBD per week.

Explore [Conversational Analytics](/products/conversational-analytics), [KPIs Tracker](/products/kpis-tracker) for goal monitoring, and [Report Builder](/products/report-builder) for client decks. Related diagnostics: [GA4 traffic drop analysis](/resources/blogs/ga4-traffic-drop-search-console), [AI traffic in GA4](/resources/blogs/tracking-ai-assistant-traffic-ga4), [Google Ads vs GA4 conversions](/resources/blogs/google-ads-ga4-conversion-discrepancy).
`;
