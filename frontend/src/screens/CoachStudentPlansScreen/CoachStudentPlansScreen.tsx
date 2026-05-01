import { useMemo } from "react";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Button, Card, Header, Screen, SectionTitle, StatusBadge } from "@/components";
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

  if (!selectedStudent) {
    return null;
  }

  return (
    <Screen>
      <Header
        title={`Planos de ${selectedStudent.user.name}`}
        subtitle="Fluxo do coach: aluno > plano > dieta, treino e feedback."
      />

      <SectionTitle
        title="Planos do aluno"
        description="Um aluno pode ter varios planos. Ao concluir um, o historico permanece acessivel."
      />

      <Button
        label="Cadastrar novo plano"
        onPress={() => navigation.navigate("CoachPlanCreate")}
      />

      <View style={{ gap: theme.spacing.md }}>
        {plans.map((plan) => (
          <Card key={plan.id}>
            <View style={{ gap: theme.spacing.sm }}>
              <StatusBadge
                label={getPlanStatusLabel(plan.status)}
                tone={getPlanStatusTone(plan.status)}
              />
              <SectionTitle
                title={plan.title}
                description={`Vigencia: ${formatDateBR(plan.startDate)} ate ${formatDateBR(plan.endDate)}`}
              />
              <Button
                label="Abrir estrutura do plano"
                onPress={() => {
                  selectPlan(plan.id);
                  loadCurrentPlan(plan);
                  navigation.navigate("CoachPlanHub");
                }}
              />
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}
