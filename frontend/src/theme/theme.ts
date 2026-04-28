import type { AppTheme, ResolvedThemeMode } from "@/types";

import { themeColorsByMode } from "./colors";
import { radius, spacing, typography } from "./tokens";

export function createAppTheme(mode: ResolvedThemeMode): AppTheme {
  return {
    colors: themeColorsByMode[mode],
    spacing,
    radius,
    typography,
  };
}
