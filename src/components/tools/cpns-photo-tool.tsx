"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, Download, X, Share2 } from "lucide-react";
import { Dropzone } from "./dropzone";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";

type Outfit = "none" | "suit" | "shirt";

const SIZES: Record<string, [number, number]> = {
  "3×4": [354, 472],
  "4×6": [472, 709],
  "2×2 in": [600, 600],
};

const COLORS: { key: "red" | "blue" | "white"; hex: string }[] = [
  { key: "red", hex: "#c1272d" },
  { key: "blue", hex: "#1d4ed8" },
  { key: "white", hex: "#ffffff" },
];

export function CpnsPhotoTool({
  dict,
  common,
  dropzone,
  shareMessage,
  shareUrl,
}: {
  dict: Dictionary["cpns"];
  common: Dictionary["tool"];
  dropzone: Dictionary["dropzone"];
  shareMessage: string;
  shareUrl: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [fg, setFg] = useState<HTMLImageElement | null>(null);
  const [removing, setRemoving] = useState(false);
  const [error, setError] = useState("");
  const [downloading, setDownloading] = useState(false);

  const [color, setColor] = useState<"red" | "blue" | "white">("red");
  const [sizeKey, setSizeKey] = useState<keyof typeof SIZES>("3×4");
  const [outfit, setOutfit] = useState<Outfit>("none");
  const [zoom, setZoom] = useState(1);
  const [panY, setPanY] = useState(0);
  const [outfitScale, setOutfitScale] = useState(1.05);
  const [outfitY, setOutfitY] = useState(0.66);
  const [compress200, setCompress200] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fgUrl = useRef<string>("");

  useEffect(
    () => () => {
      if (fgUrl.current) URL.revokeObjectURL(fgUrl.current);
    },
    [],
  );

  async function onFiles(files: File[]) {
    const f = files[0];
    if (!f) return;
    setFile(f);
    setFg(null);
    setError("");
    setRemoving(true);
    try {
      const { removeBackground } = await import("@imgly/background-removal");
      const blob = await removeBackground(f);
      if (fgUrl.current) URL.revokeObjectURL(fgUrl.current);
      const url = URL.createObjectURL(blob);
      fgUrl.current = url;
      const img = new window.Image();
      img.onload = () => {
        setFg(img);
        setRemoving(false);
      };
      img.onerror = () => {
        setError(common.error);
        setRemoving(false);
      };
      img.src = url;
    } catch (e) {
      setError(e instanceof Error ? e.message : common.error);
      setRemoving(false);
    }
  }

  // Re-render the preview whenever any setting changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fg) return;
    const [w, h] = SIZES[sizeKey];
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (ctx) render(ctx, w, h, fg);
  }, [fg, color, sizeKey, outfit, zoom, panY, outfitScale, outfitY]);

  function render(ctx: CanvasRenderingContext2D, w: number, h: number, image: HTMLImageElement) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = COLORS.find((c) => c.key === color)!.hex;
    ctx.fillRect(0, 0, w, h);

    // Cover-fit the cut-out subject, with zoom + vertical pan.
    const base = Math.max(w / image.naturalWidth, h / image.naturalHeight);
    const scale = base * zoom;
    const dw = image.naturalWidth * scale;
    const dh = image.naturalHeight * scale;
    const dx = (w - dw) / 2;
    const dy = (h - dh) / 2 + panY * h;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(image, dx, dy, dw, dh);

    if (outfit !== "none") {
      const ow = w * outfitScale;
      const ox = (w - ow) / 2;
      const oTop = h * outfitY;
      drawOutfit(ctx, outfit, ox, oTop, ow, h - oTop);
    }
  }

  async function buildBlob(): Promise<Blob> {
    const [w, h] = SIZES[sizeKey];
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const ctx = off.getContext("2d")!;
    render(ctx, w, h, fg!);
    return toBlob(off, compress200 ? 200 * 1024 : 0);
  }

  async function download() {
    if (!fg) return;
    setDownloading(true);
    try {
      const blob = await buildBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `pas-foto-cpns-${sizeKey.replace(/\s|×/g, "")}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (e) {
      setError(e instanceof Error ? e.message : common.error);
    } finally {
      setDownloading(false);
    }
  }

  async function share() {
    if (!fg) return;
    try {
      const blob = await buildBlob();
      const file = new File([blob], "pas-foto-cpns.jpg", { type: "image/jpeg" });
      const nav = navigator as Navigator & { canShare?: (d: unknown) => boolean };
      if (nav.canShare && nav.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: `${shareMessage}\n${shareUrl}` });
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${shareMessage}\n${shareUrl}`)}`, "_blank");
      }
    } catch {
      /* user dismissed or share unsupported */
    }
  }

  function reset() {
    setFile(null);
    setFg(null);
    setError("");
  }

  if (!file) {
    return (
      <div className="mx-auto max-w-2xl">
        <Dropzone onFiles={onFiles} label={dropzone.selectImage} t={dropzone} />
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-[1fr_320px]">
      {/* Preview */}
      <div className="relative flex min-h-[320px] items-center justify-center rounded-2xl border border-border bg-muted/40 p-4">
        <button
          onClick={reset}
          className="absolute right-3 top-3 z-10 rounded-full bg-background/90 p-1.5 shadow hover:bg-background"
          aria-label={common.remove}
        >
          <X className="h-4 w-4" />
        </button>
        {removing ? (
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm">{dict.removingBg}</p>
          </div>
        ) : (
          <canvas ref={canvasRef} className="max-h-[460px] max-w-full rounded-lg shadow" />
        )}
      </div>

      {/* Controls */}
      <div className="space-y-5 rounded-2xl border border-border bg-card p-5">
        <div>
          <Label>{dict.background}</Label>
          <div className="mt-2 flex gap-2">
            {COLORS.map((c) => (
              <button
                key={c.key}
                onClick={() => setColor(c.key)}
                title={dict[c.key]}
                className={cn(
                  "h-9 flex-1 rounded-lg border-2",
                  color === c.key ? "border-primary" : "border-border",
                )}
                style={{ background: c.hex }}
                aria-label={dict[c.key]}
              />
            ))}
          </div>
        </div>

        <Chips
          label={dict.size}
          options={Object.keys(SIZES)}
          value={sizeKey}
          onChange={(v) => setSizeKey(v as keyof typeof SIZES)}
        />

        <Chips
          label={dict.outfit}
          options={["none", "suit", "shirt"]}
          labels={[dict.outfitNone, dict.outfitSuit, dict.outfitShirt]}
          value={outfit}
          onChange={(v) => setOutfit(v as Outfit)}
        />

        <div>
          <Label>
            {dict.zoom}: {zoom.toFixed(2)}×
          </Label>
          <Slider className="mt-3" value={[zoom]} min={1} max={2} step={0.01} onValueChange={(v) => setZoom(v[0])} />
        </div>
        <div>
          <Label>{dict.panY}</Label>
          <Slider className="mt-3" value={[panY]} min={-0.4} max={0.4} step={0.01} onValueChange={(v) => setPanY(v[0])} />
        </div>

        {outfit !== "none" && (
          <>
            <div>
              <Label>{dict.outfitSize}</Label>
              <Slider className="mt-3" value={[outfitScale]} min={0.7} max={1.8} step={0.01} onValueChange={(v) => setOutfitScale(v[0])} />
            </div>
            <div>
              <Label>{dict.outfitPos}</Label>
              <Slider className="mt-3" value={[outfitY]} min={0.45} max={0.9} step={0.01} onValueChange={(v) => setOutfitY(v[0])} />
            </div>
          </>
        )}

        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={compress200} onChange={(e) => setCompress200(e.target.checked)} />
          {dict.compress200}
        </label>

        {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        <Button size="lg" className="w-full" onClick={download} disabled={removing || downloading || !fg}>
          {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {dict.download}
        </Button>
        <button
          onClick={share}
          disabled={removing || !fg}
          className="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
          style={{ background: "#25D366" }}
        >
          <Share2 className="h-4 w-4" /> {dict.share}
        </button>
        <Button variant="ghost" className="w-full" onClick={reset}>
          {dict.changePhoto}
        </Button>
      </div>
    </div>
  );
}

function Chips({
  label,
  options,
  labels,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  labels?: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-lg border px-3 py-1.5 text-sm font-medium transition",
              value === opt ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted",
            )}
          >
            {labels ? labels[i] : opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function toBlob(canvas: HTMLCanvasElement, target: number): Promise<Blob> {
  const make = (q: number) =>
    new Promise<Blob>((resolve) => canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", q));
  if (!target) return make(0.92);
  return (async () => {
    let best = await make(0.92);
    if (best.size <= target) return best;
    for (let q = 0.85; q >= 0.3; q -= 0.07) {
      const b = await make(q);
      best = b;
      if (b.size <= target) return b;
    }
    return best;
  })();
}

/** Stylised suit / shirt overlay drawn on the canvas (template, not AI). */
function drawOutfit(ctx: CanvasRenderingContext2D, kind: Outfit, x: number, y: number, w: number, h: number) {
  const cx = x + w / 2;
  ctx.save();

  if (kind === "suit") {
    // Jacket
    ctx.fillStyle = "#1f2937";
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + h * 0.12);
    ctx.lineTo(cx, y + h * 0.62);
    ctx.lineTo(x + w, y + h * 0.12);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();
    // Shirt collar (white V)
    ctx.fillStyle = "#f8fafc";
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.17, y + h * 0.05);
    ctx.lineTo(cx, y + h * 0.55);
    ctx.lineTo(cx + w * 0.17, y + h * 0.05);
    ctx.closePath();
    ctx.fill();
    // Tie
    ctx.fillStyle = "#374151";
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.05, y + h * 0.1);
    ctx.lineTo(cx + w * 0.05, y + h * 0.1);
    ctx.lineTo(cx + w * 0.075, y + h * 0.6);
    ctx.lineTo(cx - w * 0.075, y + h * 0.6);
    ctx.closePath();
    ctx.fill();
  } else if (kind === "shirt") {
    // Shirt body
    ctx.fillStyle = "#eef2f7";
    ctx.beginPath();
    ctx.moveTo(x, y + h);
    ctx.lineTo(x, y + h * 0.14);
    ctx.lineTo(cx, y + h * 0.5);
    ctx.lineTo(x + w, y + h * 0.14);
    ctx.lineTo(x + w, y + h);
    ctx.closePath();
    ctx.fill();
    // Collar
    ctx.strokeStyle = "#cbd5e1";
    ctx.lineWidth = Math.max(2, w * 0.012);
    ctx.beginPath();
    ctx.moveTo(cx, y + h * 0.5);
    ctx.lineTo(cx - w * 0.16, y + h * 0.08);
    ctx.moveTo(cx, y + h * 0.5);
    ctx.lineTo(cx + w * 0.16, y + h * 0.08);
    ctx.stroke();
    // Buttons
    ctx.fillStyle = "#94a3b8";
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(cx, y + h * (0.55 + i * 0.13), Math.max(2, w * 0.012), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}
