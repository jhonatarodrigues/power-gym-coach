import { act, screen } from "@testing-library/react-native";

import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { useMockSessionStore } from "@/store/useMockSessionStore";

import { AssessmentScreen } from "./AssessmentScreen";

describe("AssessmentScreen", () => {
  afterEach(() => {
    act(() => {
      useMockSessionStore.getState().signOut();
    });
  });

  it("shows teacher actions for the teacher role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<AssessmentScreen />);

    expect(screen.getByText("Criar novo planejamento")).toBeTruthy();
    expect(screen.getByText("Solicitar novas fotos")).toBeTruthy();
  });

  it("shows student actions for the student role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<AssessmentScreen />);

    expect(screen.getByText("Enviar nova avaliacao mockada")).toBeTruthy();
    expect(screen.getByText("Ver plano atualizado")).toBeTruthy();
  });
});
