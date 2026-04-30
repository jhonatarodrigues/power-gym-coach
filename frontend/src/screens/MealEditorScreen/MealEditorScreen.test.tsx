import { fireEvent, screen, waitFor } from "@testing-library/react-native";

import { currentPlanMock } from "@/repository/mock";
import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";
import { renderWithProviders } from "@/test-utils/renderWithProviders";

import { MealEditorScreen } from "./MealEditorScreen";

describe("MealEditorScreen", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
  });

  it("adds a food item to the selected meal and recalculates totals", async () => {
    const meal = currentPlanMock.dietPlan.meals[0];
    const initialItemCount = meal.items.length;

    renderWithProviders(<MealEditorScreen />);

    fireEvent.press(screen.getAllByText("Banana prata")[1]);
    fireEvent.changeText(screen.getByLabelText("Porcao"), "2");
    fireEvent.changeText(
      screen.getByLabelText("Observacao da refeicao"),
      "Adicionar duas bananas."
    );
    fireEvent.press(screen.getByText("Adicionar alimento ao plano"));

    await waitFor(() => {
      const updatedMeal = useCurrentPlanStore
        .getState()
        .currentPlan.dietPlan.meals.find((candidate) => candidate.id === meal.id);

      expect(updatedMeal?.items).toHaveLength(initialItemCount + 1);
      expect(updatedMeal?.items.at(-1)).toMatchObject({
        foodName: "Banana prata",
        amount: 2,
      });
      expect(updatedMeal?.observation).toBe("Adicionar duas bananas.");
    });
  });
});
