import { NextResponse } from "next/server";
import { getAdminSession, isAdminPasswordValid } from "@/lib/admin/session";

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };
  if (!body.password || !isAdminPasswordValid(body.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const session = await getAdminSession();
  session.isLoggedIn = true;
  session.loggedInAt = Date.now();
  await session.save();

  return NextResponse.json({ ok: true });
}
