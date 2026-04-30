import { screen } from "@testing-library/react-native";

import { progressEntriesMock } from "@/repository/mock";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { ProgressScreen } from "./ProgressScreen";

describe("ProgressScreen", () => {
  it("renders the latest progress summary and timeline", () => {
    renderWithProviders(<ProgressScreen />);

    const latestEntry = progressEntriesMock.at(-1);

    expect(screen.getByText("Progress")).toBeTruthy();
    expect(screen.getAllByText(`${latestEntry?.weightKg} kg`).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(`${latestEntry?.bodyFatPercentage}%`).length
    ).toBeGreaterThan(0);
    expect(screen.getByText("Comparativo por periodo")).toBeTruthy();
    expect(screen.getByText("Direcao atual do progresso")).toBeTruthy();
    expect(screen.getByText("Janela da proxima leitura")).toBeTruthy();
    expect(screen.getAllByText(latestEntry?.notes ?? "")).toHaveLength(2);
  });
});
