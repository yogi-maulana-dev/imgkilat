import { NextResponse } from "next/server";
import { rateLimit, clientIp } from "./rate-limit";
import { formatToMime, formatToExt, type OutputFormat } from "./image/processor";

/** Shared rate-limit guard for every processing route. */
export async function guard(req: Request): Promise<NextResponse | null> {
  const ip = clientIp(req);
  const rl = await rateLimit(ip);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }
  return null;
}

export function fileResponse(data: Buffer, format: OutputFormat, name = "image") {
  const ext = formatToExt[format];
  // Copy into a fresh ArrayBuffer so the Buffer can be GC'd immediately.
  const body = new Uint8Array(data);
  return new NextResponse(body, {
    headers: {
      "Content-Type": formatToMime[format],
      "Content-Disposition": `attachment; filename="${name}.${ext}"`,
      "Content-Length": String(data.byteLength),
      "Cache-Control": "no-store",
    },
  });
}

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function num(form: FormData, key: string): number | undefined {
  const v = form.get(key);
  if (v == null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

export function fmt(form: FormData, key: string): OutputFormat | undefined {
  const v = form.get(key);
  if (v === "jpeg" || v === "png" || v === "webp") return v;
  return undefined;
}
