import { validateImage } from "@/lib/validation";
import { resizeImage } from "@/lib/image/processor";
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

    const { data, format } = await resizeImage(valid.buffer, {
      width: num(form, "width"),
      height: num(form, "height"),
      percentage: num(form, "percentage"),
      format: fmt(form, "format"),
      quality: num(form, "quality"),
      fit: (form.get("fit") as "inside" | "fill" | "cover") ?? "inside",
    });

    void logUsage("resize", valid.buffer.byteLength, data.byteLength);
    return fileResponse(data, format, "resized");
  } catch (e) {
    console.error("[resize]", e);
    return errorResponse("Failed to process image.", 500);
  }
}
