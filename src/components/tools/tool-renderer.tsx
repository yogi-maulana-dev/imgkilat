import { ToolApp, type ToolPreset } from "./tool-app";
import { CropTool } from "./crop-tool";
import { BulkTool } from "./bulk-tool";
import { CpnsPhotoTool } from "./cpns-photo-tool";
import type { ToolType } from "@/lib/tools";
import type { Dictionary } from "@/i18n/dictionaries";

export function ToolRenderer({
  type,
  preset,
  dict,
  dropzone,
  cpns,
  shareMessage,
  shareUrl,
}: {
  type: ToolType;
  preset?: ToolPreset;
  dict: Dictionary["tool"];
  dropzone: Dictionary["dropzone"];
  cpns: Dictionary["cpns"];
  shareMessage: string;
  shareUrl: string;
}) {
  if (type === "crop") return <CropTool dict={dict} dropzone={dropzone} />;
  if (type === "bulk") return <BulkTool dict={dict} dropzone={dropzone} />;
  if (type === "cpns")
    return (
      <CpnsPhotoTool dict={cpns} common={dict} dropzone={dropzone} shareMessage={shareMessage} shareUrl={shareUrl} />
    );
  return <ToolApp type={type} preset={preset} dict={dict} dropzone={dropzone} />;
}
