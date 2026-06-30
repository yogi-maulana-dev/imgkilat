import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";

export const runtime = "nodejs";

const ALLOWED: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "No file" }, { status: 400 });

  const ext = ALLOWED[file.type];
  if (!ext) return NextResponse.json({ error: "Unsupported image type" }, { status: 415 });
  if (file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "Max 8 MB" }, { status: 413 });

  const base = (file.name.replace(/\.[^.]+$/, "") || "img")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  const name = `${Date.now()}-${base || "img"}.${ext}`;

  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()));

  return NextResponse.json({ url: `/uploads/${name}` });
}
