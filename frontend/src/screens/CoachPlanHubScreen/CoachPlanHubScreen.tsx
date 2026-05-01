import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  Button,
  DashboardHero,
  Header,
  MiniBarChart,
  ProgressLineCard,
  Screen,
  SectionTitle,
} from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import type { RootStackParamList } from "@/navigation/types";
import { assessmentRepository } from "@/repository";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useAppTheme } from "@/theme";
import { formatDateBR } from "@/utils/dates";

export function CoachPlanHubScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selectedStudent = useCoachContextStore((state) => state.getSelectedStudent());
  const selectedPlan = useCoachContextStore((state) => state.getSelectedPlan());
  const { currentPlan } = useCurrentPlan();
  const feedbackCount = assessmentRepository
    .listReviews()
    .filter((review) => review.planId === selectedPlan?.id).length;

  if (!selectedStudent || !selectedPlan) {
    return null;
  }

  return (
    <Screen>
      <Header
        title={selectedPlan.title}
        subtitle={`${selectedStudent.user.name} • ${formatDateBR(selectedPlan.startDate)} a ${formatDateBR(selectedPlan.endDate)}`}
      />

      <DashboardHero
        accentLabel={selectedPlan.status === "active" ? "Plano ativo" : "Plano em rascunho"}
        eyebrow="Plano"
        stats={[
          { label: "Refeicoes", value: String(currentPlan.dietPlan.meals.length) },
          { label: "Dias treino", value: String(currentPlan.trainingPlan.days.length) },
          { label: "Feedbacks", value: String(feedbackCount) },
        ]}
        subtitle="A stack principal continua: aluno, plano, dieta, treino, feedback e conversa."
        title="Hub do plano do aluno"
      />

      <ProgressLineCard
        currentLabel={`${currentPlan.trainingPlan.days.length + currentPlan.dietPlan.meals.length}`}
        helper="Soma dos pontos operacionais principais deste plano para orientar a proxima acao."
        progress={Math.min(
          1,
          (currentPlan.trainingPlan.days.length + currentPlan.dietPlan.meals.length + feedbackCount) /
            12
        )}
        targetLabel="blocos monitorados"
        title="Complexidade do ciclo"
      />

      <MiniBarChart
        description="Panorama resumido do que compoe o plano atual do aluno."
        items={[
          { label: "Dieta", value: currentPlan.dietPlan.meals.length, hint: "ref." },
          { label: "Treino", value: currentPlan.trainingPlan.days.length, hint: "dias" },
          { label: "Feedb.", value: feedbackCount, hint: "hist." },
        ]}
        title="Composicao do plano"
      />

      <View style={{ gap: theme.spacing.sm }}>
        <Button
          label={`Dieta (${currentPlan.dietPlan.meals.length} refeicoes)`}
          onPress={() => navigation.navigate("MealEditor")}
        />
        <Button
          label={`Treino (${currentPlan.trainingPlan.days.length} dias)`}
          onPress={() => navigation.navigate("TrainingEditor")}
          variant="ghost"
        />
        <Button
          label={`Feedbacks (${feedbackCount})`}
          onPress={() => navigation.navigate("CoachFeedbacks")}
          variant="ghost"
        />
        <Button
          label="Mensagens com o aluno"
          onPress={() => navigation.navigate("Messages")}
          variant="ghost"
        />
      </View>

      <SectionTitle
        title="Resumo rapido"
        description="Leitura objetiva para decidir o proximo ajuste do ciclo."
      />

      <View style={{ gap: theme.spacing.md }}>
        <ProgressLineCard
          currentLabel={`${currentPlan.dietPlan.calories} kcal`}
          helper={`${currentPlan.dietPlan.waterLitersTarget.toFixed(1)} L de agua alvo neste ciclo.`}
          progress={Math.min(1, currentPlan.dietPlan.calories / 2500)}
          targetLabel="carga nutricional"
          title="Dieta"
        />
        <ProgressLineCard
          currentLabel={`${currentPlan.trainingPlan.days.length} dias`}
          helper="Dias ja configurados no plano ativo."
          progress={Math.min(1, currentPlan.trainingPlan.days.length / 7)}
          targetLabel="semana coberta"
          title="Treino"
          tone="warning"
        />
        <ProgressLineCard
          currentLabel={`${feedbackCount} retorno(s)`}
          helper="Quantidade de devolutivas registradas neste plano."
          progress={Math.min(1, feedbackCount / 4)}
          targetLabel="feedbacks no ciclo"
          title="Feedback"
          tone="success"
        />
      </View>
    </Screen>
  );
}
