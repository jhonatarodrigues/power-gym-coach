import { Text, View } from "react-native";

import type { Meal } from "@/types";
import { useAppTheme } from "@/theme";

interface MealPlanSectionProps {
  meal: Meal;
}

export function MealPlanSection({ meal }: MealPlanSectionProps) {
  const { theme } = useAppTheme();

  return (
    <View
      style={{
        backgroundColor: theme.colors.surface,
        borderColor: "rgba(255,255,255,0.06)",
        borderRadius: 20,
        borderWidth: 1,
        gap: 14,
        padding: 16,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: 4 }}>
          <Text style={{ color: theme.colors.primary, fontSize: 11.5, fontWeight: "700" }}>
            {meal.sequenceLabel ?? "Refeição"}
          </Text>
          <Text style={{ color: theme.colors.text, fontSize: 15, fontWeight: "700" }}>{meal.title}</Text>
        </View>
        <Text style={{ color: theme.colors.text, fontSize: 13, fontWeight: "700" }}>
          {meal.calories} kcal
        </Text>
      </View>

      {meal.observation ? (
        <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>{meal.observation}</Text>
      ) : null}

      <View style={{ gap: 10 }}>
        {meal.items.map((item) => (
          <View
            key={item.id}
            style={{
              borderTopColor: "rgba(255,255,255,0.06)",
              borderTopWidth: 1,
              flexDirection: "row",
              gap: 12,
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ color: theme.colors.text, fontSize: 13.5, fontWeight: "600" }}>
                {item.foodName}
              </Text>
              <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>
                {item.amount} {item.unit}
              </Text>
              {item.observation ? (
                <Text style={{ color: theme.colors.textMuted, fontSize: 12 }}>{item.observation}</Text>
              ) : null}
            </View>
            <Text style={{ color: theme.colors.text, fontSize: 12.5 }}>{item.calories} kcal</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
