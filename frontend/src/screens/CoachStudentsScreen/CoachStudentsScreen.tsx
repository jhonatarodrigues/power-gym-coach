import { Text, View } from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Filter, House, Menu, MessageSquare, Search, Users, ClipboardList } from "lucide-react-native";

import {
  AppBottomNav,
  AppChrome,
  AppTopBar,
  CompactMetricCard,
  StudentListRow,
} from "@/components";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useAppTheme } from "@/theme";

const rosterPreview = [
  {
    id: "user-student-1",
    name: "Juliana Mendes",
    goal: "Definição",
    planDate: "23/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "user-student-2",
    name: "Rafael Souza",
    goal: "Hipertrofia",
    planDate: "18/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "user-student-1",
    name: "Carla Oliveira",
    goal: "Emagrecimento",
    planDate: "10/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "user-student-2",
    name: "Bruno Lima",
    goal: "Força",
    planDate: "08/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "user-student-1",
    name: "Fernanda Alves",
    goal: "Condicionamento",
    planDate: "05/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "user-student-2",
    name: "Lucas Pereira",
    goal: "Hipertrofia",
    planDate: "02/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "user-student-1",
    name: "Marina Costa",
    goal: "Definição",
    planDate: "01/04/2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
  },
];

export function CoachStudentsScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation();
  const { session } = useMockAuth();
  const selectStudent = useCoachContextStore((state) => state.selectStudent);

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
              key: "plans",
              label: "Planos",
              icon: <ClipboardList color={theme.colors.textMuted} size={21} strokeWidth={2.1} />,
              onPress: () => navigation.navigate("CoachStudentPlans" as never),
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
              onPress: () => navigation.dispatch(DrawerActions.toggleDrawer()),
            },
          ]}
        />
      }
    >
      <AppTopBar
        avatarUrl={session.currentUser?.avatarUrl}
        onAvatarPress={() => navigation.navigate("TeacherProfile" as never)}
        onMenuPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
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
        {rosterPreview.map((student) => (
          <StudentListRow
            actionLabel={undefined}
            key={`${student.id}-${student.name}`}
            name={student.name}
            objective={student.goal}
            onActionPress={undefined}
            photoUrl={student.avatarUrl}
            planDate={student.planDate}
            planLabel="Plano atual"
          />
        ))}
      </View>
    </AppChrome>
  );
}
