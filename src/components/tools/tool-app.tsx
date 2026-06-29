"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Download, X, Lock, Unlock } from "lucide-react";
import { Dropzone } from "./dropzone";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label, Input, Select } from "@/components/ui/field";
import { formatBytes } from "@/lib/utils";
import type { ToolType } from "@/lib/tools";
import type { OutputFormat } from "@/lib/image/processor";
import type { Dictionary } from "@/i18n/dictionaries";

export interface ToolPreset {
  from?: OutputFormat;
  to?: OutputFormat;
  targetKB?: number;
  width?: number;
  height?: number;
  lockFormat?: boolean;
}

const endpoint: Record<Exclude<ToolType, "crop" | "bulk">, string> = {
  resize: "/api/resize",
  compress: "/api/compress",
  convert: "/api/convert",
};

export function ToolApp({
  type,
  preset = {},
  dict,
  dropzone,
}: {
  type: ToolType;
  preset?: ToolPreset;
  dict: Dictionary["tool"];
  dropzone: Dictionary["dropzone"];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 });

  const [width, setWidth] = useState(preset.width ? String(preset.width) : "");
  const [height, setHeight] = useState(preset.height ? String(preset.height) : "");
  const [lock, setLock] = useState(true);
  const [byPercent, setByPercent] = useState(false);
  const [percent, setPercent] = useState(100);

  const [compressMode, setCompressMode] = useState<"quality" | "target">(
    preset.targetKB ? "target" : "quality",
  );
  const [quality, setQuality] = useState(80);
  const [targetKB, setTargetKB] = useState(preset.targetKB ? String(preset.targetKB) : "100");

  const [format, setFormat] = useState<OutputFormat>(preset.to ?? "jpeg");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ url: string; size: number; name: string; w: number; h: number } | null>(null);
  const resultUrl = useRef<string>("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
      if (resultUrl.current) URL.revokeObjectURL(resultUrl.current);
    };
  }, [preview]);

  function onFiles(files: File[]) {
    const f = files[0];
    if (!f) return;
    setError("");
    setResult(null);
    setFile(f);
    if (!preset.to) {
      const detected = f.type.split("/")[1]?.replace("jpg", "jpeg");
      if (detected === "jpeg" || detected === "png" || detected === "webp") setFormat(detected);
    }
    const url = URL.createObjectURL(f);
    setPreview(url);
    const img = new window.Image();
    img.onload = () => {
      setDims({ w: img.naturalWidth, h: img.naturalHeight });
      if (type === "resize" && !preset.width && !preset.height) {
        setWidth(String(img.naturalWidth));
        setHeight(String(img.naturalHeight));
      }
    };
    img.src = url;
  }

  function onWidth(v: string) {
    setWidth(v);
    if (lock && dims.w) setHeight(v ? String(Math.round((Number(v) * dims.h) / dims.w)) : "");
  }
  function onHeight(v: string) {
    setHeight(v);
    if (lock && dims.h) setWidth(v ? String(Math.round((Number(v) * dims.w) / dims.h)) : "");
  }

  async function process() {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (type === "resize") {
        if (byPercent) fd.append("percentage", String(percent));
        else {
          if (width) fd.append("width", width);
          if (height) fd.append("height", height);
        }
        fd.append("fit", lock ? "inside" : "fill");
        fd.append("format", format);
        fd.append("quality", "92");
      } else if (type === "compress") {
        if (compressMode === "target") fd.append("targetKB", targetKB);
        else fd.append("quality", String(quality));
        fd.append("format", format);
      } else if (type === "convert") {
        fd.append("format", format);
        fd.append("quality", String(quality));
      }

      const res = await fetch(endpoint[type as keyof typeof endpoint], { method: "POST", body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? dict.error);
      }
      const blob = await res.blob();
      if (resultUrl.current) URL.revokeObjectURL(resultUrl.current);
      const url = URL.createObjectURL(blob);
      resultUrl.current = url;
      const ext = (res.headers.get("Content-Type") ?? "").split("/")[1]?.replace("jpeg", "jpg") ?? "img";
      // Read the produced dimensions so the result (incl. enlargements) is clearly confirmed.
      const outDims = await new Promise<{ w: number; h: number }>((resolve) => {
        const im = new window.Image();
        im.onload = () => resolve({ w: im.naturalWidth, h: im.naturalHeight });
        im.onerror = () => resolve({ w: 0, h: 0 });
        im.src = url;
      });
      setResult({ url, size: blob.size, name: `imgkilat-${type}.${ext}`, w: outDims.w, h: outDims.h });
    } catch (e) {
      setError(e instanceof Error ? e.message : dict.error);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setFile(null);
    setPreview("");
    setResult(null);
    setError("");
  }

  if (!file) {
    return (
      <div className="mx-auto max-w-2xl">
        <Dropzone onFiles={onFiles} label={dropzone.selectImage} t={dropzone} />
      </div>
    );
  }

  const formatLocked = preset.lockFormat ?? false;

  return (
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[1fr_320px]">
      <div className="relative flex min-h-[280px] items-center justify-center rounded-2xl border border-border bg-muted/40 p-4">
        <button
          onClick={reset}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-1.5 shadow hover:bg-background"
          aria-label={dict.remove}
        >
          <X className="h-4 w-4" />
        </button>
        {(result?.url || preview) && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={result?.url || preview}
            alt="Preview"
            className="max-h-[420px] max-w-full rounded-lg object-contain shadow"
          />
        )}
        <span className="absolute bottom-3 left-3 rounded-md bg-background/90 px-2 py-1 text-xs text-muted-foreground">
          {result ? `${result.w}×${result.h}px · ${formatBytes(result.size)}` : `${dims.w}×${dims.h}px · ${formatBytes(file.size)}`}
        </span>
      </div>

      <div className="space-y-5 rounded-2xl border border-border bg-card p-5">
        {type === "resize" && (
          <>
            <Tabs value={byPercent ? "percent" : "pixels"}>
              <TabsList className="w-full">
                <TabsTrigger value="pixels" className="flex-1" onClick={() => setByPercent(false)}>
                  {dict.pixels}
                </TabsTrigger>
                <TabsTrigger value="percent" className="flex-1" onClick={() => setByPercent(true)}>
                  {dict.percentage}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {byPercent ? (
              <div>
                <Label>
                  {dict.scale}: {percent}%
                </Label>
                <Slider className="mt-3" value={[percent]} min={1} max={200} step={1} onValueChange={(v) => setPercent(v[0])} />
              </div>
            ) : (
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label>{dict.width}</Label>
                  <Input type="number" value={width} onChange={(e) => onWidth(e.target.value)} className="mt-1.5" />
                </div>
                <button
                  onClick={() => setLock(!lock)}
                  className="mb-0.5 flex h-10 w-10 items-center justify-center rounded-lg border border-border hover:bg-muted"
                  aria-label="lock"
                >
                  {lock ? <Lock className="h-4 w-4 text-primary" /> : <Unlock className="h-4 w-4" />}
                </button>
                <div className="flex-1">
                  <Label>{dict.height}</Label>
                  <Input type="number" value={height} onChange={(e) => onHeight(e.target.value)} className="mt-1.5" />
                </div>
              </div>
            )}
          </>
        )}

        {type === "compress" && (
          <>
            <Tabs value={compressMode}>
              <TabsList className="w-full">
                <TabsTrigger value="quality" className="flex-1" onClick={() => setCompressMode("quality")}>
                  {dict.qualityMode}
                </TabsTrigger>
                <TabsTrigger value="target" className="flex-1" onClick={() => setCompressMode("target")}>
                  {dict.targetMode}
                </TabsTrigger>
              </TabsList>
            </Tabs>
            {compressMode === "quality" ? (
              <div>
                <Label>
                  {dict.quality}: {quality}%
                </Label>
                <Slider className="mt-3" value={[quality]} min={10} max={100} step={1} onValueChange={(v) => setQuality(v[0])} />
              </div>
            ) : (
              <div>
                <Label>{dict.targetSize}</Label>
                <Input type="number" value={targetKB} onChange={(e) => setTargetKB(e.target.value)} className="mt-1.5" />
              </div>
            )}
          </>
        )}

        {(type === "convert" || type === "compress" || type === "resize") && (
          <div>
            <Label>{dict.outputFormat}</Label>
            <Select value={format} disabled={formatLocked} onChange={(e) => setFormat(e.target.value as OutputFormat)} className="mt-1.5">
              <option value="jpeg">JPG</option>
              <option value="png">PNG</option>
              <option value="webp">WebP</option>
            </Select>
          </div>
        )}

        {type === "convert" && format !== "png" && (
          <div>
            <Label>
              {dict.quality}: {quality}%
            </Label>
            <Slider className="mt-3" value={[quality]} min={10} max={100} step={1} onValueChange={(v) => setQuality(v[0])} />
          </div>
        )}

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        {result ? (
          <div className="space-y-3">
            <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
              {dict.done} <strong>{result.w}×{result.h}px · {formatBytes(result.size)}</strong>{" "}
              {file.size > result.size && <span>(−{Math.round((1 - result.size / file.size) * 100)}%)</span>}
            </div>
            <Button asChild size="lg" className="w-full">
              <a href={result.url} download={result.name}>
                <Download className="h-4 w-4" /> {dict.download}
              </a>
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => setResult(null)}>
              {dict.adjust}
            </Button>
          </div>
        ) : (
          <Button size="lg" className="w-full" onClick={process} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? dict.processing : dict.process}
          </Button>
        )}
      </div>
    </div>
  );
}
