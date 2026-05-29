import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

const COOKIE_NAME = "aangan_admin_session";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;
    const jwtSecret = process.env.ADMIN_JWT_SECRET;

    // Guard: if env vars aren't configured, fail clearly
    if (!adminEmail || !adminHash || !jwtSecret) {
      console.error("[Auth] Admin env vars not configured — set ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_JWT_SECRET");
      return NextResponse.json(
        { error: "Admin panel is not configured. Contact the site owner." },
        { status: 500 }
      );
    }

    // Check email (case-insensitive)
    if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
      // Run bcrypt compare anyway to avoid timing-attack leaks
      await bcrypt.compare(password, adminHash);
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check password
    const match = await bcrypt.compare(password, adminHash);
    if (!match) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Sign 12-hour JWT
    const secret = new TextEncoder().encode(jwtSecret);
    const token = await new SignJWT({
      email: adminEmail,
      name: "Aangan Admin",
      role: "owner",
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("12h")
      .sign(secret);

    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return res;

  } catch (err) {
    console.error("[Auth] Login error:", err);
    return NextResponse.json({ error: "Server error. Try again." }, { status: 500 });
  }
}
