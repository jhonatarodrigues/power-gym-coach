import { screen } from "@testing-library/react-native";

import { progressEntriesMock } from "@/repository/mock";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { ProgressScreen } from "./ProgressScreen";

describe("ProgressScreen", () => {
  it("renders the latest progress summary and timeline", () => {
    renderWithProviders(<ProgressScreen />);

    const latestEntry = progressEntriesMock.at(-1);

    expect(screen.getByText("Progress")).toBeTruthy();
    expect(screen.getByText(`${latestEntry?.weightKg} kg`)).toBeTruthy();
    expect(
      screen.getByText(`${latestEntry?.bodyFatPercentage}%`)
    ).toBeTruthy();
    expect(screen.getAllByText(latestEntry?.notes ?? "")).toHaveLength(2);
  });
});
