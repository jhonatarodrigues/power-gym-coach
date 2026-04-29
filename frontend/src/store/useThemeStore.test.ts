import { useThemeStore } from "@/store/useThemeStore";

describe("useThemeStore", () => {
  beforeEach(() => {
    useThemeStore.setState({ mode: "dark" });
  });

  it("updates the theme mode", () => {
    useThemeStore.getState().setMode("light");

    expect(useThemeStore.getState().mode).toBe("light");
  });
});
