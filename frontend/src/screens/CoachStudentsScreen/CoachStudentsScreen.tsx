import { Text, View } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Filter, House, Menu, MessageSquare, Search, Users, CreditCard } from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  CompactMetricCard,
  StudentListRow,
} from "@/components";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useAppTheme } from "@/theme";
import { formatDateBR } from "@/utils/dates";

function getGoalLabel(goal: string) {
  if (goal.toLowerCase().includes("hipertrof")) {
    return "Hipertrofia";
  }

  if (goal.toLowerCase().includes("emagrec")) {
    return "Emagrecimento";
  }

  if (goal.toLowerCase().includes("condicion")) {
    return "Condicionamento";
  }

  if (goal.toLowerCase().includes("defini")) {
    return "Definição";
  }

  return goal.split(" ").slice(0, 3).join(" ");
}

export function CoachStudentsScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const { session } = useMockAuth();
  const students = useCoachContextStore((state) => state.students);
  const plans = useCoachContextStore((state) => state.plans);
  const selectStudent = useCoachContextStore((state) => state.selectStudent);
  const selectPlan = useCoachContextStore((state) => state.selectPlan);
  const { loadCurrentPlan } = useCurrentPlan();
  const drawerParent = navigation.getParent();

  const openStudentPlans = (studentId: string) => {
    selectStudent(studentId);
    navigation.navigate("CoachStudentPlans" as never);
  };

  const openCurrentPlan = (studentId: string) => {
    const activePlan = plans.find(
      (plan) => plan.studentId === studentId && plan.status === "active"
    );

    if (!activePlan) {
      openStudentPlans(studentId);
      return;
    }

    selectStudent(studentId);
    selectPlan(activePlan.id);
    loadCurrentPlan(activePlan);
    navigation.navigate("CoachPlanHub" as never);
  };

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
            },
            {
              key: "payments",
              label: "Pagamentos",
              icon: <CreditCard color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherPayments" as never),
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
              onPress: () => drawerParent?.dispatch(DrawerActions.toggleDrawer()),
            },
          ]}
        />
      }
    >
      <AppTopBar
        avatarUrl={session.currentUser?.avatarUrl}
        onAvatarPress={() => navigation.navigate("TeacherProfile" as never)}
        onMenuPress={() => drawerParent?.dispatch(DrawerActions.toggleDrawer())}
        showMenu
        title="Alunos"
      />

      <View style={{ flexDirection: "row", gap: 10 }}>
        <CompactMetricCard
          icon={<Users color={theme.colors.primary} size={17} strokeWidth={2.2} />}
          label="Alunos ativos"
          value="28"
        />
        <CompactMetricCard
          icon={<Filter color={theme.colors.primary} size={17} strokeWidth={2.2} />}
          label="Ações pendentes"
          value="5"
          trendTone="warning"
        />
      </View>

      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          gap: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.surface,
            borderColor: "rgba(255,255,255,0.06)",
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            flex: 1,
            flexDirection: "row",
            gap: 8,
            paddingHorizontal: 14,
            paddingVertical: 11,
          }}
        >
          <Search color={theme.colors.textMuted} size={16} strokeWidth={2} />
          <Text style={{ color: theme.colors.textMuted, fontSize: 12.5 }}>Buscar aluno...</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            backgroundColor: theme.colors.surface,
            borderColor: "rgba(255,255,255,0.06)",
            borderRadius: theme.radius.pill,
            borderWidth: 1,
            height: 42,
            justifyContent: "center",
            width: 42,
          }}
        >
          <Filter color={theme.colors.textMuted} size={16} strokeWidth={2} />
        </View>
      </View>

      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: "rgba(255,255,255,0.06)",
          borderRadius: 22,
          borderWidth: 1,
          overflow: "hidden",
          paddingHorizontal: 16,
        }}
      >
        {students.map((student) => {
          const activePlan = plans.find(
            (plan) => plan.studentId === student.user.id && plan.status === "active"
          );

          return (
            <StudentListRow
              accessibilityLabel={`Abrir planos de ${student.user.name}`}
              key={student.user.id}
              name={student.user.name}
              actionLabel={activePlan ? "Abrir atual" : "Ver planos"}
              onActionPress={() => openCurrentPlan(student.user.id)}
              objective={getGoalLabel(student.profile.goal)}
              onPress={() => openStudentPlans(student.user.id)}
              photoUrl={student.user.avatarUrl ?? ""}
              planDate={activePlan ? formatDateBR(activePlan.startDate) : undefined}
              planLabel={activePlan ? "Plano atual" : "Sem plano ativo"}
              planTitle={activePlan?.title}
            />
          );
        })}
      </View>
    </AppChrome>
  );
}
