import { useMemo } from "react";
import { Text, View } from "react-native";
import { Controller, useForm } from "react-hook-form";

import {
  Button,
  Card,
  FoodPickerItem,
  Header,
  MacroSummaryCard,
  Screen,
  SectionTitle,
  TextField,
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

interface DietEditorFormValues {
  selectedFoodId: string;
  amount: string;
}

export function DietEditorScreen() {
  const { theme } = useAppTheme();
  const { control, setValue, watch } = useForm<DietEditorFormValues>({
    defaultValues: {
      selectedFoodId: foodLibraryMock[0]?.id ?? "",
      amount: "150",
    },
  });
  const selectedFoodId = watch("selectedFoodId");
  const amountValue = watch("amount");

  const selectedFood = useMemo(
    () => foodLibraryMock.find((food) => food.id === selectedFoodId) ?? foodLibraryMock[0],
    [selectedFoodId]
  );

  const selectedTotals = useMemo(
    () => calculateFoodTotals(selectedFood, Number(amountValue) || selectedFood.baseAmount),
    [amountValue, selectedFood]
  );

  return (
    <Screen>
      <Header
        title="Diet editor"
        subtitle="Mock do fluxo em que o coach escolhe alimentos e ajusta porcao para recalcular macros."
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
                setValue("selectedFoodId", food.id);
                setValue("amount", String(food.baseUnit === "unit" ? 2 : food.baseAmount));
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
        <Controller
          control={control}
          name="amount"
          render={({ field: { onBlur, onChange, value } }) => (
            <TextField
              hint={`Ajuste em ${selectedFood.baseUnit === "unit" ? "quantidade" : "gramas"} para visualizar o recalculo.`}
              keyboardType="numeric"
              label="Porcao"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>
          <Button
            fullWidth={false}
            label={`Reduzir ${selectedFood.baseUnit === "unit" ? "quantidade" : "gramas"}`}
            onPress={() =>
              setValue(
                "amount",
                String(
                  Math.max(
                    selectedFood.baseUnit === "unit" ? 1 : 30,
                    (Number(amountValue) || selectedFood.baseAmount) -
                      (selectedFood.baseUnit === "unit" ? 1 : 25)
                  )
                )
              )
            }
            variant="ghost"
          />
          <Button
            fullWidth={false}
            label={`Aumentar ${selectedFood.baseUnit === "unit" ? "quantidade" : "gramas"}`}
            onPress={() =>
              setValue(
                "amount",
                String(
                  (Number(amountValue) || selectedFood.baseAmount) +
                    (selectedFood.baseUnit === "unit" ? 1 : 25)
                )
              )
            }
          />
        </View>
      </View>

      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
            {selectedFood.name}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Porcao atual: {amountValue} {selectedFood.baseUnit}
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
