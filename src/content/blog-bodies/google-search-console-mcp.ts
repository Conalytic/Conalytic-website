/** Blog body: Google Search Console MCP: Connect GSC to Claude & ChatGPT (2026) */
export const google_search_console_mcpBody = `
**Quick answer:** A Google Search Console MCP server lets an AI assistant such as Claude or ChatGPT query your Search Console data — clicks, impressions, CTR, positions, pages, queries and sitemaps — in plain English. Google publishes an official open-source MCP server for GA4 but not for Search Console. To connect GSC you use a community server (from GitHub or npm), a hosted connector, or a tool with Search Console built in.

The Model Context Protocol (MCP) has changed how SEOs work with data. Instead of exporting CSVs and pasting them into a chatbot, you connect the assistant directly to the source. This guide covers the main Google Search Console MCP options, step-by-step setup for Claude Desktop, Claude Code and ChatGPT, security basics, and 15 prompts that work well. It also covers when a hosted tool saves you the setup.

## What is an MCP server?

MCP is an open standard that lets AI assistants call external tools. An MCP server is a small program that exposes those tools. A Google Search Console MCP server exposes functions such as "run a search analytics query", "list sites", "inspect a URL" or "list sitemaps". When you ask Claude "Which pages lost the most clicks last month?", it calls the server, gets the data from the Search Console API, and explains the result.

## Is there an official Google Search Console MCP server?

No. Google publishes an official, open-source MCP server for Google Analytics 4 that runs read-only GA4 reports. It does not publish one for Search Console ([Windsor.ai](https://windsor.ai/google-analytics-mcp/)). That leaves three routes for a GSC MCP server:

| Option | Examples | Setup effort | Works in | Data |
| --- | --- | --- | --- | --- |
| Community open-source server | [surendranb/google-search-console-mcp](https://github.com/surendranb/google-search-console-mcp), [metehan777/google-search-console-mcp](https://github.com/metehan777/google-search-console-mcp), gsc-mcp-server on npm | Medium — OAuth app or credentials, local install | Claude Desktop, Claude Code, Cursor, VS Code | GSC only |
| Hosted connector | Windsor.ai, Coupler.io and similar | Low — sign in, pick site | Claude, ChatGPT, Gemini (varies) | GSC plus many sources |
| Built-in tool | [Conalytic Conversational Analytics](/products/conversational-analytics) | Lowest — OAuth in the app | Conalytic | GSC, GA4, Google Ads, Tag Manager |

Community projects change quickly. Check each repository's README, licence, last-update date and requested permissions before you install.

## How to set up a Google Search Console MCP in Claude Desktop

Exact commands depend on the server you choose. This is the typical flow for a community server:

1. **Install a runtime.** Most servers need Node.js 18+ (for \`npx\`) or Python with \`uv\`/\`pipx\`.
2. **Create Google OAuth credentials (if required).** In Google Cloud Console, create a project, enable the Search Console API, and create an OAuth client. Some servers ship with shared credentials or a setup command instead.
3. **Run the server's setup.** Many offer a one-line command that opens a Google sign-in and stores a token locally.
4. **Add the server to Claude Desktop.** Open the config file:
   - macOS: \`~/Library/Application Support/Claude/claude_desktop_config.json\`
   - Windows: \`%APPDATA%\\Claude\\claude_desktop_config.json\`

   Add an entry like this (use the package name from your chosen server's README):

   \`\`\`json
   {
     "mcpServers": {
       "google-search-console": {
         "command": "npx",
         "args": ["-y", "<package-name-from-readme>"]
       }
     }
   }
   \`\`\`

5. **Restart Claude Desktop** and ask: "List my Search Console properties." If it returns your sites, the GSC MCP server is working.

## How to connect Search Console MCP in Claude Code

Claude Code adds servers with one command. For a Python package, the pattern looks like:

\`\`\`bash
claude mcp add google-search-console -- uvx <package-name-from-readme>
\`\`\`

Then run \`/mcp\` inside Claude Code to confirm the server is connected and authenticate if prompted.

## How to connect Search Console to ChatGPT

ChatGPT accepts MCP servers only as **remote** connectors in Developer Mode on paid plans; it cannot start a local server. So most local GSC MCP servers will not work in ChatGPT directly ([Windsor.ai](https://windsor.ai/google-analytics-mcp/)). To connect Search Console to ChatGPT you need a hosted connector that exposes a remote HTTPS MCP endpoint, or a ChatGPT app or plugin from a data vendor.

## Adding Google Analytics alongside: GA4 MCP server

Most SEO questions need GA4 as well. "Did the pages that lost clicks also lose conversions?" requires both sources. Google's official GA4 MCP server is read-only and built primarily around Gemini CLI. It can be added to Claude Code, and it reads one GA4 property at a time. Running a GA4 MCP server and a Search Console MCP side by side gives Claude both datasets in one conversation.

## 15 SEO prompts for your Search Console MCP

Once connected, try these:

1. "List the 20 queries with the most impressions last month and their CTR."
2. "Which pages lost the most clicks in the last 28 days compared with the previous 28?"
3. "Find queries where impressions rose but CTR fell by more than 30% at a stable position."
4. "Show queries ranking in positions 8–20 with over 500 impressions — my quick-win list."
5. "Compare mobile vs desktop CTR for my top 10 pages."
6. "Which countries drove the biggest change in clicks this quarter?"
7. "Group my top 200 queries by topic and total the clicks per group."
8. "Which pages rank for more than 50 distinct queries?"
9. "Find branded vs non-branded click share, where branded queries contain [brand]."
10. "List pages with high impressions and CTR under 1% — title rewrite candidates."
11. "Check the indexing status of these 10 URLs."
12. "Which sitemaps have errors or warnings?"
13. "Show the weekly clicks trend for /blog/ pages over the last 6 months."
14. "Which new queries appeared this month that didn't exist last month?"
15. "Write a 5-bullet SEO summary of last month for a client, using only this data."

For diagnosing the impressions-versus-clicks pattern, see [impressions up, clicks down: how to explain AI Overviews to clients](/resources/blogs/impressions-up-clicks-down-ai-overviews).

## Security and permissions

- **Use read-only scopes** where the server allows. Most SEO analysis doesn't need write access.
- **Know where tokens are stored.** Local servers usually save credentials in your home directory. Protect that machine.
- **Review community code.** Prefer projects with recent commits, clear licences and visible maintainers.
- **Be careful with client data.** Confirm your agency agreement allows sending client Search Console data to a third-party AI provider.
- **Watch API quotas.** The Search Console API has usage limits; very large queries may be throttled.

## Troubleshooting common Google Search Console MCP problems

Most setup problems with a Google Search Console MCP fall into a handful of patterns:

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Claude doesn't list the server | Config file has a JSON error, or the app wasn't restarted | Validate the JSON (a missing comma is common), then fully quit and reopen Claude Desktop |
| "No sites found" | You signed in with a Google account that has no verified Search Console properties | Re-run the server's setup and sign in with the account that owns or has access to the property |
| Permission or 403 errors | The Search Console API isn't enabled, or the OAuth scope is too narrow | Enable the Search Console API in your Cloud project and re-authenticate |
| Data stops at a recent date | Search Console data has a reporting lag | Query up to two or three days before today |
| Results look truncated | Row limits on a single API request | Ask for fewer dimensions, a shorter date range, or paginated results |
| Works in Claude but not ChatGPT | ChatGPT can't launch local servers | Use a hosted connector that exposes a remote MCP endpoint |

If you manage many client properties, keep a short list of which Google account has access to which site. Most "missing data" tickets with a GSC MCP server come down to the wrong account.

## When to use a hosted tool instead

A self-hosted Google Search Console MCP is great for technical SEOs. It is harder to roll out across an agency team or to clients. A hosted tool makes sense when:

- Account managers, not developers, need answers.
- You want GSC, GA4, Google Ads and Tag Manager in one place without running several servers.
- You need to turn answers into client reports.
- Each client's data must stay in its own scoped conversation.

[Conalytic Conversational Analytics](/products/conversational-analytics) connects Search Console with read-only OAuth and lets you choose GPT-5.4, Claude Opus 4.8 or Gemini 3.1 Pro per chat. Answers come with inline charts. If you need a custom MCP server for your own internal tools, Conalytic's [MCP server development service](/services/mcp-server-development) builds them.

Compare all the options in our guide to the [best AI tools for Google Analytics 4](/resources/blogs/best-ai-tools-google-analytics-4), and see four ways to use assistants with GA4 in [how to use ChatGPT and Claude with GA4](/resources/blogs/chatgpt-claude-google-analytics-4).

## Frequently asked questions
### Does Google have an official Search Console MCP server?

No. Google publishes an official open-source MCP server for GA4, but not for Search Console. Use a community server, a hosted connector or a tool with Search Console built in.

### Is a Google Search Console MCP server read-only?

Most community GSC MCP servers are read-only for search analytics. Some also include sitemap or indexing tools; check each server's tool list and requested scopes.

### Can I query several Search Console sites at once?

Many servers include a "list sites" tool and let you query any verified property you have access to, one request at a time. Cross-site comparisons usually mean asking the assistant to run several queries and combine them.

### Does a Search Console MCP work in ChatGPT?

Only through a remote (hosted) MCP connector in ChatGPT's Developer Mode, or a vendor app. Local servers that run on your computer don't plug into ChatGPT directly.

### Do I need coding skills?

For a self-hosted Google Search Console MCP, basic command-line comfort helps. Hosted connectors and built-in tools need no coding.

## Skip the setup

Want Search Console answers without installing anything? Connect GSC to Conalytic in one click and ask your first question in plain English.

**[Start free →](https://chat.conalytic.com/signup)** · [Need a custom MCP server? Talk to us](/services/mcp-server-development)
`;
