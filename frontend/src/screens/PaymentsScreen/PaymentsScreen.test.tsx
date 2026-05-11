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

    expect(screen.getAllByText("Pagamentos").length).toBeGreaterThan(0);
    expect(screen.getByText("Receita do ciclo")).toBeTruthy();
    expect(screen.getByText("Status por aluno")).toBeTruthy();
    expect(screen.getByText(/Plano Evolução/)).toBeTruthy();
    expect(screen.getByText(/Plano Start/)).toBeTruthy();
    expect(screen.getByText("Pago")).toBeTruthy();
    expect(screen.getByText("Carência")).toBeTruthy();
  });

  it("lets the coach use payment navigation shortcuts", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
    });

    renderWithProviders(<PaymentsScreen />);

    fireEvent.press(screen.getByLabelText("Abrir menu"));
    fireEvent.press(screen.getByText("Mais"));
  });

  it("allows the student to pay an open record", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<PaymentsScreen />);

    expect(screen.getAllByText("Pagamentos").length).toBeGreaterThan(0);
    expect(screen.getByText("Pagar com Pix")).toBeTruthy();
    expect(screen.getByText("Cartão")).toBeTruthy();
    expect(screen.getByText("Seu plano com o coach")).toBeTruthy();
    expect(screen.getByText("Entregas inclusas: Dieta, Treino, Avaliação, Exames")).toBeTruthy();

    fireEvent.press(screen.getAllByText("Pagar com Pix")[0]);

    expect(
      usePaymentStore.getState().paymentRecords.find((record) => record.id === "payment-plan-apr")
        ?.status
    ).toBe("paid");
  });

  it("renders the student overview without current subscription data", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
      usePaymentStore.setState({
        paymentRecords: [],
        subscriptions: [],
        teacherPlans: [],
      });
    });

    renderWithProviders(<PaymentsScreen />);

    expect(screen.getAllByText("Pagamentos").length).toBeGreaterThan(0);
    expect(screen.queryByText("Seu plano com o coach")).toBeNull();
    expect(screen.queryByText("Situacao atual da conta")).toBeNull();
  });
});
