import { NextResponse } from "next/server";
import { adminSessionId, requireAdminSessionOrRespond } from "@/lib/admin/auth";
import { deleteDraft, getDraft, saveDraft } from "@/lib/cms/draft-store";
import { getRegistryEntryById } from "@/lib/cms/page-registry";
import { schemaForRegistryType } from "@/lib/cms/schemas";
import { readCmsJson } from "@/lib/cms/read-cms-file";
import { resolveRobotsBody } from "@/lib/robots-txt";
import type { CmsDraftPayload } from "@/lib/cms/types";

function kindForEntry(entry: ReturnType<typeof getRegistryEntryById>): CmsDraftPayload["kind"] {
  if (!entry) throw new Error("missing");
  if (entry.id === "chrome-header") return "chrome-header";
  if (entry.id === "chrome-footer") return "chrome-footer";
  if (entry.type === "blog") return "blog";
  if (entry.type === "robots") return "robots";
  return "page";
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const { id } = await ctx.params;
  const entry = getRegistryEntryById(id);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sessionId = adminSessionId(auth);
  const draft = await getDraft(sessionId, id);
  const stored = await readCmsJson<Record<string, unknown>>(entry.contentFile);

  let published = stored;
  if (entry.type === "robots") {
    published = { body: resolveRobotsBody(stored, null) };
  }

  return NextResponse.json({ entry, draft, published });
}

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const { id } = await ctx.params;
  const entry = getRegistryEntryById(id);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = (await request.json()) as { data?: Record<string, unknown> };
  const chromeKind = entry.id === "chrome-footer" ? "footer" : entry.id === "chrome-header" ? "header" : undefined;
  const schema = schemaForRegistryType(entry.type, chromeKind);
  const parsed = schema.safeParse(body.data ?? {});
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
  }

  const payload = { kind: kindForEntry(entry), data: parsed.data } as CmsDraftPayload;

  const sessionId = adminSessionId(auth);
  await saveDraft(sessionId, id, payload);

  return NextResponse.json({ ok: true, draft: payload });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const { id } = await ctx.params;
  const entry = getRegistryEntryById(id);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sessionId = adminSessionId(auth);
  await deleteDraft(sessionId, id);
  return NextResponse.json({ ok: true });
}
