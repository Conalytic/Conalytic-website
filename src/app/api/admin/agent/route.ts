import { NextResponse } from "next/server";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { getAdminSession } from "@/lib/admin/session";
import { getAdminSettings, getDraft, saveDraft, saveAiUndoSnapshot } from "@/lib/cms/draft-store";
import { getRegistryEntryById } from "@/lib/cms/page-registry";
import { schemaForRegistryType } from "@/lib/cms/schemas";
import { readCmsJson } from "@/lib/cms/read-cms-file";
import type { CmsDraftPayload } from "@/lib/cms/types";
import { deepMerge } from "@/lib/cms/deep-merge";
import { buildAgentSystemPrompt, buildAgentUserPrompt } from "@/lib/cms/agent-prompt";
import { isReadOnlyAgentPrompt } from "@/lib/cms/agent-intent";
import { resolveEffectiveSeo } from "@/lib/cms/seo-defaults";
import type { CmsSeoFields } from "@/lib/cms/types";
import { extractTextFromUploads, formatUploadsForPrompt } from "@/lib/cms/extract-upload-text";
import { normalizePageOverlay } from "@/lib/cms/normalize-overlay";
import { parseAgentResponse } from "@/lib/cms/parse-agent-response";
import { stableJson } from "@/lib/cms/stable-json";

export async function POST(request: Request) {
  const form = await request.formData();
  const registryId = String(form.get("registryId") || "");
  const prompt = String(form.get("prompt") || "").trim();
  const provider = (form.get("provider") as "openai" | "anthropic") || "openai";
  const files = form.getAll("files").filter((f): f is File => f instanceof File && f.size > 0);

  if (!registryId) {
    return NextResponse.json({ error: "registryId required" }, { status: 400 });
  }
  if (!prompt && files.length === 0) {
    return NextResponse.json({ error: "Enter a prompt or attach a file" }, { status: 400 });
  }

  const entry = getRegistryEntryById(registryId);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let uploads;
  try {
    uploads = await extractTextFromUploads(files);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Could not read attached files";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const settings = await getAdminSettings();
  const session = await getAdminSession();
  const sessionId = String(session.loggedInAt || "admin");

  const published = (await readCmsJson<Record<string, unknown>>(entry.contentFile)) ?? {};
  const existingDraft = await getDraft(sessionId, registryId);
  const current = deepMerge(published, (existingDraft?.data as Record<string, unknown>) ?? {});

  const chromeKind = entry.id === "chrome-footer" ? "footer" : entry.id === "chrome-header" ? "header" : undefined;
  const contentSchema = schemaForRegistryType(entry.type, chromeKind);

  const readOnly = isReadOnlyAgentPrompt(prompt);
  const effectiveSeo = entry.hasSeo
    ? resolveEffectiveSeo(registryId, current.seo as CmsSeoFields | undefined)
    : null;

  const system = buildAgentSystemPrompt(registryId, entry.label, entry.path, { readOnly });
  const userContent = buildAgentUserPrompt(current, prompt, formatUploadsForPrompt(uploads), {
    readOnly,
    effectiveSeo,
  });

  let rawJson = "{}";
  try {
    if (provider === "anthropic") {
      const key = settings.anthropicApiKey || process.env.ANTHROPIC_API_KEY;
      if (!key) throw new Error("Anthropic API key not configured");
      const client = new Anthropic({ apiKey: key });
      const msg = await client.messages.create({
        model: settings.anthropicModel || "claude-sonnet-4-20250514",
        max_tokens: 8192,
        system,
        messages: [{ role: "user", content: userContent }],
      });
      const block = msg.content.find((b) => b.type === "text");
      rawJson = block && block.type === "text" ? block.text : "{}";
    } else {
      const key = settings.openaiApiKey || process.env.OPENAI_API_KEY;
      if (!key) throw new Error("OpenAI API key not configured");
      const client = new OpenAI({ apiKey: key });
      const completion = await client.chat.completions.create({
        model: settings.openaiModel || "gpt-4.1-mini",
        messages: [
          { role: "system", content: system },
          { role: "user", content: userContent },
        ],
        response_format: { type: "json_object" },
      });
      rawJson = completion.choices[0]?.message?.content ?? "{}";
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : "AI request failed";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const cleaned = rawJson.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();
  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch {
    return NextResponse.json({ error: "AI returned invalid JSON" }, { status: 502 });
  }

  const parsedResult = parseAgentResponse(parsed, contentSchema, current);
  if (!parsedResult.ok) {
    return NextResponse.json({ error: parsedResult.error }, { status: 400 });
  }

  let agentSummary = parsedResult.value.summary;
  let agentData = parsedResult.value.data;

  if (readOnly) {
    agentData = current;
  }

  const kind: CmsDraftPayload["kind"] =
    entry.id === "chrome-header"
      ? "chrome-header"
      : entry.id === "chrome-footer"
        ? "chrome-footer"
        : entry.type === "blog"
          ? "blog"
          : "page";

  const payload = {
    kind,
    data: normalizePageOverlay(registryId, agentData),
  } as CmsDraftPayload;

  const previousData = normalizePageOverlay(
    registryId,
    (existingDraft?.data as Record<string, unknown> | undefined) ?? published,
  );
  let changed = !readOnly && stableJson(payload.data) !== stableJson(previousData);

  if (changed) {
    await saveAiUndoSnapshot(sessionId, registryId, existingDraft);
    await saveDraft(sessionId, registryId, payload);
  }

  const fileNote =
    uploads.length > 0 ? ` Used ${uploads.length} attached file${uploads.length > 1 ? "s" : ""}.` : "";
  const summary = agentSummary + fileNote;
  const closing = changed
    ? " Review the preview, then save or push to staging."
    : readOnly
      ? " No changes were made — ask me to apply any fixes when you are ready."
      : "";

  return NextResponse.json({
    ok: true,
    changed,
    summary: `${summary}${closing}`,
    draft: changed ? payload : undefined,
    undoAvailable: changed,
  });
}
