import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/admin-auth";
import { listNews, saveNews, deleteNews } from "@/lib/news";

export const runtime = "nodejs";

async function guard() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return null;
}

export async function GET() {
  const blocked = await guard();
  if (blocked) return blocked;
  return NextResponse.json(await listNews());
}

export async function POST(req: Request) {
  const blocked = await guard();
  if (blocked) return blocked;
  const body = await req.json().catch(() => ({}));
  if (!body.title || typeof body.title !== "string") {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }
  const item = await saveNews(body);
  return NextResponse.json(item);
}

export async function DELETE(req: Request) {
  const blocked = await guard();
  if (blocked) return blocked;
  const slug = new URL(req.url).searchParams.get("slug");
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });
  const ok = await deleteNews(slug);
  return NextResponse.json({ ok });
}
