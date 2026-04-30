import { act, fireEvent, screen } from "@testing-library/react-native";

import { useMockSessionStore } from "@/store/useMockSessionStore";
import { usePaymentStore } from "@/store/usePaymentStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { PaymentsScreen } from "./PaymentsScreen";

describe("PaymentsScreen", () => {
  beforeEach(() => {
    act(() => {
      useMockSessionStore.getState().reset();
      usePaymentStore.getState().reset();
    });
  });

  it("renders the teacher payment overview", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<PaymentsScreen />);

    expect(screen.getByText("Pagamentos")).toBeTruthy();
    expect(screen.getByText("Plano mensal")).toBeTruthy();
    expect(screen.getAllByText("Entregas: Dieta, Treino, Avaliacao").length).toBeGreaterThan(0);
    expect(screen.getByText("Cadastrar novo plano")).toBeTruthy();
  });

  it("shows the teacher plan creation form", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<PaymentsScreen />);

    act(() => {
      fireEvent.press(screen.getByText("Cadastrar novo plano"));
    });

    expect(screen.getByLabelText("Nome do plano")).toBeTruthy();
    expect(screen.getByLabelText("Valor mensal")).toBeTruthy();
    expect(screen.getByLabelText("Descricao")).toBeTruthy();
    expect(screen.getByText("O aluno recebe neste plano")).toBeTruthy();
    expect(screen.getByText("Salvar plano comercial")).toBeTruthy();
  });

  it("allows the student to pay an open record", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<PaymentsScreen />);

    expect(screen.getByText("Seu plano com o professor")).toBeTruthy();
    expect(screen.getByText("Entregas inclusas: Dieta, Treino, Avaliacao")).toBeTruthy();

    fireEvent.press(screen.getAllByText("Pagar com Pix")[0]);

    expect(
      usePaymentStore.getState().paymentRecords.find((record) => record.id === "payment-plan-apr")
        ?.status
    ).toBe("paid");
  });
});
