import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import {
  consumeAiUndoSnapshot,
  deleteDraft,
  getAiUndoSnapshot,
  saveDraft,
} from "@/lib/cms/draft-store";
import { getRegistryEntryById } from "@/lib/cms/page-registry";

async function sessionId() {
  const session = await getAdminSession();
  return String(session.loggedInAt || "admin");
}

export async function GET(request: Request) {
  const registryId = new URL(request.url).searchParams.get("registryId") || "";
  if (!registryId) {
    return NextResponse.json({ error: "registryId required" }, { status: 400 });
  }

  const entry = getRegistryEntryById(registryId);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sid = await sessionId();
  const snapshot = await getAiUndoSnapshot(sid, registryId);

  return NextResponse.json({ available: Boolean(snapshot) });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { registryId?: string };
  const registryId = body.registryId?.trim() || "";
  if (!registryId) {
    return NextResponse.json({ error: "registryId required" }, { status: 400 });
  }

  const entry = getRegistryEntryById(registryId);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sid = await sessionId();
  const snapshot = await consumeAiUndoSnapshot(sid, registryId);
  if (!snapshot) {
    return NextResponse.json({ error: "Nothing to undo" }, { status: 400 });
  }

  if (snapshot.draft) {
    await saveDraft(sid, registryId, snapshot.draft);
  } else {
    await deleteDraft(sid, registryId);
  }

  return NextResponse.json({ ok: true, restoredDraft: Boolean(snapshot.draft) });
}
