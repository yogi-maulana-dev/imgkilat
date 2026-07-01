import { siteConfig, type AcceptedMime } from "./site";

export type ValidationError = { ok: false; status: number; message: string };
export type ValidationOk = { ok: true; mime: AcceptedMime; buffer: Buffer };

/** Detect the real format from the file's magic bytes (source of truth). */
function detectMime(b: Buffer): AcceptedMime | null {
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "image/jpeg"; // JPG/JPEG
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "image/png";
  if (
    b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && // "RIFF"
    b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50 // "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

/**
 * Validate an uploaded image. We trust the actual file content (magic bytes)
 * rather than the declared MIME, so .jpeg / .jpg files — and files with a
 * missing or non-standard MIME type — are accepted as long as the bytes are a
 * real JPEG, PNG or WebP.
 */
export async function validateImage(
  file: File | null,
): Promise<ValidationError | ValidationOk> {
  if (!file) return { ok: false, status: 400, message: "No file uploaded." };

  if (file.size > siteConfig.maxFileSize) {
    return {
      ok: false,
      status: 413,
      message: `File too large. Max ${siteConfig.maxFileSize / 1024 / 1024} MB.`,
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const mime = detectMime(buffer);
  if (!mime) {
    return { ok: false, status: 415, message: "Unsupported or corrupt image. Use JPG, JPEG, PNG or WebP." };
  }

  return { ok: true, mime, buffer };
}
