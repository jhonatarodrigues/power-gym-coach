import { fireEvent, screen, waitFor } from "@testing-library/react-native";

import { currentPlanMock } from "@/repository/mock";
import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { TrainingEditorScreen } from "./TrainingEditorScreen";

describe("TrainingEditorScreen", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
  });

  it("adds an exercise to the selected day through the form", async () => {
    const day = currentPlanMock.trainingPlan.days[0];
    const initialCount = day.exercises.length;

    renderWithProviders(<TrainingEditorScreen />);

    fireEvent.changeText(screen.getByLabelText("Series"), "5");
    fireEvent.changeText(screen.getByLabelText("Repeticoes"), "8-10");
    fireEvent.changeText(screen.getByLabelText("Descanso"), "90");
    fireEvent.changeText(
      screen.getByLabelText("Observacao do exercicio"),
      "Manter controle total do movimento."
    );
    fireEvent.changeText(
      screen.getByLabelText("Observacao do dia"),
      "Treino ajustado no teste."
    );
    fireEvent.press(screen.getByText("Salvar e adicionar exercicio"));

    await waitFor(() => {
      const updatedDay = useCurrentPlanStore
        .getState()
        .currentPlan.trainingPlan.days.find((candidate) => candidate.id === day.id);

      expect(updatedDay?.exercises).toHaveLength(initialCount + 1);
      expect(updatedDay?.exercises.at(-1)).toMatchObject({
        sets: "5",
        reps: "8-10",
        restSeconds: 90,
        executionNotes: "Manter controle total do movimento.",
      });
    });
  });
});
