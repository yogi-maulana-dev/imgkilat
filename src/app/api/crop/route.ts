import { validateImage } from "@/lib/validation";
import { cropImage } from "@/lib/image/processor";
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

    const { data, format } = await cropImage(valid.buffer, {
      left: num(form, "left") ?? 0,
      top: num(form, "top") ?? 0,
      width: num(form, "width") ?? 1,
      height: num(form, "height") ?? 1,
      format: fmt(form, "format"),
      quality: num(form, "quality"),
    });

    void logUsage("crop", valid.buffer.byteLength, data.byteLength);
    return fileResponse(data, format, "cropped");
  } catch (e) {
    console.error("[crop]", e);
    return errorResponse("Failed to process image.", 500);
  }
}
