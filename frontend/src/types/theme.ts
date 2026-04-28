export type ThemeMode = "light" | "dark" | "system";

export type ResolvedThemeMode = Exclude<ThemeMode, "system">;

export interface ThemeColors {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textMuted: string;
  primary: string;
  primaryMuted: string;
  border: string;
  success: string;
  warning: string;
  danger: string;
  inputBackground: string;
}

export interface ThemeTypography {
  title: number;
  subtitle: number;
  body: number;
  caption: number;
  button: number;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeRadius {
  sm: number;
  md: number;
  lg: number;
  pill: number;
}

export interface AppTheme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radius: ThemeRadius;
  typography: ThemeTypography;
}
