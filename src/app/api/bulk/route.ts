import JSZip from "jszip";
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";
import { validateImage } from "@/lib/validation";
import { resizeImage, compressImage, convertImage, formatToExt } from "@/lib/image/processor";
import { logUsage } from "@/lib/prisma";
import { guard, errorResponse, num, fmt } from "@/lib/api";

export const runtime = "nodejs";

type Op = "resize" | "compress" | "convert";

export async function POST(req: Request) {
  const blocked = await guard(req);
  if (blocked) return blocked;

  try {
    const form = await req.formData();
    const files = form.getAll("files").filter((f): f is File => f instanceof File);

    if (files.length === 0) return errorResponse("No files uploaded.", 400);
    if (files.length > siteConfig.maxBulkFiles)
      return errorResponse(`Too many files. Max ${siteConfig.maxBulkFiles}.`, 413);

    const op = (form.get("op") as Op) ?? "compress";
    const zip = new JSZip();
    let totalIn = 0;
    let totalOut = 0;
    let processed = 0;
    const used = new Set<string>();

    for (const file of files) {
      const valid = await validateImage(file);
      if (!valid.ok) continue; // skip invalid files, keep the batch going
      totalIn += valid.buffer.byteLength;

      let result: { data: Buffer; format: "jpeg" | "png" | "webp" };
      if (op === "resize") {
        result = await resizeImage(valid.buffer, {
          width: num(form, "width"),
          height: num(form, "height"),
          percentage: num(form, "percentage"),
          format: fmt(form, "format"),
          quality: num(form, "quality"),
        });
      } else if (op === "convert") {
        result = await convertImage(valid.buffer, fmt(form, "format") ?? "webp", num(form, "quality") ?? 90);
      } else {
        const targetKB = num(form, "targetKB");
        result = await compressImage(valid.buffer, {
          quality: num(form, "quality"),
          targetBytes: targetKB ? targetKB * 1024 : undefined,
          format: fmt(form, "format"),
        });
      }

      totalOut += result.data.byteLength;
      processed += 1;

      const base = (file.name.replace(/\.[^.]+$/, "") || "image").slice(0, 60);
      let name = `${base}.${formatToExt[result.format]}`;
      let n = 1;
      while (used.has(name)) name = `${base}-${n++}.${formatToExt[result.format]}`;
      used.add(name);
      zip.file(name, result.data);
    }

    if (processed === 0) return errorResponse("No valid images to process.", 422);

    const archive = await zip.generateAsync({ type: "nodebuffer", compression: "DEFLATE" });
    void logUsage(`bulk:${op}`, totalIn, totalOut);

    return new NextResponse(new Uint8Array(archive), {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="imgkilat-${op}-${processed}-images.zip"`,
        "Content-Length": String(archive.byteLength),
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    console.error("[bulk]", e);
    return errorResponse("Failed to process images.", 500);
  }
}
