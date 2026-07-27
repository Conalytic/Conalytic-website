import { NextResponse, type NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { isAdminAuthConfigured } from "@/lib/admin/auth";
import { sessionOptions, type AdminSession } from "@/lib/admin/session";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/api/admin/auth/login"];

function isPublicAdminPath(pathname: string): boolean {
  return PUBLIC_ADMIN_PATHS.some((p) => pathname === p || pathname === `${p}/`);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminArea = pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
  if (!isAdminArea) return NextResponse.next();

  if (isPublicAdminPath(pathname)) {
    return NextResponse.next();
  }

  if (!isAdminAuthConfigured()) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Admin auth is not configured" }, { status: 503 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("error", "not_configured");
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  const session = await getIronSession<AdminSession>(request, response, sessionOptions);

  if (!session.isLoggedIn || !session.loggedInAt) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin", "/api/admin/:path*"],
};
