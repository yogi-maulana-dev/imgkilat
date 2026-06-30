import { NextResponse } from "next/server";
import { makeToken, ADMIN_COOKIE, adminConfigured } from "@/lib/admin-auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json({ error: "Admin is not configured (set ADMIN_PASSWORD)." }, { status: 503 });
  }
  let password = "";
  try {
    password = (await req.json()).password ?? "";
  } catch {
    /* ignore */
  }
  const token = makeToken(password);
  if (!token) return NextResponse.json({ error: "Wrong password." }, { status: 401 });

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
