import { Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { Search, UsersRound } from "lucide-react-native";

import {
  AthleteListItem,
  Card,
  DashboardHero,
  Header,
  MiniBarChart,
  ProgressLineCard,
  Screen,
  SectionTitle,
} from "@/components";
import type { RootStackParamList } from "@/navigation/types";
import { useCoachContextStore } from "@/store/useCoachContextStore";
import { useAppTheme } from "@/theme";

export function CoachStudentsScreen() {
  const { theme } = useAppTheme();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const students = useCoachContextStore((state) => state.students);
  const selectStudent = useCoachContextStore((state) => state.selectStudent);
  const getPlansByStudent = useCoachContextStore((state) => state.getPlansByStudent);
  const studentsWithActivePlan = students.filter(({ user }) =>
    getPlansByStudent(user.id).some((plan) => plan.status === "active")
  ).length;
  const studentsWithoutPlan = students.length - studentsWithActivePlan;

  return (
    <Screen>
      <Header
        title="Alunos"
        subtitle="Selecione o aluno para abrir planos, feedbacks e comunicacao."
      />

      <DashboardHero
        accentLabel="Entrada principal do acompanhamento"
        eyebrow="Carteira"
        stats={[
          { label: "Alunos", value: String(students.length) },
          { label: "Com plano", value: String(studentsWithActivePlan) },
          { label: "Sem plano", value: String(studentsWithoutPlan) },
        ]}
        subtitle="A tela de alunos deve facilitar a escolha rapida de quem voce quer abrir, sem misturar plano, dieta e treino aqui."
        title="Carteira organizada por aluno"
      />

      <ProgressLineCard
        currentLabel={`${studentsWithActivePlan}/${students.length}`}
        helper="Mostra quantos alunos ja estao com plano ativo dentro da carteira."
        progress={students.length > 0 ? studentsWithActivePlan / students.length : 0}
        targetLabel="alunos com plano ativo"
        title="Cobertura da carteira"
      />

      <MiniBarChart
        description="Leitura compacta para entender rapidamente quantos alunos ja estao operacionais."
        items={[
          { label: "Ativos", value: studentsWithActivePlan, hint: "plano" },
          { label: "Sem plano", value: studentsWithoutPlan, hint: "acao" },
          { label: "Total", value: students.length, hint: "base" },
        ]}
        title="Visao rapida da carteira"
      />

      <SectionTitle
        title="Carteira ativa"
        description="Cada aluno abre sua propria trilha de planos e acompanhamento."
      />

      <Card>
        <View style={{ gap: theme.spacing.lg }}>
        {students.map(({ profile, user }) => {
          const plans = getPlansByStudent(user.id);
          const activePlan = plans.find((plan) => plan.status === "active" || plan.status === "draft");

          return (
            <View
              key={user.id}
              style={{
                gap: theme.spacing.md,
              }}
            >
              <AthleteListItem
                name={user.name}
                focus={profile.goal}
                status={activePlan?.title ?? "Sem plano ativo"}
                withDivider
              />
              <Pressable
                onPress={() => {
                  selectStudent(user.id);
                  navigation.navigate("CoachStudentPlans");
                }}
                style={{
                  alignItems: "center",
                  alignSelf: "flex-start",
                  flexDirection: "row",
                  gap: theme.spacing.sm,
                }}
              >
                <UsersRound color={theme.colors.primary} size={16} />
                <Search color={theme.colors.textMuted} size={16} />
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontSize: theme.typography.caption,
                    fontWeight: "700",
                  }}
                >
                  Abrir planos de {user.name.split(" ")[0]}
                </Text>
              </Pressable>
            </View>
          );
        })}
        </View>
      </Card>
    </Screen>
  );
}
