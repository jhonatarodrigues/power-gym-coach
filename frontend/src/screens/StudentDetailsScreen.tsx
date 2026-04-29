import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  AthleteListItem,
  Button,
  Card,
  Header,
  Screen,
  SectionTitle,
} from "@/components";
import { useStudentOverview } from "@/hooks/useStudentOverview";
import type { RootStackParamList } from "@/navigation/types";
import { useAppTheme } from "@/theme";

export function StudentDetailsScreen() {
  const { theme } = useAppTheme();
  const {
    currentPlanStatus,
    currentPlanTitle,
    latestAssessmentSuggestedChanges,
    latestAssessmentSummary,
    latestHistory,
    latestProgress,
    mealsCount,
    nextRecommendedAction,
    pendingExamCount,
    studentProfile,
    studentUser,
    supplementsCount,
    trainingDaysCount,
  } = useStudentOverview();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Screen>
      <Header
        title="Student details"
        subtitle="Visao consolidada do aluno para o professor decidir proximos ajustes."
      />

      <AthleteListItem
        name={studentUser.name}
        focus={studentProfile.goal}
        status="Plano ativo"
      />

      <SectionTitle title="Resumo" description="Contexto rapido do acompanhamento." />
      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.textMuted }}>
            Restricoes: {studentProfile.restrictions}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Plano atual: {currentPlanTitle}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Status do plano: {currentPlanStatus}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Ultimo progresso: {latestProgress?.weightKg} kg /{" "}
            {latestProgress?.bodyFatPercentage}% BF
          </Text>
        </View>
      </Card>

      <SectionTitle
        title="Sinais para decisao"
        description="Pontos que ajudam o professor a decidir o proximo ajuste."
      />
      <View style={{ gap: theme.spacing.md }}>
        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
              Plano atual
            </Text>
            <Text style={{ color: theme.colors.textMuted }}>
              {trainingDaysCount} dias de treino, {mealsCount} refeicoes e{" "}
              {supplementsCount} suplementos cadastrados.
            </Text>
          </View>
        </Card>

        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
              Avaliacao mais recente
            </Text>
            <Text style={{ color: theme.colors.text }}>
              {latestAssessmentSummary}
            </Text>
            {latestAssessmentSuggestedChanges ? (
              <Text style={{ color: theme.colors.textMuted }}>
                Proxima direcao: {latestAssessmentSuggestedChanges}
              </Text>
            ) : null}
          </View>
        </Card>

        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
              Exames e historico
            </Text>
            <Text style={{ color: theme.colors.textMuted }}>
              Exames em andamento: {pendingExamCount}
            </Text>
            <Text style={{ color: theme.colors.textMuted }}>
              Ultimo registro: {latestHistory?.title ?? "Nenhum registro recente"}
            </Text>
          </View>
        </Card>

        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
              Proximo passo sugerido
            </Text>
            <Text style={{ color: theme.colors.textMuted }}>
              {nextRecommendedAction}
            </Text>
          </View>
        </Card>
      </View>

      <SectionTitle
        title="Acoes rapidas"
        description="Centro operacional do professor para agir a partir do contexto do aluno."
      />
      <View style={{ gap: theme.spacing.md }}>
        <Button
          label="Ajustar plano atual"
          onPress={() =>
            navigation.navigate("TeacherTabs", { screen: "TeacherPlanTab" })
          }
        />
        <Button
          label="Editar dieta"
          onPress={() => navigation.navigate("MealEditor")}
          variant="ghost"
        />
        <Button
          label="Revisar progresso"
          onPress={() =>
            navigation.navigate("TeacherTabs", { screen: "TeacherHistoryTab" })
          }
          variant="ghost"
        />
        <Button
          label="Abrir avaliacao"
          onPress={() => navigation.navigate("Assessment")}
          variant="ghost"
        />
        <Button
          label="Abrir exams"
          onPress={() => navigation.navigate("Exams")}
          variant="ghost"
        />
        <Button
          label="Abrir historico"
          onPress={() =>
            navigation.navigate("TeacherTabs", { screen: "TeacherHistoryTab" })
          }
          variant="ghost"
        />
      </View>
    </Screen>
  );
}
