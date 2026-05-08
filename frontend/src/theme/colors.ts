import type { ResolvedThemeMode, ThemeColors } from "@/types";

const darkColors: ThemeColors = {
  background: "#141618",
  surface: "#1B1E21",
  surfaceAlt: "#22262A",
  text: "#F3F4F6",
  textMuted: "#A7AFB7",
  primary: "#F47A20",
  primaryMuted: "#322117",
  border: "#2B3136",
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
  inputBackground: "#181B1E",
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
