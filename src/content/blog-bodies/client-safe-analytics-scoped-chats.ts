/** Blog body: Client-safe analytics for agencies — scoped chats and governance. */
export const clientSafeAnalyticsScopedChatsBody = `
**Quick answer:** Client-safe analytics starts with scoped chats: one Conalytic conversation per client data connection (one GA4 property, one Search Console site, one Ads account), read-only OAuth, no cross-client prompts, and context files that spell conversion definitions before AI answers. Never run multi-brand questions in a single thread on a live client call.

Agencies lose clients when someone reads the wrong property aloud. Client-safe analytics is not paranoia. It is product design plus habits. [Conversational Analytics](/products/conversational-analytics) scoped chats separate connections so prompts pull from one authorized source at a time. That matches how contracts and data processing agreements already draw boundaries.

This guide covers governance for agency teams: naming, access, live-call rules, what to attach in context files, and how KPIs and reports stay aligned. Pair with [Conversational Analytics marketing chat guide](/resources/blogs/conversational-analytics-marketing-chat-guide) and [client marketing report structure](/resources/blogs/client-marketing-report-structure).

## Why scoped chats matter on client calls

Multi-tab analytics workflows invite mistakes:

- Wrong GA4 property selected
- Search Console domain typo (http vs https, subdomain vs domain)
- Ads manager account vs child account confusion
- Copy-paste from last week's different client thread

Scoped chats reduce those failure modes because the thread **remembers** which connection you picked at creation. You can still ask bad questions, but you cannot silently blend Client A GA4 with Client B unless you switch threads intentionally.

Client-safe analytics also means **read-only** access. Analysis tools should not need write scopes to Google Ads or GA4 admin. Conalytic connects with OAuth read patterns so strategists query without publish rights.

## Naming and workspace conventions

Use predictable names:

- \`ClientName  |  GA4  |  example.com\`
- \`ClientName  |  GSC  |  https://example.com/\`
- \`ClientName  |  Ads  |  123-456-7890\`

Add fiscal notes in context files, not in chat titles.

Store thread links in your PM tool on the client record. New hires should never hunt Slack for "that chat from March."

Mirror the same client boundary in [KPIs Tracker](/products/kpis-tracker) goal groups so standup exceptions match chat scope.

## Context files: the client-safe layer

Context files attach to a single thread. Treat them as a lightweight data dictionary plus client preferences.

Include:

- Primary and secondary conversion event names in GA4
- Brand terms and common misspellings for query discussions
- Markets that matter vs regions to ignore in summaries
- Known tracking caveats ("staging events fire on www2")
- Tone notes for client-facing summaries (plain language, no jargon)

Exclude:

- Credentials or API secrets (never)
- Unverified competitor claims
- Personal data about end customers

Context files improve AI accuracy, see disciplined metric definitions when building files alongside [marketing KPI targets and goal setting](/resources/blogs/marketing-kpi-targets-goal-setting).

## Live client call playbook

**Before the call**

Run pre-read prompts in each scoped chat with the same date range you will present. Export charts you might need.

Open [Report Builder](/products/report-builder) draft if the call includes a formal monthly review.

**During the call**

- Start a fresh follow-up prompt in the **existing** scoped chat, do not spin a general chat mid-call.
- Read numbers from the thread that matches the data source you cite aloud ("This is from your GA4 property for example.com").
- If asked a cross-tool question, say you will verify in the other scoped thread after the call rather than guessing.

**After the call**

Paste decisions into the thread ("Client approved test on /pricing CTA"). Those notes feed the next report draft.

When AI drafts client email copy, keep humans accountable, [should AI write client reports](/resources/blogs/should-ai-write-client-reports).

## Questions that stay client-safe vs risky

**Safe when scoped:**

- "Organic sessions last 28 vs prior 28 for this property"
- "Search Console clicks on /product pages, same window"
- "Ads CPA by campaign, month to date vs prior month"

**Risky even with AI:**

- "Compare this client to our other clients" in one chat
- "Estimate industry benchmark CPA" without citing a source
- "Why is their competitor winning?" without data connections

Benchmark questions belong in general strategy chats with **no** client data connected, clearly labeled as non-client-specific.

## Multi-seat agency access patterns

Define roles:

- **Strategists:** create chats, attach context, query live
- **Account leads:** approve context file changes monthly
- **Freelancers:** access only assigned client threads via your internal policy

Rotate context file review when GA4 events change. Tie reviews to [KPIs Tracker marketing goals guide](/resources/blogs/kpis-tracker-marketing-goals-guide) updates so KPI labels match chat language.

## Incident and escalation rules

When metrics cliff on a client account:

1. Confirm scope in thread header (property ID echo if available)
2. Run GA4 channel split via prompts in [what to ask GA4 data](/resources/blogs/what-to-ask-ga4-data)
3. Add GSC and Ads scoped checks per [GA4 traffic drop and Search Console](/resources/blogs/ga4-traffic-drop-search-console) and [Google Ads and GA4 conversion discrepancy](/resources/blogs/google-ads-ga4-conversion-discrepancy)
4. Document whether client comms mention data latency or tracking fixes

Do not promise root cause on the call until tags are ruled out, clients remember overconfidence.

## Reporting handoff without data leaks

[Report Builder](/products/report-builder) decks should pull screenshots from the correct client's threads only. Structure sections using [client marketing report structure](/resources/blogs/client-marketing-report-structure).

Cross-channel stories use [cross-channel reporting with GSC, GA4, and Ads](/resources/blogs/cross-channel-reporting-gsc-ga4-ads) as a narrative template, still with per-source citations.

Export workflows: [report Builder HTML marketing reports guide](/resources/blogs/report-builder-html-marketing-reports-guide).

## Training new team members on client-safe analytics

Week one drills:

1. Create three scoped chats on a sandbox client
2. Run identical date prompts in each
3. Practice saying data source aloud before every number
4. Break intentionally on a staging property to see mismatch

Week two: pair on a live call shadow, no speaking until scope checks pass.

Culture beats policy: praise someone who pauses to switch threads.

## Data processing and client trust (practical, not legal advice)

Agencies already maintain DPAs and subprocessors lists. Scoped chats support those policies when:

- Access is read-only and revocable
- Threads map one-to-one with client connections named in contracts
- You do not paste end-customer PII into prompts ("debug this user's email") 
- Retention follows your internal policy for analytics notes

When clients ask where data goes, explain that questions run against their authorized Google accounts and that thread history is your agency workspace, not a public model training dump. Use your counsel's language for formal requests; operationally, scoped threads make audits easier because each answer traces to one property or account.

## Reducing rework between strategists and account managers

Account managers should not re-query from scratch hours before send. Standardize:

- **Tuesday:** strategists drop thread links and one-paragraph takeaways in the PM tool
- **Wednesday:** account managers build Report Builder shells from those links
- **Thursday:** analytics lead spot-checks one metric per client against native UI

This rhythm keeps client-safe analytics from becoming "whoever has GA4 access wins." Everyone cites the same scoped thread IDs.

## When to spin a new thread vs continue an old one

**Continue** when date range changes but scope and definitions stay the same.

**New thread** when client rebrands, property ID changes, or you need a clean audit trail for a post-mortem.

**Never** continue a thread after a known wrong-property incident without renaming and documenting the correction at the top.

## Scoped chats on mixed media (organic plus paid plus brand)

Clients still receive one narrative deck. Production workflow:

- Run three scoped chats before writing
- Label screenshots GA4 / GSC / Ads in filenames
- Assemble in [Report Builder](/products/report-builder) with section dividers
- Store thread triplets in the PM tool under the same client milestone

Never screenshot a chart without noting which connection produced it. Account managers who inherit threads mid-month should verify connection names in Conalytic before presenting.

For cross-channel outline order, use [cross-channel reporting with GSC, GA4, and Ads](/resources/blogs/cross-channel-reporting-gsc-ga4-ads) even when the client only cares about one channel today, they will ask about the others eventually.

## Auditing past client calls

Quarterly, pick two recorded calls and audit:

- Did every number cite the correct scoped thread?
- Did anyone use a general marketing chat for client-specific metrics?
- Did KPIs quoted match context file definitions?

Fix process with training, not shame. Client-safe analytics matures when audits become routine like creative QA.

Add a simple rule for contractors: they may query only client threads listed on their assignment ticket. No browsing unrelated connections "to learn the UI." Learning happens on sandbox properties with fake data, not on live client OAuth scopes.

## Frequently asked questions

### Can one user belong to many client chats?

Yes. Discipline is thread choice, not account count.

### Should clients get Conalytic seats?

Some agencies grant read-only report links instead. If clients log in, give them only their connections.

### How do scoped chats interact with MCC Ads accounts?

Scope at the account ID you report in decks. Note MCC hierarchy in context files.

### What if a client has multiple GA4 properties?

One property per revenue story. Use separate chats; never blend unless the client explicitly merges reporting.

### Are chat transcripts client data?

Treat them like internal analytics notes. Follow your DPA and retention policy.

### Can AI replace an analytics QA step?

No. Scoped chats speed queries; humans still verify odd answers against native UI once during onboarding.

---

Run client-safe scoped chats on GA4, GSC, Ads, and GTM: [Conversational Analytics](https://chat.conalytic.com/signup).
`;
