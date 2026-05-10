import { Text } from "react-native";
import * as ReactNative from "react-native";
import { render, screen } from "@testing-library/react-native";

import { useThemeStore } from "@/store/useThemeStore";

import { AppThemeProvider, useAppTheme } from "./ThemeProvider";

function ThemeConsumer() {
  const { mode, resolvedMode, theme } = useAppTheme();

  return (
    <Text>
      {`${mode}:${resolvedMode}:${theme.typography.title}:${theme.spacing.lg}`}
    </Text>
  );
}

describe("AppThemeProvider", () => {
  beforeEach(() => {
    useThemeStore.setState({ mode: "dark" });
  });

  it("resolves light mode explicitly", () => {
    jest.spyOn(ReactNative, "useColorScheme").mockReturnValue("dark");
    jest.spyOn(ReactNative, "useWindowDimensions").mockReturnValue({
      fontScale: 1,
      height: 844,
      scale: 2,
      width: 390,
    });
    useThemeStore.getState().setMode("light");

    render(
      <AppThemeProvider>
        <ThemeConsumer />
      </AppThemeProvider>
    );

    expect(screen.getByText("light:light:28:18")).toBeTruthy();
  });

  it("resolves system mode from the device color scheme", () => {
    jest.spyOn(ReactNative, "useColorScheme").mockReturnValue("dark");
    jest.spyOn(ReactNative, "useWindowDimensions").mockReturnValue({
      fontScale: 1,
      height: 844,
      scale: 2,
      width: 375,
    });
    useThemeStore.getState().setMode("system");

    render(
      <AppThemeProvider>
        <ThemeConsumer />
      </AppThemeProvider>
    );

    expect(screen.getByText("system:dark:28:18")).toBeTruthy();
  });

  it("falls back to the default width when window width is 0", () => {
    jest.spyOn(ReactNative, "useColorScheme").mockReturnValue("dark");
    jest.spyOn(ReactNative, "useWindowDimensions").mockReturnValue({
      fontScale: 1,
      height: 844,
      scale: 2,
      width: 0,
    });
    useThemeStore.getState().setMode("dark");

    render(
      <AppThemeProvider>
        <ThemeConsumer />
      </AppThemeProvider>
    );

    expect(screen.getByText("dark:dark:28:18")).toBeTruthy();
  });

  it("throws when useAppTheme is used without provider", () => {
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useAppTheme must be used within AppThemeProvider."
    );
  });
});
