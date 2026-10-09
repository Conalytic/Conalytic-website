/** Blog body: Chats, KPIs Tracker, and Report Builder — end-to-end marketing workflow. */
export const chatsKpisReportBuilderWorkflowBody = `
**Quick answer:** The Conalytic workflow that scales for marketing teams runs in three layers: use [Conversational Analytics](/products/conversational-analytics) Chats to investigate questions and capture charts, mirror decision metrics in [KPIs Tracker](/products/kpis-tracker) for ongoing On track / Off track status, then assemble client-ready narratives in [Report Builder](/products/report-builder). Same definitions across all three or numbers will fight in meetings.

Most teams treat dashboards, AI chats, and slide decks as separate chores. The result is duplicate math, conflicting conversion labels, and Friday panic exports. A deliberate Chats → KPIs → Report Builder workflow turns analysis into a repeatable operating system: investigate once, monitor daily, present weekly or monthly without rebuilding from scratch.

This guide walks through roles, handoffs, templates, and failure modes. Deep dives live in [Conversational Analytics marketing chat guide](/resources/blogs/conversational-analytics-marketing-chat-guide), [KPIs Tracker marketing goals guide](/resources/blogs/kpis-tracker-marketing-goals-guide), and [Report Builder HTML marketing reports guide](/resources/blogs/report-builder-html-marketing-reports-guide).

## Layer 1: Chats for investigation and ad-hoc answers

Chats excel when questions are **new, narrow, or time-bound**:

- "Which landing pages lost organic sessions last week?"
- "Did Campaign X CPA spike before or after the site deploy?"
- "List GSC queries with CTR under 2% and impressions over 500"

Use scoped threads per GA4 property, GSC site, or Ads account. Attach context files so event names match leadership language, see metric definition habits in [marketing KPI targets and goal setting](/resources/blogs/marketing-kpi-targets-goal-setting).

**Outputs to save:** chart screenshots, table summaries, and a one-line conclusion in the thread ("Organic loss concentrated on /pricing in US").

**When to stop chatting:** when the question becomes a metric you will watch every week. That handoff goes to KPIs.

Prompt libraries start in [what to ask GA4 data](/resources/blogs/what-to-ask-ga4-data). Incidents pull from [GA4 traffic drop and Search Console](/resources/blogs/ga4-traffic-drop-search-console) and [Google Ads and GA4 conversion discrepancy](/resources/blogs/google-ads-ga4-conversion-discrepancy).

## Layer 2: KPIs Tracker for monitoring and exceptions

KPIs Tracker holds **commitments**: targets, thresholds, evaluation windows, and status labels.

After a chat investigation proves a metric matters, promote it:

- Example: weekly qualified leads (GA4 generate_lead) vs target
- Example: monthly GSC clicks on commercial URL folder
- Example: Ads CPA ceiling for non-brand search

Standups and async updates start with **exceptions only**. Green metrics stay quiet.

Align KPI names with chat context files word-for-word. Operators should not translate "leads" into three different event names.

When KPIs flip Off track, drop back into the scoped chat with focused follow-ups, not a blank GA4 exploration tree.

Cross-channel KPIs should still cite source: GA4 for onsite, GSC for clicks, Ads for spend efficiency. Narrative templates in [cross-channel reporting with GSC, GA4, and Ads](/resources/blogs/cross-channel-reporting-gsc-ga4-ads) help executives see how pieces connect.

## Layer 3: Report Builder for client and leadership delivery

Report Builder turns verified numbers into **HTML presentation decks** you can walk through on calls or export.

Typical flow:

1. Pull headline KPI status from KPIs Tracker
2. Insert supporting charts from chat threads (same date ranges labeled)
3. Add commentary slides per [client marketing report structure](/resources/blogs/client-marketing-report-structure)

Reports are not where you **first** discover problems. Discovery belongs in Chats early in the cycle; reports **summarize decisions already made**.

AI can draft slide titles or executive summaries only after numbers are pinned, follow [should AI write client reports](/resources/blogs/should-ai-write-client-reports) so clients never see unverified AI metrics.

## Weekly rhythm example (agency or in-house)

**Monday**

- KPIs exception review (15 minutes)
- Scoped chat drill-down only for red metrics

**Midweek**

- Ad hoc client questions answered in existing threads
- Context file updates if events changed

**Thursday**

- Assemble Report Builder draft for recurring clients
- QA: every chart cites source and date range

**Friday**

- Send deck or present live
- Log next week's tests in chat threads

Adjust cadence for monthly retainers vs always-on ecommerce.

## Monthly rhythm overlay

Run fuller prompt sets across GA4, GSC, and Ads scoped chats once per month even if KPIs stayed green. Long windows hide slow drifts.

Compare month to date vs prior month consistently, finance calendars win over rolling 30 when billing is involved.

Archive PDF or HTML exports with version names clients can search.

## Roles and handoffs

| Role | Primary tool | Delivers |
|------|--------------|----------|
| Performance marketer | Chats + Ads scope | Campaign insights |
| SEO lead | Chats + GSC scope | Visibility insights |
| Analytics lead | Context files + KPIs | Definitions and QA |
| Account manager | Report Builder | Client story |

Handoff artifact is the **thread link plus KPI ID**, not a screenshot alone.

## Failure modes to avoid

**Skipping KPI promotion:** team re-asks the same chat question every Monday.

**Reporting without chat audit trail:** deck numbers cannot be reproduced.

**Mixed client scopes:** one chat thread for two brands; fix with scoped chats per [Conversational Analytics marketing chat guide](/resources/blogs/conversational-analytics-marketing-chat-guide).

**Definition drift:** KPI says purchase, context file says checkout_complete, client deck says orders.

**Over-automation:** AI writes full client memos without human read, risk trust.

## Metrics map template (fill per client)

Document once in context files and KPI notes:

- North star onsite: GA4 event name
- Organic visibility: GSC click target on URL set
- Paid efficiency: Ads CPA or ROAS rule
- Reporting window: calendar month vs rolling 28

Investigation playbooks reference the same map so Chats questions stay on rails.

## Scaling to many clients

- Template KPI sets by vertical (B2B lead gen vs ecommerce)
- Clone Report Builder structures per vertical
- Enforce naming conventions on threads
- Train new hires on the three-layer model before granting client access

Agencies report lower rework when account managers stop exporting raw GA4 UI CSVs for every slide.

## Sample handoff checklist (copy to your PM tool)

**From Chats to KPIs**

- [ ] Metric name matches context file
- [ ] Source connection documented (GA4 / GSC / Ads)
- [ ] Evaluation window matches client contract (weekly vs monthly)
- [ ] Target approved by account lead
- [ ] Thread link stored on client record

**From KPIs to Report Builder**

- [ ] Only Off track / At risk KPIs get narrative slides unless client pays for full scorecard
- [ ] Every chart shows date range in subtitle
- [ ] Cross-tool slides label sources explicitly
- [ ] Human reviewed AI-written headlines
- [ ] Appendix holds detailed chat tables optional for power users

**After delivery**

- [ ] Decisions logged in chat ("test CTA on /demo")
- [ ] Next review date set
- [ ] Context file updated if definitions changed

Checklists feel corporate. They prevent the classic failure mode where a beautiful Report Builder deck cites last month's KPI definitions.

## Tooling boundaries (what each layer should not do)

**Chats should not** become your CRM or project manager. Link out to tickets instead of pasting entire briefs.

**KPIs should not** replace exploratory analysis when a novel question appears mid-quarter.

**Report Builder should not** be the first place you notice a tracking cliff, KPIs and chats should fire earlier.

Respect boundaries and the three-layer model stays fast. Blur them and you rebuild dashboards inside slides every Friday.

## In-house marketing vs agency nuances

**In-house teams** often skip formal Report Builder cadence for internal standups but still benefit from Chats → KPIs. Executives want KPI exceptions in Slack; deep dives stay in threads.

**Agencies** need Report Builder for client-facing polish and audit trails. Thread links prove who queried what before send.

Both should use identical metric definitions in context files and KPIs. In-house teams just rename "client" to "business unit" in the checklist.

## Quarterly workflow retrospective

Every quarter, ask:

- Which KPIs triggered useful investigations vs noise?
- Which chat prompts became stale after site changes?
- Which report sections do clients ignore?

Retire noisy KPIs. Promote chat prompts that repeatedly surfaced revenue issues. Shrink decks clients skip. The workflow stays lean only if you prune deliberately.

Tie retros to [KPIs Tracker marketing goals guide](/resources/blogs/kpis-tracker-marketing-goals-guide) updates and [Report Builder HTML marketing reports guide](/resources/blogs/report-builder-html-marketing-reports-guide) template edits so documentation matches reality.

When a new hire joins, walk the workflow once on a single client: one chat investigation, one KPI promotion, one three-slide report. They will ignore written docs until they feel the handoffs physically. After that, written checklists stick.

## Frequently asked questions

### Can KPIs Tracker replace GA4 dashboards?

It replaces **status monitoring**, not full exploration. Chats still answer one-off questions.

### Do I need Report Builder if clients use Looker Studio?

Many teams use both: Looker for always-on links, Report Builder for narrative monthly walkthroughs with commentary slots.

### How do context files fit the workflow?

They sit under Chats and inform KPI labels. Update them before you change KPI definitions.

### What date range should reports use?

Match the KPI evaluation window and say it on slide one.

### Can one investigation chat feed multiple reports?

Yes. Link the same thread in October and November decks with updated date prompts in-thread.

### Where should beginners start?

Connect one GA4 property, run three prompts from [what to ask GA4 data](/resources/blogs/what-to-ask-ga4-data), promote one metric to KPIs, build a three-slide Report Builder test deck.

---

Connect Chats, KPIs Tracker, and Report Builder in one workspace: [Conversational Analytics](https://chat.conalytic.com/signup).
`;
