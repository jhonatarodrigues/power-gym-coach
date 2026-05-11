import { Image, Text, View } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import {
  BriefcaseBusiness,
  ChevronRight,
  ClipboardList,
  CreditCard,
  House,
  MessageSquare,
  Menu,
  Users,
} from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  CircularProgressSummary,
  CompactMetricCard,
  InlineAlertBanner,
  StudentListRow,
  WeeklyLineChart,
} from "@/components";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useAppTheme } from "@/theme";

const featuredStudents = [
  {
    id: "feature-1",
    name: "Juliana Mendes",
    goal: "Definição",
    planDate: "23/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "feature-2",
    name: "Rafael Souza",
    goal: "Hipertrofia",
    planDate: "18/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "feature-3",
    name: "Carla Oliveira",
    goal: "Emagrecimento",
    planDate: "10/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
];

const weeklyEngagement = [
  { label: "Seg", value: 32 },
  { label: "Ter", value: 50 },
  { label: "Qua", value: 37 },
  { label: "Qui", value: 75 },
  { label: "Sex", value: 56 },
  { label: "Sáb", value: 72 },
  { label: "Dom", value: 51 },
];

export function TeacherDashboardScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const { session } = useMockAuth();
  const coach = session.currentUser;
  const drawerParent = navigation.getParent();
  const toggleDrawer = () => drawerParent?.dispatch(DrawerActions.toggleDrawer());

  return (
    <AppChrome
      footer={
        <AppBottomNav
          items={[
            {
              key: "dashboard",
              label: "Dashboard",
              active: true,
              icon: <House color={theme.colors.primary} size={21} strokeWidth={2.1} />,
            },
            {
              key: "students",
              label: "Alunos",
              icon: <Users color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("TeacherStudent" as never),
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
              onPress: toggleDrawer,
            },
          ]}
        />
      }
    >
      <AppTopBar
        avatarUrl={coach?.avatarUrl}
        onAvatarPress={() => navigation.navigate("TeacherProfile" as never)}
        onMenuPress={toggleDrawer}
        showBrandSymbol
        showMenu
        subtitle="Olá, Coach!"
        title="Dashboard do coach"
      />

      <View style={{ gap: 10 }}>
        <Text
          style={{
            color: theme.colors.text,
            fontSize: 18,
            fontWeight: "500",
          }}
        >
          Visão geral
        </Text>

        <View style={{ flexDirection: "row", gap: 10 }}>
          <CompactMetricCard
            icon={<Users color={theme.colors.primary} size={17} strokeWidth={2.2} />}
            label="Alunos ativos"
            trend="▲ 12%"
            value="28"
          />
          <CompactMetricCard
            icon={<ClipboardList color={theme.colors.primary} size={17} strokeWidth={2.2} />}
            label={"Planos em\nandamento"}
            trend="▲ 8%"
            value="32"
          />
          <CompactMetricCard
            icon={<BriefcaseBusiness color={theme.colors.primary} size={17} strokeWidth={2.2} />}
            label={"Pagamentos\ndo mês"}
            trend="▲ 15%"
            value="R$ 8.240"
          />
        </View>
      </View>

      <WeeklyLineChart items={weeklyEngagement} periodLabel="Últimos 7 dias" />

      <CircularProgressSummary
        items={[
          { color: theme.colors.primary, label: "Treino", value: 68 },
          { color: "#69C15D", label: "Nutrição", value: 61 },
          { color: "#4A91F3", label: "Avaliação", value: 63 },
        ]}
        label="Média geral"
        percentage={64}
      />

      <InlineAlertBanner
        actionIcon={<ChevronRight color={theme.colors.primary} size={18} />}
        description="Acesse para ver os detalhes"
        icon={<CreditCard color={theme.colors.primary} size={20} strokeWidth={2.2} />}
        title="2 alunos com pagamento pendente"
      />

      <View style={{ gap: 12 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ color: theme.colors.text, fontSize: 18, fontWeight: "500" }}>
            Alunos em destaque
          </Text>
          <Text style={{ color: theme.colors.primary, fontSize: 15, fontWeight: "600" }}>
            Ver todos
          </Text>
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
          {featuredStudents.map((student) => (
            <StudentListRow
              actionLabel="Abrir planos"
              key={student.id}
              name={student.name}
              objective={student.goal}
              onActionPress={() => navigation.navigate("CoachStudentPlans" as never)}
              photoUrl={student.avatarUrl}
              planDate={student.planDate}
            />
          ))}
        </View>
      </View>
    </AppChrome>
  );
}
