import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  AthleteListItem,
  Button,
  Card,
  Header,
  Screen,
  SectionTitle,
} from "@/components";
import type { RootStackParamList } from "@/navigation/types";
import {
  examRequestsMock,
  progressEntriesMock,
  studentProfilesMock,
  usersMock,
} from "@/repository/mock";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useAppTheme } from "@/theme";

export function StudentDetailsScreen() {
  const { theme } = useAppTheme();
  const { currentPlan } = useCurrentPlan();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const studentProfile = studentProfilesMock[0];
  const studentUser = usersMock.find((user) => user.id === studentProfile.userId);
  const latestProgress = progressEntriesMock.at(-1);
  const pendingExams = examRequestsMock.filter(
    (request) => request.studentId === studentProfile.userId && request.status !== "reviewed"
  ).length;

  if (!studentUser) {
    return (
      <Screen>
        <Header title="Student details" subtitle="Aluno nao encontrado no mock." />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Student details"
        subtitle="Visao consolidada do aluno para o professor decidir proximos ajustes."
      />

      <AthleteListItem
        name={studentUser.name}
        focus={studentProfile.goal}
        status="Plano ativo"
      />

      <SectionTitle title="Resumo" description="Contexto rapido do acompanhamento." />
      <Card>
        <View style={{ gap: theme.spacing.sm }}>
          <Text style={{ color: theme.colors.textMuted }}>
            Restricoes: {studentProfile.restrictions}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Plano atual: {currentPlan.title}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Exames em andamento: {pendingExams}
          </Text>
          <Text style={{ color: theme.colors.textMuted }}>
            Ultimo progresso: {latestProgress?.weightKg} kg /{" "}
            {latestProgress?.bodyFatPercentage}% BF
          </Text>
        </View>
      </Card>

      <SectionTitle
        title="Acoes rapidas"
        description="Atalhos iniciais para o fluxo do professor."
      />
      <View style={{ gap: theme.spacing.md }}>
        <Button
          label="Abrir plano atual"
          onPress={() =>
            navigation.navigate("TeacherTabs", { screen: "TeacherPlanTab" })
          }
        />
        <Button
          label="Editar dieta"
          onPress={() => navigation.navigate("MealEditor")}
          variant="ghost"
        />
        <Button
          label="Abrir avaliacao"
          onPress={() => navigation.navigate("Assessment")}
          variant="ghost"
        />
        <Button
          label="Abrir exams"
          onPress={() => navigation.navigate("Exams")}
          variant="ghost"
        />
      </View>
    </Screen>
  );
}
