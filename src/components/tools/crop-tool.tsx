"use client";

import { useRef, useState } from "react";
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { Loader2, Download, X } from "lucide-react";
import { Dropzone } from "./dropzone";
import { Button } from "@/components/ui/button";
import { formatBytes } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";

export function CropTool({
  dict,
  dropzone,
}: {
  dict: Dictionary["tool"];
  dropzone: Dictionary["dropzone"];
}) {
  const ratios: { label: string; value: number | undefined }[] = [
    { label: dict.free, value: undefined },
    { label: "1:1", value: 1 },
    { label: "4:3", value: 4 / 3 },
    { label: "16:9", value: 16 / 9 },
  ];

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [crop, setCrop] = useState<Crop>();
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  function onFiles(files: File[]) {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setResult(null);
    setError("");
    setPreview(URL.createObjectURL(f));
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    setCrop(
      centerCrop(makeAspectCrop({ unit: "%", width: 80 }, aspect ?? width / height, width, height), width, height),
    );
  }

  function applyAspect(a: number | undefined) {
    setAspect(a);
    const img = imgRef.current;
    if (img) {
      setCrop(
        centerCrop(
          makeAspectCrop({ unit: "%", width: 80 }, a ?? img.width / img.height, img.width, img.height),
          img.width,
          img.height,
        ),
      );
    }
  }

  async function process() {
    const img = imgRef.current;
    if (!file || !img || !crop?.width) return;
    setLoading(true);
    setError("");
    try {
      const scaleX = img.naturalWidth / img.width;
      const scaleY = img.naturalHeight / img.height;
      const px =
        crop.unit === "%"
          ? {
              x: (crop.x / 100) * img.width,
              y: (crop.y / 100) * img.height,
              w: (crop.width / 100) * img.width,
              h: (crop.height / 100) * img.height,
            }
          : { x: crop.x, y: crop.y, w: crop.width, h: crop.height };

      const fd = new FormData();
      fd.append("file", file);
      fd.append("left", String(px.x * scaleX));
      fd.append("top", String(px.y * scaleY));
      fd.append("width", String(px.w * scaleX));
      fd.append("height", String(px.h * scaleY));

      const res = await fetch("/api/crop", { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? dict.error);
      }
      const blob = await res.blob();
      setResult({ url: URL.createObjectURL(blob), size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : dict.error);
    } finally {
      setLoading(false);
    }
  }

  if (!file) {
    return (
      <div className="mx-auto max-w-2xl">
        <Dropzone onFiles={onFiles} label={dropzone.selectImage} t={dropzone} />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[1fr_280px]">
      <div className="relative flex items-center justify-center rounded-2xl border border-border bg-muted/40 p-4">
        <button
          onClick={() => setFile(null)}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-1.5 shadow"
          aria-label={dict.remove}
        >
          <X className="h-4 w-4" />
        </button>
        <ReactCrop crop={crop} onChange={(_, pc) => setCrop(pc)} aspect={aspect}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img ref={imgRef} src={preview} alt="Crop" onLoad={onImageLoad} className="max-h-[460px]" />
        </ReactCrop>
      </div>

      <div className="space-y-5 rounded-2xl border border-border bg-card p-5">
        <div>
          <p className="mb-2 text-sm font-medium">{dict.aspectRatio}</p>
          <div className="grid grid-cols-4 gap-2">
            {ratios.map((r) => (
              <button
                key={r.label}
                onClick={() => applyAspect(r.value)}
                className={`rounded-lg border px-2 py-2 text-sm font-medium transition ${
                  aspect === r.value ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        {result ? (
          <div className="space-y-3">
            <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
              {dict.cropped} · {formatBytes(result.size)}
            </div>
            <Button asChild size="lg" className="w-full">
              <a href={result.url} download="imgkilat-cropped.png">
                <Download className="h-4 w-4" /> {dict.download}
              </a>
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setResult(null)}>
              {dict.cropAgain}
            </Button>
          </div>
        ) : (
          <Button size="lg" className="w-full" onClick={process} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? dict.cropping : dict.crop}
          </Button>
        )}
      </div>
    </div>
  );
}
