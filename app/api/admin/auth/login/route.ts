import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import fs from "fs";
import path from "path";

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? "aangan-admin-secret-change-in-production"
);
const COOKIE_NAME = "aangan_admin_session";

interface AdminUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
}

function loadUsers(): AdminUser[] {
  try {
    const p = path.join(process.cwd(), "lib", "admin-users.json");
    return JSON.parse(fs.readFileSync(p, "utf-8")) as AdminUser[];
  } catch {
    return [];
  }
}

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, password } = body;
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const users = loadUsers();
  const user = users.find((u) => u.email === email);

  // Always run bcrypt.compare even on miss to prevent timing attacks
  const hash = user?.password ?? "$2b$10$invalidhashpadding000000000000000000000000000000000000";
  const match = await bcrypt.compare(password, hash);

  if (!user || !match) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(JWT_SECRET);

  const res = NextResponse.json({ success: true, name: user.name });
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
