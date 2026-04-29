import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  Button,
  Card,
  ExerciseVideoCard,
  Header,
  MealCard,
  MacroSummaryCard,
  Screen,
  SectionTitle,
  SupplementCard,
  TrainingDayCard,
} from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useMockAuth } from "@/hooks/useMockAuth";
import type { RootStackParamList } from "@/navigation/types";
import { useAppTheme } from "@/theme";

export function CurrentPlanScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const { currentPlan } = useCurrentPlan();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isTeacher = session.accessLevel === "teacher";

  return (
    <Screen>
      <Header
        title="Current plan"
        subtitle="Plano ativo com treino, dieta, suplementacao e totais principais."
      />

      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: theme.typography.subtitle,
              fontWeight: "700",
            }}
          >
            {currentPlan.title}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Vigencia: {currentPlan.startDate} ate {currentPlan.endDate}
          </Text>
        </View>
      </Card>

      <SectionTitle
        title="Training"
        description="Dias configurados no plano atual."
      />
      <View style={{ gap: theme.spacing.md }}>
        {currentPlan.trainingPlan.days.map((day) => (
          <TrainingDayCard day={day} key={day.id} />
        ))}
      </View>

      <SectionTitle
        title="Diet summary"
        description="Totais nutricionais do plano ativo."
      />
      <MacroSummaryCard
        calories={currentPlan.dietPlan.calories}
        carbs={currentPlan.dietPlan.carbs}
        fat={currentPlan.dietPlan.fat}
        note="Totais do plano alimentar atual."
        protein={currentPlan.dietPlan.protein}
        title="Resumo nutricional"
      />

      <SectionTitle
        title="Meals"
        description="Refeicoes atuais do plano alimentar."
      />
      <View style={{ gap: theme.spacing.md }}>
        {currentPlan.dietPlan.meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </View>

      <SectionTitle
        title="Supplementation"
        description="Rotina de suplementos do plano."
      />
      <View style={{ gap: theme.spacing.md }}>
        {currentPlan.dietPlan.supplements.map((supplement) => (
          <SupplementCard key={supplement.id} supplement={supplement} />
        ))}
      </View>

      <SectionTitle
        title="Exercise video"
        description="Preview do padrao visual para exercicios com demonstracao."
      />
      <ExerciseVideoCard
        available
        description="Esse bloco pode abrir o player de video do professor no fluxo final."
        title={currentPlan.trainingPlan.days[0]?.exercises[0]?.exerciseName ?? "Exercicio"}
      />

      {isTeacher ? (
        <View style={{ gap: theme.spacing.md }}>
          <Button
            label="Editar treino atual"
            onPress={() => navigation.navigate("TrainingEditor")}
          />
          <Button
            label="Editar dieta atual"
            onPress={() => navigation.navigate("MealEditor")}
            variant="ghost"
          />
          <Button
            label="Editar suplementacao"
            onPress={() => navigation.navigate("SupplementEditor")}
            variant="ghost"
          />
        </View>
      ) : null}
    </Screen>
  );
}
