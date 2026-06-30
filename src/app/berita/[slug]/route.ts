import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Serves the admin-generated static article file
// public/berita/<slug>/index.html at the clean URL /berita/<slug>.
export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const safe = slug.replace(/[^a-z0-9-]/gi, "");
  const file = path.join(process.cwd(), "public", "berita", safe, "index.html");
  try {
    const html = await fs.readFile(file, "utf8");
    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-cache" },
    });
  } catch {
    return new Response("Not found", { status: 404, headers: { "Content-Type": "text/plain" } });
  }
}
