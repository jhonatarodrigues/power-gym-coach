import { act, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { StudentHomeScreen } from "./StudentHomeScreen";

describe("StudentHomeScreen", () => {
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

  it("renders the student home summary and quick actions", () => {
    renderWithProviders(<StudentHomeScreen />);

    expect(screen.getByText("Seu plano atual")).toBeTruthy();
    expect(screen.getByText("Treinos da semana")).toBeTruthy();
    expect(screen.getByText("Abrir treino do dia")).toBeTruthy();
    expect(screen.getByText("Abrir assessment")).toBeTruthy();
    expect(screen.getByText("Abrir exams")).toBeTruthy();
  });
});
