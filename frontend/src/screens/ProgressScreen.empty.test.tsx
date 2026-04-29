import { screen } from "@testing-library/react-native";

jest.mock("@/repository/mock", () => ({
  progressEntriesMock: [],
}));

import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { ProgressScreen } from "./ProgressScreen";

describe("ProgressScreen empty states", () => {
  it("renders fallback values when there is no progress entry", () => {
    renderWithProviders(<ProgressScreen />);

    expect(screen.getAllByText("--")).toHaveLength(2);
    expect(screen.queryByText("Ultima leitura")).toBeNull();
  });
});
