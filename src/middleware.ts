import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * When Storyblok’s Visual Editor loads your site, the URL includes bridge query params.
 * We set a short-lived cookie so subsequent RSC requests can fetch **draft** content even if Referer is stripped.
 */
const PREVIEW_COOKIE = "sb_visual_editor";

export function middleware(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const fromStoryblok =
    searchParams.has("_storyblok") ||
    searchParams.has("_storyblok_tk") ||
    searchParams.get("_storyblok_release") != null;

  if (!fromStoryblok) {
    return NextResponse.next();
  }

  const res = NextResponse.next();
  const isProd = process.env.NODE_ENV === "production";
  res.cookies.set(PREVIEW_COOKIE, "1", {
    path: "/",
    maxAge: 60 * 60 * 4,
    sameSite: isProd ? "none" : "lax",
    secure: isProd,
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
