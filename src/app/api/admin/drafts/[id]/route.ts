import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { deleteDraft, getDraft, saveDraft } from "@/lib/cms/draft-store";
import { getRegistryEntryById } from "@/lib/cms/page-registry";
import { schemaForRegistryType } from "@/lib/cms/schemas";
import { readCmsJson } from "@/lib/cms/read-cms-file";
import type { CmsDraftPayload } from "@/lib/cms/types";

async function sessionId() {
  const session = await getAdminSession();
  return String(session.loggedInAt || "admin");
}

function kindForEntry(entry: ReturnType<typeof getRegistryEntryById>): CmsDraftPayload["kind"] {
  if (!entry) throw new Error("missing");
  if (entry.id === "chrome-header") return "chrome-header";
  if (entry.id === "chrome-footer") return "chrome-footer";
  if (entry.type === "blog") return "blog";
  return "page";
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const entry = getRegistryEntryById(id);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sid = await sessionId();
  const draft = await getDraft(sid, id);
  const published = await readCmsJson<Record<string, unknown>>(entry.contentFile);

  return NextResponse.json({ entry, draft, published });
}

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
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

  const sid = await sessionId();
  await saveDraft(sid, id, payload);

  return NextResponse.json({ ok: true, draft: payload });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const entry = getRegistryEntryById(id);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sid = await sessionId();
  await deleteDraft(sid, id);
  return NextResponse.json({ ok: true });
}
