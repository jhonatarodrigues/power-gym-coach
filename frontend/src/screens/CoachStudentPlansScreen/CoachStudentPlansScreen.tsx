import { useMemo } from "react";
import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowUpRight, CalendarRange } from "lucide-react-native";

import {
  Button,
  Card,
  DashboardHero,
  Header,
  Screen,
  SectionTitle,
  StatusBadge,
} from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import type { RootStackParamList } from "@/navigation/types";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useAppTheme } from "@/theme";
import { formatDateBR } from "@/utils/dates";

function getPlanStatusLabel(status: "draft" | "active" | "archived") {
  if (status === "draft") {
    return "Rascunho";
  }

  if (status === "active") {
    return "Ativo";
  }

  return "Concluido";
}

function getPlanStatusTone(status: "draft" | "active" | "archived") {
  if (status === "draft") {
    return "warning";
  }

  if (status === "active") {
    return "success";
  }

  return "default";
}

export function CoachStudentPlansScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const selectedStudent = useCoachContextStore((state) => state.getSelectedStudent());
  const selectedStudentId = useCoachContextStore((state) => state.selectedStudentId);
  const allPlans = useCoachContextStore((state) => state.plans);
  const selectPlan = useCoachContextStore((state) => state.selectPlan);
  const { loadCurrentPlan } = useCurrentPlan();
  const plans = useMemo(
    () =>
      [...allPlans]
        .filter((plan) => plan.studentId === selectedStudentId)
        .sort((left, right) => right.startDate.localeCompare(left.startDate)),
    [allPlans, selectedStudentId]
  );
  const activeCount = plans.filter((plan) => plan.status === "active").length;
  const draftCount = plans.filter((plan) => plan.status === "draft").length;
  const historyCount = plans.filter((plan) => plan.status === "archived").length;

  if (!selectedStudent) {
    return null;
  }

  return (
    <Screen>
      <Header
        title={`Planos de ${selectedStudent.user.name}`}
        subtitle="Fluxo do coach: aluno > plano > dieta, treino e feedback."
      />

      <DashboardHero
        accentLabel={activeCount > 0 ? "Plano ativo em acompanhamento" : "Organize o proximo ciclo"}
        eyebrow="Planos"
        stats={[
          { label: "Ativos", value: String(activeCount) },
          { label: "Rascunhos", value: String(draftCount) },
          { label: "Histórico", value: String(historyCount) },
        ]}
        subtitle="Cada plano vira uma unidade de trabalho do coach, com dieta, treino e feedbacks dentro do mesmo ciclo."
        title="Ciclos do aluno organizados"
      />

      <SectionTitle
        title="Planos do aluno"
        description="Um aluno pode ter varios planos. Ao concluir um, o historico permanece acessivel."
      />

      <View style={{ alignSelf: "flex-start" }}>
        <Button
          fullWidth={false}
          label="Cadastrar novo plano"
          onPress={() => navigation.navigate("CoachPlanCreate")}
          rightIcon={<ArrowUpRight color="#0B0B0B" size={14} />}
          size="sm"
        />
      </View>

      <View style={{ gap: theme.spacing.md }}>
        {plans.map((plan) => (
          <Card key={plan.id}>
            <View style={{ gap: theme.spacing.lg }}>
              <View
                style={{
                  alignItems: "center",
                  gap: theme.spacing.sm,
                }}
              >
                <StatusBadge
                  label={getPlanStatusLabel(plan.status)}
                  tone={getPlanStatusTone(plan.status)}
                />
                <Text
                  style={{
                    color: theme.colors.text,
                    fontSize: theme.typography.body,
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {plan.title}
                </Text>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    gap: theme.spacing.sm,
                  }}
                >
                  <CalendarRange color={theme.colors.textMuted} size={15} />
                  <Text
                    style={{
                      color: theme.colors.textMuted,
                      fontSize: theme.typography.caption,
                      textAlign: "center",
                    }}
                  >
                    {formatDateBR(plan.startDate)} até {formatDateBR(plan.endDate)}
                  </Text>
                </View>
              </View>
              <View style={{ alignItems: "center" }}>
                <Button
                  fullWidth={false}
                  label="Abrir plano"
                  onPress={() => {
                    selectPlan(plan.id);
                    loadCurrentPlan(plan);
                    navigation.navigate("CoachPlanHub");
                  }}
                  rightIcon={<ArrowUpRight color={theme.colors.primary} size={14} />}
                  size="sm"
                  variant="soft"
                />
              </View>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
