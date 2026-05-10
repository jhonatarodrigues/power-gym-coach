import * as ReactNative from "react-native";
import { act, fireEvent, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import {
  buildAreaPath,
  createSmoothPath,
  TeacherDashboardScreen,
} from "./TeacherDashboardScreen";

describe("TeacherDashboardScreen", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("renders dashboard highlights and navigation actions", () => {
    renderWithProviders(<TeacherDashboardScreen />);

    expect(screen.getByText("Dashboard do coach")).toBeTruthy();
    expect(screen.getByText("Visão geral")).toBeTruthy();
    expect(screen.getByText("Engajamento semanal")).toBeTruthy();
    expect(screen.getByText("Progresso médio dos alunos")).toBeTruthy();
    expect(screen.getByText("Alunos em destaque")).toBeTruthy();
    expect(screen.queryByText("Abrir pagamentos")).toBeNull();

    fireEvent.press(screen.getByLabelText("Abrir menu"));
  });

  it("renders the compact layout on iPhone SE widths", () => {
    jest.spyOn(ReactNative, "useWindowDimensions").mockReturnValue({
      fontScale: 1,
      height: 568,
      scale: 2,
      width: 320,
    });

    renderWithProviders(<TeacherDashboardScreen />);

    expect(screen.getByText("Dashboard do coach")).toBeTruthy();
    expect(screen.getByText("Últimos 7 dias")).toBeTruthy();
    expect(screen.getByText("Alunos em destaque")).toBeTruthy();
  });

  it("uses the coach fallback when no teacher is signed in", () => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });

    renderWithProviders(<TeacherDashboardScreen />);

    expect(screen.getByText("Olá, Coach!")).toBeTruthy();
  });

  it("covers the chart path helpers for sparse inputs", () => {
    expect(createSmoothPath([])).toBe("");
    expect(createSmoothPath([{ x: 12, y: 18 }])).toBe("M 12 18");
    expect(buildAreaPath([], 200)).toBe("");
  });
});
