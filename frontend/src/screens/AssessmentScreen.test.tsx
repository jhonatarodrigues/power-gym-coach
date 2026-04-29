import { act, fireEvent, screen } from "@testing-library/react-native";

import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { useAssessmentWorkflowStore } from "@/store/useAssessmentWorkflowStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";
import { useMockSessionStore } from "@/store/useMockSessionStore";

import { AssessmentScreen } from "./AssessmentScreen";

describe("AssessmentScreen", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
    useAssessmentWorkflowStore.getState().reset();
  });

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

    expect(screen.getByText("Aplicar sugestoes ao plano atual")).toBeTruthy();
    expect(screen.getByText("Solicitar novas fotos")).toBeTruthy();

    fireEvent.press(screen.getByText("Aplicar sugestoes ao plano atual"));

    expect(useCurrentPlanStore.getState().currentPlan.status).toBe("draft");
  });

  it("shows student actions for the student role", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("student");
    });

    renderWithProviders(<AssessmentScreen />);

    expect(screen.getByText("Enviar nova avaliacao mockada")).toBeTruthy();
    expect(screen.getByText("Ver plano atualizado")).toBeTruthy();

    fireEvent.press(screen.getByText("Enviar nova avaliacao mockada"));

    expect(useAssessmentWorkflowStore.getState().submissions[0]?.status).toBe(
      "pending"
    );
  });

  it("shows waiting state when there is no review yet", () => {
    act(() => {
      useMockSessionStore.getState().signInAs("teacher");
      useAssessmentWorkflowStore.setState({ reviews: [] });
    });

    renderWithProviders(<AssessmentScreen />);

    expect(screen.getByText("Aguardando devolutiva do professor")).toBeTruthy();
  });
});
