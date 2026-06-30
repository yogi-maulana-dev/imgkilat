import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "imgwus_admin";

/** The token a valid session cookie must contain. Null when admin isn't configured. */
function expectedToken(): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  const secret = process.env.ADMIN_SECRET ?? "imgwus-admin-secret";
  return crypto.createHmac("sha256", secret).update(pw).digest("hex");
}

/** Returns a session token if the password is correct, else null. */
export function makeToken(password: string): string | null {
  const pw = process.env.ADMIN_PASSWORD;
  if (!pw) return null;
  // constant-time compare
  const a = Buffer.from(password);
  const b = Buffer.from(pw);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  return expectedToken();
}

export async function isAuthed(): Promise<boolean> {
  const exp = expectedToken();
  if (!exp) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === exp;
}

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}
