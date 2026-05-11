import { act, fireEvent, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { usePaymentStore } from "@/store/usePaymentStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CoachCommercialPlansScreen } from "./CoachCommercialPlansScreen";

describe("CoachCommercialPlansScreen", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().reset();
      useMockSessionStore.getState().signInAs("teacher");
      usePaymentStore.getState().reset();
    });
  });

  it("renders the coach commercial catalog", () => {
    renderWithProviders(<CoachCommercialPlansScreen />);

    expect(screen.getByText("Planos oferecidos")).toBeTruthy();
    expect(screen.getByText("Catálogo do coach")).toBeTruthy();
    expect(screen.getByText("Plano Start")).toBeTruthy();
    expect(screen.getByText("Plano Evolução")).toBeTruthy();
    expect(screen.getAllByText("Exames").length).toBeGreaterThan(0);
  });

  it("shows the commercial plan form with exams as an available feature", () => {
    renderWithProviders(<CoachCommercialPlansScreen />);

    act(() => {
      fireEvent.press(screen.getByText("Cadastrar novo plano"));
    });

    expect(screen.getByLabelText("Nome do plano")).toBeTruthy();
    expect(screen.getByLabelText("Valor do plano")).toBeTruthy();
    expect(screen.getByText("O aluno recebe neste plano")).toBeTruthy();
    expect(screen.getAllByText("Exames").length).toBeGreaterThan(0);
  });

  it("allows toggling cycle and feature selectors", () => {
    renderWithProviders(<CoachCommercialPlansScreen />);

    act(() => {
      fireEvent.press(screen.getByText("Cadastrar novo plano"));
      fireEvent.press(screen.getByText("Trimestral"));
      fireEvent.press(screen.getByText("Anual"));
      fireEvent.press(screen.getAllByText("Dieta")[0]);
      fireEvent.press(screen.getAllByText("Treino")[0]);
      fireEvent.press(screen.getAllByText("Avaliação")[0]);
      fireEvent.press(screen.getAllByText("Exames")[0]);
    });

    expect(screen.getByText("Salvar plano comercial")).toBeTruthy();
  });
});
