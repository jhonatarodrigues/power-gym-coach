import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowUpRight } from "lucide-react-native";

import {
  Button,
  Card,
  DashboardHero,
  Header,
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

      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        {[
          { label: "Refeições", value: String(currentPlan.dietPlan.meals.length) },
          { label: "Dias treino", value: String(currentPlan.trainingPlan.days.length) },
          { label: "Feedbacks", value: String(feedbackCount) },
        ].map((item) => (
          <Card key={item.label}>
            <View
              style={{
                alignItems: "center",
                gap: theme.spacing.xs,
              }}
            >
              <Text
                style={{
                  color: theme.colors.text,
                  fontSize: 22,
                  fontWeight: "700",
                  textAlign: "center",
                }}
              >
                {item.value}
              </Text>
              <Text
                style={{
                  color: theme.colors.textMuted,
                  fontSize: theme.typography.caption,
                  textAlign: "center",
                }}
              >
                {item.label}
              </Text>
            </View>
          </Card>
        ))}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: theme.spacing.sm,
        }}
      >
        <Button
          label={`Dieta (${currentPlan.dietPlan.meals.length} refeicoes)`}
          fullWidth={false}
          onPress={() => navigation.navigate("MealEditor")}
          rightIcon={<ArrowUpRight color="#0B0B0B" size={14} />}
          size="sm"
        />
        <Button
          label={`Treino (${currentPlan.trainingPlan.days.length} dias)`}
          fullWidth={false}
          onPress={() => navigation.navigate("TrainingEditor")}
          rightIcon={<ArrowUpRight color={theme.colors.primary} size={14} />}
          size="sm"
          variant="soft"
        />
        <Button
          label={`Feedbacks (${feedbackCount})`}
          fullWidth={false}
          onPress={() => navigation.navigate("CoachFeedbacks")}
          rightIcon={<ArrowUpRight color={theme.colors.primary} size={14} />}
          size="sm"
          variant="soft"
        />
        <Button
          label="Mensagens com o aluno"
          fullWidth={false}
          onPress={() => navigation.navigate("Messages")}
          rightIcon={<ArrowUpRight color={theme.colors.primary} size={14} />}
          size="sm"
          variant="soft"
        />
      </View>

      <SectionTitle
        title="Resumo rapido"
        description="Leitura objetiva para decidir o proximo ajuste do ciclo."
      />

      <View style={{ gap: theme.spacing.md }}>
        <Card>
          <View style={{ alignItems: "center", gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>Dieta</Text>
            <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: "700" }}>
              {currentPlan.dietPlan.calories} kcal
            </Text>
            <Text style={{ color: theme.colors.textMuted, textAlign: "center" }}>
              {currentPlan.dietPlan.waterLitersTarget.toFixed(1)} L de água alvo neste ciclo.
            </Text>
          </View>
        </Card>
        <Card>
          <View style={{ alignItems: "center", gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>Treino</Text>
            <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: "700" }}>
              {currentPlan.trainingPlan.days.length} dias
            </Text>
            <Text style={{ color: theme.colors.textMuted, textAlign: "center" }}>
              Dias já configurados no plano ativo.
            </Text>
          </View>
        </Card>
        <Card>
          <View style={{ alignItems: "center", gap: theme.spacing.xs }}>
            <Text style={{ color: theme.colors.text, fontWeight: "700" }}>Feedback</Text>
            <Text style={{ color: theme.colors.text, fontSize: 22, fontWeight: "700" }}>
              {feedbackCount} retorno(s)
            </Text>
            <Text style={{ color: theme.colors.textMuted, textAlign: "center" }}>
              Quantidade de devolutivas registradas neste plano.
            </Text>
          </View>
        </Card>
      </View>
    </Screen>
  );
}
