import { act, screen } from "@testing-library/react-native";

import { useCoachContextStore } from "@/store/useCoachContextStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { CoachFeedbacksScreen } from "./CoachFeedbacksScreen";

describe("CoachFeedbacksScreen", () => {
  beforeEach(() => {
    act(() => {
      useCoachContextStore.getState().reset();
      useCoachContextStore.getState().selectStudent("user-student-1");
      useCoachContextStore.getState().selectPlan("plan-current-1");
    });
  });

  it("renders every feedback linked to the selected plan", () => {
    renderWithProviders(<CoachFeedbacksScreen />);

    expect(screen.getByText("Feedbacks do plano")).toBeTruthy();
    expect(
      screen.getByText(
        "Boa evolucao visual em dorsais e deltoides, com reducao discreta de gordura abdominal."
      )
    ).toBeTruthy();
    expect(
      screen.getByText(
        "Feedback complementar de aderencia: boa consistencia no cafe da manha e no treino de quadriceps."
      )
    ).toBeTruthy();
  });

  it("keeps the screen stable even when no plan is selected", () => {
    act(() => {
      useCoachContextStore.setState({ selectedPlanId: "" });
    });

    renderWithProviders(<CoachFeedbacksScreen />);

    expect(screen.getByText("Feedbacks do plano")).toBeTruthy();
  });
});
