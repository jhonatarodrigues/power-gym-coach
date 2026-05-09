import { act, screen } from "@testing-library/react-native";

jest.mock("@/repository/mock", () => {
  const actual = jest.requireActual("@/repository/mock");

  return {
    ...actual,
    assessmentReviewsMock: [],
    examRequestsMock: [],
    studentProfilesMock: [],
  };
});

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { TeacherDashboardScreen } from "./TeacherDashboardScreen";

describe("TeacherDashboardScreen empty states", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });
  });

  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("renders sem depender de destaque de plano atual", () => {
    renderWithProviders(<TeacherDashboardScreen />);

    expect(screen.getByText("28")).toBeTruthy();
    expect(screen.queryByText("Plano atual em destaque")).toBeNull();
    expect(screen.getByText("Dashboard do coach")).toBeTruthy();
  });
});
