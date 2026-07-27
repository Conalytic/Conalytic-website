import { randomBytes } from "crypto";
import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type AdminSession = {
  isLoggedIn: boolean;
  loggedInAt?: number;
};

export const ADMIN_SESSION_COOKIE = "conalytic_admin_session";

const DEV_SESSION_SECRET = "development-only-secret-min-32-chars!!";

function resolveSessionSecret(): string {
  const configured = process.env.ADMIN_SESSION_SECRET?.trim();
  if (configured && configured.length >= 32) return configured;

  if (process.env.NODE_ENV === "production") {
    return randomBytes(32).toString("hex");
  }

  return DEV_SESSION_SECRET;
}

const sessionOptions: SessionOptions = {
  password: resolveSessionSecret(),
  cookieName: ADMIN_SESSION_COOKIE,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12, // 12 hours
  },
};

export async function getAdminSession() {
  return getIronSession<AdminSession>(await cookies(), sessionOptions);
}

export function isAdminPasswordValid(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) return false;
  return password === expected;
}

export { sessionOptions };
