import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  Button,
  Header,
  HistoryCard,
  MetricCard,
  Screen,
  SectionTitle,
  TrainingDayCard,
} from "@/components";
import {
  assessmentReviewsMock,
  examRequestsMock,
  historyRecordsMock,
  progressEntriesMock,
} from "@/repository/mock";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useAppTheme } from "@/theme";
import type { RootStackParamList } from "@/navigation/types";

export function StudentHomeScreen() {
  const { theme } = useAppTheme();
  const { signInAs, signOut } = useMockAuth();
  const { currentPlan } = useCurrentPlan();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const todayTraining = currentPlan.trainingPlan.days[0];
  const latestProgress = progressEntriesMock.at(-1);
  const latestAssessment = assessmentReviewsMock.at(-1);
  const pendingExams = examRequestsMock.filter(
    (request) => request.status === "pending"
  ).length;

  return (
    <Screen>
      <Header
        title="Seu plano atual"
        subtitle="Resumo mockado do que o aluno precisa ver primeiro ao abrir o app."
      />

      <MetricCard
        label="calorias do plano"
        value={String(currentPlan.dietPlan.calories)}
        trend={`${currentPlan.dietPlan.carbs.toFixed(1)}g carb / ${currentPlan.dietPlan.protein.toFixed(1)}g prot`}
      />

      <SectionTitle
        title="Treino de hoje"
        description="Sempre priorizar o plano atual antes do historico."
      />
      <TrainingDayCard day={todayTraining} />

      <View style={{ gap: theme.spacing.md }}>
        <MetricCard
          label="avaliacao recente"
          value={latestAssessment ? "1" : "0"}
          trend="feedback do professor disponivel"
        />
        <MetricCard
          label="exames pendentes"
          value={String(pendingExams)}
          trend="envie quando tiver os resultados"
        />
      </View>

      <SectionTitle
        title="Progresso"
        description="Ultima entrada registrada no mock."
      />
      <HistoryCard
        record={{
          id: latestProgress?.id ?? "progress-preview",
          studentId: "user-student-1",
          type: "progress",
          title: `${latestProgress?.weightKg} kg / ${latestProgress?.bodyFatPercentage}% BF`,
          description: latestProgress?.notes,
          date: latestProgress?.date ?? "",
        }}
      />

      <SectionTitle
        title="Historico recente"
        description="Somente registros passados devem aparecer aqui."
      />
      <View style={{ gap: theme.spacing.md }}>
        {historyRecordsMock.slice(0, 2).map((record) => (
          <HistoryCard key={record.id} record={record} />
        ))}
      </View>

      <View style={{ gap: theme.spacing.md }}>
        <Button
          label="Abrir assessment"
          onPress={() =>
            navigation.navigate("StudentTabs", { screen: "StudentAssessmentTab" })
          }
        />
        <Button
          label="Abrir exams"
          onPress={() => navigation.navigate("Exams")}
          variant="ghost"
        />
        <Button
          label="Abrir plano atual"
          onPress={() =>
            navigation.navigate("StudentTabs", { screen: "StudentPlanTab" })
          }
          variant="ghost"
        />
        <Button label="Trocar para visao do professor" onPress={() => signInAs("teacher")} />
        <Button label="Selecionar perfil" onPress={signOut} variant="ghost" />
      </View>
    </Screen>
  );
}
