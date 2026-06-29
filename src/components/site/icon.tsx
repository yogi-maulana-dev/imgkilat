import {
  Scaling,
  Minimize2,
  FileDown,
  IdCard,
  RefreshCw,
  Crop,
  Layers,
  ImageIcon,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Scaling,
  Minimize2,
  FileDown,
  IdCard,
  RefreshCw,
  Crop,
  Layers,
  ImageIcon,
};

export function ToolIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? ImageIcon;
  return <Icon className={className} />;
}
