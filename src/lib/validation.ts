import { siteConfig, type AcceptedMime } from "./site";

const MAGIC: Record<AcceptedMime, number[][]> = {
  "image/jpeg": [[0xff, 0xd8, 0xff]],
  "image/png": [[0x89, 0x50, 0x4e, 0x47]],
  "image/webp": [[0x52, 0x49, 0x46, 0x46]], // "RIFF" (WEBP at offset 8)
};

export type ValidationError = { ok: false; status: number; message: string };
export type ValidationOk = { ok: true; mime: AcceptedMime; buffer: Buffer };

/**
 * Validate an uploaded file: enforce accepted MIME, size limit, and verify the
 * real file signature (magic bytes) so a renamed/forged extension is rejected.
 */
export async function validateImage(
  file: File | null,
): Promise<ValidationError | ValidationOk> {
  if (!file) return { ok: false, status: 400, message: "No file uploaded." };

  if (!siteConfig.acceptedMime.includes(file.type as AcceptedMime)) {
    return { ok: false, status: 415, message: `Unsupported type: ${file.type || "unknown"}.` };
  }

  if (file.size > siteConfig.maxFileSize) {
    return {
      ok: false,
      status: 413,
      message: `File too large. Max ${siteConfig.maxFileSize / 1024 / 1024} MB.`,
    };
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const mime = file.type as AcceptedMime;
  const signatures = MAGIC[mime];
  const valid = signatures.some((sig) => sig.every((byte, i) => buffer[i] === byte));

  if (!valid) {
    return { ok: false, status: 422, message: "File content does not match its type." };
  }

  return { ok: true, mime, buffer };
}
