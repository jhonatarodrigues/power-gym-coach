import { useMemo, useState } from "react";
import { Text, View } from "react-native";

import {
  Button,
  Card,
  FoodPickerItem,
  Header,
  MacroSummaryCard,
  Screen,
  SectionTitle,
} from "@/components";
import { foodLibraryMock } from "@/repository/mock";
import { useAppTheme } from "@/theme";
import type { FoodLibraryItem } from "@/types";

function calculateFoodTotals(food: FoodLibraryItem, amount: number) {
  const factor = amount / food.baseAmount;

  return {
    calories: food.calories * factor,
    carbs: food.carbs * factor,
    protein: food.protein * factor,
    fat: food.fat * factor,
  };
}

export function DietEditorScreen() {
  const { theme } = useAppTheme();
  const [selectedFoodId, setSelectedFoodId] = useState(foodLibraryMock[0].id);
  const [amount, setAmount] = useState(150);

  const selectedFood = useMemo(
    () => foodLibraryMock.find((food) => food.id === selectedFoodId) ?? foodLibraryMock[0],
    [selectedFoodId]
  );

  const selectedTotals = useMemo(
    () => calculateFoodTotals(selectedFood, amount),
    [selectedFood, amount]
  );

  return (
    <Screen>
      <Header
        title="Diet editor"
        subtitle="Mock do fluxo em que o professor escolhe alimentos e ajusta porcao para recalcular macros."
      />

      <SectionTitle
        title="Food library"
        description="Toque em um alimento para simular a selecao."
      />
      <View style={{ gap: theme.spacing.md }}>
        {foodLibraryMock.slice(0, 6).map((food) => {
          const isSelected = food.id === selectedFoodId;

          return (
            <FoodPickerItem
              key={food.id}
              baseLabel={food.defaultBaseLabel}
              calories={food.calories}
              carbs={food.carbs}
              fat={food.fat}
              name={food.name}
              onPress={() => {
                setSelectedFoodId(food.id);
                setAmount(food.baseUnit === "unit" ? 2 : food.baseAmount);
              }}
              protein={food.protein}
              selected={isSelected}
            />
          );
        })}
      </View>

      <SectionTitle
        title="Portion control"
        description="Simulacao de ajuste em gramas ou quantidade."
      />
      <View style={{ gap: theme.spacing.md }}>
        <Button
          fullWidth={false}
          label={`Reduzir ${selectedFood.baseUnit === "unit" ? "quantidade" : "gramas"}`}
          onPress={() =>
            setAmount((current) =>
              Math.max(selectedFood.baseUnit === "unit" ? 1 : 30, current - (selectedFood.baseUnit === "unit" ? 1 : 25))
            )
          }
          variant="ghost"
        />
        <Button
          fullWidth={false}
          label={`Aumentar ${selectedFood.baseUnit === "unit" ? "quantidade" : "gramas"}`}
          onPress={() =>
            setAmount((current) => current + (selectedFood.baseUnit === "unit" ? 1 : 25))
          }
        />
      </View>

      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
            {selectedFood.name}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Porcao atual: {amount} {selectedFood.baseUnit}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            {selectedTotals.calories.toFixed(0)} kcal /{" "}
            {selectedTotals.carbs.toFixed(1)}C / {selectedTotals.protein.toFixed(1)}P /{" "}
            {selectedTotals.fat.toFixed(1)}G
          </Text>
        </View>
      </Card>

      <SectionTitle
        title="Daily summary"
        description="Preview simples do grafico total de calorias e macros."
      />
      <MacroSummaryCard
        calories={selectedTotals.calories}
        carbs={selectedTotals.carbs}
        fat={selectedTotals.fat}
        note="Preview simples do total recalculado para o alimento selecionado."
        protein={selectedTotals.protein}
        title="Resumo de macros"
      />
    </Screen>
  );
}
