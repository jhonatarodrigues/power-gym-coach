import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import {
  AthleteListItem,
  Button,
  Header,
  MetricCard,
  Screen,
  SectionTitle,
} from "@/components";
import {
  assessmentReviewsMock,
  currentPlanMock,
  examRequestsMock,
  studentProfilesMock,
  usersMock,
} from "@/repository/mock";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useAppTheme } from "@/theme";
import type { RootStackParamList } from "@/navigation/types";

export function TeacherDashboardScreen() {
  const { theme } = useAppTheme();
  const { signInAs, signOut } = useMockAuth();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const activeStudents = studentProfilesMock.length;
  const pendingExamRequests = examRequestsMock.filter(
    (request) => request.status === "pending"
  ).length;
  const reviewedAssessments = assessmentReviewsMock.length;

  const studentUser = usersMock.find(
    (user) => user.id === currentPlanMock.studentId
  );

  return (
    <Screen>
      <Header
        title="Dashboard do professor"
        subtitle="Visao inicial mockada para acompanhar alunos, plano atual, exames e avaliacoes."
      />

      <MetricCard
        label="alunos ativos"
        value={String(activeStudents)}
        trend="1 aluna em foco no mock atual"
      />

      <View style={{ gap: theme.spacing.md }}>
        <MetricCard
          label="avaliacoes revisadas"
          value={String(reviewedAssessments)}
          trend="ultima revisao ha 1 dia"
        />
        <MetricCard
          label="exames pendentes"
          value={String(pendingExamRequests)}
          trend="1 solicitacao aguardando envio"
        />
      </View>

      <SectionTitle
        title="Plano atual em destaque"
        description="O plano ativo deve sempre ficar facil de encontrar."
      />
      <View
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          borderRadius: theme.radius.lg,
          borderWidth: 1,
          gap: theme.spacing.sm,
          padding: theme.spacing.lg,
        }}
      >
        <Text
          style={{
            color: theme.colors.text,
            fontSize: theme.typography.subtitle,
            fontWeight: "700",
          }}
        >
          {currentPlanMock.title}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          Dieta atual: {currentPlanMock.dietPlan.calories} kcal /{" "}
          {currentPlanMock.dietPlan.protein.toFixed(1)} g proteina
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          Treino: {currentPlanMock.trainingPlan.days.length} dias configurados
        </Text>
      </View>

      <SectionTitle
        title="Aluno em destaque"
        description="Primeiro dado mockado conectado ao dashboard."
      />
      {studentUser ? (
        <AthleteListItem
          name={studentUser.name}
          focus="Hipertrofia com ajuste de dieta e progressao de treino"
          status="Plano ativo"
        />
      ) : null}

      <View style={{ gap: theme.spacing.md }}>
        <Button
          label="Abrir exercise library"
          onPress={() => navigation.navigate("ExerciseLibrary")}
        />
        <Button
          label="Abrir student details"
          onPress={() => navigation.navigate("StudentDetails")}
          variant="ghost"
        />
        <Button
          label="Abrir current plan"
          onPress={() => navigation.navigate("CurrentPlan")}
          variant="ghost"
        />
        <Button
          label="Abrir diet editor"
          onPress={() => navigation.navigate("DietEditor")}
          variant="ghost"
        />
        <Button
          label="Abrir training editor"
          onPress={() => navigation.navigate("TrainingEditor")}
          variant="ghost"
        />
        <Button
          label="Abrir history"
          onPress={() => navigation.navigate("History")}
          variant="ghost"
        />
        <Button
          label="Abrir assessment"
          onPress={() => navigation.navigate("Assessment")}
          variant="ghost"
        />
        <Button label="Trocar para visao do aluno" onPress={() => signInAs("student")} />
        <Button label="Selecionar perfil" onPress={signOut} variant="ghost" />
      </View>
    </Screen>
  );
}
