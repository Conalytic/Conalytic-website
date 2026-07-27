import { NextResponse } from "next/server";
import { getAdminSession, type AdminSession } from "@/lib/admin/session";

export type AdminAuthFailure = "not_configured" | "unauthorized";

export class AdminAuthError extends Error {
  readonly reason: AdminAuthFailure;

  constructor(reason: AdminAuthFailure) {
    super(reason);
    this.name = "AdminAuthError";
    this.reason = reason;
  }
}

/** Production admin requires explicit password + session secret (min 32 chars). */
export function isAdminAuthConfigured(): boolean {
  const password = process.env.ADMIN_PASSWORD?.trim();
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  return Boolean(password && secret && secret.length >= 32);
}

export async function requireAdminSession(): Promise<AdminSession> {
  if (!isAdminAuthConfigured()) {
    throw new AdminAuthError("not_configured");
  }

  const session = await getAdminSession();
  if (!session.isLoggedIn || !session.loggedInAt) {
    throw new AdminAuthError("unauthorized");
  }

  return session;
}

export function adminSessionId(session: AdminSession): string {
  return String(session.loggedInAt);
}

export function adminAuthFailureResponse(error: AdminAuthError): NextResponse {
  if (error.reason === "not_configured") {
    return NextResponse.json({ error: "Admin auth is not configured" }, { status: 503 });
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

/** Returns session or a ready-to-send error response for API routes. */
export async function requireAdminSessionOrRespond(): Promise<AdminSession | NextResponse> {
  try {
    return await requireAdminSession();
  } catch (error) {
    if (error instanceof AdminAuthError) return adminAuthFailureResponse(error);
    throw error;
  }
}
