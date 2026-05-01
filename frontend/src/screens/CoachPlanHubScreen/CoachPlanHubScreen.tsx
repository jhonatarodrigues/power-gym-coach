import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, Card, Header, Screen, SectionTitle } from "@/components";
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

      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <SectionTitle
            title="Estrutura do plano"
            description="A partir daqui o coach entra em dieta, treino, feedbacks e conversa."
          />
          <View style={{ gap: theme.spacing.xs }}>
            <Button label={`Dieta (${currentPlan.dietPlan.meals.length} refeicoes)`} onPress={() => navigation.navigate("MealEditor")} />
            <Button label={`Treino (${currentPlan.trainingPlan.days.length} dias)`} onPress={() => navigation.navigate("TrainingEditor")} variant="ghost" />
            <Button label={`Feedbacks (${feedbackCount})`} onPress={() => navigation.navigate("CoachFeedbacks")} variant="ghost" />
            <Button label="Mensagens com o aluno" onPress={() => navigation.navigate("Messages")} variant="ghost" />
          </View>
        </View>
      </Card>

      <SectionTitle
        title="Resumo rapido"
        description="Leitura objetiva para decidir o proximo ajuste do ciclo."
      />

      <View style={{ gap: theme.spacing.md }}>
        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <SectionTitle title="Dieta" description={`${currentPlan.dietPlan.calories} kcal e ${currentPlan.dietPlan.waterLitersTarget.toFixed(1)}L de agua alvo.`} />
          </View>
        </Card>
        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <SectionTitle title="Treino" description={`${currentPlan.trainingPlan.days.length} dias configurados no plano ativo.`} />
          </View>
        </Card>
        <Card>
          <View style={{ gap: theme.spacing.sm }}>
            <SectionTitle title="Feedback" description={`${feedbackCount} devolutiva(s) registradas neste plano.`} />
          </View>
        </Card>
      </View>
    </Screen>
  );
}
