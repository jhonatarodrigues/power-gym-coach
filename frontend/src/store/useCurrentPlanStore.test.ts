import { currentPlanMock } from "@/repository/mock";
import { useCurrentPlanStore } from "@/store/useCurrentPlanStore";

describe("useCurrentPlanStore", () => {
  beforeEach(() => {
    useCurrentPlanStore.getState().resetCurrentPlan();
  });

  it("updates training day notes", () => {
    const targetDay = currentPlanMock.trainingPlan.days[0];

    useCurrentPlanStore
      .getState()
      .updateTrainingDayNotes(targetDay.id, "Nova observacao de treino");

    const updatedDay = useCurrentPlanStore
      .getState()
      .currentPlan.trainingPlan.days.find((day) => day.id === targetDay.id);

    expect(updatedDay?.notes).toBe("Nova observacao de treino");
  });

  it("adds a new exercise to a day", () => {
    const targetDay = currentPlanMock.trainingPlan.days[0];
    const initialCount = targetDay.exercises.length;

    useCurrentPlanStore.getState().addExerciseToDay({
      dayId: targetDay.id,
      exerciseId: "exercise-3",
      exerciseName: "Agachamento goblet",
      sets: "4",
      reps: "12",
      restSeconds: 75,
      executionNotes: "Descer com controle.",
    });

    const updatedDay = useCurrentPlanStore
      .getState()
      .currentPlan.trainingPlan.days.find((day) => day.id === targetDay.id);

    expect(updatedDay?.exercises).toHaveLength(initialCount + 1);
    expect(updatedDay?.exercises.at(-1)).toMatchObject({
      exerciseId: "exercise-3",
      exerciseName: "Agachamento goblet",
      sets: "4",
      reps: "12",
      restSeconds: 75,
    });
  });

  it("adds a meal item and recalculates meal and diet totals", () => {
    const meal = currentPlanMock.dietPlan.meals[0];
    const initialMealCount = meal.items.length;
    const initialMealCalories = meal.calories;
    const initialDietCalories = currentPlanMock.dietPlan.calories;

    useCurrentPlanStore.getState().addMealItemToMeal({
      mealId: meal.id,
      foodId: "food-1",
      amount: 100,
      observation: "Adicionar ao cafe da manha",
    });

    const updatedPlan = useCurrentPlanStore.getState().currentPlan;
    const updatedMeal = updatedPlan.dietPlan.meals.find(
      (candidate) => candidate.id === meal.id
    );

    expect(updatedMeal?.items).toHaveLength(initialMealCount + 1);
    expect(updatedMeal?.observation).toBe("Adicionar ao cafe da manha");
    expect(updatedMeal?.calories).toBeCloseTo(initialMealCalories + 128, 1);
    expect(updatedPlan.dietPlan.calories).toBeCloseTo(initialDietCalories + 128, 1);
  });

  it("resets the plan to the original mock", () => {
    useCurrentPlanStore.getState().updateTrainingDayNotes(
      currentPlanMock.trainingPlan.days[0].id,
      "Mudanca temporaria"
    );

    useCurrentPlanStore.getState().resetCurrentPlan();

    expect(useCurrentPlanStore.getState().currentPlan).toEqual(currentPlanMock);
  });
});
