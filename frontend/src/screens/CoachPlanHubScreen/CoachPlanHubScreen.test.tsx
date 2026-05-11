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

    expect(screen.getByText("Plano atual")).toBeTruthy();
    expect(screen.getByText("Progresso do plano")).toBeTruthy();
    expect(screen.getByText("Dias restantes")).toBeTruthy();
    expect(screen.getByText("Dieta")).toBeTruthy();
    expect(screen.getByText("Treino")).toBeTruthy();
    expect(screen.getByText("Feedback")).toBeTruthy();
  });

  it("renders nothing when the selected plan is missing", () => {
    act(() => {
      useCoachContextStore.setState({ selectedPlanId: "" });
    });

    renderWithProviders(<CoachPlanHubScreen />);

    expect(screen.queryByText("Hub do plano do aluno")).toBeNull();
  });

  it("renders nothing when the selected student is missing", () => {
    act(() => {
      useCoachContextStore.setState({ selectedStudentId: "" });
    });

    renderWithProviders(<CoachPlanHubScreen />);

    expect(screen.queryByText("Hub do plano do aluno")).toBeNull();
  });
});
