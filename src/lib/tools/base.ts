import type { ToolBase } from "./index";

// Language-independent definitions. Localized copy lives in content.en.ts /
// content.id.ts keyed by slug. Listing order here drives nav/grid/footer order.
export const bases: ToolBase[] = [
  { slug: "resize-image", type: "resize", icon: "Scaling", related: ["compress-image", "resize-image-to-100kb", "passport-photo-resizer", "crop-image"] },
  { slug: "compress-image", type: "compress", icon: "Minimize2", related: ["resize-image-to-100kb", "resize-image", "jpg-to-webp", "convert-image"] },
  { slug: "resize-image-to-100kb", type: "compress", icon: "FileDown", preset: { targetKB: 100 }, related: ["compress-image", "passport-photo-resizer", "resize-image", "convert-image"] },
  { slug: "passport-photo-resizer", type: "resize", icon: "IdCard", preset: { width: 413, height: 531 }, related: ["pas-foto-cpns", "resize-image-to-100kb", "resize-image", "crop-image"] },
  { slug: "pas-foto-cpns", type: "cpns", icon: "IdCard", related: ["passport-photo-resizer", "resize-image-to-100kb", "compress-image", "crop-image"] },
  { slug: "jpg-to-png", type: "convert", icon: "RefreshCw", preset: { from: "jpeg", to: "png", lockFormat: true }, related: ["png-to-jpg", "png-to-webp", "convert-image", "compress-image"] },
  { slug: "png-to-jpg", type: "convert", icon: "RefreshCw", preset: { from: "png", to: "jpeg", lockFormat: true }, related: ["jpg-to-png", "jpg-to-webp", "compress-image", "convert-image"] },
  { slug: "png-to-webp", type: "convert", icon: "RefreshCw", preset: { from: "png", to: "webp", lockFormat: true }, related: ["jpg-to-webp", "webp-to-png", "compress-image", "convert-image"] },
  { slug: "jpg-to-webp", type: "convert", icon: "RefreshCw", preset: { from: "jpeg", to: "webp", lockFormat: true }, related: ["png-to-webp", "webp-to-jpg", "compress-image", "convert-image"] },
  { slug: "webp-to-jpg", type: "convert", icon: "RefreshCw", preset: { from: "webp", to: "jpeg", lockFormat: true }, related: ["webp-to-png", "jpg-to-webp", "compress-image", "convert-image"] },
  { slug: "webp-to-png", type: "convert", icon: "RefreshCw", preset: { from: "webp", to: "png", lockFormat: true }, related: ["webp-to-jpg", "png-to-webp", "convert-image", "compress-image"] },
  { slug: "convert-image", type: "convert", icon: "RefreshCw", related: ["jpg-to-png", "png-to-webp", "webp-to-jpg", "compress-image"] },
  { slug: "crop-image", type: "crop", icon: "Crop", related: ["resize-image", "passport-photo-resizer", "compress-image", "convert-image"] },
  { slug: "bulk-image-resizer", type: "bulk", icon: "Layers", related: ["resize-image", "compress-image", "convert-image", "crop-image"] },
];
