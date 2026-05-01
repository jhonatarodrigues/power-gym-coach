import { View } from "react-native";

import { Card, Header, Screen, SectionTitle } from "@/components";
import { assessmentRepository } from "@/repository";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useAppTheme } from "@/theme";
import { formatDateTimeBR } from "@/utils/dates";

export function CoachFeedbacksScreen() {
  const { theme } = useAppTheme();
  const selectedPlan = useCoachContextStore((state) => state.getSelectedPlan());
  const feedbacks = assessmentRepository
    .listReviews()
    .filter((review) => review.planId === selectedPlan?.id);

  return (
    <Screen>
      <Header
        title="Feedbacks do plano"
        subtitle="Mais de um feedback pode existir dentro do mesmo plano."
      />
      <View style={{ gap: theme.spacing.md }}>
        {feedbacks.map((feedback) => (
          <Card key={feedback.id}>
            <View style={{ gap: theme.spacing.sm }}>
              <SectionTitle title={feedback.summary} description={feedback.observations} />
              <SectionTitle
                title="Sugestao"
                description={feedback.suggestedChanges ?? "Sem sugestao adicional registrada."}
              />
              <SectionTitle
                title="Data"
                description={formatDateTimeBR(feedback.reviewedAt)}
              />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
