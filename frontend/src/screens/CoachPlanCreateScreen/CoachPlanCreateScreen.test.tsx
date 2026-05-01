import { currentPlanMock } from "@/repository/mock";
import { act, fireEvent, screen, waitFor } from "@testing-library/react-native";

import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CoachPlanCreateScreen } from "./CoachPlanCreateScreen";

describe("CoachPlanCreateScreen", () => {
  beforeEach(() => {
    act(() => {
      useCoachContextStore.getState().reset();
      useCurrentPlanStore.getState().loadCurrentPlan(currentPlanMock);
    });
  });

  it("creates a new plan for the selected student using brazilian date input", async () => {
    renderWithProviders(<CoachPlanCreateScreen />);

    fireEvent.changeText(screen.getByLabelText("Nome do plano"), "Plano de definicao");
    fireEvent.changeText(screen.getByLabelText("Data inicial"), "10/05/2026");
    fireEvent.changeText(screen.getByLabelText("Data final"), "10/06/2026");
    await act(async () => {
      fireEvent.press(screen.getByText("Criar plano e abrir estrutura"));
    });

    await waitFor(() => {
      expect(useCoachContextStore.getState().getSelectedPlan()?.title).toBe(
        "Plano de definicao"
      );
    });

    const selectedPlan = useCoachContextStore.getState().getSelectedPlan();

    expect(selectedPlan?.startDate).toBe("2026-05-10");
    expect(selectedPlan?.endDate).toBe("2026-06-10");
    expect(useCurrentPlanStore.getState().currentPlan.title).toBe("Plano de definicao");
  });

  it("renders nothing when no student is selected", () => {
    act(() => {
      useCoachContextStore.setState({ selectedStudentId: "" });
    });

    renderWithProviders(<CoachPlanCreateScreen />);

    expect(screen.queryByText("Cadastrar plano")).toBeNull();
  });
});
