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
  examRequestsMock,
  studentProfilesMock,
  usersMock,
} from "@/repository/mock";
import { useCurrentPlan } from "@/hooks/useCurrentPlan";
import { useMockAuth } from "@/hooks/useMockAuth";
import { useAppTheme } from "@/theme";
import type { RootStackParamList } from "@/navigation/types";

export function TeacherDashboardScreen() {
  const { theme } = useAppTheme();
  const { signInAs, signOut } = useMockAuth();
  const { currentPlan } = useCurrentPlan();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const activeStudents = studentProfilesMock.length;
  const pendingExamRequests = examRequestsMock.filter(
    (request) => request.status === "pending"
  ).length;
  const reviewedAssessments = assessmentReviewsMock.length;

  const studentUser = usersMock.find(
    (user) => user.id === currentPlan.studentId
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
          {currentPlan.title}
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          Dieta atual: {currentPlan.dietPlan.calories} kcal /{" "}
          {currentPlan.dietPlan.protein.toFixed(1)} g proteina
        </Text>
        <Text style={{ color: theme.colors.textMuted }}>
          Treino: {currentPlan.trainingPlan.days.length} dias configurados
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
        <Button label="Abrir diet editor" onPress={() => navigation.navigate("DietEditor")} />
        <Button
          label="Abrir training editor"
          onPress={() => navigation.navigate("TrainingEditor")}
          variant="ghost"
        />
        <Button
          label="Abrir supplement editor"
          onPress={() => navigation.navigate("SupplementEditor")}
          variant="ghost"
        />
        <Button
          label="Abrir assessment"
          onPress={() => navigation.navigate("Assessment")}
          variant="ghost"
        />
        <Button
          label="Abrir exams"
          onPress={() => navigation.navigate("Exams")}
          variant="ghost"
        />
        <Button label="Trocar para visao do aluno" onPress={() => signInAs("student")} />
        <Button label="Selecionar perfil" onPress={signOut} variant="ghost" />
      </View>
    </Screen>
  );
}
