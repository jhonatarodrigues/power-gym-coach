import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import {
  Button,
  FoodPickerItem,
  Header,
  MacroSummaryCard,
  MealCard,
  Screen,
  SectionTitle,
} from "@/components";
import { currentPlanMock, foodLibraryMock } from "@/repository/mock";
import { useAppTheme } from "@/theme";

export function MealEditorScreen() {
  const { theme } = useAppTheme();
  const [selectedMealId, setSelectedMealId] = useState(currentPlanMock.dietPlan.meals[0].id);
  const [selectedFoodId, setSelectedFoodId] = useState(foodLibraryMock[0].id);
  const [meals, setMeals] = useState(currentPlanMock.dietPlan.meals);

  const selectedMeal = useMemo(
    () => meals.find((meal) => meal.id === selectedMealId) ?? meals[0],
    [meals, selectedMealId]
  );

  const selectedFood = useMemo(
    () => foodLibraryMock.find((food) => food.id === selectedFoodId) ?? foodLibraryMock[0],
    [selectedFoodId]
  );

  function addFoodToMeal() {
    if (!selectedMeal || !selectedFood) {
      return;
    }

    const amount = selectedFood.baseUnit === "unit" ? 1 : selectedFood.baseAmount;
    const factor = amount / selectedFood.baseAmount;
    const calories = selectedFood.calories * factor;
    const carbs = selectedFood.carbs * factor;
    const protein = selectedFood.protein * factor;
    const fat = selectedFood.fat * factor;
    const fiber = (selectedFood.fiber ?? 0) * factor;

    setMeals((currentMeals) =>
      currentMeals.map((meal) =>
        meal.id === selectedMeal.id
          ? {
              ...meal,
              items: [
                ...meal.items,
                {
                  id: `mock-meal-item-${meal.id}-${meal.items.length + 1}`,
                  foodId: selectedFood.id,
                  foodName: selectedFood.name,
                  amount,
                  unit: selectedFood.baseUnit,
                  calories,
                  carbs,
                  protein,
                  fat,
                  fiber,
                },
              ],
              calories: meal.calories + calories,
              carbs: meal.carbs + carbs,
              protein: meal.protein + protein,
              fat: meal.fat + fat,
              fiber: (meal.fiber ?? 0) + fiber,
            }
          : meal
      )
    );
  }

  const totalSummary = meals.reduce(
    (acc, meal) => ({
      calories: acc.calories + meal.calories,
      carbs: acc.carbs + meal.carbs,
      protein: acc.protein + meal.protein,
      fat: acc.fat + meal.fat,
    }),
    { calories: 0, carbs: 0, protein: 0, fat: 0 }
  );

  return (
    <Screen>
      <Header
        title="Meal editor"
        subtitle="Fluxo mockado para escolher alimentos por refeicao e atualizar os totais nutricionais."
      />

      <SectionTitle title="Escolher refeicao" description="Edite uma refeicao por vez." />
      <View style={{ gap: theme.spacing.sm }}>
        {meals.map((meal) => (
          <Button
            fullWidth={false}
            key={meal.id}
            label={meal.title}
            onPress={() => setSelectedMealId(meal.id)}
            variant={meal.id === selectedMealId ? "primary" : "ghost"}
          />
        ))}
      </View>

      {selectedMeal ? (
        <>
          <SectionTitle title="Refeicao atual" description="Preview do estado local." />
          <MealCard meal={selectedMeal} />
        </>
      ) : null}

      <SectionTitle
        title="Escolher alimento"
        description="Toque em um alimento para adicionar na refeicao."
      />
      <View style={{ gap: theme.spacing.md }}>
        {foodLibraryMock.slice(0, 5).map((food) => (
          <FoodPickerItem
            key={food.id}
            baseLabel={food.defaultBaseLabel}
            calories={food.calories}
            carbs={food.carbs}
            fat={food.fat}
            name={food.name}
            onPress={() => setSelectedFoodId(food.id)}
            protein={food.protein}
            selected={food.id === selectedFoodId}
          />
        ))}
      </View>

      <Button label="Adicionar alimento mockado" onPress={addFoodToMeal} />

      <MacroSummaryCard
        calories={totalSummary.calories}
        carbs={totalSummary.carbs}
        fat={totalSummary.fat}
        note="Soma local das refeicoes editadas neste fluxo mockado."
        protein={totalSummary.protein}
        title="Resumo do dia"
      />
    </Screen>
  );
}
