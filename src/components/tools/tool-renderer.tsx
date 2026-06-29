import { ToolApp, type ToolPreset } from "./tool-app";
import { CropTool } from "./crop-tool";
import { BulkTool } from "./bulk-tool";
import type { ToolType } from "@/lib/tools";
import type { Dictionary } from "@/i18n/dictionaries";

export function ToolRenderer({
  type,
  preset,
  dict,
  dropzone,
}: {
  type: ToolType;
  preset?: ToolPreset;
  dict: Dictionary["tool"];
  dropzone: Dictionary["dropzone"];
}) {
  if (type === "crop") return <CropTool dict={dict} dropzone={dropzone} />;
  if (type === "bulk") return <BulkTool dict={dict} dropzone={dropzone} />;
  return <ToolApp type={type} preset={preset} dict={dict} dropzone={dropzone} />;
}
