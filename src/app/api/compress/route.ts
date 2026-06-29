import { validateImage } from "@/lib/validation";
import { compressImage } from "@/lib/image/processor";
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

    const targetKB = num(form, "targetKB");
    const { data, format } = await compressImage(valid.buffer, {
      quality: num(form, "quality"),
      targetBytes: targetKB ? targetKB * 1024 : undefined,
      format: fmt(form, "format"),
    });

    void logUsage("compress", valid.buffer.byteLength, data.byteLength);
    return fileResponse(data, format, "compressed");
  } catch (e) {
    console.error("[compress]", e);
    return errorResponse("Failed to process image.", 500);
  }
}
