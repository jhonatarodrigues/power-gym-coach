import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  Button,
  Card,
  DecisionCard,
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
    nutritionDelta,
    saveReadinessDescription,
    saveReadinessLabel,
    sectionDiffs,
    supplementChanges,
    trainingChanges,
  } = usePlanReview();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isTeacher = session.accessLevel === "teacher";

  return (
    <Screen>
      <Header
        title="Plano atual"
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
            <Text style={{ color: theme.colors.textMuted }}>
              {hasUnsavedChanges
                ? "Revise as secoes alteradas e o impacto nutricional antes de salvar."
                : "Nenhuma diferenca entre a versao ativa e a ultima salva."}
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
            title="Revisao antes de salvar"
            description="Leitura rapida do que mudou no rascunho atual."
          />
          <View style={{ gap: theme.spacing.md }}>
            <DecisionCard
              badgeLabel={saveReadinessLabel}
              description={saveReadinessDescription}
              highlight={`Ultimo salvamento em ${lastSavedAt.slice(0, 16).replace("T", " ")}`}
              title="Estado de publicacao do plano"
            />
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
                <Text style={{ color: theme.colors.textMuted }}>
                  Calorias: {nutritionDelta.calories >= 0 ? "+" : ""}
                  {nutritionDelta.calories.toFixed(1)} kcal
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  Carboidratos: {nutritionDelta.carbs >= 0 ? "+" : ""}
                  {nutritionDelta.carbs.toFixed(1)} g
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  Proteinas: {nutritionDelta.protein >= 0 ? "+" : ""}
                  {nutritionDelta.protein.toFixed(1)} g
                </Text>
                <Text style={{ color: theme.colors.textMuted }}>
                  Gorduras: {nutritionDelta.fat >= 0 ? "+" : ""}
                  {nutritionDelta.fat.toFixed(1)} g
                </Text>
              </View>
            </Card>

            <Card>
              <View style={{ gap: theme.spacing.sm }}>
                <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                  Diffs por secao
                </Text>
                {sectionDiffs.map((section) => (
                  <View key={section.id} style={{ gap: theme.spacing.xs }}>
                    <Text style={{ color: theme.colors.text, fontWeight: "700" }}>
                      {section.title}
                    </Text>
                    <Text style={{ color: theme.colors.textMuted }}>
                      {section.summary}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        </>
      ) : null}

      <SectionTitle
        title="Treino"
        description="Dias configurados no plano atual."
      />
      <View style={{ gap: theme.spacing.md }}>
        {currentPlan.trainingPlan.days.map((day) => (
          <TrainingDayCard day={day} key={day.id} />
        ))}
      </View>

      <SectionTitle
        title="Resumo da dieta"
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
        title="Refeicoes"
        description="Refeicoes atuais do plano alimentar."
      />
      <View style={{ gap: theme.spacing.md }}>
        {currentPlan.dietPlan.meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </View>

      <SectionTitle
        title="Suplementacao"
        description="Rotina de suplementos do plano."
      />
      <View style={{ gap: theme.spacing.md }}>
        {currentPlan.dietPlan.supplements.map((supplement) => (
          <SupplementCard key={supplement.id} supplement={supplement} />
        ))}
      </View>

      <SectionTitle
        title="Video do exercicio"
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
              navigation.navigate("TeacherTabs", { screen: "TeacherHistory" })
            }
            variant="ghost"
          />
        </View>
      ) : null}
    </Screen>
  );
}
