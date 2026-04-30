import { Text, View } from "react-native";

import type { Meal } from "@/types";
import { useAppTheme } from "@/theme";

import { Card } from "@/components/Card";

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  const { theme } = useAppTheme();

  return (
    <Card>
      <View style={{ gap: theme.spacing.md }}>
        <View style={{ gap: theme.spacing.sm }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.body,
              fontWeight: "700",
            }}
          >
            {meal.title}
          </Text>
          {meal.observation ? (
            <Text style={{ color: theme.colors.textMuted }}>{meal.observation}</Text>
          ) : null}
        </View>

        <View style={{ gap: theme.spacing.sm }}>
          {meal.items.map((item) => (
            <View
              key={item.id}
              style={{
                alignItems: "center",
                borderBottomColor: theme.colors.border,
                borderBottomWidth: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingBottom: theme.spacing.sm,
              }}
            >
              <View style={{ flex: 1, gap: theme.spacing.xs }}>
                <Text style={{ color: theme.colors.text, fontWeight: "600" }}>
                  {item.foodName}
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  {item.amount} {item.unit}
                </Text>
              </View>
              <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                {item.calories.toFixed(0)} kcal
              </Text>
            </View>
          ))}
        </View>

        <Text style={{ color: theme.colors.textMuted }}>
          Totais: {meal.calories.toFixed(0)} kcal / {meal.carbs.toFixed(1)}C /{" "}
          {meal.protein.toFixed(1)}P / {meal.fat.toFixed(1)}G
        </Text>
      </View>
    </Card>
  );
}
