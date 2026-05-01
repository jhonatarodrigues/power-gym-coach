import { formatDateBR, formatDateTimeBR, normalizeDateInputToISO } from "./dates";

describe("dates utils", () => {
  it("formats ISO date strings in brazilian format", () => {
    expect(formatDateBR("2026-04-30")).toBe("30/04/2026");
    expect(formatDateTimeBR("2026-04-30T14:45:00.000Z")).toContain("30/04/2026");
  });

  it("returns fallback values when no date is provided", () => {
    expect(formatDateBR()).toBe("--/--/----");
    expect(formatDateTimeBR()).toBe("--/--/---- --:--");
  });

  it("returns the original value when the date is invalid", () => {
    expect(formatDateBR("data-invalida")).toBe("data-invalida");
    expect(formatDateTimeBR("data-invalida")).toBe("data-invalida");
  });

  it("normalizes brazilian input dates to iso format", () => {
    expect(normalizeDateInputToISO("10/05/2026")).toBe("2026-05-10");
    expect(normalizeDateInputToISO("2026-05-10")).toBe("2026-05-10");
  });
});
