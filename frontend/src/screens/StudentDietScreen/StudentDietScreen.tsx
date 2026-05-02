import { Pressable, Text, View } from "react-native";
import { Droplets } from "lucide-react-native";

import {
  Button,
  Card,
  DashboardHero,
  Header,
  MacroSummaryCard,
  MiniBarChart,
  ProgressLineCard,
  Screen,
  SectionTitle,
} from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useStudentDailyDiet } from "@/hooks/useStudentDailyDiet";
import { useAppTheme } from "@/theme";

export function StudentDietScreen() {
  const { theme } = useAppTheme();
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

  return (
    <Screen>
      <Header
        title="Dieta do dia"
        subtitle="Marque o que voce ja consumiu em cada refeicao e acompanhe sua agua."
      />

      <DashboardHero
        accentLabel="Checklist alimentar"
        eyebrow="Dieta"
        stats={[
          { label: "Plano", value: `${currentPlan.dietPlan.calories} kcal` },
          { label: "Consumido", value: `${consumedCalories} kcal` },
          { label: "Restante", value: `${remainingCalories} kcal` },
        ]}
        subtitle="Tela mais limpa para acompanhar refeicoes, hidratar e visualizar progresso sem excesso de caixas."
        title="Leitura do consumo do dia"
      />

      <MacroSummaryCard
        calories={currentPlan.dietPlan.calories}
        carbs={currentPlan.dietPlan.carbs}
        fat={currentPlan.dietPlan.fat}
        note="Totais do plano alimentar atual."
        protein={currentPlan.dietPlan.protein}
        title="Resumo do dia"
      />

      <ProgressLineCard
        currentLabel={`${consumedCalories} kcal`}
        helper="Mostra quanto do plano diario ja foi consumido hoje."
        progress={
          currentPlan.dietPlan.calories > 0
            ? consumedCalories / currentPlan.dietPlan.calories
            : 0
        }
        targetLabel={`${remainingCalories} kcal restantes`}
        title="Execucao alimentar"
      />

      <SectionTitle
        title="Agua do dia"
        description="Meta em litros definida pelo coach."
      />
      <ProgressLineCard
        currentLabel={`${waterIntake.toFixed(1)} L`}
        helper="Meta em litros definida pelo coach."
        progress={waterTarget > 0 ? waterIntake / waterTarget : 0}
        targetLabel={`${Math.max(0, waterTarget - waterIntake).toFixed(1)} L restantes`}
        title="Hidratacao"
        tone="success"
      />
      <Card>
        <View style={{ gap: theme.spacing.md }}>
          <View style={{ alignItems: "center", flexDirection: "row", gap: theme.spacing.sm }}>
            <Droplets color={theme.colors.primary} size={20} />
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
              {waterIntake.toFixed(1)}L de {waterTarget.toFixed(1)}L
            </Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>
            <Button
              fullWidth={false}
              label="Adicionar 250 ml"
              onPress={() => addWater(todayKey, 0.25)}
              size="sm"
            />
            <Button
              fullWidth={false}
              label="Adicionar 500 ml"
              onPress={() => addWater(todayKey, 0.5)}
              size="sm"
              variant="soft"
            />
          </View>
        </View>
      </Card>

      <MiniBarChart
        description="Quantidade de itens marcados em cada refeicao do dia."
        items={meals.map((meal) => ({
          hint: `${meal.items.length} itens`,
          label: meal.sequenceLabel ?? meal.title,
          value: (consumedMealItems[meal.id] ?? []).length,
        }))}
        title="Marcacao por refeicao"
      />

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
