import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin/* routes (not /admin/login itself)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = req.cookies.get("aangan_admin_session")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    const jwtSecret = process.env.ADMIN_JWT_SECRET;
    if (!jwtSecret) {
      // Misconfigured — bounce to login, don't expose the admin panel
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(jwtSecret));
      return NextResponse.next();
    } catch {
      // Expired or invalid token — clear cookie and redirect
      const res = NextResponse.redirect(new URL("/admin/login", req.url));
      res.cookies.delete("aangan_admin_session");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
