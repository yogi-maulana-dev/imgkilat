export const siteConfig = {
  name: "ImgWus",
  tagline: "Resize, Compress & Convert Images Online",
  description:
    "Free online image tools to resize, compress, convert and crop your JPG, PNG and WebP images. Fast, private and processed securely — no signup required.",
  // Change this to your production domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://imgwus.com",
  locale: "en_US",
  twitter: "@imgkilat",
  // Hard limits used across UI + API for validation.
  maxFileSize: 20 * 1024 * 1024, // 20 MB per file
  maxBulkFiles: 30,
  acceptedMime: ["image/jpeg", "image/png", "image/webp"] as const,
};

export type AcceptedMime = (typeof siteConfig.acceptedMime)[number];
