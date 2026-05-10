import { createAppTheme } from "./theme";

describe("createAppTheme", () => {
  it("returns the base theme for regular widths", () => {
    const theme = createAppTheme("dark", 390);

    expect(theme.spacing.lg).toBe(18);
    expect(theme.radius.lg).toBe(24);
    expect(theme.typography.title).toBe(28);
  });

  it("compacts spacing, radius and typography on narrow screens", () => {
    const theme = createAppTheme("dark", 375);

    expect(theme.spacing.lg).toBe(16);
    expect(theme.spacing.xl).toBe(20);
    expect(theme.radius.lg).toBe(20);
    expect(theme.typography.title).toBe(24);
    expect(theme.typography.body).toBe(15);
  });

  it("uses the extra compact title scale on very small screens", () => {
    const theme = createAppTheme("dark", 320);

    expect(theme.typography.title).toBe(22);
    expect(theme.typography.caption).toBe(12);
  });
});
