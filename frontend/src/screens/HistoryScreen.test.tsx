import { screen } from "@testing-library/react-native";

import { archivedPlansMock, historyRecordsMock, progressEntriesMock } from "@/repository/mock";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { HistoryScreen } from "./HistoryScreen";

describe("HistoryScreen", () => {
  it("renders records, archived plans and progress entries", () => {
    renderWithProviders(<HistoryScreen />);

    expect(screen.getByText("History")).toBeTruthy();
    expect(screen.getByText(historyRecordsMock[0].title)).toBeTruthy();
    expect(screen.getByText(archivedPlansMock[0].title)).toBeTruthy();
    expect(
      screen.getByText(
        `${progressEntriesMock[0].weightKg} kg / ${progressEntriesMock[0].bodyFatPercentage}% BF`
      )
    ).toBeTruthy();
  });
});
