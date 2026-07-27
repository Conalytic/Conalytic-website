import { NextResponse } from "next/server";
import { adminSessionId, requireAdminSessionOrRespond } from "@/lib/admin/auth";
import { getAiChatHistory, saveAiChatHistory, clearAiChatHistory, type AiChatMessage } from "@/lib/cms/draft-store";
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
  const messages = await getAiChatHistory(sessionId, registryId);

  return NextResponse.json({ messages });
}

export async function PUT(request: Request) {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const body = (await request.json()) as { registryId?: string; messages?: AiChatMessage[] };
  const registryId = body.registryId?.trim() || "";
  if (!registryId) {
    return NextResponse.json({ error: "registryId required" }, { status: 400 });
  }

  const entry = getRegistryEntryById(registryId);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (!Array.isArray(body.messages)) {
    return NextResponse.json({ error: "messages array required" }, { status: 400 });
  }

  const messages = body.messages.filter(
    (m): m is AiChatMessage =>
      Boolean(m) &&
      typeof m.text === "string" &&
      (m.role === "user" || m.role === "assistant" || m.role === "system"),
  );

  const sessionId = adminSessionId(auth);
  await saveAiChatHistory(sessionId, registryId, messages);

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const registryId = new URL(request.url).searchParams.get("registryId") || "";
  if (!registryId) {
    return NextResponse.json({ error: "registryId required" }, { status: 400 });
  }

  const entry = getRegistryEntryById(registryId);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const sessionId = adminSessionId(auth);
  await clearAiChatHistory(sessionId, registryId);

  return NextResponse.json({ ok: true });
}
