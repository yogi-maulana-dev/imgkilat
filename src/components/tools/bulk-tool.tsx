"use client";

import { useState } from "react";
import { Loader2, Download, Trash2, FileImage } from "lucide-react";
import { Dropzone } from "./dropzone";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label, Select } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { formatBytes } from "@/lib/utils";
import { siteConfig } from "@/lib/site";
import type { OutputFormat } from "@/lib/image/processor";
import type { Dictionary } from "@/i18n/dictionaries";

type Op = "resize" | "compress" | "convert";

export function BulkTool({
  dict,
  dropzone,
}: {
  dict: Dictionary["tool"];
  dropzone: Dictionary["dropzone"];
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [op, setOp] = useState<Op>("compress");
  const [percent, setPercent] = useState(50);
  const [quality, setQuality] = useState(70);
  const [format, setFormat] = useState<OutputFormat>("webp");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ url: string; size: number } | null>(null);

  function onFiles(incoming: File[]) {
    setResult(null);
    setError("");
    setFiles((prev) => [...prev, ...incoming].slice(0, siteConfig.maxBulkFiles));
  }

  async function process() {
    if (files.length === 0) return;
    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append("files", f));
      fd.append("op", op);
      if (op === "resize") fd.append("percentage", String(percent));
      if (op === "compress") fd.append("quality", String(quality));
      fd.append("format", format);

      const res = await fetch("/api/bulk", { method: "POST", body: fd });
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

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Dropzone onFiles={onFiles} multiple label={dropzone.selectImages} t={dropzone} />

      {files.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="font-semibold">
              {files.length} {dict.selected}
            </p>
            <Button variant="ghost" size="sm" onClick={() => setFiles([])}>
              <Trash2 className="h-4 w-4" /> {dict.clear}
            </Button>
          </div>
          <div className="mb-5 max-h-40 space-y-1.5 overflow-auto">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileImage className="h-4 w-4 shrink-0" />
                <span className="truncate">{f.name}</span>
                <span className="ml-auto shrink-0">{formatBytes(f.size)}</span>
              </div>
            ))}
          </div>

          <Tabs value={op}>
            <TabsList className="w-full">
              <TabsTrigger value="compress" className="flex-1" onClick={() => setOp("compress")}>
                {dict.compress}
              </TabsTrigger>
              <TabsTrigger value="resize" className="flex-1" onClick={() => setOp("resize")}>
                {dict.resize}
              </TabsTrigger>
              <TabsTrigger value="convert" className="flex-1" onClick={() => setOp("convert")}>
                {dict.convert}
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mt-4 space-y-4">
            {op === "resize" && (
              <div>
                <Label>
                  {dict.scale}: {percent}%
                </Label>
                <Slider className="mt-3" value={[percent]} min={1} max={100} step={1} onValueChange={(v) => setPercent(v[0])} />
              </div>
            )}
            {op === "compress" && (
              <div>
                <Label>
                  {dict.quality}: {quality}%
                </Label>
                <Slider className="mt-3" value={[quality]} min={10} max={100} step={1} onValueChange={(v) => setQuality(v[0])} />
              </div>
            )}
            <div>
              <Label>{dict.outputFormat}</Label>
              <Select value={format} onChange={(e) => setFormat(e.target.value as OutputFormat)} className="mt-1.5">
                <option value="jpeg">JPG / JPEG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
              </Select>
            </div>
          </div>

          {error && <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <div className="mt-5">
            {result ? (
              <div className="space-y-3">
                <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                  {dict.zipReady} · {formatBytes(result.size)}
                </div>
                <Button asChild size="lg" className="w-full">
                  <a href={result.url} download="imgkilat-images.zip">
                    <Download className="h-4 w-4" /> {dict.downloadZip}
                  </a>
                </Button>
              </div>
            ) : (
              <Button size="lg" className="w-full" onClick={process} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {loading ? dict.processing : dict.processN.replace("{n}", String(files.length))}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
