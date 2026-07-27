import { NextResponse } from "next/server";
import { adminSessionId, requireAdminSessionOrRespond } from "@/lib/admin/auth";
import { listDraftRegistryIds } from "@/lib/cms/draft-store";
import { CMS_REGISTRY } from "@/lib/cms/page-registry";

export async function GET() {
  const auth = await requireAdminSessionOrRespond();
  if (auth instanceof NextResponse) return auth;

  const sessionId = adminSessionId(auth);
  const dirtyIds = await listDraftRegistryIds(sessionId);

  return NextResponse.json({
    registry: CMS_REGISTRY,
    dirtyIds,
  });
}
