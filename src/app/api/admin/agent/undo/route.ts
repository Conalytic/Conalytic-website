import { NextResponse } from "next/server";
import { adminSessionId, requireAdminSessionOrRespond } from "@/lib/admin/auth";
import {
  consumeAiUndoSnapshot,
  deleteDraft,
  getAiUndoSnapshot,
  saveDraft,
} from "@/lib/cms/draft-store";
import { getRegistryEntryById } from "@/lib/cms/page-registry";

export async function GET(request: Request) {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const registryId = new URL(request.url).searchParams.get("registryId") || "";
  if (!registryId) {
    return NextResponse.json({ error: "registryId required" }, { status: 400 });
  }

  const entry = getRegistryEntryById(registryId);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sessionId = adminSessionId(auth);
  const snapshot = await getAiUndoSnapshot(sessionId, registryId);

  return NextResponse.json({ available: Boolean(snapshot) });
}

export async function POST(request: Request) {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const body = (await request.json()) as { registryId?: string };
  const registryId = body.registryId?.trim() || "";
  if (!registryId) {
    return NextResponse.json({ error: "registryId required" }, { status: 400 });
  }

  const entry = getRegistryEntryById(registryId);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sessionId = adminSessionId(auth);
  const snapshot = await consumeAiUndoSnapshot(sessionId, registryId);
  if (!snapshot) {
    return NextResponse.json({ error: "Nothing to undo" }, { status: 400 });
  }

  if (snapshot.draft) {
    await saveDraft(sessionId, registryId, snapshot.draft);
  } else {
    await deleteDraft(sessionId, registryId);
  }

  return NextResponse.json({ ok: true, restoredDraft: Boolean(snapshot.draft) });
}
