import { Text, View } from "react-native";
import {
  ClipboardList,
  CreditCard,
  Dumbbell,
  FileText,
  House,
  Menu,
  Plus,
  Stethoscope,
  TestTubeDiagonal,
  Users,
} from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  Button,
  CompactMetricCard,
  PlanListCard,
  PlanSummaryCard,
} from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
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

  return "Concluído";
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

function getRemainingDays(endDate?: string) {
  if (!endDate) {
    return 0;
  }

  const current = new Date("2026-05-11T00:00:00.000Z");
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const diff = end.getTime() - current.getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function CoachStudentPlansScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const selectedStudent = useCoachContextStore((state) => state.getSelectedStudent());
  const selectedStudentId = useCoachContextStore((state) => state.selectedStudentId);
  const getPlansByStudent = useCoachContextStore((state) => state.getPlansByStudent);
  const selectPlan = useCoachContextStore((state) => state.selectPlan);
  const { loadCurrentPlan } = useCurrentPlan();
  const plans = selectedStudentId ? getPlansByStudent(selectedStudentId) : [];
  const activePlan = plans.find((plan) => plan.status === "active") ?? plans[0];
  const archivedPlans = plans.filter((plan) => plan.id !== activePlan?.id);

  if (!selectedStudent || !activePlan) {
    return null;
  }

  return (
    <AppChrome
      footer={
        <AppBottomNav
          items={[
            {
              key: "dashboard",
              label: "Dashboard",
              icon: <House color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherHome" as never),
            },
            {
              key: "students",
              label: "Alunos",
              active: true,
              icon: <Users color={theme.colors.primary} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherStudent" as never),
            },
            {
              key: "payments",
              label: "Pagamentos",
              icon: <CreditCard color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherPayments" as never),
            },
            {
              key: "more",
              label: "Mais",
              icon: <Menu color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.goBack(),
            },
          ]}
        />
      }
    >
      <AppTopBar
        avatarUrl={selectedStudent.user.avatarUrl}
        onAvatarPress={() => navigation.navigate("TeacherProfile" as never)}
        onBackPress={() => navigation.goBack()}
        showBack
        showBell={false}
        subtitle={selectedStudent.profile.goal}
        title="Planos do aluno"
      />

      <View style={{ gap: 4 }}>
        <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: "800" }}>
          {selectedStudent.user.name}
        </Text>
        <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>
          O plano atual fica em destaque e os ciclos antigos abrem a mesma estrutura somente em leitura.
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <CompactMetricCard
          icon={<ClipboardList color={theme.colors.primary} size={17} strokeWidth={2.2} />}
          label="Planos totais"
          value={String(plans.length)}
        />
        <CompactMetricCard
          icon={<Plus color={theme.colors.primary} size={17} strokeWidth={2.2} />}
          label="Histórico"
          value={String(archivedPlans.length)}
        />
      </View>

      <PlanSummaryCard
        endDate={formatDateBR(activePlan.endDate ?? activePlan.startDate)}
        progress={activePlan.status === "active" ? 64 : 100}
        remainingDays={getRemainingDays(activePlan.endDate)}
        startDate={formatDateBR(activePlan.startDate)}
        statusLabel={getPlanStatusLabel(activePlan.status)}
        title="Plano atual"
      />

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        <Button
          fullWidth={false}
          label="Abrir plano atual"
          onPress={() => {
            selectPlan(activePlan.id);
            loadCurrentPlan(activePlan);
            navigation.navigate("CoachPlanHub" as never);
          }}
          size="sm"
        />
        <Button
          fullWidth={false}
          label="Cadastrar novo plano"
          onPress={() => navigation.navigate("CoachPlanCreate" as never)}
          size="sm"
          variant="ghost"
        />
      </View>

      <View style={{ gap: 12 }}>
        <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>
          Fluxo do plano atual
        </Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          <Button
            fullWidth={false}
            label="Avaliação"
            onPress={() => navigation.navigate("Assessment" as never)}
            rightIcon={<Stethoscope color="#0B0B0B" size={14} strokeWidth={2.1} />}
            size="sm"
          />
          <Button
            fullWidth={false}
            label="Dieta"
            onPress={() => {
              selectPlan(activePlan.id);
              loadCurrentPlan(activePlan);
              navigation.navigate("DietEditor" as never);
            }}
            rightIcon={<FileText color="#0B0B0B" size={14} strokeWidth={2.1} />}
            size="sm"
          />
          <Button
            fullWidth={false}
            label="Treino"
            onPress={() => {
              selectPlan(activePlan.id);
              loadCurrentPlan(activePlan);
              navigation.navigate("TrainingEditor" as never);
            }}
            rightIcon={<Dumbbell color="#0B0B0B" size={14} strokeWidth={2.1} />}
            size="sm"
          />
          <Button
            fullWidth={false}
            label="Exames"
            onPress={() => navigation.navigate("Exams" as never)}
            rightIcon={<TestTubeDiagonal color="#0B0B0B" size={14} strokeWidth={2.1} />}
            size="sm"
          />
        </View>
      </View>

      <View style={{ gap: 12 }}>
        <Text style={{ color: theme.colors.text, fontSize: 16, fontWeight: "700" }}>
          Histórico de planos
        </Text>
        {archivedPlans.map((plan) => (
          <PlanListCard
            dateLabel={`${formatDateBR(plan.startDate)} até ${formatDateBR(
              plan.endDate ?? plan.startDate
            )}`}
            key={plan.id}
            onPress={() => {
              selectPlan(plan.id);
              loadCurrentPlan(plan);
              navigation.navigate("CoachPlanHub" as never);
            }}
            statusLabel={getPlanStatusLabel(plan.status)}
            statusTone={getPlanStatusTone(plan.status)}
            subtitle="Abra o mesmo layout do plano, mas em modo histórico sem edição."
            title={plan.title}
          />
        ))}
      </View>
    </AppChrome>
  );
}
