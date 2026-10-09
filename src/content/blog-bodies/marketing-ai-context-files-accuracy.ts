/** Blog body: Marketing AI context files — metric definitions for reliable answers. */
export const marketingAiContextFilesBody = `
**Quick answer:** Marketing AI context files improve accuracy when they define primary conversions, date conventions, priority markets, campaign naming patterns, and known tracking caveats for a single scoped chat. Attach them to [Conversational Analytics](/products/conversational-analytics) threads per client or brand so every prompt inherits the same dictionary, without pasting definitions into each question.

Generic AI marketing answers fail for predictable reasons: the model guesses your event names, treats "conversion" as ambiguous, uses rolling 30 days when finance uses calendar months, and summarizes staging traffic as production. Context files fix the guesswork layer. They are short, structured notes bound to one data connection thread.

This guide explains what to put in context files, what to leave out, how they interact with KPIs and reports, and templates agencies reuse. Start chat habits in [Conversational Analytics marketing chat guide](/resources/blogs/conversational-analytics-marketing-chat-guide). Align numeric labels with [marketing KPI targets and goal setting](/resources/blogs/marketing-kpi-targets-goal-setting) and [KPIs Tracker marketing goals guide](/resources/blogs/kpis-tracker-marketing-goals-guide).

## What a marketing AI context file is in Conalytic

A context file is thread-local metadata the model reads before answering scoped queries. It is not a data upload of CSV exports. It is the **business rules sheet** an analyst would keep in their notebook:

- Official GA4 key event names for "lead" and "purchase"
- Whether reports default to US only or global
- Ads account fiscal pacing notes
- Brand voice for summaries destined for client email

One thread per GA4 property or Ads account keeps context aligned with OAuth scope. Mixing two brands in one file defeats the purpose.

## Minimum viable context file (copy structure)

\`\`\`
Brand: Example Co
Site: https://example.com
GA4 primary conversion: generate_lead (form submit)
GA4 secondary: purchase (ecommerce)
Default date compare: last 28 days vs prior 28 days
Priority geo: United States, Canada
Ignore: blog tag pages for executive summaries
Ads: use account 123-456-7890 naming prefix BRD_
Known caveats: consent banner v3 launched 2026-03-01; expect mobile dip
Client tone: plain language, no acronyms on first use
\`\`\`

Adjust blocks per connection type. GSC files should list priority URL prefixes. Ads files should list conversion actions used for bidding.

## Metric definitions that prevent wrong confidence

### Conversions vs key events vs Ads conversions

Write explicitly:

- "When I say conversion in GA4, I mean generate_lead unless I say purchase."
- "When I say Ads conversion, I mean the import action Lead Form Submit."

Link reconciliation habits to [Google Ads and GA4 conversion discrepancy](/resources/blogs/google-ads-ga4-conversion-discrepancy).

### Sessions vs users vs engaged sessions

State which headline metric leadership expects in standup. Prevents the model from switching to users mid-thread.

### Channel definitions

Note if you rely on GA4 default channel group or a custom grouping documented elsewhere.

### Revenue and ROAS

If value tracking is partial, say "ROAS directional only until Q3 SKU fix."

## Good prompts plus context vs bad prompts alone

**Bad without context:** "How are conversions trending?"

**Good with context:** Same prompt in a thread whose file defines generate_lead and date rules, the model applies your dictionary automatically.

**Bad file content:** Long marketing strategy essays with no numbers rules.

**Good file content:** Testable statements an analyst could verify in GA4 admin.

Refresh files when:

- Event renames ship
- New markets launch
- Client redefines qualified lead

## Context files and KPIs Tracker together

[KPIs Tracker](/products/kpis-tracker) stores targets and On track / Off track labels. Context files store **language** and **scope** for chats.

Keep names identical across both. If KPI says "Qualified leads (GA4 generate_lead)", the context file uses the same phrase. Weekly reviews then match chat answers without translation.

When KPIs flip Off track, open the scoped chat with investigation prompts from [what to ask GA4 data](/resources/blogs/what-to-ask-ga4-data) or organic checks from [GA4 traffic drop and Search Console](/resources/blogs/ga4-traffic-drop-search-console).

## Context files for cross-channel work

Context files are per connection, not per omnichannel story. For cross-channel narratives:

- Maintain three small files in three threads (GA4, GSC, Ads)
- Add one line in each: "Cross-channel deck due monthly; align dates to calendar month"

Synthesize in [Report Builder](/products/report-builder) using [cross-channel reporting with GSC, GA4, and Ads](/resources/blogs/cross-channel-reporting-gsc-ga4-ads) as outline.

Do not duplicate entire cross-tool essays inside each file, drift will diverge.

## Agency governance for context files

- Account lead approves file edits
- Version date at top ("Updated 2026-10-01")
- Changelog line when conversion definitions change
- Freelancers may suggest edits via ticket, not silent overwrite

Client-safe scope rules from agency practice: one brand per thread, no competitor benchmarks presented as client facts. Structure deliverables with [client marketing report structure](/resources/blogs/client-marketing-report-structure).

When AI drafts prose for clients, separate **numbers** (from scoped chats) from **words** (human edited), [should AI write client reports](/resources/blogs/should-ai-write-client-reports).

## Testing context file quality

Run three canonical prompts after every edit:

1. Primary conversion trend last 28 vs prior 28
2. Top channel by that conversion
3. One filtered view (geo or landing page prefix)

If answers use wrong event names, fix the file before sharing thread access widely.

Compare once to native GA4 UI during onboarding, not every week.

Export stable reporting via [report Builder HTML marketing reports guide](/resources/blogs/report-builder-html-marketing-reports-guide).

## Advanced additions (optional)

- **Seasonality notes:** "Q4 always spikes branded search."
- **Campaign calendar:** major promos with dates
- **Stakeholder glossary:** what the CEO calls "pipeline" vs GA4 events
- **SLA on data freshness:** when interns should not panic on partial days

Keep advanced sections short. Long files get ignored.

## Example context snippets by connection type

**GA4-only thread snippet:**

"Report engaged sessions alongside sessions for blog reviews. Primary conversion: demo_request. Exclude host staging.example.com if it appears in debug."

**Search Console snippet:**

"Money paths: /pricing, /product/, /solutions/. Brand: ExampleCo, Example Co, ExampleCo.io."

**Google Ads snippet:**

"Bidding uses Upload Lead conversion action Lead-SQL. Brand campaigns prefixed BR_. Report CPA at account level before campaign drill-down on client calls."

Mixing all three into one mega-file tied to one GA4 chat creates contradictions when Ads naming differs from GA4 event names.

## Rotating context files without chaos

Use a dated header and a one-line changelog:

"2026-10-01: renamed purchase event to purchase_web after checkout rebuild."

When strategists see an odd answer after a quiet week, they check the changelog first before blaming the model.

Pair rotations with KPI updates in [KPIs Tracker](/products/kpis-tracker) so dashboards and chats stay synchronized.

## Measuring whether context files work

Track internally (spreadsheet is fine):

- Number of answer corrections per client per month
- Time to first correct chart on client calls
- Incidents where wrong event names reached a deck

You should see corrections fall after the second context file iteration. If not, definitions in GA4 admin may still be ambiguous, fix source systems, not only the file.

## Context files vs prompt stuffing

Teams sometimes paste six paragraphs into every prompt instead of maintaining a file. That works once, then drifts. Context files win because:

- Updates apply to the whole thread history mindset (same rules next week)
- New team members inherit definitions without hunting old prompts
- QA reviews one file instead of fifty chat messages

Keep prompts short: "Run standup question 2 from our library." The file carries definitions; the prompt carries intent.

## Security and client confidentiality reminders

Context files may include commercial detail but should not store:

- Personal data about identifiable customers pulled from CRM
- Unredacted contract dollar amounts if policy forbids
- Credentials, tokens, or private keys

If a client sends sensitive strategy by email, summarize rules ("do not discount below X in copy suggestions") without pasting inboxes into the file. Scoped read-only analytics access already limits damage; good file hygiene limits reputational damage.

When in doubt, ask account lead before attaching new paragraphs. Marketing AI context files are living documents, not dumping grounds.

Schedule a fifteen-minute "definition standup" monthly where analytics and account leads read context files aloud. Disagreements surface before they appear in a client deck. That standup is boring and valuable, exactly like good metric governance should be.

When you onboard a new GA4 property, block thirty minutes to write the first context file before anyone runs executive prompts. First impressions of AI accuracy stick; early guesswork trains teams to distrust scoped chats unfairly.

Copy the minimum viable template into your agency handbook and require a completed file before granting client thread access to new strategists. The habit costs half an hour upfront and saves multi-hour reversals on live calls.

## Frequently asked questions

### How long should a context file be?

One screen to two screens. Dense rules beat narrative.

### Can I use one global file for all clients?

No for scoped accuracy. Reuse a template, customize per client.

### Do context files replace documentation in GA4?

No. They mirror what marketers need in chat daily.

### Will context files fix bad tagging?

No. They prevent mislabeling good data. Fix tags separately.

### Should I paste client contracts into context files?

Avoid legal text. Summarize reporting obligations in plain bullets.

### How often should teams review files?

Monthly for active accounts, immediately after migration or event changes.

---

Attach marketing AI context files to scoped GA4, GSC, Ads, and GTM chats: [Conversational Analytics](https://chat.conalytic.com/signup).
`;
