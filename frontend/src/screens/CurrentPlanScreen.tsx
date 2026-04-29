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
import { usePlanReview } from "@/hooks/usePlanReview";
import type { RootStackParamList } from "@/navigation/types";
import { useAppTheme } from "@/theme";

export function CurrentPlanScreen() {
  const { theme } = useAppTheme();
  const { session } = useMockAuth();
  const {
    currentPlan,
    discardCurrentPlanChanges,
    hasUnsavedChanges,
    lastSavedAt,
    saveCurrentPlan,
  } = useCurrentPlan();
  const {
    changedSectionCount,
    changedSections,
    mealChanges,
    supplementChanges,
    trainingChanges,
  } = usePlanReview();
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
          <Text style={{ color: theme.colors.textMuted }}>
            Ultimo salvamento: {lastSavedAt.slice(0, 16).replace("T", " ")}
          </Text>
        </View>
      </Card>

      {isTeacher ? (
        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <Text
              style={{
                color: hasUnsavedChanges
                  ? theme.colors.primary
                  : theme.colors.textMuted,
                fontWeight: "700",
              }}
            >
              {hasUnsavedChanges
                ? "Voce possui alteracoes nao salvas no plano atual."
                : "Plano atual sincronizado com a ultima versao salva."}
            </Text>
            <View style={{ gap: theme.spacing.sm }}>
              <Button
                label="Salvar alteracoes do plano"
                onPress={saveCurrentPlan}
              />
              <Button
                disabled={!hasUnsavedChanges}
                label="Descartar alteracoes"
                onPress={discardCurrentPlanChanges}
                variant="ghost"
              />
            </View>
          </View>
        </Card>
      ) : null}

      {isTeacher ? (
        <>
          <SectionTitle
            title="Review before save"
            description="Leitura rapida do que mudou no rascunho atual."
          />
          <View style={{ gap: theme.spacing.md }}>
            <Card>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                  Secoes alteradas
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  {hasUnsavedChanges
                    ? `${changedSectionCount} secoes com mudancas: ${changedSections.join(", ")}.`
                    : "Nenhuma secao alterada desde o ultimo salvamento."}
                </Text>
              </View>
            </Card>

            <Card>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                  Impacto do rascunho
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  Treino: {trainingChanges} sinais de alteracao
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  Dieta: {mealChanges} sinais de alteracao
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  Suplementacao: {supplementChanges} sinais de alteracao
                </Text>
              </View>
            </Card>
          </View>
        </>
      ) : null}

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
          <Button
            label="Revisar avaliacao atual"
            onPress={() => navigation.navigate("Assessment")}
            variant="ghost"
          />
          <Button
            label="Abrir historico do aluno"
            onPress={() =>
              navigation.navigate("TeacherTabs", { screen: "TeacherHistoryTab" })
            }
            variant="ghost"
          />
        </View>
      ) : null}
    </Screen>
  );
}
