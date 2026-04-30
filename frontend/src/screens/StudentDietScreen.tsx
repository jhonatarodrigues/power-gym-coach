import { Pressable, Text, View } from "react-native";
import { Droplets } from "lucide-react-native";

import { Button, Card, Header, MacroSummaryCard, Screen, SectionTitle } from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useStudentDailyDiet } from "@/hooks/useStudentDailyDiet";
import { useAppTheme } from "@/theme";

export function StudentDietScreen() {
  const { theme } = useAppTheme();
  const { currentPlan } = useCurrentPlan();
  const {
    addWater,
    consumedMealItems,
    meals,
    todayKey,
    toggleMealItem,
    waterIntake,
    waterTarget,
  } = useStudentDailyDiet();

  return (
    <Screen>
      <Header
        title="Dieta do dia"
        subtitle="Marque o que voce ja consumiu em cada refeicao e acompanhe sua agua."
      />

      <MacroSummaryCard
        calories={currentPlan.dietPlan.calories}
        carbs={currentPlan.dietPlan.carbs}
        fat={currentPlan.dietPlan.fat}
        note="Totais do plano alimentar atual."
        protein={currentPlan.dietPlan.protein}
        title="Resumo do dia"
      />

      <SectionTitle
        title="Agua do dia"
        description="Meta em litros definida pelo professor."
      />
      <Card>
        <View style={{ gap: theme.spacing.md }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
            <Droplets color={theme.colors.primary} size={20} />
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
              {waterIntake.toFixed(1)}L de {waterTarget.toFixed(1)}L
            </Text>
          </View>
          <View style={{ gap: theme.spacing.sm }}>
            <Button label="Adicionar 250 ml" onPress={() => addWater(todayKey, 0.25)} />
            <Button
              label="Adicionar 500 ml"
              onPress={() => addWater(todayKey, 0.5)}
              variant="ghost"
            />
          </View>
        </View>
      </Card>

      <SectionTitle
        title="Refeicoes"
        description="Separadas por refeicao para facilitar o acompanhamento do aluno."
      />
      <View style={{ gap: theme.spacing.md }}>
        {meals.map((meal) => (
          <Card key={meal.id}>
            <View style={{ gap: theme.spacing.md }}>
              <View style={{ gap: theme.spacing.xs }}>
                <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                  {meal.sequenceLabel ?? meal.title}
                </Text>
                <Text style={{ color: theme.colors.text, fontWeight: "700" }}>{meal.title}</Text>
                <Text style={{ color: theme.colors.textMuted }}>{meal.observation}</Text>
              </View>

              <View style={{ gap: theme.spacing.sm }}>
                {meal.items.map((item) => {
                  const checked = (consumedMealItems[meal.id] ?? []).includes(item.id);

                  return (
                    <Pressable
                      key={item.id}
                      onPress={() => toggleMealItem(meal.id, item.id)}
                      style={{
                        backgroundColor: checked
                          ? theme.colors.primary + "22"
                          : theme.colors.inputBackground,
                        borderColor: checked ? theme.colors.primary : theme.colors.border,
                        borderRadius: theme.radius.md,
                        borderWidth: 1,
                        padding: theme.spacing.md,
                      }}
                    >
                      <Text
                        style={{
                          color: theme.colors.text,
                          fontWeight: "700",
                          textDecorationLine: checked ? "line-through" : "none",
                        }}
                      >
                        {item.foodName}
                      </Text>
                      <Text style={{ color: theme.colors.textMuted }}>
                        {item.amount}
                        {item.unit} · {item.calories} kcal
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
