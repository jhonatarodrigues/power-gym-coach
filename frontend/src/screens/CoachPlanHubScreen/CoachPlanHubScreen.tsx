import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Apple, ClipboardList, House, Menu, MessageSquare, Users } from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  PlanModuleCard,
  PlanSummaryCard,
} from "@/components";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useAppTheme } from "@/theme";
import { formatDateBR } from "@/utils/dates";

function getRemainingDays(endDate?: string) {
  if (!endDate) {
    return 0;
  }

  const current = new Date("2026-05-09T00:00:00.000Z");
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const diff = end.getTime() - current.getTime();

  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function CoachPlanHubScreen() {
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const selectedStudent = useCoachContextStore((state) => state.getSelectedStudent());
  const selectedPlan = useCoachContextStore((state) => state.getSelectedPlan());

  if (!selectedStudent || !selectedPlan) {
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
              icon: <Users color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherStudent" as never),
            },
            {
              key: "plans",
              label: "Planos",
              active: true,
              icon: <ClipboardList color={theme.colors.primary} size={21} strokeWidth={2.1} />,
            },
            {
              key: "messages",
              label: "Mensagens",
              icon: <MessageSquare color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("Messages" as never),
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
        subtitle={`Objetivo: ${selectedStudent.profile.goal.split(" ")[0]}`}
        title={selectedStudent.user.name}
      />

      <PlanSummaryCard
        endDate={formatDateBR(selectedPlan.endDate ?? selectedPlan.startDate)}
        progress={64}
        remainingDays={getRemainingDays(selectedPlan.endDate)}
        startDate={formatDateBR(selectedPlan.startDate)}
        statusLabel="Ativo"
        title="Plano atual"
      />

      <View style={{ gap: 12 }}>
        <PlanModuleCard
          icon={<Apple color="#69C15D" size={20} strokeWidth={2.2} />}
          subtitle="Plano alimentar personalizado"
          title="Dieta"
        />
        <PlanModuleCard
          icon={<ClipboardList color="#FF4F86" size={20} strokeWidth={2.2} />}
          subtitle="Treino dividido por dias da semana"
          title="Treino"
        />
        <PlanModuleCard
          icon={<MessageSquare color="#4A91F3" size={20} strokeWidth={2.2} />}
          subtitle="Avaliações e observações"
          title="Feedback"
        />
      </View>
    </AppChrome>
  );
}
