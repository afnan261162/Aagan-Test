import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

/**
 * Call at the top of every protected API route handler.
 * Returns a 401 / 500 NextResponse if unauthorized, or null if auth passed.
 */
export async function requireAdmin(req: NextRequest): Promise<NextResponse | null> {
  const token = req.cookies.get("aangan_admin_session")?.value;
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const jwtSecret = process.env.ADMIN_JWT_SECRET;
  if (!jwtSecret) {
    console.error("[Auth] ADMIN_JWT_SECRET env var is not set");
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(jwtSecret));
    return null; // ← auth passed, proceed
  } catch {
    return NextResponse.json(
      { error: "Session expired — please log in again" },
      { status: 401 }
    );
  }
}
