import { Text, View } from "react-native";

import { Card, DashboardHero, Header, Screen, SectionTitle } from "@/components";
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

      <DashboardHero
        accentLabel={feedbacks.length > 0 ? "Histórico do plano" : "Sem devolutivas ainda"}
        eyebrow="Feedbacks"
        stats={[
          { label: "Itens", value: String(feedbacks.length) },
          { label: "Plano", value: selectedPlan ? "1" : "0" },
          { label: "Coach", value: "ativo" },
        ]}
        subtitle="As devolutivas do plano devem ficar agrupadas no mesmo contexto do ciclo do aluno."
        title="Leitura consolidada dos retornos"
      />

      {feedbacks.length > 0 ? (
        <Card>
          <View style={{ alignItems: "center", gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: "700" }}>
              {feedbacks.length}
            </Text>
            <Text style={{ color: theme.colors.textMuted, textAlign: "center" }}>
              devolutiva(s) registrada(s) dentro deste plano.
            </Text>
          </View>
        </Card>
      ) : null}

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
