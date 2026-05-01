import { act, screen } from "@testing-library/react-native";

import { currentPlanMock } from "@/repository/mock";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CoachPlanHubScreen } from "./CoachPlanHubScreen";

describe("CoachPlanHubScreen", () => {
  beforeEach(() => {
    act(() => {
      useCoachContextStore.getState().reset();
      useCoachContextStore.getState().selectStudent("user-student-1");
      useCoachContextStore.getState().selectPlan("plan-current-1");
      useCurrentPlanStore.getState().loadCurrentPlan(currentPlanMock);
    });
  });

  it("renders the selected plan structure and coach actions", () => {
    renderWithProviders(<CoachPlanHubScreen />);

    expect(screen.getByText("Estrutura do plano")).toBeTruthy();
    expect(screen.getByText("Dieta (4 refeicoes)")).toBeTruthy();
    expect(screen.getByText("Treino (5 dias)")).toBeTruthy();
    expect(screen.getByText("Feedbacks (2)")).toBeTruthy();
    expect(screen.getByText("Mensagens com o aluno")).toBeTruthy();
  });

  it("renders nothing when the selected plan is missing", () => {
    act(() => {
      useCoachContextStore.setState({ selectedPlanId: "" });
    });

    renderWithProviders(<CoachPlanHubScreen />);

    expect(screen.queryByText("Estrutura do plano")).toBeNull();
  });
});
