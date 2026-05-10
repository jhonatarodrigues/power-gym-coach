import type { AppTheme, ResolvedThemeMode } from "@/types";

import { themeColorsByMode } from "./colors";
import { radius, spacing, typography } from "./tokens";

export function createAppTheme(
  mode: ResolvedThemeMode,
  viewportWidth = 390
): AppTheme {
  const isCompact = viewportWidth <= 375;
  const isExtraCompact = viewportWidth <= 340;

  const resolvedSpacing = isCompact
    ? {
        xs: spacing.xs,
        sm: spacing.sm - 1,
        md: spacing.md - 2,
        lg: spacing.lg - 2,
        xl: spacing.xl - 4,
        xxl: spacing.xxl - 6,
      }
    : spacing;

  const resolvedRadius = isCompact
    ? {
        sm: radius.sm - 1,
        md: radius.md - 2,
        lg: radius.lg - 4,
        pill: radius.pill,
      }
    : radius;

  const resolvedTypography = isCompact
    ? {
        title: isExtraCompact ? typography.title - 6 : typography.title - 4,
        subtitle: typography.subtitle - 2,
        body: typography.body - 1,
        caption: typography.caption - 1,
        button: typography.button - 1,
      }
    : typography;

  return {
    colors: themeColorsByMode[mode],
    spacing: resolvedSpacing,
    radius: resolvedRadius,
    typography: resolvedTypography,
  };
}
