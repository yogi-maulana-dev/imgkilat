import sharp, { type Sharp, type FitEnum } from "sharp";

export type OutputFormat = "jpeg" | "png" | "webp";

export const formatToMime: Record<OutputFormat, string> = {
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

export const formatToExt: Record<OutputFormat, string> = {
  jpeg: "jpg",
  png: "png",
  webp: "webp",
};

function encode(pipeline: Sharp, format: OutputFormat, quality = 80) {
  switch (format) {
    case "jpeg":
      return pipeline.jpeg({ quality, mozjpeg: true });
    case "webp":
      return pipeline.webp({ quality });
    case "png":
      // PNG quality maps to compression effort + palette quantization.
      return pipeline.png({ compressionLevel: 9, quality, palette: quality < 100 });
  }
}

export interface ResizeOptions {
  width?: number;
  height?: number;
  percentage?: number;
  fit?: keyof FitEnum;
  format?: OutputFormat;
  quality?: number;
}

export async function resizeImage(input: Buffer, opts: ResizeOptions) {
  const meta = await sharp(input).metadata();
  let { width, height } = opts;

  if (opts.percentage && meta.width && meta.height) {
    width = Math.max(1, Math.round((meta.width * opts.percentage) / 100));
    height = Math.max(1, Math.round((meta.height * opts.percentage) / 100));
  }

  const format = opts.format ?? (meta.format as OutputFormat) ?? "jpeg";
  let pipeline = sharp(input).rotate().resize({
    width: width || undefined,
    height: height || undefined,
    fit: opts.fit ?? "inside",
    withoutEnlargement: false,
  });
  pipeline = encode(pipeline, format, opts.quality ?? 90);
  return { data: await pipeline.toBuffer(), format };
}

export interface CompressOptions {
  quality?: number;
  targetBytes?: number;
  format?: OutputFormat;
}

export async function compressImage(input: Buffer, opts: CompressOptions) {
  const meta = await sharp(input).metadata();
  const format = opts.format ?? (meta.format as OutputFormat) ?? "jpeg";

  // Target-size mode.
  if (opts.targetBytes) {
    const target = opts.targetBytes;

    // 1) Quality search at full resolution.
    const smallest = await encode(sharp(input).rotate(), format, 10).toBuffer();
    if (smallest.byteLength <= target) {
      let best = smallest;
      let lo = 10;
      let hi = 95;
      for (let i = 0; i < 7; i++) {
        const mid = Math.round((lo + hi) / 2);
        const out = await encode(sharp(input).rotate(), format, mid).toBuffer();
        if (out.byteLength > target) {
          hi = mid - 1;
        } else {
          best = out;
          lo = mid + 1;
        }
      }
      return { data: best, format };
    }

    // 2) Still too big at lowest quality → progressively downscale until it fits.
    const w0 = meta.width ?? 0;
    let result = smallest;
    let factor = 1;
    while (result.byteLength > target && factor > 0.1) {
      factor *= 0.85;
      const width = Math.max(64, Math.round((w0 || 1000) * factor));
      result = await encode(sharp(input).rotate().resize({ width }), format, 10).toBuffer();
      if (width <= 64) break;
    }
    return { data: result, format };
  }

  const data = await encode(sharp(input).rotate(), format, opts.quality ?? 70).toBuffer();
  return { data, format };
}

export async function convertImage(input: Buffer, format: OutputFormat, quality = 90) {
  const data = await encode(sharp(input).rotate(), format, quality).toBuffer();
  return { data, format };
}

export interface CropOptions {
  left: number;
  top: number;
  width: number;
  height: number;
  format?: OutputFormat;
  quality?: number;
}

export async function cropImage(input: Buffer, opts: CropOptions) {
  const meta = await sharp(input).metadata();
  const format = opts.format ?? (meta.format as OutputFormat) ?? "jpeg";
  let pipeline = sharp(input)
    .rotate()
    .extract({
      left: Math.max(0, Math.round(opts.left)),
      top: Math.max(0, Math.round(opts.top)),
      width: Math.max(1, Math.round(opts.width)),
      height: Math.max(1, Math.round(opts.height)),
    });
  pipeline = encode(pipeline, format, opts.quality ?? 90);
  return { data: await pipeline.toBuffer(), format };
}

export async function getMetadata(input: Buffer) {
  const m = await sharp(input).metadata();
  return { width: m.width ?? 0, height: m.height ?? 0, format: m.format ?? "" };
}
