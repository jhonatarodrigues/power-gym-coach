import { screen } from "@testing-library/react-native";

jest.mock("@/repository/mock", () => {
  const actual = jest.requireActual("@/repository/mock");

  return {
    ...actual,
    progressEntriesMock: [],
    mockProgressRepository: {
      ...actual.mockProgressRepository,
      listEntries: () => [],
    },
  };
});

import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { ProgressScreen } from "./ProgressScreen";

describe("ProgressScreen empty states", () => {
  it("renders fallback values when there is no progress entry", () => {
    renderWithProviders(<ProgressScreen />);

    expect(screen.getAllByText("--")).toHaveLength(4);
    expect(screen.queryByText("Ultima leitura")).toBeNull();
  });
});
