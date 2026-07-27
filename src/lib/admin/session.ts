import { getIronSession, type SessionOptions } from "iron-session";
import { cookies } from "next/headers";

export type AdminSession = {
  isLoggedIn: boolean;
  loggedInAt?: number;
};

export const ADMIN_SESSION_COOKIE = "conalytic_admin_session";

const sessionOptions: SessionOptions = {
  password: process.env.ADMIN_SESSION_SECRET || "development-only-secret-min-32-chars!!",
  cookieName: ADMIN_SESSION_COOKIE,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};

export async function getAdminSession() {
  return getIronSession<AdminSession>(await cookies(), sessionOptions);
}

export function isAdminPasswordValid(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return password === expected;
}

export { sessionOptions };
