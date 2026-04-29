import { act, screen } from "@testing-library/react-native";

jest.mock("@/repository/mock", () => {
  const actual = jest.requireActual("@/repository/mock");

  return {
    ...actual,
    assessmentReviewsMock: [],
    examRequestsMock: [],
    studentProfilesMock: [],
    usersMock: [],
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

  it("renders without highlighted athlete when no matching user exists", () => {
    renderWithProviders(<TeacherDashboardScreen />);

    expect(screen.getAllByText("0").length).toBeGreaterThan(0);
    expect(screen.queryByText("Plano ativo")).toBeNull();
  });
});
