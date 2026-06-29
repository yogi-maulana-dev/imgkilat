"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";
import type { Dictionary } from "@/i18n/dictionaries";

export function Dropzone({
  onFiles,
  multiple = false,
  label,
  t,
}: {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  label: string;
  t: Dictionary["dropzone"];
}) {
  const onDrop = useCallback((accepted: File[]) => onFiles(accepted), [onFiles]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxSize: siteConfig.maxFileSize,
  });

  const formats =
    (multiple ? t.upTo.replace("{n}", String(siteConfig.maxBulkFiles)) : "") +
    t.formats.replace("{mb}", String(siteConfig.maxFileSize / 1024 / 1024));

  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border bg-muted/30 px-6 py-14 text-center transition",
        isDragActive && "border-primary bg-primary/5",
      )}
    >
      <input {...getInputProps()} />
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
        <UploadCloud className="h-7 w-7" />
      </div>
      <p className="mt-4 text-lg font-semibold">{isDragActive ? t.dropHere : t.dragDrop}</p>
      <p className="mt-1 text-sm text-muted-foreground">{formats}</p>
      <span className="mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
        {label}
      </span>
    </div>
  );
}
