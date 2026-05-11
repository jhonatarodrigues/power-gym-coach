import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Apple, ChartColumn, Ellipsis, House, Menu, MessageSquare, Dumbbell } from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  FoodCheckRow,
  MealProgressRow,
  WaterDropProgress,
} from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useStudentDailyDiet } from "@/hooks/useStudentDailyDiet";
import { useAppTheme } from "@/theme";

export function StudentDietScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const { currentPlan } = useCurrentPlan();
  const {
    addWater,
    consumedCalories,
    consumedMealItems,
    meals,
    remainingCalories,
    todayKey,
    toggleMealItem,
    waterIntake,
    waterTarget,
  } = useStudentDailyDiet();

  const lunchMeal = meals[1] ?? meals[0];

  return (
    <AppChrome
      footer={
        <AppBottomNav
          items={[
            {
              key: "dashboard",
              label: "Dashboard",
              icon: <House color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentHome" as never),
            },
            {
              key: "workout",
              label: "Treino",
              icon: <Dumbbell color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentWorkout" as never),
            },
            {
              key: "diet",
              label: "Dieta",
              active: true,
              icon: <Apple color={theme.colors.primary} size={21} strokeWidth={2.1} />,
            },
            {
              key: "progress",
              label: "Progresso",
              icon: <ChartColumn color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentProgress" as never),
            },
            {
              key: "more",
              label: "Mais",
              icon: <Menu color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("StudentMessages" as never),
            },
          ]}
        />
      }
    >
      <AppTopBar
        onBackPress={() => navigation.goBack()}
        onContextPress={() => null}
        showAvatar={false}
        showBack
        showBell={false}
        showContextMenu
        subtitle="Sexta-feira, 09/05/2026"
        title="Dieta do dia"
      />

      <View style={{ flexDirection: "row", gap: 10 }}>
        {[
          { label: "Meta", value: `${currentPlan.dietPlan.calories.toLocaleString("pt-BR")} kcal`, tone: theme.colors.text },
          { label: "Consumidas", value: `${consumedCalories.toLocaleString("pt-BR")} kcal`, tone: theme.colors.success },
          { label: "Restantes", value: `${remainingCalories.toLocaleString("pt-BR")} kcal`, tone: theme.colors.primary },
        ].map((item) => (
          <View
            key={item.label}
            style={{
              backgroundColor: theme.colors.surface,
              borderColor: "rgba(255,255,255,0.06)",
              borderRadius: 18,
              borderWidth: 1,
              flex: 1,
              gap: 10,
              padding: 14,
            }}
          >
            <Text style={{ color: theme.colors.textMuted, fontSize: 11.5 }}>{item.label}</Text>
            <Text style={{ color: item.tone, fontSize: 18, fontWeight: "700" }}>{item.value}</Text>
          </View>
        ))}
      </View>

      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: "rgba(255,255,255,0.06)",
          borderRadius: 22,
          borderWidth: 1,
          gap: 16,
          padding: 16,
        }}
      >
        <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "600" }}>
          Distribuição de refeições
        </Text>
        {meals.map((meal) => {
          const consumedIds = consumedMealItems[meal.id] ?? [];
          const mealConsumed = meal.items.reduce(
            (total, item) => total + (consumedIds.includes(item.id) ? item.calories : 0),
            0
          );

          return (
            <MealProgressRow
              consumed={mealConsumed}
              key={meal.id}
              label={`${meal.sequenceLabel} - ${meal.title}`}
              total={meal.calories}
            />
          );
        })}
      </View>

      {lunchMeal ? (
        <View
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: "rgba(255,255,255,0.06)",
            borderRadius: 22,
            borderWidth: 1,
            gap: 14,
            padding: 16,
          }}
        >
          <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "600" }}>
            Alimentos - {lunchMeal.title}
          </Text>
          <View style={{ gap: 8 }}>
            {lunchMeal.items.map((item) => (
              <FoodCheckRow
                calories={item.calories}
                checked={(consumedMealItems[lunchMeal.id] ?? []).includes(item.id)}
                key={item.id}
                label={`${item.foodName} (${item.amount}${item.unit})`}
                onPress={() => toggleMealItem(lunchMeal.id, item.id)}
              />
            ))}
          </View>
        </View>
      ) : null}

      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: "rgba(255,255,255,0.06)",
          borderRadius: 22,
          borderWidth: 1,
          gap: 12,
          padding: 16,
        }}
      >
        <WaterDropProgress consumedLiters={waterIntake} targetLiters={waterTarget} />
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Pressable
            onPress={() => addWater(todayKey, 0.25)}
            style={{
              backgroundColor: theme.colors.primary,
              borderRadius: theme.radius.pill,
              paddingHorizontal: 14,
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: "#111", fontSize: 12, fontWeight: "700" }}>+250 ml</Text>
          </Pressable>
          <Pressable
            onPress={() => addWater(todayKey, 0.5)}
            style={{
              backgroundColor: theme.colors.surfaceAlt,
              borderColor: "rgba(255,255,255,0.08)",
              borderRadius: theme.radius.pill,
              borderWidth: 1,
              paddingHorizontal: 14,
              paddingVertical: 10,
            }}
          >
            <Text style={{ color: theme.colors.text, fontSize: 12, fontWeight: "600" }}>+500 ml</Text>
          </Pressable>
        </View>
      </View>
    </AppChrome>
  );
}
