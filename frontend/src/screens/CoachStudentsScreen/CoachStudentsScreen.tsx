import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ArrowUpRight } from "lucide-react-native";

import {
  AthleteListItem,
  Button,
  Card,
  DashboardHero,
  Header,
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

  const summaryItems = [
    { label: "Alunos", value: String(students.length) },
    { label: "Com plano", value: String(studentsWithActivePlan) },
    { label: "Sem plano", value: String(studentsWithoutPlan) },
  ];

  return (
    <Screen>
      <Header
        title="Alunos"
        subtitle="Selecione o aluno para abrir planos, feedbacks e comunicacao."
      />

      <DashboardHero
        accentLabel="Entrada principal do acompanhamento"
        eyebrow="Carteira"
        stats={summaryItems}
        subtitle="A tela de alunos deve facilitar a escolha rapida de quem voce quer abrir, sem misturar plano, dieta e treino aqui."
        title="Carteira organizada por aluno"
      />

      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        {summaryItems.map((item) => (
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
              <View
                style={{
                  alignSelf: "flex-start",
                  marginTop: -theme.spacing.xs,
                }}
              >
                <Button
                  label="Abrir planos"
                  fullWidth={false}
                  onPress={() => {
                    selectStudent(user.id);
                    navigation.navigate("CoachStudentPlans");
                  }}
                  rightIcon={<ArrowUpRight color={theme.colors.primary} size={14} />}
                  size="sm"
                  variant="soft"
                />
              </View>
            </View>
          );
        })}
        </View>
      </Card>
    </Screen>
  );
}
