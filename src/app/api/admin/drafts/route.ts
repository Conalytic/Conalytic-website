import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/session";
import { listDraftRegistryIds } from "@/lib/cms/draft-store";
import { CMS_REGISTRY } from "@/lib/cms/page-registry";

export async function GET() {
  const session = await getAdminSession();
  const sessionId = String(session.loggedInAt || "admin");
  const dirtyIds = await listDraftRegistryIds(sessionId);

  return NextResponse.json({
    registry: CMS_REGISTRY,
    dirtyIds,
  });
}
