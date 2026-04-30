import { useMemo } from "react";
import { View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import {
  Button,
  FoodPickerItem,
  Header,
  MacroSummaryCard,
  MealCard,
  Screen,
  SectionTitle,
  TextField,
} from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { foodLibraryMock } from "@/repository/mock";
import { useAppTheme } from "@/theme";

interface MealEditorFormValues {
  selectedMealId: string;
  selectedFoodId: string;
  amount: string;
  observation: string;
}

export function MealEditorScreen() {
  const { theme } = useAppTheme();
  const { addMealItemToMeal, currentPlan, updateMealObservation } = useCurrentPlan();
  const { control, handleSubmit, setValue, watch } = useForm<MealEditorFormValues>({
    defaultValues: {
      selectedMealId: currentPlan.dietPlan.meals[0]?.id ?? "",
      selectedFoodId: foodLibraryMock[0]?.id ?? "",
      amount: String(foodLibraryMock[0]?.baseAmount ?? 0),
      observation: currentPlan.dietPlan.meals[0]?.observation ?? "",
    },
  });
  const selectedMealId = watch("selectedMealId");
  const selectedFoodId = watch("selectedFoodId");
  const meals = currentPlan.dietPlan.meals;

  const selectedMeal = useMemo(
    () => meals.find((meal) => meal.id === selectedMealId) ?? meals[0],
    [meals, selectedMealId]
  );

  const selectedFood = useMemo(
    () => foodLibraryMock.find((food) => food.id === selectedFoodId) ?? foodLibraryMock[0],
    [selectedFoodId]
  );

  function addFoodToMeal(values: MealEditorFormValues) {
    if (!selectedMeal || !selectedFood) {
      return;
    }

    updateMealObservation(selectedMeal.id, values.observation.trim());
    addMealItemToMeal({
      mealId: selectedMeal.id,
      foodId: selectedFood.id,
      amount: Number(values.amount) || selectedFood.baseAmount,
      observation: values.observation.trim(),
    });

    setValue("amount", String(selectedFood.baseAmount));
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
            onPress={() => {
              setValue("selectedMealId", meal.id);
              setValue("observation", meal.observation ?? "");
            }}
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
            onPress={() => {
              setValue("selectedFoodId", food.id);
              setValue("amount", String(food.baseAmount));
            }}
            protein={food.protein}
            selected={food.id === selectedFoodId}
          />
        ))}
      </View>

      <Controller
        control={control}
        name="amount"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            hint={`Informe ${selectedFood?.baseUnit === "unit" ? "quantidade" : "gramas"} para o alimento selecionado.`}
            keyboardType="numeric"
            label="Porcao"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="observation"
        render={({ field: { onBlur, onChange, value } }) => (
          <TextField
            hint="Observacao opcional da refeicao."
            label="Observacao da refeicao"
            multiline
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />

      <Button label="Adicionar alimento ao plano" onPress={handleSubmit(addFoodToMeal)} />

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
