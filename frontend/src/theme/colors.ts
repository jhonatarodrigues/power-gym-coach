import type { ResolvedThemeMode, ThemeColors } from "@/types";

const darkColors: ThemeColors = {
  background: "#0B0B0B",
  surface: "#141414",
  surfaceAlt: "#1D1D1D",
  text: "#F5F5F5",
  textMuted: "#A1A1AA",
  primary: "#FF7A00",
  primaryMuted: "#3B220C",
  border: "#2A2A2A",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  inputBackground: "#101010",
};

const lightColors: ThemeColors = {
  background: "#FFF8F2",
  surface: "#FFFFFF",
  surfaceAlt: "#FFF0E4",
  text: "#18181B",
  textMuted: "#52525B",
  primary: "#FF7A00",
  primaryMuted: "#FFD4AD",
  border: "#E7D3C4",
  success: "#15803D",
  warning: "#B45309",
  danger: "#B91C1C",
  inputBackground: "#FFFDFB",
};

export const themeColorsByMode: Record<ResolvedThemeMode, ThemeColors> = {
  dark: darkColors,
  light: lightColors,
};
