import { Text, View } from "react-native";

import {
  AthleteListItem,
  Button,
  Card,
  Header,
  Screen,
  SectionTitle,
} from "@/components";
import {
  currentPlanMock,
  examRequestsMock,
  progressEntriesMock,
  studentProfilesMock,
  usersMock,
} from "@/repository/mock";
import { useAppTheme } from "@/theme";

export function StudentDetailsScreen() {
  const { theme } = useAppTheme();

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
            Plano atual: {currentPlanMock.title}
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
        <Button label="Abrir plano atual" />
        <Button label="Editar dieta" variant="ghost" />
      </View>
    </Screen>
  );
}
