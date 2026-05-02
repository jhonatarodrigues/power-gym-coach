import { useMemo, useState } from "react";
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
import { formatDateBR } from "@/utils/dates";

export function StudentDetailsScreen() {
  const { theme } = useAppTheme();
  const {
    currentPlanStatus,
    currentPlanTitle,
    latestAssessmentSuggestedChanges,
    latestAssessmentSummary,
    latestArchivedPlan,
    latestHistory,
    latestProgress,
    mealsCount,
    nextRecommendedAction,
    pendingExamCount,
    planDecisionSummary,
    archivedPlansCount,
    currentPlanEndDate,
    currentPlanStartDate,
    operationalSnapshot,
    studentProfile,
    studentUser,
    supplementsCount,
    trainingDaysCount,
  } = useStudentOverview();
  const { countsByDomain, highPriorityEvents, latestEvents, pendingEvents } =
    useStudentJourneyTimeline();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeFilter, setActiveFilter] = useState<
      "all" | "assessment" | "exam" | "progress" | "history" | "plan"
  >("all");
  const filteredEvents = useMemo(
    () =>
      activeFilter === "all"
        ? latestEvents
        : latestEvents.filter((event) => event.domain === activeFilter),
    [activeFilter, latestEvents]
  );

  return (
    <Screen>
      <Header
        title="Acompanhamento do aluno"
        subtitle="Visao consolidada do aluno para o coach decidir os proximos passos do plano."
      />

      <AthleteListItem
        name={studentUser.name}
        focus={studentProfile.goal}
        status={currentPlanStatus}
      />

      <SectionTitle title="Resumo" description="Contexto rapido do acompanhamento." />
      <DecisionCard
        description={`${planDecisionSummary} Restricoes: ${studentProfile.restrictions}`}
        highlight={`Ultimo progresso: ${latestProgress?.weightKg} kg / ${latestProgress?.bodyFatPercentage}% BF`}
        title={currentPlanTitle}
      />
      <DecisionCard
        badgeLabel="Snapshot"
        description={operationalSnapshot}
        highlight={`Status do plano: ${currentPlanStatus}`}
        title="Resumo operacional"
      />

      <SectionTitle
        title="Plano atual do aluno"
        description="Treino, dieta e suplementacao do plano ativo ficam sempre vinculados a este aluno."
      />
      <View style={{ gap: theme.spacing.md }}>
        <DecisionCard
          actionLabel="Abrir plano atual"
          badgeLabel={currentPlanStatus}
          description={`Vigencia de ${formatDateBR(currentPlanStartDate)} ate ${formatDateBR(currentPlanEndDate)}.`}
          highlight={`${trainingDaysCount} dias de treino, ${mealsCount} refeicoes e ${supplementsCount} suplementos ativos.`}
          onActionPress={() => navigation.navigate("CoachPlanHub")}
          title={currentPlanTitle}
        />
        <DecisionCard
          badgeLabel="Historico"
          description={`${archivedPlansCount} plano(s) anterior(es) arquivado(s) para consulta.`}
          highlight={
            latestArchivedPlan
              ? `Ultimo encerrado: ${latestArchivedPlan.title} ate ${formatDateBR(latestArchivedPlan.endDate)}`
              : "Nenhum plano anterior arquivado."
          }
          title="Historico de planos"
        />
      </View>

      <SectionTitle
        title="Sinais para decisao"
        description="Pontos que ajudam o coach a decidir o proximo ajuste."
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
          actionLabel="Abrir exames"
          count={pendingExamCount}
          description={latestHistory?.title ?? "Nenhum registro recente no historico."}
          onActionPress={() => navigation.navigate("Exams")}
          title="Exames em andamento"
        />
        <PendingAlertCard
          actionLabel="Mostrar timeline completa"
          count={pendingEvents.length}
          description={`${highPriorityEvents.length} eventos em alta prioridade aguardam decisao.`}
          onActionPress={() => setActiveFilter("all")}
          title="Pendencias da jornada"
        />
        <DecisionCard
          actionLabel="Ajustar plano atual"
          badgeLabel="Proximo passo"
          description={nextRecommendedAction}
          onActionPress={() => navigation.navigate("CoachPlanHub")}
          title="Decisao recomendada"
        />
      </View>

      <SectionTitle
        title="Timeline unificada"
        description="Historico recente consolidando plano, avaliacao, exames e progresso."
      />
      <Text style={{ color: theme.colors.textMuted }}>
        Filtro atual: {activeFilter === "all" ? "Tudo" : activeFilter}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.spacing.sm,
        }}
      >
        <Button
          label={`Tudo (${latestEvents.length})`}
          fullWidth={false}
          onPress={() => setActiveFilter("all")}
          size="sm"
          variant={activeFilter === "all" ? "primary" : "soft"}
        />
        <Button
          label={`Avaliacao (${countsByDomain.assessment ?? 0})`}
          fullWidth={false}
          onPress={() => setActiveFilter("assessment")}
          size="sm"
          variant={activeFilter === "assessment" ? "primary" : "soft"}
        />
        <Button
          label={`Exames (${countsByDomain.exam ?? 0})`}
          fullWidth={false}
          onPress={() => setActiveFilter("exam")}
          size="sm"
          variant={activeFilter === "exam" ? "primary" : "soft"}
        />
        <Button
          label={`Progresso (${countsByDomain.progress ?? 0})`}
          fullWidth={false}
          onPress={() => setActiveFilter("progress")}
          size="sm"
          variant={activeFilter === "progress" ? "primary" : "soft"}
        />
        <Button
          label={`Historico (${countsByDomain.history ?? 0})`}
          fullWidth={false}
          onPress={() => setActiveFilter("history")}
          size="sm"
          variant={activeFilter === "history" ? "primary" : "soft"}
        />
        <Button
          label={`Plano (${countsByDomain.plan ?? 0})`}
          fullWidth={false}
          onPress={() => setActiveFilter("plan")}
          size="sm"
          variant={activeFilter === "plan" ? "primary" : "soft"}
        />
      </View>
      <View style={{ gap: theme.spacing.md }}>
        {filteredEvents.map((event) => (
          <JourneyTimelineCard event={event} key={event.id} />
        ))}
      </View>

      <SectionTitle
        title="Acoes rapidas"
        description="Centro operacional do coach para agir a partir do contexto do aluno."
      />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.spacing.sm,
        }}
      >
        <Button
          fullWidth={false}
          label="Ajustar plano atual"
          onPress={() => navigation.navigate("CoachPlanHub")}
          size="sm"
        />
        <Button
          fullWidth={false}
          label="Editar dieta"
          onPress={() => navigation.navigate("MealEditor")}
          size="sm"
          variant="soft"
        />
        <Button
          fullWidth={false}
          label="Revisar progresso"
          onPress={() => navigation.navigate("CoachStudentPlans")}
          size="sm"
          variant="soft"
        />
        <Button
          fullWidth={false}
          label="Abrir avaliacao"
          onPress={() => navigation.navigate("Assessment")}
          size="sm"
          variant="soft"
        />
        <Button
          fullWidth={false}
          label="Abrir exames"
          onPress={() => navigation.navigate("Exams")}
          size="sm"
          variant="soft"
        />
        <Button
          fullWidth={false}
          label="Abrir historico"
          onPress={() => navigation.navigate("CoachStudentPlans")}
          size="sm"
          variant="soft"
        />
      </View>
    </Screen>
  );
}
