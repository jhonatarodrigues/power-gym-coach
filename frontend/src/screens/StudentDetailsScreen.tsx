import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  AthleteListItem,
  Button,
  DecisionCard,
  Header,
  JourneyTimelineCard,
  PendingAlertCard,
  Screen,
  SectionTitle,
} from "@/components";
import { useStudentJourneyTimeline } from "@/hooks/useStudentJourneyTimeline";
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
  const { latestEvents } = useStudentJourneyTimeline();
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
        status={currentPlanStatus}
      />

      <SectionTitle title="Resumo" description="Contexto rapido do acompanhamento." />
      <DecisionCard
        description={`Restricoes: ${studentProfile.restrictions}`}
        highlight={`Ultimo progresso: ${latestProgress?.weightKg} kg / ${latestProgress?.bodyFatPercentage}% BF`}
        title={currentPlanTitle}
      />

      <SectionTitle
        title="Sinais para decisao"
        description="Pontos que ajudam o professor a decidir o proximo ajuste."
      />
      <View style={{ gap: theme.spacing.md }}>
        <DecisionCard
          badgeLabel="Plano"
          description={`${trainingDaysCount} dias de treino, ${mealsCount} refeicoes e ${supplementsCount} suplementos cadastrados.`}
          title="Estrutura ativa do acompanhamento"
        />
        <DecisionCard
          actionLabel="Abrir avaliacao"
          badgeLabel="Avaliacao"
          description={latestAssessmentSummary ?? "Nenhuma devolutiva registrada."}
          highlight={latestAssessmentSuggestedChanges}
          onActionPress={() => navigation.navigate("Assessment")}
          title="Leitura tecnica mais recente"
        />
        <PendingAlertCard
          actionLabel="Abrir exams"
          count={pendingExamCount}
          description={latestHistory?.title ?? "Nenhum registro recente no historico."}
          onActionPress={() => navigation.navigate("Exams")}
          title="Exames em andamento"
        />
        <DecisionCard
          actionLabel="Ajustar plano atual"
          badgeLabel="Proximo passo"
          description={nextRecommendedAction}
          onActionPress={() =>
            navigation.navigate("TeacherTabs", { screen: "TeacherPlanTab" })
          }
          title="Decisao recomendada"
        />
      </View>

      <SectionTitle
        title="Timeline unificada"
        description="Historico recente consolidando plano, avaliacao, exames e progresso."
      />
      <View style={{ gap: theme.spacing.md }}>
        {latestEvents.map((event) => (
          <JourneyTimelineCard event={event} key={event.id} />
        ))}
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
