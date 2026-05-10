import {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from "react";
import { useColorScheme, useWindowDimensions } from "react-native";

import { useThemeStore } from "@/store/useThemeStore";
import type { AppTheme, ResolvedThemeMode } from "@/types";

import { createAppTheme } from "./theme";

interface ThemeContextValue {
  mode: "light" | "dark" | "system";
  resolvedMode: ResolvedThemeMode;
  setMode: (mode: "light" | "dark" | "system") => void;
  theme: AppTheme;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemMode = useColorScheme();
  const { width } = useWindowDimensions();
  const { mode, setMode } = useThemeStore();

  const resolvedMode: ResolvedThemeMode =
    mode === "system" ? (systemMode ?? "dark") : mode;

  const theme = useMemo(
    () => createAppTheme(resolvedMode, width || 390),
    [resolvedMode, width]
  );

  const value = useMemo(
    () => ({
      mode,
      resolvedMode,
      setMode,
      theme,
    }),
    [mode, resolvedMode, setMode, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useAppTheme must be used within AppThemeProvider.");
  }

  return context;
}
