import { Text } from "react-native";
import * as ReactNative from "react-native";
import { render, screen } from "@testing-library/react-native";

import { useThemeStore } from "@/store/useThemeStore";

import { AppThemeProvider, useAppTheme } from "./ThemeProvider";

function ThemeConsumer() {
  const { mode, resolvedMode } = useAppTheme();

  return <Text>{`${mode}:${resolvedMode}`}</Text>;
}

describe("AppThemeProvider", () => {
  beforeEach(() => {
    useThemeStore.setState({ mode: "dark" });
  });

  it("resolves light mode explicitly", () => {
    jest.spyOn(ReactNative, "useColorScheme").mockReturnValue("dark");
    useThemeStore.getState().setMode("light");

    render(
      <AppThemeProvider>
        <ThemeConsumer />
      </AppThemeProvider>
    );

    expect(screen.getByText("light:light")).toBeTruthy();
  });

  it("resolves system mode from the device color scheme", () => {
    jest.spyOn(ReactNative, "useColorScheme").mockReturnValue("dark");
    useThemeStore.getState().setMode("system");

    render(
      <AppThemeProvider>
        <ThemeConsumer />
      </AppThemeProvider>
    );

    expect(screen.getByText("system:dark")).toBeTruthy();
  });

  it("throws when useAppTheme is used without provider", () => {
    expect(() => render(<ThemeConsumer />)).toThrow(
      "useAppTheme must be used within AppThemeProvider."
    );
  });
});
