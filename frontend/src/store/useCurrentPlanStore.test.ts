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

  it("tracks unsaved changes and saves the current draft", () => {
    useCurrentPlanStore.getState().updateTrainingDayNotes(
      currentPlanMock.trainingPlan.days[0].id,
      "Alteracao em rascunho"
    );

    expect(useCurrentPlanStore.getState().hasUnsavedChanges).toBe(true);

    useCurrentPlanStore.getState().saveCurrentPlan();

    expect(useCurrentPlanStore.getState().hasUnsavedChanges).toBe(false);
    expect(useCurrentPlanStore.getState().savedPlan.trainingPlan.days[0]?.notes).toBe(
      "Alteracao em rascunho"
    );
  });

  it("discards draft changes and restores the last saved plan", () => {
    useCurrentPlanStore.getState().updateTrainingDayNotes(
      currentPlanMock.trainingPlan.days[0].id,
      "Primeira versao"
    );
    useCurrentPlanStore.getState().saveCurrentPlan();
    useCurrentPlanStore.getState().updateTrainingDayNotes(
      currentPlanMock.trainingPlan.days[0].id,
      "Versao nao salva"
    );

    useCurrentPlanStore.getState().discardCurrentPlanChanges();

    expect(useCurrentPlanStore.getState().currentPlan.trainingPlan.days[0]?.notes).toBe(
      "Primeira versao"
    );
    expect(useCurrentPlanStore.getState().hasUnsavedChanges).toBe(false);
  });

  it("adds a supplement and recalculates diet totals", () => {
    const initialSupplementCount = currentPlanMock.dietPlan.supplements.length;
    const initialCalories = currentPlanMock.dietPlan.calories;

    useCurrentPlanStore.getState().addSupplement({
      name: "Maltodextrina",
      dosage: "30 g",
      timing: "Pos treino",
      observation: "Usar nos dias mais intensos.",
      calories: 120,
      carbs: 30,
      protein: 0,
      fat: 0,
      fiber: 0,
    });

    const updatedPlan = useCurrentPlanStore.getState().currentPlan;

    expect(updatedPlan.dietPlan.supplements).toHaveLength(
      initialSupplementCount + 1
    );
    expect(updatedPlan.dietPlan.supplements.at(-1)).toMatchObject({
      name: "Maltodextrina",
      dosage: "30 g",
      timing: "Pos treino",
    });
    expect(updatedPlan.dietPlan.calories).toBeCloseTo(initialCalories + 120, 1);
  });
});
