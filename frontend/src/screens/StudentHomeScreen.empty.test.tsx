import { act, screen } from "@testing-library/react-native";

jest.mock("@/repository/mock", () => {
  const actual = jest.requireActual("@/repository/mock");

  return {
    ...actual,
    assessmentReviewsMock: [],
    examRequestsMock: [],
    historyRecordsMock: [],
    progressEntriesMock: [],
  };
});

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { StudentHomeScreen } from "./StudentHomeScreen";

describe("StudentHomeScreen empty states", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });
  });

  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("renders fallback progress and zero recent assessment data", () => {
    renderWithProviders(<StudentHomeScreen />);

    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
    expect(screen.getByText("undefined kg / undefined% BF")).toBeTruthy();
  });
});
