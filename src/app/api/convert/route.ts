import { validateImage } from "@/lib/validation";
import { convertImage } from "@/lib/image/processor";
import { logUsage } from "@/lib/prisma";
import { guard, fileResponse, errorResponse, num, fmt } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  try {
    const form = await req.formData();
    const valid = await validateImage(form.get("file") as File | null);
    if (!valid.ok) return errorResponse(valid.message, valid.status);

    const target = fmt(form, "format") ?? "png";
    const { data, format } = await convertImage(valid.buffer, target, num(form, "quality") ?? 90);

    void logUsage("convert", valid.buffer.byteLength, data.byteLength);
    return fileResponse(data, format, "converted");
  } catch (e) {
    console.error("[convert]", e);
    return errorResponse("Failed to process image.", 500);
  }
}
