import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const DEBUG = process.env.DEBUG_LOGGING === "true";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production", // Only use secure cookies in production
  });

  if (DEBUG) {
    console.log("Middleware token:", token);
  }

  if (req.nextUrl.pathname.startsWith("/extract") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/extract/:path*"],
};
