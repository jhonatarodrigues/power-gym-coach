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
  });

  it("allows the student to pay an open record", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<PaymentsScreen />);

    fireEvent.press(screen.getAllByText("Pagar com Pix")[0]);

    expect(
      usePaymentStore.getState().paymentRecords.find((record) => record.id === "payment-plan-apr")
        ?.status
    ).toBe("paid");
  });
});
