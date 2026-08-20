import {
  BarChart3,
  BrainCircuit,
  Code,
  Compass,
  Palette,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

/**
 * career_paths.icon holds a lucide name. Mapped explicitly rather than
 * looked up dynamically so the bundle only carries the six we use.
 */
export const PATH_ICONS: Record<string, LucideIcon> = {
  code: Code,
  "brain-circuit": BrainCircuit,
  "bar-chart-3": BarChart3,
  "shield-check": ShieldCheck,
  palette: Palette,
  compass: Compass,
};

export function pathIcon(name: string): LucideIcon {
  return PATH_ICONS[name] ?? Compass;
}
